// ---------------------------------------------------------------- s20–s28: thirty days from the end
// A) s20–s21  the NV1 chip builds a cube from SQUARES; the industry's pile is all TRIANGLES; a triangle-shaped gate
//             (TRIANGLES ONLY) — the square block bumps it and falls; a cross.
// B) s22–s24  a games console on a stand; two chips race toward it, Nvidia's lags; the other chip drops in; then a
//             visitor hands a $5 MILLION bag to the engineer; an hourglass marked 6 MONTHS starts running.
// C) s25      an office of 100 small desks: 60 go dark and fade; 40 stay; a spotlight on one new chip.
// D) s26–s27  the RIVA 128 on a stand; one pay envelope left; a wall calendar counts 30 DAYS down.
// E) s28      boxes stack up to the ceiling as a counter rolls to ≈ 1 MILLION in 4 MONTHS; the engineers celebrate.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Cal, Chip, Cross, Mark, Office, Room, Tag, X, XDefs, XGrain, BB, G, cues, fadeIn, scene } from './kit'

const K = {
  nv120: 's20:nv1', squares20: 's20:squares', triangles20: 's20:triangles',
  microsoft21: "s21:microsoft's", supported21: 's21:supported', makers21: 's21:makers', flopped21: 's21:flopped',
  sega22: "s22:sega's", console22: 's22:console', behind22: 's22:behind',
  another23: 's23:another', president23: 's23:president', five23: 's23:five', million23: 's23:million',
  money24: 's24:money', six24: 's24:six', live24: 's24:live',
  cut25: 's25:cut', hundred25: 's25:hundred', forty25: 's25:forty', everything25: 's25:everything', chip25: 's25:chip',
  riva26: 's26:riva', august26: 's26:august', cash26: 's26:cash', month26: 's26:month', wages26: 's26:wages',
  motto27: 's27:motto', thirty27: 's27:thirty', business27: 's27:business',
  sold28: 's28:sold', million28: 's28:million', four28: 's28:four', survived28: 's28:survived',
}

const Console: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={230} ry={16} fill="#000" opacity={0.14} />
    <rect x={-210} y={-150} width={420} height={150} rx={30} fill="#F4F4F0" stroke={X.paperDD} strokeWidth={5} />
    <circle cx={0} cy={-75} r={46} fill={X.paperD} /><rect x={-170} y={-40} width={70} height={14} rx={7} fill={X.coral} /><rect x={110} y={-40} width={60} height={14} rx={7} fill={X.sky} />
    <path d="M-70 -150 Q-120 -230 -60 -260" stroke={X.char} strokeWidth={8} fill="none" />
    <path d="M-120 -290 q60 -30 120 0 q20 30 -10 40 l-100 0 q-30 -10 -10 -40 Z" fill={X.char} />
  </g>
)
const Hourglass: React.FC<{ x: number; y: number; p: number; s?: number; o?: number }> = ({ x, y, p, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-330} width={220} height={24} rx={8} fill="#7A5A3A" /><rect x={-110} y={-24} width={220} height={24} rx={8} fill="#7A5A3A" />
    <path d="M-90 -306 L90 -306 L12 -165 L90 -24 L-90 -24 L-12 -165 Z" fill={X.glass} stroke="#B9CFCB" strokeWidth={5} />
    <path d={`M${-80 + 70 * p} ${-296 + 120 * p} L${80 - 70 * p} ${-296 + 120 * p} L8 -170 L-8 -170 Z`} fill={X.butter} />
    <path d={`M-80 -30 L80 -30 L${80 - 60 * (1 - p)} ${-30 - 110 * p} L${-80 + 60 * (1 - p)} ${-30 - 110 * p} Z`} fill={X.butter} />
    <rect x={-3} y={-170} width={6} height={140} fill={X.butterD} opacity={0.8} />
  </g>
)

const Death: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s22') - 4, BC = c('s25') - 4, CD = c('s26') - 4, DE = c('s28') - 4
  const A = scene(f, -20, AB), B = scene(f, AB, BC), C = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  const bump = easeInOut(span(f, t.makers21 - 4, t.flopped21))
  const fall = easeInOut(span(f, t.flopped21 - 2, t.flopped21 + 14))
  const race = (k: number) => easeInOut(span(f, t.console22 - 6, t.behind22 + 10)) * (k === 0 ? 0.55 : 1)
  const drop = easeInOut(span(f, t.another23 - 2, t.another23 + 12))
  const give = easeInOut(span(f, t.five23 - 4, t.million23 + 8))
  const dark = (k: number) => k >= 40 ? on(f, t.forty25 - 10 + (k % 20), 8) : 0
  const days = Math.max(0, 30 - Math.floor(span(f, t.thirty27, t.business27 + 20) * 29))
  const boxes = Math.floor(lerp(0, 28, span(f, t.sold28 - 2, t.four28 + 6)))
  return (
    <g>
      <XDefs />
      {/* ---------------- A) squares vs triangles ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room />
        <g transform={`translate(${lerp(480, 820, bump)} ${lerp(0, 160, fall)}) rotate(${fall * 40} 0 640)`}>
          <Chip x={0} y={460} s={0.55} lit={0.6} label="NV1" o={on(f, t.nv120 - 6, 8)} />
          {[0, 1, 2].map((k) => <rect key={k} x={-60 + k * 40} y={680 + k * -6} width={80} height={80} rx={6} fill={X.sky} stroke={X.skyD} strokeWidth={5} opacity={on(f, t.squares20 + k * 4, 6)} />)}
        </g>
        <g opacity={on(f, t.triangles20 - 2, 8)}>
          {Array.from({ length: 9 }, (_, k) => { const i = k % 3, j = Math.floor(k / 3); const x = 1380 + i * 110 + (j % 2) * 55, y = G - 10 - j * 96
            return <path key={k} d={`M${x - 52} ${y} L${x} ${y - 90} L${x + 52} ${y} Z`} fill={X.butter} stroke={X.butterD} strokeWidth={4} /> })}
          <Tag x={1490} y={540} text="THE INDUSTRY: TRIANGLES" size={36} bg={X.butterD} />
        </g>
        {/* the triangle-only gate */}
        <g opacity={on(f, t.microsoft21 - 4, 8)}>
          <rect x={1020} y={360} width={30} height={G - 360} fill={X.charL} /><rect x={1290} y={360} width={30} height={G - 360} fill={X.charL} />
          <rect x={1000} y={330} width={340} height={40} rx={10} fill={X.char} />
          <path d="M1070 860 L1170 640 L1270 860 Z" fill={X.paperD} stroke={X.ink} strokeWidth={6} />
          <Tag x={1170} y={300} text="TRIANGLES ONLY" size={38} bg={X.ink} o={on(f, t.supported21, 8)} />
        </g>
        <Cross x={760} y={700} r={90} p={span(f, t.flopped21 + 6, t.flopped21 + 18)} />
      </g>}

      {/* ---------------- B) Sega: lost, then $5 million ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        {(() => { const after = on(f, t.president23 - 4, 10); return <>
          <g opacity={1 - after}>
            <Console x={1500} y={G} s={1.05} o={on(f, t.console22 - 6, 8)} />
            <Tag x={1500} y={420} text="SEGA'S NEXT CONSOLE" size={40} bg={X.ink} o={on(f, t.sega22, 8)} />
            {[0, 1].map((k) => { const p = k === 1 ? Math.max(race(1), drop) : race(0); const x = lerp(260, 1360, p), y = k === 1 ? lerp(560, 760, drop) : 760
              return <Chip key={k} x={k === 1 && drop > 0 ? lerp(1360, 1500, drop) : x} y={k === 1 ? lerp(620, 790, drop) : y} s={0.32} lit={k === 0 ? 0.7 : 0} o={k === 1 ? 1 - drop * 0.9 : 1} label={k === 0 ? 'NV' : ''} /> })}
            <Tag x={520} y={900} text="FALLING BEHIND" size={38} bg={X.coral} o={on(f, t.behind22, 8)} />
          </g>
          <g opacity={after}>
            <Person f={f} who="buyer" beats={[[0, 'offer', 'smiling'], [t.million23 + 6, 'idle', 'smiling']]} x={560} y={1060} s={0.8} />
            <Person f={f} who="worker" beats={[[0, 'idle', 'worried'], [t.million23 + 4, 'receive', 'smiling'], [t.six24, 'think', 'thinking']]} x={1100} y={1060} s={0.8} flip />
            {(() => { const x = lerp(700, 980, give), y = lerp(640, 660, give); return <g transform={`translate(${x} ${y})`} opacity={on(f, t.five23 - 6, 6)}>
              <path d="M-70 0 Q-80 -90 0 -100 Q80 -90 70 0 Q60 40 0 40 Q-60 40 -70 0 Z" fill="#C8A46A" stroke="#8A6A3A" strokeWidth={5} />
              <text y={6} textAnchor="middle" fill="#5A3E1A" style={BB(46)}>$5M</text></g> })()}
            <Hourglass x={1560} y={G} s={0.95} p={span(f, t.six24, t.live24 + 60)} o={on(f, t.six24 - 4, 8)} />
            <Tag x={1560} y={500} text="6 MONTHS TO LIVE" size={40} bg={X.ink} o={on(f, t.six24 + 6, 8)} />
          </g>
        </> })()}
      </g>}

      {/* ---------------- C) 100 people → 40 ---------------- */}
      {C > 0 && <g opacity={C}>
        <Office />
        {Array.from({ length: 100 }, (_, k) => { const i = k % 20, j = Math.floor(k / 20); const d = dark(k)
          return <g key={k} opacity={(1 - d) * on(f, t.hundred25 - 8 + i, 6)}>
            <rect x={150 + i * 82} y={420 + j * 92} width={60} height={14} rx={4} fill="#8A6A44" />
            <circle cx={180 + i * 82} cy={398 + j * 92} r={14} fill={[X.char, X.skyD, X.coralD, X.tealD][k % 4]} /><rect x={168 + i * 82} y={406 + j * 92} width={24} height={14} rx={6} fill={[X.char, X.skyD, X.coralD, X.tealD][k % 4]} />
          </g> })}
        <Tag x={480} y={320} text="100 PEOPLE" size={46} bg={X.ink} o={on(f, t.hundred25, 8) * (1 - on(f, t.forty25, 8))} />
        <Tag x={480} y={320} text="40 LEFT" size={50} bg={X.coral} o={on(f, t.forty25 + 4, 8)} />
        <Chip x={1500} y={300} s={0.36} lit={on(f, t.chip25 - 2, 10)} o={on(f, t.everything25 - 2, 8)} label="NEW" />
      </g>}

      {/* ---------------- D) one month of cash ---------------- */}
      {D > 0 && <g opacity={D}>
        <Office dim={0.6} />
        <rect x={360} y={720} width={340} height={180} rx={10} fill="#8A6A44" /><rect x={420} y={G - 10} width={18} height={10} fill="#000" />
        <Chip x={530} y={560} s={0.6} lit={on(f, t.riva26 - 2, 10)} label="RIVA 128" o={on(f, t.riva26 - 6, 8)} />
        <Tag x={530} y={350} text="AUGUST 1997" size={40} bg={X.ink} o={on(f, t.august26, 8)} />
        <g transform="translate(1000 700)" opacity={on(f, t.cash26 - 2, 8)}>
          <rect x={-130} y={-80} width={260} height={160} rx={10} fill="#F3E7C9" stroke={X.paperDD} strokeWidth={4} />
          <path d="M-130 -80 L0 10 L130 -80" stroke={X.paperDD} strokeWidth={4} fill="none" />
          <Tag x={0} y={140} text="1 MONTH OF WAGES" size={36} bg={X.coralD} o={on(f, t.month26, 8)} />
        </g>
        <Cal x={1520} y={430} top="DAYS LEFT" big={String(days)} color={X.red} s={0.95} o={on(f, t.motto27 - 4, 8)} />
        <Tag x={1520} y={700} text="30 DAYS FROM THE END" size={40} bg={X.red} o={on(f, t.thirty27 + 2, 8)} />
      </g>}

      {/* ---------------- E) a million sold ---------------- */}
      {E > 0 && <g opacity={E}>
        <Room />
        {Array.from({ length: 28 }, (_, k) => { const i = k % 7, j = Math.floor(k / 7)
          return k < boxes && <g key={k} transform={`translate(${1060 + i * 110} ${G - 100 - j * 104})`}>
            <rect width={100} height={96} rx={6} fill="#D9B98E" stroke="#A8865A" strokeWidth={4} /><rect x={36} width={28} height={96} fill="#C29E6E" /></g> })}
        <Person f={f} who="worker" beats={[[0, 'idle', 'thinking'], [t.million28, 'celebrate', 'smiling'], [t.survived28, 'relief', 'smiling']]} x={520} y={1060} s={0.85} />
        <Tag x={1440} y={280} text={`≈ ${Math.round(boxes / 28 * 100) / 100 >= 1 ? '1 MILLION' : Math.round(boxes / 28 * 1000) + ',000'} SOLD`} size={50} bg={X.limeD} o={on(f, t.million28, 8)} />
        <Tag x={1440} y={380} text="IN 4 MONTHS" size={40} bg={X.ink} o={on(f, t.four28, 8)} />
      </g>}

      <Headline f={f} lines={[[c('s20'), 'THE FIRST CHIP', X.ink, 110], [t.sega22, 'A CONSOLE DEAL', X.ink, 110], [t.cut25, '1996', X.ink, 120], [t.riva26, 'ONE LAST CHIP', X.ink, 110], [t.sold28, 'IT WORKED', X.ink, 120]]} />
      <Mark f={f} at={(EXTRA['gx-death'] ?? []).map(c)} />
      <XGrain />
    </g>
  )
}

export const GX_DEATH = makePiece('gx-death', 'Thirty days from the end: the NV1 chip builds shapes from squares while the industry pile is all triangles; a TRIANGLES ONLY gate, the square block bumps it and falls with a cross; a games console on a stand with two chips racing to it, Nvidia falling behind, the other chip drops in; a visitor hands a $5M bag to the engineer and an hourglass marked 6 MONTHS TO LIVE runs; an office of 100 desks where 60 go dark, 40 left, a spotlight on one new chip; the RIVA 128 on a desk in a dim office, one pay envelope of 1 MONTH OF WAGES, a wall calendar counting down 30 DAYS; boxes stack up as ≈ 1 MILLION SOLD IN 4 MONTHS and the engineer celebrates', {
  mood: 'light', Component: Death, beats: [...Object.values(K), ...(EXTRA['gx-death'] ?? [])],
  sfx: [['s21:flopped', 'thud', 0.08], ['s28:survived', 'chime', 0.06]] })
