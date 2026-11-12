// ---------------------------------------------------------------- s10–s14: step two — squeeze the costs, not the price (a mint-tiled hot dog plant)
// A) the board under a padlock while a fat COSTS sack is squeezed thin in a steel vise
// B) 2008: a hot dog brand's truck rolls in and its price flag climbs $ → $$ → $$$
// C) the truck is crossed out and drives off; Costco's own plant pops up (CA), then a second (IL)
// D) hot dogs ride out of the plant on a conveyor; no outside maker: a ghost truck is crossed, the price stays locked
// E) drinks and toppings swap: the soda cup changes colour (2025), the sauce bottles change; coins saved stack up
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from './common'
import { PlantWorld, Vig, PriceBoard, Lock, Truck, UpTag, Cross, Plant, Conveyor, HotDog, Soda, Bottle, CoinStack, YearPage, Spark, Tagline, win, drop, shake, wobble, KETCHUP, BLUE, MUSTARD, INK, MINT, PAPER, KRAFT, KRAFT2, STEEL3, TXT, GOLD } from './kit'

// # the COSTS sack (squeezed: 0 → 1 makes it thin and tall)
const Sack: React.FC<{ x: number; y: number; sq: number }> = ({ x, y, sq }) => (
  <g transform={`translate(${x} ${y}) scale(${1.35 * lerp(1, 0.45, sq)} ${1.35 * lerp(1, 1.15, sq)})`}>
    <path d="M-120 0 Q-150 -120 -90 -200 L-40 -230 L40 -230 L90 -200 Q150 -120 120 0 Z" fill={KRAFT} stroke={INK} strokeWidth={6} />
    <path d="M-40 -230 L-20 -260 L20 -260 L40 -230" fill={KRAFT2} stroke={INK} strokeWidth={5} />
    <text y={-90} textAnchor="middle" fill={INK} style={TXT(64)}>COSTS</text>
  </g>
)
// # the vise jaws (gap = distance between the two jaws)
const Vise: React.FC<{ x: number; y: number; gap: number }> = ({ x, y, gap }) => (
  <g transform={`translate(${x} ${y})`}>
    {[-1, 1].map((d) => <g key={d} transform={`translate(${(d * gap) / 2} 0)`}><rect x={d < 0 ? -50 : 0} y={-260} width={50} height={250} rx={8} fill={STEEL3} stroke={INK} strokeWidth={5} /><rect x={d < 0 ? -50 : 0} y={-260} width={50} height={20} fill="#FFFFFF" opacity={0.25} /></g>)}
    <rect x={-gap / 2 - 70} y={-150} width={gap + 140} height={24} rx={12} fill={INK} opacity={0.85} />
    <rect x={-gap / 2 - 60} y={-10} width={gap + 120} height={20} rx={8} fill={INK} />
  </g>
)

const PlantScene: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10'), squeezed = c('s10:squeezed'), costs = c('s10:costs'), not = c('s10:not'), price10 = c('s10:price')
  const s11 = c('s11'), y2008 = c('s11:2008'), brand = c('s11:brand'), kept = c('s11:kept'), raising = c('s11:raising'), prices11 = c('s11:prices')
  const s12 = c('s12'), stopped = c('s12:stopped'), started = c('s12:started'), plant = c('s12:plant'), california = c('s12:california'), later = c('s12:later'), illinois = c('s12:illinois')
  const s13 = c('s13'), outside = c('s13:outside'), maker = c('s13:maker'), raise13 = c('s13:raise'), price13 = c('s13:price')
  const s14 = c('s14'), drinks = c('s14:drinks'), toppings = c('s14:toppings'), reason = c('s14:reason'), y2025 = c('s14:2025'), switched = c('s14:switched'), save = c('s14:save'), money = c('s14:money')
  const A = win(f, s10, s11), B = win(f, s11, s12), Cc = win(f, s12, s13), D = win(f, s13, s14), E = on(f, s14, 8)
  const sq = on(f, squeezed, 18)
  const truckX = f < s12 ? lerp(-300, 470, on(f, brand, 24)) : lerp(470, 1500, on(f, stopped + 10, 30))
  const flag = f >= prices11 ? '$$$' : f >= raising ? '$$' : '$'
  const swap = on(f, switched, 12), sx = Math.abs(Math.cos(Math.PI * swap))
  return (
    <g>
      <PlantWorld f={f} id="dg-plant" />
      {/* A) the vise squeezes costs; the price is locked */}
      {A > 0.001 && <g opacity={A}>
        <PriceBoard x={710} y={620} s={0.82 * pop(f, s10)} />
        <g opacity={on(f, not, 8)}><Lock x={710} y={850 + drop(f, not, 120)} s={1.1 * pop(f, not)} /></g>
        <g opacity={on(f, costs, 8)}><Sack x={330} y={1250} sq={sq} /></g>
        <g opacity={on(f, squeezed, 6)} transform="translate(330 1260) scale(1.3) translate(-330 -1260)"><Vise x={330} y={1260} gap={lerp(380, 180, sq)} /></g>
        <Spark f={f} at={price10} x={900} y={520} col={MUSTARD} />
      </g>}
      {/* B) 2008: the brand keeps raising its price */}
      {B > 0.001 && <g opacity={B}>
        <YearPage x={190} y={640 + drop(f, y2008, 140)} s={0.85 * pop(f, y2008)} year="2008" col={BLUE} r={-4} />
        <Truck x={truckX} y={1250} s={1.3} />
        <g opacity={on(f, kept, 8)} transform={`translate(${truckX + 150} ${lerp(860, 720, on(f, prices11, 16))})`}><UpTag x={0} y={0} s={1.3 + 0.15 * on(f, prices11, 10)} t={flag} /></g>
        <Spark f={f} at={raising} x={truckX + 60} y={700} col={KETCHUP} />
      </g>}
      {/* C) stop buying, build our own */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={1 - on(f, started, 10)}><Truck x={truckX} y={1250} s={1.3} /><g opacity={on(f, stopped, 6)}><Cross x={truckX - 40} y={1060} s={1.5 * pop(f, stopped)} /></g></g>
        <g opacity={on(f, plant, 8)}><Plant x={280} y={1250 + drop(f, plant, 140)} s={0.95 * pop(f, plant)} f={f} state="CA" col={MINT} /></g>
        <g opacity={on(f, california, 8)}><Tagline x={280} y={800} t="CALIFORNIA" size={64} col={INK} /></g>
        <g opacity={on(f, illinois, 8)}><Plant x={730} y={1250 + drop(f, illinois, 140)} s={0.95 * pop(f, illinois)} f={f} state="IL" col={BLUE} /><Tagline x={730} y={800} t="ILLINOIS" size={64} col={INK} /></g>
        <Spark f={f} at={later} x={760} y={900} col={MUSTARD} />
      </g>}
      {/* D) our own hot dogs; no outside maker can raise the price */}
      {D > 0.001 && <g opacity={D}>
        <Plant x={230} y={1130} s={0.85} f={f} state="CA" col={MINT} />
        <Conveyor x={640} y={1130} w={600} f={f} />
        {Array.from({ length: 4 }, (_, k) => { const x = 380 + ((f * 3 + k * 150) % 560); return <HotDog key={k} x={x} y={1096} s={0.46} /> })}
        <PriceBoard x={640} y={640} s={0.8} dx={shake(f, raise13, 10)} />
        <Lock x={640} y={870} s={1.0} />
        <g opacity={on(f, outside, 8) * 0.8}><Truck x={800} y={1270} s={0.55} t="OUTSIDE" /></g>
        <g opacity={on(f, maker, 6)}><Cross x={780} y={1180} s={0.8 * pop(f, maker)} /></g>
        <g opacity={on(f, raise13, 6) * (1 - on(f, price13 + 10, 10))} transform={`translate(${840 + shake(f, raise13, 8)} 900)`}><UpTag x={0} y={0} s={0.85} t="RAISE" /></g>
      </g>}
      {/* E) swap the drinks and toppings */}
      {E > 0.001 && <g opacity={E}>
        <g opacity={on(f, drinks, 8)} transform={`translate(330 1220) scale(${sx} 1)`}><Soda x={0} y={0} s={1.55 * pop(f, drinks)} col={swap > 0.5 ? BLUE : KETCHUP} /></g>
        <g opacity={on(f, toppings, 8)}>
          <Bottle x={600} y={1220} s={1.45 * pop(f, toppings)} col={MUSTARD} r={wobble(f, reason, 6)} />
          <Bottle x={790} y={1220} s={1.45 * pop(f, toppings + 4)} col={KETCHUP} r={-wobble(f, reason, 6)} />
        </g>
        <g opacity={on(f, y2025, 8)}><YearPage x={300} y={600 + drop(f, y2025, 140)} s={0.75 * pop(f, y2025)} year="2025" col={MINT} r={-4} /></g>
        <g opacity={on(f, save, 8)}><CoinStack x={720} y={780} n={lerp(1, 6, on(f, money, 20))} s={1.3} /></g>
        <Spark f={f} at={switched} x={420} y={900} col={GOLD} />
      </g>}
      <Vig id="dg-plant" k={0.2} />
      <Headline f={f} lines={[[squeezed, 'SQUEEZE THE COSTS'], [not, 'NOT THE PRICE', KETCHUP], [y2008, 'AROUND 2008'], [kept, 'THE BRAND KEPT RAISING', KETCHUP], [stopped, 'STOP BUYING'], [plant, 'MAKE THEIR OWN', MINT], [outside, 'NO OUTSIDE MAKER'], [price13, 'PRICE LOCKED', MINT], [drinks, 'NEW DRINKS, NEW TOPPINGS'], [switched, '2025: NEW SODA BRAND'], [save, 'TO SAVE MONEY', MINT]]} until={c('s15') - 4} />
    </g>
  )
}

export const HD_PLANT = makePiece('dg-plant', 'Step two in a mint-tiled hot dog plant with a sky window band: a yellow $1.50 board above a gold padlock while a fat kraft COSTS sack is squeezed thin in a steel vise (SQUEEZE THE COSTS, NOT THE PRICE); a 2008 page, a blue HOT DOG BRAND box truck rolls in and its red price flag climbs $ → $$ → $$$; a red cross and the truck drives off, then a brick plant with a steaming chimney and a CA pennant pops up (CALIFORNIA), then a second with IL (ILLINOIS); hot dogs ride a conveyor out of the plant under the locked board while a small OUTSIDE truck is crossed and a RAISE flag shakes and fades (PRICE LOCKED); then a soda cup flips from red to blue (2025), mustard and ketchup bottles wobble and a coin stack grows (TO SAVE MONEY)', {
  canvas: 'tall', mood: 'light', Component: PlantScene, beats: ['s10', 's10:squeezed', 's10:costs', 's10:not', 's10:price', 's11', 's11:2008', 's11:brand', 's11:kept', 's11:raising', 's11:prices', 's12', 's12:stopped', 's12:started', 's12:plant', 's12:california', 's12:later', 's12:illinois', 's13', 's13:outside', 's13:maker', 's13:raise', 's13:price', 's14', 's14:drinks', 's14:toppings', 's14:reason', 's14:2025', 's14:switched', 's14:save', 's14:money', 's15'],
  sfx: [['s10:squeezed', 'crack', 0.2], ['s10:not', 'click', 0.3], ['s12:stopped', 'thud', 0.3], ['s12:plant', 'pop', 0.25], ['s12:illinois', 'pop', 0.25], ['s14:switched', 'swish', 0.25], ['s14:money', 'coin', 0.25]] })
void PAPER
