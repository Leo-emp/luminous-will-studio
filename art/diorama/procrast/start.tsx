// ---------------------------------------------------------------- s18–s23: make starting smaller than the feeling.
// A) a PRESSURE weight drops on the fog and it only swells. B) a huge fog next to a tiny first step: SMALLER
//    THAN THE FEELING. C) he takes the tiny step: the laptop opens, one wobbly bad sentence is scribbled in —
//    BAD ON PURPOSE. D) a 10-minute timer; STOP ANYTIME; it rings… and he keeps typing. Then the real lesson:
//    a staircase up to the desk — the hard part was the walk up to it.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Desk, DESK_TOP, Fog, Headline, Laptop, Person, Stairs, Study, SVig, Tag, Timer, win, CORAL, CREAM, GOLD, INK, BURG, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Start: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18'), answer = c('s18:answer'), pressure = c('s18:pressure'), bigger = c('s18:bigger')
  const s19 = c('s19'), starting = c('s19:starting'), smaller = c('s19:smaller'), feeling19 = c('s19:feeling')
  const s20 = c('s20'), tiny = c('s20:tiny'), step = c('s20:step'), open = c('s20:open'), docu = c('s20:document'), write = c('s20:write'), bad = c('s20:bad'), sentence = c('s20:sentence')
  const s21 = c('s21'), purpose = c('s21:purpose'), draft = c('s21:draft'), down = c('s21:down')
  const s22 = c('s22'), timer = c('s22:timer'), ten = c('s22:ten'), permission = c('s22:permission'), stop = c('s22:stop'), rings = c('s22:rings')
  const s23 = c('s23'), wont = c('s23:most'), hard = c('s23:hard'), never = c('s23:never'), work = c('s23:work'), walking = c('s23:walking')

  const A = win(f, 0, s19 + 4), B = win(f, s19, s20 + 4), CD = win(f, s20, hard + 4), E = on(f, hard, 10)
  // # the timer runs 10 minutes in ~4 s of screen time, then rings, then keeps going (he did not stop)
  const left = f < ten ? 1 : 1 - span(f, ten, rings)
  const ring = f >= rings && f < s23 + 12 ? 1 : 0
  const heroA: Beat[] = [[0, 'idle', 'thinking'], [answer, 'think', 'thinking'], [pressure, 'crossNoA', 'neutral'], [bigger, 'shrug', 'worried']]
  const heroB: Beat[] = [[s19, 'explain', 'neutral'], [smaller, 'measure', 'smiling'], [feeling19, 'present', 'smiling']]
  const heroC: Beat[] = [[s20, 'idle', 'neutral'], [step, 'walkA', 'smiling'], [step + 8, 'idle', 'smiling'], [open, 'type', 'neutral'], [write, 'type', 'smiling'], [purpose, 'thumbsUp', 'smiling'], [down, 'type', 'smiling'],
    [timer, 'point', 'neutral'], [permission, 'shrug', 'smiling'], [rings, 'type', 'smiling'], [wont, 'type', 'smiling']]
  // # E: he walks up the stairs (four steps), then sits into the work
  const climb = span(f, walking - 10, walking + 30)
  const heroE: Beat[] = [[hard, 'idle', 'thinking'], [never, 'pointUp', 'neutral'], [walking - 10, 'walkA', 'smiling'], [walking - 2, 'walkB', 'smiling'], [walking + 6, 'walkA', 'smiling'], [walking + 14, 'walkB', 'smiling'], [walking + 30, 'celebrate', 'smiling']]

  return (
    <g>
      <Study id="pcs" />
      {/* # A) pressure makes it bigger */}
      {A > 0.001 && <g opacity={A}>
        <Fog f={f} x={680} y={900} s={lerp(0.7, 1.35, easeOut(span(f, bigger - 6, bigger + 14)))} />
        <g transform={`translate(680 ${lerp(300, 640, easeOut(span(f, pressure, pressure + 10)))})`} opacity={on(f, pressure, 4)}>
          <path d="M-150 -90 L150 -90 L190 90 L-190 90 Z" fill="#5E6170" stroke={INK} strokeWidth={7} />
          <rect x={-50} y={-130} width={100} height={46} rx={20} fill="none" stroke={INK} strokeWidth={14} />
          <text y={22} textAnchor="middle" fill={CREAM} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 4 }}>PRESSURE</text>
        </g>
        <Person f={f} who="hero" beats={heroA} x={230} s={0.9} />
      </g>}
      {/* # B) make starting smaller than the feeling */}
      {B > 0.001 && <g opacity={B}>
        <Fog f={f} x={760} y={760} s={1.2} />
        <g opacity={on(f, starting, 6)}><Stairs x={330} y={GROUND} n={1} w={140} h={lerp(70, 26, easeOut(span(f, smaller, smaller + 12)))} /></g>
        <g opacity={on(f, smaller, 6)}><Tag x={400} y={1060} text="TINY STEP" s={pop(f, smaller)} size={48} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroB} x={200} s={0.9} />
      </g>}
      {/* # C–D) the tiny step, the bad sentence, the timer */}
      {CD > 0.001 && <g opacity={CD}>
        <Desk x={680} />
        <Laptop x={680} y={DESK_TOP} glow={on(f, open, 8)} title={f >= docu ? 'DRAFT 1' : 'THE TASK'} lines={easeOut(span(f, write, sentence + 10))} />
        <g opacity={on(f, tiny, 6) * (1 - on(f, s21, 8))}><Tag x={680} y={560} text="JUST STEP ONE" s={pop(f, tiny)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, bad, 6) * (1 - on(f, purpose, 6))}><Tag x={680} y={560} text="1 BAD SENTENCE" s={pop(f, bad)} size={58} /></g>
        <g opacity={on(f, purpose, 6) * (1 - on(f, s22, 8))}><Tag x={680} y={560} text={f >= down ? 'NOTHING TO FAIL' : 'BAD ON PURPOSE'} s={pop(f, f >= down ? down : purpose)} size={58} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, draft, 6) * (1 - on(f, s22, 8))}><text x={880} y={780} fill={CORAL} style={{ font: '400 46px "Bebas Neue"' }} transform={`rotate(-12 880 780)`}>OOPS. OK!</text></g>
        <g opacity={on(f, timer, 6)}><Timer x={880} y={600} s={0.75 * pop(f, timer)} left={left} ring={ring} f={f} label={f >= rings ? 'KEEP GOING?' : '10 MIN'} /></g>
        <g opacity={on(f, permission, 6) * (1 - on(f, rings, 6))}><Tag x={400} y={560} text="STOP ANYTIME" s={pop(f, permission)} size={52} /></g>
        <g opacity={on(f, wont, 6)}><Tag x={400} y={560} text="STILL TYPING" s={pop(f, wont)} size={52} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroC} x={lerp(200, 420, easeOut(span(f, step, step + 14)))} y={GROUND - 26 * on(f, step, 6) * (1 - on(f, open, 6))} s={0.9} />
      </g>}
      {/* # E) the hard part was the walk up to it */}
      {E > 0.001 && <g opacity={E}>
        <Stairs x={80} y={GROUND} n={4} w={150} h={90} />
        {/* # the landing at the top of the stairs, and the desk waiting on it (desk scaled 0.7 around its feet) */}
        <rect x={680} y={GROUND - 360} width={400} height={360} fill={CORAL_EDGE} stroke={INK} strokeWidth={5} />
        <g transform={`translate(880 ${GROUND - 360}) scale(0.7) translate(0 ${-GROUND})`}><Desk x={0} /><Laptop x={0} y={DESK_TOP} glow={1} title="DRAFT 1" lines={1} /></g>
        <g opacity={on(f, work, 6)}><Tag x={330} y={560} text="NOT THE WORK" s={pop(f, work)} size={52} /></g>
        <g opacity={on(f, walking, 6)}><Tag x={330} y={680} text="THE WALK UP" s={pop(f, walking)} size={60} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroE} x={lerp(150, 700, easeOut(climb))} y={GROUND - lerp(0, 360, easeOut(climb))} s={0.8} />
      </g>}
      <Headline text={f < s19 ? 'MORE PRESSURE?' : f < s20 ? 'START SMALLER' : f < hard ? '' : 'THE WALK, NOT THE WORK'} o={f < s19 ? on(f, pressure, 8) * (1 - on(f, s19 - 4, 4)) : f < s20 ? on(f, starting, 8) * (1 - on(f, s20 - 4, 4)) : f >= hard ? on(f, never, 8) : 0} color={INK} />
      <SVig id="pcs" />
    </g>
  )
}
const CORAL_EDGE = '#C9654A'

export const PC_START = makePiece('pc-start', 'Procrastination: pressure, the tiny step, ten minutes, the walk up', {
  beats: ['s18', 's18:answer', 's18:pressure', 's18:bigger', 's19', 's19:starting', 's19:smaller', 's19:feeling', 's20', 's20:tiny', 's20:step', 's20:open', 's20:document', 's20:write', 's20:bad', 's20:sentence', 's21', 's21:purpose', 's21:draft', 's21:down', 's22', 's22:timer', 's22:ten', 's22:permission', 's22:stop', 's22:rings', 's23', 's23:most', 's23:days', 's23:stop', 's23:hard', 's23:never', 's23:work', 's23:walking'],
  sfx: [['s18:pressure', 'thud'], ['s19:smaller', 'softpop'], ['s20:step', 'pop'], ['s20:write', 'swish'], ['s22:timer', 'click'], ['s22:rings', 'ding'], ['s23:walking', 'riser']],
  Component: Start, mood: 'light', canvas: 'tall',
})
