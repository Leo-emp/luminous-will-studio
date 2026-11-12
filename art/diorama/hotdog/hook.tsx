// ---------------------------------------------------------------- s1–s5: the hook, at the warehouse food court
// A) you hand over $1.50 (three coins fly to the counter) and a hot dog and a soda slide out under the yellow board
// B) the board gets a SINCE 1985 stamp; a year page counts 1985 → 2026 (40 years)
// C) rent and groceries climb (an apartment and a bag get rising price flags) while the board stays $1.50
// D) you wonder: is it a LOSS? — a red down arrow, then crossed out; a green tick (it doesn't)
// E) the board alone above four step dots: follow that price, step by step
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { hand, Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { CourtWorld, CourtCounter, Vig, PriceBoard, HotDog, Soda, Coin, Apartment, GroceryBag, UpTag, YearPage, Burst, Cross, Tick, Spark, win, drop, flyTo, wobble, count, CX, KETCHUP, INK, MINT, PAPER, MUSTARD, TXT, RetroWorld, CoinStack, Plant, Tagline, GOLD } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), handOver = c('s1:hand'), one = c('s1:1'), dollar = c('s1:dollar'), fifty = c('s1:50'), walkOut = c('s1:walk#2'), hot = c('s1:hot'), soda = c('s1:soda')
  const s2 = c('s2'), exact = c('s2:exact'), y1985 = c('s2:1985'), forty = c('s2:decades'), years = c('s2:ago')
  const s3 = c('s3'), rent = c('s3:rent'), groceries = c('s3:groceries'), still = c('s3:still'), d50 = c('s3:50')
  const s4 = c('s4'), thinking = c('s4:thinking'), lose = c('s4:lose'), doesnt = c('s4:doesn\'t'), clever = c('s4:clever')
  const s5 = c('s5'), follow = c('s5:follow'), step1 = c('s5:step'), by = c('s5:by'), step2 = c('s5:step#2')

  const A = win(f, s1, exact), Cc = win(f, s3, s4), D = win(f, s4, s5), E = on(f, s5, 8)
  const you: Beat[] = [[s1, 'idle', 'smiling'], [handOver, 'offer', 'smiling'], [hot, 'receive', 'smiling'], [s2, 'point', 'smiling'], [forty, 'shock', 'shocked'],
    [rent, 'scratchHead', 'worried'], [groceries, 'shrug', 'worried'], [still, 'point', 'shocked'], [thinking, 'think', 'thinking'], [lose, 'nervous', 'worried'], [doesnt, 'pointUp', 'smiling'], [clever, 'confident', 'smug']]
  const hx = 210, hy = 1290, hs = 1.0
  const h = hand(f, you, hx, hy, hs)
  // # the board: high in the middle-right; in E it slides to the centre
  const bx = lerp(640, CX + 40, on(f, s5, 16)), by_ = lerp(600, 640, on(f, s5, 16))
  const yearNow = Math.round(lerp(1985, 2026, on(f, forty, 26)))
  return (
    <g>
      <CourtWorld f={f} id="dg-hook" dim={0.12 * on(f, s3, 10) * (1 - on(f, s4, 10))} />
      <Person f={f} who="hero" beats={you} x={hx} y={hy} s={hs} o={1 - on(f, s5 - 4, 8)} />
      {/* # the running motif: the yellow board */}
      <PriceBoard x={bx} y={by_} s={1.05 * pop(f, s1, 14)} glow={on(f, still, 8) * (1 - on(f, s4, 8))} stamp={on(f, y1985, 10)} dx={0} />
      <CourtCounter />
      {/* A) the hand-over and the combo */}
      {A > 0.001 && <g opacity={A}>
        {[one, dollar, fifty].map((at, k) => { const p = flyTo(f, at, [h.x, h.y], [520 + k * 80, 1100], 16, 140); return f >= at ? <g key={k}><Coin x={p.x} y={p.y} s={0.8} t={k === 2 ? '50¢' : '$1'} /></g> : null })}
        <g opacity={on(f, hot, 8)} transform={`translate(${lerp(1000, 700, on(f, hot, 14))} 0)`}><HotDog x={0} y={1080} s={0.9} /></g>
        <g opacity={on(f, soda, 8)} transform={`translate(${lerp(1080, 900, on(f, soda, 14))} 0)`}><Soda x={0} y={1120} s={1.0} /></g>
        <Spark f={f} at={walkOut} x={820} y={980} col={MUSTARD} />
      </g>}
      {/* B) the year page counts up to now */}
      {f >= s2 && <g opacity={win(f, s2, s3)}>
        <g transform={`translate(${lerp(700, 720, on(f, exact, 12))} 0)`}><YearPage x={0} y={900 + drop(f, s2, 160)} s={0.95 * pop(f, s2)} year={`${f >= forty ? yearNow : 1985}`} col={f >= years ? MINT : KETCHUP} r={wobble(f, forty, 6)} /></g>
        <g opacity={on(f, years, 8)}><Tagline x={720} y={1120} t="40+ YEARS" size={72} col={INK} /></g>
      </g>}
      {/* C) everything else climbs */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, rent, 8)}><Apartment x={590} y={1120} s={0.85 * pop(f, rent)} /><g transform={`translate(570 ${lerp(870, 815, on(f, rent + 6, 20))})`}><UpTag x={0} y={0} s={1.0} t="RENT" /></g></g>
        <g opacity={on(f, groceries, 8)}><GroceryBag x={840} y={1120} s={0.9 * pop(f, groceries)} /><g transform={`translate(850 ${lerp(870, 815, on(f, groceries + 6, 20))})`}><UpTag x={0} y={0} s={1.0} t="FOOD" /></g></g>
        <Spark f={f} at={d50} x={880} y={500} col={PAPER} />
      </g>}
      {/* D) a loss? no */}
      {D > 0.001 && <g opacity={D}>
        <HotDog x={640} y={1060} s={1.35 * pop(f, s4)} />
        <g opacity={on(f, lose, 8)} transform={`translate(620 ${850 + drop(f, lose, 120)})`}>
          <Burst x={0} y={0} s={1.1} t="A LOSS?" col={KETCHUP} ink={PAPER} size={56} />
          <path d="M190 -40 L190 60 M164 34 L190 64 L216 34" stroke={KETCHUP} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g opacity={on(f, doesnt, 6)}><Cross x={620} y={850} s={1.3 * pop(f, doesnt)} /></g>
        <g opacity={on(f, clever, 8)}><Tick x={860} y={1000} s={1.0 * pop(f, clever)} /></g>
      </g>}
      {/* E) step by step */}
      {E > 0.001 && <g opacity={E}>
        <path d={`M200 1070 L${lerp(200, 840, on(f, follow, 30))} 1070`} stroke={INK} strokeWidth={6} strokeDasharray="14 14" />
        {[step1, by, by + 6, step2].map((at, k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${230 + k * 200} 1070) scale(${pop(f, at)})`}>
          <circle r={56} fill={k === 0 ? KETCHUP : PAPER} stroke={INK} strokeWidth={5} /><text y={22} textAnchor="middle" fill={k === 0 ? '#FFFFFF' : INK} style={TXT(64)}>{k + 1}</text>
        </g>)}
      </g>}
      <Vig id="dg-hook" />
      <Headline f={f} lines={[[one, '$1.50'], [hot, 'HOT DOG + SODA'], [y1985, 'SAME PRICE AS 1985', KETCHUP], [rent, 'RENT WENT UP'], [groceries, 'FOOD WENT UP'], [still, 'STILL $1.50?', KETCHUP], [lose, 'A LOSS?'], [doesnt, 'NO, IT ISN\'T', MINT], [follow, 'FOLLOW THE PRICE']]} until={c('s6') - 4} />
    </g>
  )
}

// ---------------------------------------------------------------- s6–s9: step one — what $1.50 from 1985 is worth now (a 1985 sunset)
// A) a 1985 year page; the combo with a $1.50 sticker; a 2026 page arrives (now)
// B) prices: a short coin stack for 1985 grows into one more than three times as tall for 2026 (×3.1)
// C) the real hot dog ($1.50) beside a ghost hot dog that kept up with inflation ($4.70)
// D) the gap between the two price heights stretches year by year; coins fly in from a plant far away (somewhere else)
const Worth: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), work = c('s6:work'), one = c('s6:1'), y1985 = c('s6:1985'), worth = c('s6:worth'), now = c('s6:now')
  const s7 = c('s7'), prices = c('s7:prices'), america = c('s7:america'), tripled = c('s7:tripled'), then = c('s7:then')
  const s8 = c('s8'), combo = c('s8:combo'), inflation = c('s8:inflation'), four = c('s8:4'), seventy = c('s8:70'), today = c('s8:today')
  const s9 = c('s9'), every = c('s9:every'), gap = c('s9:gap'), wider = c('s9:wider'), find = c('s9:find'), money = c('s9:money'), somewhere = c('s9:somewhere')
  const A = win(f, s6, s7), B = win(f, s7, s8), Cc = win(f, s8, s9), D = on(f, s9, 8)
  const stack = f < tripled ? 4 : lerp(4, 12.5, on(f, tripled, 24))
  const yr = Math.round(lerp(1985, 2026, on(f, every, 60)))
  const gapH = lerp(120, 380, on(f, wider, 24)) * (0.4 + 0.6 * on(f, gap, 10))
  return (
    <g>
      <RetroWorld f={f} id="dg-worth" />
      {/* A) 1985 → now */}
      {A > 0.001 && <g opacity={A}>
        <YearPage x={280} y={700 + drop(f, s6, 160)} s={1.0 * pop(f, s6)} year="1985" col={KETCHUP} r={-4} />
        <g opacity={on(f, work, 8)}><HotDog x={400} y={1170} s={1.0 * pop(f, work)} /><Soda x={720} y={1220} s={1.0 * pop(f, work)} /></g>
        <g opacity={on(f, one, 8)}><Burst x={480} y={960} s={1.0 * pop(f, one)} t="$1.50" size={72} /></g>
        <g opacity={on(f, now, 8)}><YearPage x={760} y={700 + drop(f, now, 160)} s={1.0 * pop(f, now)} year="2026" col={MINT} r={4} /></g>
        <Spark f={f} at={y1985} x={420} y={560} col={PAPER} />
        <Spark f={f} at={worth} x={560} y={830} col={PAPER} />
      </g>}
      {/* B) prices more than tripled */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, prices, 8)}><CoinStack x={300} y={1200} n={4} s={1.7 * pop(f, prices)} /><Tagline x={300} y={1270} t="1985" size={72} col={PAPER} /></g>
        <g opacity={on(f, america, 8)}><CoinStack x={720} y={1200} n={stack} s={1.7} /><Tagline x={720} y={1270} t="2026" size={72} col={PAPER} /></g>
        <g opacity={on(f, tripled, 8)}><Tagline x={720} y={1200 - stack * 31 - 70} t="×3.1" size={110} col={GOLD} /></g>
        <Spark f={f} at={then} x={300} y={1000} col={GOLD} />
      </g>}
      {/* C) real vs inflation-proof ghost */}
      {Cc > 0.001 && <g opacity={Cc}>
        <HotDog x={290} y={1150} s={1.0 * pop(f, combo)} />
        <Burst x={290} y={940} s={1.0} t="$1.50" size={68} />
        <g opacity={on(f, inflation, 10)}><HotDog x={750} y={1150} s={1.0} ghost /></g>
        <g opacity={on(f, four, 8)} transform={`translate(750 ${lerp(940, 680, on(f, seventy, 18))})`}><Burst x={0} y={0} s={1.0 * pop(f, four)} t={f >= seventy ? '$4.70' : '$4'} col={KETCHUP} ink={PAPER} size={72} /></g>
        <g opacity={on(f, seventy, 10)}><path d="M750 1080 L750 800" stroke={PAPER} strokeWidth={6} strokeDasharray="12 10" /></g>
        <Spark f={f} at={today} x={860} y={600} col={GOLD} />
      </g>}
      {/* D) the gap widens; the money comes from somewhere else */}
      {D > 0.001 && <g opacity={D}>
        <HotDog x={290} y={1150} s={1.0} />
        <Burst x={290} y={1150 - 190} s={0.95} t="$1.50" size={66} />
        <g transform={`translate(740 0)`}>
          <Burst x={0} y={1150 - 190 - gapH} s={0.95} t="$4.70" col={KETCHUP} ink={PAPER} size={66} />
          <path d={`M-60 ${1150 - 190} L60 ${1150 - 190} M0 ${1150 - 190} L0 ${1150 - 190 - gapH + 90} M-60 ${1150 - 190 - gapH + 90} L60 ${1150 - 190 - gapH + 90}`} stroke={GOLD} strokeWidth={10} strokeLinecap="round" opacity={on(f, gap, 8)} />
          <Tagline x={-60} y={1150 - 200 - gapH / 2 + 40} t="GAP" size={84} col={PAPER} o={on(f, gap, 8)} anchor="end" />
        </g>
        <g opacity={on(f, every, 8) * (1 - on(f, find, 8))}><Tagline x={540} y={560} t={`${yr}`} size={110} col={PAPER} /></g>
        <g opacity={on(f, somewhere, 8)}><Plant x={300} y={760 + drop(f, somewhere, 80)} s={0.7} f={f} state="?" col={KETCHUP} /></g>
        {f >= money && [0, 1, 2, 3].map((k) => { const p = flyTo(f, money + 4 + k * 5, [300, 640], [740, 1150 - 200 - gapH / 2], 18, 90); return p.t < 1 ? <g key={k}><Coin x={p.x} y={p.y} s={0.6} /></g> : null })}
      </g>}
      <Headline f={f} lines={[[one, '$1.50 IN 1985'], [now, 'WORTH HOW MUCH NOW?'], [prices, 'PRICES SINCE 1985'], [tripled, 'MORE THAN TRIPLED', GOLD], [inflation, 'IF IT KEPT UP'], [seventy, '≈ $4.70 TODAY', KETCHUP], [gap, 'THE GAP GREW', GOLD], [find, 'WHO PAYS THE GAP?']]} color={PAPER} until={c('s10') - 4} />
      <Vig id="dg-worth" k={0.32} />
    </g>
  )
}

export const HD_HOOK = makePiece('dg-hook', 'Short hook at a steel-blue warehouse food court under a red-and-white awning: you (hero, behind a red counter) hand over three coins that fly to the counter, a hot dog and a soda slide out under a hanging yellow board HOT DOG + SODA $1.50; a SINCE 1985 stamp lands on the board and a year page counts 1985 → 2026 (40+ YEARS); an apartment and a grocery bag rise with RENT and FOOD price flags while the board glows (STILL $1.50?); a big hot dog with a red A LOSS? sticker and a down arrow gets crossed out and a green tick pops (NO, IT ISN\'T); then the board above four step dots 1-2-3-4 on a dashed path (FOLLOW THE PRICE)', {
  canvas: 'tall', mood: 'light', Component: Hook, beats: ['s1', 's1:hand', 's1:1', 's1:dollar', 's1:50', 's1:walk#2', 's1:hot', 's1:soda', 's2', 's2:exact', 's2:1985', 's2:decades', 's2:ago', 's3', 's3:rent', 's3:groceries', 's3:still', 's3:50', 's4', 's4:thinking', 's4:lose', "s4:doesn't", 's4:clever', 's5', 's5:follow', 's5:step', 's5:by', 's5:step#2', 's6'],
  sfx: [['s1:1', 'coin', 0.25], ['s1:50', 'coin', 0.25], ['s2:1985', 'thud', 0.3], ['s4:lose', 'pop', 0.25], ["s4:doesn't", 'swish', 0.25], ['s4:clever', 'ding', 0.2]] })
export const HD_WORTH = makePiece('dg-worth', 'Step one in a 1985 sunset (striped sun, palms, a magenta grid floor): a 1985 year page, a hot dog and a soda with a yellow $1.50 sticker, a 2026 page lands (WORTH HOW MUCH NOW?); a short coin stack (1985) beside one that grows more than three times taller (2026, ×3.1); the real hot dog with $1.50 beside a grey ghost hot dog whose red sticker rises to $4.70 (≈ $4.70 TODAY); then the gap between the two stickers stretches as the years tick 1985 → 2026, and coins fly into the gap from a small factory with a ? pennant (WHO PAYS THE GAP?)', {
  canvas: 'tall', mood: 'dark', Component: Worth, beats: ['s6', 's6:work', 's6:1', 's6:1985', 's6:worth', 's6:now', 's7', 's7:prices', 's7:america', 's7:tripled', 's7:then', 's8', 's8:combo', 's8:inflation', 's8:4', 's8:70', 's8:today', 's9', 's9:every', 's9:gap', 's9:wider', 's9:find', 's9:money', 's9:somewhere', 's10'],
  sfx: [['s6:now', 'thud', 0.25], ['s7:tripled', 'riser', 0.2], ['s8:70', 'pop', 0.25], ['s9:money', 'coin', 0.25]] })
void count
