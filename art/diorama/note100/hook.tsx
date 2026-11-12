// ---------------------------------------------------------------- s1–s7: the hook, on engraved banknote paper.
// A) you hold up a $100 note; a little press prints it and an 11¢ tag swings from its corner. B) the corner shop:
//    the shopkeeper slides a bag of groceries across the counter and takes the note. C) a balance scale: an 11¢ cent
//    against the note — it tips, ≈ 885×. D) you think "gold": the note sits on a pile of gold bars, then the bars get
//    a cross; the note can't be swapped for gold, silver or anything else (each crossed) — a 1934 calendar page.
// E) the note splits: an 11¢ paper sliver falls off, the rest is $99.89 ?; an economics degree cap gets a cross;
//    the note folds into three numbered panels.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { NoteWorld, Vig, Headline, Ribbon, Cross, Note, Cent, Bar, Groceries, Scale, Press, CalPage, Tag, Glint, flyTo, win, CX, INKG, GREEN, RED, GOLD, CREAM, WOOD, WOOD2, PAPER2, SHADE, TXT, NAVY } from './kit'

const FLOOR = 1240
const Counter: React.FC<{ o: number; dx?: number }> = ({ o, dx = 0 }) => (
  <g opacity={o} transform={`translate(${dx} 0)`}>
    <rect x={430} y={1010} width={560} height={30} rx={6} fill="#EFE4CB" stroke={INKG} strokeWidth={4} />
    <rect x={450} y={1040} width={520} height={200} fill={WOOD} stroke={INKG} strokeWidth={4} />
    {[0, 1, 2].map((k) => <rect key={k} x={470 + k * 170} y={1064} width={140} height={150} rx={6} fill="none" stroke={WOOD2} strokeWidth={4} opacity={0.7} />)}
  </g>
)
const Cap: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={70} rx={110} ry={12} fill={SHADE} />
    <path d="M-70 0 L-70 50 Q0 80 70 50 L70 0 Z" fill={NAVY} stroke={INKG} strokeWidth={4} />
    <path d="M-150 -10 L0 -70 L150 -10 L0 50 Z" fill={NAVY} stroke={INKG} strokeWidth={4} />
    <circle cx={0} cy={-10} r={8} fill={GOLD} />
    <g transform={`rotate(${Math.sin(f / 14) * 6} 0 -10)`}><path d="M0 -10 L120 20 L120 90" fill="none" stroke={GOLD} strokeWidth={5} /><rect x={112} y={86} width={16} height={36} rx={4} fill={GOLD} /></g>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const holding = c('s1:holding'), d100 = c('s1:100'), bill = c('s1:bill'), cost = c('s1:cost'), d11 = c('s1:11'), print = c('s1:print')
  const shop = c('s2:shop'), happily = c('s2:happily'), give = c('s2:give'), groceries = c('s2:groceries'), forit = c('s2:for')
  const s3 = c('s3'), d885 = c('s3:885'), times = c('s3:times'), make = c('s3:make')
  const thinking = c('s4:thinking'), okay = c('s4:okay'), backed = c('s4:backed'), gold4 = c('s4:gold')
  const isnt = c("s5:isn't"), swap = c('s5:swap'), gold5 = c('s5:gold'), silver = c('s5:silver'), anything = c('s5:anything'), els = c('s5:else'), since = c('s5:since')
  const y1934 = since + 9
  const other = c('s6:other'), d99 = c('s6:99'), d89 = c('s6:89'), come = c('s6:come')
  const degree = c('s7:degree'), dont = c("s7:don't"), comes = c('s7:comes'), three = c('s7:three'), things = c('s7:things')

  const A = win(f, 0, shop - 2), B = win(f, shop - 2, s3 - 2), C = win(f, s3 - 2, thinking - 2), D1 = win(f, thinking - 2, swap - 2), D2 = win(f, swap - 2, c('s6') - 2), E = on(f, c('s6') - 2, 7)

  // # A: you + the note held up
  const youA: Beat[] = [[0, 'holdUp', 'smiling'], [cost, 'holdUp', 'thinking'], [print, 'holdUp', 'shocked']]
  const hA = hand(f, youA, 270, FLOOR, 0.78)
  // # B: you hand it over the counter
  const youB: Beat[] = [[shop - 2, 'idle', 'smiling'], [happily, 'idle', 'smiling'], [groceries, 'receive', 'smiling'], [forit, 'offer', 'smiling']]
  const keeper: Beat[] = [[shop - 2, 'waveA', 'smiling', 'waveB', 12], [give, 'offer', 'smiling'], [forit + 8, 'receive', 'smiling']]
  const hB = hand(f, youB, 230, FLOOR, 0.74)
  const noteB = flyTo(f, forit, [hB.x, hB.y - 60], [740, 760], 18, 120)
  // # D1: thinking of gold
  const youD: Beat[] = [[thinking - 2, 'think', 'thinking'], [okay, 'scratchHead', 'thinking'], [gold4, 'point', 'smiling'], [isnt, 'crossNoA', 'worried', 'crossNoB', 14]]
  const slide = on(f, isnt + 6, 14)

  return (
    <g>
      <NoteWorld f={f} id="nb-hook" floor={FLOOR} />
      {/* # A) the note in your hand, the press, the 11¢ tag */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, cost, 8)} transform={`translate(${lerp(1100, 760, on(f, cost, 16))} 0)`}>
          <Press x={0} y={FLOOR} s={0.62} f={f} speed={f >= print ? 3 : 1} />
          {f >= print && <g opacity={on(f, print, 6)}><Note x={-10} y={FLOOR - 40 - 60 * on(f, print, 30)} s={0.28} f={f} /></g>}
        </g>
        <Person f={f} who="investorF" beats={youA} x={270} y={FLOOR} s={0.78} o={on(f, holding - 4, 8)} />
        <g opacity={on(f, d100 - 2, 6)}><Note x={hA.x + 40} y={hA.y - 130} s={0.68 * pop(f, d100 - 2)} f={f} glow={on(f, bill, 10) * (1 - on(f, cost, 10))} /></g>
        <g opacity={on(f, d11, 6)}>
          <line x1={hA.x + 230} y1={hA.y - 60} x2={hA.x + 280} y2={hA.y + 10} stroke={INKG} strokeWidth={3} />
          <Tag x={hA.x + 290} y={hA.y + 0} t="11¢" s={pop(f, d11)} r={-6 + Math.sin((f - d11) / 7) * 4 * (1 - on(f, d11 + 20, 20))} col="#F7D9C4" tc={RED} />
        </g>
        <g opacity={on(f, print, 6)}><Ribbon x={760} y={1010} t="TO PRINT" size={40} col={GREEN} /></g>
      </g>}
      {/* # B) the shop counter */}
      {B > 0.001 && <g opacity={B}>
        <g transform={`translate(${lerp(400, 0, on(f, shop - 2, 16))} 0)`}>
          <Person f={f} who="owner" beats={keeper} x={760} y={1180} s={0.7} />
          <Counter o={1} />
        </g>
        <g opacity={on(f, give, 6)} transform={`translate(${lerp(760, 500, on(f, groceries, 18))} 0)`}><Groceries x={0} y={1012} s={0.95 * pop(f, give)} /></g>
        <Person f={f} who="investorF" beats={youB} x={230} y={FLOOR} s={0.74} />
        <Note x={noteB[0]} y={noteB[1]} s={lerp(0.34, 0.3, noteB[2])} r={lerp(-8, 6, noteB[2])} f={f} />
      </g>}
      {/* # C) the scale: 11¢ against $100 */}
      {C > 0.001 && <g opacity={C}>
        <Scale x={CX} y={FLOOR} s={0.95 * pop(f, s3 - 2)} tilt={-0.8 + 1.6 * on(f, d885, 20)}
          left={<g><Cent x={0} y={-48} s={0.8} t="11¢" /></g>}
          right={<g><Note x={0} y={-84} s={0.33} f={f} glow={on(f, times, 10)} /></g>} />
        <Glint f={f} at={make} x={CX + 290} y={760} />
      </g>}
      {/* # D1) you think "backed by gold": the note on a pile of bars — then the bars are crossed out */}
      {D1 > 0.001 && <g opacity={D1}>
        <Person f={f} who="investorF" beats={youD} x={230} y={FLOOR} s={0.76} />
        <g opacity={on(f, okay, 8)}>
          {[0, 1, 2, 3, 4, 5].map((k) => { const row = k < 3 ? 0 : k < 5 ? 1 : 2, col = k < 3 ? k - 1 : k < 5 ? k - 3.5 : 0
            return <g key={k} opacity={on(f, gold4 + k * 2, 6)} transform={`translate(${lerp(0, 260, slide) * (k % 2 ? 1 : -1) * 0} ${lerp(0, 40, slide)})`}><Bar x={680 + col * 200} y={1180 - row * 84} s={0.9} /></g> })}
          <g transform={`translate(0 ${lerp(0, 120, slide)})`}><Note x={680} y={lerp(700, 860, on(f, backed, 14)) + 0} s={0.62 * pop(f, okay)} f={f} /></g>
        </g>
        <g opacity={on(f, isnt, 6)}><Cross x={680} y={1060} s={1.1 * pop(f, isnt)} /></g>
      </g>}
      {/* # D2) can't swap it for gold, silver or anything else — not since 1934 */}
      {D2 > 0.001 && <g opacity={D2}>
        <Note x={370} y={620} s={0.66 * pop(f, swap - 2)} f={f} />
        {[[230, gold5], [500, silver], [770, anything]].map(([x, at], k) => <g key={k} opacity={on(f, at, 6)}>
          <path d={`M370 ${770} Q${(370 + x) / 2} ${860} ${x} ${960}`} fill="none" stroke={INKG} strokeWidth={5} strokeDasharray="14 12" opacity={0.6 * on(f, at, 10)} />
          <g transform={`translate(${x} 0) scale(${pop(f, at)}) translate(${-x} 0)`}>
            {k === 0 && <Bar x={x} y={1180} s={1} />}
            {k === 1 && <Bar x={x} y={1180} s={1} silver />}
            {k === 2 && <g transform={`translate(${x} 1180)`}><ellipse cx={0} cy={4} rx={110} ry={12} fill={SHADE} /><rect x={-90} y={-150} width={180} height={150} rx={8} fill="#D6B27A" stroke={INKG} strokeWidth={4} /><path d="M-90 -110 L90 -110" stroke={WOOD2} strokeWidth={5} /><text y={-30} textAnchor="middle" fill={INKG} style={TXT(80)}>?</text></g>}
          </g>
          <g opacity={on(f, els + k * 2, 6)}><Cross x={x} y={1100} s={0.75 * pop(f, els + k * 2)} /></g>
        </g>)}
        <g opacity={on(f, y1934, 6)}><CalPage x={790} y={620} t="1934" sub="SINCE" s={0.9 * pop(f, y1934)} r={6} /></g>
      </g>}
      {/* # E) the split: 11¢ of paper + $99.89 of what? → a degree cap (not needed) → three panels */}
      {E > 0.001 && <g opacity={E}>
        {(() => {
          const sp = on(f, other, 16), fall = on(f, other + 8, 20), fold = on(f, three, 18), capO = win(f, dont, comes, 7)
          const lift = on(f, dont, 14) * (1 - fold)
          return <g>
            {/* # the remainder: a note missing its left sliver */}
            <g opacity={1 - fold}>
              <clipPath id="nb-rest"><rect x={CX - 300 * 1.1 + 34} y={0} width={700} height={1920} /></clipPath>
              <g clipPath={sp > 0 ? 'url(#nb-rest)' : undefined} transform={`translate(${12 * sp} ${-140 * lift})`}><Note x={CX} y={680} s={1.1} f={f} glow={on(f, d89, 10)} /></g>
              {sp > 0 && <g transform={`translate(${-60 * sp} ${lerp(0, 380, fall)}) rotate(${-14 * fall} ${CX - 312} 680)`}>
                <clipPath id="nb-sliver"><rect x={CX - 330} y={0} width={34} height={1920} /></clipPath>
                <g clipPath="url(#nb-sliver)"><Note x={CX} y={680} s={1.1} f={f} /></g>
              </g>}
              <g opacity={on(f, other + 20, 6) * (1 - lift)}><Ribbon x={CX - 230} y={1150} t="11¢ PAPER" size={44} col="#F7D9C4" tc={RED} /></g>
              <g opacity={on(f, d89, 6) * (1 - lift)}><Ribbon x={CX + 40} y={920} t="$99.89 = ?" size={64} col={GREEN} s={pop(f, d89)} /></g>
              <Glint f={f} at={come} x={CX + 260} y={560} />
            </g>
            {/* # no economics degree needed */}
            {capO > 0.001 && <g opacity={capO}><Cap x={CX} y={980} s={pop(f, degree)} f={f} /><g opacity={on(f, degree + 8, 6)}><Cross x={CX} y={990} s={1.05} /></g></g>}
            {/* # three numbered panels, the note folded in three */}
            {fold > 0.001 && [0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 3, 6)} transform={`translate(${lerp(CX, 200 + k * 300, fold)} ${lerp(680, 820, fold)}) rotate(${lerp(0, (k - 1) * 4, fold)}) scale(${pop(f, three + k * 3)})`}>
              <rect x={-130} y={-200} width={260} height={400} rx={14} fill={SHADE} transform="translate(8 10)" />
              <rect x={-130} y={-200} width={260} height={400} rx={14} fill="#CFE3D2" stroke={INKG} strokeWidth={5} />
              <rect x={-112} y={-182} width={224} height={364} rx={8} fill="none" stroke={INKG} strokeWidth={2} />
              <circle cx={0} cy={-10} r={88} fill={CREAM} stroke={INKG} strokeWidth={4} />
              <text y={36} textAnchor="middle" fill={INKG} style={TXT(140)}>{k + 1}</text>
              <Glint f={f} at={things + k * 4} x={80} y={-140} />
            </g>)}
          </g>
        })()}
      </g>}
      <Vig id="nb-hook" />
      <Headline f={f} lines={[[d100, 'A $100 BILL', INKG, 104], [d11, 'COSTS ABOUT 11¢', RED, 100], [groceries, '$100 OF GROCERIES', INKG, 92], [d885, '≈ 885× ITS COST', GREEN, 96], [gold4, 'BACKED BY GOLD?', INKG, 100], [isnt, 'NO', RED, 130], [since, 'NOT SINCE 1934', INKG, 96], [d99, 'WHERE IS THE REST?', INKG, 96], [three, '3 THINGS', GREEN, 120]]} />
    </g>
  )
}

export const NB_HOOK = makePiece('nb-hook', 'Hook on engraved banknote paper: you hold up a green $100 note while a little press prints it and a peach 11¢ tag swings from its corner (TO PRINT); the corner shop slides in — a smiling shopkeeper pushes a bag of groceries across a wooden counter ($100 OF GROCERIES) and the note flies to him; a gold balance scale weighs an 11¢ cent against the note and tips (≈ 885×); you think "backed by gold?" as the note sits on a pile of gold bars, then a red cross; the note cannot be swapped for a gold bar, a silver bar or a mystery crate (each crossed) — a 1934 calendar page; the note splits, an 11¢ PAPER sliver falls off, the rest reads $99.89 = ?; an economics degree cap gets a cross; the note folds into three numbered panels.', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1:holding", "s1:100", "s1:bill", "s1:cost", "s1:11", "s1:print", "s2:shop", "s2:happily", "s2:give", "s2:groceries", "s2:for", "s3", "s3:885", "s3:times", "s3:make", "s4:thinking", "s4:okay", "s4:backed", "s4:gold", "s5:isn't", "s5:swap", "s5:gold", "s5:silver", "s5:anything", "s5:else", "s5:since", "s6:other", "s6:89", "s6:come", "s7:degree", "s7:don't", "s7:comes", "s7:three", "s7:things", "s6"],
  sfx: [['s1:11', 'pop', 0.25], ['s2:for', 'coin', 0.25], ['s3:885', 'ding', 0.3], ["s5:isn't", 'thud', 0.3], ['s6:other', 'whoosh', 0.2], ['s7:three', 'pop', 0.25]] })
