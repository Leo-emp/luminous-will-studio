// ---------------------------------------------------------------- s1–s6: the hook. Dawn on the ledge.
// A) $1,000 = a stack of ten gold $100 bricks with a STOCK pennant; YEAR 1: the top five tumble off (−50%);
//    YEAR 2: two and a half bricks drop back in (+50%). B) the viewer (hero) thinks he is back: a dashed START
//    flag at the old height — crossed out ("you're not"); $750; the missing 2½ bricks glow red (−25%) and crumble.
// C) a trading screen, crossed out (no trader needed); a red down-arrow; one brick (ONE STOCK) and a packed crate
//    (INDEX FUND) both sag; then three stepping stones rise, 1-2-3 (one step at a time).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Alps, Arrow, Brick, Crate, Cross, CX, Dust, GROUND, Headline, INK, Level, LOSS, GAIN, Screen, Stack, Tag, top, Vig, win, BH } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const d1000 = c('s1:1000'), stock = c('s1:stock'), year1 = c('s1:year'), falls = c('s1:falls'), d50 = c('s1:50')
  const year2 = c('s2:year'), jumps = c('s2:jumps'), d50b = c('s2:50'), down = c('s2:down'), up = c('s2:up')
  const s3 = c('s3'), thinking = c('s3:thinking'), back = c('s3:back'), right = c('s3:right')
  const not = c('s4:not'), d750 = c('s4:750'), quarter = c('s4:quarter'), gone = c('s4:gone')
  const s5 = c('s5'), trader = c('s5:trader'), matter = c('s5:matter'), works = c('s5:works'), anything = c('s5:anything'), down5 = c('s5:down'), one = c('s5:one'), index = c('s5:index')
  const s6 = c('s6'), walk = c('s6:walk'), one6 = c('s6:one'), step = c('s6:step'), time = c('s6:time')

  const AB = win(f, 0, s5, 8), A = 1 - on(f, s3, 8), B = on(f, s3, 8), C = win(f, s5, s6, 8), D = on(f, s6, 8)
  const SX = lerp(520, 690, on(f, s3, 16))                       // # the stack slides right to make room for the hero
  const fall = on(f, falls, 22)                                  // # the top five bricks tumble off to the left
  const drop = on(f, jumps, 12)                                  // # two and a half bricks drop back in
  const hero: Beat[] = [[s3, 'think', 'thinking'], [thinking, 'scratchHead', 'thinking'], [right, 'shrug', 'smiling'], [not, 'crossNoA', 'neutral', 'crossNoB', 12], [d750, 'explain', 'worried'], [gone, 'shock', 'shocked']]
  const T10 = top(GROUND, 10), T75 = top(GROUND, 7.5)

  return (
    <g>
      <Alps id="cl-hook" f={f} />
      {/* # A + B: the stack (shared, it slides right when the hero arrives) */}
      {AB > 0.001 && <g opacity={AB}>
        <Stack x={SX} y={GROUND} n={5} at={d1000} f={f} />
        {/* # the top five: on before the fall, then tumbling away with a puff of gold dust */}
        {fall < 1 && <g opacity={1 - fall} transform={`translate(${-fall * 380} ${fall * 220}) rotate(${-fall * 28} ${SX} ${top(GROUND, 7.5)})`}>
          {[5, 6, 7, 8, 9].map((i) => <g key={i} opacity={on(f, d1000 + i * 2, 6)}><Brick x={SX + (i - 5) * fall * 30} y={GROUND - i * BH - (1 - on(f, d1000 + i * 2, 6)) * 60} /></g>)}
        </g>}
        <Dust x={SX - 120} y={top(GROUND, 7)} f={f} at={falls + 6} />
        {/* # the 2½ bricks that come back */}
        {f >= jumps && <g transform={`translate(0 ${-(1 - drop) * 340})`} opacity={on(f, jumps, 4)}><Stack x={SX} y={top(GROUND, 5)} n={2.5} glow={1 - on(f, d50b + 6, 18)} /></g>}
        {/* # the STOCK pennant planted on the top of the stack (rides the top as it changes) */}
        {(() => { const ty = f < falls ? T10 : f < jumps ? lerp(T10, top(GROUND, 5), on(f, falls, 18)) : lerp(top(GROUND, 5), T75, drop); return (
          <g opacity={on(f, stock, 6) * (1 - on(f, back, 8))} transform={`translate(${SX + 70} ${ty})`}>
            <line x1={0} y1={-14} x2={0} y2={-120} stroke={INK} strokeWidth={6} />
            <path d={`M0 -120 L92 -100 L0 -80 Z`} fill={GAIN} />
            <text x={10} y={-130} fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>STOCK</text>
          </g>) })()}
      </g>}
      {/* # A) the numbers of the two years, pinned to the stack */}
      {A > 0.001 && AB > 0.001 && <g opacity={A * AB}>
        <Tag x={810} y={T10 + 60} text="$1,000" o={on(f, d1000 + 6, 6) * (1 - on(f, falls, 6))} to={[SX + 118, T10 + 30]} s={pop(f, d1000 + 6)} />
        <Tag x={230} y={480} text={f >= year2 ? 'YEAR 2' : 'YEAR 1'} o={on(f, year1, 6)} color="#6A5B49" size={50} />
        <Tag x={240} y={760} text="−50%" color={LOSS} o={on(f, d50, 6)} s={pop(f, d50)} size={66} />
        <Tag x={240} y={900} text="+50%" color={GAIN} o={on(f, d50b, 6)} s={pop(f, d50b)} size={66} />
        <Arrow x={100} y={720} len={90} up={false} p={on(f, down, 10)} />
        <Arrow x={100} y={950} len={90} up p={on(f, up, 10)} />
      </g>}
      {/* # B) "I'm back where I started, right?" — the dashed START height, crossed out; $750; the missing quarter */}
      {B > 0.001 && AB > 0.001 && <g opacity={B * AB}>
        <Person f={f} who="hero" beats={hero} x={230} y={GROUND + 20} s={0.62} />
        <g opacity={on(f, back, 8)}>
          <Stack x={SX} y={T75} n={2.5} tone="ghost" />
          <Level y={T10} x0={SX - 150} x1={SX + 150} f={f} flag="START" fx={SX + 120} />
        </g>
        <g opacity={1 - on(f, quarter, 8)}><Cross x={SX} y={T10 + 72} r={70} f={f} at={not} /></g>
        <g opacity={on(f, quarter, 8) * (1 - 0.6 * on(f, gone + 6, 10))}><Stack x={SX} y={T75} n={2.5} tone="red" /></g>
        <Dust x={SX} y={T10 + 70} f={f} at={gone} />
        <Tag x={868} y={T75 + 40} text="$750" o={on(f, d750, 6)} s={pop(f, d750)} size={54} to={[SX + 118, T75 + 40]} />
        <Tag x={440} y={T10 + 30} text="−25%" color={LOSS} o={on(f, quarter, 6)} s={pop(f, quarter)} size={58} to={[SX - 118, T10 + 72]} />
      </g>}
      {/* # C) not just for traders: anything that can go down, one stock or a whole index fund */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, trader, 8) * (1 - on(f, works, 10))}>
          <Screen x={CX} y={1000} s={1.3 * pop(f, trader)} f={f} />
          <Cross x={CX} y={870} r={120} f={f} at={matter} />
        </g>
        <Arrow x={CX} y={480} len={260} up={false} p={on(f, anything, 16)} o={on(f, anything, 6)} w={46} />
        <g opacity={on(f, one, 8)} transform={`translate(0 ${on(f, down5 + 30, 14) * 18})`}>
          <Brick x={270} y={GROUND - 10} />
          <Tag x={270} y={1000} text="ONE STOCK" size={50} />
        </g>
        <g opacity={on(f, index, 8)} transform={`translate(0 ${on(f, index + 18, 14) * 18})`}>
          <Crate x={720} y={GROUND - 50} s={pop(f, index)} />
          <Tag x={720} y={1000} text="INDEX FUND" size={50} />
        </g>
        <g opacity={on(f, down5, 6) * (1 - on(f, one, 6))}><Tag x={CX} y={830} text="ANYTHING THAT CAN FALL" size={50} color={LOSS} /></g>
      </g>}
      {/* # D) one step at a time: three stepping stones rise up the ledge */}
      {D > 0.001 && <g opacity={D}>
        {[0, 1, 2].map((k) => { const at = [walk, one6, step][k], lit = on(f, [one6, step, time][k], 6); const x = 240 + k * 260, y = GROUND - k * 150
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${(1 - on(f, at, 12)) * 80})`}>
            <path d={`M${x - 120} ${y} L${x - 100} ${y - 70} L${x + 100} ${y - 80} L${x + 124} ${y} Z`} fill="#8E8A86" />
            <path d={`M${x - 100} ${y - 70} L${x + 100} ${y - 80} L${x + 86} ${y - 96} L${x - 90} ${y - 88} Z`} fill="#B5B0A8" />
            <circle cx={x} cy={y - 150} r={52} fill={lit > 0.5 ? '#E4B23E' : '#FFFFFF'} stroke={INK} strokeWidth={5} />
            <text x={x} y={y - 132} textAnchor="middle" fill={INK} style={{ font: '400 60px "Bebas Neue"' }}>{k + 1}</text>
          </g> })}
      </g>}
      <Vig id="cl-hook" />
      <Headline f={f} lines={[[d1000, '$1,000 IN A STOCK', INK, 100], [falls, 'YEAR 1: DOWN HALF', LOSS, 100], [jumps, 'YEAR 2: UP HALF', GAIN, 100], [back, 'BACK TO START?', INK, 104], [quarter, 'A QUARTER GONE', LOSS, 104], [trader, 'NOT JUST TRADERS', INK, 100], [one, 'ANY INVESTMENT', INK, 100], [walk, 'STEP BY STEP', INK, 104]]} />
    </g>
  )
}

export const CL_HOOK = makePiece('cl-hook', 'Hook: at dawn on a rocky alpine ledge, $1,000 is ten gold $100 bricks with a STOCK pennant; YEAR 1 the top five tumble off (−50%), YEAR 2 two and a half drop back (+50%); the hero thinks he is back — a dashed START flag at the old height is crossed out, $750, the missing 2½ bricks glow red (−25%) and crumble; a trading screen crossed out, a red down-arrow, ONE STOCK brick and an INDEX FUND crate sag; three stepping stones 1-2-3 rise', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1:1000", "s1:stock", "s1:year", "s1:falls", "s1:50", "s2:year", "s2:jumps", "s2:50", "s2:down", "s2:up", "s3", "s3:thinking", "s3:back", "s3:right", "s4:not", "s4:750", "s4:quarter", "s4:gone", "s5", "s5:trader", "s5:matter", "s5:works", "s5:anything", "s5:down", "s5:one", "s5:index", "s6", "s6:walk", "s6:one", "s6:step", "s6:time"],
  sfx: [['s1:falls', 'thud', 0.25], ['s2:jumps', 'pop', 0.2], ['s4:not', 'swish', 0.2], ['s4:gone', 'thud', 0.25], ['s6:walk', 'pop', 0.15]] })
