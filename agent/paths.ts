// ============================================================
// PATHS — every folder the Luminous Will agent reads or writes.
// Output lives in Luminous Will's own folder (owner rule: one
// dedicated output folder per agent).
// ============================================================
import { join } from 'node:path'

export const ROOT = join(import.meta.dirname, '..')
export const JOBS_DIR = join(ROOT, 'temp', 'jobs')
export const OUT_LONG = join(ROOT, 'output', 'long')
export const OUT_SHORTS = join(ROOT, 'output', 'shorts')
export const HISTORY_FILE = join(ROOT, 'temp', 'history.json')
export const PUBLIC_DIR = join(ROOT, 'public')
export const ENV_FILE = join(ROOT, '.env.local')
