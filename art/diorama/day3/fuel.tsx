// ---------------------------------------------------------------- s14–s16b: what actually carries you.
// A) a dawn road: a little burgundy car. "MOTIVATION" is a spark plug: it flashes, the engine coughs to life,
//    the car rolls a short way and stops — the fuel gauge reads empty. B) "the fuel is habit": the gauge is
//    relabelled HABIT and fills; the car drives off. C) a grass field: the hero walks the same line again and
//    again, and each pass wears the path darker, until it needs no reward ("STOPS ASKING").
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Backdrop, CX, DAWN, GOLD, GROUND, Headline, Person, Spark, Sun, Tag, Vig, win, BURG, CREAM, INK, on, pop, lerp, span, easeOut, type Beat } from './kit'
import { easeInOut as ease } from '../kit'

const Car: React.FC<{ x: number; y: number; f: number; run: number }> = ({ x, y, f, run }) => {
  const bob = run * Math.sin(f / 2) * 2
  return (
    <g transform={`translate(${x} ${y + bob})`}>
      <path d="M-230 -40 L-200 -140 Q-180 -190 -100 -190 L80 -190 Q140 -190 170 -130 L230 -110 Q250 -100 250 -60 L250 -20 L-230 -20 Z" fill={BURG} stroke={INK} strokeWidth={7} />
      <path d="M-170 -130 L-150 -175 L-40 -175 L-40 -130 Z M-10 -175 L70 -175 Q110 -175 130 -130 L-10 -130 Z" fill="#CFE3F2" stroke={INK} strokeWidth={5} />
      {[-130, 140].map((wx) => <g key={wx} transform={`translate(${wx} -20) rotate(${f * 12 * run})`}><circle r={52} fill={INK} /><circle r={22} fill="#B8BDC8" /><rect x={-4} y={-22} width={8} height={44} fill={INK} /></g>)}
      <circle cx={236} cy={-80} r={12} fill={GOLD} opacity={0.6 + 0.4 * run} />
    </g>
  )
}

const Gauge: React.FC<{ x: number; y: number; level: number; label: string; s?: number }> = ({ x, y, level, label, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-150 0 A150 150 0 0 1 150 0 Z" fill={CREAM} stroke={INK} strokeWidth={8} />
    <path d="M-120 -10 A120 120 0 0 1 -60 -104" stroke="#D2463C" strokeWidth={16} fill="none" />
    <path d="M60 -104 A120 120 0 0 1 120 -10" stroke="#2E8B57" strokeWidth={16} fill="none" />
    <g transform={`rotate(${lerp(-80, 80, level)})`}><rect x={-6} y={-120} width={12} height={120} rx={6} fill={INK} /></g>
    <circle r={16} fill={INK} />
    <text y={70} textAnchor="middle" fill={INK} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
  </g>
)

const Fuel: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), motiv = c('s14:motivation'), carry = c('s14:carry'), way = c('s14:way'), keeps = c('s15:keeps'), running = c('s15:running')
  const spark = c('s15:spark'), engine = c('s15:engine'), fuel15 = c('s15:fuel')
  const s16 = c('s16'), habit = c('s16:habit')
  const s16b = c('s16b'), path = c('s16b:path'), times = c('s16b:times'), reward = c('s16b:reward')

  const AB = win(f, 0, s16b + 6), C = on(f, s16b, 10)
  // # the car: rolls from the spark, stalls before "way"; drives off once HABIT fills
  const run = Math.max(on(f, engine, 6) * (1 - on(f, way - 6, 10)), on(f, habit + 6, 10))
  const carX = lerp(-260, 420, easeOut(span(f, engine, way))) + lerp(0, 900, ease(span(f, habit + 10, s16b)))
  const level = f < habit ? lerp(0.45, 0, easeOut(span(f, motiv, way))) : lerp(0, 1, easeOut(span(f, habit, habit + 18)))
  const heroC: Beat[] = [[0, 'walkA'], [s16b + 8, 'walkB'], [s16b + 16, 'walkA'], [s16b + 24, 'walkB'], [s16b + 32, 'walkA'], [s16b + 40, 'walkB'], [s16b + 48, 'walkA'], [s16b + 56, 'walkB'], [s16b + 64, 'walkA'], [s16b + 72, 'walkB'], [s16b + 80, 'walkA'], [s16b + 88, 'walkB'], [s16b + 96, 'walkA'], [s16b + 104, 'walkB'], [reward, 'idle', 'smiling']]
  // # he paces back and forth along the line: 3 passes, the path darkens with each
  const pace = span(f, s16b, reward)
  const passes = pace * 3, leg = passes % 1, dir = Math.floor(passes) % 2 === 0 ? 1 : -1
  const hx = dir > 0 ? lerp(160, 920, ease(leg)) : lerp(920, 160, ease(leg))
  const wear = Math.min(1, passes / 3)

  return (
    <g>
      <Backdrop id="d3f" m={DAWN} />
      <Sun x={820} y={640} r={110} />
      <path d={`M0 ${GROUND - 260} Q270 ${GROUND - 360} 540 ${GROUND - 280} T1080 ${GROUND - 300} L1080 1920 L0 1920 Z`} fill="#E9B79A" />
      <path d={`M0 ${GROUND - 120} Q300 ${GROUND - 200} 600 ${GROUND - 130} T1080 ${GROUND - 150} L1080 1920 L0 1920 Z`} fill="#C9967C" />
      {/* # A–B) the road, the car, the gauge */}
      {AB > 0.001 && <g opacity={AB}>
        <rect x={0} y={GROUND - 10} width={1080} height={120} fill="#4B4458" />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={60 + k * 230} y={GROUND + 44} width={120} height={14} rx={7} fill={CREAM} opacity={0.8} />)}
        <Car x={carX} y={GROUND} f={f} run={run} />
        {/* # ALL THE WAY: a dashed arrow along the road that falls short on "way" */}
        <g opacity={on(f, carry, 6) * (1 - on(f, s16, 8))}>
          <path d={`M120 ${GROUND - 200} L${lerp(120, 960, easeOut(span(f, carry, way)))} ${GROUND - 200}`} stroke={BURG} strokeWidth={12} strokeDasharray="30 20" />
          <g opacity={on(f, way, 6)}><Tag x={720} y={GROUND - 330} text="NOT ALL THE WAY" s={pop(f, way)} size={46} /></g>
        </g>
        {/* # exhaust puffs while it runs */}
        {[0, 1, 2].map((k) => { const t = ((f - keeps) / 24 + k / 3) % 1; return f > keeps && f < habit ? <circle key={k} cx={carX - 250 - t * 120} cy={GROUND - 50 - t * 40} r={18 + t * 30} fill="#D9D4CC" opacity={(1 - t) * 0.7 * on(f, running, 6)} /> : null })}
        {/* # the spark plug = motivation */}
        <g opacity={on(f, motiv, 8) * (1 - on(f, s16, 8))} transform={`translate(230 ${GROUND - 560})`}>
          <rect x={-26} y={-120} width={52} height={90} rx={10} fill={CREAM} stroke={INK} strokeWidth={6} />
          <rect x={-40} y={-30} width={80} height={60} rx={8} fill="#8A8F9C" stroke={INK} strokeWidth={6} />
          <rect x={-8} y={30} width={16} height={50} fill={INK} />
          <g opacity={on(f, spark, 4) * (1 - on(f, spark + 20, 10))}><Spark f={f} x={0} y={110} s={1.4} /></g>
          <text y={-150} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>MOTIVATION</text>
        </g>
        <g opacity={on(f, fuel15, 8)}><Gauge x={780} y={GROUND - 520} level={level} label={f >= habit ? 'HABIT' : 'FUEL'} s={pop(f, fuel15) * (f >= habit ? lerp(1, 1.12, pop(f, habit) - 0.9) : 1)} /></g>
      </g>}
      {/* # C) a path worn by walking it again and again */}
      {C > 0.001 && <g opacity={C}>
        <rect x={0} y={GROUND - 30} width={1080} height={700} fill="#7FAF6E" />
        <path d={`M120 ${GROUND + 30} Q540 ${GROUND - 10} 960 ${GROUND + 30}`} stroke="#8C6A4A" strokeWidth={lerp(10, 70, wear)} strokeLinecap="round" fill="none" opacity={lerp(0.15, 0.95, wear)} />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => <path key={k} d={`M${80 + k * 150} ${GROUND + 120 + (k % 2) * 40} l12 -34 l12 34`} stroke="#5E8F50" strokeWidth={6} fill="none" />)}
        <Person f={f} who="hero" beats={heroC} x={hx} y={GROUND + 20} s={0.85} flip={dir < 0 && f < reward} />
        <g opacity={on(f, path, 8)}><Tag x={300} y={700} text="A PATH" s={pop(f, path)} size={60} /></g>
        <g opacity={on(f, times, 8)}><Tag x={780} y={760} text={`× ${Math.max(1, Math.round(passes * 40))}`} s={pop(f, times)} size={60} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, reward, 8)}><Tag x={CX} y={560} text="STOPS ASKING FOR A REWARD" s={pop(f, reward)} size={46} fill={GOLD} /></g>
      </g>}
      <Headline text={f < s16 ? 'SPARK ≠ FUEL' : f < s16b ? 'THE FUEL IS HABIT' : ''} o={f < s16 ? on(f, spark, 10) : f < s16b ? on(f, habit, 8) * (1 - on(f, s16b - 4, 4)) : 0} color={INK} />
      <Vig id="d3f" />
    </g>
  )
}

export const D3_FUEL = makePiece('d3-fuel', 'Day 3: spark vs fuel, the worn path', {
  beats: ['s14:motivation', 's14:carry', 's14:way', 's15:spark', 's15:keeps', 's15:running', 's15:engine', 's15:fuel', 's16:habit', 's16b:path', 's16b:times', 's16b:reward'],
  sfx: [['s15:spark', 'crack'], ['s15:engine', 'thump'], ['s16:habit', 'riser'], ['s16b:reward', 'chime']],
  Component: Fuel, mood: 'light', canvas: 'tall',
})
