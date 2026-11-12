// ---------------------------------------------------------------- s1–s9: the hook — your $1,000 and Nvidia
// A) s1      you, with a shopping bag: no Nvidia box in it (a small cross on the empty bag).
// B) s2–s3   a big fund jar made of 500 dots; your coin drops in; then one dollar drawn as 100 cent-dots, 8.5 of them glow lime.
// C) s4      a January 1999 calendar page; you drop a $1,000 jar into a tiny workshop with a games chip on its roof.
// D) s5      the page flips to November 2026: the jar grows and fills, its tag turns to ≈ $7 MILLION.
// E) s6–s7   five early buyers with jars: one by one four jars empty and they walk away; one is left.
// F) s8–s9   the road of the video: six objects light up as named — diner cup, a 30-day calendar, a dot-bulb, a rack, coins, a signpost.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Cal, Chip, Coin, Cross, Jar, Mark, Rack, Room, Tag, X, XDefs, XGrain, BB, G, cues, fadeIn, scene, win } from './kit'

const K = {
  bought1: 's1:bought', nvidia1: 's1:nvidia',
  fund2: 's2:fund', tracks2: 's2:tracks', money2: 's2:money', now2: 's2:now',
  cents3: 's3:cents', dollar3: 's3:dollar', nvidia3: 's3:nvidia', alone3: 's3:alone',
  january4: 's4:january', thousand4: 's4:thousand', company4: 's4:company', games4: 's4:games',
  november5: 's5:november', become5: 's5:become', million5: 's5:million',
  early6: 's6:early', rich6: 's6:rich',
  nobody7: 's7:nobody', why7: 's7:why',
  chips8: 's8:chips', okay8: 's8:okay',
  diner9: 's9:diner', died9: 's9:died', idea9: 's9:idea', sells9: 's9:sells', money9: 's9:money', heading9: 's9:heading',
}

// # a cent grid: one dollar as 10×10 dots; `lit` dots (may be fractional) glow lime
export const CentGrid: React.FC<{ x: number; y: number; cell?: number; lit: number; o?: number }> = ({ x, y, cell = 46, lit, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <rect x={x - 26} y={y - 26} width={cell * 10 + 52} height={cell * 10 + 52} rx={24} fill={X.paperL} stroke={X.paperDD} strokeWidth={5} />
    {Array.from({ length: 100 }, (_, k) => { const i = k % 10, j = Math.floor(k / 10), part = Math.max(0, Math.min(1, lit - k))
      return <g key={k}><rect x={x + i * cell + 4} y={y + j * cell + 4} width={cell - 8} height={cell - 8} rx={8} fill={X.butterL} />
        {part > 0.01 && <rect x={x + i * cell + 4} y={y + j * cell + 4} width={(cell - 8) * part} height={cell - 8} rx={8} fill={X.lime} />}</g> })}
  </g>
)
// # a tiny 1999 workshop with a games chip on its roof
export const Workshop: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.14} />
    <rect x={-230} y={-260} width={460} height={260} fill={X.paperL} stroke={X.paperDD} strokeWidth={5} />
    <path d="M-260 -260 L0 -380 L260 -260 Z" fill={X.coral} />
    <rect x={-60} y={-150} width={120} height={150} rx={8} fill={X.charL} />
    <rect x={-190} y={-200} width={100} height={80} rx={6} fill={X.skyL} stroke={X.paperDD} strokeWidth={4} /><rect x={90} y={-200} width={100} height={80} rx={6} fill={X.skyL} stroke={X.paperDD} strokeWidth={4} />
    <g transform="translate(0 -330)"><Chip x={0} y={0} s={0.26} lit={lit} /></g>
  </g>
)
// # a dot-bulb: a light bulb drawn from small squares (the idea)
export const DotBulb: React.FC<{ x: number; y: number; s?: number; lit?: number; o?: number }> = ({ x, y, s = 1, lit = 0, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    {lit > 0.01 && <circle cy={-130} r={170} fill="url(#gx-halo)" opacity={lit} />}
    {Array.from({ length: 81 }, (_, k) => { const i = k % 9 - 4, j = Math.floor(k / 9) - 4; return Math.hypot(i, j) < 4.4 ? <rect key={k} x={i * 26 - 11} y={-130 + j * 26 - 11} width={22} height={22} rx={4} fill={lit > 0.5 ? X.butter : X.paperDD} /> : null })}
    <rect x={-40} y={-16} width={80} height={60} rx={10} fill={X.charL} />
  </g>
)
// # a signpost with two arrows
export const Signpost: React.FC<{ x: number; y: number; s?: number; o?: number; a?: string; b?: string }> = ({ x, y, s = 1, o = 1, a, b }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-10} y={-360} width={20} height={360} fill="#7A5A3A" />
    <path d="M-20 -340 L160 -340 L200 -300 L160 -260 L-20 -260 Z" fill={X.lime} />
    <path d="M20 -230 L-160 -230 L-200 -190 L-160 -150 L20 -150 Z" fill={X.butter} />
    {a && <text x={80} y={-286} textAnchor="middle" fill={X.charD} style={BB(40)}>{a}</text>}
    {b && <text x={-90} y={-176} textAnchor="middle" fill={X.charD} style={BB(40)}>{b}</text>}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s2') - 4, BC = c('s4') - 4, CD = c('s5') - 3, DE = c('s6') - 4, EF = c('s8') - 4
  const A = scene(f, -20, AB), B = scene(f, AB, BC), C = scene(f, BC, CD + 60), E = scene(f, DE, EF), F = fadeIn(f, EF)
  // C and D share one stage: the page flips, the jar grows
  const grow = easeInOut(span(f, t.become5 - 6, t.million5 + 10))
  const flip = on(f, t.november5 - 2, 10)
  const dropAt = (at: number) => easeInOut(span(f, at, at + 16))
  const leave = (k: number) => span(f, t.nobody7 + k * 7, t.nobody7 + k * 7 + 30)
  const stops: [number, number][] = [[260, t.diner9], [540, t.died9], [820, t.idea9], [1100, t.sells9], [1380, t.money9], [1660, t.heading9]]
  return (
    <g>
      <XDefs />
      {/* ---------------- A) never bought from Nvidia ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room />
        <Person f={f} who="investor" beats={[[0, 'hold', 'neutral'], [t.bought1, 'shrug', 'thinking']]} x={760} y={1060} s={0.85} />
        <g transform="translate(1240 0)">
          <path d="M-130 640 L130 640 L150 880 L-150 880 Z" fill={X.butterL} stroke={X.butterD} strokeWidth={5} />
          <path d="M-70 640 Q-70 560 0 560 Q70 560 70 640" stroke={X.butterD} strokeWidth={10} fill="none" />
          <Chip x={0} y={420} s={0.5} lit={on(f, t.nvidia1 - 6, 8)} o={on(f, t.bought1 - 4, 8)} />
          <Cross x={0} y={420} r={90} p={span(f, t.nvidia1, t.nvidia1 + 12)} />
        </g>
      </g>}

      {/* ---------------- B) the fund jar and one dollar of it ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        {(() => { const zoom = on(f, t.cents3 - 4, 12); return <>
          <g opacity={1 - zoom}>
            <Jar x={760} y={G} s={1.5} fill={on(f, t.fund2, 14)} label="S&P 500 FUND" />
            <Coin x={1240} y={lerp(380, G - 220, dropAt(t.money2))} r={44} o={on(f, t.money2 - 4, 6) * (1 - on(f, t.money2 + 18, 6))} />
            <Person f={f} who="investor" beats={[[0, 'present', 'neutral'], [t.money2, 'point', 'smiling'], [t.now2, 'idle', 'thinking']]} x={1420} y={1060} s={0.8} />
          </g>
          <g opacity={zoom}>
            <CentGrid x={440} y={300} cell={52} lit={lerp(0, 8.5, span(f, t.dollar3, t.nvidia3 + 4))} />
            <Tag x={1400} y={430} text="ONE DOLLAR = 100 CENTS" size={42} bg={X.ink} o={on(f, t.dollar3, 8)} />
            <Tag x={1400} y={560} text="≈ 8.5¢ IN NVIDIA" size={52} bg={X.limeD} o={on(f, t.nvidia3, 8)} />
            <Tag x={1400} y={680} text="OCTOBER 2026" size={36} bg={X.inkL} o={on(f, t.alone3, 8)} />
          </g>
        </> })()}
      </g>}

      {/* ---------------- C+D) January 1999 → November 2026 ---------------- */}
      {C > 0 && <g opacity={C}>
        <Room />
        <Cal x={330} y={420} top={flip > 0.5 ? 'NOVEMBER' : 'JANUARY'} big={flip > 0.5 ? '2026' : '1999'} color={flip > 0.5 ? X.limeD : X.coral} s={0.9} r={-3} o={on(f, t.january4 - 4, 8)} />
        <Workshop x={1450} y={G} s={0.85} lit={on(f, t.games4, 10)} o={on(f, t.company4 - 4, 8) * (1 - grow)} />
        <Person f={f} who="investor" beats={[[0, 'hold', 'smiling'], [t.company4, 'offer', 'smiling'], [t.november5, 'idle', 'thinking'], [t.million5, 'shock', 'shocked']]} x={760} y={1060} s={0.85} />
        {(() => { const slide = easeInOut(span(f, t.company4, t.games4 + 6)); const jx = lerp(980, 1180, slide) + grow * 120, jy = G
          return <Jar x={jx} y={jy} s={lerp(0.55, 1.35, grow)} fill={lerp(0.1, 1, grow)} label={grow > 0.5 ? '≈ $7 MILLION' : '$1,000'} glow={grow} o={on(f, t.thousand4 - 2, 8)} /> })()}
      </g>}

      {/* ---------------- E) early buyers ---------------- */}
      {E > 0 && <g opacity={E}>
        <Room />
        {[0, 1, 2, 3, 4].map((k) => { const gone = k === 2 ? 0 : leave(k > 2 ? k - 1 : k); const x = 300 + k * 330 + (k < 2 ? -1 : 1) * gone * 500
          return <g key={k} opacity={1 - gone}>
            <Mini look={['buyer', 'worker', 'owner', 'hero', 'investor'][k]} x={x} y={G - 10} scale={0.9} frame={f} seed={k + 7} mood={gone > 0.1 ? 'sad' : 'happy'} />
            <Jar x={x + 110} y={G} s={0.42} fill={k === 2 ? 1 : 1 - Math.min(1, gone * 3)} />
          </g> })}
        <Tag x={960} y={330} text="EARLY BUYERS" size={48} bg={X.ink} o={on(f, t.early6, 8) * (1 - on(f, t.nobody7, 8))} />
        <Tag x={960} y={330} text="WHO HELD ON?" size={48} bg={X.coral} o={on(f, t.nobody7 + 4, 8)} />
      </g>}

      {/* ---------------- F) the road of the video ---------------- */}
      {F > 0 && <g opacity={F}>
        <Room />
        <path d="M120 760 Q960 700 1800 760" stroke={X.paperDD} strokeWidth={26} fill="none" strokeLinecap="round" />
        {stops.map(([x, at], k) => { const lit = on(f, at - 2, 8), o = on(f, at - 6, 8); return <g key={k} opacity={0.35 + 0.65 * o}>
          <circle cx={x} cy={740} r={20} fill={lit > 0.5 ? X.lime : X.paperDD} />
          <g transform={`translate(${x} 640) scale(${0.9 + 0.12 * lit})`}>
            {k === 0 && <g><path d="M-60 -90 L60 -90 L50 0 L-50 0 Z" fill="#fff" stroke={X.coralD} strokeWidth={6} /><path d="M60 -70 q40 0 40 30 q0 30 -40 30" stroke={X.coralD} strokeWidth={8} fill="none" /><path d="M-20 -110 q10 -20 0 -40 M10 -110 q10 -20 0 -40" stroke={X.inkL} strokeWidth={5} fill="none" opacity={lit} /></g>}
            {k === 1 && <Cal x={0} y={-70} top="DAYS" big="30" s={0.42} color={X.red} />}
            {k === 2 && <DotBulb x={0} y={30} s={0.55} lit={lit} />}
            {k === 3 && <Rack x={0} y={10} s={0.2} lit={lit > 0.5 ? 9 : 0} f={f} />}
            {k === 4 && <g>{[0, 1, 2, 3].map((j) => <Coin key={j} x={0} y={-20 - j * 22} r={46} />)}</g>}
            {k === 5 && <Signpost x={0} y={20} s={0.36} />}
          </g>
        </g> })}
      </g>}

      <Headline f={f} lines={[[c('s1'), 'YOU AND NVIDIA', X.ink, 110], [t.cents3 - 4, 'ONE DOLLAR OF THAT FUND', X.ink, 100], [c('s4'), 'JANUARY 1999', X.ink, 110], [t.november5, 'NOVEMBER 2026', X.ink, 110], [c('s6'), 'SO WHO GOT RICH?', X.ink, 110], [c('s9'), 'THE WHOLE STORY, STEP BY STEP', X.ink, 96]]} />
      <Mark f={f} at={(EXTRA['gx-hook'] ?? []).map(c)} />
      <XGrain />
    </g>
  )
}

export const GX_HOOK = makePiece('gx-hook', 'Hook: you hold an empty shopping bag with a crossed-out chip; a fund jar of coins takes your coin, then one dollar drawn as 100 cent-dots with 8.5 glowing lime for Nvidia; a January 1999 calendar and a $1,000 jar slid into a tiny workshop with a games chip on its roof; the page flips to November 2026 and the jar grows into a glowing ≈ $7 MILLION jar; five early buyers with jars, four empty out and walk away; the road of the video with six objects lighting up: diner cup, 30-day calendar, dot-bulb, rack, coins, signpost', {
  mood: 'light', Component: Hook, beats: [...Object.values(K), ...(EXTRA['gx-hook'] ?? [])],
  sfx: [['s5:million', 'riser', 0.06], ['s2:money', 'coin', 0.1]] })
