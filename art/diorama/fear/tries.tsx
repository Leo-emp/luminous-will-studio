// ---------------------------------------------------------------- "Why You're So Afraid of Failing" — part 3 (s44–s68)
// DYSON s44–s52) a sunny garage workshop: James Dyson (labelled) with an old vacuum that coughs dust (LOSING SUCTION).
//    He builds a prototype — ✗ — changes one thing — ✗; shelves fill with prototypes while a counter runs up to 5,127;
//    a quote card: 5,126 FAILURES · BUT HE LEARNED FROM EACH ONE. "Most of us would have stopped at 3": a little
//    figure walks off after three. A stamp: FAILED → becomes a ruler-tag: A MEASUREMENT. SAME FAILURE · DIFFERENT WEIGHT
//    (two equal blocks, one feather-light).
// REGRET s53–s59) a summer park path and a timeline arrow: SHORT TERM — a bag of regret about THINGS YOU DID is big,
//    then over MANY YEARS it shrinks to a funny story, while THINGS YOU NEVER TRIED grows: an open door glowing with
//    "what if…". Gilovich & Medvec as a study card (not drawn as people).
// JIANG s60–s68) Jia Jiang (labelled) with a 100-DAY calendar. Day 1: a stranger, CAN I BORROW $100? → NO, he runs.
//    Day 3: a doughnut shop — the worker makes doughnuts shaped like the Olympic rings. The calendar fills with NO and
//    YES stamps; a fear balloon above his head shrinks; AVOID IT → IT GROWS · FACE IT → IT SHRINKS.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Mini } from '../../rig/Mini'
import {
  Cloud, Headline, Mark, NameTag, Person, Say, Sky, SunDisc, Tag, Vig, walkBeats, win,
  AQUA, AQUA_D, BURG, CORAL, CORAL_D, CREAM, GOLD, GOLD_L, GREY, INK, LEAF, SAND, SUN, SUN_L, TILE, CX, GROUND, W, H, on, pop, lerp, span, easeOut, type Beat,
} from './kit'

// # a prototype vacuum: a clear cylinder with a cyclone swirl; `v` picks a little variation
const Proto: React.FC<{ x: number; y: number; s?: number; v?: number; spin?: number }> = ({ x, y, s = 1, v = 0, spin = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-150} width={80} height={130} rx={30} fill="#DDF3F6" stroke={INK} strokeWidth={4} />
    <path d={`M-24 ${-120 + (v % 3) * 6} q24 16 48 0 M-24 -90 q24 16 48 0 M-24 -60 q24 16 48 0`} stroke={AQUA_D} strokeWidth={4} fill="none" transform={`rotate(${spin} 0 -85)`} />
    <rect x={-50} y={-20} width={100} height={30} rx={10} fill={[SUN, CORAL, '#C7A6E0', LEAF][v % 4]} stroke={INK} strokeWidth={4} />
    <path d={`M30 -150 Q${60 + (v % 2) * 20} -200 20 -230`} stroke={GREY} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
)

const Dyson: React.FC<PieceProps> = ({ f, c }) => {
  const s44 = c('s44'), lucky = c('s44:lucky'), another = c('s44:another')
  const s45 = c('s45'), dyson = c('s45:dyson'), annoyed = c('s45:annoyed'), suction = c('s45:suction'), build = c('s45:build')
  const s46 = c('s46'), prototype = c('s46:prototype'), work = c('s46:work'), changed = c('s46:changed'), either = c('s46:either')
  const s47 = c('s47'), right = c('s47:right'), thousand = c('s47:thousand'), twentyseven = c('s47:twentyseven'), hand = c('s47:hand')
  const s48 = c('s48'), later = c('s48:later'), failures = c('s48:failures'), learned = c('s48:learned')
  const s49 = c('s49'), stopped = c('s49:stopped'), three = c('s49:three')
  const s50 = c('s50'), lazy = c('s50:lazy'), verdict = c('s50:verdict')
  const s51 = c('s51'), measurement = c('s51:measurement'), failed = c('s51:failed'), version = c('s51:version'), know = c('s51:know'), new2 = c('s51:new')
  const s52 = c('s52'), same = c('s52:same'), different = c('s52:different'), weight = c('s52:weight')

  const A = win(f, 0, s49 + 2), B = win(f, s49, s51 + 2), C = on(f, s51, 10)
  const count = Math.round(lerp(2, 5127, Math.pow(span(f, s47, twentyseven + 6), 2)))
  const shown = Math.min(40, Math.floor(lerp(0, 40, span(f, s47, twentyseven + 6))))
  const him: Beat[] = [[0, 'idle', 'neutral'], [dyson, 'waveA', 'smiling'], [dyson + 10, 'idle', 'neutral'], [annoyed, 'angry', 'angry'], [suction, 'facepalm', 'worried'], [build, 'pointUp', 'smiling'],
    [prototype, 'hold', 'thinking'], [work, 'shrug', 'worried'], [changed, 'scratchHead', 'thinking'], [either, 'facepalm', 'worried'], [s47, 'type', 'neutral'], [right, 'celebrate', 'smiling'], [s48, 'present', 'smiling'], [learned, 'countOne', 'smiling']]
  const me: Beat[] = [[s49, 'hold', 'neutral'], [stopped, 'shrug', 'worried'], ...walkBeats(three + 6, three + 50, 'worried'), [three + 50, 'slump', 'worried'], [lazy, 'crossNoA', 'neutral'], [verdict, 'despair', 'worried']]
  const him2: Beat[] = [[s51, 'idle', 'neutral'], [measurement, 'measure', 'smiling'], [c('s51:instead'), 'explain', 'neutral'], [version, 'explain', 'neutral'], [know, 'pointUp', 'smiling'], [s52, 'present', 'smiling'], [different, 'weighA', 'smiling']]
  const stamp = on(f, failed, 6), morph = on(f, version, 10)

  return (
    <g>
      {/* # the garage workshop */}
      <rect width={W} height={H} fill="#DCEEF5" />
      <rect x={0} y={GROUND - 20} width={W} height={H} fill="#C7CED6" />
      {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={GROUND - 20} width={4} height={H} fill="#B3BAC3" />)}
      <rect x={120} y={90} width={400} height={230} rx={10} fill="#FFFFFF" stroke="#B3BAC3" strokeWidth={14} />
      <path d="M320 90 L320 320" stroke="#B3BAC3" strokeWidth={10} />
      <SunDisc x={430} y={190} r={40} f={f} />
      {A > 0.001 && <g opacity={A}>
        <Headline text="HERE'S ANOTHER ONE" o={win(f, lucky, s45 + 4)} />
        {/* # the old vacuum coughing dust */}
        <g opacity={win(f, s45, s46 + 4)} transform={`translate(1160 ${GROUND - 20})`}>
          <rect x={-90} y={-160} width={180} height={160} rx={30} fill="#9AA3B0" stroke={INK} strokeWidth={5} />
          <text y={-70} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>OLD VACUUM</text>
          {f >= suction && Array.from({ length: 6 }, (_, k) => <circle key={k} cx={110 + ((f - suction) * 3 + k * 30) % 200} cy={-120 - k * 14} r={14 + k * 3} fill={GREY} opacity={0.5} />)}
        </g>
        <g opacity={win(f, suction, s46)}><Tag x={1160} y={560} text="KEEPS LOSING SUCTION" fill={CORAL} ink="#FFFFFF" s={pop(f, suction)} /></g>
        {/* # prototype 1 and 2 */}
        <g opacity={win(f, s46, s47 + 4)}>
          <Proto x={980} y={GROUND - 20} v={0} s={pop(f, prototype) * 1.3} />
          <Mark x={980} y={GROUND - 380} ok={false} s={pop(f, work) * 0.7} o={on(f, work, 6)} />
          <Proto x={1300} y={GROUND - 20} v={1} s={pop(f, changed) * 1.3} />
          <Mark x={1300} y={GROUND - 380} ok={false} s={pop(f, either) * 0.7} o={on(f, either, 6)} />
          <g opacity={on(f, changed, 8)}><Tag x={1140} y={260} text="CHANGE ONE THING" fill={SUN_L} size={48} /></g>
        </g>
        {/* # the shelves fill up + the counter */}
        <g opacity={on(f, s47, 10)}>
          {[0, 1].map((row) => <rect key={row} x={780} y={420 + row * 170} width={1100} height={14} fill="#B98A5E" stroke={INK} strokeWidth={3} />)}
          {Array.from({ length: shown }, (_, k) => <Proto key={k} x={820 + (k % 20) * 53} y={420 + Math.floor(k / 20) * 170} s={0.42} v={k} />)}
          <g transform={`translate(1330 ${GROUND - 60})`}>
            <rect x={-260} y={-80} width={520} height={130} rx={20} fill={INK} />
            <text y={30} textAnchor="middle" fill={SUN} style={{ font: '400 110px "Bebas Neue"', letterSpacing: 6 }}>{count.toLocaleString('en-US')}</text>
          </g>
          <g opacity={on(f, hand, 8)}><Tag x={1330} y={GROUND - 190} text="PROTOTYPES · BY HAND" fill="#FFFFFF" size={40} /></g>
        </g>
        {/* # his words */}
        <g opacity={on(f, s48, 10)} transform="translate(1330 180)">
          <rect x={-460} y={-90} width={920} height={180} rx={24} fill={BURG} stroke={INK} strokeWidth={5} />
          <text y={-12} textAnchor="middle" fill={CREAM} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>5,126 FAILURES</text>
          <text y={58} textAnchor="middle" fill={GOLD_L} opacity={on(f, learned, 8)} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>BUT HE LEARNED FROM EACH ONE</text>
        </g>
        <Person f={f} who="lib-dyson" beats={him} x={420} s={0.68} />
        <NameTag x={420} y={GROUND - 520} name="JAMES DYSON" o={on(f, dyson, 8)} s={0.85} />
      </g>}
      {/* # most of us would have stopped at three */}
      {B > 0.001 && <g opacity={B}>
        {[0, 1, 2].map((k) => <g key={k}><Proto x={900 + k * 200} y={GROUND - 20} v={k} s={1.2} /><Mark x={900 + k * 200} y={GROUND - 340} ok={false} s={0.6} o={on(f, stopped + k * 6, 6)} /></g>)}
        <Person f={f} who="hero-struggling" beats={me} x={lerp(700, 300, easeOut(span(f, three + 6, three + 50)))} s={0.62} />
        <Headline text={f >= three ? 'MOST OF US STOP AT 3' : ''} o={on(f, three, 8)} color={CORAL_D} />
        <g opacity={on(f, lazy, 8)}><Tag x={1300} y={300} text="NOT LAZY" fill="#FFFFFF" s={pop(f, lazy)} /></g>
        <g opacity={on(f, verdict, 8)} transform={`translate(1300 470) rotate(-4) scale(${pop(f, verdict)})`}>
          <rect x={-260} y={-60} width={520} height={120} rx={12} fill={GREY} stroke={INK} strokeWidth={5} />
          <text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>A VERDICT ON ME</text>
        </g>
      </g>}
      {/* # a measurement, not a verdict */}
      {C > 0.001 && <g opacity={C}>
        <Person f={f} who="lib-dyson" beats={him2} x={380} s={0.68} />
        <NameTag x={380} y={GROUND - 520} name="JAMES DYSON" o={1} s={0.8} />
        <Proto x={760} y={GROUND - 20} v={2} s={1.3} spin={f * 3} />
        <g transform={`translate(1240 320) rotate(${lerp(-8, 0, morph)})`} opacity={on(f, measurement - 4, 8) * (1 - on(f, s52, 8))}>
          <g opacity={stamp * (1 - morph)} transform={`scale(${lerp(1.5, 1, stamp)})`}>
            <rect x={-220} y={-70} width={440} height={140} rx={14} fill="none" stroke={CORAL} strokeWidth={10} />
            <text y={30} textAnchor="middle" fill={CORAL} style={{ font: '400 100px "Bebas Neue"', letterSpacing: 8 }}>I FAILED</text>
          </g>
          <g opacity={Math.max(morph, f < failed ? 1 : 0)}>
            <rect x={-300} y={-60} width={600} height={120} rx={10} fill={SUN} stroke={INK} strokeWidth={5} />
            {Array.from({ length: 21 }, (_, k) => <rect key={k} x={-290 + k * 29} y={-60} width={4} height={k % 5 ? 30 : 50} fill={INK} />)}
            <text y={44} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 4 }}>A MEASUREMENT</text>
          </g>
        </g>
        <Say x={1260} y={600} lines={["THAT VERSION DOESN'T WORK", 'NOW I KNOW SOMETHING NEW']} o={on(f, version, 8) * (1 - on(f, s52, 8))} s={pop(f, know)} fill={SUN_L} size={46} />
        <g opacity={on(f, new2, 1)} />
        {/* # same failure, different weight: two blocks, one floats */}
        <g opacity={on(f, s52, 10)}>
          <g transform={`translate(1060 ${GROUND - 20})`}><rect x={-140} y={-200} width={280} height={200} rx={16} fill={GREY} stroke={INK} strokeWidth={5} /><text y={-90} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>FAILURE</text><text y={-30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>A VERDICT</text></g>
          <g transform={`translate(1520 ${GROUND - 20 - lerp(0, 220, easeOut(span(f, different, different + 20))) + Math.sin(f / 12) * 8 * on(f, different, 10)})`}><rect x={-140} y={-200} width={280} height={200} rx={16} fill={AQUA} stroke={INK} strokeWidth={5} /><text y={-90} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>FAILURE</text><text y={-30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>A MEASUREMENT</text></g>
          <Headline text={f >= weight ? 'SAME FAILURE · DIFFERENT WEIGHT' : 'SAME FAILURE'} o={on(f, same, 8)} />
        </g>
      </g>}
      <Vig id="ffy" />
      <defs><radialGradient id="ffy-vg" cx="0.5" cy="0.5" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.16} /></radialGradient></defs>
    </g>
  )
}

// ---------------------------------------------------------------- REGRET s53–s59
const Regret: React.FC<PieceProps> = ({ f, c }) => {
  const s53 = c('s53'), thinking = c('s53:thinking'), fine = c('s53:fine'), try53 = c('s53:try'), badly = c('s53:badly'), regret = c('s53:regret')
  const s54 = c('s54'), gilovich = c('s54:gilovich'), medvec = c('s54:medvec'), studied = c('s54:studied'), actually = c('s54:actually')
  const s55 = c('s55'), short = c('s55:short'), did = c('s55:did'), embarrassing = c('s55:embarrassing'), decision = c('s55:decision')
  const s56 = c('s56'), years = c('s56:years'), flips = c('s56:flips'), stay = c('s56:stay'), never = c('s56:never'), tried = c('s56:tried')
  const s57 = c('s57'), sting = c('s57:sting'), fades = c('s57:fades'), learn57 = c('s57:learn'), funny = c('s57:funny'), move = c('s57:move')
  const s58 = c('s58'), open = c('s58:open'), found = c('s58:found'), imagining = c('s58:imagining'), good = c('s58:good')
  const s59 = c('s59'), protecting = c('s59:protecting'), walking = c('s59:walking'), bigger = c('s59:bigger')

  // # the two regret bags along a timeline: DID (big → small), NEVER TRIED (small → big)
  const time = easeOut(span(f, years, stay + 10))
  const did2 = lerp(lerp(0, 1.2, on(f, did, 10)), 0.45, time) * lerp(1, 0.6, on(f, fades, 14))
  const nev = lerp(on(f, never - 10, 10) * 0.4, 1.35, Math.max(time * on(f, never, 10), on(f, never, 14)))
  const tl = on(f, short, 10)
  const hero: Beat[] = [[0, 'idle', 'thinking'], [thinking, 'think', 'thinking'], [fine, 'shrug', 'neutral'], [badly, 'nervous', 'worried'], [regret, 'despair', 'worried'], [s55, 'idle', 'neutral'], [c('s55:regret'), 'think', 'worried'], [did, 'facepalm', 'worried'],
    [s56, 'lookFar', 'thinking'], [never, 'shock', 'shocked'], [s57, 'idle', 'neutral'], [funny, 'clapA', 'smiling'], [funny + 8, 'clapB', 'smiling'], [move, 'walkA', 'smiling'], [move + 8, 'idle', 'smiling'],
    [s58, 'lookFar', 'thinking'], [imagining, 'think', 'thinking'], [s59, 'idle', 'worried'], ...walkBeats(walking, walking + 40, 'worried'), [walking + 40, 'slump', 'worried'], [bigger, 'despair', 'worried']]
  const hx = lerp(lerp(280, 280, 1), 1200, easeOut(span(f, walking, walking + 40)))
  const doorGlow = on(f, open, 12)

  return (
    <g>
      <Sky id="ffg" />
      <SunDisc x={1720} y={150} r={60} f={f} />
      <Cloud x={600} y={120} s={0.8} /><Cloud x={1250} y={180} s={0.6} />
      <path d={`M0 ${GROUND - 40} Q700 ${GROUND - 120} 1920 ${GROUND - 60} L1920 1080 L0 1080 Z`} fill="#9ED38E" />
      <path d={`M0 ${GROUND + 40} Q900 ${GROUND - 10} 1920 ${GROUND + 20} L1920 ${GROUND + 90} Q900 ${GROUND + 60} 0 ${GROUND + 120} Z`} fill={SAND} />
      {/* # the study card */}
      <g opacity={win(f, gilovich - 6, s55 + 6)} transform={`translate(1300 320) scale(${pop(f, gilovich - 6)})`}>
        <rect x={-330} y={-130} width={660} height={260} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <text y={-50} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>GILOVICH &amp; MEDVEC</text>
        <text y={10} textAnchor="middle" fill={GREY} opacity={on(f, medvec, 8)} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>A STUDY OF REGRET</text>
        <text y={80} textAnchor="middle" fill={BURG} opacity={on(f, actually, 8)} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>WHAT DO PEOPLE REGRET?</text>
      </g>
      <g opacity={on(f, studied, 1)} />
      <Say x={760} y={300} lines={f >= badly ? ['WHAT IF IT GOES BADLY?', "I'LL REGRET IT"] : ['WHAT IF I TRY…']} o={win(f, try53, s54 + 6)} s={pop(f, try53)} />
      {/* # the timeline */}
      {tl > 0.001 && <g opacity={tl * (1 - 0.85 * on(f, open, 10))}>
        <path d="M560 760 L1820 760" stroke={INK} strokeWidth={6} />
        <path d="M1820 760 l-30 -18 l0 36 Z" fill={INK} />
        <text x={620} y={820} fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>SHORT TERM</text>
        <text x={1820} y={820} textAnchor="end" fill={INK} opacity={on(f, years, 8)} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>MANY YEARS LATER</text>
        <circle cx={lerp(660, 1700, time)} cy={760} r={18} fill={CORAL} stroke={INK} strokeWidth={4} />
        {/* # regret bag: things you did */}
        <g transform={`translate(${lerp(820, 1000, time)} 600) scale(${did2})`} opacity={did2 > 0.01 ? 1 : 0}>
          <path d="M-110 -40 Q-130 120 0 130 Q130 120 110 -40 Q60 -80 0 -70 Q-60 -80 -110 -40 Z" fill={GREY} stroke={INK} strokeWidth={6} />
          <path d="M-40 -74 Q0 -120 40 -74" stroke={INK} strokeWidth={6} fill="none" />
          <text y={40} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{f >= funny ? 'A FUNNY STORY' : 'THINGS I DID'}</text>
        </g>
        <g opacity={on(f, embarrassing, 8) * (1 - time)}><Tag x={820} y={330} text="THE EMBARRASSING ATTEMPT" fill="#FFFFFF" size={40} /></g>
        <g opacity={on(f, decision, 8) * (1 - time)}><Tag x={820} y={420} text="THE BAD DECISION" fill="#FFFFFF" size={40} /></g>
        {/* # regret bag: things you never tried */}
        <g transform={`translate(${lerp(1240, 1340, time)} 560) scale(${nev})`} opacity={on(f, never - 10, 8)}>
          <path d="M-110 -40 Q-130 120 0 130 Q130 120 110 -40 Q60 -80 0 -70 Q-60 -80 -110 -40 Z" fill={CORAL} stroke={INK} strokeWidth={6} />
          <path d="M-40 -74 Q0 -120 40 -74" stroke={INK} strokeWidth={6} fill="none" />
          <text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>NEVER TRIED</text>
        </g>
        <Headline text={f >= flips ? 'THE PICTURE FLIPS' : 'SHORT TERM: WHAT YOU DID'} o={win(f, short, s57) * on(f, short, 8)} />
        <Headline text={f >= learn57 ? 'YOU LEARN · YOU MOVE ON' : 'THE STING FADES'} o={win(f, sting, s58)} color={LEAF} />
      </g>}
      {/* # the door that stays open */}
      <g opacity={on(f, open, 10)} transform={`translate(1640 ${GROUND - 40})`}>
        <rect x={-110} y={-380} width={220} height={380} fill={SUN_L} opacity={0.4 + 0.4 * doorGlow} />
        <rect x={-110} y={-380} width={220} height={380} fill="none" stroke={INK} strokeWidth={6} />
        <path d={`M-110 -380 L${lerp(-110, -40, doorGlow)} -350 L${lerp(-110, -40, doorGlow)} -30 L-110 0 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <Say x={0} y={-470} lines={['WHAT IF…?']} o={on(f, imagining, 8)} s={0.8 * pop(f, imagining)} />
        <g opacity={on(f, found, 8)}><Tag x={0} y={60} text="NEVER FOUND OUT" fill="#FFFFFF" size={36} /></g>
        <g opacity={on(f, good, 8)}>{[0, 1, 2].map((k) => <circle key={k} cx={-60 + k * 60} cy={-200 - Math.sin(f / 8 + k) * 20} r={8} fill={GOLD} />)}</g>
      </g>
      <g opacity={on(f, protecting, 8)}><Tag x={700} y={200} text="THE FEAR “PROTECTING” YOU" fill="#FFFFFF" s={pop(f, protecting)} /></g>
      <Headline text="…TOWARDS THE BIGGER REGRET" o={on(f, bigger, 8)} color={CORAL_D} />
      <Person f={f} who="hero-struggling" beats={hero} x={hx} s={0.6} />
      <Vig id="ffg" />
    </g>
  )
}

// ---------------------------------------------------------------- JIANG s60–s68
const Jiang: React.FC<PieceProps> = ({ f, c }) => {
  const s60 = c('s60'), turn = c('s60:turn'), down = c('s60:down'), extreme = c('s60:extreme')
  const s61 = c('s61'), jia = c('s61:jia'), afraid = c('s61:afraid'), career = c('s61:career'), challenge = c('s61:challenge'), hundred = c('s61:hundred'), purpose = c('s61:purpose')
  const s62 = c('s62'), stranger = c('s62:stranger'), lend = c('s62:lend'), no = c('s62:no'), ran = c('s62:ran')
  const s63 = c('s63'), going = c('s63:going'), strange = c('s63:strange'), request = c('s63:request')
  const s64 = c('s64'), doughnut = c('s64:doughnut'), olympic = c('s64:olympic'), rings = c('s64:rings'), laughed = c('s64:laughed')
  const s65 = c('s65'), woman = c('s65:woman'), counter = c('s65:counter'), thought = c('s65:thought'), made = c('s65:made')
  const s66 = c('s66'), changed = c('s66:changed'), hurting = c('s66:hurting'), yes = c('s66:yes')
  const s67 = c('s67'), fearless = c('s67:fearless'), positive = c('s67:positive'), braver = c('s67:braver'), collecting = c('s67:collecting'), power = c('s67:power')
  const s68 = c('s68'), works = c('s68:works'), avoid = c('s68:avoid'), grows = c('s68:grows'), face = c('s68:face'), doses = c('s68:doses'), shrinks = c('s68:shrinks')

  const A = win(f, 0, s64 + 2), B = win(f, s64, s66 + 2), C = on(f, s66, 10)
  // # the fear balloon above his head: big at first, smaller as the no's pile up
  const fear = lerp(lerp(1.2, 0.9, on(f, s63, 20)), 0.35, easeOut(span(f, s66, power + 10)))
  const run = easeOut(span(f, ran, ran + 26))
  const jiaA: Beat[] = [[0, 'idle', 'thinking'], [extreme, 'shrug', 'smiling'], [jia, 'waveA', 'smiling'], [jia + 10, 'idle', 'neutral'], [afraid, 'nervous', 'worried'], [c('s61:holding'), 'slump', 'worried'], [career, 'slump', 'worried'], [challenge, 'fistPump', 'smiling'], [purpose, 'confident', 'smiling'],
    [s62, 'idle', 'worried'], [lend, 'offer', 'worried'], [no, 'shock', 'shocked'], ...walkBeats(ran, ran + 26, 'shocked', 6, 'run'), [ran + 26, 'idle', 'worried'], [going, 'confident', 'neutral'], [request, 'point', 'smiling']]
  const jiaB: Beat[] = [[s64, 'idle', 'neutral'], [doughnut, 'talk', 'smiling'], [c('s64:asked'), 'point', 'smiling'], [olympic, 'explain', 'smiling'], [laughed, 'nervous', 'worried'], [s65, 'idle', 'thinking'], [made, 'shock', 'shocked'], [made + 18, 'celebrate', 'smiling']]
  const baker: Beat[] = [[s64, 'idle', 'neutral'], [rings, 'think', 'thinking'], [thought, 'scratchHead', 'thinking'], [made, 'present', 'smiling']]
  const jiaC: Beat[] = [[s66, 'idle', 'neutral'], [hurting, 'relief', 'smiling'], [c('s66:turned'), 'think', 'smiling'], [yes, 'thumbsUp', 'smiling'], [s67, 'idle', 'neutral'], [braver, 'confident', 'smiling'], [power, 'celebrate', 'smiling'], [s68, 'explain', 'neutral'], [face, 'confident', 'smiling'], [c('s68:again#2'), 'nodA', 'smiling'], [shrinks, 'thumbsUp', 'smiling']]
  // # 100 little calendar boxes; they fill with NO / YES from s66 onwards (roughly half yes by the end)
  const filled = Math.floor(lerp(3, 100, easeOut(span(f, s66, power))))

  const Balloon = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 0 Q10 60 0 120`} stroke={INK} strokeWidth={3} fill="none" />
      <g transform={`scale(${fear})`}><ellipse cx={0} cy={-80} rx={80} ry={96} fill="#9AA3B0" stroke={INK} strokeWidth={5} /><text y={-66} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"', letterSpacing: 3 }}>FEAR</text></g>
    </g>
  )

  return (
    <g>
      <Sky id="ffj" />
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill="#D8D2C6" />
        {/* # a city street front */}
        {[0, 1, 2, 3].map((k) => <rect key={k} x={k * 500} y={260} width={460} height={GROUND - 280} fill={['#F3C9A8', '#CFE3EE', '#F7E2A6', '#D7C8EA'][k]} stroke="#FFFFFF" strokeWidth={10} />)}
        {[0, 1, 2, 3].map((k) => <rect key={k} x={k * 500 + 120} y={360} width={220} height={160} rx={8} fill="#FFFFFF" opacity={0.6} />)}
        <Headline text="TURN THE FEAR DOWN" o={win(f, turn, s61 + 6)} />
        <g opacity={on(f, c('s60:man'), 8) * (1 - on(f, jia, 8))}><Tag x={1340} y={260} text={f >= extreme ? 'ONE MAN · A BIT EXTREME' : 'ONE MAN'} fill={SUN} s={pop(f, c('s60:man'))} /></g>
        {/* # the 100-day challenge calendar */}
        <g opacity={win(f, challenge, s62 + 10)} transform={`translate(1300 470) scale(${pop(f, challenge)})`}>
          <rect x={-340} y={-200} width={680} height={400} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <rect x={-340} y={-200} width={680} height={90} rx={20} fill={CORAL} />
          <text y={-138} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>100 DAYS OF REJECTION</text>
          {Array.from({ length: 100 }, (_, k) => <rect key={k} x={-310 + (k % 20) * 31} y={-90 + Math.floor(k / 20) * 56} width={24} height={44} rx={4} fill={TILE} stroke={GREY} strokeWidth={2} />)}
          <text y={180} textAnchor="middle" fill={BURG} opacity={on(f, purpose, 8)} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>REJECTED ON PURPOSE</text>
        </g>
        {/* # day one: the stranger */}
        <g opacity={win(f, s62, s63 + 6)}>
          <Tag x={1560} y={170} text="DAY 1" fill={SUN} />
          <Person f={f} who="lib-stranger" beats={[[s62, 'idle', 'neutral'], [no, 'crossNoA', 'neutral'], [no + 8, 'crossNoB', 'neutral'], [no + 16, 'armsCrossed', 'neutral']]} x={1300} s={0.66} flip />
          <Say x={1010} y={470} lines={['CAN I BORROW', '$100?']} o={on(f, lend, 8) * (1 - on(f, no, 6))} s={pop(f, lend)} tail="left" />
          <g opacity={on(f, c('s62:dollars'), 6) * (1 - on(f, no, 6))}><Tag x={1010} y={650} text="$100" fill={LEAF} ink="#FFFFFF" s={pop(f, c('s62:dollars'))} /></g>
          <Say x={1420} y={300} lines={['NO.']} o={on(f, no, 6)} s={pop(f, no)} tail="right" size={80} fill={CORAL} />
        </g>
        <g opacity={on(f, s63, 8)}><Tag x={CX} y={320} text="EVERY DAY: A NEW STRANGE REQUEST" fill="#FFFFFF" s={pop(f, strange)} size={50} /></g>
        <Person f={f} who="lib-jiang" beats={jiaA} x={lerp(700, f >= ran + 26 ? 600 : -200, run)} s={0.66} />
        <Balloon x={lerp(700, f >= ran + 26 ? 600 : -200, run) + 230} y={GROUND - 600} />
        <NameTag x={lerp(700, f >= ran + 26 ? 600 : -200, run)} y={GROUND - 530} name="JIA JIANG" o={on(f, jia, 8)} s={0.85} />
      </g>}
      {/* # day three: the doughnut shop */}
      {B > 0.001 && <g opacity={B}>
        <rect width={W} height={H} fill="#FFE3EA" />
        <rect x={0} y={GROUND - 20} width={W} height={H} fill="#F0D2DA" />
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170} y={GROUND - 20} width={85} height={H} fill="#FFFFFF" opacity={0.5} />)}
        <rect x={980} y={GROUND - 260} width={800} height={240} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <rect x={980} y={GROUND - 290} width={800} height={34} rx={8} fill="#F59AB0" stroke={INK} strokeWidth={5} />
        <Tag x={CX} y={130} text="DAY 3 · A DOUGHNUT SHOP" fill={SUN} />
        <Person f={f} who="lib-baker" beats={baker} x={1380} y={GROUND - 120} s={0.6} flip />
        <rect x={980} y={GROUND - 260} width={800} height={240} fill="#FFFFFF" stroke={INK} strokeWidth={5} opacity={0.0} />
        <rect x={980} y={GROUND - 200} width={800} height={180} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
        <text x={1380} y={GROUND - 90} textAnchor="middle" fill="#E57490" style={{ font: '400 70px "Bebas Neue"', letterSpacing: 10 }}>DOUGHNUTS</text>
        <Say x={720} y={300} lines={['DOUGHNUTS SHAPED LIKE', 'THE OLYMPIC RINGS?']} o={on(f, olympic, 8) * (1 - on(f, s65, 8))} s={pop(f, olympic)} />
        <Say x={1500} y={330} lines={['HMM…']} o={win(f, thought, made)} s={pop(f, thought) * 0.8} tail="right" />
        {/* # the five-ring doughnuts */}
        <g opacity={on(f, made, 8)} transform={`translate(1380 ${GROUND - 240}) scale(${pop(f, made) * 0.9})`}>
          <rect x={-260} y={-30} width={520} height={60} rx={14} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          {[[-160, -80, '#3D7CC9'], [0, -80, '#2A2A2A'], [160, -80, '#D84040'], [-80, -30, '#F2C230'], [80, -30, '#3DA35A']].map(([dx, dy, col], k) => (
            <g key={k} transform={`translate(${dx} ${dy})`}><circle r={60} fill="#E8B07A" stroke={INK} strokeWidth={3} /><circle r={60} fill="none" stroke={col as string} strokeWidth={22} opacity={0.9} /><circle r={22} fill="#FFE3EA" stroke={INK} strokeWidth={3} /></g>
          ))}
        </g>
        <g opacity={on(f, made + 20, 8)}><Tag x={1380} y={260} text="SHE MADE THEM" fill={LEAF} ink="#FFFFFF" /></g>
        <g opacity={on(f, laughed, 8) * (1 - on(f, s65, 8))}><Tag x={720} y={520} text="EXPECTING TO BE LAUGHED AT" fill="#FFFFFF" size={44} /></g>
        <Person f={f} who="lib-jiang" beats={jiaB} x={560} s={0.66} />
        <NameTag x={560} y={GROUND - 530} name="JIA JIANG" o={1} s={0.8} />
        <Balloon x={790} y={GROUND - 600} />
        <g opacity={on(f, woman, 1) * 0} /><g opacity={on(f, counter, 1) * 0} />
      </g>}
      {/* # the calendar fills, the balloon shrinks */}
      {C > 0.001 && <g opacity={C}>
        <rect width={W} height={H} fill="#EAF6F8" />
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={TILE} />
        <g transform="translate(1280 440)">
          <rect x={-420} y={-260} width={840} height={520} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <rect x={-420} y={-260} width={840} height={90} rx={20} fill={CORAL} />
          <text y={-198} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>100 DAYS</text>
          {Array.from({ length: 100 }, (_, k) => {
            const isYes = k > 6 && (k * 7) % 13 < 7, done = k < filled
            return <g key={k} transform={`translate(${-390 + (k % 20) * 39} ${-150 + Math.floor(k / 20) * 76})`}>
              <rect width={32} height={60} rx={5} fill={done ? (isYes ? LEAF : CORAL) : TILE} stroke={GREY} strokeWidth={2} />
              {done && <text x={16} y={40} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 22px "Bebas Neue"' }}>{isYes ? 'YES' : 'NO'}</text>}
            </g>
          })}
        </g>
        <Headline text={f >= braver ? 'COLLECTING NO’S UNTIL THEY LOSE THEIR POWER' : f >= yes ? 'SOME NO’S TURNED INTO YES' : 'THE NO’S STOPPED HURTING'} o={on(f, changed, 8) * (1 - on(f, s68, 8))} />
        <g opacity={on(f, fearless, 8) * (1 - on(f, braver, 8))}><Tag x={1280} y={820} text="NOT POSITIVE THINKING" fill={GREY} ink="#FFFFFF" s={pop(f, positive)} size={44} /></g>
        <Person f={f} who="lib-jiang" beats={jiaC} x={400} s={0.66} />
        <NameTag x={400} y={GROUND - 530} name="JIA JIANG" o={1} s={0.8} />
        <Balloon x={630} y={GROUND - 600} />
        {/* # the rule: avoid → grows, face → shrinks */}
        <g opacity={on(f, s68, 10)}>
          <rect x={0} y={0} width={W} height={180} fill="#EAF6F8" />
          <text x={560} y={110} textAnchor="middle" fill={CORAL_D} opacity={on(f, avoid, 8)} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>{f >= grows ? 'AVOID IT → IT GROWS' : 'AVOID IT →'}</text>
          <text x={1360} y={110} textAnchor="middle" fill={LEAF} opacity={on(f, face, 8)} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>{f >= shrinks ? 'FACE IT → IT SHRINKS' : f >= doses ? 'FACE IT, IN SMALL DOSES →' : 'FACE IT →'}</text>
          <g opacity={on(f, works, 1) * 0} /><g opacity={on(f, collecting, 1) * 0} /><g opacity={on(f, down, 1) * 0} /><g opacity={on(f, hundred, 1) * 0} /><g opacity={on(f, stranger, 1) * 0} />
        </g>
      </g>}
      <Vig id="ffj" />
    </g>
  )
}

export const FF_DYSON = makePiece('ff-dyson', 'Fear: James Dyson, 5,127 prototypes', {
  beats: ['s44', 's44:lucky', 's44:another', 's45', 's45:dyson', 's45:annoyed', 's45:suction', 's45:build', 's46', 's46:prototype', 's46:work', 's46:changed', 's46:another', 's46:either', 's47', 's47:right', 's47:thousand', 's47:twentyseven', 's47:hand', 's48', 's48:later', 's48:thousand', 's48:failures', 's48:learned', 's49', 's49:stopped', 's49:three', 's50', 's50:lazy', 's50:failed', 's50:verdict', 's51', 's51:measurement', 's51:instead', 's51:failed', 's51:version', 's51:know', 's51:new', 's52', 's52:same', 's52:different', 's52:weight'],
  sfx: [['s45:suction', 'glitch'], ['s46:work', 'thud'], ['s46:either', 'thud'], ['s47:twentyseven', 'ding'], ['s48:learned', 'chime'], ['s49:three', 'thud'], ['s51:failed', 'thump'], ['s51:version', 'swish'], ['s52:different', 'whoosh']],
  Component: Dyson, mood: 'light',
})
export const FF_REGRET = makePiece('ff-regret', 'Fear: regret flips over time (Gilovich & Medvec)', {
  beats: ['s53', 's53:thinking', 's53:fine', 's53:try', 's53:badly', 's53:regret', 's54', 's54:gilovich', 's54:medvec', 's54:studied', 's54:actually', 's55', 's55:short', 's55:regret', 's55:did', 's55:embarrassing', 's55:decision', 's56', 's56:years', 's56:flips', 's56:stay', 's56:never', 's56:tried', 's57', 's57:sting', 's57:fades', 's57:learn', 's57:funny', 's57:move', 's58', 's58:open', 's58:found', 's58:imagining', 's58:good', 's59', 's59:protecting', 's59:walking', 's59:bigger'],
  sfx: [['s54:gilovich', 'softpop'], ['s55:did', 'thud'], ['s56:flips', 'whoosh'], ['s57:funny', 'pop'], ['s58:open', 'flutter'], ['s59:bigger', 'thud']],
  Component: Regret, mood: 'light',
})
export const FF_JIANG = makePiece('ff-jiang', 'Fear: Jia Jiang, 100 days of rejection', {
  beats: ['s60', 's60:turn', 's60:down', 's60:man', 's60:extreme', 's61', 's61:jia', 's61:afraid', 's61:holding', 's61:career', 's61:challenge', 's61:hundred', 's61:purpose', 's62', 's62:stranger', 's62:lend', 's62:dollars', 's62:no', 's62:ran', 's63', 's63:going', 's63:strange', 's63:request', 's64', 's64:doughnut', 's64:asked', 's64:olympic', 's64:rings', 's64:laughed', 's65', 's65:woman', 's65:counter', 's65:thought', 's65:made', 's66', 's66:changed', 's66:hurting', 's66:turned', 's66:yes', 's67', 's67:fearless', 's67:positive', 's67:braver', 's67:collecting', 's67:power', 's68', 's68:works', 's68:avoid', 's68:grows', 's68:face', 's68:doses', 's68:again#2', 's68:shrinks'],
  sfx: [['s61:challenge', 'pop'], ['s62:no', 'thud'], ['s62:ran', 'whoosh'], ['s64:olympic', 'softpop'], ['s65:made', 'ding'], ['s66:yes', 'chime'], ['s67:power', 'riser'], ['s68:grows', 'thump'], ['s68:shrinks', 'softpop']],
  Component: Jiang, mood: 'light',
})
