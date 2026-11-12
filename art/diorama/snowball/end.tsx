// ---------------------------------------------------------------- s27–s29: the payoff — time.
// A) you with the magnifier over the stock cards again; one glows — he WAS good at it (thumbs up).
// B) a tall hourglass in the snow: 60 YEARS; its sand runs; beside it the giant snowball glows (the biggest gains at the end).
// C) a small cake marked 11 and three tiny share tickets: his first shares at 11; the hourglass flips back full — time on
//    his side from the start.
// D) the growth curve again with the cake at 64 on the knee: almost all of it after 64 (loops to the hook).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { SnowWorld, Vig, Headline, Sign, Snowball, Hourglass, Cake, Curve, Magnifier, StockCard, win, CX, FLOOR, INK, CORAL, GOLD, GOLD2, GREEN, SNOW, SNOW2, PAPER, WOOD, WOOD2 } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const s27 = c('s27'), edge = c('s27:edge'), picking = c('s27:picking'), good = c('s27:good')
  const s28 = c('s28'), time = c('s28:time'), d60 = c('s28:60'), biggest = c('s28:biggest'), gains = c('s28:gains'), end = c('s28:end')
  const s28a = c('s28a'), shares = c('s28a:shares'), d11 = c('s28a:11'), time2 = c('s28a:time'), start = c('s28a:start')
  const s29 = c('s29'), almost = c('s29:almost'), after = c('s29:after'), d64 = c('s29:64')

  const A = win(f, s27, s28), B = win(f, s28, s28a), Cc = win(f, s28a, s29), D = on(f, s29, 8)

  return (
    <g>
      <SnowWorld f={f} id="snb-end" tone={f >= s28 ? 'dusk' : 'day'} />
      {/* # A) he was good at picking */}
      {A > 0.001 && <g opacity={A}>
                <g transform="translate(500 1270)">
          <rect x={-230} y={-170} width={460} height={26} rx={10} fill={WOOD} /><rect x={-200} y={-144} width={18} height={144} fill={WOOD2} /><rect x={182} y={-144} width={18} height={144} fill={WOOD2} />
        </g>
        {[0, 1, 2].map((k) => <StockCard key={k} x={300 + k * 200} y={1020 - (k === 1 ? 20 : 0)} s={0.85} r={-6 + k * 6} t={['ACME', 'ZEN', 'ORBIT'][k]} up={k !== 2} />)}
        {f >= good && <rect x={410} y={920} width={180} height={124} rx={12} fill={GREEN} opacity={0.3 * on(f, good, 8)} />}
        <Magnifier x={lerp(300, 500, on(f, picking, 16))} y={830} s={0.9} o={on(f, edge, 8)} />
      </g>}
      {/* # B) time: the hourglass and the giant snowball */}
      {B > 0.001 && <g opacity={B}>
        <Hourglass x={300} y={FLOOR} s={1.2 * pop(f, time)} t={on(f, time, 90)} />
        <Sign x={300} y={680} t="60 YEARS" size={52} col={GOLD} o={on(f, d60, 8)} />
        <Snowball id="snb-e1" x={720} y={FLOOR - lerp(60, 190, on(f, gains, 26))} r={lerp(60, 190, on(f, gains, 26))} glow={on(f, biggest, 10)} />
        <Sign x={720} y={720} t="BIGGEST GAINS: LAST" size={40} col={CORAL} tc={SNOW} o={on(f, end, 8)} />
      </g>}
      {/* # C) first shares at 11 */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Cake x={300} y={FLOOR} s={0.8 * pop(f, s28a)} t="11" />
        <g opacity={on(f, shares, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${430 + k * 70} ${FLOOR - 30 - (k % 2) * 10}) rotate(${-8 + k * 8})`}><rect x={-40} y={-26} width={80} height={52} rx={6} fill={PAPER} stroke={GOLD2} strokeWidth={3} /><text y={10} textAnchor="middle" fill={INK} style={{ font: '400 24px "Bebas Neue"' }}>SHARE</text></g>)}</g>
        <Sign x={300} y={760} t="FIRST SHARES AT 11" size={40} o={on(f, d11, 8)} />
        <Hourglass x={720} y={FLOOR} s={1.0} t={lerp(0.9, 0.05, on(f, time2, 20))} o={on(f, time2 - 6, 8)} />
        <Sign x={720} y={720} t="TIME ON HIS SIDE" size={40} col={GREEN} tc={SNOW} o={on(f, start, 8)} />
      </g>}
      {/* # D) the loop: the curve, the cake at 64 */}
      {D > 0.001 && <g opacity={D}>
        <rect x={110} y={460} width={830} height={740} rx={24} fill={PAPER} stroke={SNOW2} strokeWidth={6} />
        <Curve x0={170} y0={1130} w={720} h={600} p={on(f, almost, 40)} kO={on(f, after, 8)} k={0.5} />
        <Cake x={530} y={FLOOR} s={0.55} t="64" o={on(f, d64, 8)} />
      </g>}
      <Vig id="snb-end" />
      <Headline f={f} lines={[[s27, 'HE WAS GOOD, TOO', INK, 104], [s28, 'BUT IT WAS TIME', CORAL, 108], [s28a, 'HE STARTED AT 11', INK, 104], [s29, 'ALMOST ALL OF IT: AFTER 64', CORAL, 84]]} />
    </g>
  )
}

export const SB_END = makePiece('snb-end', 'Payoff in the snowy valley turning to a peach dusk: you hold a magnifier over the stock cards and give a thumbs up (he was good, too); a tall wooden hourglass runs its gold sand (60 YEARS) beside a giant glowing snowball (BIGGEST GAINS: LAST); a small birthday cake marked 11 with three tiny SHARE tickets (FIRST SHARES AT 11) and an hourglass that is still almost full (TIME ON HIS SIDE); then the growth curve on a snow board again with the cake marked 64 at its knee — almost all of it after 64.', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s27", "s27:edge", "s27:picking", "s27:good", "s28", "s28:time", "s28:60", "s28:biggest", "s28:gains", "s28:end", "s28a", "s28a:shares", "s28a:11", "s28a:time", "s28a:start", "s29", "s29:almost", "s29:after", "s29:64"],
  sfx: [['s27:good', 'ding', 0.15], ['s28:time', 'riser', 0.2], ['s28a:11', 'pop', 0.2], ['s29:64', 'thud', 0.2]] })
