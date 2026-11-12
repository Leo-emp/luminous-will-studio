// ---------------------------------------------------------------- s16–s20: leave after one year (the store after dark).
// A) a glowing door across the street: BETTER OFFER; you walk toward it, phone in hand. B) the 36-box wall: the first
//    12 boxes are teal credits (+$300 FREE); the other 24 turn coral. C) the chain to the store snaps on "cancel";
//    the 24 coral boxes fly together into one giant bill that slams down: $600 DUE ON YOUR NEXT BILL; you are shocked.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { StoreWorld, Vig, Headline, Pill, Phone, Door, Grid36, BillDoc, Tether, Glint, win, FLOOR, CX, WHITE, TEAL, CORAL, CORAL2, SUN, LILAC } from './kit'

const Leave: React.FC<PieceProps> = ({ f, c }) => {
  const imagine = c('s16:imagine'), better = c('s16:better'), offer = c('s16:offer'), leave = c('s16:leave'), year = c('s16:year')
  const d12 = c('s17:12'), credits = c('s17:credits'), d300 = c('s17:300'), free = c('s17:free')
  const other = c('s18:other'), d24 = c('s18:24'), d600 = c('s18:600'), disappear = c('s18:disappear')
  const cancel = c('s19:cancel'), line = c('s19:line'), rest = c('s19:rest'), due = c('s19:due'), next = c('s19:next'), bill = c('s19:bill')
  const phone20 = c('s20:phone'), turned = c('s20:turned'), d600b = c('s20:600'), bill20 = c('s20:bill')

  const A = win(f, c('s16') - 2, d12 - 2), B = win(f, d12 - 2, cancel - 2), C = on(f, cancel - 2, 8)
  const you: Beat[] = [[c('s16') - 2, 'think', 'thinking'], [better, 'point', 'smiling'], [leave, 'walkA', 'smiling', 'walkB', 10]]
  const youX = lerp(240, 560, on(f, leave, 50))
  const hp = hand(f, you, youX, FLOOR, 0.78)
  const you3: Beat[] = [[cancel - 2, 'idle', 'neutral'], [due, 'shock', 'shocked'], [turned, 'despair', 'worried']]
  const gather = on(f, d600b - 6, 18)
  return (
    <g>
      <StoreWorld f={f} id="ph-leave" dark shelves={false} />
      {/* # A) the better offer across the street */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, better, 8)}><Door x={780} y={FLOOR} s={0.95 * pop(f, better)} open={on(f, offer, 20)} sign="BETTER OFFER" /></g>
        <Person f={f} who="investor" beats={you} x={youX} y={FLOOR} s={0.78} />
        <Phone x={hp.x + 10} y={hp.y - 60} s={0.24} f={f} />
        <g opacity={on(f, year, 6)}><Pill x={300} y={560} t="AFTER 1 YEAR" size={50} col={SUN} tc="#2A2346" s={pop(f, year)} /></g>
        <Glint f={f} at={imagine} x={780} y={500} />
      </g>}
      {/* # B) 12 credits paid, 24 left */}
      {B > 0.001 && <g opacity={B}>
        <Grid36 x={120} y={440} cell={112} gap={14} dark
          state={(i) => (i < 12 ? (f >= credits ? 'credit' : 'plain') : f >= d24 + (i - 12) * 0.8 ? 'owed' : 'plain')}
          pop={(i) => (i < 12 ? pop(f, d12 + i, 8) : pop(f, d24 + (i - 12) * 0.8, 8))}
          label={(i) => (i < 12 ? (f >= credits ? '−$25' : '') : f >= d24 ? '$25' : '')} />
        <g opacity={on(f, d300, 6)}><Pill x={CX} y={1250} t="$300 REALLY FREE" size={46} col={TEAL} s={pop(f, d300)} /></g>
        <g opacity={on(f, d600, 6)}><Pill x={CX} y={1250} t="24 × $25 = $600 LEFT" size={46} col={CORAL2} s={pop(f, d600)} /></g>
        <Glint f={f} at={free} x={300} y={500} />
        <Glint f={f} at={other} x={700} y={800} />
        <Glint f={f} at={disappear} x={700} y={1100} />
      </g>}
      {/* # C) cancel: the chain snaps, the $600 bill slams down */}
      {C > 0.001 && <g opacity={C}>
        <Tether a={[120, 520]} b={[960, 520]} snap={on(f, line, 10)} o={1 - on(f, rest, 10)} />
        <g opacity={on(f, cancel, 6) * (1 - on(f, rest, 8))}><Pill x={CX} y={660} t="CANCEL THE LINE" size={48} col={CORAL2} /></g>
        <g opacity={on(f, rest, 8)}>
          <BillDoc x={lerp(1400, 640, on(f, next, 12))} y={760} s={1.05} r={lerp(18, 4, on(f, next, 12))} amount="$600" amountCol={CORAL2} stamp="DUE NOW" stampO={on(f, bill, 8)} />
        </g>
        <Person f={f} who="investor" beats={you3} x={220} y={FLOOR} s={0.72} />
        {f >= d600b - 6 && gather < 1 && Array.from({ length: 8 }, (_, i) => { const sx = 140 + (i % 4) * 230, sy = 480 + Math.floor(i / 4) * 140
          return <rect key={i} x={lerp(sx, 600, gather) - 40} y={lerp(sy, 760, gather) - 40} width={80} height={80} rx={14} fill={CORAL} opacity={1 - gather} /> })}
        <Glint f={f} at={phone20} x={640} y={500} col={SUN} />
        <Glint f={f} at={d600b} x={820} y={560} col={SUN} />
        <Glint f={f} at={bill20} x={460} y={1020} col={LILAC} />
        <Glint f={f} at={due} x={820} y={980} col={WHITE} />
      </g>}
      <Vig id="ph-leave" k={0.35} />
      <Headline f={f} lines={[[imagine, 'NOW IMAGINE…', WHITE, 110], [d12, '12 CREDITS', TEAL, 120], [d24, '24 PAYMENTS LEFT', CORAL, 110], [due, 'DUE ON YOUR NEXT BILL', WHITE, 92], [d600b, 'A $600 BILL', CORAL, 130]]} />
    </g>
  )
}

export const PH_LEAVE = makePiece('ph-leave', 'The store after dark: a door across the street glows warm yellow with a BETTER OFFER sign and swings open; you point, then walk toward it, phone in hand (AFTER 1 YEAR); the 36-box wall in night colours shows the first 12 boxes turn teal −$25 ($300 REALLY FREE) and the other 24 turn coral $25 (24 × $25 = $600 LEFT); on "cancel" a gold chain across the frame snaps; a giant white bill swings down from the top — $600 in coral with a DUE NOW stamp — as coral boxes fly into it and you throw up your hands in shock, then despair.', {
  canvas: 'tall', mood: 'dark', Component: Leave,
  beats: ["s16:imagine", "s16:better", "s16:offer", "s16:leave", "s16:year", "s17:12", "s17:credits", "s17:300", "s17:free", "s18:other", "s18:24", "s18:600", "s18:disappear", "s19:cancel", "s19:line", "s19:rest", "s19:due", "s19:next", "s19:bill", "s20:phone", "s20:turned", "s20:600", "s20:bill", "s16"],
  sfx: [['s16:offer', 'swish', 0.2], ['s17:300', 'ding', 0.2], ['s18:600', 'tick', 0.2], ['s19:line', 'crack', 0.3], ['s19:next', 'impact', 0.3]] })
