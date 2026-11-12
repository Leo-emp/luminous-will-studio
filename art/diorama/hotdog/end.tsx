// ---------------------------------------------------------------- s21–s23: step four — count them (a night warehouse aisle)
// A) a pyramid of hot dogs builds row by row while an odometer rolls to 245,000,000
// B) a wall clock spins: 670,000 A DAY; a cash pallet stacks up: ≈ $370M OF SALES
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { hand, Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { AisleWorld, GateWorld, CourtWorld, CourtCounter, Vig, PriceBoard, HotDog, Soda, Odometer, Clock, CashPallet, MemberCard, SharePie, Balance, Heart, Eye, Coin, Tick, Cross, Lock, Burst, YearPage, Spark, Tagline, win, drop, wobble, count, CX, KETCHUP, MUSTARD, MINT, PAPER, GOLD, INK, TEAL, TEAL2, STEEL3 } from './kit'

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

const Count: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), countW = c('s21:count'), many = c('s21:many'), sell = c('s21:sell')
  const s22 = c('s22'), y2025 = c('s22:2025'), sold = c('s22:sold'), n245 = c('s22:245'), million = c('s22:million'), combos = c('s22:combos')
  const s23 = c('s23'), around = c('s23:around'), n670 = c('s23:670000'), every = c('s23:every'), day = c('s23:day'), nearly = c('s23:nearly'), n370 = c('s23:370'), sales = c('s23:sales'), year = c('s23:year')
  const A = win(f, s21, s23), B = on(f, s23, 8)
  // # pyramid rows: 5 at the bottom → 1 on top; each row lands on a beat
  const rowAt = [countW, many, sell, sold, n245]
  const odo = f < sold ? 0 : count(f, sold, 245_000_000, million - sold + 10)
  return (
    <g>
      <AisleWorld f={f} id="dg-count" />
      {A > 0.001 && <g opacity={A}>
        {rowAt.map((at, r) => Array.from({ length: 5 - r }, (_, k) => { const x = CX + (k - (4 - r) / 2) * 180, y = 1250 - r * 74
          return f >= at ? <g key={`${r}-${k}`} opacity={on(f, at + k * 2, 6)}><HotDog x={x} y={y + drop(f, at + k * 2, 90)} s={0.6} /></g> : null }))}
        <g opacity={on(f, sold, 8)}><Odometer x={CX} y={560} s={1.0 * pop(f, sold)} text={fmt(odo)} /></g>
        <g opacity={on(f, y2025, 8)}><YearPage x={190} y={790} s={0.62 * pop(f, y2025)} year="2025" col={MINT} r={-6} /></g>
        <g opacity={on(f, combos, 8)}><Soda x={830} y={920} s={0.75 * pop(f, combos)} /></g>
        <Spark f={f} at={million} x={880} y={500} col={MUSTARD} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, s23, 8)}><Clock x={280} y={740} s={1.35 * pop(f, s23)} f={f} spin={on(f, every, 10) * 2 + 0.2} /></g>
        <g opacity={on(f, n670, 8)}><Tagline x={280} y={1000} t="670,000" size={100} col={MUSTARD} /><Tagline x={280} y={1070} t="A DAY" size={64} col={PAPER} o={on(f, day, 8)} /></g>
        <g opacity={on(f, nearly, 8)}><CashPallet x={720} y={1250} s={1.15 * pop(f, nearly)} rows={Math.round(lerp(1, 7, on(f, n370, 30)))} /></g>
        <g opacity={on(f, n370, 8)}><Tagline x={720} y={820} t="≈ $370M" size={110} col={MUSTARD} /><Tagline x={720} y={890} t="OF SALES" size={64} col={PAPER} o={on(f, sales, 8)} /></g>
        <Spark f={f} at={year} x={880} y={820} col={GOLD} /><Spark f={f} at={around} x={420} y={640} col={MUSTARD} />
      </g>}
      <Vig id="dg-count" k={0.34} />
      <Headline f={f} lines={[[countW, 'COUNT THEM'], [sold, 'SOLD IN ONE YEAR (2025)'], [n245, '≈ 245 MILLION COMBOS', MUSTARD], [every, 'EVERY SINGLE DAY'], [n370, 'NEARLY $370M OF SALES', MUSTARD]]} color={PAPER} until={c('s24') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s24–s28: the real prize is the card (a teal members entrance)
// A) the hot dog with its coins slides away small; the membership card drops in and shines (the real prize)
// B) fees: a cash pallet stacks up ($5.9B), a pie fills to half (of operating profit)
// C) a member holds the card; the board and a heart appear: they renew only if they trust the prices
// D) an eye opens on the steady board: at a glance, nobody is ripping you off (tick)
// E) a scale: a few cents (raise it) against the heart (trust) — the heart is heavier
const Card: React.FC<PieceProps> = ({ f, c }) => {
  const s24 = c('s24'), money = c('s24:money'), real = c('s24:real'), prize = c('s24:prize')
  const s25 = c('s25'), collected = c('s25:collected'), n59 = c('s25:59'), billion = c('s25:billion'), fees = c('s25:fees'), half = c('s25:half'), operating = c('s25:operating')
  const s26 = c('s26'), members = c('s26:members'), paying = c('s26:paying'), trust = c('s26:trust'), prices = c('s26:prices')
  const s27 = c('s27'), never = c('s27:never'), moves = c('s27:moves'), glance = c('s27:glance'), nobody = c('s27:nobody'), here = c('s27:here')
  const s28 = c('s28'), raising = c('s28:raising'), cents = c('s28:cents'), trust28 = c('s28:trust'), risk = c('s28:risk')
  const A = win(f, s24, s25), B = win(f, s25, s26), Cc = win(f, s26, s28), E = on(f, s28, 8)
  const shopper: Beat[] = [[s26, 'hold', 'smiling'], [paying, 'offer', 'smiling'], [trust, 'holdChest', 'smiling'], [s27, 'point', 'thinking'], [glance, 'think', 'thinking'], [nobody, 'thumbsUp', 'smiling']]
  const hx = 210, hy = 1290, hs = 1.15
  const h = hand(f, shopper, hx, hy, hs)
  const tilt = lerp(0, -12, on(f, cents, 12)) + lerp(0, 26, on(f, trust28, 14)) + wobble(f, risk, 5)
  return (
    <g>
      <GateWorld f={f} id="dg-card" />
      {/* A) the hot dog money shrinks; the card is the prize */}
      {A > 0.001 && <g opacity={A}>
        <g transform={`translate(${lerp(540, 260, on(f, real, 16))} ${lerp(1000, 1180, on(f, real, 16))}) scale(${lerp(1, 0.55, on(f, real, 16))})`}>
          <HotDog x={0} y={0} s={0.9 * pop(f, s24)} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, money + k * 3, 6)}><Coin x={-120 + k * 120} y={-140} s={0.55} /></g>)}
        </g>
        <g opacity={on(f, real, 8)}><MemberCard x={600} y={820 + drop(f, real, 200)} s={1.3 * pop(f, real)} r={-6} shine={on(f, prize, 24)} /></g>
      </g>}
      {/* B) $5.9B of fees ≈ half of operating profit */}
      {B > 0.001 && <g opacity={B}>
        <MemberCard x={300} y={560} s={0.62} r={-6} />
        <g opacity={on(f, collected, 8)}><CashPallet x={290} y={1250} s={1.15 * pop(f, collected)} rows={Math.round(lerp(1, 8, on(f, billion, 26)))} /></g>
        <g opacity={on(f, n59, 8)}><Tagline x={290} y={770} t="$5.9B" size={130} col={TEAL2} /><Tagline x={290} y={840} t="IN FEES" size={64} col={INK} o={on(f, fees, 8)} /></g>
        <g opacity={on(f, half, 8)}><SharePie x={730} y={980} r={200} share={0.506} t={on(f, half, 20)} col={TEAL} /><Tagline x={730} y={1250} t="OF OPERATING PROFIT" size={50} col={INK} o={on(f, operating, 8)} /></g>
        <g opacity={on(f, half + 10, 8)}><Tagline x={730} y={740} t="≈ HALF" size={96} col={TEAL2} /></g>
      </g>}
      {/* C + D) a member, the board, trust; then at a glance */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="buyer" beats={shopper} x={hx} y={hy} s={hs} o={on(f, s26, 8)} />
        <g opacity={on(f, members, 8)}><MemberCard x={h.x + 50} y={h.y - 30} s={0.4} r={-12} /></g>
        <PriceBoard x={680} y={620} s={0.9 * pop(f, s26)} glow={on(f, prices, 8)} />
        {/* # the renewal loop: an arrow circling from the card to the board and back */}
        <g opacity={on(f, paying, 8) * (1 - on(f, s27, 8))}>
          <path d={`M380 900 Q540 ${780} 640 840`} stroke={TEAL} strokeWidth={10} fill="none" strokeDasharray="420" strokeDashoffset={420 * (1 - on(f, paying, 20))} strokeLinecap="round" />
          <path d="M622 820 L648 842 L618 858" stroke={TEAL} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
        <g opacity={on(f, trust, 8) * (1 - on(f, s27, 8))}><Heart x={680} y={1010} s={1.6 * pop(f, trust)} /></g>
        <g opacity={on(f, glance, 8)}><Eye x={680} y={980} s={1.3} open={on(f, glance, 10)} /></g>
        <g opacity={on(f, never, 8) * (1 - on(f, glance, 8))}><Lock x={680} y={880} s={0.85 * pop(f, never)} /></g>
        <g opacity={on(f, nobody, 8)}><Tick x={860} y={1150} s={0.95 * pop(f, nobody)} /></g>
        <Spark f={f} at={moves} x={900} y={520} col={MUSTARD} />
        <Spark f={f} at={here} x={680} y={1100} col={MUSTARD} />
      </g>}
      {/* E) cents against trust */}
      {E > 0.001 && <g opacity={E}>
        <Balance x={520} y={760} s={1.3 * pop(f, s28)} tilt={tilt}
          left={<g opacity={on(f, raising, 8)}>{[0, 1, 2].map((k) => <Coin key={k} x={-40 + k * 40} y={-30 - (k % 2) * 20} s={0.4} t="¢" />)}</g>}
          right={<g opacity={on(f, trust28, 8)}><Heart x={0} y={-60} s={0.9} /></g>} />
        <g opacity={on(f, cents, 8)}><Tagline x={230} y={1250} t="A FEW CENTS" size={60} col={INK} /></g>
        <g opacity={on(f, trust28, 8)}><Tagline x={810} y={1250} t="TRUST" size={60} col={KETCHUP} /></g>
        <Spark f={f} at={risk} x={800} y={940} col={KETCHUP} />
      </g>}
      <Vig id="dg-card" k={0.18} />
      <Headline f={f} lines={[[s24, 'NOT THE REAL PRIZE'], [real, 'THE REAL PRIZE', TEAL2], [n59, '$5.9B IN MEMBER FEES', TEAL2], [half, '≈ HALF OF OPERATING PROFIT'], [trust, 'ONLY IF THEY TRUST IT', KETCHUP], [never, 'A PRICE THAT NEVER MOVES'], [nobody, 'NOBODY RIPS YOU OFF', MINT], [raising, 'RAISE IT?'], [risk, 'TRUST AT RISK', KETCHUP]]} until={c('s29') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s29–s31 (+ tail): back at the food court, golden light
// A) 2026: today's CEO (Ron Vachris) behind the counter; the board gets a padlock: won't change
// B) a MISTAKE? sticker on the hot dog is crossed out (forgot to fix? no)
// C) the payoff: the combo under the board; a ghost $4.70 tag behind, the real $1.50 in front; a PROMISE ribbon; SINCE 1985
const Wrench: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-16} y={-10} width={32} height={200} rx={14} fill={STEEL3} stroke={INK} strokeWidth={5} />
    <path d="M-50 -60 A56 56 0 1 1 50 -60 L22 -40 L22 -80 L-22 -80 L-22 -40 Z" fill={STEEL3} stroke={INK} strokeWidth={5} />
  </g>
)
const End: React.FC<PieceProps> = ({ f, c }) => {
  const s29 = c('s29'), y2026 = c('s29:2026'), boss = c('s29:boss'), vachris = c('s29:vachris'), wont = c("s29:won't"), change = c('s29:change'), around = c('s29:around')
  const s30 = c('s30'), mistake = c('s30:mistake'), forgot = c('s30:forgot'), fix = c('s30:fix')
  const s31 = c('s31'), four = c('s31:4'), promise = c('s31:promise'), sold = c('s31:sold'), fifty = c('s31:50'), working = c('s31:working'), y1985 = c('s31:1985')
  const A = win(f, s29, s30), B = win(f, s30, s31), Cc = on(f, s31, 8)
  const ceo: Beat[] = [[s29, 'idle', 'smiling'], [boss, 'talk', 'smiling'], [wont, 'stop', 'smug'], [around, 'thumbsUp', 'smiling'], [mistake, 'shrug', 'smiling'], [fix, 'crossNoA', 'smug', 'crossNoB', 14], [s31, 'present', 'smiling']]
  const hx = 210, hy = 1290, hs = 1.0
  return (
    <g>
      <CourtWorld f={f} id="dg-end" warm={0.6 + 0.4 * on(f, s31, 20)} />
      <Person f={f} who="investor" beats={ceo} x={hx} y={hy} s={hs} o={1 - on(f, s31 + 4, 10)} />
      <PriceBoard x={lerp(640, CX + 40, on(f, s31, 16))} y={600} s={1.05} glow={on(f, promise, 10)} stamp={on(f, y1985, 10)} />
      <CourtCounter />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, y2026, 8)}><YearPage x={800} y={940 + drop(f, y2026, 140)} s={0.75 * pop(f, y2026)} year="2026" col={MINT} r={5} /></g>
        <g opacity={on(f, wont, 8)}><Lock x={640} y={830 + drop(f, wont, 120)} s={1.0 * pop(f, wont)} /></g>
        <Spark f={f} at={vachris} x={340} y={560} col={MUSTARD} />
        <Spark f={f} at={change} x={760} y={480} col={PAPER} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <HotDog x={640} y={1070} s={1.2 * pop(f, s30)} />
        <g opacity={on(f, mistake, 8)} transform={`translate(620 ${870 + drop(f, mistake, 100)})`}><Burst x={0} y={0} s={1.05} t="MISTAKE?" col={PAPER} size={54} /></g>
        <g opacity={on(f, forgot, 8)}><Wrench x={880} y={880} s={1.0} r={20 + wobble(f, forgot, 12)} /></g>
        <g opacity={on(f, fix, 6)}><Cross x={620} y={870} s={1.25 * pop(f, fix)} /></g>
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        {/* # the ghost $4.70 behind, the real $1.50 in front */}
        <g opacity={0.8 * on(f, four, 8)}><Burst x={665} y={870} s={0.95 * pop(f, four)} t="$4.70" col="#D9D2C8" ink={INK} size={64} r={10} /></g>
        <HotDog x={480} y={1080} s={1.25 * pop(f, s31)} />
        <Soda x={875} y={1120} s={0.9 * pop(f, s31 + 4)} />
        <g opacity={on(f, fifty, 8)}><Burst x={300} y={880} s={1.0 * pop(f, fifty)} t="$1.50" size={70} r={-10} /></g>
        {/* # the promise ribbon over the bun */}
        <g opacity={on(f, promise, 8)} transform={`translate(490 ${1200}) scale(${pop(f, promise)})`}>
          <path d="M-260 -40 L260 -40 L230 0 L260 40 L-260 40 L-230 0 Z" fill={KETCHUP} stroke={INK} strokeWidth={5} />
          <text y={22} textAnchor="middle" fill={PAPER} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 4 }}>A PROMISE</text>
        </g>
        <Spark f={f} at={sold} x={520} y={960} col={MUSTARD} />
        <Spark f={f} at={working} x={830} y={960} col={MUSTARD} />
      </g>}
      <Vig id="dg-end" />
      <Headline f={f} lines={[[y2026, 'TODAY\'S CEO, 2026'], [vachris, 'RON VACHRIS'], [wont, '"WON\'T CHANGE"', MINT], [mistake, 'A MISTAKE?'], [fix, 'NOT A MISTAKE', MINT], [four, 'A $4.70 PROMISE'], [fifty, 'SOLD FOR $1.50', KETCHUP], [y1985, 'SINCE 1985']]} />
    </g>
  )
}

export const HD_COUNT = makePiece('dg-count', 'Step four in a dark night warehouse aisle with orange-and-blue racks and skylight shafts: a pyramid of hot dogs builds row by row (COUNT THEM) while a steel odometer rolls up to 245,000,000 (≈ 245 MILLION COMBOS) beside a 2025 page and a soda; then a spinning wall clock with 670,000 A DAY and a wooden pallet stacking bundled cash, ≈ $370M OF SALES', {
  canvas: 'tall', mood: 'dark', Component: Count, beats: ['s21', 's21:count', 's21:many', 's21:sell', 's22', 's22:2025', 's22:sold', 's22:245', 's22:million', 's22:combos', 's23', 's23:around', 's23:670000', 's23:every', 's23:day', 's23:nearly', 's23:370', 's23:sales', 's23:year', 's24'],
  sfx: [['s21:count', 'pop', 0.2], ['s22:sold', 'riser', 0.2], ['s22:million', 'ding', 0.25], ['s23:370', 'cash', 0.3]] })
export const HD_CARD = makePiece('dg-card', 'At a teal MEMBERS ENTRANCE: the hot dog and its coins slide away small while a teal MEMBER card drops in and shines (THE REAL PRIZE); a cash pallet stacks up ($5.9B IN FEES) beside a pie that fills to half (≈ HALF OF OPERATING PROFIT); a shopper holds the card, a teal arrow loops to the yellow $1.50 board and a red heart pops (ONLY IF THEY TRUST IT); a padlock, then an eye opens on the steady board and a green tick (NOBODY RIPS YOU OFF); then a brass scale: a few cent coins on the left against the heart on the right, which sinks heavier and wobbles (TRUST AT RISK)', {
  canvas: 'tall', mood: 'light', Component: Card, beats: ['s24', 's24:money', 's24:real', 's24:prize', 's25', 's25:collected', 's25:59', 's25:billion', 's25:fees', 's25:half', 's25:operating', 's26', 's26:members', 's26:paying', 's26:trust', 's26:prices', 's27', 's27:never', 's27:moves', 's27:glance', 's27:nobody', 's27:here', 's28', 's28:raising', 's28:cents', 's28:trust', 's28:risk', 's29'],
  sfx: [['s24:real', 'thud', 0.25], ['s25:billion', 'cash', 0.3], ['s26:trust', 'softpop', 0.25], ['s27:glance', 'chime', 0.2], ['s28:trust', 'thump', 0.3]] })
export const HD_END = makePiece('dg-end', 'Back at the warehouse food court in golden light: today\'s CEO (worker, behind the red counter) under the yellow $1.50 board, a 2026 page lands and a padlock clicks onto the board ("WON\'T CHANGE"); a hot dog with a white MISTAKE? sticker and a wrench, crossed out (NOT A MISTAKE); then the payoff: the hot dog and soda big under the board, a grey ghost $4.70 sticker behind, a yellow $1.50 sticker in front and a red A PROMISE ribbon over the bun, and a SINCE 1985 stamp on the board', {
  canvas: 'tall', mood: 'light', Component: End, beats: ['s29', 's29:2026', 's29:boss', 's29:vachris', "s29:won't", 's29:change', 's29:around', 's30', 's30:mistake', 's30:forgot', 's30:fix', 's31', 's31:4', 's31:promise', 's31:sold', 's31:50', 's31:working', 's31:1985'],
  sfx: [["s29:won't", 'click', 0.3], ['s30:fix', 'swish', 0.25], ['s31:promise', 'chime', 0.25], ['s31:1985', 'thud', 0.3]] })
void TEAL2; void GOLD
