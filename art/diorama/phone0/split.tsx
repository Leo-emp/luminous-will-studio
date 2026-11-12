// ---------------------------------------------------------------- s6–s8: STEP ONE — the price is split into payments.
// A) a big glossy phone with a FREE tag that gets a cross; on "split" the phone breaks into a 6 × 6 wall of
//    36 boxes that fly out from where it stood. B) the boxes group into three rows-of-twelve bands: YEAR 1/2/3.
// C) an EXAMPLE tag: $900 hangs on a small phone; every box turns into a $25 box.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { StoreWorld, Vig, Headline, Pill, Cross, Phone, Grid36, Glint, win, CX, INK, CORAL, CORAL2, TEAL, TEAL2, SUN, PLUM, WHITE, TXT } from './kit'

const Split: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), one = c('s6:one'), isnt = c("s6:isn't"), free = c('s6:free'), split = c('s6:split'), monthly = c('s6:monthly'), payments = c('s6:payments')
  const verizon = c('s7:verizon'), d36 = c('s7:36'), years = c('s7:years'), three = c('s7:three')
  const say = c('s8:say'), d900 = c('s8:900'), split8 = c('s8:split'), d25 = c('s8:25'), month = c('s8:month')

  const A = win(f, s6 - 2, split + 30, 10), G = on(f, split, 10)
  const cell = 112, gap = 14, gx = 120, gy = 440
  // # each box flies from the phone to its slot
  const boxPop = (i: number) => pop(f, split + i * 0.7, 10)
  return (
    <g>
      <StoreWorld f={f} id="ph-split" shelves={false} />
      {/* # A) the phone with a FREE tag (crossed), then it bursts into boxes */}
      {A > 0.001 && <g opacity={A}>
        <Phone x={CX} y={800} s={lerp(1, 0.3, on(f, split, 14))} f={f} />
        <g opacity={on(f, s6 - 2, 6) * (1 - on(f, split, 8))}>
          <g transform="translate(700 560) rotate(10)"><rect x={-110} y={-46} width={220} height={92} rx={16} fill={TEAL} /><text y={22} textAnchor="middle" fill={WHITE} style={TXT(70)}>FREE</text></g>
          <g opacity={on(f, isnt, 6)}><Cross x={700} y={560} s={0.9 * pop(f, isnt)} /></g>
        </g>
      </g>}
      {/* # the 36 payment boxes */}
      {G > 0.001 && <g>
        <Grid36 x={gx} y={gy} cell={cell} gap={gap}
          state={(i) => (f >= split + i * 0.7 ? (f >= d25 ? 'paid' : 'plain') : 'hidden')}
          pop={boxPop}
          label={(i) => (f >= d25 + i * 0.5 ? '$25' : f >= monthly ? '$' : '')} />
        {/* # three years: a bracket per 12 boxes */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, years + k * 3, 6) * (1 - on(f, say, 8))}>
          <rect x={gx - 14} y={gy + k * 2 * (cell + gap) - 8} width={6 * (cell + gap) + 14} height={2 * (cell + gap) + 2} rx={20} fill="none" stroke={[CORAL, TEAL, SUN][k]} strokeWidth={8} />
          <Pill x={gx + 6 * (cell + gap) + 30} y={gy + k * 2 * (cell + gap) + cell} t={`YEAR ${k + 1}`} size={34} col={[CORAL, TEAL, SUN][k]} s={0.9} />
        </g>)}
        <g opacity={on(f, d36, 6) * (1 - on(f, years, 6))}><Pill x={CX} y={gy + 6 * (cell + gap) + 50} t="36 PAYMENTS" size={50} col={PLUM} s={pop(f, d36)} /></g>
        <g opacity={on(f, d900, 6)}>
          <Pill x={CX - 120} y={gy + 6 * (cell + gap) + 50} t="EXAMPLE" size={34} col={INK} />
          <Pill x={CX + 110} y={gy + 6 * (cell + gap) + 50} t="$900 PHONE" size={44} col={CORAL2} s={pop(f, d900)} />
        </g>
        <Glint f={f} at={verizon} x={gx + 40} y={gy - 20} />
        <Glint f={f} at={split8} x={gx + 700} y={gy + 40} />
        <Glint f={f} at={month} x={gx + 380} y={gy + 380} />
        <Glint f={f} at={payments} x={gx + 600} y={gy + 600} />
        <Glint f={f} at={three} x={gx + 200} y={gy + 300} />
      </g>}
      <Vig id="ph-split" />
      <Headline f={f} lines={[[one, 'STEP 1', CORAL2, 120], [isnt, "THE PHONE ISN'T FREE", INK, 96], [monthly, 'IT’S SPLIT INTO PAYMENTS', INK, 86], [d36, '36 MONTHLY PAYMENTS', INK, 92], [years, '= 3 WHOLE YEARS', TEAL2, 104], [d25, '$900 ÷ 36 = $25 A MONTH', INK, 84]]} />
    </g>
  )
}

export const PH_SPLIT = makePiece('ph-split', 'Step one in the pastel store: a big glossy phone wears a teal FREE tag that gets a red cross; on "split" the phone shrinks and bursts into a 6×6 wall of 36 white payment boxes that pop out one by one, each marked $; the wall gets coloured brackets for YEAR 1, YEAR 2, YEAR 3 (36 PAYMENTS); then an EXAMPLE pill and a coral $900 PHONE pill appear and every box turns gold with $25 on it.', {
  canvas: 'tall', mood: 'light', Component: Split,
  beats: ["s6", "s6:one", "s6:isn't", "s6:free", "s6:split", "s6:monthly", "s6:payments", "s7:verizon", "s7:36", "s7:years", "s7:three", "s8:say", "s8:900", "s8:split", "s8:25", "s8:month"],
  sfx: [["s6:isn't", 'thud', 0.25], ['s6:split', 'swish', 0.3], ['s7:years', 'tick', 0.2], ['s8:25', 'coin', 0.25]] })
