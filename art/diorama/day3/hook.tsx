// ---------------------------------------------------------------- s1–s6: the hook, in a bedroom.
// A) dawn room: the hero greets you; a tear-off calendar flips DAY 1 → 2 → 3 while he goes from fist-pump to
//    thumbs-up to slump; on "off" the wall switch clicks down and the room drains to dusk blue.
// B) the bed: he is a bump under the duvet, the alarm rings and shakes. C) a "MONDAY" tag swings in.
// D) he stands up, the switch grows and glows: "not a weakness" — "it's your brain".
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Alarm, Spark, Backdrop, Bed, CalPage, DAWN, DUSK, GROUND, Headline, Person, Room, Switch, Tag, Vig, win, BURG, CREAM, INK, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1')
  const one = c('s2:one'), two = c('s2:two'), three = c('s2:three'), off = c('s2:off'), you1 = c('s1:you'), unst = c('s2:unstoppable'), good = c('s2:good'), arrives = c('s2:arrives'), quietly = c('s2:quietly')
  const s3 = c('s3'), alarm = c('s3:alarm'), bed = c('s3:bed'), smartest = c('s3:smartest')
  const s4 = c('s4'), tell = c('s4:tell'), monday = c('s4:monday'), earth = c('s3:earth'), nobody = c('s5:nobody')
  const s5 = c('s5'), sw = c('s5:switch'), weak = c('s5:weakness')
  const s6 = c('s6'), brain = c('s6:brain'), built = c('s6:built')

  // # dusk takes over on "off" and lifts again on s5 (the explanation is lighter than the struggle)
  const dusk = Math.max(0, on(f, off - 4, 16) - on(f, s5, 20) * 0.75)
  const A = win(f, 0, s3 + 6), B = win(f, s3, s5 + 4), D = on(f, s5, 10)
  const day = f >= three ? '3' : f >= two ? '2' : '1'
  const flip = Math.max(on(f, two, 6), on(f, three, 6)) // # each new page drops in
  const heroA: Beat[] = [[0, 'present', 'smiling'], [you1, 'waveA', 'smiling'], [one, 'fistPump', 'smiling'], [unst, 'celebrate', 'smiling'], [two, 'idle', 'smiling'], [good, 'thumbsUp', 'smiling'], [three, 'idle', 'neutral'], [arrives, 'shrug', 'worried'], [quietly, 'nervous', 'worried'], [off, 'slump', 'worried']]
  const heroD: Beat[] = [[s5, 'idle', 'worried'], [nobody, 'shrug', 'thinking'], [sw, 'think', 'thinking'], [weak, 'present', 'smiling'], [brain, 'pointUp', 'neutral']]
  const ring = f >= alarm && f < monday ? Math.min(1, span(f, alarm, alarm + 6)) : 0
  const swUp = f < off ? 1 : f < sw ? lerp(1, 0, easeOut(span(f, off, off + 5))) : 0

  return (
    <g>
      <Backdrop id="d3h" m={DAWN} />
      <Room m={DAWN} light={1 - dusk} />
      <g opacity={dusk}><Room m={DUSK} light={0.2} /></g>
      {/* # A) the calendar and the switch on the wall */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, one - 6, 8)}><CalPage x={270} y={640 - (1 - flip) * 0} label={day} s={0.9 * (f >= two ? 1 : pop(f, one))} r={-4} /></g>
        <g transform={`rotate(${on(f, quietly, 4) * (1 - on(f, off, 4)) * Math.sin(f) * 3} 880 760)`}><Switch x={880} y={760} up={swUp} s={0.7} glow={swUp} /></g>
        <Person f={f} who="hero" beats={heroA} x={560} />
      </g>}
      {/* # B) the bed, the bump, the alarm; C) the Monday tag */}
      {B > 0.001 && <g opacity={B}>
        <Bed x={540} sleeper={on(f, s3, 10)} />
        <rect x={830} y={GROUND - 150} width={170} height={150} rx={10} fill="#5A3A2E" />
        <Alarm x={915} y={GROUND - 230} f={f} ring={ring} s={0.85} />
        <g opacity={on(f, bed, 8) * (1 - on(f, s4, 8))}><ellipse cx={540} cy={GROUND - 120} rx={340} ry={90} fill="#FFE7A3" opacity={0.18 + 0.14 * on(f, smartest, 8)} /></g>
        <g opacity={on(f, smartest, 8) * (1 - on(f, s4, 8))}><Tag x={300} y={700} text="SO COMFY" s={pop(f, smartest)} r={-5} size={56} /></g>
        <g opacity={on(f, earth, 6) * (1 - on(f, s4, 8))}><Spark f={f} x={620} y={GROUND - 300} s={pop(f, earth)} /></g>
        <g opacity={on(f, tell, 6) * (1 - on(f, s5, 6))}>{[0, 1, 2].map((k) => <text key={k} x={700 + k * 40} y={GROUND - 260 - k * 50 - span(f, tell, tell + 40) * 40} fill={CREAM} opacity={on(f, tell + k * 6, 6)} style={{ font: `400 ${60 - k * 10}px "Bebas Neue"` }}>Z</text>)}</g>
        <g opacity={on(f, monday, 6)}><Tag x={300} y={620} text="START MONDAY" s={pop(f, monday)} r={-6} fill={CREAM} ink={BURG} /></g>
      </g>}
      {/* # D) up again: the switch is not a weakness, it is the brain doing its job */}
      {D > 0.001 && <g opacity={D}>
        <Switch x={790} y={720} up={on(f, weak, 10)} s={lerp(0.7, 1.05, easeOut(span(f, sw, sw + 14)))} glow={on(f, sw, 10)} />
        <g opacity={on(f, weak, 6) * (1 - on(f, built - 2, 6))}><Tag x={790} y={1010} text="NOT A WEAKNESS" s={pop(f, weak)} r={3} size={52} /></g>
        <g opacity={on(f, built, 6)}><Tag x={790} y={1010} text="BUILT THIS WAY" s={pop(f, built)} r={-3} size={52} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero" beats={heroD} x={330} />
      </g>}
      <Headline text={f < s3 ? 'DAY 1, 2, 3…' : f < s5 ? '' : "IT'S YOUR BRAIN"} o={f < s3 ? on(f, one, 10) * (1 - on(f, s3 - 6, 6)) : on(f, brain, 10)} color={INK} />
      <Vig id="d3h" />
    </g>
  )
}

export const D3_HOOK = makePiece('d3-hook', 'Day 3: the hook (bedroom)', {
  beats: ['s1', 's1:you', 's2:one', 's2:unstoppable', 's2:two', 's2:good', 's2:arrives', 's2:quietly', 's2:three', 's2:off', 's3', 's3:bed', 's3:alarm', 's3:smartest', 's3:earth', 's4:tell', 's4:monday', 's5:nobody', 's5:switch', 's5:weakness', 's6:brain', 's6:built'],
  sfx: [['s2:off', 'click'], ['s3:alarm', 'ding'], ['s4:monday', 'pop'], ['s5:switch', 'whoosh']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
