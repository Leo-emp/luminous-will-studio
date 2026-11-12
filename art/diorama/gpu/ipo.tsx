// ---------------------------------------------------------------- s29–s32: the IPO, your 83 shares, the first GPU
// A) s29     a stock-exchange hall at night; a flip board clicks to NVDA · $12.00 · JANUARY 1999.
// B) s30     your $1,000 jar tips; coins pour into a stack of share certificates; a counter rolls to 83 SHARES.
// C) s31     a GeForce 256 retail box slides in; its window shows the chip; a tag GPU = GRAPHICS PROCESSING UNIT.
// D) s32     the chip lifts out of the box; inside its outline a dot-bulb glows faintly — the idea still hidden.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Chip, Coin, Floor, Jar, Mark, Room, Share, Tag, X, XDefs, XGrain, BB, G, cues, fadeIn, scene } from './kit'
import { DotBulb } from './hook'

const K = {
  january29: 's29:january', shares29: 's29:shares', market29: 's29:market', twelve29: 's29:twelve',
  thousand30: 's30:thousand', twelve30: 's30:twelve', comes30: 's30:comes', buys30: 's30:buys', eightythree30: 's30:eighty-three', shares30: 's30:shares',
  later31: 's31:later', geforce31: 's31:geforce', first31: 's31:first', gpu31: 's31:gpu', unit31: 's31:unit',
  gaming32: 's32:gaming', biggest32: 's32:biggest', hidden32: 's32:hidden',
}

const Ipo: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s30') - 4, BC = c('s31') - 4
  const A = scene(f, -20, AB), B = scene(f, AB, BC), C = fadeIn(f, BC)
  const flipT = (at: number) => on(f, at - 2, 10)
  const tip = easeInOut(span(f, t.comes30 - 2, t.buys30 + 6))
  const n = Math.round(lerp(0, 83, span(f, t.buys30, t.eightythree30 + 6)))
  const lift = easeInOut(span(f, t.biggest32 - 4, t.hidden32 + 6))
  return (
    <g>
      <XDefs />
      {/* ---------------- A) the flip board ---------------- */}
      {A > 0 && <g opacity={A}>
        <Floor />
        <rect x={360} y={300} width={1200} height={420} rx={20} fill={X.charD} stroke={X.charL} strokeWidth={8} />
        {[['NVDA', t.shares29], ['$12.00', t.twelve29], ['JAN 1999', t.january29]].map(([txt, at], k) => { const p = flipT(at as number)
          return <g key={k} transform={`translate(960 ${400 + k * 120})`}>
            <rect x={-500} y={-50} width={1000} height={100} rx={10} fill="#11151B" />
            <g transform={`scale(1 ${Math.max(0.02, p < 0.5 ? 1 - p * 2 : (p - 0.5) * 2)})`}>
              <text y={30} textAnchor="middle" fill={p >= 0.5 ? (k === 1 ? X.glow : X.butter) : '#2E3542'} style={BB(84, 10)}>{p >= 0.5 ? txt as string : '— — — —'}</text></g>
          </g> })}
        <Tag x={960} y={820} text="FIRST DAY ON THE STOCK MARKET" size={44} bg={X.limeD} o={on(f, t.market29, 8)} />
      </g>}

      {/* ---------------- B) $1,000 → 83 shares ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        <Person f={f} who="investor" beats={[[0, 'present', 'smiling'], [t.buys30, 'point', 'smiling'], [t.shares30, 'thumbsUp', 'smiling']]} x={330} y={1060} s={0.8} />
        <g transform={`translate(720 ${G}) rotate(${tip * 70} 0 -150)`}><Jar x={0} y={0} s={0.8} fill={1 - span(f, t.buys30, t.eightythree30 + 6)} label="$1,000" /></g>
        {f > t.comes30 && f < t.eightythree30 + 10 && [0, 1, 2, 3].map((k) => { const p = ((f - t.comes30) / 14 + k / 4) % 1
          return <Coin key={k} x={lerp(900, 1240, p)} y={lerp(640, 720, p) - Math.sin(p * Math.PI) * 120} r={28} /> })}
        <Share x={1380} y={760} s={1.3} n={1 + Math.floor(n / 14)} o={on(f, t.buys30 - 2, 8)} />
        <Tag x={1380} y={440} text={`${n} SHARES`} size={64} bg={X.limeD} o={on(f, t.buys30, 6)} />
        <Tag x={1380} y={950} text="$1,000 ÷ $12 A SHARE" size={40} bg={X.ink} o={on(f, t.twelve30, 8)} />
      </g>}

      {/* ---------------- C+D) the first GPU, and the idea inside it ---------------- */}
      {C > 0 && <g opacity={C}>
        <Room />
        {(() => { const box = easeInOut(span(f, t.later31 - 4, t.geforce31 + 6)); return <g transform={`translate(${lerp(2300, 760, box)} 0)`}>
          <rect x={-270} y={320} width={540} height={580} rx={16} fill={X.char} />
          <rect x={-270} y={320} width={540} height={90} rx={16} fill={X.lime} />
          <text x={0} y={384} textAnchor="middle" fill={X.charD} style={BB(56, 6)}>GEFORCE 256</text>
          <rect x={-200} y={450} width={400} height={360} rx={12} fill="#11151B" stroke={X.charL} strokeWidth={6} />
          <g opacity={1 - lift}><Chip x={0} y={630} s={0.75} lit={on(f, t.geforce31, 10)} label="GPU" /></g>
          <rect x={-270} y={840} width={540} height={60} fill={X.charL} />
        </g> })()}
        <g transform={`translate(${lerp(760, 1340, lift)} ${lerp(630, 560, lift)})`} opacity={lift}>
          <Chip x={0} y={0} s={1} lit={1} />
          <g opacity={on(f, t.hidden32 - 2, 14) * (0.6 + 0.4 * Math.sin(f / 7))}><DotBulb x={0} y={120} s={0.62} lit={1} /></g>
        </g>
        <Tag x={1400} y={420} text="GPU" size={80} bg={X.limeD} o={on(f, t.gpu31, 8) * (1 - lift)} />
        <Tag x={1400} y={540} text="GRAPHICS PROCESSING UNIT" size={40} bg={X.ink} o={on(f, t.unit31, 8) * (1 - lift)} />
        <Tag x={1340} y={900} text="AN IDEA STILL HIDDEN INSIDE" size={42} bg={X.butterD} o={on(f, t.hidden32, 8)} />
      </g>}

      <Headline f={f} lines={[[c('s29'), 'JANUARY 1999', X.white, 110], [c('s30'), 'YOUR $1,000', X.ink, 120], [c('s31'), 'LATER IN 1999', X.ink, 110], [t.gaming32, 'A GREAT GAMING CHIP', X.ink, 110]]} />
      <Mark f={f} at={(EXTRA['gx-ipo'] ?? []).map(c)} />
      <XGrain />
    </g>
  )
}

export const GX_IPO = makePiece('gx-ipo', 'The IPO: a stock-exchange flip board at night clicks to NVDA $12.00 JAN 1999, first day on the stock market; your $1,000 jar tips and its coins pour into a stack of share certificates while a counter rolls to 83 SHARES ($1,000 ÷ $12 a share); a GEFORCE 256 retail box slides in with a GPU chip in its window, GPU = GRAPHICS PROCESSING UNIT; the chip lifts out and inside it a dot-bulb glows faintly: an idea still hidden inside', {
  mood: 'light', Component: Ipo, beats: [...Object.values(K), ...(EXTRA['gx-ipo'] ?? [])],
  sfx: [['s29:twelve', 'tick', 0.08], ['s30:shares', 'coin', 0.1]] })
