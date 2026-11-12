// ---------------------------------------------------------------- s1–s5: the hook, at the corner-store checkout
// A) you tap your card at zero, the terminal says yes, the balance says $0; a bank appears and a gift bow lands on the bag
// B) the bow falls, a red price tag swings onto the bag ($27), then flips over: OVER 13,000% A YEAR
// C) an old account form with a ticked box (you said yes, years ago)
// D) the card alone, tapping once; three stepping dots: step by step
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { hand, Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { StoreWorld, Counter, Vig, Card, Terminal, Phone, Bag, Tag, BankFront, Bow, Form, Spark, win, swing, drop, CX, RED, INK, MINT, TXT, PAPER } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), tap = c('s1:tap'), groceries = c('s1:groceries'), goes = c('s1:goes'), account = c('s1:account'), zero = c('s1:zero')
  const bank = c('s2:bank'), favour = c('s2:favour'), right = c('s2:right')
  const s3 = c('s3'), cost = c('s3:cost'), d27 = c('s3:27'), priced = c('s3:priced'), loan = c('s3:loan'), d13 = c('s3:13000'), year = c('s3:year')
  const s4 = c('s4'), yes = c('s4:yes'), years = c('s4:years'), noticing = c('s4:noticing')
  const s5 = c('s5'), follow = c('s5:follow'), tap5 = c('s5:tap'), step1 = c('s5:step'), by = c('s5:by'), step2 = c('s5:step#2')

  const A = win(f, s1, s3), B = win(f, s3, s4), Cc = win(f, s4, s5), D = on(f, s5, 8)
  const you: Beat[] = [[s1, 'hold', 'smiling'], [tap, 'point', 'smiling'], [goes, 'thumbsUp', 'smiling'], [account, 'phone', 'thinking'], [bank, 'shrug', 'smiling'], [favour, 'relief', 'smiling'],
    [cost, 'shock', 'shocked'], [d27, 'shock', 'worried'], [d13, 'facepalm', 'worried'], [yes, 'think', 'thinking'], [noticing, 'scratchHead', 'thinking']]
  const hx = 230, hy = 1290, hs = 1.0
  const h = hand(f, you, hx, hy, hs)
  // # the card: in the hand, then it travels to the terminal on "tap"
  const tCard = on(f, tap, 10)
  const cardX = lerp(h.x + 10, 600, tCard), cardY = lerp(h.y - 20, 720, tCard)
  // # the tag flips over on "loan" (front $27 → back 13,000%+)
  const flip = on(f, loan, 12), sx = Math.abs(Math.cos(Math.PI * flip)), back = flip > 0.5
  const bagX = lerp(820, 520, on(f, s3, 14))
  return (
    <g>
      <StoreWorld f={f} id="od-hook" dim={0.18 * on(f, s3, 10) * (1 - on(f, s5, 10))} counter={false} />
      {/* # you, behind the counter (hidden in D: the card owns the frame) */}
      <Person f={f} who="hero" beats={you} x={hx} y={hy} s={hs} o={1 - on(f, s5 - 4, 8)} />
      <Counter id="od-hook" />
      {/* A) checkout */}
      {A > 0.001 && <g opacity={A}>
        <Terminal x={600} y={1130} s={1.2} ok={on(f, goes, 12)} amount={f >= groceries ? 'PAY' : undefined} />
        {f >= goes && f < goes + 30 && [0, 1, 2].map((k) => <circle key={k} cx={600} cy={790} r={40 + (f - goes) * 4 + k * 22} fill="none" stroke={MINT} strokeWidth={5} opacity={Math.max(0, 1 - (f - goes) / 30)} />)}
        <Card x={cardX} y={cardY} s={0.55} r={lerp(-10, -18, tCard)} />
        <g opacity={on(f, groceries, 8)}><Bag x={bagX} y={1130 + drop(f, groceries, 0)} s={1.0 * pop(f, groceries)} /></g>
        <g opacity={on(f, account, 8) * (1 - on(f, bank, 8))}><Phone x={250} y={545} s={0.66 * pop(f, account)} r={-4} bal="$0" col={RED} flash={on(f, zero, 6)} /></g>
        <g opacity={on(f, bank, 8)}><BankFront x={250} y={700} s={0.72 * pop(f, bank)} glow={on(f, favour, 10)} /></g>
        <g opacity={on(f, favour, 6)}><Bow x={820} y={880 + drop(f, favour, 200)} s={0.95} /></g>
        <Spark f={f} at={right} x={900} y={850} />
      </g>}
      {/* B) the bow falls off, the tag swings on, then flips: priced like a loan */}
      {B > 0.001 && <g opacity={B}>
        <Bag x={bagX} y={1130} s={0.95} />
        <g opacity={1 - on(f, cost, 8)} transform={`translate(${bagX + 20} ${lerp(880, 1120, on(f, s3 + 4, 14))}) rotate(${40 * on(f, s3 + 4, 14)})`}><Bow x={0} y={0} s={0.8} /></g>
        <g opacity={on(f, cost, 6)} transform={`translate(${bagX + 110} ${870 + drop(f, cost, 300)})`}>
          <g transform={`scale(${sx} 1)`}><Tag x={0} y={0} s={1.15} rot={-28 + swing(f, cost) + swing(f, loan, 8)} t={back ? '13,000%+' : f >= d27 ? '$27' : ''} col={back ? '#B8321F' : RED} /></g>
        </g>
        {back && <Spark f={f} at={d13} x={bagX + 300} y={930} col="#FFE08A" />}
        <Spark f={f} at={year} x={bagX + 330} y={1020} col="#FFE08A" />
        <Spark f={f} at={priced} x={bagX + 200} y={860} col="#FFE08A" />
      </g>}
      {/* C) the old form, ticked years ago */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g transform={`translate(${lerp(760, 600, on(f, s4, 14))} 0)`}><Form x={0} y={810} s={0.62 * pop(f, s4)} r={4} tick={on(f, yes, 14)} old={on(f, years, 24)} glow={on(f, yes, 8) * (1 - on(f, years, 14))} /></g>
        {f >= years && Array.from({ length: 8 }, (_, k) => <circle key={k} cx={480 + ((k * 61) % 260)} cy={620 + ((k * 97) % 360) - (f - years) * 0.6} r={4} fill="#C8A878" opacity={0.6 * (1 - on(f, noticing + 20, 20))} />)}
      </g>}
      {/* D) follow one tap, step by step */}
      {D > 0.001 && <g opacity={D}>
        <g transform={`translate(0 ${-30 * Math.sin(Math.PI * Math.min(1, Math.max(0, (f - tap5) / 12)))})`}><Card x={lerp(220, CX, on(f, follow, 16))} y={720} s={1.3 * pop(f, s5)} r={lerp(-14, -6, on(f, follow, 16))} /></g>
        {f >= tap5 && f < tap5 + 30 && [0, 1, 2].map((k) => <ellipse key={k} cx={CX} cy={900} rx={80 + (f - tap5) * 6 + k * 30} ry={20 + (f - tap5) * 1.5 + k * 8} fill="none" stroke={MINT} strokeWidth={5} opacity={Math.max(0, 1 - (f - tap5) / 30)} />)}
        {[step1, by, step2].map((at, k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${300 + k * 200} 1080) scale(${pop(f, at)})`}>
          <circle r={56} fill={k === 0 ? RED : PAPER} stroke={INK} strokeWidth={5} /><text y={22} textAnchor="middle" fill={k === 0 ? '#FFFFFF' : INK} style={TXT(64)}>{k + 1}</text>
          {k < 2 && <path d="M70 0 L130 0 M114 -14 L132 0 L114 14" stroke={INK} strokeWidth={6} fill="none" opacity={on(f, [by, step2][k], 6)} />}
        </g>)}
      </g>}
      <Vig id="od-hook" />
      <Headline f={f} lines={[[goes, 'IT GOES THROUGH'], [zero, 'YOUR BALANCE: $0', RED], [favour, 'A FAVOUR?'], [d27, 'IT COSTS ≈ $27', RED], [d13, 'OVER 13,000% A YEAR', RED], [yes, 'YOU SAID YES?'], [follow, 'FOLLOW ONE TAP']]} until={c('s6') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s6–s10: step one — the bank lends you $24
// A) a wall calendar TUE · WED · THU · FRI; your phone says $0; payday on Friday; an arc: 3 DAYS
// B) $24 of groceries (EXAMPLE); the card taps; the bank could decline (a red X flickers) — instead it pays the store
// C) your phone: −$24; an I-OWE-YOU slides out; it is a loan: small (it shrinks) and short (a stopwatch)
import { CalPage, PayEnvelope, Bills, IOU, Watch, flyTo, GOLD, BLUE } from './kit'

const Loan: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), tuesday = c('s6:tuesday'), balance = c('s6:balance'), zero = c('s6:zero'), payday = c('s6:payday'), friday = c('s6:friday'), three = c('s6:three')
  const s7 = c('s7'), buy = c('s7:buy'), d24 = c('s7:24'), debit = c('s7:debit')
  const bank = c('s8:bank'), decline = c('s8:decline'), instead = c('s8:instead'), pays = c('s8:pays'), store = c('s8:store'), d24b = c('s8:24'), itself = c('s8:itself')
  const s9 = c('s9'), minus = c('s9:minus'), owe = c('s9:owe'), back = c('s9:back')
  const s10 = c('s10'), loan = c('s10:loan'), small = c('s10:small'), short = c('s10:short')
  const A = win(f, s6, s7), B = win(f, s7, s9), Cc = on(f, s9, 8)
  const you: Beat[] = [[s6, 'think', 'thinking'], [balance, 'phone', 'worried'], [friday, 'pointUp', 'smiling'], [s7, 'hold', 'smiling'], [debit, 'point', 'smiling'], [decline, 'nervous', 'worried'], [pays, 'relief', 'smiling']]
  const hx = 230, hy = 1290, hs = 1.0
  const h = hand(f, you, hx, hy, hs)
  const tCard = on(f, debit, 10)
  const days = ['TUE', 'WED', 'THU', 'FRI']
  return (
    <g>
      <StoreWorld f={f} id="od-loan" counter={false} />
      <Person f={f} who="hero" beats={you} x={hx} y={hy} s={hs} o={1 - on(f, s9 - 4, 8)} />
      <Counter id="od-loan" />
      {/* A) the week */}
      {A > 0.001 && <g opacity={A}>
        {days.map((d, k) => <g key={d} opacity={on(f, s6 + k * 3, 6)}><CalPage x={330 + k * 175} y={640} day={d} s={0.82} hot={k === 0 ? on(f, tuesday, 8) : k === 3 ? on(f, friday, 8) : 0} col={k === 3 ? MINT : RED} /></g>)}
        <g opacity={on(f, payday, 8)} transform={`translate(855 ${700 + drop(f, payday, 120)})`}><PayEnvelope x={0} y={0} s={0.42} /></g>
        <g opacity={on(f, three, 8)}><path d={`M330 520 Q590 ${430 - 20 * on(f, three, 14)} 855 520`} stroke={INK} strokeWidth={6} fill="none" strokeDasharray="620" strokeDashoffset={620 * (1 - on(f, three, 18))} /><path d="M838 500 L858 524 L830 532" stroke={INK} strokeWidth={6} fill="none" opacity={on(f, three + 12, 6)} /></g>
        <g opacity={on(f, balance, 8)}><Phone x={620} y={950} s={0.58 * pop(f, balance)} bal="$0" col={RED} flash={on(f, zero, 6)} /></g>
      </g>}
      {/* B) groceries, the tap, decline vs pay */}
      {B > 0.001 && <g opacity={B}>
        <Terminal x={600} y={1130} s={1.2} ok={on(f, pays, 12)} no={0.85 * on(f, decline, 5) * (1 - on(f, instead, 8))} amount={f >= debit ? '$24' : undefined} />
        <Card x={lerp(h.x + 10, 600, tCard)} y={lerp(h.y - 20, 720, tCard)} s={0.55} r={-14} />
        <g opacity={on(f, buy, 8)}><Bag x={820} y={1130} s={1.0 * pop(f, buy)} sticker={f >= d24 ? '$24' : undefined} /></g>
        <g opacity={on(f, d24, 8)}><text x={820} y={1190} textAnchor="middle" fill={PAPER} style={TXT(38)}>EXAMPLE</text></g>
        <g opacity={on(f, bank, 8)}><BankFront x={500} y={630} s={0.62 * pop(f, bank)} glow={on(f, pays, 10)} /></g>
        {/* the bank sends the store the money itself */}
        {f >= pays && [0, 1, 2].map((k) => { const p = flyTo(f, pays + k * 5, [500, 560], [820, 880], 20, 160); return p.t < 1 ? <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${-20 + 40 * p.t}) scale(0.4)`}><rect x={-120} y={-30} width={240} height={60} rx={6} fill="#9FD39B" stroke="#3F7A3D" strokeWidth={4} /></g> : null })}
        <g opacity={on(f, d24b, 8)}><Bills x={820} y={870} s={0.45} n={2} /><text x={820} y={760} textAnchor="middle" fill={INK} style={TXT(58)}>$24</text></g>
        <Spark f={f} at={store} x={900} y={860} />
        <Spark f={f} at={itself} x={600} y={460} />
      </g>}
      {/* C) −$24, an I-owe-you: a small, short loan */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g transform={`translate(${lerp(500, 330, on(f, owe, 14))} 0)`}><Phone x={0} y={790} s={0.9 * pop(f, s9)} bal={f >= minus ? '−$24' : '$0'} col={RED} flash={on(f, minus, 6)} /></g>
        <g opacity={on(f, owe, 8)} transform={`translate(${lerp(560, 720, on(f, owe, 14))} 0)`}>
          <IOU x={0} y={lerp(860, 860, 1)} s={(f >= small ? lerp(0.95, 0.62, on(f, small, 10)) : 0.8) * (f >= loan && f < small ? 1 + 0.12 * Math.sin(Math.PI * Math.min(1, (f - loan) / 12)) : 1)} r={4} />
        </g>
        <g opacity={on(f, back, 8) * (1 - on(f, loan, 8))}><path d="M720 740 Q720 560 560 520" stroke={RED} strokeWidth={8} fill="none" strokeDasharray="12 10" /><path d="M582 506 L556 520 L584 536" stroke={RED} strokeWidth={8} fill="none" /><BankFront x={470} y={600} s={0.38} /></g>
        <g opacity={on(f, short, 8)}><Watch x={720} y={1010} s={0.62 * pop(f, short)} t={0.75 * on(f, short, 30)} /></g>
        <Spark f={f} at={s10} x={800} y={760} />
      </g>}
      <Vig id="od-loan" />
      <Headline f={f} lines={[[tuesday, 'TUESDAY: $0'], [friday, 'PAYDAY: FRIDAY', MINT], [three, '3 DAYS AWAY'], [d24, '$24 OF GROCERIES'], [decline, 'DECLINE IT?', RED], [pays, 'THE BANK PAYS'], [d24b, 'THE BANK PAYS $24'], [minus, 'YOUR BALANCE: −$24', RED], [loan, 'THAT IS A LOAN']]} until={c('s11') - 4} />
    </g>
  )
}

export const OD_HOOK = makePiece('od-hook', 'Short hook at a honey-walled corner-store checkout: you (hero, behind the counter) tap a blue debit card on a terminal that shows a green tick (IT GOES THROUGH), a phone shows YOUR BALANCE: $0, a little columned bank glows and a pink gift bow drops on the grocery bag (A FAVOUR?); the bow falls off and a red price tag $27 swings onto the bag, then flips over to 13,000%+ (OVER 13,000% A YEAR); an old NEW ACCOUNT form with a ticked OVERDRAFT COVERAGE: YES box yellows with age (YOU SAID YES?); then the card alone taps once with green ripples above three stepping dots 1 → 2 → 3 (FOLLOW ONE TAP)', {
  canvas: 'tall', mood: 'light', Component: Hook, beats: ["s1", "s1:tap", "s1:groceries", "s1:goes", "s1:account", "s1:zero", "s2:bank", "s2:favour", "s2:right", "s3", "s3:cost", "s3:27", "s3:priced", "s3:loan", "s3:13000", "s3:year", "s4", "s4:yes", "s4:years", "s4:noticing", "s5", "s5:follow", "s5:tap", "s5:step", "s5:by", "s5:step#2", "s6"],
  sfx: [['s1:goes', 'ding', 0.25], ['s3:27', 'thud', 0.3], ['s3:loan', 'swish', 0.25], ['s5:tap', 'pop', 0.25]] })
export const OD_LOAN = makePiece('od-loan', 'Step one in the store: a wall calendar TUE · WED · THU · FRI (TUESDAY: $0, PAYDAY: FRIDAY with a pay envelope, an arc 3 DAYS AWAY), the phone shows $0; then a grocery bag with a $24 sticker (EXAMPLE), the card taps the terminal, a red X flickers (DECLINE IT?) and instead green bills fly from the bank to the bag (THE BANK PAYS $24); then a big phone reads −$24 in red, an I OWE YOU $24 note slides out with a dashed arrow back to the bank, and the note shrinks beside a stopwatch (THAT IS A LOAN)', {
  canvas: 'tall', mood: 'light', Component: Loan, beats: ["s6", "s6:tuesday", "s6:balance", "s6:zero", "s6:payday", "s6:friday", "s6:three", "s7", "s7:buy", "s7:24", "s7:debit", "s8:bank", "s8:decline", "s8:instead", "s8:pays", "s8:store", "s8:24", "s8:itself", "s9", "s9:minus", "s9:owe", "s9:back", "s10", "s10:loan", "s10:small", "s10:short", "s11"],
  sfx: [['s6:friday', 'chime', 0.2], ['s8:decline', 'tick', 0.25], ['s8:pays', 'coin', 0.3], ['s9:minus', 'thud', 0.3]] })
void GOLD; void BLUE
