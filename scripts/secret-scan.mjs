// ============================================================
// SECRET SCAN — this repo is PUBLIC on GitHub, so nothing that
// looks like a key, token or .env file may ever be pushed.
// Runs before every push (.githooks/pre-push) and via `npm run scan`.
// It prints only "path:line kind" — never the matched value.
// ============================================================
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// # Key shapes worth blocking (one finding per line, first match wins)
const PATTERNS = [
  { kind: 'private-key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { kind: 'aws', re: /\b(AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { kind: 'github', re: /\b(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{22,})/ },
  { kind: 'stripe', re: /\b((sk|pk|rk)_(live|test)_|whsec_)[A-Za-z0-9]{24,}/ },
  { kind: 'google', re: /\bAIza[0-9A-Za-z_-]{35}/ },
  // # an Azure Speech key handed straight to the SDK
  { kind: 'azure', re: /fromSubscription\(\s*['"][0-9a-f]{32}['"]/i },
  // # any name ending in key/secret/token/password (any case, quoted JSON names too) given a long literal value
  { kind: 'assigned-secret', re: /\b[A-Za-z0-9_]*(key|secret|token|password)["']?\s*[:=]\s*['"]?[A-Za-z0-9+/_-]{20,}/i },
]
// # Any .env file except the empty template
const DOTENV = /(^|\/)\.env(?!\.example$)/

export const scanText = (path, text) => {
  const p = path.split('\\').join('/')
  const out = []
  if (DOTENV.test(p)) out.push({ path: p, line: 0, kind: 'dotenv' })
  text.split(/\r?\n/).forEach((l, i) => {
    const hit = PATTERNS.find((x) => x.re.test(l))
    if (hit) out.push({ path: p, line: i + 1, kind: hit.kind })
  })
  return out
}

// # Tracked + staged files; binaries and files over 1 MB are skipped
export const scanRepo = (root) => {
  const files = execFileSync('git', ['ls-files', '-c', '-o', '--exclude-standard'], { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean)
  const out = []
  for (const f of files) {
    const abs = join(root, f)
    let st
    try { st = statSync(abs) } catch { continue }
    if (DOTENV.test(f)) { out.push({ path: f, line: 0, kind: 'dotenv' }); continue }
    if (st.size > 1_000_000 || /\.(png|jpe?g|webp|gif|mp4|wav|mp3|woff2?|ttf|ico)$/i.test(f)) continue
    const text = readFileSync(abs, 'utf8')
    if (text.includes('\0')) continue
    out.push(...scanText(f, text))
  }
  return out
}

// # The commits a `git push` sends (git gives the hook "<local ref> <local sha> <remote ref> <remote sha>" lines
// # on stdin). Every ADDED line of every pushed commit is scanned — so a key that was committed and later deleted,
// # or edited away on disk, is still caught. Deleting a branch (local sha all zeros) sends nothing.
const ZERO = /^0+$/
export const scanPush = (root, stdin) => {
  const out = []
  for (const line of stdin.split(/\r?\n/).filter(Boolean)) {
    const [, localSha, , remoteSha] = line.trim().split(/\s+/)
    if (!localSha || ZERO.test(localSha)) continue
    const range = !remoteSha || ZERO.test(remoteSha) ? [localSha, '--not', '--remotes'] : [`${remoteSha}..${localSha}`]
    const log = execFileSync('git', ['log', '-p', '--no-color', '--unified=0', '--format=commit %h', ...range], { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
    let commit = '', file = ''
    for (const l of log.split('\n')) {
      if (l.startsWith('commit ')) { commit = l.slice(7); continue }
      if (l.startsWith('+++ ')) {
        file = l.slice(4).replace(/^b\//, '')
        if (DOTENV.test(file)) out.push({ path: `${commit}:${file}`, line: 0, kind: 'dotenv' })
        continue
      }
      if (l.startsWith('+')) for (const f of scanText(file, l.slice(1))) if (f.kind !== 'dotenv') out.push({ ...f, path: `${commit}:${file}`, line: 0 })
    }
  }
  return out
}

// # CLI: exit 1 on any finding. --push = pre-push hook mode (also scans the pushed commits from stdin)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const push = process.argv.includes('--push')
  const found = [...scanRepo(process.cwd()), ...(push ? scanPush(process.cwd(), readFileSync(0, 'utf8')) : [])]
  for (const f of found) console.log(`${f.path}:${f.line} ${f.kind}`)
  console.log(found.length ? `secret scan: ${found.length} finding(s) — push blocked` : 'secret scan: clean')
  process.exit(found.length ? 1 : 0)
}
