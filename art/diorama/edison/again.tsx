// ---------------------------------------------------------------- s9–s14 the next morning; s15–s18b resilience; s19–s24 you.
// MORNING) grey dawn over the ruins; a newspaper quote card: "OVER 67… I'LL START ALL OVER AGAIN TOMORROW" (reported);
//    workers' scaffolding rises the very next morning; a calendar flips a month; the chimney smokes again —
//    BACK IN PRODUCTION. LOSS: ENORMOUS stays stamped on the ruin; he turns away from it: ONE NIGHT ≠ THE STORY.
// RESILIENCE) a park in soft morning light: a row of people knocked flat by a wave labelled LOSS; most of them get
//    back up (MOST COMMON OUTCOME); stepping stones across a stream: ONE SMALL STEP, THEN ANOTHER; a sunrise: THE MORNING AFTER.
// FIRST BRICK) three burnt cards — JOB, RELATIONSHIP, PLAN; he sits with them (grieve); a sunrise and an alarm:
//    TOMORROW MORNING?; he lays one brick; Edison (labelled) lays one beside him; BEGIN AGAIN.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Block, Brick, Burnt, EVig, Headline, NameTag, Person, Quote, Sky, Smoke, Tag, win, CREAM, GOLD, GOLD_L, INK, BURG, SEPIA, ASH, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Morning: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), part = c('s9:part')
  const s10 = c('s10'), newspaper = c('s10:newspaper'), sixty = c('s10:sixty'), start = c('s10:start'), tomorrow = c('s10:tomorrow')
  const s11 = c('s11'), meant = c('s11:meant'), rebuilding = c('s11:rebuilding'), morning = c('s11:morning')
  const s12 = c('s12'), month = c('s12:month'), products = c('s12:products')
  const s13 = c('s13'), small = c('s13:small'), enormous = c('s13:enormous')
  const s14 = c('s14'), refused = c('s14:refused'), night = c('s14:night'), story = c('s14:story')

  const rise = easeOut(span(f, rebuilding, products + 20))
  const ed: Beat[] = [[s9, 'idle', 'neutral'], [s10, 'lookFar', 'thinking'], [start, 'confident', 'smiling'], [rebuilding, 'point', 'smiling'], [month, 'present', 'smiling'], [s13, 'idle', 'neutral'], [refused, 'crossNoA', 'neutral'], [story, 'confident', 'smiling']]
  const days = f < month ? 1 : Math.min(30, 1 + Math.round(29 * span(f, month, month + 30)))

  return (
    <g>
      <Sky id="edm" day={1} />
      <rect x={0} y={GROUND} width={1080} height={680} fill="#8A7E70" />
      {/* # the ruins, then the new walls rising inside scaffolding */}
      {[[420, 230], [660, 200], [870, 210]].map(([x, w], k) => <g key={k}>
        <Block x={x} w={w} h={460} burn={1} gone={1 - rise} chimney={k === 1} />
        <g opacity={on(f, rebuilding + k * 6, 8)}>
          {[0, 1, 2, 3].map((j) => <rect key={j} x={x - 10 + j * (w / 3)} y={GROUND - 520} width={10} height={520} fill="#B98A5A" />)}
          {[0, 1, 2].map((j) => <rect key={j} x={x - 10} y={GROUND - 160 - j * 160} width={w + 20} height={10} fill="#B98A5A" />)}
        </g>
      </g>)}
      <Smoke x={760} y={GROUND - 600} f={f} o={on(f, products, 10)} n={4} />
      <Quote x={CX} y={620} s={0.85 * pop(f, newspaper)} o={on(f, newspaper, 6) * (1 - on(f, s11, 8))} lines={f >= tomorrow ? ['"OVER 67… BUT I\'LL', 'START ALL OVER', 'AGAIN TOMORROW"'] : f >= sixty ? ['"I\'M OVER 67…"'] : ['THE NEWSPAPERS']} by="— AS REPORTED, DEC 1914" />
      <g opacity={on(f, morning, 6) * (1 - on(f, s12, 8))}><Tag x={CX} y={480} text="THE VERY NEXT MORNING" s={pop(f, morning)} size={56} fill={GOLD} /></g>
      <g opacity={on(f, month, 6) * (1 - on(f, s13, 8))} transform="translate(560 640) scale(0.85)">
        <rect x={-130} y={-150} width={260} height={300} rx={16} fill={CREAM} stroke={INK} strokeWidth={6} /><rect x={-130} y={-150} width={260} height={70} rx={16} fill={BURG} />
        <text y={-102} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>DAY</text>
        <text y={80} textAnchor="middle" fill={INK} style={{ font: '400 150px "Bebas Neue"' }}>{days}</text>
      </g>
      <g opacity={on(f, products, 6) * (1 - on(f, s13, 8))}><Tag x={720} y={480} text="BACK IN PRODUCTION" s={pop(f, products)} size={52} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, enormous, 4) * (1 - on(f, s14, 8))} transform={`translate(720 700) rotate(-10) scale(${lerp(1.6, 1, easeOut(span(f, enormous, enormous + 6)))})`}>
        <rect x={-210} y={-56} width={420} height={112} rx={10} fill="none" stroke="#D2463C" strokeWidth={10} />
        <text y={34} textAnchor="middle" fill="#D2463C" style={{ font: '400 88px "Bebas Neue"', letterSpacing: 6 }}>ENORMOUS</text>
      </g>
      <g opacity={on(f, small, 6) * (1 - on(f, enormous, 4))}><Tag x={720} y={480} text="A SMALL LOSS?" s={pop(f, small)} size={54} /></g>
      <g opacity={on(f, night, 6)}><Tag x={CX} y={480} text="1 NIGHT ≠ THE WHOLE STORY" s={pop(f, night)} size={52} fill={GOLD} /></g>
      <Person f={f} who="lib-edison" beats={ed} x={230} y={GROUND + 100} s={0.9} />
      <NameTag x={230} y={GROUND - 580} name="THOMAS EDISON" />
      <Headline text={f < s11 ? 'THE NEXT DAY' : f < s13 ? 'REBUILD' : ''} o={f < s11 ? on(f, part, 8) * (1 - on(f, s11 - 4, 4)) : f < s13 ? on(f, rebuilding, 8) * (1 - on(f, s13 - 4, 4)) : 0} color={INK} />
      <EVig id="edm" />
    </g>
  )
}

const Resilience: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), psych = c('s15:psychologists'), bouncing = c('s15:bouncing'), resilience = c('s15:resilience')
  const s16 = c('s16'), important = c('s16:important'), hopeful = c('s16:hopeful')
  const s17 = c('s17'), rare = c('s17:rare'), superpower = c('s17:superpower'), loss = c('s17:loss'), common = c('s17:common'), stronger = c('s17:stronger'), expect = c('s17:expect')
  const s18 = c('s18'), helps = c('s18:helps'), speech = c('s18:speech'), small = c('s18:small'), step = c('s18:step'), another = c('s18:another')
  const s18b = c('s18b'), never = c('s18b:never'), falling = c('s18b:falling'), morning = c('s18b:morning'), after = c('s18b:after')

  const A = win(f, 0, s18 + 4), B = on(f, s18, 10)
  const knocked = on(f, loss, 6), up = on(f, common, 12)
  const hero: Beat[] = [[s15, 'explain', 'neutral'], [resilience, 'present', 'smiling'], [hopeful, 'pointUp', 'smiling'], [rare, 'crossNoA', 'neutral'], [common, 'present', 'smiling'], [stronger, 'fistPump', 'smiling']]
  const heroB: Beat[] = [[s18, 'idle', 'neutral'], [speech, 'crossNoA', 'neutral'], [small, 'walkA', 'smiling'], [small + 8, 'walkB', 'smiling'], [step, 'walkA', 'smiling'], [step + 8, 'walkB', 'smiling'], [another, 'walkA', 'smiling'], [another + 8, 'walkB', 'smiling'], [never, 'idle', 'smiling'], [morning, 'relief', 'smiling']]
  const stones = [[220, 0], [420, 1], [620, 2], [820, 3]]
  const bx = f < small ? 160 : lerp(160, 820, easeOut(span(f, small, after)))

  return (
    <g>
      <Sky id="edr" day={1} />
      <rect x={0} y={GROUND} width={1080} height={680} fill="#9DB48A" />
      {A > 0.001 && <g opacity={A}>
        {/* # a spring: bouncing back */}
        <g opacity={on(f, bouncing, 6) * (1 - on(f, s17, 8))} transform={`translate(760 ${780 - Math.abs(Math.sin((f - bouncing) / 6)) * 120 * on(f, bouncing, 6)})`}>
          <path d="M-40 80 l80 -20 l-80 -20 l80 -20 l-80 -20 l80 -20" stroke={INK} strokeWidth={10} fill="none" />
          <circle cy={-90} r={60} fill={GOLD} stroke={INK} strokeWidth={6} />
        </g>
        <g opacity={on(f, resilience, 6) * (1 - on(f, s17, 8))}><Tag x={760} y={480} text="RESILIENCE" s={pop(f, resilience) * 1.2} size={76} fill={GOLD} /></g>
        <g opacity={on(f, rare, 6) * (1 - on(f, loss, 6))}><Tag x={760} y={480} text={f >= superpower ? 'NOT A SUPERPOWER' : 'RARE?'} s={pop(f, f >= superpower ? superpower : rare)} size={56} fill={CREAM} ink={BURG} /></g>
        {/* # the wave of loss knocks a row of people down; most get back up */}
        {Array.from({ length: 6 }, (_, k) => {
          const back = k !== 4 // # most get back up
          const tilt = knocked * (back ? 1 - up : 1) * 80
          return <g key={k} opacity={on(f, loss - 10 + k * 2, 4)} transform={`rotate(${tilt} ${420 + k * 110} ${GROUND})`}><Mini look={['hero-fit', 'hero-rich', 'hero-struggling'][k % 3]} x={420 + k * 110} y={GROUND} scale={1.5} frame={f} seed={k + 120} mood={back && up > 0.5 ? 'happy' : 'sad'} /></g>
        })}
        <g opacity={on(f, loss, 4) * (1 - on(f, loss + 30, 10))}><path d={`M${lerp(1080, 300, easeOut(span(f, loss, loss + 20)))} ${GROUND - 300} q80 -60 160 0 q80 60 160 0 L${lerp(1080, 300, easeOut(span(f, loss, loss + 20))) + 320} ${GROUND} L${lerp(1080, 300, easeOut(span(f, loss, loss + 20)))} ${GROUND} Z`} fill="#6E8AA8" opacity={0.7} /><text x={lerp(1080, 300, easeOut(span(f, loss, loss + 20))) + 160} y={GROUND - 120} textAnchor="middle" fill={CREAM} style={{ font: '400 60px "Bebas Neue"' }}>LOSS</text></g>
        <g opacity={on(f, common, 6)}><Tag x={720} y={560} text="THE MOST COMMON OUTCOME" s={pop(f, common)} size={48} fill={GOLD} /></g>
        <g opacity={on(f, expect, 6)}><Tag x={720} y={690} text="STRONGER THAN YOU EXPECT" s={pop(f, expect)} size={44} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero" beats={hero} x={200} s={0.85} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <rect x={0} y={GROUND - 20} width={1080} height={120} fill="#7FA6C8" />
        {stones.map(([x, k]) => <ellipse key={k} cx={x} cy={GROUND + 10} rx={80} ry={26} fill="#A8A29A" stroke={INK} strokeWidth={4} opacity={on(f, small + (k as number) * 8, 5)} />)}
        <g opacity={on(f, speech, 6) * (1 - on(f, small, 6))}><Tag x={CX} y={480} text="NOT A BIG SPEECH" s={pop(f, speech)} size={56} /></g>
        <g opacity={on(f, step, 6) * (1 - on(f, s18b, 6))}><Tag x={CX} y={480} text="ONE STEP. THEN ANOTHER." s={pop(f, step)} size={54} fill={GOLD} /></g>
        <g opacity={on(f, morning, 8)}><circle cx={900} cy={700} r={lerp(60, 130, easeOut(span(f, morning, after + 10)))} fill={GOLD_L} /><Tag x={CX} y={480} text="THE MORNING AFTER" s={pop(f, morning)} size={60} fill={GOLD} /></g>
        <g opacity={on(f, falling, 6) * (1 - on(f, morning, 6))}><Tag x={CX} y={480} text="NOT 'NEVER FALL'" s={pop(f, falling)} size={56} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero" beats={heroB} x={bx} y={GROUND - 10} s={0.8} />
      </g>}
      <Headline text={f < s18 ? 'IT HAS A NAME' : 'HOW IT WORKS'} o={f < s18 ? on(f, psych, 8) * (1 - on(f, s16 - 4, 4)) + on(f, s17, 8) * 0 : on(f, helps, 8) * (1 - on(f, s18b - 4, 4))} color={INK} />
      <EVig id="edr" />
    </g>
  )
}

const FirstBrick: React.FC<PieceProps> = ({ f, c }) => {
  const s19 = c('s19'), burned = c('s19:burned'), job = c('s19:job'), relationship = c('s19:relationship'), plan = c('s19:plan'), grieve = c('s19:grieve')
  const s20 = c('s20'), hurts = c('s20:hurts'), weakness = c('s20:weakness'), mattered = c('s20:mattered')
  const s21 = c('s21'), question = c('s21:question'), start = c('s21:start'), tomorrow = c('s21:tomorrow'), morning = c('s21:morning')
  const s22 = c('s22'), factory = c('s22:factory'), brick = c('s22:brick')
  const s23 = c('s23'), sixty = c('s23:sixty'), ashes = c('s23:ashes'), chose = c('s23:chose'), begin = c('s23:begin')
  const s24 = c('s24'), age = c('s24:age'), lost = c('s24:lost'), again = c('s24:again'), too = c('s24:too')

  const A = win(f, 0, s21 + 4), B = on(f, s21, 10)
  const dawn = on(f, s21, 20)
  const hero: Beat[] = [[s19, 'idle', 'worried'], [grieve, 'slump', 'worried'], [hurts, 'holdChest', 'worried'], [mattered, 'idle', 'thinking'], [question, 'think', 'thinking'], [tomorrow, 'pointUp', 'smiling'], [brick, 'reachDown', 'smiling'], [brick + 14, 'idle', 'smiling'], [begin, 'present', 'smiling'], [again, 'fistPump', 'smiling'], [too, 'celebrate', 'smiling']]
  const ed: Beat[] = [[sixty, 'idle', 'neutral'], [chose, 'reachDown', 'smiling'], [begin, 'confident', 'smiling']]

  return (
    <g>
      <Sky id="edb" day={lerp(0.35, 1, dawn)} />
      <rect x={0} y={GROUND} width={1080} height={680} fill={ASH} />
      {A > 0.001 && <g opacity={A}>
        {([['JOB', job], ['RELATIONSHIP', relationship], ['PLAN', plan]] as const).map(([t, at], k) => (
          <Burnt key={t} x={700} y={560 + k * 190} text={t} burn={easeOut(span(f, at + 4, at + 20))} s={0.9 * pop(f, at)} r={-4 + k * 4} />
        ))}
        <g opacity={on(f, grieve, 6) * (1 - on(f, s20, 6))}><Tag x={CX} y={420} text="YOU CAN GRIEVE IT" s={pop(f, grieve)} size={54} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, weakness, 6) * (1 - on(f, mattered, 6))}><Tag x={CX} y={420} text="NOT WEAKNESS" s={pop(f, weakness)} size={56} /></g>
        <g opacity={on(f, mattered, 6)}><Tag x={CX} y={420} text="IT MATTERED" s={pop(f, mattered)} size={60} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <circle cx={880} cy={760} r={lerp(40, 120, dawn)} fill={GOLD_L} />
        <g opacity={on(f, tomorrow, 6) * (1 - on(f, s22, 6))}><Tag x={CX} y={480} text="TOMORROW MORNING?" s={pop(f, tomorrow)} size={64} fill={GOLD} /></g>
        <g opacity={on(f, factory, 6) * (1 - on(f, brick, 6))}><Tag x={CX} y={480} text="NOT THE WHOLE FACTORY" s={pop(f, factory)} size={52} /></g>
        <g opacity={on(f, brick, 6) * (1 - on(f, s23, 6))}><Tag x={CX} y={480} text="JUST THE FIRST BRICK" s={pop(f, brick)} size={60} fill={GOLD} /></g>
        {/* # two bricks laid side by side: his, then Edison's */}
        <g opacity={on(f, brick + 6, 6)}><Brick x={480} y={GROUND - 26} /></g>
        <g opacity={on(f, chose + 6, 6)}><Brick x={600} y={GROUND - 26} /></g>
        <g opacity={on(f, again + 4, 6)}><Brick x={540} y={GROUND - 78} /></g>
        <g opacity={on(f, sixty, 8)}>
          <Person f={f} who="lib-edison" beats={ed} x={800} s={0.85} />
          <NameTag x={800} y={GROUND - 640} name="THOMAS EDISON" />
        </g>
        <g opacity={on(f, begin, 6) * (1 - on(f, s24, 6))}><Tag x={CX} y={480} text="HE BEGAN AGAIN" s={pop(f, begin)} size={60} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, again, 6)}><Tag x={CX} y={480} text="SO CAN YOU" s={pop(f, again) * 1.15} size={76} fill={GOLD} /></g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={260} s={0.88} />
      <Headline text={f < s21 ? 'IF IT BURNED DOWN' : f < s23 ? "EDISON'S QUESTION" : 'BEGIN AGAIN'} o={f < s21 ? on(f, burned, 8) * (1 - on(f, s21 - 4, 4)) : f < s23 ? on(f, question, 8) * (1 - on(f, s23 - 4, 4)) : on(f, ashes, 8)} color={dawn > 0.5 ? INK : CREAM} />
      <EVig id="edb" />
    </g>
  )
}

export const ED_MORNING = makePiece('ed-morning', 'Edison: start again tomorrow, rebuilt within a month', {
  beats: ['s9', 's9:part', 's10', 's10:newspaper', 's10:sixty', 's10:start', 's10:tomorrow', 's11', 's11:meant', 's11:rebuilding', 's11:morning', 's12', 's12:month', 's12:products', 's13', 's13:small', 's13:enormous', 's14', 's14:refused', 's14:night', 's14:story'],
  sfx: [['s10:tomorrow', 'ding'], ['s11:rebuilding', 'thump'], ['s12:month', 'flutter'], ['s13:enormous', 'thud'], ['s14:story', 'chime']],
  Component: Morning, mood: 'light', canvas: 'tall',
})
export const ED_RESILIENCE = makePiece('ed-resilience', 'Edison: resilience is common, one step then another', {
  beats: ['s15', 's15:psychologists', 's15:bouncing', 's15:resilience', 's16', 's16:important', 's16:hopeful', 's17', 's17:rare', 's17:superpower', 's17:loss', 's17:common', 's17:stronger', 's17:expect', 's18', 's18:helps', 's18:speech', 's18:small', 's18:step', 's18:another', 's18b', 's18b:never', 's18b:falling', 's18b:more', 's18b:what', 's18b:morning', 's18b:after'],
  sfx: [['s15:resilience', 'ding'], ['s17:loss', 'whoosh'], ['s17:common', 'riser'], ['s18:step', 'pop'], ['s18:another', 'pop'], ['s18b:morning', 'chime']],
  Component: Resilience, mood: 'light', canvas: 'tall',
})
export const ED_BRICK = makePiece('ed-brick', 'Edison: grieve it, then the first brick', {
  beats: ['s19', 's19:burned', 's19:job', 's19:relationship', 's19:plan', 's19:grieve', 's20', 's20:hurts', 's20:weakness', 's20:mattered', 's21', 's21:question', 's21:start', 's21:tomorrow', 's21:morning', 's22', 's22:factory', 's22:brick', 's23', 's23:sixty', 's23:ashes', 's23:chose', 's23:begin', 's24', 's24:age', 's24:lost', 's24:again', 's24:too'],
  sfx: [['s19:job', 'crack'], ['s19:relationship', 'crack'], ['s19:plan', 'crack'], ['s21:tomorrow', 'ding'], ['s22:brick', 'thump'], ['s23:chose', 'thump'], ['s24:again', 'chime']],
  Component: FirstBrick, mood: 'light', canvas: 'tall',
})
