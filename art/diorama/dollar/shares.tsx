// ---------------------------------------------------------------- s9–s13: step one — his money is in shares.
// A) medallion 1; a small paycheck gets a cross, a pile of share certificates rises beside it.
// B) the company is a tower of emerald bricks; one brick slides out, turns gold: 1 SHARE.
// C) the Meta filing drops on the floor; a huge certificate pile builds: ≈ 342 MILLION SHARES. Then ONE certificate
//    gets a price tag that rises +$1 — and the whole pile glows green: +≈ $342 MILLION (342,463,325 × $1).
// D) an empty pay slot gets a cross (no paycheck arrives) while the pile grows taller.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { DecoWorld, Vig, Headline, Cheque, CertPile, Cert, BrickTower, Filing, Plaque, Cross, Medallion, ArrowUp, win, CX, FLOOR, INK, EMER, GOLD, GOLD2, GOLDL, GREEN, IVORY, TXT } from './kit'

const Shares: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), paycheck = c('s9:paycheck'), its = c("s9:it's"), shares9 = c('s9:shares')
  const s10 = c('s10'), tiny = c('s10:tiny'), slice = c('s10:slice'), company = c('s10:company')
  const s11 = c('s11'), filing = c('s11:filing'), owns = c('s11:owns'), d342 = c('s11:342'), shares11 = c('s11:shares')
  const s12 = c('s12'), price = c('s12:price'), up = c('s12:up'), dollar = c('s12:dollar'), all = c('s12:all'), together = c('s12:together'), worth = c('s12:worth'), d342b = c('s12:342'), more = c('s12:more')
  const s13 = c('s13'), arrives = c('s13:arrives'), pile = c('s13:pile'), bigger = c('s13:bigger')

  const A = win(f, s9, s10), B = win(f, s10, s11), C = win(f, s11, s13 + 1), D = on(f, s13, 8)
  // # the big pile (C/D): builds on "owns", grows on "pile"/"bigger"
  const n = lerp(0, 18, on(f, owns, 26)) + lerp(0, 8, on(f, pile, 24))
  const top = FLOOR - (24 + Math.max(1, Math.round(n)) * 17 + 150) * 1.15
  const green = on(f, worth, 12)

  return (
    <g>
      <DecoWorld f={f} id="bz-shares" tone="day" />
      {/* # A) not a paycheck — shares */}
      {A > 0.001 && <g opacity={A}>
        <Medallion x={CX} y={560} n={1} s={1.1 * pop(f, s9)} />
        <g opacity={on(f, c('s9:money'), 8)}><Cheque x={270} y={960} s={0.82} amount="$1" /></g>
        <Cross x={270} y={960} s={0.9} o={on(f, its, 6)} />
        <CertPile x={720} y={FLOOR} n={lerp(0, 20, on(f, shares9, 20))} s={1.05} o={on(f, shares9, 6)} />
      </g>}
      {/* # B) a share = a slice of the company */}
      {B > 0.001 && <g opacity={B}>
        <BrickTower x={400} y={FLOOR} build={on(f, s10, 20)} out={on(f, slice, 14)} name="COMPANY" />
        <g opacity={on(f, slice + 8, 8)}><Plaque x={720} y={640} t="1 SHARE" size={50} col={GOLD} tc={INK} /></g>
        <g opacity={on(f, tiny, 8)} transform={`translate(${CX} 1180)`}><text textAnchor="middle" fill={EMER} style={TXT(44)} opacity={on(f, company, 8)}>A TINY SLICE</text></g>
      </g>}
      {/* # C) the filing, the pile, the +$1 maths */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, filing, 8) * (1 - on(f, price - 4, 8))} transform={`translate(240 ${lerp(600, 1110, on(f, filing, 14))})`}><Filing x={0} y={0} s={1.05} /></g>
        </g>}
      {(C > 0.001 || D > 0.001) && <g opacity={Math.max(C, D)}>
        <CertPile x={680} y={FLOOR} n={n} s={1.15} glow={on(f, shares11, 10) * (1 - on(f, price, 8)) + green} tint={green} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <Plaque x={680} y={top - 40} t="≈ 342 MILLION SHARES" size={40} o={on(f, d342, 8) * (1 - on(f, d342b, 8))} />
        {/* # one share, its price tag rising +$1 */}
        <g opacity={on(f, price, 8)}>
          <Cert x={240} y={980} s={1.1 * pop(f, price)} r={-4} />
          <g transform={`translate(240 ${lerp(820, 760, on(f, up, 12))})`}>
            <path d="M-80 -36 L60 -36 L90 0 L60 36 L-80 36 Z" fill={IVORY} stroke={GOLD2} strokeWidth={4} />
            <text x={-6} y={16} textAnchor="middle" fill={f >= up ? GREEN : INK} style={TXT(46)}>{f >= dollar ? '+$1' : f >= up ? '+$' : 'PRICE'}</text>
          </g>
          <ArrowUp x={110} y={760} s={0.8} o={on(f, up, 8)} />
          <Plaque x={240} y={1150} t="ONE SHARE" size={36} />
        </g>
        <g opacity={on(f, all, 8)}>
          <text x={440} y={990} textAnchor="middle" fill={INK} style={TXT(120)} opacity={on(f, together, 8)}>×</text>
        </g>
        <Plaque x={680} y={top - 40} t="+ ≈ $342 MILLION" size={52} col={GREEN} tc={IVORY} o={on(f, d342b, 8)} />
        <g opacity={on(f, more, 8) * (1 - on(f, s13, 8))}><text x={680} y={top - 110} textAnchor="middle" fill={EMER} style={TXT(30)}>342,463,325 × $1</text></g>
      </g>}
      {/* # D) no paycheck; the pile just grows */}
      {D > 0.001 && <g opacity={D}>
        <g transform="translate(240 860)">
          <rect x={-150} y={-120} width={300} height={240} rx={14} fill="#5B3B26" stroke={GOLD} strokeWidth={6} />
          <rect x={-110} y={-30} width={220} height={26} rx={10} fill="#1C1410" />
          <text y={-60} textAnchor="middle" fill={GOLDL} style={TXT(40)}>PAY SLOT</text>
          <text y={70} textAnchor="middle" fill={GOLDL} style={TXT(30)} opacity={0.8}>EMPTY</text>
        </g>
        <Cross x={240} y={860} s={0.9} o={on(f, arrives, 6)} />
        <ArrowUp x={890} y={700} s={0.9} o={on(f, bigger, 8)} />
      </g>}
      <Vig id="bz-shares" />
      <Headline f={f} lines={[[s9, 'STEP 1', EMER, 120], [its, 'IT’S IN SHARES', INK, 104], [s10, 'WHAT’S A SHARE?', INK, 100], [s11, 'META’S OWN FILING', INK, 96], [price, '1 SHARE: +$1', INK, 104], [all, 'ALL HIS SHARES', INK, 100], [s13, 'NO PAYCHECK', INK, 104], [pile, 'THE PILE GROWS', EMER, 100]]} />
    </g>
  )
}

export const BZ_SHARES = makePiece('bz-shares', 'Step 1 in the gilded hall: medallion 1; a small paycheck gets a red cross while a pile of gold-edged share certificates rises; the company drawn as a tower of emerald bricks — one brick slides out and turns gold, 1 SHARE; the Meta filing folder drops; a huge certificate pile builds: ≈ 342 MILLION SHARES; one certificate gets a price tag that rises +$1 and the whole pile glows green: + ≈ $342 MILLION (342,463,325 × $1); an empty PAY SLOT gets a cross while the pile grows taller.', {
  canvas: 'tall', mood: 'light', Component: Shares,
  beats: ["s9", "s9:paycheck", "s9:it's", "s9:shares", "s10", "s10:tiny", "s10:slice", "s10:company", "s11", "s11:filing", "s11:owns", "s11:342", "s11:shares", "s12", "s12:price", "s12:up", "s12:dollar", "s12:all", "s12:together", "s12:worth", "s12:342", "s12:more", "s13", "s13:arrives", "s13:pile", "s13:bigger", "s9:money"],
  sfx: [['s9:shares', 'flutter', 0.2], ['s10:slice', 'pop', 0.2], ['s12:342', 'riser', 0.25], ['s13:bigger', 'softpop', 0.2]] })
