// ---------------------------------------------------------------- s7–s13b: the spark that fades.
// A) warm room: new things pop in around the hero (the plan, new shoes, a new notebook) and each one sends gold
//    sparks into his chest; on "dopamine" a glowing cluster gathers above him; "workout" he runs on the spot.
// B) two cards: NEW glows gold, REPEATED stays grey. C) dusk: the same alarm and shoes are "not new anymore",
//    their sparks turn grey and drop; a balance scale: EFFORT stays heavy while the REWARD sparks evaporate.
// D) the gap: he stops, "MOST PEOPLE QUIT HERE"; LAZY is crossed out, an empty REWARD meter is the real reason.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Alarm, Backdrop, CX, DAWN, DUSK, GOLD, GROUND, Headline, Notebook, Person, PlanSheet, Room, Shoes, Spark, SparkFlow, Tag, Vig, win, BURG, CREAM, INK, on, pop, lerp, span, easeOut, type Beat } from './kit'

const CHEST = { x: CX, y: GROUND - 360 }

const SparkPiece: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), newW = c('s7:new'), pays = c('s7:pays')
  const novelty = c('s8:novelty'), lights = c('s8:lights'), dopa = c('s8:dopamine'), chasing = c('s8:chasing')
  const plan = c('s9:plan'), shoes = c('s9:shoes'), note = c('s9:notebook'), electric = c('s9:electric')
  const s9b = c('s9b'), workout = c('s9b:workout'), adventure = c('s9b:adventure'), rewards = c('s9b:rewards'), starting = c('s9b:starting'), wanting = c('s8:wanting')
  const s10 = c('s10'), new10 = c('s10:new'), repeated = c('s10:repeated')
  const s11 = c('s11'), gym = c('s11:gym'), alarm11 = c('s11:alarm'), any2 = c('s11:anymore#2')
  const s12 = c('s12'), dries = c('s12:dries'), effort = c('s12:effort')
  const s13 = c('s13'), moment = c('s13:moment'), gap = c('s13:gap'), eff13 = c('s13:effort'), spk13 = c('s13:spark'), quit = c('s13:quit')
  const s13b = c('s13b'), lazy = c('s13b:lazy'), lazy2 = c('s13b:lazy#2'), lazy3 = c('s13b:lazy#3'), ran = c('s13b:ran')

  const A = win(f, 0, s10 + 4), B = win(f, s10, s11 + 4), C = win(f, s11, s13 + 4), D = on(f, s13, 10)
  const dusk = on(f, s11 - 4, 16)
  const heroA: Beat[] = [[0, 'idle', 'neutral'], [pays, 'present', 'smiling'], [dopa, 'reachUp', 'smiling'], [electric, 'celebrate', 'smiling'], [workout, 'runA', 'smiling'], [workout + 8, 'runB', 'smiling'], [workout + 16, 'runA', 'smiling'], [workout + 24, 'runB', 'smiling'], [starting, 'fistPump', 'smiling']]
  const heroD: Beat[] = [[s13, 'idle', 'worried'], [gap, 'shrug', 'worried'], [quit, 'despair', 'worried'], [s13b, 'idle', 'thinking'], [ran, 'scratchHead', 'thinking']]
  // # the scale: effort pan stays down, the reward pan rises as its sparks dry up
  const tilt = lerp(0, 16, easeOut(span(f, dries, effort + 20)))

  return (
    <g>
      <Backdrop id="d3s" m={DAWN} />
      <Room m={DAWN} light={1 - dusk} />
      <g opacity={dusk}><Room m={DUSK} light={0.2} /></g>
      {/* # A) new things pay out */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, newW, 8) * (1 - on(f, novelty, 6))}><Tag x={CX} y={470} text="NEW" s={pop(f, newW)} fill={GOLD} size={72} /></g>
        <g opacity={on(f, plan, 6)}><PlanSheet x={200} y={GROUND - 520} s={0.8 * pop(f, plan)} r={-6} /></g>
        <g opacity={on(f, shoes, 6)}><Shoes x={860} y={GROUND - 10} s={0.8 * pop(f, shoes)} /></g>
        <g opacity={on(f, note, 6)}><Notebook x={880} y={GROUND - 560} s={0.8 * pop(f, note)} r={8} /></g>
        <SparkFlow f={f} at={plan + 4} x0={200} y0={GROUND - 520} x1={CHEST.x} y1={CHEST.y} />
        <SparkFlow f={f} at={shoes + 4} x0={860} y0={GROUND - 40} x1={CHEST.x} y1={CHEST.y} />
        <SparkFlow f={f} at={note + 4} x0={880} y0={GROUND - 560} x1={CHEST.x} y1={CHEST.y} />
        <g opacity={on(f, adventure, 6) * (1 - on(f, s10 - 4, 6))}><Tag x={CX} y={560} text="A SMALL ADVENTURE" s={pop(f, adventure)} size={56} fill={GOLD} /></g>
        <SparkFlow f={f} at={rewards} x0={CX - 300} y0={GROUND - 200} x1={CHEST.x} y1={CHEST.y} n={5} />
        <SparkFlow f={f} at={starting} x0={CX} y0={GROUND - 60} x1={CHEST.x} y1={CHEST.y - 200} n={8} />
        {/* # the dopamine glow gathering above him */}
        <g opacity={on(f, novelty, 10) * (1 - on(f, s9b + 40, 10))}>
          {[0, 1, 2, 3, 4].map((k) => <Spark key={k} f={f} seed={k + 7} x={CX - 120 + k * 60} y={GROUND - 700 + Math.sin(f / 9 + k) * 16} s={0.6 + 0.3 * on(f, lights + k * 2, 8) + 0.3 * on(f, dopa + k * 3, 8)} />)}
          <g opacity={on(f, lights, 6) * (1 - on(f, dopa, 6))}><circle cx={CX} cy={GROUND - 700} r={lerp(60, 200, easeOut(span(f, lights, lights + 16)))} fill={GOLD} opacity={0.18} /></g>
          <g opacity={on(f, dopa, 6)}><Tag x={CX} y={GROUND - 800} text="DOPAMINE" s={pop(f, dopa)} size={54} fill={CREAM} ink={BURG} /></g>
          <g opacity={on(f, wanting, 6) * (1 - on(f, plan - 4, 6))}><Tag x={CX + 250} y={GROUND - 650} text="WANT IT" s={pop(f, wanting)} r={6} size={40} /></g>
          <g opacity={on(f, chasing, 6) * (1 - on(f, plan - 4, 6))}><Tag x={CX - 250} y={GROUND - 620} text="CHASE IT" s={pop(f, chasing)} r={-6} size={40} /></g>
        </g>
        <Person f={f} who="hero" beats={heroA} x={CX} />
      </g>}
      {/* # B) new pays, repeated does not */}
      {B > 0.001 && <g opacity={B}>
        <g transform={`translate(300 820) scale(${pop(f, new10)})`}>
          <rect x={-190} y={-240} width={380} height={480} rx={28} fill={CREAM} stroke={INK} strokeWidth={8} />
          <text y={-130} textAnchor="middle" fill={BURG} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 4 }}>NEW</text>
          {[0, 1, 2].map((k) => <Spark key={k} f={f} seed={k} x={-90 + k * 90} y={40 + (k % 2) * 40} s={1.1} />)}
        </g>
        <g transform={`translate(780 820) scale(${pop(f, repeated)})`} opacity={on(f, repeated, 6)}>
          <rect x={-190} y={-240} width={380} height={480} rx={28} fill="#D9D4CC" stroke={INK} strokeWidth={8} />
          <text y={-130} textAnchor="middle" fill="#6E6A66" style={{ font: '400 84px "Bebas Neue"', letterSpacing: 4 }}>REPEATED</text>
          {[0, 1, 2].map((k) => <Spark key={k} f={f} seed={k} x={-90 + k * 90} y={60 + (k % 2) * 40} s={0.8} grey={1} o={0.7} />)}
        </g>
      </g>}
      {/* # C) not new anymore: grey sparks drop; the scale tips toward effort */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, gym, 8) * (1 - on(f, s12, 8))}>
          <Shoes x={300} y={GROUND - 20} s={0.9} />
          <g opacity={on(f, alarm11, 6)}><Alarm x={780} y={GROUND - 120} f={f} ring={0} time="5:00" s={pop(f, alarm11)} /></g>
          <g opacity={on(f, any2, 6)}><Tag x={780} y={GROUND - 300} text="SAME AGAIN" s={pop(f, any2)} r={4} size={44} fill="#D9D4CC" /></g>
          <Tag x={CX} y={560} text="NOT NEW ANYMORE" s={pop(f, gym)} size={58} fill="#D9D4CC" />
          {[0, 1, 2, 3].map((k) => { const t = span(f, alarm11 + k * 6, alarm11 + k * 6 + 30); return t > 0 && t < 1
            ? <Spark key={k} f={f} seed={k} grey={1} x={k < 2 ? 300 + k * 40 : 760 + k * 20} y={lerp(GROUND - 260, GROUND + 60, t)} o={1 - t} s={0.6} /> : null })}
        </g>
        <g opacity={on(f, s12, 8)} transform={`translate(${CX} 900)`}>
          <rect x={-10} y={-40} width={20} height={300} fill={INK} /><rect x={-120} y={250} width={240} height={30} rx={10} fill={INK} />
          <g transform={`rotate(${-tilt})`}>
            <rect x={-380} y={-50} width={760} height={18} rx={9} fill={INK} />
            <g transform="translate(-320 -32)"><path d="M-90 120 L90 120 L60 170 L-60 170 Z" fill={BURG} /><rect x={-70} y={60} width={140} height={60} rx={10} fill="#5C1426" />
              <text y={110} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"' }}>EFFORT</text><path d="M-90 120 L0 0 L90 120" stroke={INK} strokeWidth={4} fill="none" /></g>
            <g transform="translate(320 -32)"><path d="M-90 120 L90 120 L60 170 L-60 170 Z" fill={GOLD} /><path d="M-90 120 L0 0 L90 120" stroke={INK} strokeWidth={4} fill="none" />
              {[0, 1, 2].map((k) => <Spark key={k} f={f} seed={k + 3} x={-50 + k * 50} y={lerp(80, -120, easeOut(span(f, dries + k * 5, dries + k * 5 + 24)))} o={1 - span(f, dries + k * 5, dries + k * 5 + 24)} s={0.7} />)}
              <text y={230} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"' }}>REWARD</text></g>
          </g>
        </g>
      </g>}
      {/* # D) the gap: where most people quit, and the real reason */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="hero-struggling" beats={heroD} x={360} />
        <g opacity={on(f, eff13, 6) * (1 - on(f, s13b, 8))}><Tag x={760} y={GROUND - 290} text="ALL EFFORT" s={pop(f, eff13)} size={46} fill="#D9D4CC" /></g>
        <g opacity={on(f, spk13, 6) * (1 - on(f, s13b, 8))}><Spark f={f} x={930} y={GROUND - 430} grey={1} s={lerp(1.2, 0.5, span(f, spk13, spk13 + 20))} o={1 - 0.6 * span(f, spk13, spk13 + 20)} /><Tag x={760} y={GROUND - 190} text="NO SPARK" s={pop(f, spk13)} size={46} /></g>
        <g opacity={on(f, gap, 8) * (1 - on(f, s13b, 8))}>
          <path d={`M640 ${GROUND - 420} L980 ${GROUND - 420}`} stroke={f >= moment ? '#D2463C' : BURG} strokeWidth={10 + 6 * on(f, moment, 4) * (1 - on(f, moment + 10, 8))} strokeDasharray="22 16" />
          <Tag x={810} y={GROUND - 560} text="THE GAP" s={pop(f, gap)} size={56} />
        </g>
        <g opacity={on(f, lazy, 6)}>
          <Tag x={760} y={860} text="LAZY" s={pop(f, lazy)} size={80} fill="#D9D4CC" />
          <path d={`M640 ${860 - 10} L${lerp(640, 890, easeOut(span(f, lazy2, lazy2 + 10)))} ${860 + 10}`} stroke="#D2463C" strokeWidth={14} strokeLinecap="round" />
        </g>
        {/* # the real reason: an empty reward meter */}
        <g opacity={on(f, lazy3, 8)} transform={`translate(760 ${GROUND - 160})`}>
          <rect x={-150} y={-60} width={300} height={120} rx={20} fill={CREAM} stroke={INK} strokeWidth={7} />
          <rect x={-130} y={-40} width={lerp(260, 8, easeOut(span(f, lazy3, ran + 16)))} height={80} rx={12} fill={GOLD} />
          <text y={130} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>REWARD RAN OUT</text>
        </g>
      </g>}
      <Headline text={f < s10 ? 'YOUR BRAIN PAYS FOR NEW' : f < s13 ? '' : f < s13b ? 'MOST PEOPLE QUIT HERE' : 'NOT LAZY'} o={f < s10 ? on(f, s7, 10) * (1 - on(f, s10 - 6, 6)) : f < s13 ? 0 : f < s13b ? on(f, quit, 8) * (1 - on(f, s13b - 4, 4)) : on(f, lazy2, 8)} color={INK} />
      <Vig id="d3s" />
    </g>
  )
}

export const D3_SPARK = makePiece('d3-spark', 'Day 3: the spark that fades', {
  beats: ['s7:new', 's7:pays', 's8:novelty', 's8:lights', 's8:dopamine', 's8:wanting', 's8:chasing', 's9:plan', 's9:shoes', 's9:notebook', 's9:electric', 's9b:workout', 's9b:adventure', 's9b:rewards', 's9b:starting', 's10:new', 's10:repeated', 's11:gym', 's11:alarm', 's11:anymore#2', 's12:dries', 's12:effort', 's13:gap', 's13:effort', 's13:spark', 's13:moment', 's13:quit', 's13b:lazy', 's13b:lazy#2', 's13b:lazy#3', 's13b:ran'],
  sfx: [['s9:plan', 'softpop'], ['s9:shoes', 'softpop'], ['s9:notebook', 'softpop'], ['s9:electric', 'chime'], ['s10:repeated', 'thud'], ['s12:dries', 'flutter'], ['s13:quit', 'impact'], ['s13b:lazy#2', 'swish']],
  Component: SparkPiece, mood: 'light', canvas: 'tall',
})
