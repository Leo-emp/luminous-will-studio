// ---------------------------------------------------------------- "Why You're So Afraid of Failing" — part 2 (s21–s43)
// FIVE s21–s31) by the pool: a clipboard — DAVID CONROY'S FEAR-OF-FAILURE QUESTIONNAIRE (a card, not a drawing of him);
//    a box marked FEAR OF FAILURE opens and five cards fly out (SHAME · THINKING LESS OF YOURSELF · AN UNCERTAIN FUTURE
//    · PEOPLE LOSING INTEREST · LETTING PEOPLE DOWN); the people-cards light up: ABOUT PEOPLE. Back on the board: you
//    bounce happily alone, the stands fill up and you freeze. IN YOUR HEAD vs REAL LIFE: real costs are small tags
//    (AN AFTERNOON · A BIT OF MONEY · AN AWKWARD WEEK), the head-cost is huge: WHO YOU ARE. Then: MAKE FAILING NORMAL.
// DINNER s32–s37) a sunny Florida kitchen: young Sara Blakely (labelled), her brother and their dad at the table.
//    WHAT DID YOU FAIL AT THIS WEEK? No answer → Dad looks disappointed. A locked box marked FAILURE opens on the table;
//    the kids raise their hands: I FAILED AT…! THE ONLY FAILURE: NOT TRYING.
// SARA s38–s43) grown-up Sara (labelled): a LAWYER daydream, the exam card misses; she carries a fax machine along a
//    row of doors that all say NO; scissors snip the feet off a pair of tights → a light bulb; a $5,000 SAVINGS jar,
//    NO INVESTORS ✗, NO FASHION BACKGROUND ✗; a SPANX box; a magazine card FORBES 2012 · YOUNGEST SELF-MADE FEMALE
//    BILLIONAIRE; the dinner question returns: FAILURE = WHAT HAPPENS WHEN YOU TRY.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Mini } from '../../rig/Mini'
import {
  Board, Cloud, Headline, Mark, NameTag, Parasol, Person, Pool, Say, Sky, SunDisc, Tag, Vig, walkBeats, win,
  AQUA, AQUA_D, BURG, CORAL, CORAL_D, CREAM, GOLD, GOLD_L, GREY, INK, LEAF, SAND, SUN, SUN_L, TILE, CX, GROUND, W, H, on, pop, lerp, span, easeOut, type Beat,
} from './kit'

// # a fear card with an optional little "people" icon that lights up
const FearCard: React.FC<{ x: number; y: number; text: string[]; o: number; s?: number; lit?: number; people?: boolean; r?: number; o2?: number }> = ({ x, y, text, o, s = 1, lit = 0, people, r = 0, o2 = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-110} width={340} height={220} rx={22} fill={lit > 0 && people ? SUN_L : '#FFFFFF'} stroke={INK} strokeWidth={5} />
    {text.map((t, k) => <text key={k} opacity={k ? o2 : 1} y={-14 + k * 50 - (text.length - 1) * 18} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>)}
    {people && <g transform="translate(0 72)" opacity={0.35 + 0.65 * lit}>
      {[-36, 0, 36].map((dx) => <g key={dx} transform={`translate(${dx} 0)`}><circle cy={-14} r={11} fill={lit > 0 ? CORAL : GREY} /><path d="M-16 14 Q0 -6 16 14 Z" fill={lit > 0 ? CORAL : GREY} /></g>)}
    </g>}
  </g>
)

const Five: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), part = c('s21:part'), miss = c('s21:miss')
  const s22 = c('s22'), researchers = c('s22:researchers'), closely = c('s22:closely'), failing = c('s22:failing'), itself = c('s22:itself')
  const s23 = c('s23'), conroy = c('s23:conroy'), questionnaire = c('s23:questionnaire'), five = c('s23:five'), hiding = c('s23:hiding'), feeling = c('s23:feeling')
  const s24 = c('s24'), shame = c('s24:shame'), thinking = c('s24:thinking'), uncertain = c('s24:uncertain'), interest = c('s24:interest'), letting = c('s24:letting'), matter = c('s24:matter')
  const s25 = c('s25'), list = c('s25:list'), people = c('s25:people')
  const s26 = c('s26'), fall = c('s26:fall'), seen = c('s26:seen'), falling = c('s26:falling')
  const s27 = c('s27'), practise = c('s27:practise'), happily = c('s27:happily'), freeze = c('s27:freeze'), watching = c('s27:watching')
  const s28 = c('s28'), stakes = c('s28:stakes'), head = c('s28:head'), higher = c('s28:higher'), real = c('s28:real')
  const s29 = c('s29'), attempt29 = c('s29:attempt'), afternoon = c('s29:afternoon'), money = c('s29:money'), awkward = c('s29:awkward'), week = c('s29:week')
  const s30 = c('s30'), costs = c('s30:costs')
  const s31 = c('s31'), caring = c('s31:caring'), normal = c('s31:normal'), threatening = c('s31:threatening')

  const A = win(f, 0, s26 + 2), B = win(f, s26, s28 + 2), C = on(f, s28, 10)
  const open = easeOut(span(f, five, five + 14))
  const cards: [number, string[], boolean, number][] = [[shame, ['SHAME &', 'EMBARRASSMENT'], true, c('s24:embarrassment')], [thinking, ['THINKING LESS', 'OF YOURSELF'], false, c('s24:yourself')], [uncertain, ['AN UNCERTAIN', 'FUTURE'], false, c('s24:future')], [c('s24:people'), ['PEOPLE LOSING', 'INTEREST IN YOU'], true, interest], [letting, ['LETTING PEOPLE', 'DOWN'], true, matter]]
  const slots = [[420, 300], [960, 260], [1500, 300], [640, 560], [1280, 560]]
  // # board scene: hero bounces alone, then the stands fill up and he freezes
  const crowd = Math.max(on(f, seen, 10) * (1 - on(f, practise, 8)), on(f, freeze, 8))
  const BX = 560, BH = 240, TOP = GROUND - 40 - BH
  const bounce = f >= happily && f < freeze ? Math.abs(Math.sin((f - happily) / 5)) * 30 : 0
  const heroB: Beat[] = [[s26, 'nervous', 'worried'], [seen, 'shock', 'shocked'], [practise, 'jump', 'smiling'], [happily + 10, 'celebrate', 'smiling'], [freeze, 'shock', 'shocked'], [watching, 'nervous', 'worried']]
  const heroC: Beat[] = [[s28, 'idle', 'thinking'], [head, 'think', 'thinking'], [real, 'explain', 'neutral'], [afternoon, 'shrug', 'neutral'], [s30, 'despair', 'worried'], [s31, 'idle', 'thinking'], [normal, 'present', 'smiling'], [threatening, 'thumbsUp', 'smiling']]
  const realBits: [number, string][] = [[afternoon, 'AN AFTERNOON'], [money, 'A BIT OF MONEY'], [awkward, 'AN AWKWARD WEEK']]

  return (
    <g>
      <Sky id="fff" />
      <SunDisc x={1720} y={150} f={f} r={64} />
      <Cloud x={240} y={130} s={0.9} />
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={TILE} />
        <rect x={0} y={GROUND + 40} width={W} height={H} fill={AQUA} />
        <Headline text="THE PART MOST PEOPLE MISS" o={win(f, part, s23)} />
        {/* # it's not the failure itself */}
        <g opacity={win(f, researchers, s23 + 4)}>
          <g transform={`translate(${CX} 520) scale(${pop(f, c('s22:really'))})`} opacity={on(f, c('s22:really'), 8)}>
            <text textAnchor="middle" fill={INK} style={{ font: '400 110px "Bebas Neue"', letterSpacing: 4 }}>THE FAILURE ITSELF</text>
            <path d={`M-460 -36 L${lerp(-460, 460, easeOut(span(f, itself, itself + 10)))} -36`} stroke={CORAL} strokeWidth={16} strokeLinecap="round" />
          </g>
          <g opacity={on(f, closely, 8)}><Tag x={CX} y={300} text="WHAT DO PEOPLE REALLY FEAR?" fill="#FFFFFF" s={pop(f, closely)} /></g>
        </g>
        {/* # the questionnaire + the box of five fears */}
        <g opacity={win(f, s23, s24 + 6)}>
          <g opacity={on(f, questionnaire, 8)} transform={`translate(380 560) rotate(-5) scale(${pop(f, questionnaire)})`}>
            <rect x={-150} y={-200} width={300} height={400} rx={16} fill="#C9895B" stroke={INK} strokeWidth={5} />
            <rect x={-120} y={-160} width={240} height={340} fill="#FFFFFF" />
            {[0, 1, 2, 3, 4].map((k) => <g key={k}><rect x={-100} y={-120 + k * 60} width={24} height={24} fill="none" stroke={INK} strokeWidth={3} /><rect x={-60} y={-112 + k * 60} width={150} height={8} rx={4} fill={GREY} /></g>)}
            <rect x={-50} y={-220} width={100} height={40} rx={10} fill={GREY} stroke={INK} strokeWidth={4} />
          </g>
          <NameTag x={380} y={830} name="DAVID CONROY · QUESTIONNAIRE" o={on(f, conroy, 8)} s={0.8} />
          <g transform={`translate(1260 680) scale(${pop(f, five - 10)})`} opacity={on(f, five - 10, 8) * (1 - on(f, shame, 10))}>
            <rect x={-220} y={-120} width={440} height={240} rx={14} fill={CORAL} stroke={INK} strokeWidth={6} />
            <g transform={`translate(-220 -120) rotate(${-open * 40})`}><rect x={0} y={-30} width={440} height={34} rx={8} fill={CORAL_D} stroke={INK} strokeWidth={5} /></g>
            <text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"', letterSpacing: 4 }}>FEAR OF FAILURE</text>
            <text y={84} textAnchor="middle" fill={SUN_L} opacity={on(f, hiding, 8)} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>5 FEARS INSIDE</text>
          </g>
          <g opacity={on(f, feeling, 8) * (1 - on(f, shame, 10))}><Tag x={1260} y={420} text="ONE FEELING" fill={SUN_L} s={0.9} /></g>
        </g>
        {/* # the five cards */}
        {cards.map(([at, t, ppl, at2], k) => {
          const p = easeOut(span(f, at, at + 14))
          return <FearCard key={k} x={lerp(1260, slots[k][0], p)} y={lerp(680, slots[k][1] + 120, p)} text={t} o={on(f, at, 6)} s={lerp(0.4, 1, p)} people={ppl} lit={on(f, people, 10)} r={(k - 2) * 2} o2={on(f, at2, 6)} />
        })}
        <g opacity={on(f, matter, 8) * (1 - on(f, list, 8))}><Tag x={CX} y={160} text="FIVE FEARS IN ONE" fill={SUN} /></g>
        <Headline text="ALMOST ALL ABOUT PEOPLE" o={on(f, c('s25:almost'), 10)} color={CORAL_D} />
      </g>}
      {/* # back on the board */}
      {B > 0.001 && <g opacity={B}>
        <Pool f={f} />
        {/* # the stands, filling with watchers */}
        <g opacity={crowd}>
          <path d={`M1100 ${GROUND - 40} L1100 ${GROUND - 300} L1880 ${GROUND - 440} L1880 ${GROUND - 40} Z`} fill="#D9DEE5" stroke={INK} strokeWidth={4} />
          {[0, 1, 2].map((row) => [0, 1, 2, 3, 4].map((i) => <Mini key={`${row}-${i}`} look={['lib-stranger', 'lib-baker', 'lib-tversky', 'lib-brother-kid', 'lib-blakely-dad'][(i + row) % 5]} x={1180 + i * 150 + row * 20} y={GROUND - 60 - row * 120 - i * 18} scale={1.05} frame={f} seed={row * 5 + i} />))}
        </g>
        <Parasol x={170} s={0.8} />
        <Board x={BX} h={BH} len={440} bend={bounce > 0 ? bounce * 0.3 : 0} />
        <Person f={f} who="hero" beats={heroB} x={BX + 380} y={TOP - bounce} s={0.62} />
        <Headline text="IT'S BEING SEEN FALLING" o={win(f, seen, practise)} color={BURG} />
        <g opacity={win(f, practise, freeze)}><Tag x={1450} y={300} text="ON YOUR OWN: EASY" fill={LEAF} ink="#FFFFFF" s={pop(f, practise)} /></g>
        <g opacity={on(f, watching, 8)}><Tag x={1450} y={240} text="SOMEBODY'S WATCHING" fill={CORAL} ink="#FFFFFF" s={pop(f, watching)} /></g>
      </g>}
      {/* # the stakes: in your head vs in real life */}
      {C > 0.001 && <g opacity={C}>
        <rect width={W} height={H} fill="#FFF6E2" />
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={SAND} />
        <g transform="translate(560 0)">
          <text x={0} y={210} textAnchor="middle" fill={INK} opacity={on(f, real, 8)} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>REAL LIFE</text>
          {realBits.map(([at, t], k) => <Tag key={t} x={0} y={340 + k * 140} text={t} fill="#FFFFFF" size={50} s={pop(f, at)} o={on(f, at, 8)} />)}
          <g opacity={on(f, attempt29, 8)}><text x={0} y={268} textAnchor="middle" fill={GREY} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>A FAILED ATTEMPT COSTS:</text></g>
          <g opacity={on(f, week + 10, 8)}><Mark x={0} y={780} ok s={0.8} /></g>
        </g>
        <g transform="translate(1360 0)">
          <text x={0} y={210} textAnchor="middle" fill={INK} opacity={on(f, head, 8)} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>IN YOUR HEAD</text>
          <g opacity={on(f, higher, 8)} transform={`translate(0 ${lerp(520, 520, 1)}) scale(${lerp(0.4, f >= costs ? 1.3 : 0.9, easeOut(span(f, higher, higher + 16)))})`}>
            <rect x={-230} y={-160} width={460} height={320} rx={30} fill={CORAL} stroke={INK} strokeWidth={6} />
            <text y={-40} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>IT COSTS YOU</text>
            <text y={60} textAnchor="middle" fill={SUN_L} opacity={on(f, costs, 8)} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 4 }}>WHO YOU ARE</text>
          </g>
        </g>
        <g opacity={on(f, stakes, 8)}><path d="M960 180 L960 820" stroke={INK} strokeWidth={4} strokeDasharray="14 14" /></g>
        <Person f={f} who="hero" beats={heroC} x={CX} s={0.5} />
        <g opacity={on(f, s31, 8)}>
          <rect x={0} y={0} width={W} height={150} fill="#FFF6E2" />
          <Headline text={f >= normal ? 'MAKE FAILING FEEL NORMAL' : 'NOT: STOP CARING'} o={on(f, caring - 6, 8)} color={f >= normal ? LEAF : GREY} y={120} />
        </g>
      </g>}
      <Vig id="fff" />
    </g>
  )
}

// ---------------------------------------------------------------- DINNER s32–s37
const Kitchen: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect width={W} height={H} fill="#FCE7B8" />
    <rect x={0} y={GROUND - 20} width={W} height={H} fill="#E7B98A" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170} y={GROUND - 20} width={4} height={H} fill="#CF9E6E" />)}
    {/* # window with a palm tree outside */}
    <g transform="translate(1460 120)">
      <rect x={0} y={0} width={420} height={320} rx={14} fill="#9FDDF2" stroke="#FFFFFF" strokeWidth={18} />
      <path d={`M240 320 Q230 200 260 120`} stroke="#8A6040" strokeWidth={18} fill="none" />
      {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M260 120 q${-120 + k * 60} ${-30 + Math.abs(k - 2) * 30 + Math.sin(f / 20 + k) * 4} ${-150 + k * 75} ${40 + Math.abs(k - 2) * 20}`} stroke={LEAF} strokeWidth={22} fill="none" strokeLinecap="round" />)}
      <path d="M210 0 L210 320 M0 160 L420 160" stroke="#FFFFFF" strokeWidth={10} />
    </g>
    {/* # a hanging lamp */}
    <path d="M1000 0 L1000 160" stroke={INK} strokeWidth={4} />
    <path d="M920 220 Q1000 130 1080 220 Z" fill={CORAL} stroke={INK} strokeWidth={5} />
    <ellipse cx={1000} cy={230} rx={30} ry={10} fill={SUN_L} />
  </g>
)
const Table: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-560} y={0} width={1120} height={36} rx={8} fill="#B97B4E" stroke={INK} strokeWidth={5} />
    <rect x={-560} y={36} width={1120} height={150} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-560 + k * 140} y={36} width={70} height={150} fill={CORAL} opacity={0.35} />)}
    {[-360, 0, 360].map((px) => <g key={px}><ellipse cx={px} cy={-6} rx={90} ry={22} fill="#FFFFFF" stroke={INK} strokeWidth={4} /><ellipse cx={px} cy={-12} rx={50} ry={10} fill={SUN} /></g>)}
  </g>
)

const Dinner: React.FC<PieceProps> = ({ f, c }) => {
  const s32 = c('s32'), dinner = c('s32:dinner'), florida = c('s32:florida')
  const s33 = c('s33'), sara = c('s33:sara'), dad = c('s33:dad'), strange = c('s33:strange'), habit = c('s33:habit'), brother = c('s33:brother'), question = c('s33:question')
  const s34 = c('s34'), fail = c('s34:fail'), week = c('s34:week')
  const s35 = c('s35'), answer = c('s35:answer'), disappointed = c('s35:disappointed')
  const s36 = c('s36'), kid = c('s36:kid'), secret = c('s36:secret'), table = c('s36:table'), loud = c('s36:loud'), every = c('s36:every')
  const s37 = c('s37'), only = c('s37:only'), failure = c('s37:failure'), trying = c('s37:trying')

  const TY = GROUND - 330
  const dadB: Beat[] = [[0, 'idle', 'smiling'], [dad, 'waveA', 'smiling'], [dad + 10, 'idle', 'smiling'], [c('s33:ask'), 'talk', 'smiling'], [question, 'talk', 'neutral'], [fail, 'point', 'smiling'], [answer, 'idle', 'neutral'], [disappointed, 'shrug', 'worried'], [s36, 'idle', 'neutral'], [c('s36:stops'), 'explain', 'smiling'], [loud, 'clapA', 'smiling'], [loud + 8, 'clapB', 'smiling'], [loud + 16, 'clapA', 'smiling'], [s37, 'present', 'smiling'], [trying, 'thumbsUp', 'smiling']]
  const saraB: Beat[] = [[0, 'idle', 'neutral'], [sara, 'waveA', 'smiling'], [sara + 10, 'idle', 'smiling'], [fail, 'think', 'thinking'], [answer, 'shrug', 'worried'], [loud, 'pointUp', 'smiling'], [s37, 'celebrate', 'smiling']]
  const broB: Beat[] = [[0, 'idle', 'neutral'], [brother, 'waveA', 'smiling'], [brother + 10, 'idle', 'neutral'], [answer, 'shrug', 'worried'], [loud + 6, 'pointUp', 'smiling'], [s37, 'celebrate', 'smiling']]
  const lid = easeOut(span(f, secret, secret + 16))

  return (
    <g>
      <Kitchen f={f} />
      <g opacity={on(f, florida, 8) * (1 - on(f, s34, 8))}><Tag x={330} y={180} text="FLORIDA" fill={SUN} s={pop(f, florida)} /></g>
      {/* # people sit behind the table (their legs are hidden by it) */}
      <Person f={f} who="lib-blakely-dad" beats={dadB} x={1360} y={GROUND - 60} s={0.66} flip />
      <Person f={f} who="lib-sara-kid" beats={saraB} x={600} y={GROUND - 20} s={0.44} />
      <Person f={f} who="lib-brother-kid" beats={broB} x={860} y={GROUND - 20} s={0.44} />
      <Table x={CX} y={TY + 230} />
      <NameTag x={600} y={GROUND - 380} name="SARA BLAKELY" o={on(f, sara, 8)} s={0.85} />
      <g opacity={on(f, brother, 8) * (1 - on(f, fail, 8))}><Tag x={860} y={GROUND - 380} text="HER BROTHER" fill="#FFFFFF" size={40} /></g>
      <g opacity={win(f, strange, s34)}><Tag x={400} y={300} text="A STRANGE HABIT" fill="#FFFFFF" s={pop(f, strange)} /></g>
      <Say x={1060} y={290} lines={['WHAT DID YOU FAIL AT', 'THIS WEEK?']} o={win(f, fail - 4, s36)} s={pop(f, fail - 4)} tail="right" size={62} fill={SUN_L} />
      <g opacity={win(f, answer, s36)}><Say x={720} y={430} lines={['UM…']} s={pop(f, answer) * 0.8} /></g>
      <g opacity={win(f, disappointed, s36)}><Tag x={1360} y={500} text="DISAPPOINTED" fill={GREY} ink="#FFFFFF" size={44} s={pop(f, disappointed)} /></g>
      {/* # failing stops being a secret: a locked box on the table opens */}
      <g opacity={win(f, kid, s37)} transform={`translate(1110 ${TY + 150})`}>
        <rect x={-120} y={-110} width={240} height={110} rx={10} fill="#6B4A3A" stroke={INK} strokeWidth={5} />
        <g transform={`translate(-120 -110) rotate(${-lid * 70})`}><rect x={0} y={-24} width={240} height={28} rx={6} fill="#8A6050" stroke={INK} strokeWidth={5} /></g>
        <text y={-40} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>FAILURES</text>
        {lid > 0.3 && <text y={-150} textAnchor="middle" fill={CORAL_D} opacity={lid} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>NOT A SECRET</text>}
      </g>
      <Say x={480} y={300} lines={['I FAILED AT…!']} o={win(f, loud, s37 + 20)} s={pop(f, loud) * 0.8} />
      <Say x={980} y={250} lines={['ME TOO!']} o={win(f, loud + 8, s37 + 20)} s={pop(f, loud + 8) * 0.8} />
      <g opacity={on(f, every, 8) * (1 - on(f, s37, 8))}><Tag x={1500} y={420} text="EVERY WEEK" fill={SUN} s={pop(f, every)} /></g>
      <Headline text="A DINNER TABLE IN FLORIDA" o={win(f, dinner, s33 + 10)} />
      <g opacity={on(f, only, 8)}>
        <rect x={360} y={40} width={1200} height={130} rx={24} fill={BURG} stroke={INK} strokeWidth={5} />
        <text x={CX} y={130} textAnchor="middle" fill={CREAM} style={{ font: '400 74px "Bebas Neue"', letterSpacing: 4 }}>{f >= trying ? 'THE ONLY FAILURE: NOT TRYING' : f >= failure ? 'THE ONLY FAILURE…' : ''}</text>
      </g>
      <Vig id="ffd" />
      <defs><radialGradient id="ffd-vg" cx="0.5" cy="0.5" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.18} /></radialGradient></defs>
    </g>
  )
}

// ---------------------------------------------------------------- SARA s38–s43
const Door: React.FC<{ x: number; no: number; tone: string }> = ({ x, no, tone }) => (
  <g transform={`translate(${x} ${GROUND - 20})`}>
    <rect x={-100} y={-380} width={200} height={380} fill={tone} stroke={INK} strokeWidth={5} />
    <rect x={-70} y={-340} width={140} height={110} rx={6} fill="#FFFFFF" opacity={0.5} />
    <circle cx={70} cy={-180} r={10} fill={GOLD} />
    {no > 0.001 && <g transform={`translate(0 -460) scale(${no})`}><rect x={-70} y={-40} width={140} height={80} rx={20} fill={CORAL} stroke={INK} strokeWidth={5} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"', letterSpacing: 4 }}>NO</text></g>}
  </g>
)

const Sara: React.FC<PieceProps> = ({ f, c }) => {
  const s38 = c('s38'), later = c('s38:later'), lawyer = c('s38:lawyer'), exam = c('s38:exam'), score = c('s38:score'), needed = c('s38:needed')
  const s39 = c('s39'), fax = c('s39:fax'), door = c('s39:door'), no = c('s39:no'), over = c('s39:over'), again = c('s39:again')
  const s40 = c('s40'), party = c('s40:party'), feet = c('s40:feet'), tights = c('s40:tights'), white = c('s40:white'), idea = c('s40:idea')
  const s41 = c('s41'), thousand = c('s41:thousand'), savings = c('s41:savings'), investors = c('s41:investors'), fashion = c('s41:fashion')
  const s42 = c('s42'), spanx = c('s42:spanx'), forbes = c('s42:forbes'), billionaire = c('s42:billionaire')
  const s43 = c('s43'), question = c('s43:question'), result = c('s43:result'), try2 = c('s43:try')

  const A = win(f, 0, s39 + 2), B = win(f, s39, s40 + 2), C = win(f, s40, s42 + 2), D = on(f, s42, 10)
  const her: Beat[] = [[0, 'idle', 'neutral'], [later, 'waveA', 'smiling'], [later + 10, 'idle', 'smiling'], [lawyer, 'lookFar', 'smiling'], [c('s38:took'), 'hold', 'neutral'], [exam, 'read', 'thinking'], [score, 'despair', 'worried'], [needed, 'slump', 'worried']]
  const walkX = lerp(200, 1700, easeOut(span(f, fax, s40 - 4)))
  const her2: Beat[] = [[s39, 'carry', 'neutral'], ...walkBeats(fax, s40 - 4, 'neutral').map(([t, p, e]) => [t, p === 'walkA' ? 'carry' : 'carryHeavy', e] as Beat)]
  const her3: Beat[] = [[s40, 'idle', 'thinking'], [feet, 'hold', 'thinking'], [white, 'think', 'thinking'], [idea, 'celebrate', 'smiling'], [s41, 'present', 'smiling'], [investors, 'crossNoA', 'neutral'], [fashion, 'crossNoB', 'neutral']]
  const her4: Beat[] = [[s42, 'holdUp', 'smiling'], [forbes, 'celebrate', 'smiling'], [s43, 'idle', 'smiling'], [question, 'think', 'smiling'], [try2, 'thumbsUp', 'smiling']]
  const doors = [520, 820, 1120, 1420, 1720]
  const snip = easeOut(span(f, feet, feet + 12))

  return (
    <g>
      <Sky id="ffr" warm={1} />
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={SAND} />
        <Person f={f} who="lib-blakely" beats={her} x={500} s={0.68} />
        <NameTag x={500} y={GROUND - 520} name="SARA BLAKELY" o={on(f, later, 8)} s={0.85} />
        <g opacity={on(f, lawyer, 8)} transform={`translate(1160 330) scale(${pop(f, lawyer)})`}>
          <ellipse rx={380} ry={120} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={-280} cy={130} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={4} /><circle cx={-330} cy={190} r={12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
          <text y={18} textAnchor="middle" fill={BURG} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 5 }}>A LAWYER, LIKE DAD</text>
        </g>
        <g opacity={on(f, exam, 8)} transform={`translate(1160 680) rotate(4) scale(${pop(f, exam)})`}>
          <rect x={-200} y={-130} width={400} height={260} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <text y={-60} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>LAW SCHOOL ENTRANCE EXAM</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-150} y={-20 + k * 34} width={300} height={10} rx={5} fill={GREY} opacity={0.5} />)}
        </g>
        <g opacity={on(f, score, 8)}><Tag x={1300} y={790} text="NOT THE SCORE SHE NEEDED" fill={CORAL} ink="#FFFFFF" r={-6} size={46} s={pop(f, score)} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill="#D9C8A8" />
        {doors.map((x, k) => <Door key={x} x={x} tone={[CORAL, '#9BD3F0', LEAF, SUN, '#C7A6E0'][k]} no={pop(f, no + k * 14)} />)}
        <Person f={f} who="lib-blakely" beats={her2} x={walkX} s={0.56} />
        {/* # the fax machine she carries */}
        <g transform={`translate(${walkX + 30} ${GROUND - 220})`}>
          <rect x={-60} y={-40} width={120} height={70} rx={8} fill="#E3E6EA" stroke={INK} strokeWidth={4} /><rect x={-40} y={-60} width={80} height={24} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
        </g>
        <g opacity={on(f, fax, 8)}><Tag x={300} y={200} text="SELLING FAX MACHINES" fill="#FFFFFF" s={pop(f, fax)} size={48} /></g>
        <g opacity={on(f, door, 8)}><Tag x={300} y={330} text="DOOR TO DOOR" fill={SUN_L} s={pop(f, door)} size={48} /></g>
        <Headline text={f >= again ? 'OVER AND OVER AGAIN' : f >= over ? 'OVER AND OVER…' : ''} o={on(f, over, 8)} color={CORAL_D} y={110} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={SAND} />
        <Person f={f} who="lib-blakely" beats={her3} x={420} s={0.66} />
        <NameTag x={420} y={GROUND - 510} name="SARA BLAKELY" o={1} s={0.8} />
        <g opacity={on(f, party, 8) * (1 - on(f, s41, 8))}><Tag x={420} y={200} text="GETTING READY FOR A PARTY" fill="#FFFFFF" size={44} /></g>
        {/* # tights + scissors */}
        <g opacity={on(f, feet - 6, 8) * (1 - on(f, s41, 8))} transform="translate(1020 300)">
          <path d="M-90 0 L-80 380 L-20 400 L-10 120 L10 120 L20 400 L80 380 L90 0 Z" fill="#E7C3A8" stroke={INK} strokeWidth={5} />
          <g transform={`translate(0 ${snip * 60})`} opacity={1 - snip}><path d="M-80 380 L-20 400 L-22 440 L-84 430 Z M80 380 L20 400 L22 440 L84 430 Z" fill="#E7C3A8" stroke={INK} strokeWidth={4} /></g>
          <g transform={`translate(${lerp(-200, 0, snip)} 370) rotate(${Math.sin(f / 2) * 10 * (1 - snip)})`}>
            <circle cx={-60} cy={-20} r={20} fill="none" stroke={CORAL} strokeWidth={8} /><circle cx={-60} cy={20} r={20} fill="none" stroke={CORAL} strokeWidth={8} />
            <path d="M-40 -14 L60 10 M-40 14 L60 -10" stroke={GREY} strokeWidth={8} strokeLinecap="round" />
          </g>
          <g opacity={on(f, tights, 8)}><Tag x={0} y={-70} text="TIGHTS, FEET CUT OFF" fill="#FFFFFF" size={40} /></g>
        </g>
        <g opacity={on(f, white, 8) * (1 - on(f, s41, 8))}><Tag x={1460} y={420} text="UNDER WHITE TROUSERS" fill="#FFFFFF" size={44} s={pop(f, white)} /></g>
        <g opacity={on(f, idea, 8) * (1 - on(f, s41, 8))} transform={`translate(1460 650) scale(${pop(f, idea)})`}>
          <circle r={130} fill={SUN_L} opacity={0.6} />
          <path d="M-50 20 Q-80 -60 0 -80 Q80 -60 50 20 L30 50 L-30 50 Z" fill={SUN} stroke={INK} strokeWidth={5} />
          <rect x={-30} y={50} width={60} height={30} rx={6} fill={GREY} stroke={INK} strokeWidth={4} />
        </g>
        {/* # $5,000 of savings, no investors, no fashion background */}
        <g opacity={on(f, s41, 8)}>
          <g transform={`translate(1000 560) scale(${pop(f, thousand)})`}>
            <path d="M-130 -160 L130 -160 L150 160 Q0 200 -150 160 Z" fill="#DDF3F6" stroke={INK} strokeWidth={5} opacity={0.9} />
            <rect x={-100} y={-30} width={200} height={160} rx={10} fill={LEAF} opacity={0.8} />
            <text y={-80} textAnchor="middle" fill={INK} style={{ font: '400 72px "Bebas Neue"' }}>$5,000</text>
          </g>
          <g opacity={on(f, savings, 8)}><Tag x={1000} y={830} text="HER OWN SAVINGS" fill={SUN} size={44} /></g>
          <g opacity={on(f, investors, 8)} transform="translate(1500 380)"><Tag x={0} y={0} text="INVESTORS" fill="#FFFFFF" size={50} /><Mark x={170} y={-30} ok={false} s={0.6} /></g>
          <g opacity={on(f, fashion, 8)} transform="translate(1500 580)"><Tag x={0} y={0} text="FASHION BACKGROUND" fill="#FFFFFF" size={50} /><Mark x={260} y={-30} ok={false} s={0.6} /></g>
        </g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <rect width={W} height={H} fill="#FFF1DC" />
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={SAND} />
        <Person f={f} who="lib-blakely" beats={her4} x={460} s={0.66} />
        <NameTag x={460} y={GROUND - 520} name="SARA BLAKELY" o={1} s={0.8} />
        {/* # the box of her idea */}
        <g transform={`translate(900 ${GROUND - 120}) scale(${pop(f, spanx)})`} opacity={on(f, spanx, 8) * (1 - on(f, s43, 10))}>
          <rect x={-150} y={-120} width={300} height={200} rx={14} fill={CORAL} stroke={INK} strokeWidth={5} />
          <text y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 80px "Bebas Neue"', letterSpacing: 6 }}>SPANX</text>
        </g>
        {/* # the magazine card */}
        <g opacity={on(f, forbes, 8) * (1 - on(f, s43, 10))} transform={`translate(1440 470) rotate(3) scale(${pop(f, forbes)})`}>
          <rect x={-250} y={-320} width={500} height={640} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <rect x={-250} y={-320} width={500} height={120} rx={12} fill={BURG} />
          <text y={-238} textAnchor="middle" fill={CREAM} style={{ font: '400 84px "Bebas Neue"', letterSpacing: 8 }}>FORBES · 2012</text>
          <text y={-60} textAnchor="middle" fill={INK} opacity={on(f, c('s42:youngest'), 8)} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 2 }}>YOUNGEST</text>
          <text y={10} textAnchor="middle" fill={INK} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 2 }}>SELF-MADE</text>
          <text y={80} textAnchor="middle" fill={INK} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 2 }}>FEMALE</text>
          <text y={190} textAnchor="middle" fill={GOLD} opacity={on(f, billionaire, 8)} style={{ font: '400 86px "Bebas Neue"', letterSpacing: 3 }}>BILLIONAIRE</text>
        </g>
        <g opacity={on(f, s43, 10)}>
          <Say x={1260} y={330} lines={['WHAT DID YOU FAIL AT', 'THIS WEEK?']} s={pop(f, question) * 0.9} o={on(f, question, 8)} tail="left" fill={SUN_L} size={56} />
          <g opacity={on(f, result, 8)} transform="translate(1260 650)"><text textAnchor="middle" fill={GREY} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>FAILURE ≠ THE RESULT</text></g>
          <g opacity={on(f, c('s43:happens'), 8)}><Tag x={1260} y={800} text="IT'S WHAT HAPPENS WHEN YOU TRY" fill={LEAF} ink="#FFFFFF" s={pop(f, c('s43:happens'))} size={54} /></g>
        </g>
      </g>}
      <Vig id="ffr" />
    </g>
  )
}

export const FF_FIVE = makePiece('ff-five', 'Fear: five fears inside one, being seen falling', {
  beats: ['s21', 's21:part', 's21:miss', 's22', 's22:researchers', 's22:closely', 's22:fear', 's22:failing', 's22:really', 's22:itself', 's23', 's23:conroy', 's23:colleagues', 's23:questionnaire', 's23:five', 's23:separate', 's23:hiding', 's23:feeling', 's24', 's24:shame', 's24:embarrassment', 's24:thinking', 's24:yourself', 's24:uncertain', 's24:future', 's24:people', 's24:interest', 's24:letting', 's24:matter', 's25', 's25:list', 's25:almost', 's25:people', 's26', 's26:fall', 's26:seen', 's26:falling', 's27', 's27:practise', 's27:happily', 's27:own', 's27:freeze', 's27:watching', 's28', 's28:stakes', 's28:head', 's28:higher', 's28:real', 's29', 's29:attempt', 's29:afternoon', 's29:money', 's29:awkward', 's29:week', 's30', 's30:costs', 's31', 's31:caring', 's31:normal', 's31:threatening'],
  sfx: [['s22:itself', 'swish'], ['s23:questionnaire', 'softpop'], ['s23:five', 'pop'], ['s24:shame', 'softpop'], ['s24:thinking', 'softpop'], ['s24:uncertain', 'softpop'], ['s24:interest', 'softpop'], ['s24:letting', 'softpop'], ['s25:people', 'ding'], ['s27:freeze', 'thud'], ['s30:costs', 'impact'], ['s31:normal', 'chime']],
  Component: Five, mood: 'light',
})
export const FF_DINNER = makePiece('ff-dinner', 'Fear: Sara Blakely and the dinner table question', {
  beats: ['s32', 's32:dinner', 's32:florida', 's33', 's33:sara', 's33:dad', 's33:strange', 's33:habit', 's33:ask', 's33:brother', 's33:question', 's34', 's34:fail', 's34:week', 's35', 's35:answer', 's35:disappointed', 's36', 's36:kid', 's36:stops', 's36:secret', 's36:table', 's36:loud', 's36:every', 's37', 's37:only', 's37:failure', 's37:trying'],
  sfx: [['s33:sara', 'softpop'], ['s34:fail', 'ding'], ['s35:disappointed', 'thud'], ['s36:secret', 'click'], ['s36:loud', 'pop'], ['s37:trying', 'chime']],
  Component: Dinner, mood: 'light',
})
export const FF_SARA = makePiece('ff-sara', 'Fear: Sara Blakely, fax machines to Spanx', {
  beats: ['s38', 's38:later', 's38:lawyer', 's38:took', 's38:exam', 's38:score', 's38:needed', 's39', 's39:fax', 's39:door', 's39:no', 's39:over', 's39:again', 's40', 's40:party', 's40:feet', 's40:tights', 's40:white', 's40:idea', 's41', 's41:thousand', 's41:savings', 's41:investors', 's41:fashion', 's42', 's42:spanx', 's42:twenty', 's42:forbes', 's42:youngest', 's42:billionaire', 's43', 's43:question', 's43:failure', 's43:result', 's43:happens', 's43:try'],
  sfx: [['s38:score', 'thud'], ['s39:no', 'pop'], ['s40:feet', 'click'], ['s40:idea', 'ding'], ['s41:thousand', 'coin'], ['s41:investors', 'tick'], ['s42:spanx', 'pop'], ['s42:billionaire', 'cash'], ['s43:try', 'chime']],
  Component: Sara, mood: 'light',
})
