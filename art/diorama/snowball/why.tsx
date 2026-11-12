// ---------------------------------------------------------------- s16–s23a: why, in two steps.
// A) step 1: a snowball made of layers — its core (what you put in) and a gold ring (last year's growth); a fresh layer of
//    snow wraps the WHOLE ball, ring included: COMPOUNDING.
// B) the example: a stack of 10 gold coins = $1,000 (EXAMPLE), +10% a year. Year 1: one green coin (+$100). Year 10: the
//    stack is ≈ 23½ coins and grows by ≈ 2½ green coins (+$236) — the pile it works on is bigger.
// C) step 2: four snowballs doubling, $1,000 → $2,000 → $4,000 → $8,000; the last one shows its old half and its new half
//    (each double adds as much as the whole pile had); an arrow on the biggest.
// D) slow, then sudden: the growth curve, its flat start and its steep end.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { SnowWorld, Vig, Headline, Sign, Snowball, Coins, Curve, StepBadge, ArrowUp, win, CX, FLOOR, INK, CORAL, GOLD, GOLD2, GREEN, SNOW, SNOW2, SNOW3, PAPER, ICE } from './kit'

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const s16 = c('s16'), two = c('s16:two')
  const year17 = c('s17:year'), s17 = c('s17'), percentage = c('s17:percentage'), everything = c('s17:everything'), including = c('s17:including'), growth2 = c('s17:growth#2')
  const s17a = c('s17a'), compounding = c('s17a:compounding')
  const s18 = c('s18'), d1000 = c('s18:1000'), d10 = c('s18:10')
  const s19 = c('s19'), d100 = c('s19:100')
  const s20 = c('s20'), d236 = c('s20:236'), pile = c('s20:pile'), bigger = c('s20:bigger')
  const s21 = c('s21'), doubles = c('s21:doubles'), seven = c('s21:seven')
  const s22 = c('s22'), d2000 = c('s22:2000'), d4000 = c('s22:4000'), d8000 = c('s22:8000')
  const s23 = c('s23'), whole = c('s23:whole'), before = c('s23:before'), last = c('s23:last'), biggest = c('s23:biggest')
  const s23a = c('s23a'), slow = c('s23a:slow'), sudden = c('s23a:sudden')

  const A = win(f, s16, s18), B = win(f, s18, s21), Cc = win(f, s21, s23a), D = on(f, s23a, 8)
  const wrap = on(f, everything, 20)
  const speed = c('s21:speed')
  const balls = [[150, 46, d1000 > 0 ? s21 : s21, '$1,000'], [290, 65, d2000, '$2,000'], [480, 92, d4000, '$4,000'], [750, 130, d8000, '$8,000']] as const

  return (
    <g>
      <SnowWorld f={f} id="snb-why" />
      {/* # A) step 1: the layered snowball */}
      {A > 0.001 && <g opacity={A}>
        <StepBadge x={CX} y={540} n={1} s={on(f, s17, 10)} o={on(f, s17, 8)} />
        <g transform={`translate(${CX} 980)`} opacity={on(f, s17 + 6, 8)}>
          <ellipse cx={10} cy={270} rx={260} ry={34} fill="rgba(40,70,100,0.18)" />
          {/* # the fresh layer wraps everything */}
          <circle r={lerp(200, 250, wrap)} fill={SNOW} stroke={ICE} strokeWidth={6} opacity={lerp(0.35 * on(f, year17, 8), 1, on(f, everything, 8))} />
          <circle r={200} fill={SNOW2} />
          <circle r={200} fill="none" stroke={GOLD} strokeWidth={40} opacity={0.4 + 0.6 * on(f, including, 8)} />
          <circle r={150} fill="#F4F9FD" stroke={SNOW3} strokeWidth={4} />
          <text y={18} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"' }}>WHAT YOU HAVE</text>
        </g>
        <Sign x={CX} y={700} t="+ THE SAME % ON ALL OF IT" size={40} o={on(f, percentage, 8) * (1 - on(f, including, 8))} />
        <Sign x={CX} y={700} t="INCLUDING LAST YEAR’S GROWTH" size={40} col={GOLD} o={on(f, growth2, 8) * (1 - on(f, compounding - 2, 6))} />
        <Sign x={CX} y={700} t="COMPOUNDING" size={60} col={INK} tc={SNOW} o={on(f, compounding, 8)} />
      </g>}
      {/* # B) the coin stacks */}
      {B > 0.001 && <g opacity={B}>
        <Sign x={CX} y={520} t="$1,000 · EXAMPLE" size={44} o={on(f, d1000, 8) * (1 - on(f, s19, 8))} />
        <Sign x={CX} y={520} t="+10% A YEAR" size={52} col={GOLD} o={on(f, d10, 8) * (1 - on(f, s19, 8))} />
        <Coins x={280} y={FLOOR - 40} n={lerp(0, 10, on(f, d1000, 14)) + (f >= d100 ? 1 : 0)} s={1.05} hi={f >= d100 ? 1 : 0} />
        <Sign x={280} y={FLOOR - 340} t="YEAR 1: +$100" size={42} col={GREEN} tc={SNOW} o={on(f, d100, 8)} />
        <Coins x={720} y={FLOOR - 40} n={lerp(0, 23.6, on(f, s20, 18)) + (f >= d236 ? 2.4 : 0)} s={1.05} hi={f >= d236 ? 2 : 0} o={on(f, s20, 8)} />
        <Sign x={720} y={FLOOR - 540} t="YEAR 10: +$236" size={42} col={GREEN} tc={SNOW} o={on(f, d236, 8)} />
        <ArrowUp x={880} y={FLOOR - 340} s={0.8} o={on(f, bigger, 8)} />
        <Sign x={720} y={FLOOR - 620} t="BIGGER PILE" size={36} o={on(f, pile, 8)} />
      </g>}
      {/* # C) step 2: doubling snowballs */}
      {Cc > 0.001 && <g opacity={Cc}>
        <StepBadge x={CX} y={540} n={2} s={on(f, s21, 10)} o={on(f, s21, 8) * (1 - on(f, seven - 6, 6))} />
        <Sign x={CX} y={540} t="DOUBLES ≈ EVERY 7 YEARS" size={44} o={on(f, seven, 8) * (1 - on(f, s22 - 4, 6))} />
        {balls.map(([x, r, a, t], k) => { const o = k === 0 ? on(f, speed, 8) : on(f, a, 8)
          return <g key={k} opacity={o}>
            <Snowball id={`snb-w${k}`} x={x} y={FLOOR - 40 - r * pop(f, k === 0 ? speed : a)} r={r * pop(f, k === 0 ? speed : a)} />
            <Sign x={x} y={FLOOR - 40 - 2 * r - 40} t={t} size={k === 3 ? 46 : 34} o={o} />
          </g> })}
        {/* # the last ball: old half vs new half */}
        <g opacity={on(f, whole, 8)}>
          <circle cx={750} cy={FLOOR - 170} r={130 / Math.SQRT2} fill="none" stroke={ICE} strokeWidth={8} strokeDasharray="14 10" />
          <circle cx={750} cy={FLOOR - 170} r={128} fill="none" stroke={GOLD} strokeWidth={10} opacity={on(f, before, 8)} />
        </g>
        <Sign x={750} y={FLOOR - 470} t="+$4,000 = ALL IT HAD" size={36} col={GOLD} o={on(f, before, 8) * (1 - on(f, last, 8))} />
        <ArrowUp x={750} y={FLOOR - 500} s={0.9} o={on(f, biggest, 8)} />
      </g>}
      {/* # D) slow, then sudden */}
      {D > 0.001 && <g opacity={D}>
        <rect x={110} y={480} width={830} height={720} rx={24} fill={PAPER} stroke={SNOW2} strokeWidth={6} />
        <Curve x0={170} y0={1130} w={720} h={580} p={on(f, s23a, 40)} />
        <Sign x={330} y={1050} t="SLOW" size={52} col={ICE} o={on(f, slow, 8)} />
        <Sign x={720} y={620} t="SUDDEN" size={56} col={CORAL} tc={SNOW} o={on(f, sudden, 8)} />
      </g>}
      <Vig id="snb-why" />
      <Headline f={f} lines={[[s16, 'WHY? TWO STEPS', INK, 104], [s17, 'STEP 1', INK, 120], [s18, 'SAY $1,000 GROWS 10%', INK, 90], [s20, 'YEAR 10 ADDS MORE', INK, 100], [s21, 'STEP 2', INK, 120], [s22, 'IT KEEPS DOUBLING', INK, 100], [biggest, 'THE LAST DOUBLE IS BIGGEST', CORAL, 82], [s23a, 'SLOW, THEN SUDDEN', INK, 100]]} />
    </g>
  )
}

export const SB_WHY = makePiece('snb-why', 'Why, in two steps, in the snowy valley: step 1 — a big layered snowball (WHAT YOU HAVE core, a gold ring of last year’s growth) gets a fresh layer of snow wrapping all of it: + THE SAME % ON ALL OF IT, INCLUDING LAST YEAR’S GROWTH, COMPOUNDING; the example — a stack of 10 gold coins ($1,000 · EXAMPLE, +10% A YEAR) gains one green coin (YEAR 1: +$100) while a taller stack of about 23 coins gains about 2½ green coins (YEAR 10: +$236, BIGGER PILE); step 2 — four snowballs doubling $1,000, $2,000, $4,000, $8,000 (DOUBLES ≈ EVERY 7 YEARS), the biggest showing its old half dashed and its new half in gold (+$4,000 = ALL IT HAD) with an arrow; then a growth curve on a snow board: SLOW, then SUDDEN.', {
  canvas: 'tall', mood: 'light', Component: Why,
  beats: ["s16", "s16:two", "s17:year", "s17", "s17:percentage", "s17:everything", "s17:including", "s17:growth#2", "s17a", "s17a:compounding", "s18", "s18:1000", "s18:10", "s19", "s19:100", "s20", "s20:236", "s20:pile", "s20:bigger", "s21", "s21:doubles", "s21:seven", "s22", "s22:2000", "s22:4000", "s22:8000", "s23", "s23:whole", "s23:before", "s23:last", "s23:biggest", "s23a", "s23a:slow", "s23a:sudden", "s21:speed"],
  sfx: [['s17a:compounding', 'chime', 0.15], ['s19:100', 'coin', 0.2], ['s20:236', 'coin', 0.2], ['s22:8000', 'pop', 0.2], ['s23:biggest', 'thud', 0.2]] })
