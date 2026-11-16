// ---------------------------------------------------------------- s17–s20b: the London habit study.
// A) a study card "LONDON STUDY" and a row of small people, each with one new daily habit.
// B) a calendar grid fills one square a day while a big counter climbs to 66. C) a number line: most of the
//    spread from 18 to 254, the 66 marker in the middle. D) back on the grid one square gets a red X — and the
//    ticks carry straight on: "DIDN'T RUIN IT". E) the hero trips on a slip and gets up; the story he tells
//    himself ("I'VE RUINED IT") is struck through — that is what does the damage.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Backdrop, CX, Cross, DAWN, GROUND, Headline, Person, Tag, Tick, Vig, win, BURG, CREAM, GOLD, INK, on, pop, lerp, span, easeOut, type Beat } from './kit'

const COLS = 11, ROWS = 6, CELL = 74, GX = CX - (COLS * CELL) / 2, GY = 560

const Grid: React.FC<{ filled: number; missAt?: number; o?: number }> = ({ filled, missAt = -1, o = 1 }) => (
  <g opacity={o}>
    <rect x={GX - 24} y={GY - 24} width={COLS * CELL + 48} height={ROWS * CELL + 48} rx={22} fill={CREAM} stroke={INK} strokeWidth={7} />
    {Array.from({ length: COLS * ROWS }, (_, k) => {
      const x = GX + (k % COLS) * CELL, y = GY + Math.floor(k / COLS) * CELL
      const done = k < filled
      return (
        <g key={k}>
          <rect x={x + 6} y={y + 6} width={CELL - 12} height={CELL - 12} rx={10} fill={done ? (k === missAt ? '#F3D0CB' : '#CDE6CF') : '#FFFFFF'} stroke={INK} strokeWidth={3} opacity={0.95} />
          {done && (k === missAt ? <Cross x={x + CELL / 2} y={y + CELL / 2} s={0.7} /> : <Tick x={x + CELL / 2} y={y + CELL / 2} s={0.7} />)}
        </g>
      )
    })}
  </g>
)

const Study: React.FC<PieceProps> = ({ f, c }) => {
  const s17 = c('s17'), london = c('s17:london'), followed = c('s17:followed'), building = c('s17:building'), habit17 = c('s17:habit')
  const s18 = c('s18'), sixty = c('s18:sixtysix'), own = c('s18:own')
  const s19 = c('s19'), eighteen = c('s19:eighteen'), hundred = c('s19:hundred')
  const s20 = c('s20'), missing = c('s20:missing'), ruin = c('s20:ruin')
  const s20b = c('s20b'), slip = c('s20b:slip'), story = c('s20b:story'), damage = c('s20b:damage'), tell = c('s20b:tell')

  const A = win(f, 0, s18 + 4), B = win(f, s18, s19 + 4), C = win(f, s19, s20 + 4), D = win(f, s20, s20b + 4), E = on(f, s20b, 10)
  const filled = Math.round(lerp(0, 66, easeOut(span(f, s18 + 6, own))))
  // # D: the chain keeps going past the missed day (square 24)
  const filledD = Math.round(lerp(20, 66, span(f, s20, ruin + 10)))
  const hero: Beat[] = [[s20b, 'walkA', 'neutral'], [slip, 'oops', 'shocked'], [slip + 30, 'facepalm', 'worried'], [story, 'idle', 'thinking'], [tell, 'slump', 'worried'], [damage, 'confident', 'smiling']]
  const minis = ['hero', 'hero-fit', 'hero-struggling', 'hero-rich', 'hero', 'hero-fit', 'hero-struggling']

  return (
    <g>
      <Backdrop id="d3t" m={DAWN} />
      <rect x={0} y={GROUND} width={1080} height={680} fill="#E2C4B0" />
      {/* # A) the study */}
      {A > 0.001 && <g opacity={A}>
        <g transform={`translate(${CX} 640) scale(${pop(f, s17)})`}>
          <rect x={-330} y={-170} width={660} height={300} rx={26} fill={CREAM} stroke={INK} strokeWidth={8} />
          <text y={-60} textAnchor="middle" fill={BURG} style={{ font: '400 92px "Bebas Neue"', letterSpacing: 5 }}>LONDON STUDY</text>
          <text y={30} textAnchor="middle" fill={INK} style={{ font: '600 36px Inter' }}>one new daily habit each</text>
          <g opacity={on(f, london, 8)}><rect x={-120} y={70} width={240} height={14} rx={7} fill={GOLD} /></g>
          <g opacity={on(f, habit17, 6)}><rect x={-230} y={46} width={lerp(0, 460, easeOut(span(f, habit17, habit17 + 10)))} height={10} rx={5} fill={BURG} /></g>
        </g>
        {minis.map((m, k) => <g key={k} opacity={on(f, followed + k * 3, 6)} transform={`translate(0 ${-24 * Math.sin(Math.PI * span(f, building + k * 3, building + k * 3 + 12))})`}><Mini look={m} x={140 + k * 133} y={GROUND} scale={1.25} frame={f} seed={k} mood="happy" />
          <g opacity={on(f, habit17 + k * 2, 6)}><Tick x={140 + k * 133} y={GROUND - 330} s={0.9} /></g></g>)}
      </g>}
      {/* # B) one square a day until the habit runs on its own */}
      {B > 0.001 && <g opacity={B}>
        <Grid filled={filled} />
        <g transform={`translate(${CX} ${GY + ROWS * CELL + 210}) scale(${pop(f, sixty)})`} opacity={on(f, sixty, 6)}>
          <text textAnchor="middle" fill={BURG} style={{ font: '400 190px "Bebas Neue"' }}>{filled}</text>
          <text y={70} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 6 }}>DAYS</text>
        </g>
      </g>}
      {/* # C) the spread: 18 to 254 days */}
      {C > 0.001 && <g opacity={C} transform="translate(0 120)">
        <rect x={90} y={700} width={900} height={20} rx={10} fill={INK} opacity={0.25} />
        <rect x={lerp(90, 90 + 900 * 18 / 260, 1)} y={700} width={lerp(0, 900 * (254 - 18) / 260, easeOut(span(f, eighteen, hundred + 12)))} height={20} rx={10} fill={BURG} />
        {[[18, eighteen, '18'], [66, s19, '66'], [254, hundred, '254']].map(([d, at, t]) => (
          <g key={String(t)} opacity={on(f, Number(at), 6)} transform={`translate(${90 + 900 * Number(d) / 260} 700)`}>
            <rect x={-5} y={-60} width={10} height={60} fill={t === '66' ? GOLD : INK} />
            <text y={-80} textAnchor="middle" fill={t === '66' ? BURG : INK} style={{ font: `400 ${t === '66' ? 110 : 84}px "Bebas Neue"` }}>{t}</text>
          </g>
        ))}
        <text x={CX} y={830} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>DAYS</text>
      </g>}
      {/* # D) one missed day, and the chain carries on */}
      {D > 0.001 && <g opacity={D}>
        <Grid filled={f >= missing ? filledD : 20} missAt={f >= missing ? 24 : -1} />
        <g opacity={on(f, ruin, 8)}><Tag x={CX} y={GY + ROWS * CELL + 160} text="DIDN'T RUIN IT" s={pop(f, ruin)} size={74} fill={GOLD} /></g>
      </g>}
      {/* # E) a slip, and the story after it */}
      {E > 0.001 && <g opacity={E}>
        <rect x={420} y={GROUND - 24} width={120} height={22} rx={11} fill="#8C6A4A" opacity={on(f, slip - 6, 6)} />
        <Person f={f} who="hero" beats={hero} x={lerp(260, 560, easeOut(span(f, s20b, slip)))} />
        <g opacity={on(f, slip, 6) * (1 - on(f, story - 4, 6))}><Tag x={820} y={760} text="ONE SLIP" s={pop(f, slip)} size={64} /></g>
        <g opacity={on(f, story, 8)} transform="translate(780 700)">
          <rect x={-250} y={-90} width={500} height={150} rx={30} fill="#FFFFFF" stroke={INK} strokeWidth={7} />
          <path d="M-120 60 L-160 120 L-60 60 Z" fill="#FFFFFF" stroke={INK} strokeWidth={7} />
          <text y={10} textAnchor="middle" fill={INK} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 3 }}>"I'VE RUINED IT"</text>
          <path d={`M-220 -8 L${lerp(-220, 220, easeOut(span(f, damage, damage + 10)))} 8`} stroke="#D2463C" strokeWidth={14} strokeLinecap="round" />
        </g>
      </g>}
      <Headline text={f < s20b ? (f < s20 ? 'HOW LONG A HABIT TAKES' : 'THE GOOD NEWS') : 'THE STORY DOES THE DAMAGE'} o={f < s20 ? on(f, s17, 10) * (1 - on(f, s20 - 4, 4)) : f < s20b ? on(f, s20, 8) * (1 - on(f, s20b - 4, 4)) : on(f, damage, 8)} color={INK} />
      <Vig id="d3t" />
    </g>
  )
}

export const D3_STUDY = makePiece('d3-study', 'Day 3: the London habit study', {
  beats: ['s17:london', 's17:followed', 's17:building', 's17:habit', 's18:sixtysix', 's18:own', 's19:eighteen', 's19:hundred', 's20:missing', 's20:ruin', 's20b:slip', 's20b:story', 's20b:tell', 's20b:damage'],
  sfx: [['s17:followed', 'softpop'], ['s18:sixtysix', 'tick'], ['s20:missing', 'thud'], ['s20:ruin', 'chime'], ['s20b:slip', 'swish'], ['s20b:damage', 'crack']],
  Component: Study, mood: 'light', canvas: 'tall',
})
