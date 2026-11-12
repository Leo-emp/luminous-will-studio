// ---------------------------------------------------------------- s26–s30: to be fair — and the payoff.
// A) a gated house: ≈ $25 MILLION A YEAR; a ring fills ≈ 90% SECURITY; two guards take their posts; a shield dome
//    grows over the house (keeps him and his family safe).
// B) the one dollar bill in the middle — not the trick: it gets a cross and slides away small.
// C) the real pay: a huge glowing certificate pile rises with an arrow; the scissors get a cross; TAXED ONLY WHEN SOLD.
// D) the loop: YOU again, the paycheck on the conveyor gets snipped before it reaches your hand.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { DecoWorld, Vig, Headline, SafeHouse, Dollar, CertPile, Scissors, Cheque, Conveyor, Plaque, Cross, ArrowUp, win, CX, FLOOR, INK, EMER, GOLD, GOLD2, GREEN, RED, RED2, IVORY, TXT } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const fair = c('s26:fair'), spends = c('s26:spends'), d25 = c('s26:25'), year = c('s26:year'), mostly = c('s26:mostly'), security = c('s26:security')
  const most = c('s27:most'), keep = c('s27:keep'), family = c('s27:family'), safe = c('s27:safe')
  const s28 = c('s28'), one = c('s28:one'), isnt = c("s28:isn't"), trick = c('s28:trick')
  const s29 = c('s29'), ownership = c('s29:ownership'), rise = c('s29:rise'), isnt29 = c("s29:isn't"), sold = c('s29:sold')
  const s30 = c('s30'), paycheck = c('s30:paycheck'), taxed = c('s30:taxed'), see = c('s30:see')

  const A = win(f, c('s26'), s28), B = win(f, s28, s29), Cc = win(f, s29, s30), D = on(f, s30, 8)
  const ring = on(f, mostly, 18) * 0.9
  const you: Beat[] = [[0, 'idle', 'neutral'], [paycheck, 'receive', 'smiling'], [taxed, 'shock', 'shocked'], [see, 'shrug', 'worried']]
  const ride = on(f, s30, Math.max(10, see - s30))

  return (
    <g>
      <DecoWorld f={f} id="bz-end" tone="day" />
      {/* # A) to be fair: the security bill */}
      {A > 0.001 && <g opacity={A}>
        <SafeHouse x={CX} y={FLOOR} s={1.15 * pop(f, spends)} o={on(f, spends - 2, 6)} shield={on(f, keep, 22)} f={f} />
        <Plaque x={CX} y={500} t="≈ $25 MILLION A YEAR" size={48} col={GOLD} tc={INK} o={on(f, d25, 8) * (1 - on(f, mostly, 8))} />
        <g opacity={on(f, mostly, 8) * (1 - on(f, family - 6, 8))} transform="translate(500 530)">
          <circle r={80} fill="none" stroke="#E3D4B4" strokeWidth={34} />
          <circle r={80} fill="none" stroke={EMER} strokeWidth={34} strokeDasharray={`${2 * Math.PI * 80 * ring} 999`} transform="rotate(-90)" />
          <text y={14} textAnchor="middle" fill={INK} style={TXT(44)}>≈90%</text>
          <text y={150} textAnchor="middle" fill={EMER} style={TXT(36)}>SECURITY</text>
        </g>
        {[150, 850].map((x, k) => <g key={k} opacity={on(f, security + k * 4, 8)}><Mini look="worker" x={x} y={FLOOR} scale={1.1} frame={f} seed={k + 5} mood="neutral" /></g>)}
        <Plaque x={CX} y={500} t="HIM AND HIS FAMILY" size={44} o={on(f, family, 8)} />
      </g>}
      {/* # B) the dollar isn't the trick */}
      {B > 0.001 && <g opacity={B}>
        <Dollar x={lerp(CX, 260, on(f, trick, 16))} y={lerp(800, 980, on(f, trick, 16))} s={lerp(1.8, 0.8, on(f, trick, 16)) * pop(f, one)} r={-4} />
        <Cross x={lerp(CX, 260, on(f, trick, 16))} y={lerp(800, 980, on(f, trick, 16))} s={lerp(1.1, 0.6, on(f, trick, 16))} o={on(f, isnt, 6)} />
      </g>}
      {/* # C) the real pay: ownership */}
      {Cc > 0.001 && <g opacity={Cc}>
        <CertPile x={600} y={FLOOR} n={lerp(4, 26, on(f, ownership, 26))} s={1.2} glow={on(f, ownership, 10)} tint={on(f, rise, 10)} />
        <ArrowUp x={870} y={760} s={1} o={on(f, rise, 8)} />
        <Scissors x={230} y={760} s={1} r={90} open={0.7} o={on(f, isnt29 - 4, 8)} />
        <Cross x={230} y={820} s={0.7} o={on(f, isnt29 + 4, 6)} />
        <Plaque x={230} y={1010} t="TAXED ONLY WHEN SOLD" size={34} col={EMER} o={on(f, sold, 8)} />
      </g>}
      {/* # D) back to you */}
      {D > 0.001 && <g opacity={D}>
        <Conveyor x0={70} x1={620} y={870} f={f} />
        <Cheque x={lerp(260, 430, ride)} y={760} s={1.0} amount="$ PAY" cut={on(f, taxed, 10)} />
        <Scissors x={560} y={560} s={1.1} r={90} open={0.8 - 0.8 * on(f, taxed, 10)} o={on(f, taxed - 8, 8)} />
        <Person f={f} who="hero" beats={you} x={790} y={FLOOR} s={1.15} />
        <Plaque x={800} y={470} t="YOU" size={52} />
      </g>}
      <Vig id="bz-end" />
      <Headline f={f} lines={[[fair, 'TO BE FAIR', INK, 110], [mostly, 'MOSTLY SECURITY', EMER, 100], [s28, 'NOT THE TRICK', RED2, 110], [ownership, 'THE REAL PAY: OWNERSHIP', EMER, 84], [s30, 'AND YOUR PAYCHECK?', INK, 96], [taxed, 'TAXED FIRST', RED2, 110]]} />
    </g>
  )
}

export const BZ_END = makePiece('bz-end', 'Payoff in the gilded hall: a gated ivory house with an emerald roof — ≈ $25 MILLION A YEAR — a ring fills ≈90% SECURITY, two guards take their posts and a shield dome grows over the house (HIM AND HIS FAMILY); the one dollar bill gets a cross and slides away small (NOT THE TRICK); a huge glowing certificate pile rises with a green arrow, the tax scissors get a cross, TAXED ONLY WHEN SOLD (THE REAL PAY: OWNERSHIP); loop back: YOU at the conveyor, your paycheck is snipped by the TAX scissors before it reaches your hand.', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s26:fair", "s26:spends", "s26:25", "s26:year", "s26:mostly", "s26:security", "s27:most", "s27:keep", "s27:family", "s27:safe", "s28", "s28:one", "s28:isn't", "s28:trick", "s29", "s29:ownership", "s29:rise", "s29:isn't", "s29:sold", "s30", "s30:paycheck", "s30:taxed", "s30:see", "s26"],
  sfx: [['s26:25', 'pop', 0.2], ['s27:safe', 'chime', 0.2], ['s28:isn\'t', 'thud', 0.25], ['s29:ownership', 'riser', 0.25], ['s30:taxed', 'swish', 0.25]] })
