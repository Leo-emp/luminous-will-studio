// ---------------------------------------------------------------- "Why You're So Afraid of Failing" — part 1 (s1–s20)
// HOOK s1–s9) the sunny pool. You look up at the diving board; the things you've wanted to try hang as flags on a
//    bunting line (A BUSINESS · A SONG · ASK THEM OUT · THE BIG JOB); shower and bus daydream bubbles; you climb, walk to
//    the end of the board, look down… NOT YET. You walk back. Excuse tags (TIMING · MONEY · NOT READY) pop and fall
//    away; the real fears: WHAT IF IT DOESN'T WORK? · WHAT DOES IT SAY ABOUT ME? A three-card roadmap; then a brain
//    with a shield: NOT WEAK — PROTECTIVE.
// COIN s10–s15) a seaside fair stall: a coin flips. TAILS −$100 · HEADS +$150; a paper: GOOD DEAL ✓. Daniel Kahneman
//    (labelled) asks a little crowd — everyone says NO. Amos Tversky joins him (labelled); the papers stack up and a
//    banner unrolls: LOSS AVERSION. Two bars: LOSING hurts ×2 against GAINING.
// SCALE s16–s20) a big balance scale: WIN on one pan, LOSS on the other; a second weight drops (×2) and it tips. A
//    campfire tribe: MISSED A MEAL = annoying, LEFT THE GROUP = danger (one little figure drifts away). Today: the same
//    wiring sees a REJECTED letter and an awkward chat as a THREAT (an alarm flashes). Back to the scale: TILTED.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Mini } from '../../rig/Mini'
import {
  Board, Cash, Cloud, Coin, Headline, Mark, NameTag, Parasol, Person, Pool, Ring, Say, Scale, Sky, SunDisc, Tag, Vig, Weight, walkBeats, win,
  AQUA, AQUA_D, BURG, CORAL, CORAL_D, CREAM, GOLD, GOLD_L, GREY, INK, LEAF, SAND, SUN, SUN_L, TILE, CX, GROUND, W, H, on, pop, lerp, span, easeOut, type Beat,
} from './kit'

// # a pink cartoon brain (optionally with a gold shield in front)
const Brain: React.FC<{ x: number; y: number; s?: number; shield?: number; glow?: number }> = ({ x, y, s = 1, shield = 0, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 && <circle r={170} fill={GOLD_L} opacity={0.5 * glow} />}
    <path d="M-120 20 C-150 -40 -110 -110 -50 -110 C-30 -140 30 -140 50 -110 C110 -110 150 -40 120 20 C130 70 80 100 40 90 C20 110 -20 110 -40 90 C-80 100 -130 70 -120 20 Z" fill="#F6A9B8" stroke={INK} strokeWidth={6} />
    <path d="M0 -120 L0 90 M-90 -50 Q-50 -30 -70 10 M-40 40 Q-70 60 -100 40 M80 -60 Q40 -40 70 0 M50 50 Q80 70 100 40" stroke="#D97C90" strokeWidth={6} fill="none" strokeLinecap="round" />
    {shield > 0.001 && <g transform={`translate(110 50) scale(${shield})`}>
      <path d="M0 -80 L70 -56 L64 20 Q50 70 0 90 Q-50 70 -64 20 L-70 -56 Z" fill={GOLD} stroke={INK} strokeWidth={6} />
      <path d="M-26 6 L-6 28 L30 -18" stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
  </g>
)

// # a flag on the bunting line with a word
const Flag: React.FC<{ x: number; y: number; text: string; o: number; tone: string }> = ({ x, y, text, o, tone }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${(1 - o) * -20})`} opacity={o}>
    <path d={`M-${text.length * 13 + 30} 0 L${text.length * 13 + 30} 0 L${text.length * 13 + 30} 70 L0 96 L-${text.length * 13 + 30} 70 Z`} fill={tone} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <text y={52} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

// # a small daydream bubble with an icon word
const Dream: React.FC<{ x: number; y: number; text: string; o: number }> = ({ x, y, text, o }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * o})`} opacity={o}>
    <circle cx={-80} cy={110} r={12} fill="#FFFFFF" stroke={INK} strokeWidth={3} /><circle cx={-50} cy={80} r={18} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
    <ellipse rx={text.length * 14 + 70} ry={56} fill="#FFFFFF" stroke={INK} strokeWidth={4} />
    <text y={14} textAnchor="middle" fill={AQUA_D} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const wanted = c('s1:wanted'), years = c('s1:years')
  const s2 = c('s2'), business = c('s2:business'), song = c('s2:song'), asking = c('s2:asking'), job = c('s2:job'), big = c('s2:big')
  const s3 = c('s3'), shower = c('s3:shower'), bus = c('s3:bus'), pictured = c('s3:pictured'), feel = c('s3:feel')
  const s4 = c('s4'), single = c('s4:single'), quietly = c('s4:quietly'), yet = c('s4:yet')
  const s5 = c('s5'), timing = c('s5:timing'), money = c('s5:money'), ready = c('s5:ready')
  const s6 = c('s6'), honest = c('s6:honest'), really = c('s6:really')
  const s7 = c('s7'), scared = c('s7:scared'), work = c('s7:work'), mean = c('s7:mean')
  const s8 = c('s8'), comes = c('s8:comes'), bigger = c('s8:bigger'), fearless = c('s8:fearless'), differently = c('s8:differently')
  const s9 = c('s9'), think9 = c('s9:think'), fear9 = c('s9:fear'), end = c('s9:end'), weak = c('s9:weak'), brain = c('s9:brain'), well = c('s9:well')

  // # where the hero is: deck → up the ladder → out to the tip → back to the ladder top → down to the deck (on "honest")
  const BX = 640, BH = 240, TOP = GROUND - 40 - BH
  const climb = easeOut(span(f, pictured, pictured + 40)), out = easeOut(span(f, feel - 6, single)), back = easeOut(span(f, yet + 10, yet + 50)), down = easeOut(span(f, honest, honest + 30))
  const hx = lerp(lerp(lerp(BX - 160, BX - 20, climb), BX + 360, out), BX - 20, back) + lerp(0, -140, down)
  const hy = lerp(lerp(GROUND, TOP, climb), GROUND, down)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [wanted, 'lookFar', 'thinking'], [years, 'pointUp', 'smiling'], [s2, 'lookFar', 'smiling'], [c('s2:applying'), 'point', 'smiling'], [shower, 'think', 'smiling'], [bus, 'think', 'smiling'],
    [pictured, 'reachUp', 'smiling'], ...walkBeats(feel - 6, single, 'smiling'), [single, 'nervous', 'worried'], [quietly, 'nervous', 'worried'], [yet, 'stop', 'worried'],
    ...walkBeats(yet + 10, yet + 50, 'worried'), [yet + 50, 'slump', 'worried'], [timing, 'shrug', 'neutral'], [money, 'emptyPockets', 'neutral'], [c('s5:need'), 'emptyPockets', 'worried'], [ready, 'shrug', 'worried'],
    ...walkBeats(honest, honest + 30, 'neutral'), [honest + 30, 'idle', 'thinking'], [scared, 'nervous', 'worried'], [mean, 'despair', 'worried'], [s8, 'idle', 'neutral'], [comes, 'point', 'neutral'], [c('s8:why'), 'think', 'thinking'], [fearless, 'explain', 'neutral'], [s9, 'idle', 'thinking'], [c('s9:see'), 'nodA', 'smiling'], [weak, 'crossNoA', 'neutral'], [brain, 'present', 'smiling'], [well, 'thumbsUp', 'smiling']]

  const flags: [number, string, string][] = [[business, 'A BUSINESS', SUN], [song, 'A SONG', CORAL], [asking, 'ASK THEM OUT', '#9BD3F0'], [job, 'THE BIG JOB', LEAF]]
  const flagsOut = on(f, s4, 10)
  // # two rows of flags (x, y) so the long words never overlap the board or each other
  const flagXY: [number, number][] = [[1290, 230], [1560, 230], [1260, 380], [1640, 380]]
  const excuses: [number, string][] = [[timing, 'TIMING'], [money, 'MONEY'], [ready, 'NOT READY']]
  const exOut = easeOut(span(f, honest, honest + 18))
  const road: [number, string][] = [[comes, 'WHERE IT COMES FROM'], [bigger, 'WHY IT FEELS SO BIG'], [fearless, 'WHAT FEARLESS PEOPLE DO']]
  const R = win(f, s8, think9), Bn = on(f, think9, 12)

  return (
    <g>
      <Sky id="ffh" />
      <SunDisc x={140} y={150} f={f} r={60} />
      <Cloud x={520} y={150} s={1.0} /><Cloud x={1150} y={110} s={0.8} />
      <Pool f={f} />
      <Parasol x={200} s={0.9} />
      <Ring x={1500} y={GROUND + 70} s={0.7} r={f * 0.3} />
      <Board x={BX} h={BH} len={420} bend={out > 0.9 && back < 0.1 ? 8 + Math.sin(f / 3) * 3 : 0} />
      {/* # the bunting line of things you've wanted to try */}
      <g opacity={1 - flagsOut}>
        <path d="M1100 225 L1780 225 M1060 375 L1820 375" stroke={INK} strokeWidth={4} fill="none" opacity={on(f, business - 8, 10)} />
        {flags.map(([at, t, tone], k) => <Flag key={t} x={flagXY[k][0]} y={flagXY[k][1]} text={t} o={on(f, at, 10)} tone={tone} />)}
      </g>
      <g opacity={on(f, big, 10) * (1 - on(f, s3, 8))}><Tag x={1480} y={520} text="A SIZE TOO BIG" s={pop(f, big)} fill={CREAM} ink={BURG} /></g>
      {/* # daydreams */}
      <g opacity={1 - on(f, s4, 8)}>
        <Dream x={360} y={330} text="IN THE SHOWER" o={on(f, shower, 10)} />
        <Dream x={780} y={220} text="ON THE BUS" o={on(f, bus, 10)} />
        <Dream x={1480} y={560} text="HOW GOOD IT WOULD FEEL" o={on(f, feel, 10)} />
      </g>
      {/* # at the tip: looking down, NOT YET */}
      <g opacity={win(f, single, s5)}><Tag x={BX + 360} y={TOP + 200} text="THAT'S A LONG WAY DOWN" s={0.8} fill="#FFFFFF" size={44} o={on(f, single, 10) * (1 - on(f, quietly, 8))} /></g>
      <Say x={BX + 560} y={TOP - 330} lines={['NOT YET.']} o={win(f, yet, s5 + 10)} s={pop(f, yet)} size={72} />
      {/* # the excuses */}
      {excuses.map(([at, t], k) => <g key={t} transform={`translate(0 ${exOut * 600})`}><Tag x={1200 + k * 230} y={380 + (k % 2) * 90} text={t} r={-6 + k * 6} s={pop(f, at)} o={on(f, at, 8) * (1 - exOut)} fill={TILE} /></g>)}
      <Headline text="BUT IF YOU'RE HONEST…" o={win(f, honest, s7)} color={BURG} />
      {/* # the real fears */}
      <g opacity={win(f, scared, s8)}>
        <Say x={1340} y={360} lines={['WHAT IF IT', "DOESN'T WORK?"]} o={on(f, work - 6, 10)} s={pop(f, work - 6)} tail="left" />
        <Say x={1340} y={620} lines={['WHAT DOES THAT', 'SAY ABOUT ME?']} o={on(f, mean, 10)} s={pop(f, mean)} fill={SUN_L} tail="left" />
      </g>
      {/* # roadmap: three cards */}
      {R > 0.001 && <g opacity={R}>
        {road.map(([at, t], k) => <g key={t} transform={`translate(${1000 + k * 0} ${260 + k * 170}) scale(${pop(f, at)})`} opacity={on(f, at, 8)}>
          <rect x={0} y={-60} width={760} height={120} rx={24} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <circle cx={70} cy={0} r={40} fill={[CORAL, SUN, AQUA][k]} stroke={INK} strokeWidth={4} />
          <text x={70} y={16} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"' }}>{k + 1}</text>
          <text x={140} y={18} fill={INK} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>
        </g>)}
        <g opacity={on(f, differently, 8)}><Mark x={1720} y={600} ok s={pop(f, differently) * 0.8} /></g>
      </g>}
      {/* # not weak: a brain with a shield */}
      {Bn > 0.001 && <g opacity={Bn}>
        <g opacity={on(f, weak, 8)} transform={`translate(1360 300) scale(${pop(f, weak)})`}>
          <text textAnchor="middle" y={20} fill={GREY} style={{ font: '400 90px "Bebas Neue"', letterSpacing: 4 }}>WEAK</text>
          <path d="M-120 -10 L120 -10" stroke={CORAL} strokeWidth={14} strokeLinecap="round" />
        </g>
        <g opacity={on(f, fear9, 8)}><Tag x={1360} y={170} text="FEAR OF FAILURE" fill={CORAL} ink="#FFFFFF" s={pop(f, fear9)} /></g>
        <Brain x={1360} y={620} s={pop(f, brain) * 1.1} shield={on(f, brain + 10, 12)} glow={on(f, well, 12)} />
        <Tag x={1360} y={850} text="DOING ITS JOB TOO WELL" s={0.8 * pop(f, well)} o={on(f, well, 8)} fill={SUN_L} size={48} />
      </g>}
      <Person f={f} who="hero" beats={hero} x={hx} y={hy} s={0.62} />
      <Headline text="THE THING YOU KEEP PUTTING OFF" o={win(f, s1Start(), s2)} />
      <Vig id="ffh" />
    </g>
  )
}
// # the hook's opening headline sits from the first frame
const s1Start = () => 0

// ---------------------------------------------------------------- COIN s10–s15
const Stall: React.FC<{ id: string }> = ({ id }) => (
  <g>
    <Sky id={id} />
    <rect x={0} y={GROUND - 20} width={W} height={H - GROUND + 20} fill={SAND} />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={k * 140} y={GROUND - 20} width={6} height={H} fill="#E2C795" />)}
    {/* # the stall: striped awning, posts, a counter */}
    <g transform="translate(300 0)">
      <rect x={20} y={300} width={16} height={GROUND - 300} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <rect x={1284} y={300} width={16} height={GROUND - 300} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      {Array.from({ length: 11 }, (_, k) => <path key={k} d={`M${k * 120} 220 L${k * 120 + 120} 220 L${k * 120 + 120} 330 Q${k * 120 + 60} 370 ${k * 120} 330 Z`} fill={k % 2 ? '#FFFFFF' : CORAL} stroke={INK} strokeWidth={4} />)}
      <rect x={0} y={140} width={1320} height={84} rx={14} fill={SUN} stroke={INK} strokeWidth={5} />
      <text x={660} y={200} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 8 }}>A SIMPLE BET</text>
      <rect x={60} y={GROUND - 200} width={1200} height={200} fill="#C9895B" stroke={INK} strokeWidth={5} />
      <rect x={60} y={GROUND - 200} width={1200} height={30} fill="#E0A574" stroke={INK} strokeWidth={5} />
    </g>
  </g>
)

const CoinBet: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10'), simple = c('s10:simple'), bet = c('s10:bet')
  const s11 = c('s11'), flip = c('s11:flip'), tails = c('s11:tails'), lose = c('s11:lose'), heads = c('s11:heads'), win2 = c('s11:win'), fifty = c('s11:fifty')
  const s12 = c('s12'), paper = c('s12:paper'), deal = c('s12:deal'), take = c('s12:take')
  const s13 = c('s13'), kahneman = c('s13:kahneman'), asked = c('s13:asked'), people = c('s13:people'), no = c('s13:no')
  const s14 = c('s14'), tversky = c('s14:tversky'), years = c('s14:years'), name = c('s14:name'), aversion = c('s14:aversion')
  const s15 = c('s15'), losing = c('s15:losing'), twice = c('s15:twice'), gaining = c('s15:gaining'), good = c('s15:good')

  const A = win(f, 0, s13 + 4), B = on(f, s13, 12)
  const spin = span(f, flip, flip + 24), cy = 520 - Math.sin(spin * Math.PI) * 220
  const face: 'H' | 'T' = f < heads ? 'T' : 'H'
  const k: Beat[] = [[s13, 'idle', 'neutral'], [kahneman, 'present', 'smiling'], [asked, 'talk', 'neutral'], [no, 'shrug', 'thinking'], [s14, 'idle', 'neutral'], [years, 'read', 'thinking'], [c('s14:pattern'), 'explain', 'neutral'], [name, 'point', 'smiling'], [aversion, 'present', 'smiling'], [s15, 'explain', 'neutral'], [twice, 'countOne', 'neutral']]
  const t: Beat[] = [[s14, 'idle', 'neutral'], [tversky, 'waveA', 'smiling'], [tversky + 10, 'idle', 'smiling'], [years, 'think', 'thinking'], [aversion, 'thumbsUp', 'smiling']]
  const crowd = [0, 1, 2, 3, 4]
  const C = win(f, s13, s14 + 6)
  const bars = on(f, s15, 10)

  return (
    <g>
      <Stall id="ffc" />
      {A > 0.001 && <g opacity={A}>
        <Coin x={CX} y={on(f, flip - 4, 6) > 0 ? cy : 520} s={1.3 * pop(f, simple)} spin={spin} face={face} />
        <g opacity={on(f, bet, 8) * (1 - on(f, flip, 8))}><Tag x={CX} y={360} text="HEADS OR TAILS?" s={pop(f, bet)} fill="#FFFFFF" /></g>
        {/* # tails → lose, heads → win */}
        <g opacity={on(f, tails, 8)}><Tag x={560} y={420} text="TAILS" fill={TILE} size={50} /></g>
        <Cash x={560} y={640} amount="−$100" tone={CORAL} s={pop(f, lose)} o={on(f, lose, 8)} />
        <g opacity={on(f, heads, 8)}><Tag x={1360} y={420} text="HEADS" fill={TILE} size={50} /></g>
        <Cash x={1360} y={640} amount="+$150" s={pop(f, fifty)} o={on(f, win2, 8)} />
        {/* # on paper */}
        <g opacity={on(f, paper, 10)} transform={`translate(${CX} 360) scale(${pop(f, paper)}) rotate(-3)`}>
          <rect x={-200} y={-90} width={400} height={180} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <text y={-20} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>+150 − 100 = +50</text>
          <text y={50} textAnchor="middle" fill={LEAF} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>{f >= deal ? 'GOOD DEAL' : ''}</text>
        </g>
        <g opacity={on(f, take, 8)}><Mark x={CX + 240} y={290} ok s={pop(f, take) * 0.8} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # the little crowd at the counter */}
        <g opacity={C}>
          {crowd.map((i) => <g key={i}>
            <Mini look={['lib-stranger', 'hero-struggling', 'lib-baker', 'lib-brother-kid', 'lib-stranger'][i]} x={1060 + i * 150} y={GROUND} scale={1.5} frame={f} seed={i + 2} mood={f > no ? 'sad' : 'neutral'} />
            <Say x={1060 + i * 150} y={GROUND - 330 - (i % 2) * 40} lines={['NO']} o={on(f, no + i * 3, 6)} s={0.8 * pop(f, no + i * 3)} size={44} />
          </g>)}
          <Coin x={1360} y={GROUND - 260} s={0.4} />
        </g>
        <Person f={f} who="lib-kahneman" beats={k} x={500} s={0.7} />
        <NameTag x={500} y={GROUND - 500} name="DANIEL KAHNEMAN" o={on(f, kahneman, 8)} s={0.9} />
        {f >= s14 - 4 && <g opacity={on(f, s14, 10)}>
          <Person f={f} who="lib-tversky" beats={t} x={820} s={0.7} flip />
          <NameTag x={820} y={GROUND - 560} name="AMOS TVERSKY" o={on(f, tversky, 8)} s={0.9} />
          {/* # years of papers stack up on the counter */}
          {Array.from({ length: 6 }, (_, i) => <rect key={i} x={1180} y={GROUND - 200 - i * 22} width={220} height={18} rx={3} fill={i % 2 ? '#FFFFFF' : TILE} stroke={INK} strokeWidth={3} opacity={on(f, years + i * 4, 6) * (1 - bars)} />)}
          {/* # the banner */}
          <g opacity={on(f, name, 8)} transform={`translate(${CX + 300} 360)`}>
            <rect x={-330 * easeOut(span(f, aversion - 6, aversion + 10))} y={-70} width={660 * easeOut(span(f, aversion - 6, aversion + 10))} height={140} rx={20} fill={BURG} stroke={INK} strokeWidth={5} />
            <text y={30} textAnchor="middle" fill={CREAM} opacity={on(f, aversion, 8)} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 6 }}>LOSS AVERSION</text>
          </g>
        </g>}
        {/* # two bars: how much it hurts vs how good it feels */}
        {bars > 0.001 && <g opacity={bars} transform="translate(1100 840)">
          <rect x={-40} y={-400} width={720} height={440} rx={24} fill="#FFFFFF" opacity={0.92} stroke={INK} strokeWidth={4} />
          <rect x={60} y={-lerp(0, 300, easeOut(span(f, losing, twice + 10)))} width={200} height={lerp(0, 300, easeOut(span(f, losing, twice + 10)))} fill={CORAL} stroke={INK} strokeWidth={4} />
          <rect x={380} y={-lerp(0, 150, easeOut(span(f, gaining, good + 10)))} width={200} height={lerp(0, 150, easeOut(span(f, gaining, good + 10)))} fill={LEAF} stroke={INK} strokeWidth={4} />
          <text x={160} y={30} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>LOSING HURTS</text>
          <text x={480} y={30} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>GAINING FEELS GOOD</text>
          <g opacity={on(f, twice, 8)}><text x={160} y={-320} textAnchor="middle" fill={CORAL_D} style={{ font: '400 64px "Bebas Neue"' }}>×2</text></g>
        </g>}
      </g>}
      <Headline text="WOULD YOU TAKE IT?" o={win(f, s12, s13)} />
      <Vig id="ffc" />
    </g>
  )
}

// ---------------------------------------------------------------- SCALE s16–s20
const ScaleTip: React.FC<PieceProps> = ({ f, c }) => {
  const s16 = c('s16'), imagine = c('s16:imagine'), weigh = c('s16:weigh'), fairly = c('s16:fairly')
  const s17 = c('s17'), win2 = c('s17:win'), side = c('s17:side'), loss = c('s17:loss'), quietly = c('s17:quietly'), double = c('s17:double'), weight = c('s17:weight')
  const s18 = c('s18'), ancestors = c('s18:ancestors'), sense = c('s18:sense'), missing = c('s18:missing'), meal = c('s18:meal'), annoying = c('s18:annoying'), place = c('s18:place'), group = c('s18:group'), end = c('s18:end')
  const s19 = c('s19'), today = c('s19:today'), wiring = c('s19:wiring'), rejected = c('s19:rejected'), awkward = c('s19:awkward'), threat = c('s19:threat')
  const s20 = c('s20'), tilted = c('s20:tilted'), start = c('s20:start')

  const A = win(f, 0, s18 + 4), T = win(f, s18, s19 + 2), M = win(f, s19, s20 + 2), Z = on(f, s20, 10)
  const tiltA = lerp(0, 8, easeOut(span(f, loss, loss + 14))) + lerp(0, 14, easeOut(span(f, double, double + 16)))
  const tilt = lerp(tiltA, 24, easeOut(span(f, tilted, tilted + 16)))
  const hero: Beat[] = [[0, 'idle', 'thinking'], [imagine, 'think', 'thinking'], [c('s16:new'), 'pointUp', 'smiling'], [weigh, 'weighA', 'thinking'], [fairly, 'weighB', 'worried'], [win2, 'present', 'smiling'], [loss, 'nervous', 'worried'], [double, 'shock', 'shocked'], [weight, 'facepalm', 'worried']]
  const hero2: Beat[] = [[s19, 'idle', 'neutral'], [rejected, 'read', 'worried'], [awkward, 'nervous', 'worried'], [threat, 'shock', 'shocked']]
  const hero3: Beat[] = [[s20, 'idle', 'thinking'], [tilted, 'shrug', 'worried'], [start, 'lookFar', 'thinking']]
  const flash = f >= threat ? (Math.floor((f - threat) / 6) % 2 ? 1 : 0.4) : 0

  const pans = (t: number) => <Scale x={CX + 120} y={330} tilt={t} s={0.95}
    left={<g><Cash x={0} y={0} amount="WIN" s={pop(f, win2) * 0.9} o={on(f, win2, 8)} /></g>}
    right={<g><Weight x={-50} y={0} label="LOSS" s={pop(f, loss) * 0.8} o={on(f, loss, 8)} /><Weight x={60} y={0} label="×2" s={pop(f, quietly + 8) * 0.8} o={on(f, quietly + 8, 8)} tone={CORAL_D} /></g>} />

  return (
    <g>
      <Sky id="ffs" />
      {(A > 0.001 || Z > 0.001) && <g opacity={Math.max(A, Z)}>
        <rect x={0} y={GROUND - 20} width={W} height={H} fill={TILE} />
        {Array.from({ length: 25 }, (_, k) => <rect key={k} x={k * 80} y={GROUND - 20} width={3} height={H} fill="#E3EEF0" />)}
        <g opacity={on(f, imagine, 10) * (1 - on(f, weigh, 10))}><Say x={760} y={300} lines={['TRY SOMETHING', 'NEW?']} s={pop(f, imagine)} /></g>
        <g opacity={on(f, weigh, 10)}>{pans(A > 0.001 ? tiltA : tilt)}</g>
        <g opacity={on(f, side, 8) * A}><Tag x={340} y={260} text="THE POSSIBLE WIN" fill="#FFFFFF" size={44} s={0.9} /></g>
        <g opacity={on(f, loss + 4, 8) * A}><Tag x={1640} y={260} text="THE POSSIBLE LOSS" fill="#FFFFFF" size={44} s={0.9} /></g>
        {A > 0.001 && <Person f={f} who="hero-struggling" beats={hero} x={230} s={0.62} />}
        {Z > 0.001 && <Person f={f} who="hero-struggling" beats={hero3} x={230} s={0.62} />}
        <Headline text="DOUBLE THE WEIGHT" o={win(f, double, s18) * A} color={CORAL_D} />
        <Headline text="TILTED BEFORE YOU START" o={Z * on(f, tilted, 8)} color={BURG} />
      </g>}
      {/* # the campfire tribe */}
      {T > 0.001 && <g opacity={T}>
        <rect width={W} height={H} fill="#F7D9A8" />
        <path d={`M0 ${GROUND - 60} Q480 ${GROUND - 180} 960 ${GROUND - 90} T1920 ${GROUND - 120} L1920 1080 L0 1080 Z`} fill="#D9B27A" />
        <SunDisc x={1600} y={200} r={70} f={f} />
        {/* # the fire */}
        <g transform={`translate(720 ${GROUND - 30})`}>
          <path d="M-60 20 L60 -10 M-60 -10 L60 20" stroke="#7A4A2A" strokeWidth={16} strokeLinecap="round" />
          <path d={`M-40 0 Q-50 -80 0 ${-140 - Math.sin(f / 4) * 14} Q50 -80 40 0 Z`} fill={CORAL} /><path d={`M-20 0 Q-24 -50 0 ${-90 - Math.sin(f / 3) * 10} Q24 -50 20 0 Z`} fill={SUN} />
        </g>
        {[0, 1, 2, 3, 4].map((i) => {
          const away = i === 4 ? easeOut(span(f, place, group + 20)) : 0
          return <Mini key={i} look={['lib-stranger', 'lib-baker', 'lib-tversky', 'lib-brother-kid', 'hero-struggling'][i]} x={[440, 560, 880, 1000, 1120][i] + away * 600} y={GROUND - 20} scale={1.6} frame={f} seed={i + 9} mood={i === 4 && away > 0.5 ? 'sad' : 'happy'} />
        })}
        <g opacity={on(f, ancestors, 8)}><Tag x={700} y={280} text="OUR ANCESTORS" fill={CREAM} ink={BURG} s={pop(f, ancestors)} /></g>
        <g opacity={on(f, sense, 8)}><Mark x={960} y={260} ok s={0.6 * pop(f, sense)} /></g>
        <g opacity={on(f, missing, 8)} transform={`translate(1320 360) scale(${pop(f, missing)})`}>
          <rect x={-230} y={-60} width={460} height={120} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <text y={16} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{f >= annoying ? 'MISSED A MEAL = ANNOYING' : 'MISSED A MEAL'}</text>
        </g>
        <g opacity={on(f, group, 8)} transform={`translate(1320 540) scale(${pop(f, group)})`}>
          <rect x={-230} y={-60} width={460} height={120} rx={20} fill={CORAL} stroke={INK} strokeWidth={5} />
          <text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{f >= end ? 'LEFT THE GROUP = DANGER' : 'LEFT THE GROUP'}</text>
        </g>
      </g>}
      {/* # today: the same wiring, a modern "threat" */}
      {M > 0.001 && <g opacity={M}>
        <rect width={W} height={H} fill="#EAF4F7" />
        <rect x={0} y={GROUND - 20} width={W} height={H} fill="#D8E3E8" />
        <rect x={0} y={0} width={W} height={H} fill={CORAL} opacity={0.18 * flash} />
        <g opacity={on(f, today, 8)}><Tag x={340} y={250} text="TODAY" fill={SUN} s={pop(f, today)} /></g>
        {/* # the old wiring: a brain with wires */}
        <g opacity={on(f, wiring, 8)} transform={`translate(${CX} 360) scale(${pop(f, wiring) * 0.7})`}>
          <path d="M-120 20 C-150 -40 -110 -110 -50 -110 C-30 -140 30 -140 50 -110 C110 -110 150 -40 120 20 C130 70 80 100 40 90 C20 110 -20 110 -40 90 C-80 100 -130 70 -120 20 Z" fill="#F6A9B8" stroke={INK} strokeWidth={6} />
          <path d="M-60 90 Q-120 200 -300 220 M60 90 Q120 200 300 220" stroke={GOLD} strokeWidth={10} fill="none" strokeLinecap="round" />
          <text y={-150} textAnchor="middle" fill={INK} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>SAME OLD WIRING</text>
        </g>
        <g opacity={on(f, rejected, 8)} transform={`translate(600 640) rotate(-6) scale(${pop(f, rejected)})`}>
          <rect x={-150} y={-100} width={300} height={200} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <path d="M-150 -100 L0 0 L150 -100" stroke={INK} strokeWidth={4} fill="none" />
          <text y={70} textAnchor="middle" fill={CORAL_D} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>REJECTED</text>
        </g>
        <Say x={1320} y={600} lines={['UM… SO…']} o={on(f, awkward, 8)} s={pop(f, awkward)} />
        <g opacity={on(f, threat, 6)} transform={`translate(${CX} 860) scale(${pop(f, threat)})`}>
          <path d="M-70 0 L-50 -90 Q0 -130 50 -90 L70 0 Z" fill={CORAL} stroke={INK} strokeWidth={5} opacity={0.6 + 0.4 * flash} />
          <rect x={-90} y={0} width={180} height={30} rx={8} fill={INK} />
          <text y={-150} textAnchor="middle" fill={CORAL_D} style={{ font: '400 80px "Bebas Neue"', letterSpacing: 6 }}>THREAT!</text>
        </g>
        <Person f={f} who="hero-struggling" beats={hero2} x={1700} s={0.62} flip />
      </g>}
      <Vig id="ffs" />
    </g>
  )
}

export const FF_HOOK = makePiece('ff-hook', 'Fear: the diving board you never jump off', {
  beats: ['s1', 's1:wanted', 's1:years', 's2', 's2:business', 's2:song', 's2:asking', 's2:applying', 's2:job', 's2:big', 's3', 's3:shower', 's3:planned', 's3:bus', 's3:pictured', 's3:feel', 's4', 's4:single', 's4:quietly', 's4:yet', 's5', 's5:timing', 's5:money', 's5:need', 's5:ready', 's6', 's6:honest', 's6:really', 's7', 's7:scared', 's7:work', 's7:mean', 's8', 's8:fear', 's8:comes', 's8:why', 's8:bigger', 's8:people', 's8:fearless', 's8:differently', 's9', 's9:end', 's9:see', 's9:think', 's9:fear', 's9:failure', 's9:weak', 's9:brain', 's9:job', 's9:well'],
  sfx: [['s2:business', 'softpop'], ['s2:song', 'softpop'], ['s2:asking', 'softpop'], ['s2:job', 'softpop'], ['s4:yet', 'thud'], ['s5:timing', 'pop'], ['s5:money', 'pop'], ['s5:ready', 'pop'], ['s6:honest', 'swish'], ['s9:weak', 'crack'], ['s9:brain', 'ding']],
  Component: Hook, mood: 'light',
})
export const FF_COIN = makePiece('ff-coin', 'Fear: the coin flip and loss aversion (Kahneman & Tversky)', {
  beats: ['s10', 's10:simple', 's10:bet', 's11', 's11:flip', 's11:tails', 's11:lose', 's11:heads', 's11:win', 's11:fifty', 's12', 's12:paper', 's12:deal', 's12:take', 's13', 's13:kahneman', 's13:asked', 's13:people', 's13:no', 's14', 's14:tversky', 's14:years', 's14:moments', 's14:pattern', 's14:name', 's14:aversion', 's15', 's15:losing', 's15:twice', 's15:gaining', 's15:good'],
  sfx: [['s11:flip', 'flutter'], ['s11:lose', 'thud'], ['s11:win', 'coin'], ['s12:take', 'ding'], ['s13:no', 'pop'], ['s14:aversion', 'whoosh'], ['s15:twice', 'impact']],
  Component: CoinBet, mood: 'light',
})
export const FF_SCALE = makePiece('ff-scale', 'Fear: the tilted scale, old wiring', {
  beats: ['s16', 's16:imagine', 's16:new', 's16:weigh', 's16:fairly', 's17', 's17:win', 's17:side', 's17:loss', 's17:quietly', 's17:double', 's17:weight', 's18', 's18:ancestors', 's18:sense', 's18:missing', 's18:meal', 's18:annoying', 's18:place', 's18:group', 's18:end', 's19', 's19:today', 's19:wiring', 's19:rejected', 's19:awkward', 's19:threat', 's20', 's20:tilted', 's20:start'],
  sfx: [['s17:win', 'coin'], ['s17:loss', 'thud'], ['s17:double', 'thump'], ['s18:group', 'swish'], ['s19:rejected', 'pop'], ['s19:threat', 'glitch'], ['s20:tilted', 'thud']],
  Component: ScaleTip, mood: 'light',
})
