// ---------------------------------------------------------------- s13–s15: STEP THREE — the credits only come if you stay.
// A) you hold your phone; a gold chain runs from it to the store counter; teal credit coins drip from the counter
//    into your hand each month. B) KEEP YOUR SERVICE · KEEP THE SAME PHONE pills attach to the chain and the phone.
// C) two plan cards; you reach for the other one — the coin drip stops and the last coin gets a cross.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { StoreWorld, Vig, Headline, Pill, Cross, Phone, Counter, Coin, Tether, PlanCard, Glint, win, FLOOR, INK, TEAL, TEAL2, SUN, PLUM, CORAL, CORAL2 } from './kit'

const Stay: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), credits = c('s13:credits'), coming = c('s13:coming'), stay = c('s13:stay')
  const att = c('s14:att'), keep = c('s14:keep'), service = c('s14:service'), same = c('s14:same'), phone = c('s14:phone'), term = c('s14:term')
  const verizon = c('s15:verizon'), sw = c('s15:switch'), another = c('s15:another'), plan = c('s15:plan'), lose = c('s15:lose'), rest = c('s15:rest'), deal = c('s15:deal')

  const A = win(f, s13 - 2, verizon - 2), C = on(f, verizon - 2, 8)
  const you: Beat[] = [[s13 - 2, 'hold', 'smiling'], [stay, 'holdChest', 'thinking'], [keep, 'hold', 'neutral']]
  const hp = hand(f, you, 260, FLOOR, 0.8)
  // # coins drip from the counter to your hand while the credits keep coming
  const drip = (stop: number) => Array.from({ length: 4 }, (_, i) => {
    const per = 30, t0 = credits + i * (per / 4), ph = ((f - t0) / per) % 1
    if (f < t0 || f - ph * per > stop) return null
    const x = lerp(720, hp.x + 20, ph), y = lerp(FLOOR - 300, hp.y - 40, ph) - Math.sin(Math.PI * ph) * 140
    return <Coin key={i} x={x} y={y} s={0.55} col={TEAL} />
  })
  const you2: Beat[] = [[verizon - 2, 'idle', 'neutral'], [sw, 'point', 'smiling'], [lose, 'facepalm', 'worried']]
  return (
    <g>
      <StoreWorld f={f} id="ph-stay" />
      {A > 0.001 && <g opacity={A}>
        <Counter x0={560} x1={1000} />
        <Tether a={[hp.x + 40, hp.y]} b={[640, FLOOR - 250]} grow={on(f, coming, 18)} />
        {drip(verizon)}
        <Person f={f} who="investor" beats={you} x={260} y={FLOOR} s={0.8} />
        <Phone x={hp.x + 10} y={hp.y - 70} s={0.28} f={f} glow={on(f, phone, 8) * (1 - on(f, term, 8))} />
        <g opacity={on(f, service, 6)}><Pill x={760} y={720} t="KEEP YOUR SERVICE" size={40} col={PLUM} s={pop(f, service)} /></g>
        <g opacity={on(f, phone, 6)}><Pill x={760} y={830} t="KEEP THE SAME PHONE" size={40} col={TEAL2} s={pop(f, phone)} /></g>
        <g opacity={on(f, term, 6)}><Pill x={760} y={940} t="FOR THE FULL TERM" size={40} col={CORAL2} s={pop(f, term)} /></g>
        <Glint f={f} at={att} x={640} y={FLOOR - 280} col={SUN} />
        <Glint f={f} at={same} x={hp.x + 10} y={hp.y - 160} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <PlanCard x={300} y={760} s={0.85} name="DEAL PLAN" price="OK" col={TEAL} lit={1 - on(f, sw, 8)} />
        <g opacity={on(f, another, 6)}><PlanCard x={720} y={760} s={0.85 * pop(f, another)} name="OTHER PLAN" price="?" col={CORAL} lit={on(f, plan, 8)} /></g>
        <Person f={f} who="investor" beats={you2} x={lerp(300, 520, on(f, sw, 16))} y={FLOOR} s={0.62} />
        {/* # the last credit coin drops — and is crossed */}
        <g opacity={on(f, lose, 6)}><Coin x={300} y={1130} s={0.9} col={TEAL} /><Cross x={300} y={1130} s={0.55 * pop(f, lose)} /></g>
        <Glint f={f} at={rest} x={720} y={560} />
        <Glint f={f} at={deal} x={300} y={560} />
      </g>}
      <Vig id="ph-stay" />
      <Headline f={f} lines={[[s13, 'STEP 3', SUN, 120], [stay, 'ONLY IF YOU STAY', INK, 104], [att, 'AT&T SAYS:', INK, 104], [verizon, 'VERIZON SAYS:', INK, 104], [lose, 'SWITCH PLANS = LOSE THE DEAL', CORAL2, 80]]} />
    </g>
  )
}

export const PH_STAY = makePiece('ph-stay', 'Step three: you hold your phone while a gold chain grows from it to the plum store counter and teal credit coins arc from the counter into your hand, one a month; pills attach beside you — KEEP YOUR SERVICE, KEEP THE SAME PHONE, FOR THE FULL TERM; then two plan cards, a glowing teal DEAL PLAN and a coral OTHER PLAN — you step over and point at the other one, the drip of credit coins stops and the last coin gets a red cross (SWITCH PLANS = LOSE THE DEAL).', {
  canvas: 'tall', mood: 'light', Component: Stay,
  beats: ["s13", "s13:credits", "s13:coming", "s13:stay", "s14:att", "s14:keep", "s14:service", "s14:same", "s14:phone", "s14:term", "s15:verizon", "s15:switch", "s15:another", "s15:plan", "s15:lose", "s15:rest", "s15:deal"],
  sfx: [['s13:credits', 'coin', 0.2], ['s14:service', 'pop', 0.2], ['s14:term', 'pop', 0.2], ['s15:lose', 'thud', 0.3]] })
