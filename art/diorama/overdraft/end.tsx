// ---------------------------------------------------------------- s22–s24: it adds up — a glass jar of fee tags in the night city
// A) one tag falls into a big glass jar, then more, then it fills: ≈ $5.8 BILLION (2023, banks over $1B in assets);
//    red tags = overdraft, orange slips = returned payments; the bank towers behind light up
// B) the jar moves aside; the Capitol; a FEE RULE paper with a $5 tag — torn in two before it took effect
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { hand, Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { NightWorld, DeskWorld, StoreWorld, Counter, Vig, Jar, Tag, Capitol, RulePaper, Form, Pen, Card, Terminal, Cheque, AutoBill, Cross, Bag, Bow, Phone, IOU, Spark, win, swing, drop, CX, RED, ORANGE, INK, MINT, GOLD, TXT, PAPER, NAVY3 } from './kit'

const Total: React.FC<PieceProps> = ({ f, c }) => {
  const s22 = c('s22'), small = c('s22:small'), fee = c('s22:fee'), time = c('s22:time'), adds = c('s22:adds')
  const y2023 = c('s23:2023'), banks = c('s23:banks'), billion = c('s23:billion'), assets = c('s23:assets'), reported = c('s23:reported'), d58 = c('s23:58'), overdraft = c('s23:overdraft'), returned = c('s23:returned')
  const s24 = c('s24'), y2025 = c('s24:2025'), congress = c('s24:congress'), rule = c('s24:rule'), pushed = c('s24:pushed'), big = c('s24:big'), d5 = c('s24:5'), before = c('s24:before'), effect = c('s24:effect')
  const fill = 0.02 * on(f, fee, 6) + 0.06 * on(f, time, 20) + 0.3 * on(f, adds, 40) + 0.62 * on(f, reported, 30)
  const aside = on(f, congress, 16)
  const jx = lerp(CX, 250, aside), js = lerp(0.9, 0.5, aside)
  // # tags falling into the jar mouth (one, then a few, then a rush)
  const falls = [fee, time, time + 8, adds, adds + 5, adds + 10, adds + 15, reported, reported + 4, reported + 8, reported + 12]
  return (
    <g>
      <NightWorld f={f} id="od-total" glow={on(f, banks, 20) * 0.6 + on(f, billion, 20) * 0.4} />
      <g opacity={on(f, s22, 8)}>
        <Jar x={jx} y={1230} s={js} fill={Math.min(1, fill)} f={f} />
        {aside < 0.5 && falls.map((at, k) => { const t = (f - at) / 16; if (t < 0 || t > 1) return null
          const x = jx + ((k * 53) % 160) - 80, y = lerp(420, 1230 - 560 * js + 60, t * t)
          return <g key={k} transform={`translate(${x} ${y}) rotate(${(k * 37) % 50 - 25 + 200 * t})`}><Tag x={0} y={0} s={0.42} str={10} col={k % 4 === 3 ? ORANGE : RED} /></g> })}
        {/* the label stuck on the jar */}
        <g opacity={on(f, d58, 6) * (1 - aside)} transform={`translate(${jx} 960) scale(${pop(f, d58)}) rotate(-3)`}><rect x={-170} y={-60} width={340} height={120} rx={12} fill={PAPER} stroke={INK} strokeWidth={4} /><text y={26} textAnchor="middle" fill={RED} style={TXT(76)}>$5.8 BILLION</text></g>
        {/* what is inside: two kinds of fee */}
        <g opacity={on(f, overdraft, 6) * (1 - aside)}><Tag x={150} y={720} s={0.5} str={20} /><text x={150} y={880} textAnchor="middle" fill="#FFB3A6" style={TXT(42)}>OVERDRAFT</text></g>
        <g opacity={on(f, returned, 6) * (1 - aside)}><Tag x={855} y={720} s={0.5} str={20} col={ORANGE} /><text x={855} y={880} textAnchor="middle" fill="#FFD1A6" style={TXT(42)}>RETURNED</text></g>
        <Spark f={f} at={small} x={jx + 60} y={600} col="#FFE08A" />
        <Spark f={f} at={assets} x={860} y={980} col="#FFE08A" />
        <Spark f={f} at={y2023} x={200} y={1000} col="#FFE08A" />
      </g>
      {/* B) Congress and the cancelled $5 rule */}
      <g opacity={on(f, congress, 8)}>
        <Capitol x={lerp(1200, 650, on(f, congress, 16))} y={1250} s={0.62} />
        <g opacity={on(f, rule, 8) * (1 - on(f, effect + 6, 10))} transform={`translate(650 600)`}>
          <RulePaper x={0} y={0} s={0.62 * pop(f, rule)} tear={on(f, before, 14)} />
          <g opacity={on(f, d5, 6) * (1 - on(f, before, 10))} transform={`translate(150 -110)`}><Tag x={0} y={0} s={0.75} rot={-22 + swing(f, d5)} t="$5" col={MINT} /></g>
        </g>
        <Spark f={f} at={pushed} x={800} y={560} col="#FFE08A" />
        <Spark f={f} at={big} x={500} y={560} col="#FFE08A" />
        <Spark f={f} at={s24} x={300} y={800} col="#FFE08A" />
      </g>
      <Vig id="od-total" k={0.35} />
      <Headline f={f} lines={[[fee, 'ONE FEE AT A TIME', '#FFFFFF'], [y2023, '2023: BIG US BANKS', '#FFFFFF'], [d58, '≈ $5.8 BILLION IN FEES', '#FF9A85'], [y2025, '2025: CONGRESS', '#FFFFFF'], [d5, 'A RULE FOR A $5 FEE', '#B6F2C8'], [before, 'CANCELLED', '#FF9A85']]} until={c('s25') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s25–s29: the part people miss — your yes, on the desk
// A) the NEW ACCOUNT form flips face-up; SINCE 2010 seal; the OVERDRAFT COVERAGE: YES box glows; a debit card and an ATM;
//    a pen ticks the box
// B) the tick is erased: without your yes — the $27 tag gets a cross, the card is declined at the terminal
// C) a check and an automatic bill — red tags can still swing onto them
const Atm: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-260} width={220} height={260} rx={14} fill="rgba(0,0,0,0.25)" transform="translate(8 10)" />
    <rect x={-110} y={-260} width={220} height={260} rx={14} fill={NAVY3} />
    <rect x={-80} y={-230} width={160} height={90} rx={8} fill="#BFD6E6" /><text y={-170} textAnchor="middle" fill={INK} style={TXT(44)}>ATM</text>
    <rect x={-60} y={-110} width={120} height={14} rx={7} fill="#0E1626" />
    <rect x={-70} y={-70} width={140} height={40} rx={6} fill="#9FD39B" stroke="#3F7A3D" strokeWidth={3} />
  </g>
)
const Yes: React.FC<PieceProps> = ({ f, c }) => {
  const s25 = c('s25'), part = c('s25:part'), miss = c('s25:miss')
  const y2010 = c('s26:2010'), bank = c('s26:bank'), yes = c('s26:yes'), charge = c('s26:charge'), everyday = c('s26:everyday'), debit = c('s26:debit'), atm = c('s26:atm'), withdrawal = c('s26:withdrawal')
  const s27 = c('s27'), box = c('s27:box'), ticked = c('s27:ticked'), opened = c('s27:opened')
  const without = c('s28:without'), bank28 = c('s28:bank'), charge28 = c('s28:charge'), fee28 = c('s28:fee'), card28 = c('s28:card'), declined = c('s28:declined')
  const checks = c('s29:checks'), automatic = c('s29:automatic'), still = c('s29:still'), fee29 = c('s29:fee')
  const flipT = on(f, miss, 12), fsx = Math.max(0.02, Math.abs(Math.cos(Math.PI * flipT)))
  const A = win(f, s25, checks), Cc = on(f, checks, 8)
  const left = on(f, without, 16)
  const fx = lerp(CX, 290, left), fy = lerp(800, 700, left), fs = lerp(1.05, 0.58, left)
  const tick = on(f, ticked, 12) * (1 - on(f, without, 10))
  const pen = win(f, ticked - 10, without + 6, 8)
  return (
    <g>
      <DeskWorld f={f} id="od-yes" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, s25, 8)} transform={`translate(${fx} ${fy}) scale(${fsx} 1) translate(${-fx} ${-fy})`}>
          {flipT < 0.5 ? <g transform={`translate(${fx} ${fy}) scale(${fs})`}><rect x={-230} y={-300} width={460} height={600} rx={10} fill="#E9E1CF" stroke="#C9BFA8" strokeWidth={4} /></g>
            : <Form x={fx} y={fy} s={fs} tick={tick} glow={on(f, yes, 8) * (1 - on(f, ticked, 8)) + 0.6 * Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (f - box) / 14))))} />}
        </g>
        <g opacity={on(f, y2010, 8) * (1 - left)} transform={`translate(830 540) scale(${pop(f, y2010)}) rotate(-10)`}><circle r={78} fill="none" stroke={RED} strokeWidth={6} /><circle r={64} fill="none" stroke={RED} strokeWidth={2} /><text y={-6} textAnchor="middle" fill={RED} style={TXT(30)}>SINCE</text><text y={34} textAnchor="middle" fill={RED} style={TXT(46)}>2010</text></g>
        <g opacity={on(f, debit, 8) * (1 - left)}><Card x={230} y={1180} s={0.4 * pop(f, debit)} r={-8} /></g>
        <g opacity={on(f, atm, 8) * (1 - left)}><Atm x={790} y={1260} s={0.62 * pop(f, atm)} /></g>
        {pen > 0.001 && (() => { const t = on(f, ticked, 12); const px = fx + fs * lerp(-156, -86, t), py = fy + fs * lerp(104, 70, t) + fs * 30 * Math.sin(Math.PI * t); return <Pen x={px} y={py} s={0.8} o={pen} /> })()}
        {/* B) without the yes: the fee is crossed out and the card is declined */}
        <g opacity={on(f, bank28, 8)}>
          <Terminal x={700} y={1250} s={0.85} no={on(f, declined, 8)} amount={f >= card28 ? '$24' : undefined} />
          <g opacity={on(f, card28, 6)}><Card x={lerp(980, 700, on(f, card28, 10))} y={960} s={0.38} r={-14} /></g>
          <g opacity={on(f, charge28, 6) * (1 - on(f, declined + 4, 10))} transform={`translate(700 ${470 + drop(f, charge28, 160)})`}><Tag x={0} y={0} s={0.8} rot={swing(f, charge28)} t="$27" /></g>
          <g opacity={on(f, fee28, 6) * (1 - on(f, declined + 4, 10))}><Cross x={700} y={640} s={0.9 * pop(f, fee28)} /></g>
        </g>
        <Spark f={f} at={part} x={CX} y={480} />
        <Spark f={f} at={bank} x={fx + 150} y={fy - 200} />
        <Spark f={f} at={charge} x={fx - 120} y={fy + 140} />
        <Spark f={f} at={everyday} x={300} y={1100} />
        <Spark f={f} at={withdrawal} x={860} y={1000} />
        <Spark f={f} at={s27} x={fx - 110} y={fy + 60} />
        <Spark f={f} at={opened} x={fx} y={fy - 260} />
      </g>}
      {/* C) checks and automatic bills can still bring a fee */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Cheque x={330} y={720} s={0.82 * pop(f, checks)} r={-4} />
        <g opacity={on(f, automatic, 8)}><AutoBill x={600} y={1060} s={0.72 * pop(f, automatic)} r={3} f={f} /></g>
        <g opacity={on(f, still, 6)} transform={`translate(480 ${670 + drop(f, still, 200)})`}><Tag x={0} y={0} s={0.7} rot={-26 + swing(f, still)} t="FEE" /></g>
        <g opacity={on(f, fee29, 6)} transform={`translate(712 ${990 + drop(f, fee29, 200)})`}><Tag x={0} y={0} s={0.7} rot={-24 + swing(f, fee29)} t="FEE" /></g>
      </g>}
      <Vig id="od-yes" k={0.22} />
      <Headline f={f} lines={[[miss, 'THE PART PEOPLE MISS'], [yes, 'THE BANK NEEDS YOUR YES'], [debit, 'DEBIT CARD + ATM'], [ticked, 'ONE TICKED BOX'], [without, 'WITHOUT YOUR YES'], [fee28, 'NO FEE ON THOSE', MINT], [declined, 'THE CARD IS DECLINED'], [checks, 'CHECKS + AUTOPAY'], [still, 'CAN STILL BRING A FEE', RED]]} until={c('s30') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s30–s31: back at the checkout (the loop)
// the card goes through at $0; the gift bow lands — and gets a cross (it isn't a favour); I OWE YOU $24; the red $27 tag swings on
const End: React.FC<PieceProps> = ({ f, c }) => {
  const s30 = c('s30'), card = c('s30:card'), goes = c('s30:goes'), zero = c('s30:zero'), isnt = c("s30:isn't"), favour = c('s30:favour')
  const s31 = c('s31'), d24 = c('s31:24'), loan = c('s31:loan'), d27 = c('s31:27'), price = c('s31:price'), tag = c('s31:tag')
  const you: Beat[] = [[s30, 'hold', 'neutral'], [card, 'point', 'neutral'], [goes, 'thumbsUp', 'smiling'], [isnt, 'crossNoA', 'thinking', 'crossNoB', 12], [d24, 'think', 'worried'], [d27, 'facepalm', 'worried']]
  const hx = 230, hy = 1290, hs = 1.0
  const h = hand(f, you, hx, hy, hs)
  const tCard = on(f, card, 10)
  return (
    <g>
      <StoreWorld f={f} id="od-end" counter={false} dim={0.15 * on(f, isnt, 10)} />
      <Person f={f} who="hero" beats={you} x={hx} y={hy} s={hs} />
      <Counter id="od-end" />
      <g opacity={1 - on(f, d24, 10)}><Terminal x={600} y={1130} s={1.2} ok={on(f, goes, 12)} />
      <Card x={lerp(h.x + 10, 600, tCard)} y={lerp(h.y - 20, 720, tCard)} s={0.55} r={-14} /></g>
      <Bag x={820} y={1130} s={1.0} sticker={f >= d24 ? '$24' : undefined} />
      <g opacity={on(f, zero, 8) * (1 - on(f, d24, 8))}><Phone x={250} y={545} s={0.66 * pop(f, zero)} r={-4} bal="$0" col={RED} /></g>
      <g opacity={on(f, isnt, 6) * (1 - on(f, d24, 8))}><Bow x={820} y={880 + drop(f, isnt, 200)} s={0.95} /></g>
      <g opacity={on(f, favour, 6) * (1 - on(f, d24, 8))}><Cross x={820} y={880} s={0.85 * pop(f, favour)} /></g>
      <g opacity={on(f, loan, 8)}><IOU x={330} y={600} s={0.8 * pop(f, loan)} r={-4} /></g>
      <g opacity={on(f, d27, 6)} transform={`translate(670 ${900 + drop(f, d27, 280)})`}><Tag x={0} y={0} s={lerp(1.0, 1.2, on(f, price, 10))} rot={40 + swing(f, d27) + swing(f, tag, 6)} t="$27" /></g>
      <Spark f={f} at={tag} x={640} y={1060} col="#FFE08A" />
      <Spark f={f} at={s31} x={900} y={800} col="#FFE08A" />
      <Vig id="od-end" />
      <Headline f={f} lines={[[goes, 'IT GOES THROUGH'], [isnt, "IT ISN'T A FAVOUR", RED], [d24, 'A $24 LOAN …'], [d27, '… WITH A $27 PRICE TAG', RED]]} />
    </g>
  )
}

export const OD_TOTAL = makePiece('od-total', 'In the navy night city: red fee tags fall one by one into a big glass jar (ONE FEE AT A TIME) until it fills while the bank towers behind light up; a paper label $5.8 BILLION on the jar, red tags OVERDRAFT and orange tags RETURNED beside it (2023: BIG US BANKS · ≈ $5.8 BILLION IN FEES); then the jar moves aside, the white Capitol slides in, a FEE RULE paper with a green $5 tag appears (2025: CONGRESS · A RULE FOR A $5 FEE) and tears in two and falls (CANCELLED)', {
  canvas: 'tall', mood: 'dark', Component: Total, beats: ["s22", "s22:small", "s22:fee", "s22:time", "s22:adds", "s23:2023", "s23:banks", "s23:billion", "s23:assets", "s23:reported", "s23:58", "s23:overdraft", "s23:returned", "s24", "s24:congress", "s24:rule", "s24:pushed", "s24:big", "s24:5", "s24:before", "s24:effect", "s25"],
  sfx: [['s22:fee', 'tick', 0.25], ['s23:58', 'thud', 0.35], ['s24:before', 'swish', 0.3]] })
export const OD_YES = makePiece('od-yes', 'The part people miss, on a wooden desk: a NEW ACCOUNT form flips face-up, a red SINCE 2010 seal, the OVERDRAFT COVERAGE: YES box glows (THE BANK NEEDS YOUR YES) beside a debit card and an ATM (DEBIT CARD + ATM), a pen ticks the box (ONE TICKED BOX); then the tick is erased (WITHOUT YOUR YES), a red $27 tag over a card terminal gets a big red cross (NO FEE ON THOSE) and the terminal shows a red X (THE CARD IS DECLINED); then a green paper check and an automatic-bill envelope with a looping arrow each get a red FEE tag (CHECKS + AUTOPAY · CAN STILL BRING A FEE)', {
  canvas: 'tall', mood: 'light', Component: Yes, beats: ["s25", "s25:part", "s25:miss", "s26:2010", "s26:bank", "s26:yes", "s26:charge", "s26:everyday", "s26:debit", "s26:atm", "s26:withdrawal", "s27", "s27:box", "s27:ticked", "s27:opened", "s28:without", "s28:bank", "s28:charge", "s28:fee", "s28:card", "s28:declined", "s29:checks", "s29:automatic", "s29:still", "s29:fee", "s30"],
  sfx: [['s27:ticked', 'tick', 0.3], ['s28:declined', 'thud', 0.3], ['s29:fee', 'pop', 0.25]] })
export const OD_END = makePiece('od-end', 'Loop back to the checkout: you tap the card, the terminal shows a green tick at $0 (IT GOES THROUGH), a gift bow drops on the bag and gets a red cross (IT ISN\'T A FAVOUR); an I OWE YOU $24 note appears and the red $27 price tag swings onto the $24 bag as you facepalm (A $24 LOAN … WITH A $27 PRICE TAG)', {
  canvas: 'tall', mood: 'light', Component: End, beats: ["s30", "s30:card", "s30:goes", "s30:zero", "s30:favour", "s31", "s31:24", "s31:loan", "s31:27", "s31:price", "s31:tag"],
  sfx: [['s30:goes', 'ding', 0.25], ['s30:favour', 'tick', 0.25], ['s31:27', 'thud', 0.35]] })
void GOLD
