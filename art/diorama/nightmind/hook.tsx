// ---------------------------------------------------------------- s1–s5: lights off, brain on.
// A) the attic at bedtime: the lamp clicks off, he sits slumped in bed, exhausted (a battery at 5%). On "wide
//    awake" his eyes snap open and a bright ring of light pops over his head. B) the day's open loops float
//    up one by one — AWKWARD LUNCH LINE · UNANSWERED MESSAGE · TOMORROW'S MEETING — then more and more line up
//    in a queue over the bed and all glow on "close your eyes". C) NOT BROKEN; a neon sign flickers on: NIGHT SHIFT.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Attic, BedBack, BedFront, Headline, Lamp, Loop, NVig, Person, Tag, win, AMBER, CREAM, GOLD, INK, BURG, MINT, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const late = c('s1:late'), lights = c('s1:lights'), off = c('s1:off'), body = c('s1:body'), exhausted = c('s1:exhausted')
  const s2 = c('s2'), brain = c('s2:brain'), wide = c('s2:wide'), awake = c('s2:awake')
  const s3 = c('s3'), lunch = c('s3:lunch'), message = c('s3:message'), meeting = c('s3:meeting')
  const s4 = c('s4'), aside = c('s4:aside'), lines = c('s4:lines'), once = c('s4:once'), close = c('s4:close'), eyes = c('s4:eyes')
  const s5 = c('s5'), broken = c('s5:broken'), night = c('s5:night'), shift = c('s5:shift')

  const lamp = 1 - on(f, off, 4)
  const hero: Beat[] = [[0, 'sit', 'neutral'], [late, 'sit', 'neutral'], [body, 'sit', 'worried'], [exhausted, 'sit', 'worried'], [wide, 'sit', 'shocked'], [s3, 'sit', 'thinking'], [meeting, 'sit', 'worried'], [s4, 'sit', 'worried'], [eyes, 'sit', 'shocked'], [broken, 'sit', 'neutral'], [shift, 'sit', 'smiling']]
  // # the queue of extra loops that line up on "lines up at once"
  const queue = [[180, 560], [330, 470], [500, 430], [670, 470], [820, 560], [250, 700], [420, 640], [620, 650]]

  return (
    <g>
      <Attic id="nmh" f={f} lamp={lamp} />
      <BedBack x={520} />
      <Lamp x={110} lit={lamp} />
      <Person f={f} who="hero-struggling" beats={hero} x={330} y={GROUND - 170} s={0.85} />
      <BedFront x={520} up={1} />
      {/* # A) exhausted body: a battery near empty */}
      <g opacity={on(f, body, 6) * (1 - on(f, s2, 8))} transform={`translate(760 520) scale(${pop(f, body)})`}>
        <rect x={-110} y={-50} width={220} height={100} rx={16} fill="none" stroke={CREAM} strokeWidth={10} /><rect x={110} y={-20} width={18} height={40} rx={4} fill={CREAM} />
        <rect x={-96} y={-36} width={lerp(60, 18, span(f, body, exhausted + 10))} height={72} rx={8} fill="#E2574C" />
        <text x={0} y={110} textAnchor="middle" fill={CREAM} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>BODY: DONE</text>
      </g>
      {/* # wide awake: a bright ring over his head */}
      <g opacity={on(f, awake, 4) * (1 - on(f, s3, 10))}>
        <circle cx={330} cy={GROUND - 780} r={lerp(30, 120, easeOut(span(f, awake, awake + 10)))} fill="none" stroke={GOLD} strokeWidth={12} />
        <Tag x={760} y={560} text="BRAIN: ON" s={pop(f, awake)} size={60} fill={GOLD} />
      </g>
      <g opacity={on(f, brain, 6) * (1 - on(f, awake, 4))}><Tag x={760} y={560} text="BRAIN?" s={pop(f, brain)} size={60} /></g>
      {/* # B) the day's open loops */}
      {([['AWKWARD LUNCH LINE', lunch, 300, 520], ['NO REPLY YET', message, 760, 640], ["TOMORROW'S MEETING", meeting, 520, 800]] as const).map(([t, at, x, y], k) => (
        <Loop key={t} f={f} seed={k} x={x} y={y} s={0.85 * pop(f, at)} o={on(f, at, 6) * (1 - on(f, lines, 8))} label={t} />
      ))}
      <g opacity={on(f, lines, 8) * (1 - on(f, s5, 8))}>
        {queue.map(([x, y], k) => <Loop key={k} f={f} seed={k + 5} x={x} y={y} s={0.55 * pop(f, lines + k * 2)} o={on(f, lines + k * 2, 4)} loud={on(f, eyes, 6)} />)}
      </g>
      <g opacity={on(f, aside, 6) * (1 - on(f, lines, 6))}><Tag x={CX} y={560} text="PUSHED ASIDE ALL DAY" s={pop(f, aside)} size={52} /></g>
      {/* # C) not broken: the night shift */}
      <g opacity={on(f, broken, 6)}><Tag x={720} y={480} text="NOT BROKEN" s={pop(f, broken)} size={60} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, night, 4) * (0.75 + 0.25 * Math.sin(f * 1.3))} transform={`translate(720 680)`}>
        <rect x={-250} y={-70} width={500} height={140} rx={30} fill="#1A1D40" stroke={MINT} strokeWidth={8} />
        <text y={30} textAnchor="middle" fill={MINT} style={{ font: '400 90px "Bebas Neue"', letterSpacing: 8 }}>NIGHT SHIFT</text>
      </g>
      <Headline text={f < s3 ? 'LIGHTS OFF. BRAIN ON.' : f < s5 ? '' : ''} o={f < s3 ? on(f, wide, 8) * (1 - on(f, s3 - 4, 4)) : 0} color={CREAM} />
      <NVig id="nmh" />
    </g>
  )
}

export const NM_HOOK = makePiece('nm-hook', 'Night mind: lights off, brain on (attic)', {
  beats: ['s1:late', 's1:lights', 's1:off', 's1:body', 's1:exhausted', 's2', 's2:brain', 's2:wide', 's2:awake', 's3', 's3:lunch', 's3:message', 's3:meeting', 's4', 's4:aside', 's4:lines', 's4:once', 's4:close', 's4:eyes', 's5', 's5:broken', 's5:brain', 's5:starting', 's5:night', 's5:shift'],
  sfx: [['s1:off', 'click'], ['s2:awake', 'ding'], ['s3:lunch', 'pop'], ['s3:message', 'pop'], ['s3:meeting', 'pop'], ['s4:eyes', 'riser'], ['s5:night', 'glitch']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
