// ---------------------------------------------------------------- s1–s6: the hook on the 1964 Oregon track.
// A) a big white running shoe; the little tick draws itself on it; a wall of shoe boxes rises: ≈ $46.4 BILLION A YEAR.
// B) it shrinks to two $500 notes, then a turquoise 1960s car rolls in and its trunk opens on a few shoe boxes.
// C) a calendar flips 1964 → 1971 (seven years); you shake your head — no shoe called Nike; then you think: what were they selling?
// D) the car on the left, a long arrow along the track to a tall tower of boxes (billions); three lane badges 1-2-3.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { OregonWorld, Vig, Headline, Shoe, ShoeBox, Car, Note, Calendar, Tag, LaneBadge, win, CX, FLOOR, INK, ORANGE, MUSTARD, RED, GREEN, TEAL, PAPER } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), tick = c('s1:tick')
  const s2 = c('s2'), sales = c('s2:sales'), d464 = c('s2:464')
  const s3 = c('s3'), d1000 = c('s3:1000'), trunk = c('s3:trunk'), car3 = c('s3:car')
  const s4 = c('s4'), strange = c('s4:strange')
  const s5 = c('s5'), seven = c('s5:seven'), didnt = c("s5:didn't"), nike5 = c('s5:nike'), shoe5 = c('s5:shoe')
  const s5a = c('s5a'), thinking = c('s5a:thinking'), selling = c('s5a:selling')
  const s6 = c('s6'), car6 = c('s6:car'), billions = c('s6:billions'), step = c('s6:step')

  const A = win(f, s1, s3), B = win(f, s3, s5), Cc = win(f, s5, s6), D = on(f, s6, 8)
  const youC: Beat[] = [[0, 'idle', 'neutral'], [didnt, 'crossNoA', 'smiling', 'crossNoB', 12], [thinking, 'think', 'thinking'], [selling, 'scratchHead', 'thinking']]
  const year = 1964 + Math.min(7, Math.floor(on(f, seven - 4, 40) * 7.99))

  return (
    <g>
      <OregonWorld f={f} id="nk-hook" />
      {/* # A) the shoe, the tick, the wall of boxes */}
      {A > 0.001 && <g opacity={A}>
        <Shoe x={CX} y={1080} s={1.6 * pop(f, s1)} tick={on(f, tick, 16)} o={on(f, s1, 6)} />
        {Array.from({ length: 18 }, (_, k) => { const col = k % 6, row = Math.floor(k / 6)
          return <ShoeBox key={k} x={140 + col * 150} y={830 - row * 90} s={0.9} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} o={on(f, sales + k * 1.5, 6)} /> })}
        <Tag x={CX} y={480} t="≈ $46.4 BILLION A YEAR" size={52} col={MUSTARD} o={on(f, d464, 8)} />
      </g>}
      {/* # B) $1,000 and a car trunk */}
      {B > 0.001 && <g opacity={B}>
        <Note x={360} y={lerp(560, 600, on(f, d1000, 12))} s={1.1 * pop(f, d1000)} r={-6} o={on(f, d1000, 6) * (1 - on(f, car3 + 6, 8))} />
        <Note x={640} y={lerp(560, 600, on(f, d1000, 12))} s={1.1 * pop(f, d1000 + 3)} r={6} o={on(f, d1000 + 3, 6) * (1 - on(f, car3 + 6, 8))} />
        <Tag x={CX} y={740} t="$500 + $500" size={44} o={on(f, d1000 + 6, 8) * (1 - on(f, car3 + 6, 8))} />
        <Car x={lerp(-340, 560, on(f, trunk - 10, 24))} y={FLOOR} s={1.2} trunk={on(f, car3, 14)} boxes={f >= car3 ? 4 : 0} />
        <Tag x={300} y={840} t="THE TRUNK" size={42} o={on(f, car3 + 4, 8) * (1 - on(f, strange, 8))} />
      </g>}
      {/* # C) seven years, no Nike shoe */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Calendar x={680} y={980} s={1.3} t={String(year)} flip={on(f, seven - 4, 40) * 7 % 1} />
        <Person f={f} who="hero" beats={youC} x={250} y={FLOOR} s={1.0} />
        <g opacity={on(f, shoe5, 8) * (1 - on(f, selling - 4, 8))}><Shoe x={680} y={1190} s={0.7} /><path d="M640 1190 Q680 1200 730 1170" fill="none" stroke={RED} strokeWidth={6} strokeDasharray="10 8" opacity={on(f, nike5, 6)} /></g>
        <Tag x={680} y={1060} t="7 YEARS" size={44} col={RED} tc={PAPER} o={on(f, seven + 30, 8) * (1 - on(f, shoe5, 6))} />
        <g opacity={on(f, selling, 8)} transform={`translate(680 560) scale(${pop(f, selling)})`}><text textAnchor="middle" fill={ORANGE} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
      </g>}
      {/* # D) from a car trunk to billions — three steps */}
      {D > 0.001 && <g opacity={D}>
        <Car x={240} y={FLOOR} s={0.7} trunk={1} boxes={4} o={on(f, car6 - 4, 8)} />
        <path d={`M400 1120 L${lerp(400, 700, on(f, billions, 16))} 1120`} stroke={GREEN} strokeWidth={16} strokeLinecap="round" />
        {f >= billions + 14 && <path d="M690 1094 L730 1120 L690 1146" fill="none" stroke={GREEN} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />}
        {Array.from({ length: 12 }, (_, k) => <ShoeBox key={k} x={830 - (k % 2) * 0 } y={FLOOR - k * 66} s={0.75} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} o={on(f, billions + k * 1.2, 5)} />)}
        {[1, 2, 3].map((n, k) => <LaneBadge key={n} x={220 + k * 220} y={620} n={n} s={0.7 * pop(f, step + k * 6)} o={on(f, step + k * 6, 6)} />)}
      </g>}
      <Vig id="nk-hook" />
      <Headline f={f} lines={[[s1, 'THAT LITTLE TICK', INK, 104], [s3, '$1,000 AND A CAR', INK, 104], [s4, 'THE STRANGE PART', INK, 100], [s5, 'NO SHOE CALLED NIKE', RED, 96], [s6, 'TRUNK → BILLIONS', TEAL, 104]]} />
    </g>
  )
}

export const NK_HOOK = makePiece('nk-hook', 'Hook on a warm retro 1964 Oregon running track (cream sky, striped orange sun, pine ridges, red clay lanes): a big white running shoe on which the little tick draws itself, a wall of orange/mustard/blue shoe boxes rises (≈ $46.4 BILLION A YEAR); two $500 notes ($500 + $500), then a turquoise 1960s sedan rolls in and its trunk opens on shoe boxes (THE TRUNK); a calendar flips 1964 → 1971 (7 YEARS) while you shake your head, then scratch it under a big orange question mark; the little car, a green arrow along the track to a tall tower of boxes, three lane badges 1 2 3.', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1", "s1:tick", "s2", "s2:sales", "s2:464", "s3", "s3:1000", "s3:trunk", "s3:car", "s4", "s4:strange", "s5", "s5:seven", "s5:didn't", "s5:nike", "s5:shoe", "s5a", "s5a:thinking", "s5a:selling", "s6", "s6:car", "s6:billions", "s6:step"],
  sfx: [['s1:tick', 'swish', 0.2], ['s2:464', 'impact', 0.2], ['s3:car', 'click', 0.2], ['s5:nike', 'thud', 0.2], ['s6:billions', 'riser', 0.2]] })
