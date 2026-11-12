// ---------------------------------------------------------------- s12–s16: STEP TWO — everybody else takes them.
// A) a gold "2" medal; a row of five people, each catching a note. B) a little street that slides along: you hand the
//    note to the baker in front of her BAKERY and get a birthday cake; the street slides on to the flour supplier
//    (sacks of FLOUR) — the note goes from her to him; on to the landlord (an apartment block) — from him to the
//    landlord. C) the four of them in round frames, linked by a chain that turns gold on "trust"; the note rides the
//    chain and a fifth frame with a question mark joins at the end ("the next person").
import React from 'react'
import { lerp, on, pop, easeInOut, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { NoteWorld, Vig, Headline, Note, Shopfront, Cake, Sack, Building, Chain, Glint, flyTo, win, CX, INKG, GREEN, GOLD, GOLD2, CREAM, SHADE, TXT, MINTL, PAPER2, WOOD, WOOD2 } from './kit'

const FLOOR = 1240, GAP = 480, X0 = 250
const Medal: React.FC<{ x: number; y: number; n: string; s?: number; o?: number; f: number }> = ({ x, y, n, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={150} fill={SHADE} transform="translate(8 10)" />
    {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 12 + f / 200) * 150} cy={Math.sin(i * Math.PI / 12 + f / 200) * 150} r={16} fill={GOLD} />)}
    <circle r={150} fill={GOLD} stroke={INKG} strokeWidth={5} />
    <circle r={118} fill={MINTL} stroke={INKG} strokeWidth={4} />
    <text y={62} textAnchor="middle" fill={INKG} style={TXT(190)}>{n}</text>
  </g>
)
// # a round portrait frame (centre) holding a Mini
const Frame: React.FC<{ x: number; y: number; look?: string; f: number; s?: number; o?: number; seed: number; glow?: number; q?: boolean }> = ({ x, y, look, f, s = 1, o = 1, seed, glow = 0, q }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={128} fill={SHADE} transform="translate(8 10)" />
    <circle r={128} fill={glow > 0 ? GOLD : PAPER2} stroke={INKG} strokeWidth={5} opacity={1} />
    <circle r={108} fill={CREAM} stroke={INKG} strokeWidth={3} />
    <clipPath id={`nb-fr-${seed}`}><circle r={106} /></clipPath>
    <g clipPath={`url(#nb-fr-${seed})`}>
      {look ? <Mini look={look} x={0} y={150} scale={0.95} frame={f} seed={seed} mood="happy" /> : null}
      {q && <text y={46} textAnchor="middle" fill={GREEN} style={TXT(150)}>?</text>}
    </g>
  </g>
)

const Trust: React.FC<PieceProps> = ({ f, c }) => {
  const two = c('s12:two'), everybody = c('s12:everybody'), takes12 = c('s12:takes')
  const s13 = c('s13'), hand13 = c('s13:hand'), baker = c('s13:baker'), birthday = c('s13:birthday'), cake = c('s13:cake')
  const takes14 = c('s14:takes'), knows = c('s14:knows'), flour = c('s14:flour'), supplier = c('s14:supplier'), take14 = c('s14:take')
  const takes15 = c('s15:takes'), landlord = c('s15:landlord'), take15 = c('s15:take')
  const chain = c('s16:chain'), trust = c('s16:trust'), bill = c('s16:bill'), works = c('s16:works'), next = c('s16:next'), person = c('s16:person'), believes = c('s16:believes')

  const A = win(f, two - 6, s13 - 2), B = win(f, s13 - 2, chain - 2), C = on(f, chain - 2, 7)
  // # the street slides one place on "flour" and again on "landlord"
  const k = easeInOut(span(f, flour - 4, flour + 18)) + easeInOut(span(f, landlord - 4, landlord + 18))
  const slotX = (i: number) => X0 + (i - k) * GAP
  const cast: { who: string; beats: Beat[] }[] = [
    { who: 'investorF', beats: [[s13 - 2, 'idle', 'smiling'], [hand13, 'offer', 'smiling'], [cake + 6, 'receive', 'smiling']] },
    { who: 'owner', beats: [[s13 - 2, 'waveA', 'smiling', 'waveB', 12], [hand13 + 8, 'receive', 'smiling'], [cake, 'offer', 'smiling'], [knows, 'think', 'thinking'], [take14, 'offer', 'smiling']] },
    { who: 'worker', beats: [[s13 - 2, 'idle', 'neutral'], [supplier, 'waveA', 'smiling', 'waveB', 12], [take14 + 8, 'receive', 'smiling'], [takes15, 'holdUp', 'smiling'], [take15, 'offer', 'smiling']] },
    { who: 'buyer', beats: [[s13 - 2, 'idle', 'neutral'], [landlord, 'nodA', 'smiling', 'nodB', 12], [take15 + 8, 'receive', 'smiling']] },
  ]
  // # who holds the note: 0 → 1 on "hand", 1 → 2 on "take" (s14), 2 → 3 on "take" (s15)
  const hops: [number, number, number][] = [[hand13, 0, 1], [take14, 1, 2], [take15, 2, 3]]
  // # the note sits in its holder's hand and flies hand to hand
  // # the baker holds it low at her side so it never covers her face
  const handOf = (i: number): [number, number] => { const h = hand(f, cast[i].beats, slotX(i), FLOOR, 0.72); return i === 1 ? [h.x + 90, h.y + 70] : [h.x, h.y - 30] }
  let [nx, ny] = handOf(0), nr = -6
  for (const [at, a, b] of hops) {
    if (f >= at) { const p = flyTo(f, at, handOf(a), handOf(b), 18, 110); nx = p[0]; ny = p[1]; nr = lerp(-6, 6, p[2]) }
  }
  // # the chain layout: four frames in a zig-zag + the next person
  const spots: [number, number][] = [[200, 560], [520, 760], [820, 560], [520, 1110], [820, 1110]]
  const ride = span(f, works, works + 40)
  const seg = Math.min(3, Math.floor(ride * 4)), segT = ride * 4 - seg
  const rideP = spots[Math.min(seg, 3)], rideQ = spots[Math.min(seg + 1, 4)]

  return (
    <g>
      <NoteWorld f={f} id="nb-trust" floor={FLOOR} />
      {/* # A) step two: everybody else takes them */}
      {A > 0.001 && <g opacity={A}>
        <Medal x={CX} y={600} n="2" s={pop(f, two - 6)} o={on(f, two - 6, 6)} f={f} />
        {[0, 1, 2, 3, 4].map((i) => { const x = 130 + i * 185, t0 = everybody + i * 2
          return <g key={i} opacity={on(f, t0, 6)}>
            <Mini look={['buyer', 'investor', 'owner', 'worker', 'investorF'][i]} x={x} y={1200} scale={0.62 * pop(f, t0)} frame={f} seed={i * 5 + 2} mood="happy" />
            <g opacity={on(f, takes12 + i * 2, 6)}><Note x={x} y={1200 - 230 - Math.sin((f + i * 9) / 16) * 6} s={0.18 * pop(f, takes12 + i * 2)} f={f} /></g>
          </g> })}
      </g>}
      {/* # B) the street: you → baker → flour supplier → landlord */}
      {B > 0.001 && <g opacity={B}>
        {/* # backdrops travel with their people */}
        <g opacity={on(f, baker, 8)}><Shopfront x={slotX(1) + 40} y={FLOOR - 20} s={0.78} sign="BAKERY" /></g>
        <g opacity={on(f, flour, 8)}>{[[-120, 0], [120, 0], [0, -150]].map(([dx, dy], j) => <Sack key={j} x={slotX(2) + dx + 60} y={FLOOR - 20 + dy} s={0.9} />)}</g>
        <g opacity={on(f, landlord, 8)}><Building x={slotX(3) + 50} y={FLOOR - 20} s={0.85} lit={on(f, take15, 10)} /></g>
        {cast.map((p, i) => { const x = slotX(i), vis = Math.max(0, Math.min(1, (x + 160) / 240)) * Math.max(0, Math.min(1, (1240 - x) / 240))
          const show = i === 0 ? 1 : i === 1 ? on(f, baker - 6, 8) : i === 2 ? on(f, supplier - 6, 8) : on(f, landlord - 6, 8)
          return vis * show > 0.001 ? <Person key={i} f={f} who={p.who} beats={p.beats} x={x} y={FLOOR} s={0.72} o={vis * show} /> : null })}
        <g opacity={on(f, birthday, 6) * (1 - on(f, flour - 6, 8))}>
          <g transform={`translate(${slotX(0) + 240} ${FLOOR})`}><ellipse cx={0} cy={4} rx={150} ry={12} fill={SHADE} /><rect x={-140} y={-300} width={280} height={24} rx={6} fill={WOOD} stroke={INKG} strokeWidth={4} /><rect x={-120} y={-276} width={18} height={276} fill={WOOD2} /><rect x={102} y={-276} width={18} height={276} fill={WOOD2} /></g>
          <Cake x={lerp(slotX(0) + 320, slotX(0) + 170, on(f, cake + 6, 16))} y={FLOOR - 300} s={0.75 * pop(f, birthday)} f={f} candles />
        </g>
        <Note x={nx} y={ny} s={0.3} r={nr} f={f} glow={Math.max(on(f, hand13, 6) * (1 - on(f, hand13 + 30, 10)), on(f, takes15, 6) * (1 - on(f, takes15 + 24, 8)))} />
        <Glint f={f} at={knows} x={slotX(1) + 20} y={700} />
      </g>}
      {/* # C) a chain of trust */}
      {C > 0.001 && <g opacity={C}>
        {[0, 1, 2].map((i) => <Chain key={i} a={spots[i]} b={spots[i + 1]} grow={on(f, chain + i * 5, 12)} glow={on(f, trust + i * 3, 10)} />)}
        <Chain a={spots[3]} b={spots[4]} grow={on(f, next, 12)} glow={on(f, believes, 10)} />
        {['investorF', 'owner', 'worker', 'buyer'].map((look, i) => <Frame key={i} x={spots[i][0]} y={spots[i][1]} look={look} f={f} seed={40 + i} s={0.9 * pop(f, chain - 2 + i * 3)} o={on(f, chain - 2 + i * 3, 6)} glow={on(f, trust + i * 3, 8)} />)}
        <g opacity={on(f, next, 6)}><Frame x={spots[4][0]} y={spots[4][1]} f={f} seed={50} q s={0.9 * pop(f, next)} glow={on(f, believes, 8)} /></g>
        {f >= bill && <Note x={lerp(rideP[0], rideQ[0], segT * (ride < 1 ? 1 : 0) + (ride >= 1 ? 1 : 0))} y={lerp(rideP[1], rideQ[1], segT * (ride < 1 ? 1 : 0) + (ride >= 1 ? 1 : 0)) - 150} s={0.26 * pop(f, bill)} f={f} glow={on(f, works, 8)} />}
        <Glint f={f} at={person} x={spots[4][0] + 90} y={spots[4][1] - 110} />
      </g>}
      <Vig id="nb-trust" />
      <Headline f={f} lines={[[two, 'STEP 2', GREEN, 120], [everybody, 'EVERYBODY TAKES THEM', INKG, 92], [baker, 'THE BAKER TAKES IT…', INKG, 92], [supplier, '…HER SUPPLIER TAKES IT…', INKG, 84], [landlord, '…HIS LANDLORD TOO', INKG, 92], [chain, 'A CHAIN OF TRUST', GOLD2, 104]]} />
    </g>
  )
}

export const NB_TRUST = makePiece('nb-trust', 'Step two on banknote paper: a gold medal with a big 2 and a row of five people each catching a floating note; then a street that slides along — you hand a $100 note to a smiling baker in front of her striped-awning BAKERY and she hands back a birthday cake with lit candles; the street slides to a flour supplier with FLOUR sacks and the note hops from her to him; it slides again to a landlord before his apartment block, and the note hops to him; finally the four of them sit in round gold-rimmed frames joined by a chain that turns gold on "trust", the note rides along the chain, and a fifth frame with a question mark joins at the end.', {
  canvas: 'tall', mood: 'light', Component: Trust,
  beats: ["s12:two", "s12:everybody", "s12:takes", "s13", "s13:hand", "s13:baker", "s13:birthday", "s13:cake", "s14:knows", "s14:flour", "s14:supplier", "s14:take", "s15:takes", "s15:landlord", "s15:take", "s16:chain", "s16:trust", "s16:bill", "s16:works", "s16:next", "s16:person", "s16:believes"],
  sfx: [['s13:hand', 'swish', 0.2], ['s14:take', 'swish', 0.2], ['s15:take', 'swish', 0.2], ['s16:trust', 'chime', 0.3]] })
