// ---------------------------------------------------------------- s21–s27: get past day three.
// A) the hero waits, arms crossed, for the feeling; "WAITING TO FEEL LIKE IT" is struck through.
// B) day three made tiny: three cards pop in turn (10 PUSH-UPS · 1 PAGE · SHOES ON) and the front door swings
//    open to morning light. C) the night before, in the dusk bedroom: tomorrow's clothes on the chair, the book on
//    the pillow; the morning gets "NO VOTE". D) a week strip: tick, tick, X, tick… the second X is refused:
//    "NEVER MISS TWO". E) grey boring days with rain: the fit hero keeps walking. F) sunrise: the DAY 3 page
//    tears away and BEGIN is underneath.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Backdrop, Bed, Book, CalPage, ChairClothes, Cross, CX, DAWN, Door, DUSK, GOLD, GROUND, Headline, Moon, Person, Room, Sun, Tag, Tick, Vig, win, BURG, CREAM, INK, on, pop, lerp, span, easeOut, rnd, type Beat } from './kit'

const Action: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), stop = c('s21:stop'), feel = c('s21:feel')
  const s22 = c('s22'), small = c('s22:small'), ten = c('s22:ten'), page = c('s22:page'), shoes = c('s22:shoes'), door = c('s22:door')
  const s23 = c('s23'), night = c('s23:night'), morning23 = c('s23:morning'), vote = c('s23:vote'), morning25 = c('s25:morning')
  const clothes = c('s23b:clothes'), pillow = c('s23b:pillow'), decision = c('s23b:decision')
  const s24 = c('s24'), miss = c('s24:miss'), two = c('s24:two')
  const s25 = c('s25'), people = c('s25:people'), make = c('s25:make'), motivated = c('s25:motivated'), anymore26 = c('s26:anymore'), three27 = c('s27:three')
  const s26 = c('s26'), showing = c('s26:showing'), boring = c('s26:boring'), new26 = c('s26:new')
  const s27 = c('s27'), fail = c('s27:fail'), begin = c('s27:begin')

  const A = win(f, 0, s22 + 4), B = win(f, s22, s23 + 4), Cc = win(f, s23, s24 + 4), D = win(f, s24, s25 + 4), E = win(f, s25, s27 + 4), F = on(f, s27, 12)
  const night01 = on(f, s23 - 4, 14) * (1 - on(f, s24, 10))
  const heroA: Beat[] = [[0, 'armsCrossed', 'neutral'], [stop, 'stop', 'neutral'], [feel, 'idle', 'thinking']]
  const heroB: Beat[] = [[s22, 'idle', 'neutral'], [small, 'present', 'smiling'], [ten, 'fistPump', 'smiling'], [page, 'read', 'neutral'], [shoes, 'reachDown', 'neutral'], [door, 'walkA', 'smiling'], [door + 8, 'walkB', 'smiling'], [door + 16, 'walkA', 'smiling']]
  const walkE: Beat[] = Array.from({ length: 30 }, (_, k) => [s25 + k * 9, k % 2 ? 'walkB' : 'walkA', 'neutral'] as Beat)
  const heroF: Beat[] = [[s27, 'idle', 'neutral'], [fail, 'think', 'thinking'], [begin, 'celebrate', 'smiling']]
  const cards: [string, number][] = [['10 PUSH-UPS', ten], ['1 PAGE', page], ['SHOES ON', shoes]]
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <g>
      <Backdrop id="d3a" m={DAWN} />
      <Room m={DAWN} light={1 - night01} />
      <g opacity={night01}><Room m={DUSK} light={0.1} /><Moon x={800} y={560} /></g>
      {/* # A) waiting for the feeling */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="hero" beats={heroA} x={CX} />
        <g opacity={on(f, s21, 8)} transform="translate(540 620)">
          <Tag x={0} y={0} text="WAITING TO FEEL LIKE IT" s={pop(f, s21)} size={50} />
          <path d={`M-300 -6 L${lerp(-300, 300, easeOut(span(f, feel, feel + 10)))} 8`} stroke="#D2463C" strokeWidth={14} strokeLinecap="round" />
        </g>
      </g>}
      {/* # B) so small you can't say no; then out the door */}
      {B > 0.001 && <g opacity={B}>
        <Door x={880} open={on(f, door, 14)} />
        <Person f={f} who="hero" beats={heroB} x={lerp(380, 900, easeOut(span(f, door, door + 40)))} s={0.9} />
        {cards.map(([t, at], k) => (
          <g key={t} opacity={on(f, at, 6)} transform={`translate(${200 + k * 0} ${520 + k * 150})`}>
            <Tag x={0} y={0} text={t} s={pop(f, at) * 0.9} r={-3 + k * 3} size={54} fill={k === 2 ? GOLD : CREAM} />
          </g>
        ))}
      </g>}
      {/* # C) the night before */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Bed x={420} />
        <g opacity={on(f, pillow, 8)}><Book x={250} y={GROUND - 150} s={0.5 * pop(f, pillow)} /></g>
        <g opacity={on(f, clothes, 8)}><ChairClothes x={880} /></g>
        <g opacity={on(f, night, 8) * (1 - on(f, clothes - 4, 6))}><Tag x={CX} y={560} text="DECIDE TONIGHT" s={pop(f, night)} size={70} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, morning23, 6) * (1 - on(f, clothes - 4, 6))}><Sun x={880} y={460} r={50} /><Tag x={880} y={600} text="MORNING YOU" s={pop(f, morning23)} size={40} /></g>
        <g opacity={on(f, vote, 8) * (1 - on(f, clothes - 4, 6))}><Tag x={CX} y={720} text="MORNING YOU: NO VOTE" s={pop(f, vote)} size={50} /></g>
        <g opacity={on(f, decision, 8)}><Tag x={CX} y={600} text="0 DECISIONS LEFT" s={pop(f, decision)} size={58} fill={GOLD} /></g>
      </g>}
      {/* # D) never miss two */}
      {D > 0.001 && <g opacity={D}>
        {week.map((d, k) => {
          const x = 120 + k * 140, at = s24 + k * 5
          return (
            <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} 820)`}>
              <rect x={-60} y={-70} width={120} height={140} rx={16} fill={CREAM} stroke={INK} strokeWidth={6} />
              <text y={-30} textAnchor="middle" fill={BURG} style={{ font: '400 40px "Bebas Neue"' }}>{d}</text>
              {k === 2 ? <Cross x={0} y={22} o={on(f, miss, 6)} /> : k === 3 ? <g><Tick x={0} y={22} o={on(f, two, 6)} /></g> : k < 2 ? <Tick x={0} y={22} /> : <Tick x={0} y={22} o={on(f, two + 6 + k * 3, 6)} />}
            </g>
          )
        })}
        <g opacity={on(f, two, 6)}><Tag x={CX} y={1080} text="NEVER MISS TWO" s={pop(f, two)} size={80} fill={GOLD} /></g>
      </g>}
      {/* # E) the boring days, in the rain */}
      {E > 0.001 && <g opacity={E}>
        <rect width={1080} height={1920} fill="#5C6478" opacity={0.55} />
        {Array.from({ length: 40 }, (_, k) => { const x = rnd(k) * 1080, y = ((f * 26 + rnd(k + 9) * 1920) % 1920)
          return <path key={k} d={`M${x} ${y} l-14 46`} stroke="#C9D3E6" strokeWidth={4} opacity={0.55} /> })}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, people + k * 3, 6) * (1 - (k > 0 ? on(f, make + k * 4, 10) : 0))}><Mini look="hero-struggling" x={160 + k * 250} y={GROUND - 520} scale={0.9} frame={f} seed={k + 2} mood={k === 0 ? 'happy' : 'sad'} /></g>)}
        <Person f={f} who="hero-fit" beats={walkE} x={CX} s={0.95} />
        <g opacity={on(f, anymore26, 6)}><CalPage x={CX} y={620} label="DAY" s={0.75 * lerp(1, 0.9, span(f, anymore26, anymore26 + 20))} tone="#55515E" /></g>
        <g opacity={on(f, showing, 6) * (1 - on(f, boring - 2, 6))}><Tag x={CX} y={560} text="KEEP SHOWING UP" s={pop(f, showing)} size={60} fill={GOLD} /></g>
        <g opacity={on(f, new26, 6)}><Tag x={CX} y={1010} text="NOTHING NEW. STILL HERE." s={pop(f, new26)} size={44} /></g>
        <g opacity={on(f, morning25, 6) * (1 - on(f, s26, 6))}><Tag x={CX} y={680} text="EVERY MORNING?" s={pop(f, morning25)} size={44} fill="#D9D4CC" /></g>
        <g opacity={on(f, motivated, 8) * (1 - on(f, s26, 6))}><Tag x={CX} y={560} text="NOT ALWAYS MOTIVATED" s={pop(f, motivated)} size={56} /></g>
        <g opacity={on(f, boring, 8)}><CalPage x={CX} y={620} label="DAY" s={0.75} tone="#6E6A66" /><Tag x={CX} y={860} text="BORING DAY" s={pop(f, boring)} size={52} fill="#D9D4CC" /></g>
      </g>}
      {/* # F) day three is where you begin */}
      {F > 0.001 && <g opacity={F}>
        <Backdrop id="d3a2" m={DAWN} />
        <Sun x={CX} y={760} r={150} />
        <rect x={0} y={GROUND} width={1080} height={680} fill={DAWN.floor} />
        <Tag x={CX} y={500} text="BEGIN" s={pop(f, begin) * 1.4} size={110} fill={GOLD} ink={INK} />
        <g opacity={on(f, three27, 6) * (1 - on(f, begin, 8))} transform={`translate(0 ${lerp(0, -900, easeOut(span(f, begin - 2, begin + 18)))}) rotate(${lerp(0, -18, span(f, begin - 2, begin + 18))} 540 500)`}>
          <CalPage x={CX} y={500} label="3" s={0.95} />
        </g>
        <Person f={f} who="hero" beats={heroF} x={CX} />
      </g>}
      <Headline text={f < s22 ? '' : f < s23 ? 'MAKE DAY 3 TINY' : f < s24 ? 'THE NIGHT BEFORE' : f < s25 ? '' : f < s27 ? 'THE BORING DAYS' : 'DAY 3 IS WHERE YOU BEGIN'}
        o={f < s22 ? 0 : f < s23 ? on(f, small, 8) * (1 - on(f, s23 - 4, 4)) : f < s24 ? on(f, s23, 8) * (1 - on(f, s24 - 4, 4)) : f < s25 ? 0 : f < s27 ? on(f, s26, 8) * (1 - on(f, s27 - 4, 4)) : on(f, fail, 8)} color={INK} />
      <Vig id="d3a" />
    </g>
  )
}

export const D3_ACTION = makePiece('d3-action', 'Day 3: make it tiny, never miss two, begin', {
  beats: ['s21:stop', 's21:feel', 's22:small', 's22:ten', 's22:page', 's22:shoes', 's22:door', 's23:night', 's23:morning', 's23:vote', 's23b:clothes', 's23b:pillow', 's23b:decision', 's24:miss', 's24:two', 's25:people', 's25:make', 's25:motivated', 's25:morning', 's26:showing', 's26:boring', 's26:new', 's26:anymore', 's27:three', 's27:fail', 's27:begin'],
  sfx: [['s21:feel', 'swish'], ['s22:ten', 'pop'], ['s22:page', 'pop'], ['s22:shoes', 'pop'], ['s22:door', 'whoosh'], ['s23b:clothes', 'softpop'], ['s24:miss', 'thud'], ['s24:two', 'ding'], ['s27:begin', 'chime']],
  Component: Action, mood: 'light', canvas: 'tall',
})
