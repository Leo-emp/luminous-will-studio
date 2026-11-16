// ---------------------------------------------------------------- s1–s6: the hook, in the study.
// A) the task glows on the desk; sticky notes pile up on the laptop, one per day it waited. "Boring?" is struck
//    out; the laptop's glow turns gold on "matters". B) he opens it, stares, a little lilac fog rises behind it,
//    and he is suddenly cleaning: spray bottle, twinkles all over the room. C) the guilt fog settles over him and a
//    red LAZY stamp lands. D) a lazy man on a sofa feels nothing ("NO GUILT"); our man does, and LAZY flips to YOU CARE.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Desk, DESK_TOP, Fog, Headline, Laptop, Person, Spray, Study, SVig, Tag, Twinkle, win, CORAL, CREAM, GOLD, INK, BURG, GROUND, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const task = c('s1:task'), sitting = c('s1:sitting'), days = c('s1:days')
  const s2 = c('s2'), boring = c('s2:boring'), matters = c('s2:matters')
  const s3 = c('s3'), open = c('s3:open'), stare = c('s3:stare'), somehow = c('s3:somehow'), cleaning = c('s3:cleaning'), room = c('s3:room'), instead = c('s3:instead')
  const s4 = c('s4'), guilt = c('s4:guilt'), shows = c('s4:shows'), lazy = c('s4:lazy')
  const s5 = c('s5'), thing = c('s5:thing'), people = c('s5:people'), guilty = c('s5:guilty')
  const s6 = c('s6'), care = c('s6:care')

  const A = win(f, 0, s5 + 4), D = on(f, s5, 10)
  // # he wanders off to clean between "cleaning" and the guilt, then comes back to the desk
  const cleanT = span(f, cleaning - 4, cleaning + 12) * (1 - span(f, s4, s4 + 12))
  const hx = lerp(330, 170, easeOut(cleanT))
  const hero: Beat[] = [[0, 'idle', 'neutral'], [task, 'point', 'neutral'], [days, 'scratchHead', 'worried'], [s2, 'idle', 'neutral'], [boring, 'crossNoA', 'neutral'], [matters, 'holdChest', 'smiling'],
    [open, 'type', 'neutral'], [stare, 'think', 'worried'], [somehow, 'shrug', 'neutral'], [cleaning, 'hold', 'smiling'], [room, 'nodA', 'smiling'], [instead, 'nodB', 'smiling'],
    [s4, 'idle', 'worried'], [guilt, 'nervous', 'worried'], [lazy, 'facepalm', 'worried']]
  const heroD: Beat[] = [[s5, 'slump', 'worried'], [guilty, 'despair', 'worried'], [s6, 'idle', 'thinking'], [care, 'holdChest', 'smiling']]
  const notes = ['MON', 'TUE', 'WED', 'THU']

  return (
    <g>
      <Study id="pch" dim={0.25 * on(f, guilt, 12) * (1 - on(f, care, 12))} />
      {/* # A–C) the desk and the task */}
      {A > 0.001 && <g opacity={A}>
        <Desk x={720} />
        <Laptop x={720} y={DESK_TOP} glow={lerp(0.6, 1, on(f, open, 8)) * (1 + 0.3 * on(f, matters, 8))} title={f >= matters ? 'IT MATTERS' : 'THE TASK'} />
        {/* # one sticky note per day it has waited */}
        {notes.map((n, k) => <g key={n} opacity={on(f, sitting + k * 5, 5)} transform={`translate(${590 + k * 86} ${DESK_TOP - 270 - (k % 2) * 14}) rotate(${-6 + k * 4}) scale(${pop(f, sitting + k * 5)})`}>
          <rect x={-38} y={-38} width={76} height={76} rx={6} fill={GOLD} stroke={INK} strokeWidth={4} />
          <text y={12} textAnchor="middle" fill={INK} style={{ font: '400 32px "Bebas Neue"' }}>{n}</text>
        </g>)}
        <g opacity={on(f, boring, 6) * (1 - on(f, s3, 6))} transform="translate(300 640)">
          <Tag x={0} y={0} text="BORING?" s={pop(f, boring)} size={52} />
          <path d={`M-130 -4 L${lerp(-130, 130, easeOut(span(f, boring + 6, matters)))} 6`} stroke="#D2463C" strokeWidth={12} strokeLinecap="round" />
        </g>
        {/* # the little fog of "I don't want to" rises behind the laptop as he stares */}
        <Fog f={f} x={760} y={DESK_TOP - 330} s={lerp(0.3, 0.75, easeOut(span(f, stare, somehow + 10)))} o={on(f, stare, 8) * (1 - on(f, cleaning, 8)) + on(f, instead, 10) * 0.6 * (1 - on(f, s5, 8))} />
        {/* # cleaning instead: spray bottle in hand, twinkles all over the room */}
        <g opacity={on(f, cleaning, 6) * (1 - on(f, s4, 8))}>
          <Spray x={hx + 110} y={GROUND - 520} s={0.8} r={-10} puff={(Math.sin(f / 3) + 1) / 2} />
          {[[120, 470], [330, 470], [960, 560], [520, 1180], [200, 1100], [900, 1150]].map(([x, y], k) => <Twinkle key={k} f={f} x={x} y={y} s={pop(f, room + k * 3) * 0.9} o={on(f, room + k * 3, 4)} />)}
          <g opacity={on(f, instead, 6)}><Tag x={720} y={540} text="STILL WAITING" s={pop(f, instead)} size={44} r={4} fill={CREAM} ink={BURG} /></g>
        </g>
        {/* # the guilt settles over him, then the stamp */}
        <Fog f={f} seed={4} x={300} y={540} s={0.55 * pop(f, guilt)} o={on(f, guilt, 8) * (1 - on(f, s5, 8))} />
        <g opacity={on(f, lazy, 4) * (1 - on(f, s5, 8))} transform={`translate(300 820) rotate(-12) scale(${lerp(1.6, 1, easeOut(span(f, lazy, lazy + 6)))})`}>
          <rect x={-150} y={-60} width={300} height={120} rx={12} fill="none" stroke="#D2463C" strokeWidth={10} />
          <text y={34} textAnchor="middle" fill="#D2463C" style={{ font: '400 100px "Bebas Neue"', letterSpacing: 8 }}>LAZY</text>
        </g>
        <Person f={f} who="hero-struggling" beats={hero} x={hx} />
      </g>}
      {/* # D) the truly lazy feel nothing; you feel it because you care */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, people, 8) * (1 - on(f, s6, 8))}>
          <Mini look="hero-rich" x={820} y={GROUND - 110} scale={2.2} frame={f} seed={6} mood="happy" />
          <rect x={620} y={GROUND - 200} width={400} height={150} rx={30} fill={CORAL} stroke={INK} strokeWidth={6} />
          <rect x={600} y={GROUND - 290} width={60} height={240} rx={24} fill={CORAL} stroke={INK} strokeWidth={6} /><rect x={980} y={GROUND - 290} width={60} height={240} rx={24} fill={CORAL} stroke={INK} strokeWidth={6} />
          <Tag x={820} y={560} text="NO GUILT" s={pop(f, people)} size={56} />
        </g>
        <Fog f={f} seed={2} x={300} y={560} s={0.5 + 0.1 * on(f, guilty, 8)} o={on(f, s5, 8) * (1 - on(f, care, 10))} />
        <g opacity={on(f, care, 6)}>
          <g transform={`translate(760 760) scale(${pop(f, care) * 1.2})`}><path d="M0 60 C-90 0 -80 -80 -26 -80 C-8 -80 0 -66 0 -56 C0 -66 8 -80 26 -80 C80 -80 90 0 0 60 Z" fill={CORAL} stroke={INK} strokeWidth={6} /></g>
          <Tag x={760} y={1000} text="YOU CARE" s={pop(f, care)} size={70} fill={GOLD} />
        </g>
        <Person f={f} who="hero-struggling" beats={heroD} x={300} />
      </g>}
      <Headline text={f < s3 ? 'THAT ONE TASK' : f < s5 ? '' : f < s6 ? 'LAZY? NO.' : ''} o={f < s3 ? on(f, task, 10) * (1 - on(f, s3 - 4, 4)) : f >= thing && f < s6 ? on(f, thing, 8) * (1 - on(f, s6 - 4, 4)) : 0} color={INK} />
      <SVig id="pch" />
    </g>
  )
}

export const PC_HOOK = makePiece('pc-hook', 'Procrastination: the task that waits (study)', {
  beats: ['s1:task', 's1:sitting', 's1:days', 's2', 's2:boring', 's2:matters', 's3', 's3:open', 's3:stare', 's3:somehow', 's3:cleaning', 's3:room', 's3:instead', 's4', 's4:guilt', 's4:shows', 's4:lazy', 's5', 's5:thing', 's5:people', 's5:guilty', 's6', 's6:care'],
  sfx: [['s1:sitting', 'pop'], ['s2:matters', 'ding'], ['s3:cleaning', 'swish'], ['s4:lazy', 'thud'], ['s6:care', 'chime']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
