// ---------------------------------------------------------------- s6–s11: open loops get loud at night.
// A) two boxes: a FINISHED ring closes and drops into its box, lid shut; an UNFINISHED ring stays open and taps
//    him on the shoulder (bounce, bounce). B) daytime: messages, work and chatter crowd around him and the loop
//    shrinks to nothing; then the room turns to night, the noise fades, and the loop swells and pulses — LOUD.
// C) he pushes loops away (push pose) and each one boomerangs back bigger. D) the white bear experiment: a sign
//    says DON'T THINK ABOUT A WHITE BEAR — and bears pop up everywhere.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Attic, Bear, Bubble, Headline, Loop, NVig, Person, Tag, win, CREAM, GOLD, INK, BURG, MINT_D, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Loops: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), psych = c('s6:psychologists'), unfinished6 = c('s6:unfinished'), sticks = c('s6:sticks'), mind = c('s6:mind')
  const s7 = c('s7'), finished = c('s7:finished'), away7 = c('s7:away'), unfinished = c('s7:unfinished'), tapping = c('s7:tapping'), shoulder = c('s7:shoulder')
  const s8 = c('s8'), day = c('s8:day'), noise = c('s8:noise'), drowns = c('s8:drowns'), messages = c('s8:messages'), work = c('s8:work'), people = c('s8:people')
  const s9 = c('s9'), night = c('s9:night'), stops = c('s9:stops'), open = c('s9:open'), loud = c('s9:loud')
  const s10 = c('s10'), harder = c('s10:harder'), push = c('s10:push'), back = c('s10:back')
  const s11 = c('s11'), famous = c('s11:famous'), told = c('s11:told'), bear = c('s11:bear'), thinking = c('s11:thinking'), more = c('s11:more')

  const A = win(f, 0, s8 + 4), B = win(f, s8, s10 + 4), C = win(f, s10, s11 + 4), D = on(f, s11, 10)
  const nightB = f < s9 ? 0 : on(f, night, 14)
  const heroA: Beat[] = [[s6, 'idle', 'neutral'], [psych, 'think', 'thinking'], [finished, 'present', 'smiling'], [unfinished, 'idle', 'neutral'], [tapping, 'shrug', 'worried'], [shoulder, 'nervous', 'worried']]
  const heroB: Beat[] = [[s8, 'talk', 'smiling'], [messages, 'phone', 'neutral'], [work, 'type', 'neutral'], [people, 'talk', 'smiling'], [night, 'idle', 'neutral'], [stops, 'idle', 'thinking'], [loud, 'shock', 'shocked']]
  const heroC: Beat[] = [[s10, 'idle', 'worried'], [push, 'push', 'angry'], [push + 14, 'idle', 'worried'], [back, 'shock', 'shocked']]
  const heroD: Beat[] = [[s11, 'idle', 'thinking'], [told, 'crossNoA', 'neutral'], [bear, 'facepalm', 'worried'], [more, 'shrug', 'worried']]
  // # A: the unfinished loop bounces against his shoulder
  const tap = f >= tapping ? Math.abs(Math.sin((f - tapping) / 4)) * 30 : 0
  // # C: three loops pushed off to the right, each returns bigger
  const pushT = span(f, push, push + 14), backT = span(f, back - 4, back + 12)

  return (
    <g>
      <Attic id="nml" f={f} night={f < s8 ? 1 : f < s9 ? 1 - on(f, s8, 12) : nightB} lamp={0.4} />
      {/* # A) finished vs unfinished */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, finished, 6)} transform="translate(760 1100)">
          <rect x={-130} y={-120} width={260} height={120} rx={8} fill="#A0673C" stroke={INK} strokeWidth={6} />
          <rect x={-140} y={-140 - 60 * (1 - on(f, away7, 8))} width={280} height={30} rx={6} fill="#8A5530" stroke={INK} strokeWidth={6} transform={`rotate(${-20 * (1 - on(f, away7, 8))} -140 -140)`} />
          <text x={0} y={-44} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>DONE</text>
        </g>
        <Loop f={f} x={760} y={lerp(640, 1000, easeOut(span(f, finished + 6, away7)))} s={0.8 * pop(f, finished)} o={on(f, finished, 6) * (1 - on(f, away7, 6))} close={on(f, finished, 10)} label="FINISHED" />
        <Loop f={f} seed={3} x={430 + tap * 0.4} y={GROUND - 600 + tap * 0.2} s={0.7 * pop(f, unfinished)} o={on(f, unfinished, 6)} label="UNFINISHED" loud={on(f, shoulder, 6) * 0.6} />
        <g opacity={on(f, unfinished6, 6) * (1 - on(f, s7, 6))}><Tag x={CX} y={560} text="UNFINISHED STICKS" s={pop(f, unfinished6)} size={58} fill={GOLD} /></g>
        <Person f={f} who="hero-struggling" beats={heroA} x={260} s={0.9} />
      </g>}
      {/* # B) the day's noise drowns the loop; at night it gets loud */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, stops, 10)}>
          <Bubble kind="msg" x={760} y={560} s={pop(f, messages)} o={on(f, messages, 4)} />
          <Bubble kind="work" x={880} y={820} s={pop(f, work)} o={on(f, work, 4)} />
          <Bubble kind="talk" x={620} y={980} s={pop(f, people)} o={on(f, people, 4)} />
          <g opacity={on(f, noise, 6)}><Tag x={CX} y={460} text="DAYTIME NOISE" s={pop(f, noise)} size={52} /></g>
        </g>
        <Loop f={f} seed={7} x={560} y={720} s={f < s9 ? lerp(0.6, 0.15, easeOut(span(f, drowns, people + 10))) : lerp(0.15, 1.4, easeOut(span(f, open, loud + 10)))} o={on(f, day, 6)} loud={on(f, loud, 6)} />
        <g opacity={on(f, loud, 6)}><Tag x={CX} y={460} text="LOUD" s={pop(f, loud) * 1.2} size={90} fill={GOLD} /></g>
        <Person f={f} who="hero-struggling" beats={heroB} x={230} s={0.9} />
      </g>}
      {/* # C) push them away, they come back bigger */}
      {C > 0.001 && <g opacity={C}>
        {[0, 1, 2].map((k) => {
          const out = easeOut(pushT), ret = easeOut(backT)
          const x = lerp(lerp(500, 1000, out), 520 + k * 150, ret), y = 560 + k * 170
          return <Loop key={k} f={f} seed={k + 11} x={x} y={y} s={lerp(0.5, 0.85, ret)} o={on(f, harder + k * 3, 5)} loud={ret * 0.6} />
        })}
        <g opacity={on(f, back, 6)}><Tag x={CX} y={460} text="THEY COME BACK" s={pop(f, back)} size={58} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero-struggling" beats={heroC} x={260} s={0.9} />
      </g>}
      {/* # D) the white bear */}
      {D > 0.001 && <g opacity={D}>
        <g transform={`translate(${CX} 560) scale(${pop(f, told)})`} opacity={on(f, told, 6)}>
          <rect x={-330} y={-70} width={660} height={140} rx={14} fill={CREAM} stroke={INK} strokeWidth={7} />
          <text y={-6} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>DON'T THINK ABOUT</text>
          <text y={50} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>A WHITE BEAR</text>
        </g>
        {[[760, 820, 0.9], [560, 980, 0.6], [900, 1060, 0.55], [640, 760, 0.45], [960, 700, 0.4], [480, 760, 0.42], [780, 1180, 0.5]].map(([x, y, s], k) => (
          <Bear key={k} x={x} y={y} s={s * pop(f, (k === 0 ? bear : thinking + (k - 1) * 3))} o={on(f, k === 0 ? bear : thinking + (k - 1) * 3, 5)} r={-8 + k * 5} />
        ))}
        <g opacity={on(f, more, 6)}><Tag x={CX} y={1180} text="EVEN MORE" s={pop(f, more)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, famous, 6) * (1 - on(f, told, 6))}><Tag x={CX} y={560} text="A FAMOUS EXPERIMENT" s={pop(f, famous)} size={56} fill={MINT_D} ink={INK} /></g>
        <Person f={f} who="hero-struggling" beats={heroD} x={220} s={0.85} />
      </g>}
      <Headline text={f < s8 ? 'OPEN LOOPS' : f < s10 ? '' : f < s11 ? "DON'T FIGHT IT" : ''} o={f < s8 ? on(f, sticks, 8) * (1 - on(f, s8 - 4, 4)) : f >= s10 && f < s11 ? on(f, harder, 8) * (1 - on(f, s11 - 4, 4)) : 0} color={CREAM} />
      <NVig id="nml" />
    </g>
  )
}

export const NM_LOOPS = makePiece('nm-loops', 'Night mind: open loops, daytime noise, the white bear', {
  beats: ['s6', 's6:psychologists', 's6:unfinished', 's6:sticks', 's6:mind', 's7', 's7:finished', 's7:away', 's7:unfinished', 's7:tapping', 's7:shoulder', 's8', 's8:day', 's8:noise', 's8:drowns', 's8:messages', 's8:work', 's8:people', 's9', 's9:night', 's9:stops', 's9:open', 's9:loud', 's10', 's10:harder', 's10:push', 's10:thoughts', 's10:away', 's10:tend', 's10:back', 's11', 's11:famous', 's11:told', 's11:bear', 's11:thinking', 's11:more'],
  sfx: [['s7:away', 'thud'], ['s7:tapping', 'tick'], ['s8:messages', 'pop'], ['s8:work', 'pop'], ['s8:people', 'pop'], ['s9:loud', 'riser'], ['s10:push', 'whoosh'], ['s10:back', 'swish'], ['s11:bear', 'softpop']],
  Component: Loops, mood: 'light', canvas: 'tall',
})
