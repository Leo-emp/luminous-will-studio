// ============================================================
// COVERS — "How Retirement Accounts Actually Work: 401(k), IRA and Roth"
// Drawn with this video's own art (art/diorama/retire/kit.tsx, "JORDAN'S GREENHOUSE"):
// an account is a glass greenhouse box, the investments are potted money plants,
// tax is the grey TAX envelope. Words = one full, true sentence (owner rule 2026-11-10).
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Box, Coin, GreenRoom, Label, Office, Plant, R, TaxBox } from '../diorama/retire/kit'

const JOB = '20261112-0456_how-retirement-accounts-actually-work-401k-ira-and-roth'
const FLOOR = 960 // # the bench/floor line all three covers stand on

// # 1 — three greenhouse boxes in a row, tagged 401(K) / IRA / ROTH; Jordan scratching his head
export const RT_C1 = makeCover({
  id: 'retire-1', job: JOB, canvas: 'wide',
  concept: 'Alphabet soup, solved: three glass greenhouse boxes on the bench tagged 401(K), IRA and ROTH, each with a money plant inside; the hero scratches his head.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <GreenRoom id="rtc1" f={0} mood="gold" floor={FLOOR} />
      <Burst canvas="wide" cx={1330} cy={760} color="#FFFFFF" opacity={0.2} rays={18} />
      {/* # three boxes, each a different account, spaced so the tags never touch */}
      <Part name="boxes" kind="object" x={760} y={570} w={920} h={400}>
        {[['401(K)', 920, 0.9], ['IRA', 1210, 0.7], ['ROTH', 1500, 0.8]].map(([t, x, g]) => (
          <Box key={t as string} x={x as number} y={FLOOR} s={0.68} tag={t as string} tagColor={R.gold}>
            <Plant x={0} y={-20} s={1} grow={g as number} />
          </Box>
        ))}
      </Part>
      <Hero who="investor" pose="scratchHead" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHAT A 401(K), IRA', size: 112 }, { t: 'AND ROTH', size: 135 }, { t: 'REALLY ARE', size: 150, color: R.gold }]} x={1380} y={56} rotate={-2} ring={R.forestD} />
    </CoverCanvas>
  ),
})

// # 2 — the match: company coins pour into Jordan's 401(k) box; hero shocked, pointing at it
export const RT_C2 = makeCover({
  id: 'retire-2', job: JOB, canvas: 'wide',
  concept: 'Money left on the table: a 401(k) greenhouse in Jordan\'s office filling with green coins (his pay) and gold coins arcing in from work, tagged +50¢ PER $1; the shocked hero points at it.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Office id="rtc2" f={0} floor={FLOOR} desk={false} />
      <Burst canvas="wide" cx={1250} cy={720} color={R.gold} opacity={0.18} rays={18} />
      <Part name="box" kind="object" x={1010} y={520} w={460} h={450}>
        <Box x={1240} y={FLOOR} s={0.82} tag="401(K)" tagColor={R.gold} glow={1}>
          {/* # the stack inside: green = Jordan's own pay, gold = the company match on top */}
          {Array.from({ length: 9 }, (_, k) => <ellipse key={k} cx={0} cy={-50 - k * 20} rx={110} ry={18} fill={k < 6 ? R.leaf : R.gold} stroke={k < 6 ? R.forestD : R.goldD} strokeWidth={3} />)}
        </Box>
      </Part>
      {/* # gold match coins arcing in from the right */}
      <Part name="match" kind="extra" x={1500} y={560} w={300} h={260} touches={['box']}>
        {[[1720, 780], [1640, 680], [1540, 620]].map(([x, y], k) => <Coin key={k} x={x} y={y} s={1.1} />)}
      </Part>
      <Part name="tag" kind="object" x={1450} y={860} w={360} h={70} touches={['box']}>
        <Label x={1630} y={900} text="+50¢ PER $1" size={56} fill={R.gold} />
      </Part>
      <Hero who="investor" pose="point" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY SAVING LESS', size: 120 }, { t: 'THAN THE MATCH', size: 125 }, { t: 'COSTS YOU MONEY', size: 135, color: R.gold }]} x={1380} y={56} rotate={-2} ring={R.slateD} />
    </CoverCanvas>
  ),
})

// # 3 — traditional vs Roth: two equal greenhouses; the TAX envelope sits at the exit of one and the entrance of the other
export const RT_C3 = makeCover({
  id: 'retire-3', job: JOB, canvas: 'wide',
  concept: 'Same plant, different door: two equal greenhouses tagged TRADITIONAL and ROTH with the same grown money plant; the grey TAX envelope hangs at the way OUT of one and the way IN of the other; the hero thinks.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <GreenRoom id="rtc3" f={0} mood="day" floor={FLOOR} />
      <Burst canvas="wide" cx={1320} cy={760} color="#FFFFFF" opacity={0.22} rays={18} />
      <Part name="trad" kind="object" x={860} y={560} w={360} h={420}>
        <Box x={1040} y={FLOOR} s={0.72} tag="TRADITIONAL" tagColor={R.paper} door="out" doorTax={1}><Plant x={0} y={-20} grow={1} /></Box>
      </Part>
      <Part name="roth" kind="object" x={1340} y={560} w={350} h={420}>
        <Box x={1520} y={FLOOR} s={0.72} tag="ROTH" tagColor={R.gold} door="in" doorTax={1}><Plant x={0} y={-20} grow={1} /></Box>
      </Part>
      <Part name="equal" kind="extra" x={1245} y={760} w={70} h={70}>
        <rect x={1245} y={770} width={70} height={16} rx={8} fill={R.forest} /><rect x={1245} y={806} width={70} height={16} rx={8} fill={R.forest} />
      </Part>
      <Hero who="investor" pose="scratchHead" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'ROTH OR TRADITIONAL', size: 108 }, { t: 'IS REALLY ABOUT', size: 120 }, { t: 'WHEN YOU PAY TAX', size: 130, color: R.gold }]} x={1380} y={56} rotate={-2} ring={R.forestD} />
    </CoverCanvas>
  ),
})

export const RETIRE_COVERS = [RT_C1, RT_C2, RT_C3]
void TaxBox
