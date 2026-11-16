// ---------------------------------------------------------------- s1–s3b hook; s4–s8b the fire.
// HOOK) a little workshop of his own (you): it catches and burns down in one night; he sits in the ashes as the sky
//    goes from night to grey; then the camera's caption: NOT 20. NOT 30. LATE 60s.
// FIRE) West Orange, New Jersey, 1914: a row of brick factory blocks at night. The FILM building catches first (FILM
//    label, flames), then the fire jumps block to block; hoses spray; a counter ticks up to 13 BUILDINGS; Edison (labelled)
//    stands in the yard watching, a 67 tag appears; machines and paper fly up as sparks.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Block, Burnt, EVig, Flames, Headline, NameTag, Person, Sky, Smoke, Tag, win, CREAM, GOLD, INK, BURG, SEPIA, ASH, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), everything = c('s1:everything'), built = c('s1:built'), burned = c('s1:burned'), night = c('s1:night')
  const s2 = c('s2'), fault = c('s2:fault'), warning = c('s2:warning'), gone = c('s2:gone')
  const s3 = c('s3'), ashes = c('s3:ashes'), long = c('s3:long'), good = c('s3:good')
  const s3b = c('s3b'), twenty = c('s3b:twenty'), thirty = c('s3b:thirty'), sixties = c('s3b:sixties'), work = c('s3b:work')

  const burn = on(f, burned, 10), down = easeOut(span(f, gone, gone + 18))
  const hero: Beat[] = [[s1, 'present', 'smiling'], [everything, 'taDa', 'smiling'], [burned, 'shock', 'shocked'], [fault, 'crossNoA', 'worried'], [gone, 'despair', 'worried'], [ashes, 'slump', 'worried'], [good, 'slump', 'worried'], [s3b, 'idle', 'thinking'], [sixties, 'scratchHead', 'thinking'], [work, 'holdChest', 'worried']]

  return (
    <g>
      <Sky id="edh" day={on(f, s3, 30)} glow={burn * (1 - on(f, s3, 20))} />
      <rect x={0} y={GROUND} width={1080} height={680} fill={f >= gone ? ASH : '#7A6A58'} />
      {/* # your own little workshop */}
      <g opacity={on(f, built, 6)}>
        <Block x={520} w={420} h={lerp(380, 380, 0)} burn={burn} gone={down} chimney label={f < burned ? 'MY WORK' : ''} />
        <Flames x={520} y={GROUND - lerp(380, 140, down)} w={420} f={f} o={burn * (1 - on(f, s3, 14))} h={220} />
        <Smoke x={700} y={GROUND - 400} f={f} o={burn * (1 - on(f, s3b, 20))} />
      </g>
      <g opacity={on(f, warning, 6) * (1 - on(f, gone, 6))}><Tag x={730} y={480} text="NO WARNING" s={pop(f, warning)} size={56} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, gone, 6) * (1 - on(f, s3, 6))}><Tag x={730} y={480} text="GONE" s={pop(f, gone) * 1.2} size={90} fill={GOLD} /></g>
      <g opacity={on(f, ashes, 6) * (1 - on(f, s3b, 6))}><Tag x={730} y={480} text={f >= good ? 'MAYBE FOREVER' : 'SITTING IN THE ASHES'} s={pop(f, f >= good ? good : ashes)} size={52} /></g>
      {/* # not 20, not 30: late 60s */}
      {([['NOT 20', twenty, 0], ['NOT 30', thirty, 1], ['LATE 60s', sixties, 2]] as const).map(([t, at, k]) => (
        <g key={t} opacity={on(f, at, 5)}><Tag x={730} y={470 + k * 130} text={t} s={pop(f, at)} size={k === 2 ? 66 : 50} fill={k === 2 ? GOLD : CREAM} ink={INK} /></g>
      ))}
      <g opacity={on(f, work, 6)}><Burnt x={730} y={1080} text="LIFE'S WORK" burn={1} s={0.9} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={260} s={0.88} />
      <Headline text={f < s2 ? 'ONE NIGHT' : f < s3b ? '' : 'NOW IMAGINE'} o={f < s2 ? on(f, night, 8) * (1 - on(f, s2 - 4, 4)) : f >= s3b ? on(f, s3b, 8) : 0} color={f < s3 ? CREAM : INK} />
      <EVig id="edh" />
    </g>
  )
}

const Fire: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), evening = c('s4:evening'), december = c('s4:december'), fire = c('s4:fire'), edison = c('s4:thomas'), factory = c('s4:factory')
  const s5 = c('s5'), film = c('s5:film'), back = c('s5:back'), paper = c('s5:paper'), fuel = c('s5:fuel')
  const s6 = c('s6'), crews = c('s6:crews'), hours = c('s6:hours'), jumping = c('s6:jumping')
  const s7 = c('s7'), end = c('s7:end'), thirteen = c('s7:thirteen'), destroyed = c('s7:destroyed')
  const s8 = c('s8'), sixty = c('s8:sixty'), old = c('s8:old')
  const s8b = c('s8b'), machines = c('s8b:machines'), materials = c('s8b:materials'), stood = c('s8b:stood'), watched = c('s8b:watched')

  // # five blocks; the film block (k = 2) catches first, then the fire jumps outward
  const catchAt = [jumping + 18, jumping, fire, jumping + 8, jumping + 26]
  const count = f < end ? 0 : Math.round(lerp(0, 13, easeOut(span(f, end, thirteen + 6))))
  const ed: Beat[] = [[s4, 'idle', 'neutral'], [fire, 'shock', 'shocked'], [s6, 'idle', 'worried'], [s7, 'armsCrossed', 'worried'], [sixty, 'idle', 'neutral'], [stood, 'pockets', 'neutral'], [watched, 'lookFar', 'thinking']]

  return (
    <g>
      <Sky id="edf" day={0} glow={on(f, fire, 12)} />
      <rect x={0} y={GROUND} width={1080} height={680} fill="#3A3330" />
      {/* # the factory row */}
      {[[0, 200, 420], [210, 200, 520], [420, 230, 460], [660, 200, 560], [870, 210, 440]].map(([x, w, h], k) => {
        const b = on(f, catchAt[k], 10)
        return <g key={k}>
          <Block x={x} w={w} h={h} burn={b} gone={span(f, catchAt[k] + 120, catchAt[k] + 260)} chimney={k % 2 === 0} label={k === 2 ? 'FILM' : undefined} />
          <Flames x={x} y={GROUND - h * lerp(1, 0.4, span(f, catchAt[k] + 120, catchAt[k] + 260))} w={w} f={f + k * 7} o={b} h={240} />
        </g>
      })}
      <Smoke x={520} y={GROUND - 500} f={f} o={on(f, fire, 12)} n={8} />
      {/* # sparks: machines and papers flying up */}
      {Array.from({ length: 14 }, (_, k) => { const t = ((f - machines) / 50 + k / 14) % 1
        return f > machines ? <rect key={k} x={200 + ((k * 73) % 700) + t * 40} y={GROUND - 520 - t * 500} width={k % 3 ? 16 : 30} height={k % 3 ? 16 : 22} fill={k % 3 ? SEPIA.flame : SEPIA.paper} opacity={(1 - t) * on(f, machines, 6)} transform={`rotate(${t * 200 + k * 20} ${210 + ((k * 73) % 700)} ${GROUND - 520 - t * 500})`} /> : null })}
      {/* # hoses */}
      <g opacity={on(f, crews, 6) * (1 - on(f, s7, 8))}>
        {[0, 1].map((k) => <path key={k} d={`M${120 + k * 820} ${GROUND + 120} Q${300 + k * 480} ${GROUND - 600} ${480 + k * 120} ${GROUND - 380}`} stroke="#BFD9F2" strokeWidth={14} fill="none" strokeDasharray="30 18" strokeDashoffset={-f * 6} opacity={0.8} />)}
      </g>
      {/* # tags */}
      <g opacity={on(f, december, 6) * (1 - on(f, s5, 8))}><Tag x={CX} y={480} text="DEC 9, 1914" s={pop(f, december)} size={62} fill={GOLD} /></g>
      <g opacity={on(f, factory, 6) * (1 - on(f, s5, 8))}><Tag x={CX} y={610} text="WEST ORANGE, NEW JERSEY" s={pop(f, factory)} size={42} /></g>
      <g opacity={on(f, film, 6) * (1 - on(f, s6, 8))}><Tag x={CX} y={480} text={f >= fuel ? 'FILM = FUEL' : 'IT STARTED WITH FILM'} s={pop(f, f >= fuel ? fuel : film)} size={54} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, hours, 6) * (1 - on(f, s7, 8))}><Tag x={CX} y={480} text="FOR HOURS" s={pop(f, hours)} size={56} /></g>
      <g opacity={on(f, end, 6) * (1 - on(f, s8, 8))}><Tag x={CX} y={480} text={`${count} BUILDINGS`} s={pop(f, end)} size={72} fill={GOLD} /></g>
      <g opacity={on(f, sixty, 6)}><Tag x={330} y={480} text="AGE 67" s={pop(f, sixty) * 1.2} size={72} fill={GOLD} /></g>
      <g opacity={on(f, materials, 6)}><Tag x={770} y={480} text="YEARS OF WORK" s={pop(f, materials)} size={50} fill={CREAM} ink={BURG} /></g>
      <Person f={f} who="lib-edison" beats={ed} x={300} y={GROUND + 120} s={0.9} />
      <NameTag x={300} y={GROUND - 560} name="THOMAS EDISON" o={on(f, edison, 6)} />
      <Headline text={f < s8 ? 'THE FIRE' : 'HE WATCHED IT BURN'} o={f < s8 ? on(f, evening, 8) * (1 - on(f, s8 - 4, 4)) : on(f, stood, 8)} color={CREAM} />
      <EVig id="edf" />
    </g>
  )
}

export const ED_HOOK = makePiece('ed-hook', 'Edison: everything burns in one night (you)', {
  beats: ['s1', 's1:everything', 's1:built', 's1:burned', 's1:night', 's2', 's2:fault', 's2:warning', 's2:gone', 's3', 's3:ashes', 's3:long', 's3:good', 's3b', 's3b:twenty', 's3b:thirty', 's3b:sixties', 's3b:work'],
  sfx: [['s1:burned', 'whoosh'], ['s2:gone', 'impact'], ['s3b:twenty', 'pop'], ['s3b:thirty', 'pop'], ['s3b:sixties', 'thud']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const ED_FIRE = makePiece('ed-fire', 'Edison: the West Orange fire of 1914', {
  beats: ['s4', 's4:evening', 's4:december', 's4:fire', 's4:thomas', 's4:factory', 's4:complex', 's4:west', 's5', 's5:film', 's5:back', 's5:paper', 's5:fuel', 's6', 's6:crews', 's6:hours', 's6:jumping', 's7', 's7:end', 's7:thirteen', 's7:destroyed', 's8', 's8:sixty', 's8:old', 's8b', 's8b:machines', 's8b:materials', 's8b:years', 's8b:burning', 's8b:stood', 's8b:watched'],
  sfx: [['s4:fire', 'whoosh'], ['s5:fuel', 'impact'], ['s6:jumping', 'crack'], ['s7:thirteen', 'thud'], ['s8:sixty', 'ding']],
  Component: Fire, mood: 'light', canvas: 'tall',
})
