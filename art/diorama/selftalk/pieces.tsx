// ---------------------------------------------------------------- the four scenes of "Why You Talk to Yourself So Harshly".
// HOOK s1–s4) the gym: a friend (Mini) fumbles a pass and he answers with a soft mint bubble: HEY, IT'S FINE. Then he
//    misses one shot himself and a megaphone swings at him: STUPID · LAZY · USELESS · YOU'LL NEVER CHANGE; it grows on
//    "meanest person you know"; KEEPS ME IN LINE?; then THE RESEARCH: ← THE OTHER WAY.
// TEST s5–s11) UC BERKELEY: a brutal vocab test, red crosses, OUCH; three groups of students: SELF-COMPASSION (mint
//    bubble), SELF-ESTEEM (gold star YOU'RE SMART), NO MESSAGE; study-time bars race — compassion runs longest; KIND ≠ LAZY.
// WHY s12–s14) a missed ball turns into a fizzing bomb (DANGER) when the megaphone shouts at it; he hides behind the bench
//    and drops his towel (GIVE UP); the voice gets louder, he covers his eyes; the megaphone switches off, the bomb is just a
//    ball again, he picks it up and turns it over: SAFE TO LOOK AT → LEARN.
// COACH s15–s23) free throws: a miss; a mint bubble: SAM, THAT WENT BADLY. ONE THING TO CHANGE? (name on his back);
//    the speech study: two anxiety meters, "I" high vs BY NAME low; IN THE GAME; two coaches — a yelling one fades, a kind one
//    with a clipboard stays: THE COACH YOU'D PLAY FOR; HONEST + KIND; swish: the ball drops through the hoop.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Ball, GVig, Gym, Headline, Megaphone, Person, Soft, Spiky, Tag, TestPaper, TimeBar, win, CREAM, GOLD, INK, BURG, HARSH, MINTY, NAVY, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const friend = c('s1:friend'), messed = c('s1:messed'), stupid = c('s1:stupid'), yourself = c('s1:yourself')
  const s2 = c('s2'), workout = c('s2:workout'), lazy = c('s2:lazy'), useless = c('s2:useless'), never = c('s2:never'), change = c('s2:change')
  const s2b = c('s2b'), slip = c('s2b:slip'), voice = c('s2b:voice'), meanest = c('s2b:meanest')
  const s3 = c('s3'), believe = c('s3:believe'), hard = c('s3:hard'), line = c('s3:line')
  const s4 = c('s4'), research = c('s4:research'), other = c('s4:other')

  const shout = on(f, s2, 6) * (1 - on(f, s3, 10))
  const mega = lerp(0.9, 1.6, easeOut(span(f, meanest - 6, meanest + 10)))
  const hero: Beat[] = [[0, 'idle', 'smiling'], [messed, 'shrug', 'smiling'], [stupid, 'crossNoA', 'smiling'], [yourself, 'point', 'thinking'], [s2, 'oops', 'shocked'], [lazy, 'nervous', 'worried'], [useless, 'slump', 'worried'], [change, 'despair', 'worried'], [s2b, 'slump', 'worried'], [s3, 'idle', 'thinking'], [line, 'armsCrossed', 'neutral'], [research, 'think', 'thinking'], [other, 'shrug', 'smiling']]
  const ballY = f < s2 ? GROUND - 40 : GROUND - lerp(600, 40, easeOut(span(f, s2 + 6, workout + 14)))

  return (
    <g>
      <Gym id="sth" dim={0.35 * shout} />
      {/* # the friend fumbles; you are kind */}
      <g opacity={on(f, friend, 6) * (1 - on(f, s2, 8))}>
        <Mini look="hero-fit" x={820} y={GROUND} scale={2.4} frame={f} seed={160} mood={f >= stupid ? 'happy' : 'sad'} />
        <Ball x={880} y={GROUND - 40} />
        <Soft x={560} y={620} lines={['HEY, IT\'S FINE!']} s={pop(f, stupid)} o={on(f, stupid, 6)} />
      </g>
      <g opacity={on(f, s2, 6)}><Ball x={lerp(420, 620, span(f, s2 + 6, workout + 14))} y={ballY} /></g>
      {/* # the harsh voice, aimed at you */}
      <g opacity={shout}>
        <Megaphone x={840} y={760} s={mega} r={-10} f={f} shout={shout} />
        {([['LAZY', lazy, 560, 520], ['USELESS', useless, 640, 940], ["YOU'LL NEVER CHANGE", never, 560, 1080], ['STUPID', workout, 560, 640]] as const).map(([t, at, x, y], k) => (
          <Spiky key={t} x={x} y={y} text={t} s={pop(f, at) * 0.85} o={on(f, at, 4)} r={-6 + k * 4} />
        ))}
      </g>
      <g opacity={on(f, meanest, 6) * (1 - on(f, s3, 8))}><Tag x={CX} y={470} text="THE MEANEST VOICE YOU KNOW" s={pop(f, meanest)} size={46} fill={CREAM} ink={HARSH} /></g>
      <g opacity={on(f, line, 6) * (1 - on(f, s4, 8))}><Tag x={720} y={560} text="KEEPS ME IN LINE?" s={pop(f, line)} size={56} fill={GOLD} /></g>
      <g opacity={on(f, research, 6)}><Tag x={720} y={560} text="THE RESEARCH SAYS" s={pop(f, research)} size={52} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, other, 6)} transform={`translate(720 720) scale(${pop(f, other)})`}><path d="M120 0 L-80 0 M-40 -40 L-90 0 L-40 40" stroke={GOLD} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" /><text x={20} y={110} textAnchor="middle" fill={GOLD} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>THE OTHER WAY</text></g>
      <Person f={f} who="hero-struggling" beats={hero} x={300} s={0.88} />
      <Headline text={f < s2 ? 'TO A FRIEND' : f < s3 ? 'TO YOURSELF' : ''} o={f < s2 ? on(f, friend, 8) * (1 - on(f, s2 - 4, 4)) : f < s3 ? on(f, lazy, 8) * (1 - on(f, s3 - 4, 4)) : 0} color={CREAM} />
      <GVig id="sth" />
    </g>
  )
}

const Test: React.FC<PieceProps> = ({ f, c }) => {
  const berkeley = c('s5:berkeley'), difficult = c('s5:difficult'), test = c('s5:test'), badly = c('s5:badly')
  const s6 = c('s6'), split = c('s6:split'), groups = c('s6:groups')
  const s7 = c('s7'), message = c('s7:message'), normal = c('s7:normal'), yourself7 = c('s7:yourself')
  const s8 = c('s8'), boost = c('s8:boost'), intelligent = c('s8:intelligent')
  const s9 = c('s9'), study = c('s9:study'), second = c('s9:second'), liked = c('s9:liked')
  const s10 = c('s10'), longer = c('s10:longer')
  const s11 = c('s11'), kind = c('s11:kind'), lazy = c('s11:lazy'), harder = c('s11:harder')

  const A = win(f, 0, s6 + 4), B = win(f, s6, s9 + 4), C = on(f, s9, 10)
  const race = easeOut(span(f, study, longer + 10))
  const groupsX = [220, 540, 860]

  return (
    <g>
      <Gym id="stt" hoop={false} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, berkeley, 6)}><Tag x={CX} y={470} text="UC BERKELEY" s={pop(f, berkeley)} size={60} fill={GOLD} /></g>
        <TestPaper x={CX} y={860} s={pop(f, test)} fail={easeOut(span(f, test + 6, badly + 8))} r={-3} />
        <g opacity={on(f, difficult, 6) * (1 - on(f, badly, 6))}><Tag x={CX} y={590} text="REALLY DIFFICULT" s={pop(f, difficult)} size={50} /></g>
        <g opacity={on(f, badly, 6)}><Tag x={CX} y={590} text="ALMOST EVERYONE: BADLY" s={pop(f, badly)} size={46} fill={CREAM} ink={HARSH} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {groupsX.map((x, k) => <g key={k} opacity={on(f, groups + k * 3, 5)}>
          {[0, 1, 2].map((j) => <Mini key={j} look={['hero-fit', 'hero-rich', 'hero-struggling'][(j + k) % 3]} x={x - 70 + j * 70} y={GROUND} scale={1.3} frame={f} seed={170 + k * 3 + j} mood={k === 0 && f >= normal ? 'happy' : 'neutral'} />)}
          <text x={x} y={GROUND + 80} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{['SELF-COMPASSION', 'SELF-ESTEEM', 'NO MESSAGE'][k]}</text>
        </g>)}
        <Soft x={300} y={660} lines={["IT'S NORMAL TO", 'STRUGGLE. GO EASY', 'ON YOURSELF.']} s={0.78 * pop(f, message)} o={on(f, message, 6)} />
        <g opacity={on(f, boost, 6)} transform={`translate(780 640) scale(${pop(f, boost)})`}>
          <path d="M0 -110 L30 -36 L108 -34 L46 14 L68 90 L0 46 L-68 90 L-46 14 L-108 -34 L-30 -36 Z" fill={GOLD} stroke={INK} strokeWidth={6} />
          <text y={150} textAnchor="middle" fill={CREAM} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{f >= intelligent ? "YOU MUST BE SMART" : 'SELF-ESTEEM BOOST'}</text>
        </g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <text x={120} y={560} fill={CREAM} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{f >= second ? 'STUDY TIME FOR TEST 2' : 'STUDY AS LONG AS YOU LIKE'}</text>
        <TimeBar x={120} y={700} w={lerp(0, 760, race)} label="SELF-COMPASSION" tone={MINTY} />
        <TimeBar x={120} y={860} w={lerp(0, 520, race)} label="SELF-ESTEEM" tone={GOLD} />
        <TimeBar x={120} y={1020} w={lerp(0, 500, race)} label="NO MESSAGE" tone="#9AA3C2" />
        <g opacity={on(f, longer, 6) * (1 - on(f, s11, 8))}><Tag x={CX} y={1180} text="STUDIED LONGEST" s={pop(f, longer)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, lazy, 6) * (1 - on(f, harder, 6))}><Tag x={CX} y={1180} text="KIND ≠ LAZY" s={pop(f, lazy)} size={58} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, harder, 6)}><Tag x={CX} y={1180} text="KIND = TRY HARDER" s={pop(f, harder)} size={58} fill={GOLD} /></g>
      </g>}
      <Headline text={f < s6 ? 'THE BERKELEY TEST' : f < s9 ? 'THREE GROUPS' : 'WHO TRIED HARDER?'} o={f < s6 ? on(f, test, 8) * (1 - on(f, s6 - 4, 4)) : f < s9 ? on(f, split, 8) * (1 - on(f, s9 - 4, 4)) : on(f, liked, 8)} color={CREAM} />
      <GVig id="stt" />
    </g>
  )
}

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), reason = c('s12:reason'), attack = c('s12:attack'), mistake = c('s12:mistake'), dangerous = c('s12:dangerous')
  const s13 = c('s13'), protects = c('s13:protects'), avoids = c('s13:avoids'), hides = c('s13:hides'), gives = c('s13:gives'), early = c('s13:early')
  const s13b = c('s13b'), harsher = c('s13b:harsher'), look = c('s13b:look'), wrong = c('s13b:wrong')
  const s14 = c('s14'), safe = c('s14:safe'), learn = c('s14:learn')

  const shout = on(f, attack, 6) * (1 - on(f, s14, 10))
  const bomb = on(f, dangerous, 6) * (1 - on(f, safe, 10))
  const hx = f < hides ? 320 : lerp(320, 170, easeOut(span(f, hides, hides + 12))) + lerp(0, 180, easeOut(span(f, s14, safe + 6)))
  const hero: Beat[] = [[s12, 'idle', 'neutral'], [mistake, 'oops', 'worried'], [dangerous, 'shock', 'shocked'], [avoids, 'stop', 'worried'], [hides, 'nervous', 'worried'], [gives, 'despair', 'worried'], [harsher, 'facepalm', 'worried'], [s14, 'idle', 'thinking'], [safe, 'reachDown', 'neutral'], [learn, 'holdUp', 'smiling']]

  return (
    <g>
      <Gym id="stw" dim={0.4 * shout} />
      <Megaphone x={880} y={600} s={lerp(1, 1.4, on(f, harsher, 10))} r={-20} f={f} shout={shout} />
      {/* # the mistake: a ball; under the shouting it fizzes like a bomb */}
      <g transform={`translate(${lerp(600, hx + 140, on(f, learn - 10, 10))} ${f >= learn ? GROUND - 420 : GROUND - 40})`}>
        <Ball x={0} y={0} s={1.2} />
        <g opacity={bomb}><path d="M30 -40 Q60 -90 40 -120" stroke={INK} strokeWidth={6} fill="none" />{[0, 1, 2].map((k) => <circle key={k} cx={40 + Math.sin(f + k) * 14} cy={-126 - k * 10} r={8 - k * 2} fill={GOLD} />)}<text x={0} y={-160} textAnchor="middle" fill={HARSH} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 4 }}>DANGER</text></g>
      </g>
      {/* # the bench he hides behind */}
      <g opacity={on(f, hides, 6) * (1 - on(f, s14, 10))}><rect x={60} y={GROUND - 200} width={320} height={40} rx={10} fill="#8A5A3C" stroke={INK} strokeWidth={5} /><rect x={80} y={GROUND - 160} width={20} height={160} fill="#6B4A3A" /><rect x={340} y={GROUND - 160} width={20} height={160} fill="#6B4A3A" /></g>
      <g opacity={on(f, gives, 6) * (1 - on(f, s14, 8))}><rect x={260} y={GROUND - 30} width={140} height={30} rx={8} fill={CREAM} stroke={INK} strokeWidth={4} /><Tag x={720} y={860} text="GIVE UP EARLY" s={pop(f, gives)} size={48} /></g>
      {([['AVOID', avoids, 560], ['HIDE', hides, 700]] as const).map(([t, at, y]) => <g key={t} opacity={on(f, at, 5) * (1 - on(f, s13b, 6))}><Tag x={720} y={y} text={t} s={pop(f, at)} size={52} fill={CREAM} ink={HARSH} /></g>)}
      <g opacity={on(f, dangerous, 6) * (1 - on(f, s13, 6))}><Tag x={CX} y={470} text="FAILING = DANGER" s={pop(f, dangerous)} size={60} fill={CREAM} ink={HARSH} /></g>
      <g opacity={on(f, look, 6) * (1 - on(f, s14, 6))}><Tag x={CX} y={470} text="TOO SCARY TO LOOK AT" s={pop(f, look)} size={52} /></g>
      <g opacity={on(f, safe, 6) * (1 - on(f, learn, 6))}><Tag x={CX} y={470} text="SAFE TO LOOK AT" s={pop(f, safe)} size={60} fill={MINTY} ink={INK} /></g>
      <g opacity={on(f, learn, 6)}><Tag x={CX} y={470} text="NOW YOU CAN LEARN" s={pop(f, learn)} size={60} fill={GOLD} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={hx} s={0.88} />
      <Headline text={f < s14 ? 'WHY HARSH BACKFIRES' : ''} o={f < s14 ? on(f, reason, 8) * (1 - on(f, s14 - 4, 4)) : 0} color={CREAM} />
      <GVig id="stw" />
    </g>
  )
}

const Coach: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), next = c('s15:next'), mess = c('s15:mess')
  const s16 = c('s16'), friend = c('s16:friend'), name = c('s16:name')
  const s17 = c('s17'), studies = c('s17:studies'), anxious = c('s17:anxious'), speech = c('s17:speech'), better = c('s17:better')
  const s18 = c('s18'), idiot = c('s18:idiot'), sam = c('s18:sam'), badly = c('s18:badly'), differently = c('s18:differently')
  const s19 = c('s19'), hook = c('s19:hook'), game = c('s19:game')
  const s20 = c('s20'), discipline = c('s20:discipline'), hating = c('s20:hating')
  const s21 = c('s21'), coach = c('s21:coach'), play = c('s21:play')
  const s22 = c('s22'), honest = c('s22:honest'), kind = c('s22:kind'), made = c('s22:made')
  const s23 = c('s23'), surprised = c('s23:surprised'), further = c('s23:further')

  const A = win(f, 0, s17 + 4), B = win(f, s17, s18 + 4), C = win(f, s18, s20 + 4), D = on(f, s20, 10)
  // # the shot: misses at the start, swishes at the end
  const miss = span(f, mess - 6, mess + 14), swish = span(f, surprised, further + 10)
  const shotX = (t: number, to: number) => lerp(420, to, t), shotY = (t: number, to: number) => lerp(GROUND - 500, to, t) - Math.sin(t * Math.PI) * 300
  const hero: Beat[] = [[s15, 'idle', 'neutral'], [next, 'pitch', 'neutral'], [mess, 'oops', 'worried'], [friend, 'idle', 'thinking'], [name, 'holdChest', 'smiling'], [s18, 'idle', 'thinking'], [sam, 'think', 'thinking'], [differently, 'nodA', 'smiling'], [game, 'fistPump', 'smiling'], [s20, 'idle', 'neutral'], [coach, 'present', 'smiling'], [kind, 'holdChest', 'smiling'], [surprised, 'pitch', 'smiling'], [further, 'celebrate', 'smiling']]
  const meterI = lerp(0, 0.85, easeOut(span(f, anxious, anxious + 14))), meterN = lerp(0, 0.4, easeOut(span(f, anxious + 6, anxious + 20)))

  return (
    <g>
      <Gym id="stc" />
      {f < s20 && miss > 0 && miss < 1 && <Ball x={shotX(miss, 1000)} y={shotY(miss, 700)} />}
      {f >= surprised && swish < 1 && <Ball x={shotX(swish, 900)} y={shotY(swish, 700)} />}
      {f >= further + 10 && <Ball x={900} y={GROUND - 40} />}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, mess, 6) * (1 - on(f, s16, 6))}><Tag x={720} y={980} text="MISSED" s={pop(f, mess)} size={52} /></g>
        <g opacity={on(f, friend, 6)}><Soft x={680} y={980} lines={['LIKE A FRIEND']} s={pop(f, friend)} /></g>
        <g opacity={on(f, name, 6)}><Tag x={300} y={GROUND - 640} text="SAM" s={pop(f, name)} size={56} fill={GOLD} /></g>
      </g>}
      {/* # B) the speech study */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, studies, 6)}><Tag x={CX} y={470} text="THE SPEECH STUDY" s={pop(f, studies)} size={56} fill={CREAM} ink={BURG} /></g>
        {([['SAID "I"', meterI, HARSH, 600], ['USED THEIR NAME', meterN, MINTY, 880]] as const).map(([t, v, tone, x]) => (
          <g key={t} transform={`translate(${x} 1000)`} opacity={on(f, anxious - 6, 6)}>
            <rect x={-60} y={-380} width={120} height={380} rx={30} fill={CREAM} stroke={INK} strokeWidth={6} />
            <rect x={-44} y={-364 + 348 * (1 - v)} width={88} height={348 * v} rx={20} fill={tone} />
            <text y={60} textAnchor="middle" fill={CREAM} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>
          </g>
        ))}
        <g opacity={on(f, anxious, 6)}><text x={740} y={590} textAnchor="middle" fill={GOLD} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>ANXIETY</text></g>
        <g opacity={on(f, better, 6)}><Tag x={760} y={1150} text="BETTER SPEECH" s={pop(f, better)} size={44} fill={GOLD} /></g>
      </g>}
      {/* # C) the kind, useful self-talk */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, idiot, 4) * (1 - on(f, sam, 6))}><Spiky x={680} y={640} text="I'M SUCH AN IDIOT" s={pop(f, idiot) * 0.8} /></g>
        <Soft x={660} y={680} lines={['SAM, THAT WENT BADLY.', "WHAT'S ONE THING", 'TO DO DIFFERENTLY?']} s={0.8 * pop(f, sam)} o={on(f, sam, 6) * (1 - on(f, s19, 8))} />
        <g opacity={on(f, hook, 6) * (1 - on(f, game, 6))}><Tag x={680} y={600} text="NOT OFF THE HOOK" s={pop(f, hook)} size={52} /></g>
        <g opacity={on(f, game, 6)}><Tag x={680} y={600} text="STILL IN THE GAME" s={pop(f, game)} size={60} fill={GOLD} /></g>
      </g>}
      {/* # D) the coach you'd play for */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, hating, 6) * (1 - on(f, s21, 10))}><Megaphone x={780} y={700} f={f} shout={1} /><Tag x={780} y={940} text="HATING YOURSELF" s={pop(f, hating)} size={46} fill={CREAM} ink={HARSH} /><path d={`M600 ${700} L${lerp(600, 960, easeOut(span(f, hating + 8, s21)))} 700`} stroke="#D2463C" strokeWidth={14} strokeLinecap="round" /></g>
        <g opacity={on(f, coach, 6)}>
          <Mini look="hero-rich" x={760} y={GROUND} scale={2.4} frame={f} seed={180} mood="happy" />
          <rect x={800} y={GROUND - 330} width={80} height={110} rx={8} fill="#B98258" stroke={INK} strokeWidth={5} />
          <Tag x={760} y={560} text="THE COACH YOU'D PLAY FOR" s={pop(f, coach)} size={44} fill={GOLD} />
        </g>
        <g opacity={on(f, honest, 6) * (1 - on(f, s23, 8))}><Tag x={540} y={440} text={f >= kind ? 'HONEST + KIND' : 'HONEST'} s={pop(f, f >= kind ? kind : honest)} size={56} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, further, 6)}><Tag x={540} y={440} text="SWISH." s={pop(f, further) * 1.2} size={84} fill={GOLD} /></g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={300} s={0.88} />
      <Headline text={f < s17 ? 'TRY THIS' : f < s18 ? '' : f < s20 ? 'TALK LIKE A COACH' : f < s22 ? 'REAL DISCIPLINE' : ''} o={f < s17 ? on(f, s15, 8) * (1 - on(f, s17 - 4, 4)) : f < s18 ? 0 : f < s20 ? on(f, sam, 8) * (1 - on(f, s20 - 4, 4)) : f < s22 ? on(f, discipline, 8) * (1 - on(f, s22 - 4, 4)) : 0} color={CREAM} />
      <GVig id="stc" />
    </g>
  )
}

export const ST_HOOK = makePiece('st-hook', 'Self-talk: kind to a friend, harsh to yourself', {
  beats: ['s1:friend', 's1:messed', 's1:stupid', 's1:yourself', 's2', 's2:workout', 's2:lazy', 's2:useless', 's2:never', 's2:change', 's2b', 's2b:slip', 's2b:voice', 's2b:meanest', 's3', 's3:believe', 's3:hard', 's3:line', 's4', 's4:research', 's4:other'],
  sfx: [['s1:stupid', 'softpop'], ['s2:workout', 'thud'], ['s2:lazy', 'impact'], ['s2:useless', 'impact'], ['s2:never', 'impact'], ['s2b:meanest', 'riser'], ['s4:other', 'whoosh']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const ST_TEST = makePiece('st-test', 'Self-talk: the Berkeley self-compassion study', {
  beats: ['s5', 's5:berkeley', 's5:researchers', 's5:students', 's5:difficult', 's5:vocabulary', 's5:test', 's5:almost', 's5:badly', 's6', 's6:split', 's6:groups', 's7', 's7:group', 's7:message', 's7:something', 's7:normal', 's7:struggle', 's7:hard', 's7:yourself', 's8', 's8:boost', 's8:selfesteem', 's8:reminder', 's8:intelligent', 's9', 's9:study', 's9:second', 's9:liked', 's10', 's10:longer', 's11', 's11:kind', 's11:lazy', 's11:harder'],
  sfx: [['s5:badly', 'thud'], ['s6:groups', 'pop'], ['s7:message', 'softpop'], ['s8:boost', 'ding'], ['s9:study', 'riser'], ['s10:longer', 'chime']],
  Component: Test, mood: 'light', canvas: 'tall',
})
export const ST_WHY = makePiece('st-why', 'Self-talk: harsh makes mistakes dangerous', {
  beats: ['s12', 's12:reason', 's12:attack', 's12:mistake', 's12:dangerous', 's13', 's13:mind', 's13:protects', 's13:only', 's13:knows', 's13:avoids', 's13:hides', 's13:gives', 's13:early', 's13b', 's13b:harsher', 's13b:look', 's13b:wrong', 's14', 's14:safe', 's14:learn'],
  sfx: [['s12:dangerous', 'glitch'], ['s13:avoids', 'swish'], ['s13:hides', 'swish'], ['s13:gives', 'thud'], ['s14:safe', 'click'], ['s14:learn', 'ding']],
  Component: Why, mood: 'light', canvas: 'tall',
})
export const ST_COACH = makePiece('st-coach', 'Self-talk: use your name, be the coach you would play for', {
  beats: ['s15', 's15:next', 's15:mess', 's16', 's16:friend', 's16:name', 's17', 's17:studies', 's17:talked', 's17:themselves', 's17:instead', 's17:saying', 's17:anxious', 's17:speech', 's17:better', 's18', 's18:idiot', 's18:sam', 's18:badly', 's18:differently', 's19', 's19:hook', 's19:game', 's20', 's20:discipline', 's20:hating', 's21', 's21:coach', 's21:play', 's22', 's22:honest', 's22:kind', 's22:made', 's23', 's23:surprised', 's23:further'],
  sfx: [['s15:mess', 'thud'], ['s16:name', 'pop'], ['s17:anxious', 'tick'], ['s18:idiot', 'impact'], ['s18:sam', 'softpop'], ['s19:game', 'ding'], ['s21:coach', 'chime'], ['s23:further', 'whoosh']],
  Component: Coach, mood: 'light', canvas: 'tall',
})
