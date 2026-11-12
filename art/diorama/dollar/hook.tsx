// ---------------------------------------------------------------- s1–s8: the hook in the gilded hall.
// A) a green paycheck rides a brass conveyor toward YOU; red TAX scissors snip a slice off it before it reaches your hand.
// B) the boss offers a giant $1,000,000-a-year cheque (EXAMPLE); you wave it off and hold up a single dollar bill.
// C) two payslips drop in: MARK ZUCKERBERG · META (salary lights, $1 stamps in), then STEVE JOBS · APPLE ($1 A YEAR).
// D) you think "he doesn't need it" (a thought of a gold vault); then a balance: the $1 on one pan, a pile of share
//    certificates lands on the other and the scale tips — not a sacrifice.
// E) three deco plinths rise as the three steps are promised.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { DecoWorld, Vig, Headline, Cheque, Scissors, Dollar, Payslip, CertPile, Plaque, Cross, Medallion, Conveyor, win, CX, FLOOR, INK, RED2, EMER, GOLD, GOLD2, GOLDL, IVORY, TXT } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), tax = c('s1:tax'), paycheck = c('s1:paycheck'), before = c('s1:before'), reaches = c('s1:reaches')
  const s2 = c('s2'), boss = c('s2:boss'), offers = c('s2:offers'), mil = c('s2:1'), no = c('s2:no'), just = c('s2:just'), dollar2 = c('s2:dollar')
  const s3 = c('s3'), zuck = c('s3:zuckerberg'), meta = c('s3:meta')
  const salary = c('s4:salary'), one4 = c('s4:one')
  const steve = c('s5:steve'), apple = c('s5:apple'), dollar5 = c('s5:dollar')
  const s6 = c('s6'), billionaire = c('s6:billionaire'), doesnt = c("s6:doesn't")
  const tru = c('s7:true'), dollar7 = c('s7:dollar'), sacrifice = c('s7:sacrifice')
  const shows = c('s8:shows'), richest = c('s8:richest'), paid = c('s8:paid'), three = c('s8:three'), simple = c('s8:simple'), steps = c('s8:steps')

  const A = win(f, s1, s2 + 2), B = win(f, s2, s3), C = win(f, s3, s6), D = win(f, s6, shows), E = on(f, shows, 8)
  const you: Beat[] = [[0, 'idle', 'neutral'], [paycheck, 'receive', 'smiling'], [reaches, 'hold', 'worried']]
  const you2: Beat[] = [[0, 'idle', 'neutral'], [offers, 'think', 'shocked'], [no, 'crossNoA', 'smiling', 'crossNoB', 12], [just, 'holdUp', 'smug']]
  const bossB: Beat[] = [[0, 'idle', 'smiling'], [offers, 'offer', 'smiling'], [no, 'shock', 'shocked']]
  const you3: Beat[] = [[0, 'think', 'thinking'], [billionaire, 'pointUp', 'thinking'], [doesnt, 'shrug', 'neutral'], [tru, 'nodA', 'smiling', 'nodB', 10], [sacrifice, 'explain', 'smug']]

  // # A: the cheque rides in, is snipped on "before", arrives on "reaches"
  const ride = on(f, s1, Math.max(10, reaches - s1))
  const snip = on(f, before, 10)
  // # D: the balance tips when the certificates land
  const land = on(f, sacrifice - 4, 14), tip = lerp(-10, 14, land) * on(f, dollar7, 8)

  return (
    <g>
      <DecoWorld f={f} id="bz-hook" tone="day" />
      {/* # A) the paycheck on the conveyor, the tax scissors */}
      {A > 0.001 && <g opacity={A}>
        <Conveyor x0={70} x1={620} y={870} f={f} />
        <Cheque x={lerp(260, 430, ride)} y={760} s={1.0} amount="$ PAY" cut={snip} o={on(f, paycheck - 6, 8)} />
        <Scissors x={560} y={560} s={1.1} r={90} open={0.8 - 0.8 * snip} o={on(f, tax, 8) * (1 - on(f, reaches + 6, 8))} />
        <Person f={f} who="hero" beats={you} x={790} y={FLOOR} s={1.15} />
        <Plaque x={800} y={470} t="YOU" size={52} o={on(f, s1 + 3, 8)} />
      </g>}
      {/* # B) the boss's giant offer, waved off; one dollar held up */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="owner" beats={bossB} x={230} y={FLOOR} s={1.1} />
        <Person f={f} who="hero" beats={you2} x={790} y={FLOOR} s={1.15} />
        <g opacity={on(f, offers, 8) * (1 - on(f, no + 10, 10))} transform={`translate(470 ${lerp(700, 540, on(f, offers, 14))}) scale(${pop(f, offers)})`}>
          <Cheque x={0} y={0} s={1} w={520} amount={f >= mil ? '$1,000,000 / YEAR' : '$'} to="YOU" />
          <Plaque x={170} y={-140} t="EXAMPLE" size={30} col={IVORY} tc={INK} o={on(f, mil, 8)} />
        </g>
        
        {(() => { const h = hand(f, you2, 790, FLOOR, 1.15); return <g opacity={on(f, just, 8)}><Dollar x={h.x} y={h.y - 30} s={0.7 * pop(f, just)} r={-6} /></g> })()}
        <Plaque x={790} y={500} t="JUST $1" size={50} col={GOLD} tc={INK} o={on(f, dollar2, 8)} />
      </g>}
      {/* # C) the two payslips */}
      {C > 0.001 && <g opacity={C}>
        <g transform={`translate(500 640) scale(${0.6 + 0.4 * on(f, zuck, 12)}) translate(-500 -640)`}>
          <Payslip x={CX} y={640} s={1.05} name="MARK ZUCKERBERG" co={f >= meta ? 'META · 2025' : ''} lit={on(f, salary, 8)} amtO={on(f, one4, 8)} o={on(f, s3 + 4, 6)} />
        </g>
        <g transform={`translate(500 1010) scale(${0.6 + 0.4 * on(f, steve, 12)}) translate(-500 -1010)`}>
          <Payslip x={CX} y={1010} s={0.92} name="STEVE JOBS" co={f >= apple ? 'APPLE · FROM 1997' : ''} lit={on(f, dollar5, 8)} amt="$1" amtO={on(f, dollar5, 8)} sub="A YEAR, FOR YEARS" o={on(f, steve, 6)} />
        </g>
      </g>}
      {/* # D) you think it over; the balance tips toward the certificates */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="hero" beats={you3} x={190} y={FLOOR} s={1.05} />
        <g opacity={on(f, c("s6:thinking"), 8) * (1 - on(f, tru, 8))}>
          {[0, 1, 2].map((k) => <circle key={k} cx={300 + k * 40} cy={640 - k * 50} r={10 + k * 6} fill="#FFFDF6" stroke={GOLD2} strokeWidth={3} />)}
          <ellipse cx={620} cy={520} rx={250} ry={150} fill="#FFFDF6" stroke={GOLD2} strokeWidth={4} />
          <g opacity={on(f, billionaire, 8)}><CertPile x={560} y={600} n={8} s={0.55} />
          <g transform="translate(700 600)"><rect x={-70} y={-140} width={140} height={140} rx={10} fill="#8A96A3" stroke="#4E5864" strokeWidth={6} /><circle cy={-70} r={40} fill="#B8C1CB" stroke="#4E5864" strokeWidth={5} /></g></g><text x={620} y={548} textAnchor="middle" fill={INK} style={TXT(84)} opacity={1 - on(f, billionaire, 6)}>$1?</text>
        </g>
        <g opacity={on(f, dollar7, 8)}>
          <rect x={620} y={720} width={20} height={FLOOR - 720} fill={GOLD2} />
          <path d="M560 1270 L700 1270 L670 1230 L590 1230 Z" fill={GOLD} />
          <g transform={`rotate(${tip} 630 720)`}>
            <rect x={400} y={712} width={460} height={16} rx={8} fill={GOLD} stroke={GOLD2} strokeWidth={3} />
            {[440, 820].map((px, k) => <g key={k} transform={`translate(${px} 720) rotate(${-tip} 0 0)`}>
              <line x1={-60} y1={110} x2={0} y2={0} stroke={GOLD2} strokeWidth={3} /><line x1={60} y1={110} x2={0} y2={0} stroke={GOLD2} strokeWidth={3} />
              <path d="M-80 110 L80 110 L60 136 L-60 136 Z" fill={GOLD} stroke={GOLD2} strokeWidth={3} />
              {k === 0 && <Dollar x={0} y={84} s={0.45} />}
              {k === 1 && <g transform={`translate(0 ${lerp(-400, 0, land)})`} opacity={on(f, sacrifice - 6, 4)}><CertPile x={0} y={110} n={6} s={0.5} /></g>}
            </g>)}
          </g>
          <Plaque x={440} y={1010} t="$1 SALARY" size={38} o={on(f, dollar7, 8)} />
          <Plaque x={820} y={1010} t="HIS SHARES" size={38} o={land} />
        </g>
      </g>}
      {/* # E) three deco plinths rise, one per step */}
      {E > 0.001 && <g opacity={E}>
        <g opacity={on(f, richest, 8)}>
          {[0, 1, 2].map((k) => { const at = [three, simple, steps][k], h = 180 + k * 150, x = 220 + k * 280, up = on(f, at, 14)
            return <g key={k} opacity={on(f, at, 6)}>
              <rect x={x - 110} y={FLOOR - h * up} width={220} height={h * up} fill={EMER} stroke={GOLD} strokeWidth={5} />
              <rect x={x - 120} y={FLOOR - h * up - 18} width={240} height={22} rx={4} fill={GOLD} />
              <Medallion x={x} y={FLOOR - h * up - 130} n={k + 1} s={0.85} o={up} />
            </g> })}
        </g>
        <g opacity={on(f, shows, 8) * (1 - on(f, three, 8))} transform={`translate(${CX} 860)`}>
          <CertPile x={0} y={410} n={20} s={1.3} glow={on(f, paid, 10)} />
          
        </g>
      </g>}
      <Vig id="bz-hook" />
      <Headline f={f} lines={[[tax, 'TAXED FIRST', RED2, 110], [s2 + 4, 'NO THANKS', INK, 110], [zuck, 'HIS SALARY: $1', INK, 104], [steve, 'STEVE JOBS TOO', INK, 100], [s6, 'HE DOESN’T NEED IT?', INK, 92], [sacrifice, 'NOT A SACRIFICE', EMER, 100], [richest, 'HOW THEY REALLY GET PAID', INK, 84], [three, '3 SIMPLE STEPS', INK, 104]]} />
    </g>
  )
}

export const BZ_HOOK = makePiece('bz-hook', 'Hook in a gilded art-deco hall: a green paycheck rides a brass conveyor toward YOU and red TAX scissors snip a slice off before it reaches your hand; the boss offers a giant $1,000,000 / YEAR cheque (EXAMPLE), you wave it off and hold up one dollar bill; payslips drop in: MARK ZUCKERBERG · META · 2025 with SALARY $1, then STEVE JOBS · APPLE · FROM 1997, $1 A YEAR; you think he does not need it (a thought cloud with share certificates and a vault), then a gold balance tips: $1 SALARY on one pan, HIS SHARES land on the other; three deco plinths with medallions 1-2-3 rise.', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1", "s1:tax", "s1:paycheck", "s1:before", "s1:reaches", "s2", "s2:boss", "s2:offers", "s2:1", "s2:no", "s2:just", "s2:dollar", "s3", "s3:zuckerberg", "s3:meta", "s4:salary", "s4:one", "s5:steve", "s5:apple", "s5:dollar", "s6", "s6:billionaire", "s6:doesn't", "s7:true", "s7:dollar", "s7:sacrifice", "s8:shows", "s8:richest", "s8:paid", "s8:three", "s8:simple", "s8:steps", "s6:thinking"],
  sfx: [['s1:before', 'swish', 0.25], ['s2:no', 'pop', 0.2], ['s4:one', 'thud', 0.3], ['s7:sacrifice', 'thud', 0.25], ['s8:three', 'pop', 0.2]] })
