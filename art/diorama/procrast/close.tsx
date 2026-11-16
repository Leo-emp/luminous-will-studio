// ---------------------------------------------------------------- s24–s28: forgive the slip, walk through the feeling.
// A) he trips on the stairs (a slip), puts a hand on his chest: FORGIVE YOURSELF. B) the study: two exam bars per
//    group; the students who forgave themselves put off the next exam less (the bar shrinks). C) a door with a
//    LAZINESS sign: it is struck out and re-labelled A FEELING; the door fills with fog, he walks straight
//    through it into the warm study; three tags stack up: 10 MINUTES · 1 BAD SENTENCE · START THERE.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Desk, DESK_TOP, Fog, Headline, Laptop, Person, Sheet, Study, SVig, Tag, Timer, win, CORAL, CORAL_D, CREAM, GOLD, GOLD_L, INK, BURG, TEAL, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Close: React.FC<PieceProps> = ({ f, c }) => {
  const s24 = c('s24'), slip = c('s24:slip'), forgive = c('s24:forgive')
  const s25 = c('s25'), study = c('s25:study'), forgave = c('s25:forgave'), first = c('s25:first'), exam = c('s25:exam'), less = c('s25:less'), next = c('s25:next')
  const s26 = c('s26'), catch26 = c('s26:catch'), avoiding = c('s26:avoiding'), laziness = c('s26:laziness')
  const s27 = c('s27'), feeling = c('s27:feeling'), allowed = c('s27:allowed'), walk = c('s27:walk'), through = c('s27:through')
  const s28 = c('s28'), ten = c('s28:ten'), bad = c('s28:bad'), start = c('s28:start')

  const A = win(f, 0, s25 + 4), B = win(f, s25, s26 + 4), C = on(f, s26, 10)
  const heroA: Beat[] = [[0, 'walkA', 'smiling'], [slip, 'oops', 'shocked'], [slip + 14, 'despair', 'worried'], [forgive, 'holdChest', 'smiling']]
  // # C: he stands at the door, then walks through the fog to the desk
  const go = span(f, walk, through + 24)
  const heroC: Beat[] = [[s26, 'idle', 'thinking'], [catch26, 'think', 'thinking'], [laziness, 'crossNoA', 'neutral'], [feeling, 'holdChest', 'neutral'], [allowed, 'confident', 'smiling'],
    [walk, 'walkA', 'smiling'], [walk + 8, 'walkB', 'smiling'], [walk + 16, 'walkA', 'smiling'], [walk + 24, 'walkB', 'smiling'], [walk + 32, 'walkA', 'smiling'], [ten, 'type', 'smiling'], [start, 'fistPump', 'smiling']]
  const bar = (x: number, h: number, label: string, tone: string, at: number) => (
    <g opacity={on(f, at, 6)}>
      <rect x={x - 60} y={1100 - h} width={120} height={h} rx={10} fill={tone} stroke={INK} strokeWidth={5} />
      <text x={x} y={1150} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
    </g>
  )

  return (
    <g>
      <Study id="pcz" dim={0.3 * on(f, s26, 10) * (1 - on(f, through, 16))} />
      {/* # A) a slip, forgiven */}
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 30} width={1080} height={30} fill={CORAL_D} />
        <g opacity={on(f, slip, 4)}><path d="M560 1210 q20 -20 50 -6 q30 14 60 -2" stroke={GOLD} strokeWidth={8} fill="none" /><text x={640} y={1150} textAnchor="middle" fill={CORAL_D} style={{ font: '400 50px "Bebas Neue"' }}>SLIP!</text></g>
        <g opacity={on(f, forgive, 6)}><Tag x={CX} y={600} text="FORGIVE YOURSELF" s={pop(f, forgive)} size={62} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroA} x={lerp(300, 520, easeOut(span(f, 0, slip)))} s={0.9} />
      </g>}
      {/* # B) the self-forgiveness study: two exams, two groups */}
      {B > 0.001 && <g opacity={B}>
        <Sheet x={CX} y={540} s={0.6 * pop(f, study)} head="ONE STUDY" tone={TEAL} />
        <rect x={140} y={1098} width={800} height={6} fill={INK} />
        {bar(330, 300, 'EXAM 1', CORAL, exam)}
        {bar(750, lerp(300, 150, easeOut(span(f, less, less + 14))), 'NEXT EXAM', GOLD, next - 6)}
        <g opacity={on(f, forgave, 6)}><Tag x={CX} y={720} text="FORGAVE THEMSELVES" s={pop(f, forgave)} size={46} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, less, 6)}><text x={750} y={910} textAnchor="middle" fill="#2E8B57" style={{ font: '400 54px "Bebas Neue"' }}>↓ LESS PUTTING OFF</text></g>
        <g opacity={on(f, first, 6)}><text x={330} y={760} textAnchor="middle" fill={CORAL_D} style={{ font: '400 50px "Bebas Neue"' }}>PUT OFF</text></g>
      </g>}
      {/* # C) not laziness: a feeling you can walk through */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={1 - on(f, through + 8, 14)}>
          <rect x={360} y={GROUND - 640} width={360} height={640} fill={GOLD_L} stroke={BURG} strokeWidth={14} />
          <Fog f={f} x={540} y={GROUND - 330} s={lerp(0.6, 1.25, easeOut(span(f, feeling, allowed)))} o={on(f, feeling, 8) * (1 - on(f, through, 12))} />
          <g transform={`translate(540 ${GROUND - 700})`}>
            <rect x={-200} y={-52} width={400} height={104} rx={12} fill={CREAM} stroke={INK} strokeWidth={6} />
            <text y={26} textAnchor="middle" fill={f >= feeling ? TEAL : BURG} style={{ font: '400 74px "Bebas Neue"', letterSpacing: 4 }}>{f >= feeling ? 'A FEELING' : 'LAZINESS'}</text>
            <path d={`M-190 0 L${lerp(-190, 190, easeOut(span(f, laziness + 4, laziness + 14)))} 0`} stroke="#D2463C" strokeWidth={14} strokeLinecap="round" opacity={1 - on(f, feeling, 4)} />
          </g>
        </g>
        <g opacity={on(f, avoiding, 6) * (1 - on(f, laziness, 6))}><Tag x={CX} y={430} text="AVOIDING IT AGAIN?" s={pop(f, avoiding)} size={52} /></g>
        {/* # the warm desk he walks into */}
        <g opacity={on(f, through + 4, 14)}>
          <Desk x={700} /><Laptop x={700} y={DESK_TOP} glow={1.3} title="DRAFT 1" lines={easeOut(span(f, bad, bad + 14))} />
          <g opacity={on(f, ten, 6)}><Timer x={260} y={640} s={0.6 * pop(f, ten)} left={1 - span(f, ten, start + 30)} f={f} /></g>
          {([['10 MINUTES', ten, 620], ['1 BAD SENTENCE', bad, 520], ['START THERE', start, 420]] as const).map(([t, at, y], k) => (
            <g key={t} opacity={on(f, at, 6)}><Tag x={k === 2 ? CX : 700} y={y} text={t} s={pop(f, at)} size={k === 2 ? 76 : 50} fill={k === 2 ? GOLD : CREAM} ink={k === 2 ? INK : BURG} /></g>
          ))}
        </g>
        <Person f={f} who="hero" beats={heroC} x={lerp(220, 480, easeOut(go))} s={0.9} />
      </g>}
      <Headline text={f < s25 ? 'SLIPPED?' : f < s26 ? 'FORGIVE, THEN GO' : f < s28 ? 'NOT LAZINESS' : ''} o={f < s25 ? on(f, slip, 8) * (1 - on(f, s25 - 4, 4)) : f < s26 ? on(f, forgave, 8) * (1 - on(f, s26 - 4, 4)) : f < s28 ? on(f, laziness, 8) * (1 - on(f, s28 - 4, 4)) : 0} color={INK} />
      <SVig id="pcz" />
    </g>
  )
}

export const PC_CLOSE = makePiece('pc-close', 'Procrastination: forgive the slip, walk through the feeling, start', {
  beats: ['s24', 's24:slip', 's24:forgive', 's25', 's25:study', 's25:forgave', 's25:first', 's25:exam', 's25:less', 's25:next', 's26', 's26:catch', 's26:avoiding', 's26:care', 's26:call', 's26:laziness', 's27', 's27:feeling', 's27:allowed', 's27:walk', 's27:through', 's28', 's28:ten', 's28:bad', 's28:start'],
  sfx: [['s24:slip', 'softpop'], ['s25:less', 'ding'], ['s26:laziness', 'swish'], ['s27:through', 'whoosh'], ['s28:start', 'chime']],
  Component: Close, mood: 'light', canvas: 'tall',
})
