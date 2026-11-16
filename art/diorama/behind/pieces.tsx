// ---------------------------------------------------------------- the four scenes of "Why You Feel Behind in Life".
// HOOK s1–s3) the stadium: everyone else's runners are far ahead down the track; a giant phone slides up with a feed —
//    JUST BOUGHT A HOUSE · LAUNCHED MY BUSINESS · SHE SAID YES — and he (tired) falls further back: YEARS BEHIND; then a
//    big question tag: BEHIND WHO?
// UNFAIR s4–s8b) COMPARISON (Festinger's idea as a two-pan scale); then two film strips: THEIR HIGHLIGHTS (trophy, beach,
//    ring) vs YOUR WHOLE STORY (doubt, rain, a low bank balance); NOT A FAIR RACE; a curtain hides what nobody posts:
//    REJECTION EMAIL · THE ARGUMENT · CRYING IN THE CAR.
// TIMELINE s9–s14b) an age ruler 15→65; IN YOUR HEAD: BY 25 pin; 2.7 MILLION FOUNDERS; the "20-year-old in a hoodie" pin
//    is crossed, the real AVERAGE: 45 pin drops; a cookbook pin at 49 (JULIA CHILD, labelled); three ON TIME flags at
//    20, 35 and 50.
// CLOCK s15–s21) three cards: 1 YOU A YEAR AGO (a faded past-him walks beside him), the scoreboard STRONGER ✓ CALMER ✓
//    WISER ✓; 2 HIGHLIGHT REEL; 3 MUTE; then a big pocket watch: YOUR OWN CLOCK; he races his faded yesterday-self down
//    the track and breaks a TODAY tape.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { BVig, FeedPhone, Headline, Person, Pin, Post, Ruler, Stadium, Strip, Tag, win, ageX, CREAM, GOLD, GOLD_L, INK, BURG, PINK, TRACK_D, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), age = c('s1:age'), miles = c('s1:miles'), ahead = c('s1:ahead')
  const s1b = c('s1b'), phone = c('s1b:phone'), house = c('s1b:house'), business = c('s1b:business'), engaged = c('s1b:engaged')
  const s2 = c('s2'), years = c('s2:years'), behind = c('s2:behind')
  const s3 = c('s3'), who = c('s3:who'), feeling = c('s3:feeling'), telling = c('s3:telling')

  const scroll = f < house ? 0 : f < business ? lerp(0, 1, easeOut(span(f, house + 10, business))) : f < engaged ? lerp(1, 2, easeOut(span(f, business + 6, engaged))) : 2
  const phoneUp = easeOut(span(f, phone - 6, phone + 10)) * (1 - easeOut(span(f, s2, s2 + 10)))
  const fall = easeOut(span(f, years, behind + 10))
  const hero: Beat[] = [[0, 'walkA', 'neutral'], [8, 'walkB', 'neutral'], [16, 'walkA', 'neutral'], [ahead, 'lookFar', 'worried'], [s1b, 'phone', 'neutral'], [engaged, 'phone', 'worried'], [s2, 'slump', 'worried'], [behind, 'despair', 'worried'], [s3, 'idle', 'thinking'], [who, 'shrug', 'thinking']]

  return (
    <g>
      <Stadium id="bhh" />
      {/* # the others: far ahead down the track */}
      {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, age + k * 3, 4)}><Mini look={k % 2 ? 'hero-fit' : 'hero-rich'} x={lerp(700, 960, span(f, age, ahead + 30)) - k * 60} y={GROUND - 30 + (k % 2) * 60} scale={1.1} frame={f} seed={190 + k} mood="happy" /></g>)}
      <g opacity={on(f, miles, 6) * (1 - on(f, s1b, 6))}><Tag x={760} y={560} text="MILES AHEAD" s={pop(f, miles)} size={56} fill={GOLD} /></g>
      {/* # the feed */}
      {phoneUp > 0.01 && <g transform={`translate(0 ${lerp(900, 0, phoneUp)})`}>
        <FeedPhone x={700} y={720} s={0.95}>
          <g transform={`translate(0 ${-scroll * 300})`}>
            <Post y={-170} kind="house" label="JUST BOUGHT A HOUSE!" />
            <Post y={130} kind="shop" label="LAUNCHED MY BUSINESS" />
            <Post y={430} kind="ring" label="SHE SAID YES!!" />
          </g>
        </FeedPhone>
      </g>}
      <g opacity={on(f, years, 6) * (1 - on(f, s3, 6))}><Tag x={720} y={560} text="YEARS BEHIND" s={pop(f, years)} size={64} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, who, 6)}><Tag x={720} y={560} text="BEHIND WHO?" s={pop(f, who) * 1.15} size={76} fill={GOLD} /></g>
      <g opacity={on(f, telling, 6)}><Tag x={720} y={720} text="WHAT IT ISN'T TELLING YOU" s={pop(f, telling)} size={42} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={lerp(300, 180, fall)} s={lerp(0.9, 0.8, fall)} />
      <Headline text={f < s2 ? 'EVERYONE AHEAD?' : ''} o={f < s2 ? on(f, s1, 8) * (1 - on(f, s2 - 4, 4)) : 0} color={INK} />
      <BVig id="bhh" />
    </g>
  )
}

const Unfair: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), decades = c('s4:decades'), judge = c('s4:judge'), comparing = c('s4:comparing'), people = c('s4:people')
  const s5 = c('s5'), problem = c('s5:problem'), compare = c('s5:compare')
  const s6 = c('s6'), best = c('s6:best'), chosen = c('s6:chosen'), posted = c('s6:posted')
  const s7 = c('s7'), all = c('s7:all'), doubts = c('s7:doubts'), bad = c('s7:bad'), bank = c('s7:bank')
  const s8 = c('s8'), whole = c('s8:whole'), highlight = c('s8:highlight'), fair = c('s8:fair')
  const s8b = c('s8b'), nobody = c('s8b:nobody'), rejection = c('s8b:rejection'), argument = c('s8b:argument'), cried = c('s8b:cried')

  const A = win(f, 0, s6 + 4), B = win(f, s6, s8b + 4), C = on(f, s8b, 10)
  const tilt = lerp(0, -14, easeOut(span(f, comparing, people + 10)))
  const hero: Beat[] = [[s4, 'idle', 'thinking'], [judge, 'weighA', 'thinking'], [comparing, 'weighB', 'worried'], [s5, 'idle', 'neutral'], [s6, 'point', 'neutral'], [s7, 'holdChest', 'worried'], [bank, 'emptyPockets', 'worried'], [fair, 'crossNoA', 'neutral'], [s8b, 'idle', 'thinking'], [cried, 'holdChest', 'worried']]
  const theirs = ['trophy', 'beach', 'ring']

  return (
    <g>
      <Stadium id="bhu" lanes={false} />
      {A > 0.001 && <g opacity={A}>
        {/* # the comparison scale */}
        <g transform={`translate(720 860)`} opacity={on(f, judge, 6)}>
          <rect x={-10} y={-20} width={20} height={300} fill={INK} /><path d="M-90 280 L90 280 L60 250 L-60 250 Z" fill={INK} />
          <g transform={`rotate(${tilt})`}>
            <rect x={-300} y={-30} width={600} height={20} rx={10} fill={TRACK_D} stroke={INK} strokeWidth={4} />
            <g transform="translate(-250 0)"><path d="M-90 0 L90 0 L60 90 L-60 90 Z" fill={CREAM} stroke={INK} strokeWidth={4} /><text y={60} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>ME</text></g>
            <g transform="translate(250 0)"><path d="M-90 0 L90 0 L60 90 L-60 90 Z" fill={GOLD} stroke={INK} strokeWidth={4} /><text y={60} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>THEM</text></g>
          </g>
        </g>
        <g opacity={on(f, decades, 6) * (1 - on(f, s5, 6))}><Tag x={720} y={560} text="SOCIAL COMPARISON" s={pop(f, decades)} size={54} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, problem, 6)}><Tag x={720} y={560} text={f >= compare ? 'COMPARED AGAINST WHAT?' : 'THE PROBLEM'} s={pop(f, f >= compare ? compare : problem)} size={50} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Strip x={560} y={780} n={3} s={0.95} label="THEIR HIGHLIGHTS">{(k) => <g opacity={on(f, best + k * 4, 4)} transform="scale(0.27)"><Post y={0} kind={theirs[k] as 'trophy'} label="" /></g>}</Strip>
        <g opacity={on(f, all, 6)}>
          <Strip x={860} y={780} n={3} s={0.95} tone="#5A4A60" label="YOUR WHOLE STORY">{(k) => <g opacity={on(f, [doubts, bad, bank][k], 4)}>
            {k === 0 && <text y={20} textAnchor="middle" fill={INK} style={{ font: '400 60px "Bebas Neue"' }}>???</text>}
            {k === 1 && <g><ellipse cy={-10} rx={36} ry={20} fill="#9AA3B5" />{[0, 1, 2].map((j) => <path key={j} d={`M${-20 + j * 20} 14 l-6 18`} stroke="#6FA8D8" strokeWidth={4} />)}</g>}
            {k === 2 && <text y={16} textAnchor="middle" fill="#D2463C" style={{ font: '400 42px "Bebas Neue"' }}>£12.40</text>}
          </g>}</Strip>
        </g>
        <g opacity={on(f, chosen, 6) * (1 - on(f, s7, 6))}><Tag x={560} y={420} text="CHOSEN · EDITED · POSTED" s={pop(f, chosen)} size={40} /></g>
        <g opacity={on(f, fair, 6)}><Tag x={720} y={420} text="NOT A FAIR RACE" s={pop(f, fair)} size={58} fill={GOLD} /></g>
        <Person f={f} who="hero-struggling" beats={hero} x={220} s={0.88} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # the curtain: what nobody posts */}
        <rect x={420} y={460} width={600} height={620} rx={10} fill="#6C5072" stroke={INK} strokeWidth={6} />
        {([['REJECTION EMAIL', rejection], ['THE ARGUMENT', argument], ['CRYING IN THE CAR', cried]] as const).map(([t, at], k) => (
          <g key={t} opacity={on(f, at, 5)}><Tag x={720} y={600 + k * 170} text={t} s={pop(f, at)} size={46} fill={CREAM} ink={INK} r={-3 + k * 3} /><text x={720} y={600 + k * 170 + 80} textAnchor="middle" fill="#FFB3B3" style={{ font: '400 40px "Bebas Neue"' }}>NOT POSTED</text></g>
        ))}
        <g opacity={on(f, nobody, 6)}><Tag x={720} y={420} text="NOBODY POSTS THIS" s={pop(f, nobody)} size={52} fill={GOLD} /></g>
        <Person f={f} who="hero-struggling" beats={hero} x={220} s={0.88} />
      </g>}
      <Headline text={f < s6 ? 'WE COMPARE' : f < s8b ? 'HIGHLIGHT REEL' : 'BEHIND THE CURTAIN'} o={f < s6 ? on(f, judge, 8) * (1 - on(f, s6 - 4, 4)) : f < s8b ? on(f, highlight, 8) * (1 - on(f, s8b - 4, 4)) + on(f, s6, 8) * (1 - on(f, highlight, 4)) * 0 : on(f, s8b, 8)} color={INK} />
      <BVig id="bhu" />
    </g>
  )
}

const Timeline: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), timeline = c('s9:timeline'), head = c('s9:head'), wrong = c('s9:wrong')
  const s10 = c('s10'), economists = c('s10:economists'), million = c('s10:million'), founders = c('s10:founders'), successful = c('s10:successful')
  const s11 = c('s11'), picture = c('s11:picture'), genius = c('s11:genius'), hoodie = c('s11:hoodie')
  const s12 = c('s12'), average = c('s12:average'), fastest = c('s12:fastest'), n45 = c('s12:45')
  const s13 = c('s13'), julia = c('s13:julia'), cookbook = c('s13:cookbook'), n49 = c('s13:49')
  const s14 = c('s14'), later = c('s14:later'), schedule = c('s14:schedule')
  const s14b = c('s14b'), twenty = c('s14b:twenty'), thirty = c('s14b:thirty'), fifty = c('s14b:fifty'), time = c('s14b:time')

  const Y = 1000
  const cross = easeOut(span(f, average - 4, average + 8))

  return (
    <g>
      <Stadium id="bht" lanes={false} />
      <rect x={40} y={420} width={1000} height={760} rx={30} fill={CREAM} opacity={0.92} stroke={INK} strokeWidth={5} />
      <Ruler y={Y} o={on(f, s9, 8)} />
      <text x={CX} y={Y + 150} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }} opacity={on(f, s9, 8)}>AGE</text>
      <Pin age={25} y={Y} label="HEAD: BY 25?" tone={PINK} o={on(f, head, 6) * (1 - on(f, s10, 8))} s={pop(f, head)} up={180} />
      <g opacity={on(f, wrong, 6) * (1 - on(f, s10, 6))}><Tag x={CX} y={520} text="OFTEN JUST WRONG" s={pop(f, wrong)} size={52} fill={GOLD} /></g>
      <g opacity={on(f, economists, 6) * (1 - on(f, s12, 8))}><Tag x={CX} y={520} text={f >= million ? '~2.7 MILLION FOUNDERS' : 'ECONOMISTS LOOKED'} s={pop(f, f >= million ? million : economists)} size={50} fill={CREAM} ink={BURG} /></g>
      {/* # the "20-year-old in a hoodie" guess, crossed out on "average" */}
      <g opacity={on(f, genius, 6) * (1 - on(f, s13, 8))}>
        <Pin age={20} y={Y} label="GENIUS, 20?" tone={PINK} up={260} />
        <path d={`M${ageX(20) - 170} ${Y - 300} L${lerp(ageX(20) - 170, ageX(20) + 170, cross)} ${Y - 240}`} stroke="#D2463C" strokeWidth={12} strokeLinecap="round" />
      </g>
      <Pin age={45} y={Y} label="AVERAGE: 45" tone={GOLD} o={on(f, n45, 6) * (1 - on(f, cookbook, 8))} s={pop(f, n45)} up={lerp(400, 180, easeOut(span(f, n45, n45 + 10)))} />
      <g opacity={on(f, fastest, 6) * (1 - on(f, s13, 6))}><Tag x={CX} y={520} text="FASTEST-GROWING COMPANIES" s={pop(f, fastest)} size={44} /></g>
      {/* # Julia Child's cookbook at 49 (it and the AVERAGE pin leave when the ON TIME flags arrive — owner: no piled-up boxes) */}
      <g opacity={on(f, cookbook, 6) * (1 - on(f, s14b, 8))}>
        <Pin age={49} y={Y} label="JULIA CHILD, 49" tone="#9FD3F2" up={320} s={pop(f, n49 > 0 ? cookbook : cookbook)} />
        <g transform={`translate(${ageX(49)} ${Y - 450}) rotate(-6)`}><rect x={-60} y={-70} width={120} height={140} rx={8} fill={BURG} stroke={INK} strokeWidth={5} /><text y={-10} textAnchor="middle" fill={CREAM} style={{ font: '400 26px "Bebas Neue"' }}>FIRST</text><text y={22} textAnchor="middle" fill={CREAM} style={{ font: '400 26px "Bebas Neue"' }}>COOKBOOK</text></g>
      </g>
      <g opacity={on(f, julia, 6) * (1 - on(f, s14, 6))}><Tag x={330} y={520} text="THE FAMOUS COOK" s={pop(f, julia)} size={46} /></g>
      <g opacity={on(f, schedule, 6) * (1 - on(f, s14b, 6))}><Tag x={330} y={520} text="NO ONE SCHEDULE" s={pop(f, schedule)} size={52} fill={GOLD} /></g>
      <g opacity={on(f, later, 6) * (1 - on(f, schedule, 6))}><Tag x={330} y={520} text="LATER THAN EXPECTED" s={pop(f, later)} size={46} /></g>
      {([[20, twenty], [35, thirty], [50, fifty]] as const).map(([a, at]) => <Pin key={a} age={a} y={Y} label="ON TIME" tone="#7DB06B" o={on(f, at, 5) * (s14b ? 1 : 1)} s={pop(f, at)} up={a === 35 ? 140 : 100} />)}
      <g opacity={on(f, time, 6)}><Tag x={CX} y={520} text="RIGHT ON TIME FOR THEIR LIVES" s={pop(f, time)} size={44} fill={GOLD} /></g>
      <Headline text={f < s10 ? 'THE TIMELINE IN YOUR HEAD' : f < s14 ? 'THE REAL TIMELINE' : ''} o={f < s10 ? on(f, timeline, 8) * (1 - on(f, s10 - 4, 4)) : f < s14 ? on(f, successful, 8) * (1 - on(f, s14 - 4, 4)) : 0} color={INK} />
      <BVig id="bht" />
    </g>
  )
}

const Clock: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), feeling = c('s15:feeling'), three = c('s15:three')
  const s16 = c('s16'), first = c('s16:first'), year = c('s16:year'), someone = c('s16:someone')
  const s16b = c('s16b'), stronger = c('s16b:stronger'), calmer = c('s16b:calmer'), wiser = c('s16b:wiser'), scoreboard = c('s16b:scoreboard')
  const s17 = c('s17'), second = c('s17:second'), highlight = c('s17:highlight'), whole = c('s17:whole')
  const s18 = c('s18'), third = c('s18:third'), mute = c('s18:mute'), small = c('s18:small'), protect = c('s18:protect')
  const s19 = c('s19'), late = c('s19:late'), clock = c('s19:clock')
  const s20 = c('s20'), race = c('s20:race'), yesterday = c('s20:yesterday')
  const s20b = c('s20b'), step = c('s20b:step'), moving = c('s20b:moving'), see = c('s20b:see')
  const s21 = c('s21'), winning = c('s21:winning'), today = c('s21:today')

  const A = win(f, 0, s19 + 4), B = on(f, s19, 10)
  const run = span(f, race, winning)
  const heroA: Beat[] = [[s15, 'explain', 'neutral'], [three, 'countA', 'smiling'], [first, 'countOne', 'neutral'], [stronger, 'fistPump', 'smiling'], [second, 'point', 'neutral'], [third, 'phone', 'neutral'], [mute, 'thumbsUp', 'smiling']]
  const heroB: Beat[] = [[s19, 'confident', 'smiling'], [race, 'runA', 'smiling'], [race + 8, 'runB', 'smiling'], [race + 16, 'runA', 'smiling'], [race + 24, 'runB', 'smiling'], [race + 32, 'runA', 'smiling'], [race + 40, 'runB', 'smiling'], [race + 48, 'runA', 'smiling'], [race + 56, 'runB', 'smiling'], [race + 64, 'runA', 'smiling'], [race + 72, 'runB', 'smiling'], [race + 80, 'runA', 'smiling'], [race + 88, 'runB', 'smiling'], [winning, 'celebrate', 'smiling']]
  const ghost: Beat[] = [[s16, 'idle', 'neutral'], [race, 'runA', 'neutral'], [race + 9, 'runB', 'neutral'], [race + 18, 'runA', 'neutral'], [race + 27, 'runB', 'neutral'], [race + 36, 'runA', 'neutral'], [race + 45, 'runB', 'neutral'], [race + 54, 'runA', 'neutral'], [race + 63, 'runB', 'neutral'], [race + 72, 'runA', 'neutral'], [race + 81, 'runB', 'neutral']]

  return (
    <g>
      <Stadium id="bhc" />
      {A > 0.001 && <g opacity={A}>
        {/* # card 1: you, a year ago, walks beside you */}
        <g opacity={on(f, year, 8) * (1 - on(f, s17, 8))}><g opacity={0.45}><Person f={f} who="hero-struggling" beats={ghost} x={470} s={0.82} /></g><Tag x={470} y={GROUND - 640} text="YOU, A YEAR AGO" s={pop(f, year)} size={40} /></g>
        <g opacity={on(f, stronger, 6) * (1 - on(f, s17, 8))} transform="translate(800 680)">
          <rect x={-190} y={-170} width={380} height={340} rx={18} fill={INK} />
          <text y={-110} textAnchor="middle" fill={GOLD} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 4 }}>{f >= scoreboard ? 'THE SCOREBOARD' : 'VS LAST YEAR'}</text>
          {([['STRONGER', stronger], ['CALMER', calmer], ['WISER', wiser]] as const).map(([t, at], k) => <text key={t} x={-140} y={-30 + k * 70} fill={CREAM} opacity={on(f, at, 4)} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{`✓ ${t}`}</text>)}
        </g>
        {/* # numbered cards */}
        {([['1', first, 'COMPARE TO PAST YOU'], ['2', second, 'IT\'S A HIGHLIGHT REEL'], ['3', third, 'MUTE WHAT SHRINKS YOU']] as const).map(([n, at, t], k) => (
          <g key={n} opacity={on(f, at, 6) * (1 - on(f, k < 2 ? [s17, s18][k] : s19, 6))}><Tag x={CX} y={480} text={`${n} · ${t}`} s={pop(f, at)} size={48} fill={k === 1 ? GOLD : CREAM} ink={INK} /></g>
        ))}
        <g opacity={on(f, highlight, 6) * (1 - on(f, s18, 6))}><Strip x={800} y={780} n={3} s={0.8}>{(k) => <text y={20} textAnchor="middle" fill={GOLD} style={{ font: '400 60px "Bebas Neue"' }}>★</text>}</Strip></g>
        <g opacity={on(f, mute, 6) * (1 - on(f, s19, 6))} transform={`translate(800 760) scale(${pop(f, mute)})`}>
          <rect x={-130} y={-200} width={260} height={400} rx={30} fill={INK} /><rect x={-112} y={-180} width={224} height={360} rx={18} fill="#FFFFFF" />
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(0 ${-110 + k * 110})`}><circle cx={-60} r={30} fill={PINK} /><rect x={-20} y={-12} width={90} height={24} rx={12} fill={INK} opacity={0.3} /><text x={60} y={60} textAnchor="middle" fill="#D2463C" style={{ font: '400 30px "Bebas Neue"' }} opacity={on(f, small + k * 4, 4)}>MUTED</text></g>)}
        </g>
        <g opacity={on(f, protect, 6) * (1 - on(f, s19, 6))}><Tag x={CX} y={600} text="PROTECT YOUR MIND" s={pop(f, protect)} size={50} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroA} x={240} s={0.88} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # your own clock */}
        <g opacity={on(f, clock, 6) * (1 - on(f, s20, 8))} transform={`translate(${CX} 680) scale(${pop(f, clock)})`}>
          <circle r={200} fill={CREAM} stroke={GOLD} strokeWidth={22} /><circle r={16} fill={INK} />
          <path d={`M0 0 L${Math.sin(f / 10) * 140} ${-Math.cos(f / 10) * 140}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          <text y={110} textAnchor="middle" fill={BURG} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 4 }}>YOUR CLOCK</text>
        </g>
        <g opacity={on(f, late, 6) * (1 - on(f, clock, 6))}><Tag x={CX} y={560} text="NOT LATE" s={pop(f, late)} size={80} fill={GOLD} /></g>
        {/* # the race against yesterday's you */}
        <g opacity={on(f, race, 8)}>
          <g opacity={0.45}><Person f={f} who="hero-struggling" beats={ghost} x={lerp(160, 760, run * 0.9)} y={GROUND + 40} s={0.8} /></g>
          <g opacity={on(f, yesterday, 6)}><Tag x={lerp(160, 760, run * 0.9)} y={GROUND - 600} text="YESTERDAY'S YOU" s={pop(f, yesterday)} size={36} /></g>
          <rect x={940} y={GROUND - 420} width={12} height={420} fill={CREAM} />
          <path d={`M946 ${GROUND - 300} L${f >= winning ? 1000 : 946} ${GROUND - 300}`} stroke={GOLD} strokeWidth={10} />
          <g opacity={on(f, today, 6)}><Tag x={760} y={560} text="WIN TODAY" s={pop(f, today)} size={76} fill={GOLD} /></g>
          <g opacity={on(f, moving, 6) * (1 - on(f, s21, 6))}><Tag x={760} y={560} text="PROOF YOU'RE MOVING" s={pop(f, moving)} size={50} fill={CREAM} ink={BURG} /></g>
        </g>
        <Person f={f} who="hero" beats={heroB} x={f < race ? 240 : lerp(240, 900, run)} s={0.85} />
      </g>}
      <Headline text={f < s16 ? 'TRY THREE THINGS' : f < s19 ? '' : f < s20 ? 'YOUR OWN CLOCK' : 'THE ONLY RACE'} o={f < s16 ? on(f, three, 8) * (1 - on(f, s16 - 4, 4)) : f < s19 ? 0 : f < s20 ? on(f, clock, 8) * (1 - on(f, s20 - 4, 4)) : on(f, race, 8)} color={INK} />
      <BVig id="bhc" />
    </g>
  )
}

export const BH_HOOK = makePiece('bh-hook', 'Behind: everyone your age is miles ahead', {
  beats: ['s1', 's1:age', 's1:miles', 's1:ahead', 's1b', 's1b:phone', 's1b:house', 's1b:business', 's1b:engaged', 's2', 's2:years', 's2:behind', 's3', 's3:who', 's3:feeling', 's3:telling'],
  sfx: [['s1b:house', 'pop'], ['s1b:business', 'pop'], ['s1b:engaged', 'ding'], ['s2:behind', 'thud'], ['s3:who', 'whoosh']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const BH_UNFAIR = makePiece('bh-unfair', 'Behind: your whole story vs their highlight reel', {
  beats: ['s4', 's4:decades', 's4:judge', 's4:comparing', 's4:people', 's5', 's5:problem', 's5:who', 's5:what', 's5:compare', 's6', 's6:best', 's6:chosen', 's6:posted', 's7', 's7:all', 's7:doubts', 's7:bad', 's7:bank', 's8', 's8:whole', 's8:highlight', 's8:fair', 's8b', 's8b:nobody', 's8b:rejection', 's8b:argument', 's8b:cried'],
  sfx: [['s4:comparing', 'tick'], ['s6:best', 'pop'], ['s7:bank', 'coin'], ['s8:fair', 'thud'], ['s8b:rejection', 'swish'], ['s8b:argument', 'swish'], ['s8b:cried', 'swish']],
  Component: Unfair, mood: 'light', canvas: 'tall',
})
export const BH_TIMELINE = makePiece('bh-timeline', 'Behind: the real timeline (45, Julia Child at 49)', {
  beats: ['s9', 's9:timeline', 's9:head', 's9:wrong', 's10', 's10:economists', 's10:million', 's10:founders', 's10:successful', 's11', 's11:picture', 's11:genius', 's11:hoodie', 's12', 's12:average', 's12:fastest', 's12:45', 's13', 's13:julia', 's13:cookbook', 's13:49', 's14', 's14:later', 's14:expected', 's14:life', 's14:schedule', 's14b', 's14b:twenty', 's14b:thirty', 's14b:fifty', 's14b:time'],
  sfx: [['s9:head', 'pop'], ['s10:million', 'ding'], ['s12:average', 'swish'], ['s12:45', 'impact'], ['s13:49', 'ding'], ['s14b:twenty', 'pop'], ['s14b:thirty', 'pop'], ['s14b:fifty', 'pop']],
  Component: Timeline, mood: 'light', canvas: 'tall',
})
export const BH_CLOCK = makePiece('bh-clock', 'Behind: three things, your own clock, race yesterday', {
  beats: ['s15', 's15:feeling', 's15:three', 's16', 's16:first', 's16:year', 's16:someone', 's16b', 's16b:stronger', 's16b:calmer', 's16b:wiser', 's16b:last', 's16b:year', 's16b:scoreboard', 's17', 's17:second', 's17:remember', 's17:scrolling', 's17:highlight', 's17:whole', 's18', 's18:third', 's18:mute', 's18:small', 's18:protect', 's19', 's19:late', 's19:clock', 's20', 's20:only', 's20:race', 's20:matters', 's20:between', 's20:yesterday', 's20b', 's20b:step', 's20b:moving', 's20b:see', 's21', 's21:winning', 's21:today'],
  sfx: [['s16:first', 'pop'], ['s16b:stronger', 'tick'], ['s16b:calmer', 'tick'], ['s16b:wiser', 'tick'], ['s17:second', 'pop'], ['s18:third', 'pop'], ['s18:mute', 'click'], ['s19:clock', 'ding'], ['s20:race', 'whoosh'], ['s21:today', 'chime']],
  Component: Clock, mood: 'light', canvas: 'tall',
})
