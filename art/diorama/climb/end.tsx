// ---------------------------------------------------------------- s25–s28: the rule, the average that fools you, the loop back.
// A) THE RULE: a red LOSS arrow down; a much longer green GAIN NEEDED arrow up, standing on a SMALLER PILE.
// B) a stone see-saw: a red −50% block and a green +50% block balance level — AVERAGE 0%; then the real money:
//    a ten-brick stack shrinks to 7½ next to its dashed old height ("didn't stay the same — it shrank").
// C) the loop back to the opening: the hero and his stack, half falls, half climbs back; "it's not back" — the
//    START flag is crossed out; the missing quarter glows red: STILL −25%.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Alps, Arrow, BH, Brick, Cross, CX, Dust, GAIN, GROUND, Headline, INK, Level, LOSS, Stack, Tag, top, Vig, win } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const rule = c('s25:rule'), loss = c('s25:loss'), always = c('s25:always'), bigger = c('s25:bigger'), undo = c('s25:undo'), because = c('s25:because'), starts = c('s25:starts'), smaller = c('s25:smaller')
  const s26 = c('s26'), average = c('s26:average'), down = c('s26:down'), d50 = c('s26:50'), up = c('s26:up'), d50b = c('s26:50#2'), averages = c('s26:averages'), zero = c('s26:zero')
  const s27 = c('s27'), money = c('s27:money'), same = c('s27:same'), shrank = c('s27:shrank')
  const s28 = c('s28'), stock = c('s28:stock'), falls = c('s28:falls'), climbs = c('s28:climbs'), know = c('s28:know'), not = c('s28:not'), still = c('s28:still'), quarter = c('s28:quarter')

  const A = win(f, 0, s26, 8), B = win(f, s26, s27, 8), B2 = win(f, s27, s28, 8), C = on(f, s28, 8)
  // # see-saw tilt: a little dip on each block landing, then level
  const tilt = 6 * Math.sin(Math.PI * on(f, d50, 10)) * (1 - on(f, d50b, 8)) - 6 * Math.sin(Math.PI * on(f, d50b, 10))
  const shrink = on(f, shrank, 22)
  const fallC = on(f, falls, 16), backC = on(f, climbs, 14)
  const SX = 690
  const nC = f < falls ? 10 : f < climbs ? lerp(10, 5, fallC) : lerp(5, 7.5, backC)
  const hero: Beat[] = [[s28, 'idle', 'neutral'], [falls, 'shock', 'worried'], [climbs, 'relief', 'smiling'], [know, 'explain', 'smug'], [not, 'crossNoA', 'neutral', 'crossNoB', 12], [still, 'point', 'smug']]
  return (
    <g>
      <Alps id="cl-end" f={f} />
      {/* # A) the rule */}
      {A > 0.001 && <g opacity={A}>
        <Arrow x={300} y={480} len={300} up={false} p={on(f, loss, 14)} o={on(f, loss, 5)} w={70} />
        <Tag x={300} y={860} text="LOSS" color={LOSS} o={on(f, always, 6)} size={56} />
        <Stack x={700} y={GROUND} n={4} at={because} f={f} />
        <Arrow x={700} y={top(GROUND, 4) - 10} len={480} up p={on(f, bigger, 16)} o={on(f, bigger, 5)} w={70} />
        <Tag x={700} y={top(GROUND, 4) - 560} text="GAIN NEEDED" color={GAIN} o={on(f, undo, 6)} size={52} />
        <Tag x={430} y={GROUND - 100} to={[585, GROUND - 2 * BH]} text="SMALLER PILE" o={on(f, smaller, 6)} s={pop(f, smaller)} size={46} />
        <g opacity={on(f, starts, 6) * (1 - on(f, smaller, 6))}><circle cx={700} cy={top(GROUND, 4)} r={30} fill="none" stroke={GAIN} strokeWidth={6} /></g>
      </g>}
      {/* # B) the see-saw: −50% and +50% balance at 0% */}
      {B > 0.001 && <g opacity={B}>
        <path d={`M${CX - 70} ${GROUND} L${CX} ${GROUND - 150} L${CX + 70} ${GROUND} Z`} fill="#8E8A86" />
        <path d={`M${CX - 20} ${GROUND - 100} L${CX} ${GROUND - 150} L${CX + 20} ${GROUND - 100} Z`} fill="#B5B0A8" />
        <g opacity={on(f, average, 8)} transform={`rotate(${tilt} ${CX} ${GROUND - 150}) translate(0 ${-(1 - on(f, average, 12)) * 120})`}>
          <rect x={CX - 400} y={GROUND - 176} width={800} height={26} rx={10} fill="#7A5A3C" />
          <rect x={CX - 400} y={GROUND - 176} width={800} height={8} rx={4} fill="#9B7752" />
          <g opacity={on(f, averages, 8)}><rect x={CX - 70} y={GROUND - 206} width={140} height={30} rx={15} fill="#DDEFF7" stroke="#5E6B86" strokeWidth={4} /><circle cx={CX} cy={GROUND - 191} r={9} fill={GAIN} /></g>
          <g opacity={on(f, down, 6)} transform={`translate(0 ${-(1 - on(f, d50, 10)) * 160})`}>
            <rect x={CX - 380} y={GROUND - 336} width={200} height={160} rx={14} fill={LOSS} />
            <text x={CX - 280} y={GROUND - 236} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>−50%</text>
          </g>
          <g opacity={on(f, up, 6)} transform={`translate(0 ${-(1 - on(f, d50b, 10)) * 160})`}>
            <rect x={CX + 180} y={GROUND - 336} width={200} height={160} rx={14} fill={GAIN} />
            <text x={CX + 280} y={GROUND - 236} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>+50%</text>
          </g>
        </g>
        <Tag x={CX} y={GROUND - 450} text="AVERAGE: 0%" o={on(f, zero, 6)} s={pop(f, zero)} size={64} />
      </g>}
      {/* # B2) but the money shrank */}
      {B2 > 0.001 && <g opacity={B2}>
        <Stack x={CX} y={GROUND} n={lerp(10, 7.5, shrink)} at={money} f={f} />
        <g opacity={on(f, same, 6)}><Stack x={CX} y={top(GROUND, lerp(10, 7.5, shrink))} n={10 - lerp(10, 7.5, shrink)} tone="ghost" /><Level y={top(GROUND, 10)} x0={CX - 180} x1={CX + 180} f={f} /></g>
        <Dust x={CX} y={top(GROUND, 8.5)} f={f} at={shrank + 4} n={16} />
      </g>}
      {/* # C) the loop back to the opening */}
      {C > 0.001 && <g opacity={C}>
        <Person f={f} who="hero" beats={hero} x={230} y={GROUND + 20} s={0.62} />
        <Stack x={SX} y={GROUND} n={nC} at={s28} f={f} glow={on(f, climbs, 8) * (1 - on(f, climbs + 20, 10))} />
        {fallC > 0 && fallC < 1 && <Dust x={SX} y={top(GROUND, nC) - 30} f={f} at={falls} />}
        <g opacity={on(f, know, 8)}>
          <Stack x={SX} y={top(GROUND, 7.5)} n={2.5} tone={f >= still ? 'red' : 'ghost'} o={f >= still ? 0.8 : 1} />
          <Level y={top(GROUND, 10)} x0={SX - 150} x1={SX + 150} f={f} flag="START" fx={SX + 120} />
        </g>
        <g opacity={1 - on(f, still, 8)}><Cross x={SX} y={top(GROUND, 8.75)} r={70} f={f} at={not} /></g>
        <Tag x={430} y={top(GROUND, 10) + 30} text="STILL −25%" color={LOSS} o={on(f, quarter, 5)} s={pop(f, quarter)} size={54} to={[SX - 118, top(GROUND, 8.75)]} />
        <g opacity={on(f, stock, 6) * (1 - on(f, know, 6))}><Tag x={SX} y={top(GROUND, 10) - 60} text={f >= climbs ? 'UP HALF' : f >= falls ? 'DOWN HALF' : 'A STOCK'} color={f >= climbs ? GAIN : f >= falls ? LOSS : INK} size={54} /></g>
      </g>}
      <Vig id="cl-end" />
      <Headline f={f} lines={[[rule, 'THE RULE', INK, 120], [because, 'GAIN STARTS FROM LESS', INK, 92], [average, 'AVERAGES CAN FOOL YOU', INK, 92], [s27, 'BUT THE MONEY SHRANK', LOSS, 100], [s28, 'DOWN HALF, UP HALF', INK, 100], [not, "IT'S NOT BACK", LOSS, 110]]} />
    </g>
  )
}

export const CL_END = makePiece('cl-end', 'The rule, the average, the loop back (dawn): a red LOSS arrow down and a much longer green GAIN NEEDED arrow standing on a SMALLER PILE; a stone see-saw where a red −50% block and a green +50% block balance level — AVERAGE: 0%; then a ten-brick stack shrinks to 7½ under its dashed old height ($750); finally the hero and his stack: half falls (−50%), half climbs back (+50%), the START flag is crossed out, the missing quarter glows red — STILL −25%', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s25:rule", "s25:loss", "s25:always", "s25:bigger", "s25:undo", "s25:because", "s25:starts", "s25:smaller", "s26", "s26:average", "s26:down", "s26:50", "s26:up", "s26:50#2", "s26:averages", "s26:zero", "s27", "s27:money", "s27:same", "s27:shrank", "s28", "s28:stock", "s28:falls", "s28:climbs", "s28:know", "s28:not", "s28:still", "s28:quarter"],
  sfx: [['s26:zero', 'ding', 0.2], ['s27:shrank', 'thud', 0.2], ['s28:quarter', 'thud', 0.25]] })
