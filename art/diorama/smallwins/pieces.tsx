// ---------------------------------------------------------------- the four scenes of "Why Small Wins Keep You Going".
// HOOK s1–s4) late office: he works, the GOAL mountain on the wall-window is miles away; five identical day cards
//    (MON…FRI) all read SAME; a motivation battery drains; MONDAY: STRONG → THURSDAY: POINTLESS; HARVARD; a tiny gold
//    marble appears and glows: SMALLER THAN YOU THINK.
// DIARIES s5–s10b) a field of little people (238 of them, as a crowd) each with a diary page; pages pile up as a counter
//    runs to 12,000; BONUS? and BIG SPEECH? cards are struck; a gold arrow lights one small step on a trail: PROGRESS;
//    a plaque: THE PROGRESS PRINCIPLE; NOT FINISHING · NOT WINNING · JUST MOVING FORWARD.
// RANK s11–s13) a podium board of five motivators ranked by managers; PROGRESS drops to #5 (DEAD LAST); a pair of
//    binoculars fixed on the GOAL flag; then a canyon opens between YOU ARE HERE and GOAL.
// JAR s14–s23) the jar of wins: each step (ONE PAGE · ONE WORKOUT · ONE CALL) drops a marble in; he writes the day's
//    win before bed; a two-arrow loop PROGRESS ⇄ MOOD spins; he looks back down the trail at his footprints; the jar
//    fills and glows: SOMETHING BIG; last: WHAT'S YOUR SMALL WIN TODAY?
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Diary, Headline, Jar, Marble, Mountain, Office, Outdoors, Person, Steps, Tag, WVig, win, CREAM, GOLD, GOLD_L, INK, BURG, ORANGE, HILL_D, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const hard = c('s1:hard'), bed = c('s1:bed'), nowhere = c('s1:nowhere')
  const s2 = c('s2'), huge = c('s2:huge'), miles = c('s2:miles'), same = c('s2:same')
  const s3 = c('s3'), motivation = c('s3:motivation'), running = c('s3:running')
  const s3b = c('s3b'), monday = c('s3b:monday'), thursday = c('s3b:thursday'), pointless = c('s3b:pointless'), inch = c('s3b:inch')
  const s4 = c('s4'), harvard = c('s4:harvard'), going = c('s4:going'), smaller = c('s4:smaller')

  const battery = f < motivation ? 0.9 : lerp(0.9, 0.08, easeOut(span(f, motivation, running + 16)))
  const hero: Beat[] = [[0, 'type', 'neutral'], [bed, 'slump', 'worried'], [nowhere, 'despair', 'worried'], [s2, 'idle', 'thinking'], [miles, 'lookFar', 'worried'], [same, 'shrug', 'worried'], [s3, 'slump', 'worried'], [monday, 'fistPump', 'smiling'], [thursday, 'slump', 'worried'], [s4, 'idle', 'thinking'], [smaller, 'point', 'smiling']]
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI']

  return (
    <g>
      <Office id="swh" />
      {/* # the goal: far away through the window */}
      <g transform="translate(780 520) scale(0.4)"><Mountain x={0} y={160} s={lerp(1, 0.6, easeOut(span(f, miles, miles + 14)))} /></g>
      <g opacity={on(f, miles, 6) * (1 - on(f, s3, 6))}><Tag x={780} y={760} text="MILES AWAY" s={pop(f, miles)} size={50} /></g>
      <g opacity={on(f, huge, 6) * (1 - on(f, miles, 6))}><Tag x={780} y={760} text="A HUGE GOAL" s={pop(f, huge)} size={50} fill={GOLD} /></g>
      {/* # five identical days */}
      {days.map((d, k) => <g key={d} opacity={on(f, same - 8 + k * 3, 4) * (1 - on(f, s3, 8))} transform={`translate(${160 + k * 190} 1150) scale(${pop(f, same - 8 + k * 3) * 0.9})`}>
        <rect x={-80} y={-90} width={160} height={180} rx={12} fill={CREAM} stroke={INK} strokeWidth={5} /><rect x={-80} y={-90} width={160} height={50} rx={12} fill={BURG} />
        <text y={-54} textAnchor="middle" fill={CREAM} style={{ font: '400 36px "Bebas Neue"' }}>{d}</text>
        <text y={46} textAnchor="middle" fill={INK} style={{ font: '400 52px "Bebas Neue"' }}>SAME</text>
      </g>)}
      {/* # motivation battery */}
      <g opacity={on(f, motivation, 6) * (1 - on(f, s3b, 8))} transform="translate(780 980)">
        <rect x={-150} y={-60} width={300} height={120} rx={18} fill="none" stroke={INK} strokeWidth={10} /><rect x={150} y={-24} width={20} height={48} rx={4} fill={INK} />
        <rect x={-136} y={-46} width={272 * battery} height={92} rx={10} fill={battery > 0.3 ? '#3FA06A' : '#E2574C'} />
        <text y={110} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>MOTIVATION</text>
      </g>
      <g opacity={on(f, monday, 6) * (1 - on(f, s4, 8))}><Tag x={780} y={800} text="MONDAY: STRONG" s={pop(f, monday)} size={50} fill={GOLD} /></g>
      <g opacity={on(f, pointless, 6) * (1 - on(f, s4, 8))}><Tag x={780} y={940} text="THURSDAY: POINTLESS" s={pop(f, pointless)} size={46} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, inch, 6) * (1 - on(f, s4, 8))}><Tag x={780} y={1080} text="GOAL MOVED: 0 INCHES" s={pop(f, inch)} size={42} /></g>
      <g opacity={on(f, harvard, 6)}><Tag x={780} y={800} text="HARVARD RESEARCH" s={pop(f, harvard)} size={52} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, smaller, 6)}><circle cx={780} cy={1010} r={lerp(80, 50, easeOut(span(f, smaller, smaller + 14)))} fill={GOLD_L} opacity={0.7} /><circle cx={780} cy={1010} r={26} fill={GOLD} stroke={INK} strokeWidth={4} /><Tag x={780} y={1140} text="SMALLER THAN YOU THINK" s={pop(f, smaller)} size={42} fill={GOLD} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={300} s={0.88} />
      <Headline text={f < s2 ? 'GOT NOWHERE?' : f < s4 ? '' : 'WHAT KEEPS YOU GOING'} o={f < s2 ? on(f, hard, 8) * (1 - on(f, s2 - 4, 4)) : f >= s4 ? on(f, going, 8) : 0} color={INK} />
      <WVig id="swh" />
    </g>
  )
}

const Diaries: React.FC<PieceProps> = ({ f, c }) => {
  const s5 = c('s5'), amabile = c('s5:amabile'), people = c('s5:people'), diary = c('s5:diary'), day = c('s5:day')
  const s6 = c('s6'), collected = c('s6:collected'), n12 = c('s6:12000')
  const s7 = c('s7'), days = c('s7:days'), motivated = c('s7:motivated'), positive = c('s7:positive')
  const s8 = c('s8'), bonuses = c('s8:bonuses'), speeches = c('s8:speeches')
  const s9 = c('s9'), biggest = c('s9:biggest'), progress = c('s9:progress'), mattered = c('s9:mattered'), step = c('s9:step')
  const s10 = c('s10'), principle = c('s10:principle')
  const s10b = c('s10b'), finishing = c('s10b:finishing'), winning = c('s10b:winning'), forward = c('s10b:forward')

  const A = win(f, 0, s8 + 4), B = on(f, s8, 10)
  const count = f < collected ? 0 : Math.round(lerp(0, 12000, easeOut(span(f, collected, n12 + 10))))

  return (
    <g>
      <Outdoors id="swd" peak={0.6} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, amabile, 6) * (1 - on(f, people, 6))}><Tag x={CX} y={480} text="AMABILE & KRAMER" s={pop(f, amabile)} size={56} fill={CREAM} ink={BURG} /></g>
        {/* # a crowd, each with a diary page */}
        {Array.from({ length: 15 }, (_, k) => <g key={k} opacity={on(f, people + k, 3) * (1 - on(f, s7, 10) * 0.6)}>
          <Mini look={['hero-fit', 'hero-rich', 'hero-struggling'][k % 3]} x={120 + (k % 5) * 210} y={760 + Math.floor(k / 5) * 200} scale={1.1} frame={f} seed={k + 140} mood={f >= positive && k % 3 === 0 ? 'happy' : 'neutral'} />
          <g opacity={on(f, diary + k, 3)}><Diary x={170 + (k % 5) * 210} y={640 + Math.floor(k / 5) * 200} s={0.35} r={-6 + (k % 3) * 6} /></g>
        </g>)}
        <g opacity={on(f, people, 6) * (1 - on(f, s6, 6))}><Tag x={CX} y={480} text="238 PEOPLE" s={pop(f, people)} size={64} fill={GOLD} /></g>
        <g opacity={on(f, day, 6) * (1 - on(f, s6, 6))}><Tag x={CX} y={1200} text="A DIARY, EVERY DAY" s={pop(f, day)} size={46} /></g>
        <g opacity={on(f, collected, 6) * (1 - on(f, s7, 8))}><Tag x={CX} y={480} text={`${count.toLocaleString('en-GB')} ENTRIES`} s={pop(f, collected)} size={64} fill={GOLD} /></g>
        <g opacity={on(f, days, 6)}><Tag x={CX} y={480} text="THE BEST DAYS?" s={pop(f, days)} size={64} fill={CREAM} ink={BURG} /></g>
        {f >= motivated && [0, 1, 2].map((k) => <circle key={k} cx={120 + k * 420} cy={560 - ((f - motivated) * 3 + k * 40) % 160} r={14} fill={GOLD} opacity={0.6} />)}
      </g>}
      {B > 0.001 && <g opacity={B}>
        {([['BIG BONUS?', bonuses, 300], ['BIG SPEECH?', speeches, 780]] as const).map(([t, at, x]) => <g key={t} opacity={on(f, at, 6) * (1 - on(f, s9, 8))} transform={`translate(${x} 700)`}>
          <Tag x={0} y={0} text={t} s={pop(f, at)} size={54} /><path d={`M-170 -4 L${lerp(-170, 170, easeOut(span(f, at + 8, at + 16)))} 6`} stroke="#D2463C" strokeWidth={12} strokeLinecap="round" />
        </g>)}
        {/* # the trail: one small step lights up */}
        <path d={`M100 ${GROUND - 40} Q400 ${GROUND - 160} 600 ${GROUND - 250} T1000 ${GROUND - 420}`} stroke="#E8D7B0" strokeWidth={40} fill="none" strokeLinecap="round" />
        <g opacity={on(f, progress, 6)}><ellipse cx={260} cy={GROUND - 96} rx={50} ry={20} fill={GOLD} /><path d={`M200 ${GROUND - 200} L${lerp(200, 330, easeOut(span(f, step, step + 10)))} ${GROUND - 250}`} stroke={ORANGE} strokeWidth={16} strokeLinecap="round" /><path d="M330 1000 l-30 -24 l40 -6 z" fill={ORANGE} opacity={on(f, step + 6, 4)} /></g>
        <g opacity={on(f, biggest, 6) * (1 - on(f, s10, 8))}><Tag x={CX} y={480} text={f >= progress ? 'PROGRESS' : 'THE BIGGEST BOOSTER'} s={pop(f, f >= progress ? progress : biggest)} size={f >= progress ? 84 : 56} fill={GOLD} /></g>
        <g opacity={on(f, mattered, 6) * (1 - on(f, s10, 8))}><Tag x={CX} y={620} text="ON WORK THAT MATTERS" s={pop(f, mattered)} size={44} /></g>
        <g opacity={on(f, principle, 6) * (1 - on(f, s10b, 8))} transform={`translate(${CX} 560) scale(${pop(f, principle)})`}>
          <rect x={-330} y={-80} width={660} height={160} rx={16} fill={INK} /><text y={-12} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 6 }}>THE</text>
          <text y={52} textAnchor="middle" fill={GOLD} style={{ font: '400 74px "Bebas Neue"', letterSpacing: 4 }}>PROGRESS PRINCIPLE</text>
        </g>
        {([['NOT FINISHING', finishing], ['NOT WINNING', winning], ['JUST MOVING FORWARD', forward]] as const).map(([t, at], k) => <g key={t} opacity={on(f, at, 5)}><Tag x={CX} y={460 + k * 120} text={t} s={pop(f, at)} size={k === 2 ? 54 : 46} fill={k === 2 ? GOLD : CREAM} /></g>)}
      </g>}
      <Headline text={f < s8 ? 'THE DIARY STUDY' : f < s10b ? '' : ''} o={f < s8 ? on(f, s5, 8) * (1 - on(f, people - 4, 4)) : 0} color={INK} />
      <WVig id="swd" />
    </g>
  )
}

const Rank: React.FC<PieceProps> = ({ f, c }) => {
  const s11 = c('s11'), surprising = c('s11:surprising'), managers = c('s11:managers'), rank = c('s11:rank'), progress = c('s11:progress'), last = c('s11:last')
  const s12 = c('s12'), miss = c('s12:miss'), finish = c('s12:finish'), line = c('s12:line')
  const s13 = c('s13'), gap = c('s13:gap'), where = c('s13:where'), want = c('s13:want'), enormous = c('s13:enormous')

  const A = win(f, 0, s12 + 4), B = win(f, s12, s13 + 4), C = on(f, s13, 10)
  // # the five motivators; progress starts mid-list and sinks to #5
  const items = ['RECOGNITION', 'INCENTIVES', 'SUPPORT', 'CLEAR GOALS', 'PROGRESS']
  const sink = easeOut(span(f, progress, last + 8))
  const open = easeOut(span(f, gap, want + 10))
  const hero: Beat[] = [[s12, 'idle', 'neutral'], [finish, 'lookFar', 'thinking']]
  const heroC: Beat[] = [[s13, 'idle', 'worried'], [where, 'point', 'neutral'], [enormous, 'despair', 'worried']]

  return (
    <g>
      <Outdoors id="swr" peak={B > 0.5 ? 1 : 0.4} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, managers, 6)}><Tag x={CX} y={460} text="669 MANAGERS RANKED" s={pop(f, managers)} size={56} fill={CREAM} ink={BURG} /></g>
        {items.map((t, k) => {
          const isP = k === 4, slot = isP ? lerp(2, 4, sink) : k < 2 ? k : k === 2 ? lerp(3, 2, sink) : lerp(4, 3, sink)
          return <g key={t} opacity={on(f, rank + k * 3, 4)} transform={`translate(${CX} ${600 + slot * 120})`}>
            <rect x={-330} y={-46} width={660} height={92} rx={14} fill={isP ? GOLD : CREAM} stroke={INK} strokeWidth={5} />
            <text x={-290} y={18} fill={INK} style={{ font: '400 50px "Bebas Neue"' }}>{`#${Math.round(slot) + 1}`}</text>
            <text x={20} y={18} textAnchor="middle" fill={INK} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>{t}</text>
          </g>
        })}
        <g opacity={on(f, last, 4)} transform={`translate(${CX + 250} 1140) rotate(-10)`}><rect x={-140} y={-40} width={280} height={80} rx={10} fill="none" stroke="#D2463C" strokeWidth={8} /><text y={22} textAnchor="middle" fill="#D2463C" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>DEAD LAST</text></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, finish, 6)} transform="translate(560 640)"><circle cx={-40} r={46} fill={INK} /><circle cx={40} r={46} fill={INK} /><circle cx={-40} r={26} fill="#9FD3F2" /><circle cx={40} r={26} fill="#9FD3F2" /><path d="M-40 0 L200 -120" stroke={GOLD} strokeWidth={4} strokeDasharray="10 10" /></g>
        <g opacity={on(f, line, 6)}><Tag x={CX} y={480} text="ONLY THE FINISH LINE COUNTS?" s={pop(f, line)} size={46} /></g>
        <Person f={f} who="hero-struggling" beats={hero} x={300} s={0.85} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # the canyon between here and the goal */}
        <rect x={0} y={GROUND - 60} width={1080} height={700} fill={HILL_D} />
        <path d={`M${CX - 220 * open} ${GROUND - 60} L${CX - 140 * open} 1920 L${CX + 140 * open} 1920 L${CX + 220 * open} ${GROUND - 60} Z`} fill="#3A4A60" />
        <g opacity={on(f, where, 6)}><Tag x={200} y={GROUND - 640} text="YOU ARE HERE" s={pop(f, where)} size={44} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, want, 6)}><Tag x={880} y={GROUND - 640} text="WHERE YOU WANT TO BE" s={pop(f, want)} size={38} fill={GOLD} /></g>
        <g opacity={on(f, enormous, 6)}><Tag x={CX} y={480} text="THE GAP LOOKS HUGE" s={pop(f, enormous)} size={58} /></g>
        <Person f={f} who="hero-struggling" beats={heroC} x={200} y={GROUND - 60} s={0.8} />
        <g transform="translate(880 0)"><path d={`M0 ${GROUND - 60} L0 ${GROUND - 300}`} stroke={INK} strokeWidth={8} /><path d={`M0 ${GROUND - 300} L90 ${GROUND - 270} L0 ${GROUND - 240} Z`} fill={ORANGE} /></g>
      </g>}
      <Headline text={f < s12 ? 'THE SURPRISE' : f < s13 ? 'WE MISS IT TOO' : 'MIND THE GAP'} o={f < s12 ? on(f, surprising, 8) * (1 - on(f, s12 - 4, 4)) : f < s13 ? on(f, miss, 8) * (1 - on(f, s13 - 4, 4)) : on(f, gap, 8)} color={INK} />
      <WVig id="swr" />
    </g>
  )
}

const JarPiece: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), fix = c('s14:fix'), visible = c('s14:visible')
  const s15 = c('s15'), small = c('s15:small'), today = c('s15:today'), page = c('s15:page'), workout = c('s15:workout'), call = c('s15:call')
  const s16 = c('s16'), bed = c('s16:bed'), write = c('s16:write'), inch = c('s16:inch')
  const s16b = c('s16b'), paragraph = c('s16b:paragraph'), counts = c('s16b:counts'), walk = c('s16b:walk'), too = c('s16b:too')
  const s17 = c('s17'), diaries = c('s17:diaries'), fed = c('s17:fed'), mood = c('s17:mood'), more = c('s17:more')
  const s18 = c('s18'), loop = c('s18:loop'), purpose = c('s18:purpose')
  const s19 = c('s19'), measuring = c('s19:measuring'), finish = c('s19:finish')
  const s20 = c('s20'), back = c('s20:back'), week = c('s20:week')
  const s21 = c('s21'), person = c('s21:person'), burst = c('s21:burst')
  const s22 = c('s22'), collecting = c('s22:collecting'), day = c('s22:day'), add = c('s22:add'), big = c('s22:big')
  const s23 = c('s23'), win23 = c('s23:win'), today23 = c('s23:today')

  // # every "win" beat drops a marble; the jar then fills fast on "collecting… add up"
  const drops = [page, workout, call, inch, paragraph, walk]
  const dropped = drops.filter((d) => f >= d + 14).length
  const fill = f < collecting ? 0 : Math.round(lerp(0, 36, easeOut(span(f, collecting, big))))
  const n = dropped + fill
  const A = win(f, 0, s19 + 4), B = on(f, s19, 10)
  const spin = (f - fed) * 3
  const hero: Beat[] = [[s14, 'explain', 'neutral'], [visible, 'present', 'smiling'], [s15, 'idle', 'neutral'], [page, 'read', 'smiling'], [workout, 'fistPump', 'smiling'], [call, 'phone', 'smiling'], [bed, 'idle', 'neutral'], [write, 'type', 'smiling'], [paragraph, 'thumbsUp', 'smiling'], [walk, 'walkA', 'smiling'], [walk + 8, 'walkB', 'smiling'], [too, 'nodA', 'smiling'], [s17, 'explain', 'neutral'], [loop, 'present', 'smiling']]
  const heroB: Beat[] = [[s19, 'idle', 'neutral'], [finish, 'crossNoA', 'neutral'], [back, 'lookFar', 'smiling'], [person, 'idle', 'neutral'], [burst, 'shrug', 'neutral'], [collecting, 'confident', 'smiling'], [big, 'celebrate', 'smiling'], [win23, 'point', 'smiling']]

  return (
    <g>
      <Outdoors id="swj" peak={B > 0.5 ? 1 : 0.5} />
      <Jar x={760} y={GROUND - 40} n={n} s={0.9} glow={on(f, big, 10)} f={f} />
      {drops.map((d, k) => <Marble key={k} x0={760 + (k % 2 ? 80 : -80)} y0={420} x1={760} y1={GROUND - 380} t={span(f, d, d + 14)} />)}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, visible, 6) * (1 - on(f, s15, 6))}><Tag x={760} y={480} text="MAKE IT VISIBLE" s={pop(f, visible)} size={60} fill={GOLD} /></g>
        {([['ONE PAGE', page], ['ONE WORKOUT', workout], ['ONE CALL', call]] as const).map(([t, at], k) => <g key={t} opacity={on(f, at, 5) * (1 - on(f, s16, 6))}><Tag x={300} y={470 + k * 120} text={t} s={pop(f, at)} size={48} fill={CREAM} ink={BURG} /></g>)}
        <g opacity={on(f, today, 6) * (1 - on(f, page, 6))}><Tag x={300} y={470} text="DONE TODAY" s={pop(f, today)} size={50} /></g>
        <g opacity={on(f, write, 6) * (1 - on(f, s16b, 6))}><Diary x={300} y={640} s={1.2 * pop(f, write)} r={-4} /><Tag x={300} y={860} text="+1 INCH" s={pop(f, inch)} size={50} fill={GOLD} /></g>
        <g opacity={on(f, counts, 6) * (1 - on(f, s17, 6))}><Tag x={300} y={500} text="THAT COUNTS" s={pop(f, counts)} size={54} fill={GOLD} /></g>
        {/* # the progress ⇄ mood loop */}
        <g opacity={on(f, fed, 6) * (1 - on(f, s19, 8))} transform="translate(330 660)">
          <g transform={`rotate(${spin})`}>
            <path d="M-130 0 A130 130 0 0 1 130 0" stroke={ORANGE} strokeWidth={18} fill="none" /><path d="M130 0 l-26 -20 l40 -6 z" fill={ORANGE} transform="rotate(90 130 0)" />
            <path d="M130 0 A130 130 0 0 1 -130 0" stroke={HILL_D} strokeWidth={18} fill="none" /><path d="M-130 0 l26 20 l-40 6 z" fill={HILL_D} transform="rotate(90 -130 0)" />
          </g>
          <text y={-170} textAnchor="middle" fill={INK} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>PROGRESS</text>
          <text y={210} textAnchor="middle" fill={INK} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, mood, 6)}>MOOD</text>
        </g>
        <g opacity={on(f, purpose, 6) * (1 - on(f, s19, 6))}><Tag x={CX} y={480} text="BUILD THE LOOP" s={pop(f, purpose)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, diaries, 6) * (1 - on(f, fed, 6))}><Tag x={CX} y={480} text="IN THE DIARIES" s={pop(f, diaries)} size={52} /></g>
        <Person f={f} who="hero" beats={hero} x={f >= walk && f < too + 10 ? lerp(220, 320, span(f, walk, too)) : 220} s={0.8} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Steps x0={60} x1={260} y={GROUND - 20} n={7} o={on(f, back, 8)} />
        <g opacity={on(f, back, 6) * (1 - on(f, s21, 8))}><Tag x={CX} y={480} text={f >= week ? 'THIS WEEK: LOOK HOW FAR' : 'LOOK BACK'} s={pop(f, back)} size={50} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, measuring, 6) * (1 - on(f, s20, 6))}><Tag x={CX} y={480} text="NOT JUST THE FINISH LINE" s={pop(f, measuring)} size={50} /></g>
        <g opacity={on(f, burst, 6) * (1 - on(f, s22, 6))}><Tag x={CX} y={480} text="NOT THE BIGGEST BURST" s={pop(f, burst)} size={50} /></g>
        <g opacity={on(f, day, 6) * (1 - on(f, s23, 6))}><Tag x={CX} y={480} text={f >= big ? 'SOMETHING BIG' : 'DAY AFTER DAY'} s={pop(f, f >= big ? big : day)} size={f >= big ? 76 : 56} fill={GOLD} /></g>
        <g opacity={on(f, win23, 6)}><Tag x={CX} y={480} text="YOUR SMALL WIN TODAY?" s={pop(f, win23)} size={58} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroB} x={300} s={0.8} />
      </g>}
      <Headline text={f < s15 ? '' : f < s17 ? 'SMALL STEPS, TODAY' : f < s19 ? 'THE LOOP' : f < s22 ? '' : 'ADD THEM UP'} o={f < s15 ? 0 : f < s17 ? on(f, small, 8) * (1 - on(f, s17 - 4, 4)) : f < s19 ? on(f, fed, 8) * (1 - on(f, s19 - 4, 4)) : f < s22 ? 0 : on(f, add, 8) * (1 - on(f, s23 - 4, 4)) + on(f, today23, 8) * 0} color={INK} />
      <WVig id="swj" />
    </g>
  )
}

export const SW_HOOK = makePiece('sw-hook', 'Small wins: worked all day, got nowhere', {
  beats: ['s1:hard', 's1:bed', 's1:nowhere', 's2', 's2:huge', 's2:miles', 's2:every', 's2:exactly', 's2:same', 's3', 's3:motivation', 's3:running', 's3b', 's3b:monday', 's3b:thursday', 's3b:pointless', 's3b:inch', 's4', 's4:harvard', 's4:going', 's4:smaller'],
  sfx: [['s2:miles', 'whoosh'], ['s2:same', 'tick'], ['s3:running', 'thud'], ['s3b:monday', 'pop'], ['s3b:pointless', 'thud'], ['s4:smaller', 'ding']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const SW_DIARIES = makePiece('sw-diaries', 'Small wins: 12,000 diary entries, the progress principle', {
  beats: ['s5', 's5:amabile', 's5:steven', 's5:kramer', 's5:asked', 's5:people', 's5:diary', 's5:day', 's6', 's6:collected', 's6:12000', 's7', 's7:days', 's7:motivated', 's7:positive', 's8', 's8:bonuses', 's8:speeches', 's9', 's9:biggest', 's9:progress', 's9:mattered', 's9:step', 's10', 's10:principle', 's10b', 's10b:finishing', 's10b:winning', 's10b:forward'],
  sfx: [['s5:people', 'softpop'], ['s6:12000', 'cash'], ['s8:bonuses', 'swish'], ['s8:speeches', 'swish'], ['s9:progress', 'ding'], ['s10:principle', 'impact'], ['s10b:forward', 'pop']],
  Component: Diaries, mood: 'light', canvas: 'tall',
})
export const SW_RANK = makePiece('sw-rank', 'Small wins: managers rank progress last; the gap', {
  beats: ['s11', 's11:surprising', 's11:part', 's11:asked', 's11:managers', 's11:rank', 's11:progress', 's11:last', 's12', 's12:miss', 's12:finish', 's12:line', 's13', 's13:live', 's13:gap', 's13:where', 's13:always', 's13:want', 's13:enormous'],
  sfx: [['s11:rank', 'tick'], ['s11:last', 'thud'], ['s12:finish', 'swish'], ['s13:gap', 'crack']],
  Component: Rank, mood: 'light', canvas: 'tall',
})
export const SW_JAR = makePiece('sw-jar', 'Small wins: the jar of wins, the loop, add them up', {
  beats: ['s14', 's14:fix', 's14:visible', 's15', 's15:small', 's15:today', 's15:page', 's15:workout', 's15:call', 's16', 's16:bed', 's16:write', 's16:thing', 's16:forward', 's16:inch', 's16b', 's16b:paragraph', 's16b:counts', 's16b:walk', 's16b:too', 's17', 's17:diaries', 's17:fed', 's17:lifted', 's17:other', 's17:mood', 's17:more', 's18', 's18:loop', 's18:purpose', 's19', 's19:measuring', 's19:finish', 's20', 's20:back', 's20:week', 's21', 's21:person', 's21:usually', 's21:biggest', 's21:burst', 's22', 's22:collecting', 's22:day', 's22:add', 's22:big', 's23', 's23:win', 's23:today'],
  sfx: [['s15:page', 'coin'], ['s15:workout', 'coin'], ['s15:call', 'coin'], ['s16:inch', 'coin'], ['s16b:paragraph', 'coin'], ['s16b:walk', 'coin'], ['s17:fed', 'whoosh'], ['s22:collecting', 'riser'], ['s22:big', 'chime']],
  Component: JarPiece, mood: 'light', canvas: 'tall',
})
