// ============================================================
// ENOUGH — the Short "Why Nothing Ever Feels Like Enough" (LW
// batch 2, 2026-11-16). Own art direction: a sunlit KITCHEN in
// duck-egg blue and tangerine, a cream fridge with a noticeboard of
// paper notes. Wanting more is a TREADMILL in the middle of the
// kitchen; gratitude is the little notes that pile up on the fridge.
// Tall canvas 1080 × 1920; action between y 420 and GROUND 1240.
// ============================================================
// HOOK   s1–s3b) a gift box opens with sparkles; a SPARKLE meter drains over a few weeks; NEW PHONE · NEW JOB ·
//    NEW PLACE go grey: JUST NORMAL; a shop sign: NEXT THING!; LIFE ↑ but the feeling balloon deflates.
// TREAD  s4–s8)  HEDONIC ADAPTATION card; good things shrink, FAST; a lottery ticket WINNER! with happiness bars
//    (winner ≈ not winner); a chat bubble with a friend shrinks: ENJOYED LESS; the peak vs an ordinary Tuesday;
//    he runs on the treadmill toward a MORE sign and goes nowhere.
// STUDY  s9–s14b) the speed knob turns down; EMMONS & McCULLOUGH card; three notebooks: GRATEFUL (5 lines),
//    HASSLES, EVENTS; 10 weekly ticks; LIFE AS A WHOLE ↑ and HOPEFUL ABOUT NEXT WEEK; a magnifier: NOTICE;
//    the good things stay, only the eye wanders: YOUR ATTENTION.
// TRY    s15–s20) notes go up on the fridge: MY SISTER CALLED; HOT WATER (a tap), A BODY THAT WORKS (a heart),
//    A FRIEND WHO PICKS UP (a phone); ORDINARY = ON THE LIST; ONCE A WEEK; NO FORCED SMILE; a dropped pen picked
//    up again; the fridge glows: ENOUGH.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Tag, win, on, pop, lerp, span, easeOut, BURG, CREAM, INK, GOLD, CX, GROUND, W, H, type Beat } from '../day3/kit'

const DUCK = '#CDE7E6', DUCK_D = '#B3D6D5', TANG = '#F29A4A', TANG_D = '#D97F30', TILE = '#FFFFFF', FLOORC = '#F2E2C8', FLOOR_D = '#E2CCAA', GREY = '#B9BDC2', GREEN = '#3E8A46'

// # the kitchen: duck-egg wall with a tile band, tangerine counter on the right, a fridge with notes, warm floor
const Kitchen: React.FC<{ id: string; fridge?: number; notes?: number; glow?: number }> = ({ id, fridge = 1, notes = 0, glow = 0 }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.15} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={DUCK} />
    {/* # tile band */}
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={k * 80} y={GROUND - 330} width={76} height={56} fill={TILE} opacity={0.7} />)}
    <rect x={0} y={GROUND - 274} width={W} height={8} fill={DUCK_D} />
    {/* # sunny window top-left */}
    <g transform="translate(70 380)"><rect width={260} height={240} rx={10} fill="#FFFFFF" /><rect x={10} y={10} width={240} height={220} rx={6} fill="#FFE9B8" /><circle cx={180} cy={70} r={40} fill="#FFD36B" /><rect x={124} y={10} width={12} height={220} fill="#FFFFFF" /></g>
    {/* # the fridge on the right with a noticeboard */}
    {fridge > 0 && <g opacity={fridge} transform={`translate(990 ${GROUND})`}>
      <circle cx={0} cy={-420} r={300} fill={GOLD} opacity={0.25 * glow} />
      <rect x={-170} y={-780} width={340} height={780} rx={30} fill="#FFF8EC" stroke={INK} strokeWidth={6} />
      <rect x={-170} y={-520} width={340} height={8} fill={INK} />
      <rect x={130} y={-720} width={14} height={120} rx={7} fill={GREY} /><rect x={130} y={-470} width={14} height={160} rx={7} fill={GREY} />
      {Array.from({ length: Math.round(notes) }, (_, k) => <rect key={k} x={-140 + (k % 3) * 92} y={-480 + Math.floor(k / 3) * 110} width={80} height={80} fill={['#FFE45C', '#F6B6C8', '#BFE3B0'][k % 3]} stroke={INK} strokeWidth={3} transform={`rotate(${(k % 2 ? 4 : -5)} ${-100 + (k % 3) * 92} ${-440 + Math.floor(k / 3) * 110})`} />)}
    </g>}
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={FLOORC} />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={0} y={GROUND + 40 + k * 110} width={W} height={4} fill={FLOOR_D} />)}
  </g>
)
const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a sparkle star
const Sparkle: React.FC<{ x: number; y: number; s: number; f: number; k?: number }> = ({ x, y, s, f, k = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s * (0.8 + 0.2 * Math.sin(f / 4 + k))})`}><path d="M0 -40 Q6 -6 40 0 Q6 6 0 40 Q-6 6 -40 0 Q-6 -6 0 -40 Z" fill={GOLD} /></g>
)

// # a thing you wanted: phone / job badge / house key; `grey` 0..1 drains its colour
const Thing: React.FC<{ x: number; y: number; s: number; kind: 'phone' | 'job' | 'key'; grey: number; label: string }> = ({ x, y, s, kind, grey, label }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={100} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <g opacity={1 - grey}>
      {kind === 'phone' && <g><rect x={-34} y={-60} width={68} height={120} rx={12} fill={INK} /><rect x={-26} y={-50} width={52} height={96} rx={6} fill="#5AA9F0" /></g>}
      {kind === 'job' && <g><rect x={-50} y={-30} width={100} height={70} rx={10} fill="#8A5A3C" stroke={INK} strokeWidth={4} /><rect x={-18} y={-48} width={36} height={20} rx={4} fill="none" stroke={INK} strokeWidth={4} /></g>}
      {kind === 'key' && <g><circle cx={-24} r={30} fill="none" stroke={GOLD} strokeWidth={12} /><path d="M6 0 L60 0 L60 20 M44 0 L44 16" stroke={GOLD} strokeWidth={12} fill="none" /></g>}
    </g>
    <g opacity={grey}>
      {kind === 'phone' && <rect x={-34} y={-60} width={68} height={120} rx={12} fill={GREY} />}
      {kind === 'job' && <rect x={-50} y={-30} width={100} height={70} rx={10} fill={GREY} />}
      {kind === 'key' && <g><circle cx={-24} r={30} fill="none" stroke={GREY} strokeWidth={12} /><path d="M6 0 L60 0 L60 20" stroke={GREY} strokeWidth={12} fill="none" /></g>}
    </g>
    <text y={140} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
  </g>
)

// # the treadmill; `speed` drives the belt stripes
const Treadmill: React.FC<{ x: number; f: number; speed: number; s?: number }> = ({ x, f, speed, s = 1 }) => (
  <g transform={`translate(${x} ${GROUND}) scale(${s})`}>
    <path d="M200 -40 L240 -420 L270 -420 L240 -40 Z" fill={GREY} stroke={INK} strokeWidth={5} />
    <rect x={180} y={-480} width={150} height={70} rx={14} fill={INK} />
    <rect x={194} y={-468} width={122} height={46} rx={8} fill="#5AA9F0" />
    <text x={255} y={-434} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>{(speed * 12).toFixed(0)} KM/H</text>
    <rect x={-260} y={-50} width={520} height={50} rx={25} fill="#3A3A44" stroke={INK} strokeWidth={5} />
    <g>{Array.from({ length: 10 }, (_, k) => { const xx = ((k * 60 - f * 9 * speed) % 600 + 600) % 600 - 280; return xx > -250 && xx < 240 ? <rect key={k} x={xx} y={-46} width={8} height={10} fill="#7E8791" /> : null })}</g>
    <circle cx={-235} cy={-25} r={18} fill={GREY} /><circle cx={235} cy={-25} r={18} fill={GREY} />
  </g>
)

// # a name card
const Card: React.FC<{ x: number; y: number; s: number; top: string; name: string; sub?: string; subO?: number }> = ({ x, y, s, top, name, sub, subO = 1 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-310} y={-140} width={620} height={280} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text y={-60} textAnchor="middle" fill={TANG_D} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 3 }}>{top}</text>
    <text y={10} textAnchor="middle" fill={INK} style={{ font: '400 58px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
    {sub && <text y={90} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }} opacity={subO}>{sub}</text>}
  </g>
)

// # a notebook with N lines
const Note: React.FC<{ x: number; y: number; s: number; title: string; n: number; color: string; r?: number }> = ({ x, y, s, title, n, color, r = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-130} y={-170} width={260} height={340} rx={12} fill="#FFFDF6" stroke={INK} strokeWidth={5} />
    <rect x={-130} y={-170} width={260} height={64} rx={12} fill={color} /><rect x={-130} y={-120} width={260} height={14} fill={color} />
    <text y={-124} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    {Array.from({ length: n }, (_, k) => <rect key={k} x={-100} y={-80 + k * 46} width={200} height={12} rx={6} fill={color} opacity={0.55} />)}
  </g>
)

// ---------------------------------------------------------------- HOOK
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const wanted = c('s1:wanted'), badly = c('s1:badly'), stop = c('s1:stop'), special = c('s1:special'), weeks = c('s1:weeks')
  const phone = c('s2:phone'), job = c('s2:job'), place = c('s2:place'), excited = c('s2:excited'), now = c('s2:now'), normal = c('s2:normal')
  const s3 = c('s3'), start = c('s3:start'), next = c('s3:next')
  const s3b = c('s3b'), life = c('s3b:life'), better = c('s3b:better'), feeling = c('s3b:feeling'), never = c('s3b:never'), last = c('s3b:last')

  const A = win(f, 0, c('s2') + 2), B = win(f, c('s2'), s3b + 2), C = on(f, s3b, 8)
  const sparkle = lerp(1, 0.1, easeOut(span(f, stop, weeks + 14)))
  const grey = on(f, now, 16)
  const hero: Beat[] = [[0, 'idle', 'smiling'], [wanted, 'reachUp', 'smiling'], [badly, 'celebrate', 'smiling'], [stop, 'hold', 'neutral'], [weeks, 'shrug', 'neutral'], [phone, 'phone', 'smiling'], [job, 'present', 'smiling'], [place, 'taDa', 'smiling'], [excited, 'celebrate', 'smiling'], [now, 'shrug', 'neutral'], [normal, 'pockets', 'neutral'], [start, 'lookFar', 'thinking'], [next, 'point', 'smiling'], [life, 'pointUp', 'smiling'], [feeling, 'shrug', 'neutral'], [never, 'slump', 'worried'], [last, 'pockets', 'worried']]
  const deflate = lerp(1, 0.35, easeOut(span(f, never, last + 14)))

  return (
    <g>
      <Kitchen id="enh" fridge={0} />
      {A > 0.001 && <g opacity={A}>
        {/* # the gift box opening */}
        <g transform={`translate(620 ${GROUND - 40})`} opacity={on(f, 0, 4)}>
          <rect x={-120} y={-200} width={240} height={200} rx={10} fill={TANG} stroke={INK} strokeWidth={6} />
          <rect x={-20} y={-200} width={40} height={200} fill={BURG} />
          <g transform={`translate(0 ${-200 - on(f, wanted, 10) * 80}) rotate(${-on(f, wanted, 10) * 20})`}><rect x={-140} y={-50} width={280} height={50} rx={10} fill={TANG_D} stroke={INK} strokeWidth={6} /><rect x={-20} y={-50} width={40} height={50} fill={BURG} /></g>
        </g>
        {[[-80, -380], [60, -440], [150, -330], [-160, -300]].map(([dx, dy], k) => <Sparkle key={k} x={620 + dx} y={GROUND + dy} s={on(f, wanted, 8) * sparkle} f={f} k={k} />)}
        {/* # the sparkle meter */}
        <g transform="translate(880 600)" opacity={on(f, special, 6)}>
          <rect x={-40} y={-200} width={80} height={300} rx={40} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <rect x={-28} y={-188 + 276 * (1 - sparkle)} width={56} height={276 * sparkle} rx={28} fill={GOLD} />
          <text y={150} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>SPECIAL</text>
        </g>
        <g opacity={on(f, stop, 6)}><Tag x={CX} y={460} text={f >= weeks ? 'A FEW WEEKS LATER…' : 'STOPS FEELING SPECIAL'} s={pop(f, f >= weeks ? weeks : stop)} size={46} fill={CREAM} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Thing x={560} y={640} s={pop(f, phone) * 0.8} kind="phone" grey={grey} label="NEW PHONE" />
        <Thing x={800} y={640} s={pop(f, job) * 0.8} kind="job" grey={grey} label="NEW JOB" />
        <Thing x={680} y={920} s={pop(f, place) * 0.8} kind="key" grey={grey} label="NEW PLACE" />
        <g opacity={on(f, excited, 6) * (1 - on(f, s3, 6))}><Tag x={CX} y={460} text={f >= normal ? 'JUST NORMAL' : f >= now ? 'AND NOW…' : 'SO EXCITED!'} s={pop(f, f >= normal ? normal : f >= now ? now : excited)} size={56} fill={f >= now ? '#E4E6E8' : GOLD} /></g>
        {/* # the next shiny thing in a shop sign */}
        <g opacity={on(f, start, 6)} transform={`translate(760 ${560}) scale(${pop(f, next)})`}>
          <rect x={-200} y={-60} width={400} height={120} rx={16} fill={TANG} stroke={INK} strokeWidth={6} />
          <text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"', letterSpacing: 4 }}>NEXT THING!</text>
        </g>
        <g opacity={on(f, s3, 6)}><Tag x={CX} y={460} text={f >= next ? 'THE NEXT THING' : 'START WANTING…'} s={pop(f, f >= next ? next : start)} size={52} fill={GOLD} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # life goes up, the feeling balloon deflates */}
        <g transform="translate(560 1100)" opacity={on(f, life, 6)}>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={k * 60} y={-(k + 1) * 70 * on(f, life + k * 3, 8)} width={44} height={(k + 1) * 70 * on(f, life + k * 3, 8)} fill={GREEN} />)}
          <text x={110} y={50} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>LIFE</text>
        </g>
        <g transform={`translate(880 ${lerp(640, 900, 1 - deflate)})`} opacity={on(f, feeling, 6)}>
          <path d="M0 140 L0 300" stroke={INK} strokeWidth={3} />
          <ellipse rx={110 * deflate} ry={140 * deflate} fill={TANG} stroke={INK} strokeWidth={5} />
          <text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${Math.round(40 * deflate + 10)}px "Bebas Neue"` }}>FEELING</text>
        </g>
        <Tag x={CX} y={460} text={f >= never ? 'NEVER SEEMS TO LAST' : f >= better ? 'LIFE GETS BETTER' : 'EVEN WHEN…'} s={pop(f, f >= never ? never : f >= better ? better : s3b)} size={50} fill={f >= never ? CREAM : GOLD} ink={f >= never ? BURG : INK} />
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={260} s={0.84} />
      <Headline text={f < c('s2') ? 'SO SPECIAL…' : f < s3b ? 'THE NEW NORMAL' : 'NEVER ENOUGH'} o={f < c('s2') ? on(f, wanted, 8) * (1 - on(f, c('s2') - 4, 4)) : f < s3b ? on(f, phone, 8) * (1 - on(f, s3b - 4, 4)) : on(f, s3b, 8)} color={INK} />
      <Vig id="enh" />
    </g>
  )
}

// ---------------------------------------------------------------- TREAD
const Tread: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), hedonic = c('s4:hedonic'), adaptation = c('s4:adaptation'), used = c('s4:used'), good = c('s4:good'), fast = c('s4:fast')
  const famous = c('s5:famous'), researchers = c('s5:researchers'), lottery = c('s5:lottery'), winners = c('s5:winners'), happy = c('s5:happy')
  const compared = c('s6:compared'), won = c('s6:won'), happier = c('s6:happier'), enjoyed = c('s6:enjoyed'), everyday = c('s6:everyday'), less = c('s6:less'), chat = c('s6:chat'), friend = c('s6:friend')
  const s7 = c('s7'), win7 = c('s7:win'), normal = c('s7:normal'), small = c('s7:small'), joys = c('s7:joys'), quieter = c('s7:quieter')
  const s7b = c('s7b'), contrast = c('s7b:contrast'), huge = c('s7b:huge'), high = c('s7b:high'), ordinary = c('s7b:ordinary'), tuesday = c('s7b:tuesday'), compete = c('s7b:compete')
  const s8 = c('s8'), treadmill = c('s8:treadmill'), running = c('s8:running'), more = c('s8:more'), stay = c('s8:stay'), place = c('s8:place')

  const A = win(f, 0, c('s5') + 2), B = win(f, c('s5'), s7 + 2), C = win(f, s7, s8 + 2), D = on(f, s8, 8)
  const runCycle = Math.floor(f / 6) % 2 ? 'runA' : 'runB'
  const hero: Beat[] = [[0, 'idle', 'neutral'], [hedonic, 'present', 'thinking'], [used, 'shrug', 'neutral'], [fast, 'pointUp', 'shocked'], [famous, 'explain', 'neutral'], [lottery, 'holdUp', 'smiling'], [happy, 'think', 'thinking'], [compared, 'weighA', 'thinking'], [happier, 'weighB', 'neutral'], [enjoyed, 'talk', 'neutral'], [less, 'shrug', 'worried'], [s7, 'celebrate', 'smiling'], [normal, 'pockets', 'neutral'], [joys, 'lookFar', 'worried'], [contrast, 'explain', 'thinking'], [high, 'reachUp', 'smiling'], [ordinary, 'slump', 'neutral'], [compete, 'shrug', 'worried']]
  const shrink = lerp(1, 0.55, on(f, good, 30))

  return (
    <g>
      <Kitchen id="ent" fridge={0} />
      {A > 0.001 && <g opacity={A}>
        <Card x={CX + 100} y={640} s={pop(f, s4) * (1 - on(f, used, 8))} top="PSYCHOLOGISTS CALL IT" name={f >= adaptation ? 'HEDONIC ADAPTATION' : f >= hedonic ? 'HEDONIC…' : '…'} />
        <g opacity={on(f, used, 6)}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${560 + k * 170} 820) scale(${shrink * 0.7})`}><circle r={90} fill={[TANG, GOLD, '#F6B6C8'][k]} stroke={INK} strokeWidth={6} opacity={lerp(1, 0.5, on(f, good, 30))} /><Sparkle x={0} y={0} s={1 - on(f, good, 30)} f={f} k={k} /></g>)}
          <Tag x={CX} y={460} text={f >= fast ? '…AND FAST' : f >= good ? 'USED TO GOOD THINGS' : 'WE GET USED TO IT'} s={pop(f, f >= fast ? fast : f >= good ? good : used)} size={52} fill={f >= fast ? CREAM : GOLD} ink={f >= fast ? BURG : INK} />
        </g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # the lottery ticket */}
        <g opacity={on(f, lottery, 6) * (1 - on(f, everyday, 6))} transform={`translate(720 640) rotate(-5) scale(${pop(f, lottery) * 0.9})`}>
          <rect x={-200} y={-100} width={400} height={200} rx={12} fill={GOLD} stroke={INK} strokeWidth={6} />
          <path d="M-200 -40 L200 -40" stroke={INK} strokeWidth={3} strokeDasharray="12 8" />
          <text y={50} textAnchor="middle" fill={BURG} style={{ font: '400 80px "Bebas Neue"', letterSpacing: 6 }}>{f >= winners ? 'WINNER!' : 'LOTTERY'}</text>
        </g>
        <g opacity={on(f, famous, 6) * (1 - on(f, lottery, 6))}><Tag x={CX} y={460} text={f >= researchers ? 'RESEARCHERS ASKED…' : 'A FAMOUS STUDY'} s={pop(f, f >= researchers ? researchers : famous)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, happy, 6) * (1 - on(f, compared, 6))}><Tag x={CX} y={460} text="HOW HAPPY ARE YOU?" s={pop(f, happy)} size={54} fill={CREAM} /></g>
        {/* # happiness bars: winners vs people who hadn't won — about the same */}
        <g opacity={on(f, compared, 6) * (1 - on(f, everyday, 6))} transform="translate(560 1100)">
          <rect x={0} y={-300 * on(f, compared, 14)} width={120} height={300 * on(f, compared, 14)} fill={GOLD} stroke={INK} strokeWidth={4} />
          <rect x={200} y={-290 * on(f, won, 14)} width={120} height={290 * on(f, won, 14)} fill={GREY} stroke={INK} strokeWidth={4} />
          <text x={60} y={50} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>WINNERS</text>
          <text x={260} y={50} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>DIDN'T WIN</text>
        </g>
        <g opacity={on(f, happier, 6) * (1 - on(f, everyday, 6))}><Tag x={CX} y={460} text="NOT MUCH HAPPIER" s={pop(f, happier)} size={56} fill={CREAM} ink={BURG} /></g>
        {/* # everyday pleasure: a chat with a friend, shrinking */}
        <g opacity={on(f, everyday, 6)} transform={`translate(740 760) scale(${lerp(1, 0.6, on(f, less, 16))})`}>
          <rect x={-180} y={-80} width={360} height={160} rx={50} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <path d="M-100 76 L-130 130 L-60 80 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text y={20} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>{f >= friend ? 'A CHAT WITH A FRIEND' : f >= chat ? 'A CHAT…' : 'EVERYDAY THINGS'}</text>
        </g>
        <g opacity={on(f, enjoyed, 6)}><Tag x={CX} y={460} text={f >= less ? 'ENJOYED LESS' : 'EVERYDAY THINGS'} s={pop(f, f >= less ? less : enjoyed)} size={56} fill={CREAM} ink={BURG} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <g opacity={1 - on(f, s7b, 8)}>
          <g transform={`translate(720 700) scale(${pop(f, win7) * 0.9})`}><rect x={-200} y={-100} width={400} height={200} rx={12} fill={lerp(0, 1, on(f, normal, 14)) > 0.5 ? GREY : GOLD} stroke={INK} strokeWidth={6} /><text y={30} textAnchor="middle" fill={INK} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 4 }}>{f >= normal ? 'NEW NORMAL' : 'BIG WIN'}</text></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, small, 6) * lerp(1, 0.25, on(f, quieter, 16))}><Sparkle x={600 + k * 120} y={960} s={0.8} f={f} k={k} /></g>)}
          <g opacity={on(f, joys, 6)}><Tag x={720} y={1080} text={f >= quieter ? 'SMALL JOYS GOT QUIETER' : 'THE SMALL JOYS'} s={pop(f, f >= quieter ? quieter : joys)} size={40} fill={CREAM} /></g>
        </g>
        {/* # contrast: a huge peak, then the flat ordinary Tuesday */}
        <g opacity={on(f, s7b, 6)}>
          <g transform="translate(460 1100)">
            <path d={`M0 0 L120 0 L220 ${-420 * on(f, huge, 14)} L320 0 L600 0`} stroke={TANG_D} strokeWidth={12} fill="none" strokeLinejoin="round" />
            <g opacity={on(f, high, 6)}><Tag x={220} y={-470} text="HUGE HIGH" s={pop(f, high)} size={40} fill={GOLD} /></g>
            <g opacity={on(f, ordinary, 6)}><rect x={360} y={-60} width={220} height={52} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={4} /><text x={470} y={-22} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{f >= tuesday ? 'TUESDAY' : 'ORDINARY'}</text></g>
          </g>
          <Tag x={CX} y={460} text={f >= compete ? "TUESDAY CAN'T COMPETE" : f >= contrast ? 'PLEASURE = CONTRAST' : 'PLEASURE WORKS BY…'} s={pop(f, f >= compete ? compete : f >= contrast ? contrast : s7b)} size={50} fill={GOLD} />
        </g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <Treadmill x={560} f={f} speed={1} />
        {/* # the MORE sign, always just out of reach */}
        <g opacity={on(f, more, 6)} transform={`translate(900 ${640 + Math.sin(f / 8) * 8})`}><rect x={-110} y={-50} width={220} height={100} rx={14} fill={TANG} stroke={INK} strokeWidth={6} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>MORE →</text></g>
        <Tag x={CX} y={460} text={f >= place ? 'SAME PLACE' : f >= stay ? 'YOU STAY…' : f >= running ? 'RUNNING TOWARD MORE' : 'A TREADMILL'} s={pop(f, f >= place ? place : f >= stay ? stay : f >= running ? running : treadmill)} size={56} fill={f >= stay ? CREAM : GOLD} ink={f >= stay ? BURG : INK} />
      </g>}
      {f >= s8 ? <Person f={f} who="hero-struggling" beats={[[0, runCycle, f >= stay ? 'worried' : 'neutral']]} x={520} y={GROUND - 50} s={0.8} />
        : <Person f={f} who="hero-struggling" beats={hero} x={240} s={0.84} />}
      <Headline text={f < c('s5') ? 'GETTING USED TO IT' : f < s7 ? 'THE LOTTERY STUDY' : f < s8 ? 'THE NEW NORMAL' : 'THE TREADMILL'} o={f < c('s5') ? on(f, s4, 8) * (1 - on(f, c('s5') - 4, 4)) : f < s7 ? on(f, famous, 8) * (1 - on(f, s7 - 4, 4)) : f < s8 ? on(f, s7, 8) * (1 - on(f, s8 - 4, 4)) : on(f, s8, 8)} color={INK} />
      <Vig id="ent" />
    </g>
  )
}

// ---------------------------------------------------------------- STUDY
const Study: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), slows = c('s9:slows'), down = c('s9:down')
  const s10 = c('s10'), psychologists = c('s10:psychologists'), emmons = c('s10:emmons'), mccullough = c('s10:mccullough'), simple = c('s10:simple')
  const once = c('s11:once'), week = c('s11:week'), asked = c('s11:asked'), write = c('s11:write'), five = c('s11:five'), grateful = c('s11:grateful')
  const another = c('s12:another'), hassles = c('s12:hassles'), third = c('s12:third'), events = c('s12:events'), week12 = c('s12:week')
  const s13 = c('s13'), n10 = c('s13:10'), gratitude = c('s13:gratitude'), better = c('s13:better'), lives = c('s13:lives'), whole = c('s13:whole'), hopeful = c('s13:hopeful'), ahead = c('s13:ahead')
  const s14 = c('s14'), pushes = c('s14:pushes'), adaptation = c('s14:adaptation'), notice = c('s14:notice'), seeing = c('s14:seeing')
  const s14b = c('s14b'), things = c('s14b:things'), disappear = c('s14b:disappear'), used = c('s14b:used'), attention = c('s14b:attention'), does = c('s14b:does')

  const A = win(f, 0, s10 + 2), B = win(f, s10, c('s11') + 2), Cc = win(f, c('s11'), s13 + 2), D = win(f, s13, s14 + 2), E = on(f, s14, 8)
  const speed = lerp(1, 0.25, easeOut(span(f, slows, down + 20)))
  const runCycle = Math.floor(f / lerp(14, 6, speed)) % 2 ? 'runA' : 'runB'
  const hero: Beat[] = [[0, 'idle', 'neutral'], [psychologists, 'present', 'thinking'], [simple, 'pointUp', 'smiling'], [once, 'countOne', 'neutral'], [write, 'type', 'smiling'], [five, 'countB', 'smiling'], [grateful, 'holdChest', 'smiling'], [hassles, 'facepalm', 'worried'], [events, 'shrug', 'neutral'], [n10, 'countB', 'thinking'], [better, 'celebrate', 'smiling'], [hopeful, 'lookFar', 'smiling'], [pushes, 'push', 'smiling'], [notice, 'pointUp', 'smiling'], [things, 'present', 'smiling'], [disappear, 'crossNoA', 'neutral'], [attention, 'lookFar', 'thinking']]
  // # ten weekly ticks
  const ticks = Math.floor(lerp(0, 10, on(f, n10, 24)))

  return (
    <g>
      <Kitchen id="ens" fridge={0} />
      {A > 0.001 && <g opacity={A}>
        <Treadmill x={560} f={f} speed={speed} />
        {/* # the speed knob */}
        <g opacity={on(f, slows, 6)} transform="translate(900 600)"><circle r={70} fill="#FFFFFF" stroke={INK} strokeWidth={6} /><g transform={`rotate(${lerp(80, -80, 1 - speed)})`}><rect x={-6} y={-64} width={12} height={40} rx={6} fill={TANG_D} /></g><text y={110} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>{f >= down ? 'SLOWER' : 'SPEED'}</text></g>
        <Tag x={CX} y={460} text={f >= slows ? 'WHAT SLOWS IT DOWN?' : 'SO…'} s={pop(f, f >= slows ? slows : s9)} size={54} fill={GOLD} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Card x={CX + 40} y={640} s={pop(f, psychologists)} top="2003 · PSYCHOLOGISTS" name={f >= mccullough ? 'EMMONS & McCULLOUGH' : f >= emmons ? 'ROBERT EMMONS &…' : '…'} sub="SOMETHING SIMPLE" subO={on(f, simple, 6)} />
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        <Note x={560} y={780} s={pop(f, asked) * 0.85} title="GRATEFUL" n={Math.floor(lerp(0, 5, on(f, five, 20)))} color={GREEN} r={-4} />
        <Note x={760} y={800} s={pop(f, hassles) * 0.75} title="HASSLES" n={4} color="#D2463C" r={3} />
        <Note x={940} y={820} s={pop(f, events) * 0.7} title="EVENTS" n={4} color={GREY} r={6} />
        <g opacity={on(f, once, 6) * (1 - on(f, another, 6))}><Tag x={CX} y={460} text={f >= grateful ? 'UP TO 5 GRATEFUL THINGS' : f >= write ? 'WRITE DOWN…' : f >= week ? 'ONCE A WEEK' : 'ONCE…'} s={pop(f, f >= grateful ? grateful : f >= write ? write : f >= week ? week : once)} size={48} fill={GOLD} /></g>
        <g opacity={on(f, another, 6)}><Tag x={CX} y={460} text={f >= week12 ? 'EVENTS FROM THEIR WEEK' : f >= third ? 'A THIRD GROUP: EVENTS' : f >= hassles ? 'ANOTHER: HASSLES' : 'ANOTHER GROUP…'} s={pop(f, f >= week12 ? week12 : f >= third ? third : f >= hassles ? hassles : another)} size={46} fill={CREAM} /></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        {/* # ten weekly ticks, then the two results */}
        <g transform="translate(440 600)">{Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(${(k % 5) * 110} ${Math.floor(k / 5) * 100})`}><rect x={-40} y={-40} width={80} height={80} rx={12} fill="#FFFFFF" stroke={INK} strokeWidth={4} />{k < ticks && <path d="M-20 0 l14 14 l26 -28" stroke={GREEN} strokeWidth={9} fill="none" strokeLinecap="round" />}</g>)}</g>
        <g opacity={on(f, s13, 6) * (1 - on(f, gratitude, 6))}><Tag x={CX} y={460} text="AFTER 10 WEEKS" s={pop(f, n10)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, better, 6)} transform="translate(560 1000)"><rect x={0} y={-30} width={lerp(60, 440, on(f, better, 16))} height={60} rx={30} fill={GREEN} /><text x={10} y={-46} fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>{f >= whole ? 'LIFE AS A WHOLE ↑' : f >= lives ? 'THEIR LIVES ↑' : 'FELT BETTER ↑'}</text></g>
        <g opacity={on(f, hopeful, 6)} transform="translate(560 1130)"><rect x={0} y={-30} width={lerp(60, 380, on(f, hopeful, 16))} height={60} rx={30} fill={TANG} /><text x={10} y={-46} fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>{f >= ahead ? 'HOPEFUL ABOUT NEXT WEEK' : 'MORE HOPEFUL'}</text></g>
        <g opacity={on(f, gratitude, 6)}><Tag x={CX} y={460} text="THE GRATITUDE GROUP" s={pop(f, gratitude)} size={52} fill={GOLD} /></g>
      </g>}
      {E > 0.001 && <g opacity={E}>
        {/* # a magnifier that makes you notice */}
        <g opacity={on(f, notice, 6) * (1 - on(f, s14b, 8))} transform={`translate(${lerp(560, 760, on(f, notice, 30))} 760)`}><circle r={110} fill="#FFFFFF" fillOpacity={0.5} stroke={INK} strokeWidth={12} /><Sparkle x={0} y={0} s={1} f={f} /><rect x={70} y={70} width={30} height={140} rx={12} fill={TANG_D} transform="rotate(-45 85 140)" /></g>
        <g opacity={on(f, s14, 6) * (1 - on(f, s14b, 6))}><Tag x={CX} y={460} text={f >= seeing ? "NOTICE WHAT YOU'VE STOPPED SEEING" : f >= adaptation ? 'PUSHES BACK ON ADAPTATION' : 'GRATITUDE PUSHES BACK'} s={pop(f, f >= seeing ? seeing : f >= adaptation ? adaptation : pushes)} size={38} fill={GOLD} /></g>
        {/* # the good things stay; an eye drifts away from them */}
        <g opacity={on(f, s14b, 6)}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${560 + k * 160} 860)`}><circle r={60} fill={[TANG, GOLD, '#F6B6C8'][k]} stroke={INK} strokeWidth={5} /></g>)}
          <g opacity={on(f, attention, 6)} transform={`translate(${lerp(720, 900, on(f, attention, 20))} ${lerp(660, 560, on(f, attention, 20))})`}><path d="M-60 0 Q0 -46 60 0 Q0 46 -60 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} /><circle cx={lerp(0, 24, on(f, does, 10))} r={18} fill={INK} /></g>
          <Tag x={CX} y={460} text={f >= attention ? 'YOUR ATTENTION DOES' : f >= used ? "WHEN YOU'RE USED TO THEM" : f >= disappear ? "DON'T DISAPPEAR" : 'THE GOOD THINGS…'} s={pop(f, f >= attention ? attention : f >= used ? used : f >= disappear ? disappear : things)} size={48} fill={f >= attention ? CREAM : GOLD} ink={f >= attention ? BURG : INK} />
        </g>
      </g>}
      {f < s10 ? <Person f={f} who="hero-struggling" beats={[[0, runCycle, 'neutral']]} x={520} y={GROUND - 50} s={0.8} /> : <Person f={f} who="hero" beats={hero} x={240} s={0.84} />}
      <Headline text={f < s10 ? 'SLOW IT DOWN' : f < s13 ? 'A SIMPLE TEST' : f < s14 ? 'THE RESULT' : 'NOTICE AGAIN'} o={f < s10 ? on(f, s9, 8) * (1 - on(f, s10 - 4, 4)) : f < s13 ? on(f, s10, 8) * (1 - on(f, s13 - 4, 4)) : f < s14 ? on(f, s13, 8) * (1 - on(f, s14 - 4, 4)) : on(f, s14, 8)} color={INK} />
      <Vig id="ens" />
    </g>
  )
}

// ---------------------------------------------------------------- TRY
const Try: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), tryit = c('s15:try')
  const once = c('s16:once'), write = c('s16:write'), grateful = c('s16:grateful'), specific = c('s16:specific'), family = c('s16:family'), sister = c('s16:sister'), check = c('s16:check')
  const include = c('s17:include'), noticing = c('s17:noticing'), water = c('s17:water'), body = c('s17:body'), works = c('s17:works'), friend = c('s17:friend'), phone = c('s17:phone')
  const s17b = c('s17b'), ordinary = c('s17b:ordinary'), probably = c('s17b:probably'), list = c('s17b:list')
  const s18 = c('s18'), enough = c('s18:enough'), see = c('s18:see'), clearly = c('s18:clearly'), force = c('s18:force'), smile = c('s18:smile')
  const s18b = c('s18b'), miss = c('s18b:miss'), worry = c('s18b:worry'), pick = c('s18b:pick'), pen = c('s18b:pen'), next = c('s18b:next')
  const s19 = c('s19'), need = c('s19:need'), more = c('s19:more'), enough19 = c('s19:enough')
  const s20 = c('s20'), look = c('s20:look'), already = c('s20:already'), there = c('s20:there')

  const A = win(f, 0, include + 2), B = win(f, include, s18 + 2), Cc = win(f, s18, s19 + 2), D = on(f, s19, 8)
  const notes = 5 + on(f, sister, 6) + on(f, water, 6) + on(f, body, 6) + on(f, friend, 6) + on(f, ordinary, 6) + on(f, look, 6)
  const hero: Beat[] = [[0, 'idle', 'smiling'], [tryit, 'pointUp', 'smiling'], [write, 'type', 'smiling'], [specific, 'countOne', 'thinking'], [family, 'shrug', 'neutral'], [sister, 'phone', 'smiling'], [include, 'explain', 'smiling'], [water, 'reachDown', 'smiling'], [body, 'holdChest', 'smiling'], [friend, 'phone', 'smiling'], [ordinary, 'present', 'smiling'], [enough, 'countOne', 'smiling'], [clearly, 'lookFar', 'smiling'], [force, 'crossNoA', 'neutral'], [miss, 'oops', 'neutral'], [pick, 'reachDown', 'smiling'], [next, 'type', 'smiling'], [need, 'shrug', 'smiling'], [enough19, 'relax', 'smiling'], [look, 'lookFar', 'smiling'], [there, 'holdChest', 'smiling']]
  // # the pen: drops on "miss", picked up on "pick"
  const penY = f < miss ? 0 : f < pick ? easeOut(span(f, miss, miss + 12)) : 1 - easeOut(span(f, pick, pick + 12))

  return (
    <g>
      <Kitchen id="enx" notes={Math.min(12, notes)} glow={on(f, enough19, 14)} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, s15, 6) * (1 - on(f, once, 6))}><Tag x={CX} y={460} text="HOW TO TRY IT" s={pop(f, tryit)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, once, 6)}><Tag x={CX} y={460} text={f >= specific ? 'BE SPECIFIC' : f >= grateful ? 'A FEW GRATEFUL THINGS' : 'ONCE A WEEK, WRITE'} s={pop(f, f >= specific ? specific : f >= grateful ? grateful : once)} size={52} fill={GOLD} /></g>
        {/* # "my family" (vague, crossed) vs the specific note */}
        <g opacity={on(f, family, 6) * (1 - on(f, include, 6))} transform="translate(560 700) rotate(-4)"><rect x={-130} y={-60} width={260} height={120} fill="#FFFFFF" stroke={INK} strokeWidth={4} /><text y={16} textAnchor="middle" fill={GREY} style={{ font: '400 50px "Bebas Neue"' }}>MY FAMILY</text><path d="M-120 0 L120 0" stroke="#D2463C" strokeWidth={8} opacity={on(f, sister, 6)} /></g>
        <g opacity={on(f, sister, 6) * (1 - on(f, include, 6))} transform={`translate(620 900) rotate(3) scale(${pop(f, sister)})`}><rect x={-190} y={-80} width={380} height={160} fill="#FFE45C" stroke={INK} strokeWidth={4} /><text y={-10} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"' }}>MY SISTER CALLED</text><text y={44} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"' }} opacity={on(f, check, 6)}>TO CHECK ON ME</text></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, include, 6) * (1 - on(f, s17b, 6))}><Tag x={CX} y={460} text={f >= noticing ? "THINGS YOU'VE STOPPED NOTICING" : 'INCLUDE…'} s={pop(f, f >= noticing ? noticing : include)} size={42} fill={GOLD} /></g>
        {/* # hot water, a body that works, a friend who picks up */}
        <g opacity={on(f, water, 6)} transform={`translate(500 780) scale(${pop(f, water) * 0.8})`}><circle r={100} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d="M-40 -30 L20 -30 L20 0" stroke={GREY} strokeWidth={18} fill="none" /><path d="M20 20 Q24 50 20 70" stroke="#5AA9F0" strokeWidth={10} fill="none" />{[0, 1].map((k) => <path key={k} d={`M${-10 + k * 30} 40 q-10 -20 0 -40`} stroke={GREY} strokeWidth={4} fill="none" opacity={0.7} />)}<text y={150} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"' }}>HOT WATER</text></g>
        <g opacity={on(f, body, 6)} transform={`translate(730 780) scale(${pop(f, body) * 0.8})`}><circle r={100} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d="M0 40 C-60 0 -40 -50 0 -16 C40 -50 60 0 0 40 Z" fill="#E2506A" transform={`scale(${1 + 0.06 * Math.sin(f / 4)})`} /><text y={150} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"' }}>{f >= works ? 'A BODY THAT WORKS' : 'A BODY…'}</text></g>
        <g opacity={on(f, friend, 6)} transform={`translate(620 1040) scale(${pop(f, friend) * 0.8})`}><circle r={100} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><rect x={-30} y={-54} width={60} height={108} rx={10} fill={INK} transform={`rotate(${Math.sin(f * 2) * 6 * on(f, phone, 4)})`} /><text y={150} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"' }}>{f >= phone ? 'A FRIEND WHO PICKS UP' : 'A FRIEND…'}</text></g>
        <g opacity={on(f, s17b, 6)}><Tag x={CX} y={460} text={f >= list ? 'IT BELONGS ON THE LIST' : f >= probably ? 'THE MORE IT BELONGS…' : f >= ordinary ? 'THE MORE ORDINARY…' : '…'} s={pop(f, f >= list ? list : f >= probably ? probably : f >= ordinary ? ordinary : s17b)} size={48} fill={GOLD} /></g>
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        {/* # once a week: a week strip with one day ticked */}
        <g opacity={1 - on(f, s18b, 8)} transform="translate(440 700)">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, k) => <g key={k} transform={`translate(${k * 72} 0)`}><rect x={-30} y={-36} width={60} height={72} rx={10} fill={k === 6 ? GOLD : '#FFFFFF'} stroke={INK} strokeWidth={4} /><text y={14} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>{d}</text></g>)}</g>
        {/* # the forced smile, crossed */}
        <g opacity={on(f, force, 6) * (1 - on(f, s18b, 8))} transform={`translate(700 940) scale(${pop(f, force) * 0.8})`}><circle r={90} fill={GOLD} stroke={INK} strokeWidth={6} /><path d="M-50 20 Q0 80 50 20" stroke={INK} strokeWidth={8} fill="none" /><circle cx={-30} cy={-20} r={10} fill={INK} /><circle cx={30} cy={-20} r={10} fill={INK} /><path d="M-110 -110 L110 110" stroke="#D2463C" strokeWidth={14} strokeLinecap="round" opacity={on(f, smile, 6)} /></g>
        <g opacity={on(f, s18, 6) * (1 - on(f, s18b, 6))}><Tag x={CX} y={460} text={f >= force ? 'NOT A FORCED SMILE' : f >= see ? 'TO SEE CLEARLY' : 'ONCE A WEEK IS ENOUGH'} s={pop(f, f >= force ? force : f >= see ? see : enough)} size={50} fill={f >= force ? CREAM : GOLD} /></g>
        <g opacity={on(f, clearly, 6) * (1 - on(f, force, 6))}><circle cx={700} cy={940} r={70} fill="none" stroke={INK} strokeWidth={10} /></g>
        {/* # the pen drops and gets picked up again */}
        <g opacity={on(f, s18b, 6)} transform={`translate(720 ${lerp(820, GROUND - 20, penY)}) rotate(${lerp(-30, 80, penY)})`}><rect x={-14} y={-120} width={28} height={120} rx={6} fill={TANG} stroke={INK} strokeWidth={4} /><path d="M-14 0 L14 0 L0 26 Z" fill={INK} /></g>
        <g opacity={on(f, s18b, 6)}><Tag x={CX} y={460} text={f >= next ? 'NEXT TIME' : f >= pen ? 'PICK UP THE PEN' : f >= worry ? "DON'T WORRY" : f >= miss ? 'MISSED A WEEK?' : '…'} s={pop(f, f >= next ? next : f >= pen ? pen : f >= worry ? worry : f >= miss ? miss : s18b)} size={52} fill={GOLD} /></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, more, 6) * (1 - on(f, enough19, 8))} transform="translate(640 700)"><rect x={-110} y={-50} width={220} height={100} rx={14} fill={GREY} stroke={INK} strokeWidth={6} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>MORE?</text><path d="M-130 -70 L130 70" stroke="#D2463C" strokeWidth={12} strokeLinecap="round" opacity={on(f, need, 6)} /></g>
        <Tag x={CX} y={460} text={f >= there ? "WHAT'S ALREADY THERE" : f >= already ? 'ALREADY…' : f >= look ? 'LOOK AGAIN' : f >= enough19 ? 'ENOUGH' : "YOU DON'T ALWAYS NEED MORE"} s={pop(f, f >= there ? there : f >= already ? already : f >= look ? look : f >= enough19 ? enough19 : s19)} size={f >= enough19 && f < look ? 90 : 48} fill={GOLD} />
        {f >= look && [[800, 520], [980, 600], [860, 840]].map(([x, y], k) => <Sparkle key={k} x={x} y={y} s={on(f, look + k * 4, 6) * 0.8} f={f} k={k} />)}
      </g>}
      <Person f={f} who="hero" beats={hero} x={260} s={0.84} />
      <Headline text={f < include ? 'TRY IT' : f < s18 ? 'THE ORDINARY' : f < s19 ? 'KEEP IT LIGHT' : 'ENOUGH'} o={f < include ? on(f, s15, 8) * (1 - on(f, include - 4, 4)) : f < s18 ? on(f, include, 8) * (1 - on(f, s18 - 4, 4)) : f < s19 ? on(f, s18, 8) * (1 - on(f, s19 - 4, 4)) : on(f, s19, 8)} color={INK} />
      <Vig id="enx" />
    </g>
  )
}

export const EN_HOOK = makePiece('en-hook', 'Enough: the special thing becomes normal', {
  beats: ['s1', 's1:wanted', 's1:badly', 's1:stop', 's1:special', 's1:weeks', 's2', 's2:phone', 's2:job', 's2:place', 's2:excited', 's2:now', 's2:normal', 's3', 's3:start', 's3:next', 's3b', 's3b:life', 's3b:better', 's3b:feeling', 's3b:never', 's3b:last'],
  sfx: [['s1:wanted', 'chime'], ['s2:phone', 'softpop'], ['s2:job', 'softpop'], ['s2:place', 'softpop'], ['s2:normal', 'swish'], ['s3b:last', 'whoosh']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const EN_TREAD = makePiece('en-tread', 'Enough: hedonic adaptation, lottery winners, the treadmill', {
  beats: ['s4', 's4:hedonic', 's4:adaptation', 's4:used', 's4:good', 's4:fast', 's5', 's5:famous', 's5:researchers', 's5:lottery', 's5:winners', 's5:happy', 's6', 's6:compared', 's6:won', 's6:happier', 's6:enjoyed', 's6:everyday', 's6:less', 's6:chat', 's6:friend', 's7', 's7:win', 's7:normal', 's7:small', 's7:joys', 's7:quieter', 's7b', 's7b:contrast', 's7b:huge', 's7b:high', 's7b:ordinary', 's7b:tuesday', 's7b:compete', 's8', 's8:treadmill', 's8:running', 's8:more', 's8:stay', 's8:place'],
  sfx: [['s4:adaptation', 'ding'], ['s5:winners', 'cash'], ['s6:happier', 'thud'], ['s7b:high', 'riser'], ['s8:treadmill', 'click']],
  Component: Tread, mood: 'light', canvas: 'tall',
})
export const EN_STUDY = makePiece('en-study', 'Enough: Emmons & McCullough gratitude study', {
  beats: ['s9', 's9:slows', 's9:down', 's10', 's10:psychologists', 's10:emmons', 's10:mccullough', 's10:simple', 's11', 's11:once', 's11:week', 's11:asked', 's11:write', 's11:five', 's11:grateful', 's12', 's12:another', 's12:hassles', 's12:third', 's12:events', 's12:week', 's13', 's13:10', 's13:gratitude', 's13:better', 's13:lives', 's13:whole', 's13:hopeful', 's13:ahead', 's14', 's14:pushes', 's14:adaptation', 's14:notice', 's14:seeing', 's14b', 's14b:things', 's14b:disappear', 's14b:used', 's14b:attention', 's14b:does'],
  sfx: [['s9:slows', 'click'], ['s10:emmons', 'ding'], ['s11:grateful', 'softpop'], ['s13:10', 'tick'], ['s13:better', 'riser'], ['s14:notice', 'chime']],
  Component: Study, mood: 'light', canvas: 'tall',
})
export const EN_TRY = makePiece('en-try', 'Enough: write specific, ordinary things once a week', {
  beats: ['s15', 's15:try', 's16', 's16:once', 's16:write', 's16:grateful', 's16:specific', 's16:family', 's16:sister', 's16:check', 's17', 's17:include', 's17:noticing', 's17:water', 's17:body', 's17:works', 's17:friend', 's17:phone', 's17b', 's17b:ordinary', 's17b:probably', 's17b:list', 's18', 's18:enough', 's18:see', 's18:clearly', 's18:force', 's18:smile', 's18b', 's18b:miss', 's18b:worry', 's18b:pick', 's18b:pen', 's18b:next', 's19', 's19:need', 's19:more', 's19:enough', 's20', 's20:look', 's20:already', 's20:there'],
  sfx: [['s16:sister', 'softpop'], ['s17:water', 'softpop'], ['s17:body', 'softpop'], ['s17:friend', 'softpop'], ['s18b:miss', 'thud'], ['s18b:pick', 'swish'], ['s19:enough', 'chime']],
  Component: Try, mood: 'light', canvas: 'tall',
})
