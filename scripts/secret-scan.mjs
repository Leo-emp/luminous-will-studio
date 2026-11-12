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
  { kind: 'aws', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { kind: 'github', re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { kind: 'stripe', re: /\b(sk_live_|pk_live_|rk_live_|whsec_)[A-Za-z0-9]{24,}/ },
  // # NAME_KEY / NAME_SECRET / NAME_TOKEN assigned a long literal value (= or :), quoted or not
  { kind: 'assigned-secret', re: /\b[A-Z0-9_]*(KEY|SECRET|TOKEN|PASSWORD)\b\s*[:=]\s*['"]?[A-Za-z0-9+/_\-]{20,}/ },
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

// # CLI: exit 1 on any finding
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const found = scanRepo(process.cwd())
  for (const f of found) console.log(`${f.path}:${f.line} ${f.kind}`)
  console.log(found.length ? `secret scan: ${found.length} finding(s) — push blocked` : 'secret scan: clean')
  process.exit(found.length ? 1 : 0)
}
