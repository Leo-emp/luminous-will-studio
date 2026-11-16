// ============================================================
// BAD COMMENT — the Short "Why One Bad Comment Ruins Your Whole Day"
// (LW batch 2, 2026-11-16). Own art direction: a bright SAGE-GREEN
// living room with a mustard sofa, a big window and a little retro TV.
// The mind keeps score on a brass BALANCE SCALE: ten light, pink
// compliment bubbles against one heavy, spiky red comment; and the
// retro TV keeps REPLAYING the bad one.
// Tall canvas 1080 × 1920; action between y 420 and GROUND 1240.
// ============================================================
// HOOK    s1–s3b) ten pink compliment bubbles vs one red spiky one on the scale — the one wins; PRAISED · LOVES
//    YOUR WORK · an eye-roll; the TV in the evening plays REPLAY ↻; NOT WEAK; A STRONG PATTERN; STOP IT RUNNING
//    YOUR EVENINGS.
// SCIENCE s4–s7)  ROY BAUMEISTER card + a growing stack of papers (decades); the stamp BAD > GOOD; four icons:
//    relationships, feedback, memory, emotion; HITS HARDER · LASTS LONGER; ROZIN & ROYZMAN · NEGATIVITY BIAS;
//    the ancestors: a fruit bowl (A PITY) vs eyes in a bush (THE END).
// MEMORY  s8–s11) a brain raises a red FLAG on the comment, files it (KEEP), and a boomerang brings it back (CHECK);
//    the pink bubbles fade; a day dial from dinner to morning — the pink ones gone, the red one still there; the
//    day's diary page: one huge red line, ten tiny pink ones: NOT A FAIR RECORD · A RECORD OF THREATS.
// BALANCE s12–s20) DELETE is crossed out, but a pen rewrites the story; 1 CATCH THE REPLAY (the TV loop counter
//    hits 10, his bubble: MY BRAIN IS FLAGGING A THREAT); 2 USEFUL? a sieve keeps the LESSON (bulb), drops the
//    STING (thorn); NOISE gets NO VOTE (ballot box); 3 a notebook: 3 GOOD THINGS ✓✓✓; the good gets the REPLAY
//    button; the scale levels; LOUDER ≠ TRUER; a volume knob turns the one down.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Tag, win, on, pop, lerp, span, easeOut, BURG, CREAM, INK, GOLD, CX, GROUND, W, H, type Beat } from '../day3/kit'

const SAGE = '#CFE3CF', SAGE_D = '#B5D2B6', FLOOR = '#E9D3B4', FLOOR_D = '#D8BD98', MUSTARD = '#E8B04A', PINK = '#F6B6C8', PINK_D = '#E58AA6', RED = '#D93A3A', BRASS = '#C99A3E'

// # the living room: sage wall with a picture rail, a window whose sky follows `sky` (0 day → 1 evening), floorboards
const Room: React.FC<{ id: string; sky?: number; sofa?: boolean }> = ({ id, sky = 0, sofa = true }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.16} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={SAGE} />
    <rect x={0} y={330} width={W} height={10} fill={SAGE_D} />
    <rect x={0} y={GROUND - 60} width={W} height={60} fill="#FFFFFF" opacity={0.7} />
    <g transform="translate(90 420)">
      <rect x={-10} y={-10} width={300} height={360} rx={12} fill="#FFFFFF" />
      <rect x={0} y={0} width={280} height={340} rx={6} fill={sky > 0.5 ? '#C9C4EE' : '#CDEBF7'} />
      <rect x={0} y={0} width={280} height={340} rx={6} fill="#B7A9E0" opacity={sky * 0.6} />
      {sky > 0.5 ? <circle cx={200} cy={90} r={36} fill="#FFF6D8" /> : <circle cx={200} cy={90} r={44} fill="#FFE28A" />}
      <rect x={134} y={0} width={12} height={340} fill="#FFFFFF" /><rect x={0} y={164} width={280} height={12} fill="#FFFFFF" />
    </g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={FLOOR} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={k * 140} y={GROUND} width={4} height={H - GROUND} fill={FLOOR_D} />)}
    {sofa && <g transform={`translate(800 ${GROUND})`} opacity={0.9}>
      <rect x={-250} y={-200} width={500} height={130} rx={40} fill={MUSTARD} stroke={INK} strokeWidth={5} />
      <rect x={-270} y={-110} width={540} height={90} rx={30} fill={MUSTARD} stroke={INK} strokeWidth={5} />
      <rect x={-240} y={-20} width={20} height={20} fill={INK} /><rect x={220} y={-20} width={20} height={20} fill={INK} />
    </g>}
  </g>
)
const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a compliment bubble (soft, pink) and a bad comment (spiky, red)
const Nice: React.FC<{ x: number; y: number; s: number; o?: number; text?: string }> = ({ x, y, s, o = 1, text }) => s <= 0.001 || o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse rx={text ? 150 : 56} ry={text ? 56 : 40} fill={PINK} stroke={INK} strokeWidth={4} />
    <path d="M-20 34 L-34 62 L4 38 Z" fill={PINK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    {text ? <text y={14} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 1 }}>{text}</text> : <path d="M0 12 C-18 -2 -10 -18 0 -8 C10 -18 18 -2 0 12 Z" fill="#FFFFFF" />}
  </g>
)
const Spiky: React.FC<{ x: number; y: number; s: number; text?: string; r?: number }> = ({ x, y, s, text = 'UGH.', r = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d={Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2, rr = k % 2 ? 70 : 104; return `${k ? 'L' : 'M'}${(Math.cos(a) * rr * 1.5).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}` }).join(' ') + ' Z'} fill={RED} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

// # the brass balance scale; `tilt` -1 (left pan down) … 1 (right pan down); children = [left load, right load]
const Scale: React.FC<{ x: number; y: number; tilt: number; s?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, tilt, s = 1, left, right }) => {
  const a = tilt * 16, dy = Math.sin((a * Math.PI) / 180) * 220
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-90 0 L90 0 L40 -30 L-40 -30 Z" fill={BRASS} stroke={INK} strokeWidth={5} />
      <rect x={-12} y={-420} width={24} height={392} fill={BRASS} stroke={INK} strokeWidth={5} />
      <g transform={`translate(0 -420) rotate(${a})`}><rect x={-240} y={-10} width={480} height={20} rx={10} fill={BRASS} stroke={INK} strokeWidth={5} /></g>
      <circle cy={-420} r={22} fill={GOLD} stroke={INK} strokeWidth={5} />
      {[-1, 1].map((k) => { const py = -420 + k * dy + 150
        return <g key={k} transform={`translate(${k * 230} ${py})`}>
          <path d={`M0 -150 L-110 0 M0 -150 L110 0`} stroke={INK} strokeWidth={3} />
          <path d="M-130 0 L130 0 Q100 50 0 50 Q-100 50 -130 0 Z" fill={BRASS} stroke={INK} strokeWidth={5} />
          <g transform="translate(0 -10)">{k < 0 ? left : right}</g>
        </g> })}
    </g>
  )
}

// # a little retro TV playing a loop; `count` shows a replay counter
const TV: React.FC<{ x: number; y: number; s: number; f: number; count?: number; label?: string }> = ({ x, y, s, f, count, label = 'REPLAY' }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-40 -190 L0 -150 L40 -190" stroke={INK} strokeWidth={6} fill="none" />
    <rect x={-170} y={-150} width={340} height={260} rx={30} fill="#7DB8B0" stroke={INK} strokeWidth={6} />
    <rect x={-140} y={-122} width={230} height={200} rx={20} fill="#F4F0E6" stroke={INK} strokeWidth={4} />
    <circle cx={125} cy={-70} r={14} fill={INK} /><circle cx={125} cy={-20} r={14} fill={INK} />
    <g transform={`translate(-25 -20) rotate(${(f * 6) % 360})`}><path d="M-46 0 A46 46 0 1 1 0 46" stroke={RED} strokeWidth={10} fill="none" /><path d="M-6 30 L4 50 L-16 56 Z" fill={RED} /></g>
    <text x={-25} y={64} textAnchor="middle" fill={INK} style={{ font: '400 30px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
    {count !== undefined && <g transform="translate(150 -150)"><circle r={42} fill={RED} stroke={INK} strokeWidth={5} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"' }}>×{count}</text></g>}
    <rect x={-120} y={110} width={20} height={40} fill={INK} /><rect x={100} y={110} width={20} height={40} fill={INK} />
  </g>
)

// # a name card
const Card: React.FC<{ x: number; y: number; s: number; top: string; name: string; sub?: string; subO?: number }> = ({ x, y, s, top, name, sub, subO = 1 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-140} width={600} height={280} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text y={-60} textAnchor="middle" fill={PINK_D} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 3 }}>{top}</text>
    <text y={10} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
    {sub && <text y={90} textAnchor="middle" fill={BURG} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }} opacity={subO}>{sub}</text>}
  </g>
)

const Stamp: React.FC<{ x: number; y: number; text: string; s: number; r?: number; color?: string }> = ({ x, y, text, s, r = -10, color = RED }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-text.length * 19 - 30} y={-50} width={text.length * 38 + 60} height={100} rx={12} fill="#FFFFFF" fillOpacity={0.6} stroke={color} strokeWidth={9} />
    <text y={22} textAnchor="middle" fill={color} style={{ font: '400 66px "Bebas Neue"', letterSpacing: 4 }}>{text}</text>
  </g>
)

// # ten little compliments arranged in a pan / around a point
const tenAt = (k: number) => [((k % 4) - 1.5) * 52, -Math.floor(k / 4) * 46]

// ---------------------------------------------------------------- HOOK
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const ten = c('s1:ten'), nice = c('s1:nice'), one = c('s1:one'), bad = c('s1:bad'), remember = c('s1:remember')
  const s2 = c('s2'), praised = c('s2:praised'), meeting = c('s2:meeting'), friend = c('s2:friend'), work = c('s2:work'), person = c('s2:person'), eyes = c('s2:eyes'), guess = c('s2:guess'), replay = c('s2:replay'), night = c('s2:night')
  const s3 = c('s3'), weak = c('s3:weak'), strongest = c('s3:strongest'), psychology = c('s3:psychology')
  const s3b = c('s3b'), see = c('s3b:see'), stop = c('s3b:stop'), evenings = c('s3b:evenings')

  const A = win(f, 0, s2 + 2), B = win(f, s2, s3 + 2), C = on(f, s3, 8)
  const tilt = lerp(-0.6, 0.9, easeOut(span(f, bad, remember + 10)))
  const hero: Beat[] = [[0, 'idle', 'smiling'], [ten, 'countB', 'smiling'], [nice, 'holdChest', 'smiling'], [bad, 'shock', 'shocked'], [remember, 'facepalm', 'worried'], [praised, 'celebrate', 'smiling'], [friend, 'thumbsUp', 'smiling'], [eyes, 'oops', 'worried'], [guess, 'shrug', 'worried'], [replay, 'sit', 'worried'], [s3, 'idle', 'thinking'], [weak, 'crossNoA', 'neutral'], [strongest, 'explain', 'thinking'], [see, 'pointUp', 'smiling'], [stop, 'stop', 'smiling'], [evenings, 'relax', 'smiling']]
  const sat = f >= replay && f < s3

  return (
    <g>
      <Room id="bch" sky={on(f, replay, 12) * (1 - on(f, s3, 10))} />
      {A > 0.001 && <g opacity={A}>
        <Scale x={700} y={GROUND - 30} tilt={f >= bad ? tilt : -0.6} s={0.9}
          left={<g>{Array.from({ length: 10 }, (_, k) => { const [dx, dy] = tenAt(k); return <Nice key={k} x={dx} y={dy - 40} s={0.55 * on(f, ten + k * 2, 5)} /> })}</g>}
          right={<Spiky x={0} y={-80} s={pop(f, one) * 0.55} />} />
        <g opacity={on(f, nice, 6) * (1 - on(f, one, 6))}><Tag x={CX} y={480} text="10 NICE THINGS" s={pop(f, nice)} size={56} fill={PINK} /></g>
        <g opacity={on(f, one, 6)}><Tag x={CX} y={480} text={f >= remember ? 'ALL YOU REMEMBER' : '1 BAD COMMENT'} s={pop(f, f >= remember ? remember : one)} size={56} fill={CREAM} ink={RED} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Nice x={700} y={560} s={pop(f, praised) * 0.9} text={f >= meeting ? 'GREAT MEETING!' : 'WELL DONE!'} />
        <Nice x={780} y={720} s={pop(f, friend) * 0.9} text={f >= work ? 'LOVE YOUR WORK' : 'A FRIEND…'} />
        {/* # the eye-roll face */}
        <g opacity={on(f, person, 6) * (1 - on(f, replay, 8))} transform={`translate(760 900) scale(${pop(f, person) * 0.9})`}>
          <circle r={80} fill="#F3D2A8" stroke={INK} strokeWidth={6} />
          {[-1, 1].map((k) => <g key={k}><circle cx={k * 30} cy={-10} r={18} fill="#FFFFFF" stroke={INK} strokeWidth={4} /><circle cx={k * 30} cy={lerp(-10, -22, on(f, eyes, 6))} r={8} fill={INK} /></g>)}
          <path d="M-26 40 L26 40" stroke={INK} strokeWidth={6} strokeLinecap="round" />
        </g>
        <TV x={420} y={GROUND - 250} s={pop(f, replay) * 0.75} f={f} />
        <g opacity={on(f, guess, 6)}><Tag x={CX} y={480} text={f >= night ? 'REPLAYED ALL NIGHT' : 'GUESS WHICH ONE?'} s={pop(f, f >= night ? night : guess)} size={50} fill={CREAM} ink={RED} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, weak, 6) * (1 - on(f, strongest, 6))}><Tag x={CX} y={480} text="NOT WEAKNESS" s={pop(f, weak)} size={60} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, strongest, 6) * (1 - on(f, s3b, 6))}><Tag x={CX} y={480} text={f >= psychology ? 'A PATTERN IN EVERYONE' : 'A STRONG PATTERN'} s={pop(f, f >= psychology ? psychology : strongest)} size={52} fill={GOLD} /></g>
        <Scale x={720} y={GROUND - 30} tilt={0.9} s={0.8} right={<Spiky x={0} y={-80} s={0.55} />} left={<g>{Array.from({ length: 10 }, (_, k) => { const [dx, dy] = tenAt(k); return <Nice key={k} x={dx} y={dy - 40} s={0.55} /> })}</g>} />
        <g opacity={on(f, see, 6)}><Tag x={CX} y={480} text={f >= stop ? 'STOP IT RUNNING YOUR EVENINGS' : 'SEE HOW IT WORKS'} s={pop(f, f >= stop ? stop : see)} size={40} fill={GOLD} /></g>
        <g opacity={on(f, evenings, 6)}><circle cx={240} cy={560} r={60} fill="#FFF6D8" stroke={INK} strokeWidth={4} /><path d="M240 520 L240 560 L270 575" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" /></g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={sat ? 760 : 260} y={sat ? GROUND - 110 : GROUND} s={0.84} />
      <Headline text={f < s2 ? 'TEN VS ONE' : f < s3 ? 'THE REPLAY' : 'NOT YOU'} o={f < s2 ? on(f, ten, 8) * (1 - on(f, s2 - 4, 4)) : f < s3 ? on(f, s2, 8) * (1 - on(f, s3 - 4, 4)) : on(f, s3, 8)} color={INK} />
      <Vig id="bch" />
    </g>
  )
}

// ---------------------------------------------------------------- SCIENCE
const Science: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), team = c('s4:team'), baumeister = c('s4:baumeister'), decades = c('s4:decades'), research = c('s4:research'), paper = c('s4:paper'), title = c('s4:title'), bad = c('s4:bad'), stronger = c('s4:stronger'), good = c('s4:good')
  const relationships = c('s5:relationships'), feedback = c('s5:feedback'), memory = c('s5:memory'), emotion = c('s5:emotion'), events = c('s5:events'), harder = c('s5:harder'), longer = c('s5:longer'), size = c('s5:size')
  const s6 = c('s6'), year = c('s6:year'), psychologists = c('s6:psychologists'), rozin = c('s6:rozin'), royzman = c('s6:royzman'), negativity = c('s6:negativity'), bias = c('s6:bias')
  const s7 = c('s7'), explanation = c('s7:explanation'), ancestors = c('s7:ancestors'), meal = c('s7:meal'), pity = c('s7:pity'), predator = c('s7:predator'), end = c('s7:end')

  const A = win(f, 0, c('s5') + 2), B = win(f, c('s5'), s6 + 2), C = win(f, s6, s7 + 2), D = on(f, s7, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [team, 'present', 'thinking'], [decades, 'carryHeavy', 'neutral'], [title, 'point', 'neutral'], [bad, 'shock', 'shocked'], [good, 'nodA', 'thinking'], [relationships, 'hug', 'smiling'], [feedback, 'talk', 'neutral'], [memory, 'think', 'thinking'], [emotion, 'holdChest', 'worried'], [harder, 'despair', 'worried'], [longer, 'slump', 'worried'], [psychologists, 'present', 'thinking'], [negativity, 'pointUp', 'thinking'], [explanation, 'explain', 'thinking'], [meal, 'shrug', 'neutral'], [predator, 'shock', 'shocked'], [end, 'nervous', 'worried']]
  const stack = Math.floor(lerp(0, 9, on(f, decades, 30)))

  return (
    <g>
      <Room id="bcs" />
      {A > 0.001 && <g opacity={A}>
        <Card x={CX} y={640} s={pop(f, team) * (1 - on(f, title, 8))} top="A TEAM LED BY" name={f >= baumeister ? 'ROY BAUMEISTER' : '…'} sub="2001 REVIEW" subO={on(f, research, 6)} />
        <g transform={`translate(800 ${GROUND - 40})`} opacity={on(f, decades, 6) * (1 - on(f, bad, 6))}>{Array.from({ length: stack }, (_, k) => <rect key={k} x={-120 + (k % 2) * 8} y={-k * 34 - 30} width={240} height={30} rx={4} fill={k % 2 ? '#FFFFFF' : '#F4F0E6'} stroke={INK} strokeWidth={3} />)}</g>
        <g opacity={on(f, decades, 6) * (1 - on(f, title, 6))}><Tag x={800} y={GROUND - 380} text="DECADES OF RESEARCH" s={pop(f, decades)} size={36} fill={GOLD} /></g>
        <g opacity={on(f, paper, 6) * (1 - on(f, bad, 6))}><Tag x={CX} y={480} text={f >= title ? 'A BLUNT TITLE…' : 'THEIR PAPER'} s={pop(f, f >= title ? title : paper)} size={56} fill={CREAM} /></g>
        <Stamp x={CX} y={680} text={f >= good ? 'BAD > GOOD' : f >= stronger ? 'BAD IS STRONGER' : 'BAD…'} s={pop(f, bad) * 0.95} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # four areas, one icon each */}
        {[[relationships, 'LOVE'], [feedback, 'FEEDBACK'], [memory, 'MEMORY'], [emotion, 'FEELINGS']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${470 + (k % 2) * 300} ${600 + Math.floor(k / 2) * 230}) scale(${pop(f, at as number)})`}>
          <circle r={80} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          {k === 0 && <path d="M0 30 C-50 -10 -30 -50 0 -20 C30 -50 50 -10 0 30 Z" fill={PINK_D} />}
          {k === 1 && <g><rect x={-44} y={-34} width={88} height={56} rx={16} fill={MUSTARD} /><path d="M-20 22 L-30 44 L0 22 Z" fill={MUSTARD} /></g>}
          {k === 2 && <path d="M-44 10 Q-50 -36 -10 -40 Q0 -54 20 -40 Q50 -36 44 4 Q46 34 10 38 Q-40 44 -44 10 Z" fill={PINK} stroke={INK} strokeWidth={3} />}
          {k === 3 && <g><circle r={40} fill={MUSTARD} /><circle cx={-14} cy={-8} r={5} fill={INK} /><circle cx={14} cy={-8} r={5} fill={INK} /><path d="M-16 18 Q0 4 16 18" stroke={INK} strokeWidth={4} fill="none" /></g>}
          <text y={120} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{t as string}</text>
        </g>)}
        <g opacity={on(f, events, 6) * (1 - on(f, harder, 6))}><Tag x={CX} y={480} text="BAD EVENTS…" s={pop(f, events)} size={56} fill={CREAM} ink={RED} /></g>
        <g opacity={on(f, harder, 6)}><Tag x={CX} y={480} text={f >= size ? 'SAME SIZE, MORE WEIGHT' : f >= longer ? 'HIT HARDER · LAST LONGER' : 'HIT HARDER'} s={pop(f, f >= size ? size : f >= longer ? longer : harder)} size={46} fill={GOLD} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <Card x={CX + 60} y={680} s={pop(f, psychologists)} top={f >= year ? 'THE SAME YEAR · PSYCHOLOGISTS' : 'THE SAME YEAR'} name={f >= royzman ? 'ROZIN & ROYZMAN' : f >= rozin ? 'PAUL ROZIN &…' : '…'} sub={f >= bias ? 'NEGATIVITY BIAS' : 'NEGATIVITY…'} subO={on(f, negativity, 6)} />
        <g opacity={on(f, s6, 6) * (1 - on(f, psychologists, 6))}><Tag x={CX} y={480} text="THE SAME YEAR" s={pop(f, s6)} size={56} fill={GOLD} /></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, explanation, 6) * (1 - on(f, meal, 6))}><Tag x={CX} y={480} text={f >= ancestors ? 'BACK TO OUR ANCESTORS' : 'ONE EXPLANATION'} s={pop(f, f >= ancestors ? ancestors : explanation)} size={50} fill={CREAM} /></g>
        {/* # a missed meal: a fruit bowl */}
        <g opacity={on(f, meal, 6)} transform={`translate(560 820) scale(${pop(f, meal)})`}>
          <path d="M-100 0 L100 0 Q80 70 0 70 Q-80 70 -100 0 Z" fill="#9AA3AE" stroke={INK} strokeWidth={5} />
          <circle cx={-40} cy={-20} r={30} fill={RED} stroke={INK} strokeWidth={4} /><circle cx={20} cy={-26} r={28} fill={MUSTARD} stroke={INK} strokeWidth={4} /><circle cx={56} cy={-10} r={22} fill="#8CCB6E" stroke={INK} strokeWidth={4} />
          <g opacity={on(f, pity, 6)}><Tag x={0} y={170} text="A PITY" s={pop(f, pity)} size={44} fill={CREAM} /></g>
        </g>
        {/* # a missed predator: yellow eyes in a bush */}
        <g opacity={on(f, predator, 6)} transform={`translate(880 820) scale(${pop(f, predator)})`}>
          <ellipse rx={130} ry={90} fill="#5E9A5E" stroke={INK} strokeWidth={5} /><ellipse cx={-60} cy={-50} rx={70} ry={50} fill="#6DAF6D" stroke={INK} strokeWidth={4} />
          {[-1, 1].map((k) => <ellipse key={k} cx={k * 34} cy={0} rx={22} ry={14} fill={GOLD} />)}
          {[-1, 1].map((k) => <ellipse key={`p${k}`} cx={k * 34} cy={0} rx={5} ry={12} fill={INK} />)}
          <g opacity={on(f, end, 6)}><Tag x={0} y={170} text="THE END" s={pop(f, end)} size={44} fill={CREAM} ink={RED} /></g>
        </g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={240} s={0.84} />
      <Headline text={f < c('s5') ? 'THE RESEARCH' : f < s6 ? 'EVERYWHERE' : f < s7 ? 'IT HAS A NAME' : 'WHY?'} o={f < c('s5') ? on(f, team, 8) * (1 - on(f, c('s5') - 4, 4)) : f < s6 ? on(f, relationships, 8) * (1 - on(f, s6 - 4, 4)) : f < s7 ? on(f, s6, 8) * (1 - on(f, s7 - 4, 4)) : on(f, s7, 8)} color={INK} />
      <Vig id="bcs" />
    </g>
  )
}

// ---------------------------------------------------------------- MEMORY
const Memory: React.FC<PieceProps> = ({ f, c }) => {
  const s8 = c('s8'), brain = c('s8:brain'), threat = c('s8:threat'), flags = c('s8:flags'), keeps = c('s8:keeps'), brings = c('s8:brings'), check = c('s8:check')
  const s9 = c('s9'), nice = c('s9:nice'), good = c('s9:good'), moment = c('s9:moment'), quietly = c('s9:quietly'), fade = c('s9:fade'), background = c('s9:background')
  const s9b = c('s9b'), compliments = c('s9b:compliments'), dinner = c('s9b:dinner'), one = c('s9b:one'), still = c('s9b:still'), morning = c('s9b:morning')
  const s10 = c('s10'), memory = c('s10:memory'), fair = c('s10:fair'), record = c('s10:record'), day2 = c('s10:day#2')
  const s11 = c('s11'), record11 = c('s11:record'), threats = c('s11:threats')

  const A = win(f, 0, s9b + 2), B = win(f, s9b, s10 + 2), C = on(f, s10, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [brain, 'pointUp', 'thinking'], [threat, 'shock', 'shocked'], [flags, 'point', 'worried'], [keeps, 'hold', 'worried'], [brings, 'reachUp', 'worried'], [nice, 'holdChest', 'smiling'], [fade, 'lookFar', 'neutral'], [compliments, 'countB', 'smiling'], [dinner, 'shrug', 'neutral'], [still, 'facepalm', 'worried'], [memory, 'read', 'thinking'], [fair, 'crossNoA', 'neutral'], [threats, 'explain', 'worried']]
  // # the boomerang: out on "brings", back on "check"
  const boom = span(f, brings, check + 14)
  const fadeNice = 1 - 0.85 * on(f, fade, 20)

  return (
    <g>
      <Room id="bcm" sky={on(f, dinner, 14) * (1 - on(f, morning, 10))} sofa={false} />
      {A > 0.001 && <g opacity={A}>
        {/* # the brain with a flag stuck in the red comment */}
        <g opacity={on(f, brain, 6)} transform={`translate(720 640) scale(${pop(f, brain) * 0.75})`}>
          <path d="M-150 20 Q-170 -110 -60 -140 Q0 -190 70 -140 Q170 -120 160 0 Q170 90 80 110 Q0 150 -80 110 Q-170 100 -150 20 Z" fill={PINK} stroke={INK} strokeWidth={7} />
          <path d="M0 -150 Q-20 -40 0 120 M-110 -40 Q-60 -20 -80 40 M100 -60 Q60 -10 90 50" stroke={PINK_D} strokeWidth={8} fill="none" />
        </g>
        <Spiky x={760 + Math.sin(boom * Math.PI) * 220} y={980 - Math.sin(boom * Math.PI) * 120} s={on(f, threat, 6) * 0.6} r={boom * 360} text="UGH." />
        <g opacity={on(f, flags, 6)} transform={`translate(${790 + Math.sin(boom * Math.PI) * 220} ${900 - Math.sin(boom * Math.PI) * 120})`}><rect x={-4} y={-110} width={8} height={110} fill={INK} /><path d="M4 -110 L80 -90 L4 -70 Z" fill={RED} stroke={INK} strokeWidth={3} /></g>
        <g opacity={on(f, threat, 6) * (1 - on(f, s9, 6))}><Tag x={CX} y={480} text={f >= check ? 'BROUGHT BACK TO CHECK' : f >= keeps ? 'FLAGGED · KEPT' : f >= flags ? 'FLAGGED' : 'TREATED LIKE A THREAT'} s={pop(f, f >= check ? check : f >= keeps ? keeps : f >= flags ? flags : threat)} size={48} fill={CREAM} ink={RED} /></g>
        {/* # the nice comments: float, then quietly fade */}
        {Array.from({ length: 5 }, (_, k) => <Nice key={k} x={560 + (k % 3) * 160} y={1060 - Math.floor(k / 3) * 120 - on(f, fade, 30) * 60} s={0.8 * on(f, nice + k * 2, 5)} o={fadeNice * on(f, s9, 6)} />)}
        <g opacity={on(f, good, 6) * (1 - on(f, s9b, 6))}><Tag x={CX} y={480} text={f >= background ? 'INTO THE BACKGROUND' : f >= quietly ? 'QUIETLY FADE' : f >= moment ? 'FOR A MOMENT' : 'FEEL GOOD…'} s={pop(f, f >= background ? background : f >= quietly ? quietly : f >= moment ? moment : good)} size={50} fill={PINK} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # a clock from dinner to morning: the ten compliments vanish, the red one stays */}
        <g transform="translate(780 640)"><circle r={90} fill="#FFFFFF" stroke={INK} strokeWidth={6} /><g transform={`rotate(${lerp(0, 300, on(f, dinner, 40))})`}><rect x={-5} y={-70} width={10} height={70} rx={5} fill={INK} /></g><circle r={10} fill={INK} /></g>
        {Array.from({ length: 10 }, (_, k) => { const [dx, dy] = tenAt(k); return <Nice key={k} x={700 + dx * 1.6} y={1050 + dy * 1.4} s={0.55 * on(f, compliments + k, 4)} o={1 - on(f, dinner, 14)} /> })}
        <Spiky x={900} y={940} s={pop(f, one) * 0.6} />
        <g opacity={on(f, compliments, 6)}><Tag x={CX} y={480} text={f >= morning ? 'STILL THERE IN THE MORNING' : f >= still ? 'STILL THERE…' : f >= dinner ? 'GONE BY DINNER' : '10 COMPLIMENTS'} s={pop(f, f >= morning ? morning : f >= still ? still : f >= dinner ? dinner : compliments)} size={46} fill={f >= one ? CREAM : PINK} ink={f >= one ? RED : INK} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # the diary page of the day: one huge red line, ten tiny pink ones */}
        <g transform={`translate(760 800) rotate(3) scale(${pop(f, memory)})`}>
          <rect x={-220} y={-300} width={440} height={600} rx={12} fill="#FFFDF6" stroke={INK} strokeWidth={6} />
          <text y={-240} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>TODAY</text>
          <rect x={-180} y={-200} width={360} height={150} rx={10} fill={RED} opacity={0.9} />
          <text y={-108} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 2 }}>THAT COMMENT</text>
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-180 + (k % 2) * 190} y={-20 + Math.floor(k / 2) * 52} width={170} height={20} rx={10} fill={PINK} opacity={0.8} />)}
        </g>
        <Stamp x={760} y={1060} text={f >= threats ? 'A RECORD OF THREATS' : 'NOT FAIR'} s={pop(f, f >= threats ? threats : fair) * 0.75} />
        <g opacity={on(f, memory, 6)}><Tag x={CX} y={460} text={f >= record11 ? "IT'S MOSTLY…" : f >= day2 ? 'NOT A FAIR RECORD' : f >= record ? 'A RECORD?' : 'YOUR MEMORY OF A DAY'} s={pop(f, f >= record11 ? record11 : f >= day2 ? day2 : f >= record ? record : memory)} size={46} fill={CREAM} /></g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={240} s={0.84} />
      <Headline text={f < s9 ? 'A THREAT' : f < s10 ? 'THE GOOD FADES' : 'AN UNFAIR RECORD'} o={f < s9 ? on(f, s8, 8) * (1 - on(f, s9 - 4, 4)) : f < s10 ? on(f, s9, 8) * (1 - on(f, s10 - 4, 4)) : on(f, s10, 8) * (f >= s11 ? 1 : 1)} color={INK} />
      <Vig id="bcm" />
    </g>
  )
}

// ---------------------------------------------------------------- BALANCE
const Balance: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), del = c('s12:delete'), bias = c('s12:bias'), stop = c('s12:stop'), write = c('s12:write'), story = c('s12:story')
  const s13 = c('s13'), catchit = c('s13:catch'), replay = c('s13:replay'), comment = c('s13:comment'), loops = c('s13:loops'), tenth = c('s13:tenth'), say = c('s13:say'), brain = c('s13:brain'), threat = c('s13:threat')
  const s14 = c('s14'), useful = c('s14:useful'), learn = c('s14:learn'), lesson = c('s14:lesson'), drop = c('s14:drop'), sting = c('s14:sting')
  const s15 = c('s15'), noise = c('s15:noise'), noise2 = c('s15:noise#2'), vote = c('s15:vote')
  const s16 = c('s16'), help = c('s16:help'), stick = c('s16:stick'), purpose = c('s16:purpose'), moments = c('s16:moments'), remembered = c('s16:remembered')
  const s17 = c('s17'), night = c('s17:night'), write17 = c('s17:write'), three = c('s17:three'), well = c('s17:well'), why = c('s17:why'), well2 = c('s17:well#2')
  const s18 = c('s18'), small = c('s18:small'), giving = c('s18:giving'), replay18 = c('s18:replay'), free = c('s18:free')
  const s18b = c('s18b'), time = c('s18b:time'), memory = c('s18b:memory'), look = c('s18b:look'), actual = c('s18b:actual')
  const s19 = c('s19'), louder = c('s19:louder'), ten = c('s19:ten'), truer = c('s19:truer')
  const s20 = c('s20'), turn = c('s20:turn'), listen = c('s20:listen'), ten20 = c('s20:ten')

  const A = win(f, 0, s13 + 2), B = win(f, s13, s14 + 2), Cc = win(f, s14, s16 + 2), D = win(f, s16, s19 + 2), E = on(f, s19, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [del, 'crossNoA', 'neutral'], [stop, 'stop', 'smiling'], [write, 'type', 'smiling'], [catchit, 'reachUp', 'thinking'], [loops, 'point', 'worried'], [say, 'talk', 'thinking'], [threat, 'confident', 'smiling'], [useful, 'think', 'thinking'], [lesson, 'hold', 'smiling'], [drop, 'pointDown', 'neutral'], [noise, 'shrug', 'neutral'], [vote, 'crossNoB', 'smug'], [help, 'explain', 'smiling'], [night, 'idle', 'neutral'], [write17, 'read', 'smiling'], [s18, 'idle', 'smiling'], [replay18, 'pointUp', 'smiling'], [time, 'relax', 'smiling'], [louder, 'explain', 'thinking'], [truer, 'crossNoA', 'neutral'], [turn, 'reachDown', 'smiling'], [listen, 'holdChest', 'smiling']]
  const loopN = f < comment ? 1 : Math.min(10, 1 + Math.floor(span(f, comment, tenth) * 9))
  const sitting = false
  const level = lerp(0.9, 0, easeOut(span(f, replay18, actual + 10)))

  return (
    <g>
      <Room id="bcb" sky={on(f, night, 12) * (1 - on(f, s18b, 12))} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, del, 6)} transform={`translate(760 700) scale(${pop(f, del)})`}>
          <rect x={-150} y={-70} width={300} height={140} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text y={22} textAnchor="middle" fill={INK} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>DELETE</text>
          <path d="M-170 -90 L170 90" stroke={RED} strokeWidth={14} strokeLinecap="round" opacity={on(f, bias, 6)} />
        </g>
        {/* # a pen writes the story */}
        <g opacity={on(f, write, 6)} transform={`translate(760 980)`}>
          <rect x={-200} y={-80} width={400} height={160} rx={10} fill="#FFFDF6" stroke={INK} strokeWidth={5} />
          <path d={`M-160 0 Q-100 -30 -40 0 T80 0`} stroke={INK} strokeWidth={6} fill="none" strokeDasharray={400} strokeDashoffset={400 * (1 - on(f, write, 30))} />
          <g transform={`translate(${lerp(-160, 100, on(f, write, 30))} -30) rotate(30)`}><rect x={-10} y={-90} width={20} height={90} fill={MUSTARD} stroke={INK} strokeWidth={4} /><path d="M-10 0 L10 0 L0 20 Z" fill={INK} /></g>
        </g>
        <g opacity={on(f, del, 6)}><Tag x={CX} y={480} text={f >= story ? 'YOU WRITE THE STORY' : f >= stop ? "BUT IT DOESN'T WRITE IT" : "CAN'T DELETE THE BIAS"} s={pop(f, f >= story ? story : f >= stop ? stop : del)} size={46} fill={f >= stop ? GOLD : CREAM} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, s13, 6)}><Tag x={CX} y={480} text="1 · CATCH THE REPLAY" s={pop(f, catchit)} size={54} fill={GOLD} /></g>
        <TV x={760} y={780} s={pop(f, replay) * 0.95} f={f} count={loopN} label={f >= loops ? 'LOOPING' : 'REPLAY'} />
        <g opacity={on(f, say, 6)}><g transform="translate(700 1060)"><rect x={-280} y={-60} width={560} height={120} rx={40} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d="M-230 50 L-280 100 L-190 56 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} /><text y={-4} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{f >= brain ? 'MY BRAIN IS FLAGGING' : 'SAY IT TO YOURSELF:'}</text><text y={40} textAnchor="middle" fill={RED} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, threat, 6)}>A THREAT.</text></g></g>
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, s14, 6) * (1 - on(f, s15, 6))}><Tag x={CX} y={480} text={f >= useful ? '2 · IS IT USEFUL?' : '2 ·'} s={pop(f, s14)} size={54} fill={GOLD} /></g>
        {/* # the sieve: the lesson (bulb) stays, the sting (thorn) drops through */}
        <g transform="translate(760 760)" opacity={1 - on(f, s15, 8)}>
          <path d="M-200 0 L200 0 Q170 150 0 160 Q-170 150 -200 0 Z" fill="#9AA3AE" stroke={INK} strokeWidth={6} />
          {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-140 + k * 40} cy={60 + (k % 2) * 30} r={6} fill={INK} />)}
          <rect x={-240} y={-16} width={480} height={20} rx={10} fill="#7E8791" stroke={INK} strokeWidth={4} />
          <g opacity={on(f, learn, 6)} transform={`translate(-60 ${-70}) scale(${pop(f, lesson)})`}><circle r={46} fill={GOLD} stroke={INK} strokeWidth={5} /><rect x={-18} y={40} width={36} height={26} fill="#9AA3AE" stroke={INK} strokeWidth={4} /></g>
          <g opacity={on(f, drop, 6)} transform={`translate(80 ${lerp(-60, 360, easeOut(span(f, sting, sting + 24)))})`}><path d="M0 -50 L22 30 L-22 30 Z" fill={RED} stroke={INK} strokeWidth={5} /></g>
        </g>
        <g opacity={on(f, lesson, 6) * (1 - on(f, s15, 6))}><Tag x={640} y={1040} text={f >= sting ? 'DROP THE STING' : 'KEEP THE LESSON'} s={pop(f, f >= sting ? sting : lesson)} size={44} fill={f >= sting ? CREAM : GOLD} ink={f >= sting ? RED : INK} /></g>
        {/* # noise gets no vote: a ballot box with the slot crossed */}
        <g opacity={on(f, noise, 6)} transform={`translate(760 820) scale(${pop(f, noise)})`}>
          <rect x={-160} y={-120} width={320} height={240} rx={16} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <rect x={-70} y={-130} width={140} height={20} rx={6} fill={INK} />
          <text y={30} textAnchor="middle" fill={INK} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>VOTE</text>
          <path d="M-190 -150 L190 150" stroke={RED} strokeWidth={14} strokeLinecap="round" opacity={on(f, vote, 6)} />
        </g>
        <g opacity={on(f, noise, 6)}><Tag x={CX} y={480} text={f >= vote ? 'NOISE GETS NO VOTE' : f >= noise2 ? 'JUST NOISE…' : 'NOT USEFUL? NOISE'} s={pop(f, f >= vote ? vote : f >= noise2 ? noise2 : noise)} size={50} fill={CREAM} ink={BURG} /></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, s16, 6) * (1 - on(f, s17, 6))}><Tag x={CX} y={480} text={f >= purpose ? '3 · MAKE THE GOOD STICK' : '3 · HELP THE GOOD'} s={pop(f, f >= purpose ? purpose : help)} size={50} fill={GOLD} /></g>
        <g opacity={on(f, stick, 6) * (1 - on(f, s17, 6))}>
          {Array.from({ length: 3 }, (_, k) => <Nice key={k} x={620 + k * 150} y={800} s={0.9 * pop(f, k ? moments + k * 3 : stick)} />)}
          <g opacity={on(f, remembered, 6)}><Tag x={760} y={960} text="NEED HELP TO BE REMEMBERED" s={pop(f, remembered)} size={36} fill={PINK} /></g>
        </g>
        {/* # the notebook: three good things */}
        <g opacity={on(f, night, 6) * (1 - on(f, s18, 8))} transform={`translate(760 760) rotate(-3)`}>
          <rect x={-200} y={-180} width={400} height={360} rx={12} fill="#FFFDF6" stroke={INK} strokeWidth={6} />
          <text y={-120} textAnchor="middle" fill={BURG} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{f >= three ? '3 GOOD THINGS' : 'TONIGHT'}</text>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, [three, well, why][k], 6)}><path d={`M-150 ${-50 + k * 80} l18 18 l32 -36`} stroke="#3E8A46" strokeWidth={9} fill="none" strokeLinecap="round" /><rect x={-80} y={-50 + k * 80} width={230} height={12} rx={6} fill={PINK_D} opacity={0.7} /></g>)}
          <g opacity={on(f, well2, 6)}><text y={160} textAnchor="middle" fill={INK} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>…AND WHY</text></g>
        </g>
        <g opacity={on(f, s17, 6) * (1 - on(f, s18, 6))}><Tag x={CX} y={480} text={f >= write17 ? 'WRITE THEM DOWN' : 'AT NIGHT'} s={pop(f, f >= write17 ? write17 : s17)} size={54} fill={GOLD} /></g>
        {/* # the good now gets the replay too; the scale levels out */}
        <g opacity={on(f, s18, 6)}>
          <Scale x={760} y={GROUND - 30} tilt={level} s={0.75} right={<Spiky x={0} y={-80} s={0.5} />} left={<g>{Array.from({ length: 10 }, (_, k) => { const [dx, dy] = tenAt(k); return <Nice key={k} x={dx} y={dy - 40} s={0.55} /> })}</g>} />
          <g opacity={on(f, replay18, 6)} transform="translate(560 520)"><circle r={50} fill={PINK} stroke={INK} strokeWidth={5} /><path d="M-14 -22 L22 0 L-14 22 Z" fill="#FFFFFF" /></g>
          <Tag x={CX} y={460} text={f >= actual ? 'LIKE YOUR ACTUAL DAYS' : f >= look ? 'STARTS TO LOOK…' : f >= memory ? 'YOUR MEMORY, REBALANCED' : f >= free ? 'THE BAD GETS IT FREE' : f >= replay18 ? 'THE SAME REPLAY' : f >= giving ? 'GIVE THE GOOD…' : 'SOUNDS SMALL'} s={pop(f, f >= actual ? actual : f >= look ? look : f >= memory ? memory : f >= free ? free : f >= replay18 ? replay18 : f >= giving ? giving : small)} size={44} fill={f >= free && f < memory ? CREAM : GOLD} />
        </g>
      </g>}
      {E > 0.001 && <g opacity={E}>
        <Spiky x={700} y={760} s={0.75 * lerp(1, 0.45, on(f, turn, 20))} text="ONE" />
        <g opacity={on(f, ten, 6)}>{Array.from({ length: 10 }, (_, k) => { const [dx, dy] = tenAt(k); return <Nice key={k} x={880 + dx * 1.4} y={1000 + dy * 1.4} s={0.6 * on(f, ten + k, 4) * lerp(1, 1.3, on(f, listen, 16))} /> })}</g>
        {/* # the volume knob */}
        <g opacity={on(f, turn, 6)} transform="translate(560 1060)"><circle r={60} fill="#FFFFFF" stroke={INK} strokeWidth={6} /><g transform={`rotate(${lerp(60, -100, on(f, turn, 20))})`}><rect x={-6} y={-56} width={12} height={36} rx={6} fill={RED} /></g></g>
        <Tag x={CX} y={480} text={f >= ten20 ? 'LISTEN TO THE TEN' : f >= turn ? 'TURN DOWN THE ONE' : f >= truer ? 'LOUDER ≠ TRUER' : 'LOUDER THAN TEN?'} s={pop(f, f >= ten20 ? ten20 : f >= turn ? turn : f >= truer ? truer : louder)} size={54} fill={f >= turn ? GOLD : CREAM} ink={f >= truer && f < turn ? RED : INK} />
      </g>}
      <Person f={f} who="hero" beats={hero} x={sitting ? 760 : 240} y={sitting ? GROUND - 110 : GROUND} s={0.84} />
      <Headline text={f < s13 ? 'TAKE BACK THE STORY' : f < s16 ? 'QUESTION IT' : f < s19 ? 'HELP THE GOOD' : 'TEN, NOT ONE'} o={f < s13 ? on(f, s12, 8) * (1 - on(f, s13 - 4, 4)) : f < s16 ? on(f, s13, 8) * (1 - on(f, s16 - 4, 4)) : f < s19 ? on(f, s16, 8) * (1 - on(f, s19 - 4, 4)) : on(f, s19, 8)} color={INK} />
      <Vig id="bcb" />
    </g>
  )
}

export const BC_HOOK = makePiece('bc-hook', 'Bad comment: ten nice vs one bad, the replay', {
  beats: ['s1', 's1:ten', 's1:nice', 's1:one', 's1:bad', 's1:remember', 's2', 's2:praised', 's2:meeting', 's2:friend', 's2:work', 's2:person', 's2:eyes', 's2:guess', 's2:replay', 's2:night', 's3', 's3:weak', 's3:strongest', 's3:psychology', 's3b', 's3b:see', 's3b:stop', 's3b:evenings'],
  sfx: [['s1:ten', 'softpop'], ['s1:one', 'thud'], ['s2:praised', 'chime'], ['s2:eyes', 'swish'], ['s2:replay', 'click']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const BC_SCIENCE = makePiece('bc-science', 'Bad comment: Baumeister bad > good, Rozin negativity bias', {
  beats: ['s4', 's4:team', 's4:baumeister', 's4:decades', 's4:research', 's4:paper', 's4:title', 's4:bad', 's4:stronger', 's4:good', 's5', 's5:relationships', 's5:feedback', 's5:memory', 's5:emotion', 's5:events', 's5:harder', 's5:longer', 's5:size', 's6', 's6:year', 's6:psychologists', 's6:rozin', 's6:royzman', 's6:negativity', 's6:bias', 's7', 's7:explanation', 's7:ancestors', 's7:meal', 's7:pity', 's7:predator', 's7:end'],
  sfx: [['s4:baumeister', 'ding'], ['s4:bad', 'impact'], ['s5:relationships', 'softpop'], ['s5:emotion', 'softpop'], ['s6:negativity', 'ding'], ['s7:predator', 'thump']],
  Component: Science, mood: 'light', canvas: 'tall',
})
export const BC_MEMORY = makePiece('bc-memory', 'Bad comment: flagged and kept, the good fades', {
  beats: ['s8', 's8:brain', 's8:threat', 's8:flags', 's8:keeps', 's8:brings', 's8:check', 's9', 's9:nice', 's9:good', 's9:moment', 's9:quietly', 's9:fade', 's9:background', 's9b', 's9b:compliments', 's9b:dinner', 's9b:one', 's9b:still', 's9b:morning', 's10', 's10:memory', 's10:fair', 's10:record', 's10:day#2', 's11', 's11:record', 's11:threats'],
  sfx: [['s8:flags', 'click'], ['s8:brings', 'whoosh'], ['s9:fade', 'swish'], ['s9b:dinner', 'tick'], ['s10:fair', 'impact']],
  Component: Memory, mood: 'light', canvas: 'tall',
})
export const BC_BALANCE = makePiece('bc-balance', 'Bad comment: catch the replay, keep the lesson, help the good stick', {
  beats: ['s12', 's12:delete', 's12:bias', 's12:stop', 's12:write', 's12:story', 's13', 's13:catch', 's13:replay', 's13:comment', 's13:loops', 's13:tenth', 's13:say', 's13:brain', 's13:threat', 's14', 's14:useful', 's14:learn', 's14:lesson', 's14:drop', 's14:sting', 's15', 's15:noise', 's15:noise#2', 's15:vote', 's16', 's16:help', 's16:stick', 's16:purpose', 's16:moments', 's16:remembered', 's17', 's17:night', 's17:write', 's17:three', 's17:well', 's17:why', 's17:well#2', 's18', 's18:small', 's18:giving', 's18:replay', 's18:free', 's18b', 's18b:time', 's18b:memory', 's18b:look', 's18b:actual', 's19', 's19:louder', 's19:ten', 's19:truer', 's20', 's20:turn', 's20:listen', 's20:ten'],
  sfx: [['s12:bias', 'click'], ['s13:tenth', 'tick'], ['s13:threat', 'ding'], ['s14:sting', 'swish'], ['s15:vote', 'thud'], ['s17:three', 'softpop'], ['s17:well', 'softpop'], ['s17:why', 'softpop'], ['s18b:actual', 'chime'], ['s20:turn', 'click']],
  Component: Balance, mood: 'light', canvas: 'tall',
})
