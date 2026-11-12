// ---------------------------------------------------------------- s26–s28: the real price of zero down.
// A) the coral $0 DOWN sign returns; a % coin with a cross (not interest); the 36-box wall with a door at its side
//    (three years where leaving costs you) — boxes pulse coral. B) two big question cards: HOW MANY MONTHS? and
//    WHICH PLAN DO I KEEP? C) the 36 boxes fill teal one by one to the very last, and the phone glows FREE (loop).
import React from 'react'
import { on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { StoreWorld, Vig, Headline, Pill, Cross, Coin, Sign, Grid36, Phone, Glint, win, CX, FLOOR, INK, TEAL, TEAL2, CORAL, CORAL2, SUN, PLUM, WHITE, TXT, SHADE } from './kit'

const QCard: React.FC<{ x: number; y: number; t1: string; t2: string; col: string; s?: number; o?: number; n: string }> = ({ x, y, t1, t2, col, s = 1, o = 1, n }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-400} y={-130} width={800} height={260} rx={36} fill={SHADE} transform="translate(10 12)" />
    <rect x={-400} y={-130} width={800} height={260} rx={36} fill={WHITE} />
    <circle cx={-290} cy={0} r={80} fill={col} /><text x={-290} y={40} textAnchor="middle" fill={WHITE} style={TXT(110)}>{n}</text>
    <text x={70} y={-12} textAnchor="middle" fill={INK} style={TXT(72)}>{t1}</text>
    <text x={70} y={70} textAnchor="middle" fill={col} style={TXT(72)}>{t2}</text>
  </g>
)

const End: React.FC<PieceProps> = ({ f, c }) => {
  const real = c('s26:real'), zero = c('s26:zero'), not = c('s26:not'), interest = c('s26:interest'), three = c('s26:three'), leaving = c('s26:leaving'), costs = c('s26:costs')
  const sign = c('s27:sign'), two = c('s27:two'), many = c('s27:many'), months = c('s27:months'), which = c('s27:which'), plan = c('s27:plan')
  const s28 = c('s28'), free = c('s28:free'), only = c('s28:only'), stay = c('s28:stay'), d36 = c('s28:36'), months28 = c('s28:months')

  const A = win(f, c('s26') - 2, sign - 2), B = win(f, sign - 2, s28 - 2), C = on(f, s28 - 2, 8)
  const fillT = (i: number) => stay + i * 1.1
  return (
    <g>
      <StoreWorld f={f} id="ph-end" shelves={false} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={1 - on(f, three - 4, 8)}>
          <Sign x={680} y={FLOOR} s={0.9 * pop(f, c('s26') - 2)} l1="$0" l2="DOWN" col={CORAL} f={f} />
          <g opacity={on(f, interest, 6)}><Coin x={260} y={800} s={2 * pop(f, interest)} t="%" /><g opacity={on(f, interest + 8, 6)}><Cross x={260} y={800} s={1} /></g></g>
        </g>
        <g opacity={on(f, three - 4, 8)}>
          <Grid36 x={120} y={460} cell={112} gap={14} state={() => (f >= leaving ? 'owed' : 'paid')} pop={(i) => 1 + 0.06 * Math.sin((f - leaving) / 5 + i) * on(f, leaving, 8)} label={() => ''} />
          <g opacity={on(f, three, 6)}><Pill x={CX} y={460 + 6 * 126 + 50} t="3 YEARS" size={50} col={PLUM} /></g>
        </g>
        <Glint f={f} at={real} x={680} y={FLOOR - 760} />
        <Glint f={f} at={zero} x={560} y={FLOOR - 700} />
        <Glint f={f} at={not} x={260} y={640} />
        <Glint f={f} at={costs} x={880} y={470} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, two, 6)}><QCard x={CX} y={680} t1="HOW MANY" t2={f >= months ? 'MONTHS?' : ''} col={CORAL} n="1" s={0.95 * pop(f, many - 4)} o={on(f, many - 4, 6)} /></g>
        <g opacity={on(f, which, 6)}><QCard x={CX} y={1000} t1="WHICH PLAN" t2={f >= plan ? 'DO I KEEP?' : ''} col={TEAL} n="2" s={0.95 * pop(f, which)} /></g>
        <Glint f={f} at={sign} x={CX + 300} y={520} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <Grid36 x={120} y={460} cell={112} gap={14} state={(i) => (f >= fillT(i) ? 'credit' : 'plain')} pop={(i) => (f >= fillT(i) ? pop(f, fillT(i), 8) : 1)} label={(i) => `${i + 1}`} />
        <g opacity={on(f, d36, 6)}><Pill x={CX} y={460 + 6 * 126 + 50} t="ALL 36 MONTHS" size={50} col={TEAL2} s={pop(f, d36)} /></g>
        <Glint f={f} at={free} x={880} y={470} />
        <Glint f={f} at={only} x={160} y={470} />
        <Glint f={f} at={months28} x={880} y={1150} />
      </g>}
      <Vig id="ph-end" />
      <Headline f={f} lines={[[real, 'THE REAL PRICE OF $0 DOWN', INK, 86], [not, 'NOT INTEREST…', CORAL2, 110], [three, '3 YEARS WHERE LEAVING COSTS', CORAL2, 80], [sign, 'BEFORE YOU SIGN, ASK:', INK, 92], [free, 'FREE ONLY IF YOU STAY', TEAL2, 96]]} />
    </g>
  )
}

export const PH_END = makePiece('ph-end', 'The payoff: the coral $0 DOWN sign returns beside a giant % coin that gets a red cross (not interest); the 36-box wall turns coral and pulses (3 YEARS where leaving costs you); two big white question cards pop in — 1 HOW MANY MONTHS? and 2 WHICH PLAN DO I KEEP?; finally the 36 numbered boxes fill teal one by one to the last (ALL 36 MONTHS) — free only if you stay.', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s26:real", "s26:zero", "s26:not", "s26:interest", "s26:three", "s26:leaving", "s26:costs", "s27:sign", "s27:two", "s27:many", "s27:months", "s27:which", "s27:plan", "s28", "s28:free", "s28:only", "s28:stay", "s28:36", "s28:months", "s26"],
  sfx: [['s26:interest', 'thud', 0.2], ['s27:many', 'pop', 0.25], ['s27:which', 'pop', 0.25], ['s28:36', 'chime', 0.3]] })
