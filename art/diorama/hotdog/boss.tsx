// ---------------------------------------------------------------- s15–s20: step three — the day the price almost broke (a walnut boardroom at night)
// A) the board shakes and cracks (almost broke)
// B) the CEO (Jelinek, left) shows a falling chart (losing a lot) and points at the board: RAISE?
// C) the co-founder (Sinegal, right) slams the table: the RAISE flag is crossed out (figure it out)
// D) a bulb lights up (they figured it out); the crack heals; a thin gold coin = a fair return (a thin profit, but a profit)
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Headline } from './common'
import { BoardWorld, BoardTable, Vig, PriceBoard, LossChart, UpTag, Cross, Bulb, Coin, Tick, Spark, Tagline, win, shake, drop, KETCHUP, MUSTARD, MINT, PAPER, GOLD } from './kit'

const Boss: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), day = c('s15:day'), almost = c('s15:almost'), broke = c('s15:broke')
  const s16 = c('s16'), boss = c('s16:boss'), jelinek = c('s16:jelinek'), told = c('s16:told'), sinegal = c('s16:sinegal'), losing = c('s16:losing'), lot = c('s16:lot'), asked = c('s16:asked'), raise = c('s16:raise')
  const s17 = c('s17'), answer = c('s17:answer'), raise17 = c('s17:raise'), kill = c('s17:kill'), figure = c('s17:figure')
  const s18 = c('s18'), figured = c('s18:figured')
  const s19 = c('s19'), keep = c('s19:keep'), fifty = c('s19:50'), fair = c('s19:fair'), ret = c('s19:return')
  const s20 = c('s20'), thin = c('s20:thin'), profit = c('s20:profit'), profit2 = c('s20:profit#2')
  const A = win(f, s15, s16), B = win(f, s16, s17), Cc = win(f, s17, s18), D = on(f, s18, 8)
  const ceo: Beat[] = [[s15, 'idle', 'neutral'], [boss, 'talk', 'worried'], [told, 'explain', 'worried'], [losing, 'present', 'worried'], [asked, 'pointUp', 'worried'], [answer, 'shock', 'shocked'], [kill, 'nervous', 'worried'], [figured, 'scratchHead', 'thinking'], [s19, 'talk', 'smiling'], [fair, 'thumbsUp', 'smiling']]
  const founder: Beat[] = [[s15, 'armsCrossed', 'neutral'], [sinegal, 'armsCrossed', 'thinking'], [raise, 'armsCrossed', 'angry'], [answer, 'angry', 'angry'], [kill, 'stop', 'angry'], [figure, 'point', 'angry'], [figured, 'think', 'thinking'], [s19, 'confident', 'smug'], [thin, 'countOne', 'smiling']]
  const crack = f < s18 ? on(f, broke, 10) : 1 - on(f, s19, 14)
  const bShake = shake(f, almost, 10) + shake(f, kill, 12)
  const bx = 520, byy = 600
  return (
    <g>
      <BoardWorld f={f} id="dg-boss" red={on(f, kill, 6) * (1 - on(f, s18, 10))} />
      {/* # the two bosses across the table: the CEO left, the co-founder right */}
      <Person f={f} who="investor" beats={ceo} x={210} y={1330} s={1.2} o={on(f, s15 + 2, 8)} />
      <Person f={f} who="owner" beats={founder} x={840} y={1330} s={1.2} flip o={on(f, s15 + 6, 8)} />
      {/* # the board hangs between them the whole time */}
      <PriceBoard x={bx} y={byy} s={0.9 * pop(f, s15)} crack={crack} dx={bShake} glow={on(f, keep, 8) * (1 - on(f, s20, 8))} />
      <BoardTable />
      {A > 0.001 && <g opacity={A}>
        <Spark f={f} at={day} x={760} y={480} col={MUSTARD} />
        <Spark f={f} at={broke} x={540} y={600} col={PAPER} />
      </g>}
      {/* B) losing a lot: the chart dives; raise? */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, losing, 8)}><LossChart x={520} y={950} s={0.95 * pop(f, losing)} t={on(f, lot, 20)} /></g>
        <g opacity={on(f, raise, 8)} transform={`translate(${bx + 300} ${byy - 130 + drop(f, raise, 80)})`}><UpTag x={0} y={0} s={0.85} t="RAISE?" /></g>
        <Spark f={f} at={jelinek} x={260} y={560} col={GOLD} />
      </g>}
      {/* C) the answer: no */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={1 - on(f, figure, 10)} transform={`translate(${bx + 300 + shake(f, kill, 10)} ${byy - 130})`}><UpTag x={0} y={0} s={0.85} t="RAISE?" /></g>
        <g opacity={on(f, raise17, 6)}><Cross x={bx + 300} y={byy - 130} s={1.1 * pop(f, raise17)} /></g>
        {f >= kill && f < kill + 14 && [0, 1, 2].map((k) => <circle key={k} cx={800} cy={1150} r={30 + (f - kill) * 10 + k * 26} fill="none" stroke={KETCHUP} strokeWidth={6} opacity={1 - (f - kill) / 14} />)}
      </g>}
      {/* D) figured out: the bulb, a fair return, a thin profit */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, figured, 8) * (1 - on(f, s19, 10))}><Bulb x={520} y={980} s={1.15 * pop(f, figured)} lit={on(f, figured + 6, 10)} /></g>
        <g opacity={on(f, fair, 8)}><Coin x={520} y={960 + drop(f, fair, 120)} s={1.9 * pop(f, fair)} /></g>
        <g opacity={on(f, ret, 8)}><Tagline x={520} y={1110} t="A FAIR RETURN" size={60} col={PAPER} /></g>
        {/* # the thin profit: the coin turns edge-on into a thin gold sliver */}
        <g opacity={on(f, thin, 8)} transform={`translate(520 960) scale(1.9 ${1.9 * lerp(1, 0.16, on(f, thin, 14))})`}><Coin x={0} y={0} s={1} /></g>
        <g opacity={on(f, profit2, 8)}><Tick x={720} y={960} s={0.8 * pop(f, profit2)} /></g>
        <Spark f={f} at={fifty} x={700} y={470} col={MUSTARD} />
        <Spark f={f} at={profit} x={380} y={940} col={GOLD} />
      </g>}
      <Vig id="dg-boss" k={0.34} />
      <Headline f={f} lines={[[day, 'THE PRICE ALMOST BROKE', KETCHUP], [jelinek, 'FORMER CEO: CRAIG JELINEK'], [sinegal, 'CO-FOUNDER: JIM SINEGAL'], [losing, 'LOSING A LOT', KETCHUP], [raise, 'RAISE IT?'], [kill, '"I\'LL KILL YOU."', KETCHUP], [figure, '"FIGURE IT OUT."'], [figured, 'THEY FIGURED IT OUT', MUSTARD], [fair, 'A FAIR RETURN', MINT], [thin, 'A THIN PROFIT', GOLD], [profit2, 'BUT A PROFIT', MINT]]} color={PAPER} until={c('s21') - 4} />
    </g>
  )
}

export const HD_BOSS = makePiece('dg-boss', 'Step three in a dark walnut boardroom at night: the yellow $1.50 board hangs between two bosses and shakes and cracks (THE PRICE ALMOST BROKE); the CEO on the left (CRAIG JELINEK) shows a red falling chart (LOSING A LOT) and points at a RAISE? flag; the co-founder on the right (JIM SINEGAL) slams the table with red shock rings, the room flushes red and the flag is crossed out ("I\'LL KILL YOU." "FIGURE IT OUT."); then a bulb lights (THEY FIGURED IT OUT), the crack heals, a gold coin drops (A FAIR RETURN) and turns edge-on into a thin sliver with a green tick (A THIN PROFIT, BUT A PROFIT)', {
  canvas: 'tall', mood: 'dark', Component: Boss, beats: ['s15', 's15:day', 's15:almost', 's15:broke', 's16', 's16:boss', 's16:jelinek', 's16:told', 's16:sinegal', 's16:losing', 's16:lot', 's16:asked', 's16:raise', 's17', 's17:answer', 's17:raise', 's17:kill', 's17:figure', 's18', 's18:figured', 's19', 's19:keep', 's19:50', 's19:fair', 's19:return', 's20', 's20:thin', 's20:profit', 's20:profit#2', 's21'],
  sfx: [['s15:broke', 'crack', 0.3], ['s16:losing', 'tick', 0.2], ['s17:kill', 'impact', 0.3], ['s18:figured', 'ding', 0.25], ['s19:fair', 'coin', 0.25]] })
