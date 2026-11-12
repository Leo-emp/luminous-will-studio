// ============================================================
// COVERS — "$100 in 1928: Why Investing Beats Saving Over Time"
// Story: $100 in the S&P 500 (dividends reinvested) from 1928 to 2025
// became about $1.16 million; in Treasury bills, about $2,600
// (Damodaran, NYU).
// Redrawn 2026-11-13 (owner disliked the flat "cheese" mountain and dark
// green): warm cream light, a real hill of stacked gold coins (INVESTED)
// beside a small glass jar with a few coins (SAVED); the saver is amazed.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261109-1252_100-dollars-in-1928-why-investing-beats-saving-over-time'
const INK = '#16223D'
const GOLD = '#F6C445', GOLD_MID = '#E3A72F', GOLD_DARK = '#B9801C'

// # one coin column, drawn bottom-up so each coin sits on the one below
// (x = centre, base = ground line, n = number of coins)
const CoinColumn: React.FC<{ x: number; base: number; n: number; rx?: number }> = ({ x, base, n, rx = 46 }) => {
  const ry = rx * 0.34, t = 13 // ellipse height and coin thickness
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const y = base - k * t
        return (
          <g key={k}>
            {/* the coin's edge band: bottom ellipse + side rectangle */}
            <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={GOLD_DARK} stroke={INK} strokeWidth={4} />
            <rect x={x - rx} y={y - t} width={rx * 2} height={t} fill={GOLD_MID} />
            <line x1={x - rx} y1={y - t} x2={x - rx} y2={y} stroke={INK} strokeWidth={4} />
            <line x1={x + rx} y1={y - t} x2={x + rx} y2={y} stroke={INK} strokeWidth={4} />
            {/* the coin's top face */}
            <ellipse cx={x} cy={y - t} rx={rx} ry={ry} fill={GOLD} stroke={INK} strokeWidth={4} />
          </g>
        )
      })}
      {/* a soft highlight on the top coin */}
      <ellipse cx={x - rx * 0.25} cy={base - n * t - 2} rx={rx * 0.45} ry={ry * 0.35} fill="#FFF3C4" opacity={0.85} />
    </g>
  )
}

// # a hill of coin columns: tall at the back centre, shorter in front
// (k stretches the hill taller, e.g. for the narrow Instagram frame)
const CoinHill: React.FC<{ x: number; base: number; k?: number }> = ({ x, base, k = 1 }) => {
  const back = [9, 16, 24, 31, 26, 18, 10].map((n) => Math.round(n * k))
  const front = [4, 8, 13, 15, 11, 6].map((n) => Math.round(n * k))
  return (
    <g>
      <ellipse cx={x} cy={base + 46} rx={360} ry={26} fill="#000" opacity={0.12} />
      {back.map((n, k) => <CoinColumn key={`b${k}`} x={x - 300 + k * 100} base={base} n={n} />)}
      {front.map((n, k) => <CoinColumn key={`f${k}`} x={x - 250 + k * 100} base={base + 40} n={n} />)}
      {/* sparkles */}
      {[[x - 40, base - 470 * k, 1.2], [x + 190, base - 330 * k, 0.9], [x - 260, base - 210 * k, 0.8]].map(([sx, sy, s], k) => (
        <path key={k} transform={`translate(${sx} ${sy}) scale(${s})`} d="M0 -34 L9 -9 L34 0 L9 9 L0 34 L-9 9 L-34 0 L-9 -9 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      ))}
    </g>
  )
}

// # a small glass savings jar with a few coins at the bottom
const SavingsJar: React.FC<{ x: number; base: number }> = ({ x, base }) => (
  <g strokeLinejoin="round">
    <ellipse cx={x} cy={base + 6} rx={92} ry={12} fill="#000" opacity={0.12} />
    {/* coins inside */}
    <CoinColumn x={x - 22} base={base - 14} n={2} rx={30} />
    <CoinColumn x={x + 26} base={base - 10} n={1} rx={30} />
    {/* glass body */}
    <path d={`M${x - 70} ${base - 180} Q${x - 84} ${base - 90} ${x - 72} ${base - 10} Q${x} ${base + 8} ${x + 72} ${base - 10} Q${x + 84} ${base - 90} ${x + 70} ${base - 180} Z`} fill="#DDF1FA" opacity={0.55} stroke={INK} strokeWidth={6} />
    <path d={`M${x - 46} ${base - 150} Q${x - 54} ${base - 95} ${x - 46} ${base - 40}`} stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.9} />
    {/* lid */}
    <rect x={x - 78} y={base - 212} width={156} height={34} rx={8} fill="#8FA6BF" stroke={INK} strokeWidth={6} />
    <rect x={x - 22} y={base - 202} width={44} height={10} rx={5} fill={INK} />
  </g>
)

// # a small navy pill label
const Label: React.FC<{ x: number; y: number; t: string; w: number }> = ({ x, y, t, w }) => (
  <g>
    <rect x={x - w / 2} y={y - 30} width={w} height={60} rx={30} fill={INK} />
    <text x={x} y={y + 15} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>
  </g>
)

// # 1 — amazed saver; a small jar of savings vs a hill of invested gold
export const INVEST_1 = makeCover({
  id: 'invest-1', job: JOB, canvas: 'wide',
  concept: '$100 in 1928 became about $1.16 million in US stocks (dividends reinvested) vs about $2,600 in Treasury bills: on warm cream light, a small glass jar with a few coins (SAVED) sits beside a big hill of stacked gold coins (INVESTED); the saver is amazed.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#FFF8E8" bottom="#F8E2B4" />
      <Burst canvas="wide" cx={1300} cy={560} color="#FFFFFF" opacity={0.35} rays={20} />
      <Glow id="hill" x={1300} y={640} r={480} color="#FFE7A0" opacity={0.6} />
      <Ground canvas="wide" y={1000} color="#D9B27A" edge="#EBCB97" />
      <Part name="hill" kind="object" x={940} y={440} w={720} h={600}>
        <CoinHill x={1300} base={950} />
        <Label x={1300} y={1040} t="INVESTED" w={220} />
      </Part>
      <Part name="jar" kind="object" x={690} y={760} w={190} h={310}>
        <SavingsJar x={785} base={985} />
        <Label x={785} y={1040} t="SAVED" w={150} />
      </Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={400} y={1380} scale={2.0} />
      <Words lines={[{ t: 'WHY INVESTING', size: 104 }, { t: 'BEATS SAVING', size: 124, color: '#F2B632' }, { t: 'OVER TIME', size: 104 }]} x={1300} y={56} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})

// # IG — Instagram Reel cover (1080x1920). The profile grid shows only the
// middle 3:4 (y 240–1680), so the logo, words and drawings all sit inside it.
export const INVEST_IG = makeCover({
  id: 'invest-ig', job: JOB, canvas: 'tall',
  concept: 'Instagram version of invest-1: same cream light, coin hill (INVESTED), glass jar (SAVED) and amazed saver, laid out tall with everything inside the 3:4 grid crop.',
  Component: () => (
    <CoverCanvas canvas="tall" emblem="tl" emblemY={276}>
      <Sky canvas="tall" top="#FFF8E8" bottom="#F8E2B4" />
      <Burst canvas="tall" cx={760} cy={1150} color="#FFFFFF" opacity={0.35} rays={20} />
      <Glow id="hillig" x={760} y={1180} r={420} color="#FFE7A0" opacity={0.6} />
      <Ground canvas="tall" y={1450} color="#D9B27A" edge="#EBCB97" />
      <Part name="hill" kind="object" x={515} y={820} w={440} h={710}>
        <g transform="translate(735 1400) scale(0.62) translate(-735 -1400)"><CoinHill x={735} base={1400} k={1.8} /></g>
        <Label x={735} y={1500} t="INVESTED" w={220} />
      </Part>
      <Part name="jar" kind="object" x={335} y={1190} w={170} h={340}>
        <SavingsJar x={420} base={1440} />
        <Label x={420} y={1500} t="SAVED" w={150} />
      </Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={125} y={1900} scale={1.42} />
      <Words lines={[{ t: 'WHY INVESTING', size: 124 }, { t: 'BEATS SAVING', size: 140, color: '#F2B632' }, { t: 'OVER TIME', size: 124 }]} x={560} y={300} rotate={-2} ring={INK} />
    </CoverCanvas>
  ),
})
