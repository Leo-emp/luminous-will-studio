// # every diorama piece registers itself here (imported once by the timeline, the gate and the Episode)
// # LW Studio starts EMPTY: each LW video adds its own freshly drawn pieces between the markers.
import type { Mood } from './kit'
import type { Piece } from './registry'
import { registerPiece } from './registry'
// # pieces:begin
import { D3_HOOK } from './day3/hook'
import { D3_SPARK } from './day3/spark'
import { D3_FUEL } from './day3/fuel'
import { D3_STUDY } from './day3/study'
import { D3_ACTION } from './day3/action'
// # pieces:end

// # the mood of each piece (a plan shot can override it): dark for the struggle, light (cream) for the
// # lesson and the win; the film breathes between the two with a drawn wipe
const DARK = new Set<string>([])
export const moodOf = (id: string): Mood => (DARK.has(id) ? 'dark' : 'light')

// # pieces:begin
const ALL: Piece[] = [D3_HOOK, D3_SPARK, D3_FUEL, D3_STUDY, D3_ACTION,
// # pieces:end
]
for (const p of ALL) registerPiece({ ...p, mood: p.mood ?? moodOf(p.id) })
