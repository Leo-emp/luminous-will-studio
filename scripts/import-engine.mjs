// ============================================================
// IMPORT ENGINE — one-off copy of the source engine (the owner's
// finance-channel project) into LW
// Studio. It ONLY READS the source: nothing is ever written,
// moved or deleted there. Only paths on ALLOW are copied, and a
// path matching any DENY rule is skipped even inside an allowed
// folder (secrets, videos, databases, scratch folders).
//
// Usage: node scripts/import-engine.mjs <source engine folder> <lw studio folder>
// ============================================================
import { cpSync, existsSync, mkdirSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// # What LW needs from the engine (folders end with "/")
export const ALLOW = [
  'agent/', 'art/', 'tests/agent/', 'tests/art/', 'tests/fixtures/',
  'public/fonts/', 'public/sfx/', 'public/textures/',
  'scripts/generate-sfx.sh', 'scripts/generate-silent-sfx.sh', 'scripts/make-sfx.sh',
  '.github/render/', '.github/workflows/render.yml',
  'remotion.config.ts', 'tsconfig.json', 'vitest.config.ts', 'package.json', '.gitignore',
]

// # Never copied, even inside an allowed folder
export const DENY = [
  /(^|\/)\.env/,                        // # .env, .env.local … (secrets)
  /(^|\/)node_modules\//,
  /\.db$/,
  /(^|\/)(output|temp|brand|research|spike)\//,
]
// # Media files are skipped except the sound effects
const MEDIA = /\.(mp4|wav|mp3)$/i
const denied = (rel) => DENY.some((r) => r.test(rel)) || (MEDIA.test(rel) && !rel.startsWith('public/sfx/'))

// # Path with forward slashes, relative to a root
const rel = (root, p) => relative(root, p).split(sep).join('/')

export const importEngine = ({ src, dest, dryRun = false }) => {
  // # Safety checks BEFORE anything is written
  if (!existsSync(src)) throw new Error(`source not found: ${src}`)
  const S = realpathSync.native(resolve(src))
  // # resolve dest WITHOUT creating it: real path of its nearest existing parent + the rest
  let base = resolve(dest), rest = ''
  while (!existsSync(base)) { rest = join(base.slice(dirname(base).length + 1), rest); base = dirname(base) }
  const D = join(realpathSync.native(base), rest).replace(/[\\/]+$/, '')
  // # Windows paths ignore case: compare lowercased there
  const k = (p) => (process.platform === 'win32' ? p.toLowerCase() : p)
  if (k(S) === k(D)) throw new Error('source and destination are the same folder')
  if (k(D).startsWith(k(S) + sep)) throw new Error('destination is inside the source')
  if (k(S).startsWith(k(D) + sep)) throw new Error('destination contains the source')
  mkdirSync(D, { recursive: true })  // # only now, after every check passed

  const copied = [], skipped = []
  // # Walk one allowed entry, copying file by file so DENY applies everywhere
  const visit = (abs) => {
    const r = rel(S, abs)
    if (denied(r + (statSync(abs).isDirectory() ? '/' : ''))) { skipped.push(r); return }
    if (statSync(abs).isDirectory()) { for (const n of readdirSync(abs)) visit(join(abs, n)); return }
    if (!dryRun) {
      mkdirSync(dirname(join(D, r)), { recursive: true })
      cpSync(abs, join(D, r))            // # reads src, writes dest only
    }
    copied.push(r)
  }
  for (const a of ALLOW) {
    const abs = join(S, a)
    if (existsSync(abs)) visit(abs)
  }
  return { copied, skipped }
}

// # CLI
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [src, dest] = process.argv.slice(2)
  if (!src || !dest) { console.error('usage: node scripts/import-engine.mjs <src> <dest>'); process.exit(1) }
  const r = importEngine({ src, dest })
  console.log(`copied ${r.copied.length} files, skipped ${r.skipped.length}`)
}
