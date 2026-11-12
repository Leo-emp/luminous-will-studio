// ---------------------------------------------------------------- s11–s13: step two — the fee, in the navy bank hall
// A) the banker behind the brass teller window; the I-owe-you on the marble desk; on "fee" a red FEE tag swings onto it
// B) 245 little banks (the 2025 survey) slide together into one; its average fee: a red $27 tag
// C) Friday: the pay envelope opens; ≈ $51 of it flies to the bank, then splits into $24 (green) + the $27 fee (red tag)
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { BankWorld, TellerDesk, Bars, Vig, IOU, Tag, BankFront, CalPage, PayEnvelope, Bills, Spark, win, swing, drop, flyTo, CX, MINT, GOLD, TXT } from './kit'

const Fee: React.FC<PieceProps> = ({ f, c }) => {
  const s11 = c('s11'), charges = c('s11:charges'), fee = c('s11:fee'), covering = c('s11:covering')
  const s12 = c('s12'), y2025 = c('s12:2025'), survey = c('s12:survey'), d245 = c('s12:245'), banks = c('s12:banks'), average = c('s12:average'), fee12 = c('s12:fee'), d27 = c('s12:27')
  const s13 = c('s13'), friday = c('s13:friday'), pay = c('s13:pay'), comes = c('s13:comes'), d51 = c('s13:51'), goes = c('s13:goes'), bank13 = c('s13:bank'), d24 = c('s13:24'), covered = c('s13:covered'), d27b = c('s13:27'), fee13 = c('s13:fee')
  const A = win(f, s11, s12), B = win(f, s12, s13), Cc = on(f, s13, 8)
  const banker: Beat[] = [[s11, 'idle', 'smug'], [charges, 'point', 'smug'], [fee, 'present', 'smiling'], [covering, 'armsCrossed', 'smug']]
  // # the 35 small banks of the survey (each stands for 7 of the 245), gathering into one on "average"
  const gather = on(f, average, 20)
  return (
    <g>
      <BankWorld f={f} id="od-fee" windowOn={1 - on(f, s12 - 6, 8)} />
      {/* A) the teller and the fee */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="investor" beats={banker} x={560} y={1300} s={0.95} />
        <Bars />
        <TellerDesk id="od-fee" />
        <g transform={`translate(0 ${drop(f, s11, 60)})`}><IOU x={520} y={1180} s={0.62} r={-4} /></g>
        <g opacity={on(f, fee, 6)} transform={`translate(435 ${1120 + drop(f, fee, 260)})`}><Tag x={0} y={0} s={0.75} rot={38 + swing(f, fee)} t="FEE" /></g>
        <Spark f={f} at={covering} x={700} y={1100} col="#FFE08A" />
      </g>}
      {/* B) 245 banks → one average fee */}
      {B > 0.001 && <g opacity={B}>
        {Array.from({ length: 35 }, (_, k) => { const col = k % 7, row = Math.floor(k / 7)
          const x0 = 140 + col * 120, y0 = 560 + row * 120
          const x = lerp(x0, CX, gather), y = lerp(y0, 1040, gather)
          return <g key={k} opacity={on(f, d245 + (k % 7) * 1.2 + row, 5) * (k === 17 ? 1 : 1 - on(f, average + 14, 6))}><BankFront x={x} y={y} s={lerp(0.28, k === 17 ? 0.85 : 0.28, gather)} glow={k === 17 ? on(f, fee12, 10) : 0} /></g> })}
        <g opacity={on(f, survey, 8) * (1 - on(f, d245, 8))}>{[0, 1, 2].map((k) => <rect key={k} x={300} y={600 + k * 80} width={400} height={30} rx={15} fill="#C9D3E8" opacity={0.5} />)}<rect x={260} y={540} width={480} height={300} rx={16} fill="none" stroke="#C9D3E8" strokeWidth={4} /></g>
        <g opacity={on(f, d27, 6)} transform={`translate(${CX + 150} ${790 + drop(f, d27, 240)})`}><Tag x={0} y={0} s={1.1} rot={-14 + swing(f, d27)} t="$27" /></g>
        <Spark f={f} at={banks} x={880} y={540} col="#FFE08A" />
        <Spark f={f} at={y2025} x={180} y={520} col="#FFE08A" />
      </g>}
      {/* C) payday: ≈ $51 goes straight to the bank = $24 + $27 */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, friday, 8) * (1 - on(f, d51, 8))}><CalPage x={240} y={560} day="FRI" s={0.7 * pop(f, friday)} col={MINT} hot={1} /></g>
        <g opacity={on(f, pay, 8)} transform={`translate(${lerp(-200, 290, on(f, pay, 16))} 0)`}><PayEnvelope x={0} y={820} s={1.15} open={on(f, comes, 14)} r={-3} /></g>
        <BankFront x={760} y={900} s={0.95 * pop(f, s13)} glow={on(f, bank13, 10)} />
        {(() => {
          // # the $51 chunk lifts out of the envelope, flies over, and lands in front of the bank; then splits
          const p = flyTo(f, goes, [290, 700], [540, 1190], 22, 160)
          const lift = on(f, d51, 10)
          const split = on(f, d24, 12)
          const into = on(f, fee13 + 8, 14)
          if (f < d51) return null
          return <g opacity={1 - into}>
            {split < 0.02 ? <g transform={`translate(${f >= goes ? p.x : 290} ${f >= goes ? p.y : lerp(760, 700, lift)})`}><Bills x={0} y={0} s={0.95} n={5} /><text y={-200} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>≈ $51</text></g>
              : <g>
                <g transform={`translate(${lerp(540, 330, split)} ${lerp(1190, 1000, into)})`}><Bills x={0} y={0} s={0.85} n={2} /><text y={-150} textAnchor="middle" fill="#B6F2C8" style={TXT(60)}>$24</text></g>
                <g opacity={on(f, d27b, 8)} transform={`translate(${lerp(540, 680, on(f, d27b, 12))} ${lerp(1190, 1000, into)})`}><Bills x={0} y={0} s={0.85} n={3} /><g transform="translate(90 -110)"><Tag x={0} y={0} s={0.8} rot={-24 + swing(f, d27b)} t="$27" /></g></g>
              </g>}
          </g>
        })()}
        <Spark f={f} at={covered} x={450} y={1000} col="#FFE08A" />
      </g>}
      <Vig id="od-fee" k={0.4} />
      <Headline f={f} lines={[[fee, 'THE FEE', '#FFFFFF'], [d245, '2025 SURVEY: 245 US BANKS', '#FFFFFF'], [d27, 'AVERAGE FEE ≈ $27', '#FF9A85'], [friday, 'FRIDAY: PAYDAY', '#B6F2C8'], [d51, '≈ $51 GOES TO THE BANK', '#FFFFFF'], [d27b, '$24 + THE $27 FEE', '#FF9A85']]} until={c('s14') - 4} />
    </g>
  )
}

export const OD_FEE = makePiece('od-fee', 'Step two in a navy marble bank hall: a banker (investor) behind a brass-barred teller window points as a red FEE tag swings onto the I OWE YOU $24 note on the marble desk (THE FEE); then 35 little columned banks (2025 SURVEY: 245 US BANKS) slide together into one glowing bank with a red $27 tag (AVERAGE FEE ≈ $27); then a green FRI calendar page, a PAY envelope opens and a ≈ $51 stack of bills flies to the bank and splits into $24 (green) and $27 with a red tag (≈ $51 GOES TO THE BANK · $24 + THE $27 FEE), both sliding into the bank', {
  canvas: 'tall', mood: 'dark', Component: Fee, beats: ["s11", "s11:charges", "s11:fee", "s11:covering", "s12", "s12:2025", "s12:survey", "s12:245", "s12:banks", "s12:average", "s12:fee", "s12:27", "s13", "s13:friday", "s13:pay", "s13:comes", "s13:51", "s13:goes", "s13:bank", "s13:24", "s13:covered", "s13:27", "s13:fee", "s14"],
  sfx: [['s11:fee', 'thud', 0.3], ['s12:27', 'pop', 0.3], ['s13:51', 'swish', 0.25], ['s13:27', 'coin', 0.3]] })
void GOLD
