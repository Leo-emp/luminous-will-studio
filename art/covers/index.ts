// # Every cover file is listed here
import type { Cover } from './registry'
import { toIg } from './igauto'

// # LW Studio starts EMPTY: each LW video adds its own freshly drawn covers here
const BASE: Cover[] = []
// # every wide cover also gets an automatic Instagram version '<id>-ig' (art/covers/igauto.tsx), unless one is hand-made
const HAND_IG = new Set(BASE.filter((c) => c.id.endsWith('-ig')).map((c) => c.job))
export const COVERS: Cover[] = [...BASE, ...BASE.filter((c) => c.canvas === 'wide' && !HAND_IG.has(c.job)).map((c) => toIg(c))]
export const getCover = (id: string) => {
  const c = COVERS.find((x) => x.id === id)
  if (!c) throw new Error(`unknown cover "${id}"`)
  return c
}
