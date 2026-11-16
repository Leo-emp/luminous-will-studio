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
import { PC_HOOK } from './procrast/hook'
import { PC_FEEL } from './procrast/feel'
import { PC_COMPANY } from './procrast/company'
import { PC_START } from './procrast/start'
import { PC_CLOSE } from './procrast/close'
import { NM_HOOK } from './nightmind/hook'
import { NM_LOOPS } from './nightmind/loops'
import { NM_LAB } from './nightmind/lab'
import { NM_PARK, NM_TONIGHT } from './nightmind/park'
import { SP_HOOK, SP_SHIRT } from './spotlight/hook'
import { SP_EFFECT, SP_FREE } from './spotlight/stage'
import { RW_HOOK, RW_FALL } from './rowling/fall'
import { RW_NOS, RW_YES } from './rowling/rise'
import { RW_LESSON } from './rowling/lesson'
import { ED_HOOK, ED_FIRE } from './edison/fire'
import { ED_MORNING, ED_RESILIENCE, ED_BRICK } from './edison/again'
import { SW_HOOK, SW_DIARIES, SW_RANK, SW_JAR } from './smallwins/pieces'
import { ST_HOOK, ST_TEST, ST_WHY, ST_COACH } from './selftalk/pieces'
import { FC_HOOK, FC_SECONDS, FC_RESIDUE, FC_FIX } from './focus/pieces'
import { BH_HOOK, BH_UNFAIR, BH_TIMELINE, BH_CLOCK } from './behind/pieces'
import { PR_HOOK, PR_GAP, PR_IFTHEN, PR_PLAN } from './promises/pieces'
import { FF_HOOK, FF_COIN, FF_SCALE } from './fear/open'
import { FF_FIVE, FF_DINNER, FF_SARA } from './fear/people'
import { FF_DYSON, FF_REGRET, FF_JIANG } from './fear/tries'
import { FF_STEPS, FF_DIVE } from './fear/close'
import { HB_HOOK, HB_STUDY, HB_MISS, HB_BUILD } from './habit/pieces'
import { CP_RULER, CP_FEED, CP_TIME } from './compare/scenes'
import { CP_HOOK } from './compare/hook'
import { BC_HOOK, BC_SCIENCE, BC_MEMORY, BC_BALANCE } from './badcomment/pieces'
import { FR_HOOK, FR_NAME, FR_TRAP, FR_OUT } from './fraud/pieces'
import { EN_HOOK, EN_TREAD, EN_STUDY, EN_TRY } from './enough/pieces'
// # pieces:end

// # the mood of each piece (a plan shot can override it): dark for the struggle, light (cream) for the
// # lesson and the win; the film breathes between the two with a drawn wipe
const DARK = new Set<string>([])
export const moodOf = (id: string): Mood => (DARK.has(id) ? 'dark' : 'light')

// # pieces:begin
const ALL: Piece[] = [D3_HOOK, D3_SPARK, D3_FUEL, D3_STUDY, D3_ACTION,
  PC_HOOK, PC_FEEL, PC_COMPANY, PC_START, PC_CLOSE,
  NM_HOOK, NM_LOOPS, NM_LAB, NM_PARK, NM_TONIGHT,
  SP_HOOK, SP_SHIRT, SP_EFFECT, SP_FREE,
  RW_HOOK, RW_FALL, RW_NOS, RW_YES, RW_LESSON,
  ED_HOOK, ED_FIRE, ED_MORNING, ED_RESILIENCE, ED_BRICK,
  SW_HOOK, SW_DIARIES, SW_RANK, SW_JAR,
  ST_HOOK, ST_TEST, ST_WHY, ST_COACH,
  FC_HOOK, FC_SECONDS, FC_RESIDUE, FC_FIX,
  BH_HOOK, BH_UNFAIR, BH_TIMELINE, BH_CLOCK,
  PR_HOOK, PR_GAP, PR_IFTHEN, PR_PLAN,
  FF_HOOK, FF_COIN, FF_SCALE, FF_FIVE, FF_DINNER, FF_SARA, FF_DYSON, FF_REGRET, FF_JIANG, FF_STEPS, FF_DIVE,
  HB_HOOK, HB_STUDY, HB_MISS, HB_BUILD,
  CP_HOOK, CP_RULER, CP_FEED, CP_TIME,
  BC_HOOK, BC_SCIENCE, BC_MEMORY, BC_BALANCE,
  FR_HOOK, FR_NAME, FR_TRAP, FR_OUT,
  EN_HOOK, EN_TREAD, EN_STUDY, EN_TRY,
// # pieces:end
]
for (const p of ALL) registerPiece({ ...p, mood: p.mood ?? moodOf(p.id) })
