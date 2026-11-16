// ============================================================
// FRAUD — the Short "Why You Feel Like a Fraud" (LW batch 2,
// 2026-11-16). Own art direction: a warm little THEATRE STAGE in
// daylight colours — coral curtains, a honey wooden stage, a cream
// back wall and one soft spotlight. The impostor feeling is a MASK
// he thinks he's wearing; the way out is a long paper RECEIPT of
// everything he actually did.
// Tall canvas 1080 × 1920; action between y 420 and GROUND 1240.
// ============================================================
// HOOK  s1–s3)  a gold star lands in his hands; a thought cloud: THEY'LL FIND OUT; a new-job badge, a promotion
//    arrow, a graduation cap; CONGRATS! confetti; he smiles, the cloud says MISTAKE?; the seats fill: BIG COMPANY.
// NAME  s4–s7)  CLANCE & IMES card → THE IMPOSTOR PHENOMENON; a diploma, a medal, a briefcase; a mask floats
//    over his face: FOOLED EVERYONE; ON PAPER: SUCCESSFUL vs IN THEIR HEADS: LUCKY; pairs appear (men · women,
//    students · doctors, beginners · experts); 62 STUDIES and a range bar 9% … 82%.
// TRAP  s8–s12b) a two-door trap: FAIL → "PROOF"; SUCCEED → explained away (LUCK dice · TIMING clock · BEING NICE
//    heart); the scoreboard: FEELING WINS, EVIDENCE: NOT COUNTED; overwork (laptop at night), overprepare (a pile
//    of notes), don't try (a closed door); success → the credit arrow points at OVERWORKING, not at him.
// OUT   s13–s21) an EXIT sign; 1 NAME IT: FEELING ≠ FACT; 2 the receipt prints HOURS · PRACTICE · PROBLEMS SOLVED;
//    a LUCK bubble meets the list; FACTS > FEELINGS; 3 a friend: ME TOO; the feeling cloud grows in silence and
//    shrinks when shared; the seats full of people you admire with the same cloud; a NEW HERE badge; the
//    pool's deep end; the mask drops: YOU WALKED IN.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Tag, win, on, pop, lerp, span, easeOut, BURG, CREAM, INK, GOLD, CX, GROUND, W, H, type Beat } from '../day3/kit'

const WALL = '#F7EBDD', CORAL = '#F08A6C', CORAL_D = '#D96E52', HONEY = '#E4B47A', HONEY_D = '#CF9C60', SPOT = '#FFF4C8', SEAT = '#C9576A', BLUE = '#4F7CC9'

// # the stage: cream back wall, coral curtains on both sides with a pelmet, honey boards, a soft spotlight
const Stage: React.FC<{ id: string; spot?: number; seats?: number }> = ({ id, spot = 0.6, seats = 0 }) => (
  <g>
    <defs>
      <radialGradient id={`${id}-sp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={SPOT} stopOpacity={0.9} /><stop offset="100%" stopColor={SPOT} stopOpacity={0} /></radialGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.16} /></radialGradient>
    </defs>
    <rect width={W} height={GROUND} fill={WALL} />
    <ellipse cx={CX} cy={GROUND - 260} rx={520} ry={600} fill={`url(#${id}-sp)`} opacity={spot} />
    {/* # curtains */}
    {[-1, 1].map((k) => <g key={k} transform={k < 0 ? '' : `translate(${W} 0) scale(-1 1)`}>
      <path d={`M0 0 L150 0 Q120 400 170 ${GROUND} L0 ${GROUND} Z`} fill={CORAL} />
      {[40, 90, 130].map((x) => <path key={x} d={`M${x} 0 Q${x - 20} 500 ${x + 20} ${GROUND}`} stroke={CORAL_D} strokeWidth={8} fill="none" />)}
    </g>)}
    <path d={`M0 0 L${W} 0 L${W} 120 Q${W * 0.75} 170 ${CX} 120 Q${W * 0.25} 170 0 120 Z`} fill={CORAL_D} />
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={HONEY} />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={0} y={GROUND + k * 80} width={W} height={4} fill={HONEY_D} />)}
    <rect x={0} y={GROUND} width={W} height={16} fill={HONEY_D} />
    {/* # audience seats (front row backs) at the very bottom when `seats` > 0 */}
    {seats > 0 && <g opacity={seats}>{Array.from({ length: 7 }, (_, k) => <rect key={k} x={20 + k * 152} y={H - 160} width={130} height={200} rx={40} fill={SEAT} stroke={INK} strokeWidth={4} />)}</g>}
  </g>
)
const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a thought cloud
const Cloud: React.FC<{ x: number; y: number; s: number; lines: string[]; ink?: string; fill?: string }> = ({ x, y, s, lines, ink = INK, fill = '#FFFFFF' }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-150, 0, 90], [-60, -50, 100], [60, -50, 100], [150, 0, 90], [60, 50, 90], [-60, 50, 90]].map(([cx, cy, r], k) => <circle key={k} cx={cx} cy={cy} r={r} fill={fill} stroke={INK} strokeWidth={5} />)}
    <rect x={-190} y={-60} width={380} height={120} fill={fill} />
    <circle cx={-170} cy={140} r={22} fill={fill} stroke={INK} strokeWidth={4} /><circle cx={-210} cy={190} r={12} fill={fill} stroke={INK} strokeWidth={4} />
    {lines.map((t, k) => <text key={k} y={(k - (lines.length - 1) / 2) * 56 + 18} textAnchor="middle" fill={ink} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>)}
  </g>
)

// # a theatre mask
const Mask: React.FC<{ x: number; y: number; s: number; r?: number }> = ({ x, y, s, r = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-80 -60 Q0 -90 80 -60 Q90 40 0 90 Q-90 40 -80 -60 Z" fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <path d="M-50 -20 Q-30 -36 -14 -20 Q-30 -6 -50 -20 Z M14 -20 Q30 -36 50 -20 Q30 -6 14 -20 Z" fill={INK} />
    <path d="M-30 34 Q0 56 30 34" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M-80 -40 L-120 -50 M80 -40 L120 -50" stroke={BURG} strokeWidth={6} />
  </g>
)

// # a small figure
const Fig: React.FC<{ x: number; y: number; s: number; c?: string; hat?: 'cap' | 'doc' }> = ({ x, y, s, c = BLUE, hat }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-58} r={18} fill={c} /><path d="M-24 0 L-20 -34 Q0 -44 20 -34 L24 0 Z" fill={c} />
    {hat === 'cap' && <path d="M-26 -74 L0 -86 L26 -74 L0 -64 Z" fill={INK} />}
    {hat === 'doc' && <path d="M-12 -30 Q-14 -10 0 -10 Q14 -10 12 -30" stroke="#FFFFFF" strokeWidth={4} fill="none" />}
  </g>
)

const Stamp: React.FC<{ x: number; y: number; text: string; s: number; r?: number; color?: string }> = ({ x, y, text, s, r = -10, color = '#D2463C' }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-text.length * 19 - 30} y={-50} width={text.length * 38 + 60} height={100} rx={12} fill="#FFFFFF" fillOpacity={0.75} stroke={color} strokeWidth={9} />
    <text y={22} textAnchor="middle" fill={color} style={{ font: '400 66px "Bebas Neue"', letterSpacing: 4 }}>{text}</text>
  </g>
)

// # icon helpers for achievements
const Star: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d={Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 40 : 90; return `${k ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}` }).join(' ') + ' Z'} fill={GOLD} stroke={INK} strokeWidth={6} strokeLinejoin="round" /></g>
)
const Icon: React.FC<{ x: number; y: number; s: number; kind: 'badge' | 'arrow' | 'cap' | 'diploma' | 'medal' | 'case'; label?: string }> = ({ x, y, s, kind, label }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={95} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    {kind === 'badge' && <g><rect x={-40} y={-50} width={80} height={100} rx={10} fill={BLUE} stroke={INK} strokeWidth={4} /><circle cy={-12} r={18} fill={CREAM} /><rect x={-24} y={18} width={48} height={10} fill={CREAM} /></g>}
    {kind === 'arrow' && <path d="M-40 40 L-40 0 L-70 0 L0 -60 L70 0 L40 0 L40 40 Z" fill="#3E8A46" stroke={INK} strokeWidth={4} />}
    {kind === 'cap' && <g><path d="M-70 -10 L0 -40 L70 -10 L0 20 Z" fill={INK} /><path d="M-40 4 L-40 34 Q0 54 40 34 L40 4" fill={INK} /><path d="M60 -10 L60 34" stroke={GOLD} strokeWidth={5} /></g>}
    {kind === 'diploma' && <g><rect x={-60} y={-30} width={120} height={60} rx={20} fill={CREAM} stroke={INK} strokeWidth={4} /><rect x={-10} y={-30} width={20} height={60} fill={BURG} /></g>}
    {kind === 'medal' && <g><path d="M-20 -60 L-10 -10 L10 -10 L20 -60" fill={BLUE} /><circle cy={20} r={34} fill={GOLD} stroke={INK} strokeWidth={4} /></g>}
    {kind === 'case' && <g><rect x={-50} y={-24} width={100} height={66} rx={8} fill="#8A5A3C" stroke={INK} strokeWidth={4} /><rect x={-18} y={-40} width={36} height={18} rx={4} fill="none" stroke={INK} strokeWidth={4} /></g>}
    {label && <text y={140} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)

// ---------------------------------------------------------------- HOOK
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const good = c('s1:good'), secretly = c('s1:secretly'), find = c('s1:find'), belong = c('s1:belong')
  const s2 = c('s2'), job = c('s2:job'), promotion = c('s2:promotion'), university = c('s2:university'), congratulating = c('s2:congratulating'), waiting = c('s2:waiting'), caught = c('s2:caught')
  const s2b = c('s2b'), smile = c('s2b:smile'), thank = c('s2b:thank'), inside = c('s2b:inside'), sure = c('s2b:sure'), mistake = c('s2b:mistake')
  const s3 = c('s3'), big = c('s3:big'), company = c('s3:company')

  const hero: Beat[] = [[0, 'idle', 'neutral'], [good, 'holdUp', 'smiling'], [secretly, 'holdUp', 'worried'], [find, 'nervous', 'worried'], [job, 'present', 'smiling'], [promotion, 'pointUp', 'smiling'], [university, 'celebrate', 'smiling'], [congratulating, 'waveA', 'smiling'], [waiting, 'nervous', 'worried'], [smile, 'waveB', 'smiling'], [thank, 'holdChest', 'smiling'], [inside, 'nervous', 'worried'], [mistake, 'scratchHead', 'worried'], [s3, 'idle', 'neutral'], [big, 'present', 'smiling'], [company, 'relief', 'smiling']]
  const A = win(f, 0, s2 + 2), B = win(f, s2, s3 + 2), C = on(f, s3, 8)

  return (
    <g>
      <Stage id="frh" spot={0.4 + 0.5 * on(f, good, 10)} seats={on(f, big, 10)} />
      {A > 0.001 && <g opacity={A}>
        <Star x={470} y={lerp(380, 780, easeOut(span(f, good - 10, good + 8)))} s={on(f, good - 10, 6) * 0.6} />
        <Cloud x={740} y={600} s={pop(f, secretly) * 0.8} lines={f >= belong ? ["I DON'T", 'BELONG HERE'] : f >= find ? ["THEY'LL", 'FIND OUT'] : ['…']} ink={BURG} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Icon x={560} y={620} s={pop(f, job) * 0.85} kind="badge" label="NEW JOB" />
        <Icon x={820} y={620} s={pop(f, promotion) * 0.85} kind="arrow" label="PROMOTION" />
        <Icon x={690} y={900} s={pop(f, university) * 0.85} kind="cap" label="UNIVERSITY" />
        {/* # confetti */}
        {f >= congratulating && f < inside && Array.from({ length: 18 }, (_, k) => { const t = span(f, congratulating + (k % 6), congratulating + 50); return <rect key={k} x={480 + ((k * 73) % 500)} y={420 + t * 600 + (k % 4) * 30} width={18} height={10} fill={[GOLD, CORAL, BLUE, '#3E8A46'][k % 4]} transform={`rotate(${k * 40 + f * 4} ${480 + ((k * 73) % 500)} ${420 + t * 600})`} opacity={1 - t * 0.6} /> })}
        <g opacity={on(f, congratulating, 6) * (1 - on(f, waiting, 6))}><Tag x={CX} y={480} text="CONGRATULATIONS!" s={pop(f, congratulating)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, waiting, 6) * (1 - on(f, s2b, 6))}><Tag x={CX} y={480} text={f >= caught ? '…TO BE CAUGHT' : 'WAITING…'} s={pop(f, f >= caught ? caught : waiting)} size={56} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, smile, 6) * (1 - on(f, inside, 6))}><Tag x={CX} y={480} text={f >= thank ? '"THANK YOU!"' : 'YOU SMILE…'} s={pop(f, f >= thank ? thank : smile)} size={56} fill={GOLD} /></g>
        <Cloud x={720} y={600} s={pop(f, inside) * 0.8} lines={f >= mistake ? ['A MISTAKE?'] : f >= sure ? ['SURELY…'] : ['INSIDE…']} ink={BURG} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # the house fills: lots of people feel this */}
        {Array.from({ length: 14 }, (_, k) => <Fig key={k} x={60 + (k % 7) * 160} y={H - 150 - Math.floor(k / 7) * 0} s={on(f, big + k, 4) * 1.3} c={k % 2 ? BLUE : '#8A5A9C'} />)}
        <g opacity={on(f, s3, 6)}><Tag x={CX} y={480} text={f >= company ? 'VERY BIG COMPANY' : 'IF THAT’S YOU…'} s={pop(f, f >= company ? company : s3)} size={58} fill={GOLD} /></g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={300} s={0.86} />
      <Headline text={f < s2 ? 'FOUND OUT?' : f < s3 ? 'WAITING TO BE CAUGHT' : 'YOU’RE NOT ALONE'} o={f < s2 ? on(f, secretly, 8) * (1 - on(f, s2 - 4, 4)) : f < s3 ? on(f, s2, 8) * (1 - on(f, s3 - 4, 4)) : on(f, s3, 8)} color={INK} />
      <Vig id="frh" />
    </g>
  )
}

// ---------------------------------------------------------------- NAME
const Name: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), psychologists = c('s4:psychologists'), clance = c('s4:clance'), imes = c('s4:imes'), name = c('s4:name'), impostor = c('s4:impostor')
  const studied = c('s5:studied'), women = c('s5:women'), degrees = c('s5:degrees'), honours = c('s5:honours'), careers = c('s5:careers'), believed = c('s5:believed'), fooled = c('s5:fooled')
  const s5b = c('s5b'), paper = c('s5b:paper'), successful = c('s5b:successful'), heads = c('s5b:heads'), lucky = c('s5b:lucky'), fooling = c('s5b:fooling')
  const s6 = c('s6'), men = c('s6:men'), women6 = c('s6:women'), students = c('s6:students'), doctors = c('s6:doctors'), beginners = c('s6:beginners'), experts = c('s6:experts')
  const s7 = c('s7'), n62 = c('s7:62'), rates = c('s7:rates'), n9 = c('s7:9'), n82 = c('s7:82'), depending = c('s7:depending'), measured = c('s7:measured')

  const A = win(f, 0, c('s5') + 2), B = win(f, c('s5'), s6 + 2), C = win(f, s6, s7 + 2), D = on(f, s7, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [psychologists, 'present', 'thinking'], [name, 'pointUp', 'smiling'], [studied, 'explain', 'neutral'], [degrees, 'hold', 'smiling'], [believed, 'nervous', 'worried'], [fooled, 'shrug', 'worried'], [paper, 'present', 'smiling'], [heads, 'think', 'worried'], [lucky, 'shrug', 'worried'], [s6, 'idle', 'neutral'], [men, 'point', 'neutral'], [students, 'explain', 'neutral'], [experts, 'present', 'thinking'], [n62, 'countA', 'thinking'], [n82, 'shock', 'shocked'], [depending, 'measure', 'thinking']]
  const bar = on(f, n9, 10), bar2 = on(f, n82, 18)

  return (
    <g>
      <Stage id="frn" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, psychologists, 6)} transform={`translate(${CX + 100} 680) scale(${pop(f, psychologists)})`}>
          <rect x={-310} y={-170} width={620} height={340} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text y={-100} textAnchor="middle" fill={CORAL_D} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }}>PSYCHOLOGISTS · 1978</text>
          <text y={-30} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{f >= imes ? 'PAULINE CLANCE' : f >= clance ? 'PAULINE CLANCE' : '…'}</text>
          <text y={30} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, imes, 6)}>& SUZANNE IMES</text>
          <text y={120} textAnchor="middle" fill={BURG} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, impostor, 6)}>THE IMPOSTOR PHENOMENON</text>
        </g>
        <g opacity={on(f, name, 6) * (1 - on(f, impostor, 6))}><Tag x={CX + 100} y={940} text="THEY GAVE IT A NAME" s={pop(f, name)} size={44} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, s5b, 8)}>
          <Icon x={520} y={640} s={pop(f, degrees) * 0.8} kind="diploma" label="DEGREES" />
          <Icon x={760} y={640} s={pop(f, honours) * 0.8} kind="medal" label="HONOURS" />
          <Icon x={640} y={900} s={pop(f, careers) * 0.8} kind="case" label="GREAT CAREERS" />
          <g opacity={on(f, studied, 6)}><Tag x={CX} y={460} text={f >= women ? 'HIGH ACHIEVING WOMEN' : 'THEY STUDIED…'} s={pop(f, f >= women ? women : studied)} size={50} fill={CREAM} /></g>
        </g>
        <Mask x={300} y={lerp(420, 730, easeOut(span(f, believed, fooled + 6)))} s={on(f, believed, 6) * 0.75 * (1 - on(f, s5b, 8))} />
        <Stamp x={700} y={1080} text="FOOLED EVERYONE?" s={pop(f, fooled) * 0.62 * (1 - on(f, s5b, 8))} color={BURG} />
        {/* # on paper vs in their heads */}
        <g opacity={on(f, s5b, 6)}>
          <g opacity={on(f, paper, 6)} transform="translate(600 760) rotate(-4)"><rect x={-150} y={-190} width={300} height={380} rx={8} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={-110} y={-120 + k * 60} width={220} height={14} rx={7} fill="#D9D0C4" />)}
            <text y={160} textAnchor="middle" fill="#3E8A46" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, successful, 6)}>SUCCESSFUL ✓</text></g>
          <Cloud x={860} y={600} s={pop(f, heads) * 0.6} lines={f >= fooling ? ['GOOD AT', 'FOOLING'] : f >= lucky ? ['JUST', 'LUCKY'] : ['…']} ink={BURG} />
          <Tag x={CX} y={460} text={f >= heads ? 'IN THEIR OWN HEADS' : 'ON PAPER'} s={pop(f, f >= heads ? heads : paper)} size={52} fill={f >= heads ? CREAM : GOLD} ink={f >= heads ? BURG : INK} />
        </g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        {[[men, 'MEN', undefined, BLUE], [women6, 'WOMEN', undefined, '#8A5A9C'], [students, 'STUDENTS', 'cap', '#3E8A46'], [doctors, 'DOCTORS', 'doc', '#2E8C86'], [beginners, 'BEGINNERS', undefined, CORAL_D], [experts, 'EXPERTS', undefined, BURG]].map(([at, t, hat, col], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${560 + (k % 2) * 260} ${700 + Math.floor(k / 2) * 190})`}>
          <Fig x={0} y={0} s={pop(f, at as number) * 1.6} c={col as string} hat={hat as 'cap' | 'doc' | undefined} />
          <text y={50} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{t as string}</text>
        </g>)}
        <g opacity={on(f, s6, 6)}><Tag x={CX} y={460} text="FOUND IN EVERYONE" s={pop(f, s6)} size={54} fill={GOLD} /></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <g transform={`translate(780 ${GROUND - 40})`} opacity={on(f, n62, 6)}>{Array.from({ length: Math.floor(lerp(1, 12, on(f, n62, 20))) }, (_, k) => <rect key={k} x={-110 + (k % 2) * 8} y={-k * 26 - 22} width={220} height={22} rx={4} fill={k % 2 ? '#FFFFFF' : '#F4F0E6'} stroke={INK} strokeWidth={3} />)}</g>
        <g opacity={on(f, n62, 6) * (1 - on(f, rates, 6))}><Tag x={780} y={GROUND - 400} text="62 STUDIES" s={pop(f, n62)} size={50} fill={GOLD} /></g>
        <g opacity={on(f, rates, 6)} transform="translate(440 640)">
          <rect x={0} y={-36} width={560} height={72} rx={36} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <rect x={6} y={-30} width={lerp(0, 0.09 * 548, bar) + lerp(0, 0.73 * 548, bar2)} height={60} rx={30} fill={CORAL} />
          <g opacity={on(f, n9, 6)}><text x={50} y={110} textAnchor="middle" fill={INK} style={{ font: '400 60px "Bebas Neue"' }}>9%</text></g>
          <g opacity={on(f, n82, 6)}><text x={460} y={110} textAnchor="middle" fill={BURG} style={{ font: '400 60px "Bebas Neue"' }}>82%</text></g>
        </g>
        <g opacity={on(f, rates, 6)}><Tag x={CX} y={460} text={f >= measured ? 'DEPENDS HOW IT’S MEASURED' : f >= depending ? 'DEPENDING ON…' : 'HOW COMMON?'} s={pop(f, f >= measured ? measured : f >= depending ? depending : rates)} size={44} fill={CREAM} /></g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={260} s={0.84} />
      <Headline text={f < c('s5') ? 'IT HAS A NAME' : f < s6 ? 'FOOLED EVERYONE?' : f < s7 ? 'EVERYONE' : 'HOW COMMON'} o={f < c('s5') ? on(f, psychologists, 8) * (1 - on(f, c('s5') - 4, 4)) : f < s6 ? on(f, studied, 8) * (1 - on(f, s6 - 4, 4)) : f < s7 ? on(f, s6, 8) * (1 - on(f, s7 - 4, 4)) : on(f, s7, 8)} color={INK} />
      <Vig id="frn" />
    </g>
  )
}

// ---------------------------------------------------------------- TRAP
const Trap: React.FC<PieceProps> = ({ f, c }) => {
  const trap = c('s8:trap'), works = c('s8:works')
  const fail = c('s9:fail'), proves = c('s9:proves'), enough = c('s9:enough')
  const succeed = c('s10:succeed'), explain = c('s10:explain'), luck = c('s10:luck'), timing = c('s10:timing'), nice = c('s10:nice')
  const s11 = c('s11'), happens = c('s11:happens'), feeling = c('s11:feeling'), wins = c('s11:wins'), evidence = c('s11:evidence'), counted = c('s11:counted')
  const s12 = c('s12'), avoid = c('s12:avoid'), out = c('s12:out'), overwork = c('s12:overwork'), overprepare = c('s12:overprepare'), dont = c("s12:don't"), all = c('s12:all')
  const s12b = c('s12b'), extra = c('s12b:extra'), success = c('s12b:success'), credit = c('s12b:credit'), overworking = c('s12b:overworking'), you = c('s12b:you')

  const A = win(f, 0, s11 + 2), B = win(f, s11, s12 + 2), C = win(f, s12, s12b + 2), D = on(f, s12b, 8)
  const hero: Beat[] = [[0, 'idle', 'thinking'], [trap, 'present', 'thinking'], [fail, 'oops', 'worried'], [proves, 'despair', 'worried'], [succeed, 'celebrate', 'smiling'], [explain, 'shrug', 'neutral'], [luck, 'shrug', 'smug'], [timing, 'pointUp', 'neutral'], [nice, 'shrug', 'worried'], [happens, 'idle', 'neutral'], [wins, 'slump', 'worried'], [evidence, 'present', 'neutral'], [counted, 'crossNoA', 'worried'], [avoid, 'nervous', 'worried'], [overwork, 'type', 'worried'], [overprepare, 'read', 'worried'], [dont, 'armsCrossed', 'worried'], [success, 'celebrate', 'smiling'], [credit, 'point', 'worried'], [you, 'holdChest', 'worried']]

  return (
    <g>
      <Stage id="frt" spot={0.35} />
      {A > 0.001 && <g opacity={A}>
        {/* # the trap: two doors, both lead back to the same feeling */}
        {[[fail, 'FAIL', '#D2463C', 560], [succeed, 'SUCCEED', '#3E8A46', 840]].map(([at, t, col, x], k) => <g key={k} opacity={on(f, k ? succeed : trap, 6)} transform={`translate(${x} ${GROUND - 60})`}>
          <rect x={-110} y={-420} width={220} height={420} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <rect x={-110} y={-420} width={lerp(220, 60, on(f, at as number, 10))} height={420} rx={10} fill={col as string} stroke={INK} strokeWidth={6} />
          <text y={-450} textAnchor="middle" fill={col as string} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{t as string}</text>
        </g>)}
        <g opacity={on(f, proves, 6) * (1 - on(f, succeed, 6))}><Tag x={560} y={940} text={f >= enough ? '"NOT GOOD ENOUGH"' : '"PROOF"'} s={pop(f, f >= enough ? enough : proves)} size={42} fill={CREAM} ink="#D2463C" /></g>
        {/* # success explained away */}
        <g opacity={on(f, luck, 6)} transform={`translate(800 820) rotate(${on(f, luck, 10) * 20}) scale(${pop(f, luck) * 0.9})`}><rect x={-46} y={-46} width={92} height={92} rx={16} fill="#FFFFFF" stroke={INK} strokeWidth={5} />{[[-20, -20], [20, 20], [0, 0]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={9} fill={INK} />)}</g>
        <g opacity={on(f, timing, 6)} transform={`translate(900 960) scale(${pop(f, timing) * 0.9})`}><circle r={46} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d="M0 0 L0 -30 M0 0 L22 10" stroke={INK} strokeWidth={6} strokeLinecap="round" /></g>
        <g opacity={on(f, nice, 6)} transform={`translate(760 1090) scale(${pop(f, nice) * 0.9})`}><path d="M0 30 C-60 -14 -34 -60 0 -26 C34 -60 60 -14 0 30 Z" fill="#F6B6C8" stroke={INK} strokeWidth={5} /></g>
        <g opacity={on(f, trap, 6)}><Tag x={CX} y={460} text={f >= explain ? 'EXPLAINED AWAY: ' + (f >= nice ? 'BEING NICE' : f >= timing ? 'TIMING' : f >= luck ? 'LUCK' : '…') : f >= fail ? 'WHEN YOU FAIL…' : f >= works ? 'HOW THE TRAP WORKS' : 'THE TRAP'} s={pop(f, f >= nice ? nice : f >= timing ? timing : f >= luck ? luck : f >= explain ? explain : f >= fail ? fail : trap)} size={44} fill={f >= explain ? CREAM : GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # the scoreboard: the feeling always wins */}
        <g transform={`translate(740 720) scale(${pop(f, s11)})`}>
          <rect x={-260} y={-170} width={520} height={340} rx={22} fill={INK} stroke={GOLD} strokeWidth={8} />
          <text x={-120} y={-100} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>FEELING</text>
          <text x={120} y={-100} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>EVIDENCE</text>
          <text x={-120} y={60} textAnchor="middle" fill={GOLD} style={{ font: '400 150px "Bebas Neue"' }} opacity={on(f, feeling, 6)}>{f >= wins ? 'WIN' : '1'}</text>
          <text x={120} y={60} textAnchor="middle" fill="#9AA3AE" style={{ font: '400 150px "Bebas Neue"' }} opacity={on(f, evidence, 6)}>0</text>
        </g>
        <Stamp x={860} y={1000} text="NOT COUNTED" s={pop(f, counted) * 0.75} />
        <g opacity={on(f, happens, 6)}><Tag x={CX} y={460} text={f >= wins ? 'THE FEELING WINS' : 'NO MATTER WHAT HAPPENS'} s={pop(f, f >= wins ? wins : happens)} size={48} fill={CREAM} ink={BURG} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, avoid, 6) * (1 - on(f, overwork, 6))}><Tag x={CX} y={460} text={f >= out ? 'TO AVOID BEING FOUND OUT' : 'TO AVOID…'} s={pop(f, f >= out ? out : avoid)} size={46} fill={CREAM} ink={BURG} /></g>
        {/* # overwork: a laptop with a moon; overprepare: a pile of notes; don't try: a closed door */}
        <g opacity={on(f, overwork, 6)} transform={`translate(560 820) scale(${pop(f, overwork) * 0.9})`}><rect x={-90} y={-70} width={180} height={120} rx={10} fill={INK} /><rect x={-76} y={-58} width={152} height={96} rx={6} fill="#9FD8F0" /><rect x={-110} y={50} width={220} height={20} rx={6} fill="#7E8791" /><circle cx={70} cy={-130} r={30} fill="#FFF6D8" stroke={INK} strokeWidth={4} /><text y={130} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>OVERWORK</text></g>
        <g opacity={on(f, overprepare, 6)} transform={`translate(830 820) scale(${pop(f, overprepare) * 0.9})`}>{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-80 + (k % 2) * 10} y={30 - k * 22} width={160} height={20} rx={3} fill={k % 2 ? '#FFFFFF' : '#F4F0E6'} stroke={INK} strokeWidth={3} />)}<text y={130} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>OVERPREPARE</text></g>
        <g opacity={on(f, dont, 6)} transform={`translate(700 1080) scale(${pop(f, dont) * 0.7})`}><rect x={-80} y={-150} width={160} height={150} rx={6} fill={BURG} stroke={INK} strokeWidth={5} /><circle cx={50} cy={-70} r={8} fill={GOLD} /><text y={60} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>{f >= all ? "DON'T TRY AT ALL" : "DON'T TRY"}</text></g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, extra, 6)} transform="translate(560 760) scale(0.8)"><rect x={-90} y={-70} width={180} height={120} rx={10} fill={INK} /><rect x={-76} y={-58} width={152} height={96} rx={6} fill="#9FD8F0" /><rect x={-110} y={50} width={220} height={20} rx={6} fill="#7E8791" /><text y={130} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>OVERWORKING</text></g>
        <Star x={860} y={720} s={pop(f, success) * 0.8} />
        {/* # the credit arrow: from the star to the laptop, not to him */}
        <g opacity={on(f, credit, 6)}><path d={`M800 760 Q700 640 ${lerp(800, 640, on(f, credit, 14))} 720`} stroke={BURG} strokeWidth={12} fill="none" strokeLinecap="round" /><path d="M660 690 L630 730 L680 736 Z" fill={BURG} /></g>
        <g opacity={on(f, you, 6)}><path d="M400 640 L480 720 M480 640 L400 720" stroke="#D2463C" strokeWidth={14} strokeLinecap="round" transform="translate(-60 0)" /></g>
        <g opacity={on(f, s12b, 6)}><Tag x={CX} y={460} text={f >= you ? 'NOT TO YOU' : f >= overworking ? 'CREDIT → THE OVERWORKING' : f >= success ? 'SUCCESS…' : 'ALL THAT EXTRA WORK'} s={pop(f, f >= you ? you : f >= overworking ? overworking : f >= success ? success : extra)} size={46} fill={f >= you ? CREAM : GOLD} ink={f >= you ? BURG : INK} /></g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={260} s={0.84} />
      <Headline text={f < s11 ? 'THE TRAP' : f < s12 ? 'THE SCORE' : 'THE COVER-UP'} o={f < s11 ? on(f, trap, 8) * (1 - on(f, s11 - 4, 4)) : f < s12 ? on(f, s11, 8) * (1 - on(f, s12 - 4, 4)) : on(f, s12, 8)} color={INK} />
      <Vig id="frt" />
    </g>
  )
}

// ---------------------------------------------------------------- OUT
const Out: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), out = c('s13:out')
  const first = c('s14:first'), give = c('s14:give'), name = c('s14:name'), feeling2 = c('s14:feeling#2'), fact = c('s14:fact'), ability = c('s14:ability')
  const second = c('s15:second'), receipts = c('s15:receipts'), write = c('s15:write'), did = c('s15:did'), hours = c('s15:hours'), practice = c('s15:practice'), problems = c('s15:problems'), solved = c('s15:solved')
  const voice = c('s16:voice'), luck = c('s16:luck'), read = c('s16:read'), list = c('s16:list')
  const facts = c('s16b:facts'), argue = c('s16b:argue'), feelings = c('s16b:feelings'), list2 = c('s16b:list'), facts2 = c('s16b:facts#2')
  const third = c('s17:third'), loud = c('s17:loud'), trust = c('s17:trust'), lot = c('s17:lot'), me = c('s17:me')
  const s18 = c('s18'), grows = c('s18:grows'), silence = c('s18:silence'), shrinks = c('s18:shrinks'), shared = c('s18:shared')
  const s18b = c('s18b'), admire = c('s18b:admire'), sitting = c('s18b:sitting'), room = c('s18b:room'), thing = c('s18b:thing')
  const s19 = c('s19'), beginner = c('s19:beginner'), belong = c('s19:belong'), somewhere = c('s19:somewhere'), newer = c('s19:new')
  const s20 = c('s20'), depth = c('s20:depth'), left = c('s20:left'), shallow = c('s20:shallow')
  const s21 = c('s21'), sneak = c('s21:sneak'), walked = c('s21:walked'), act = c('s21:act')

  const A = win(f, 0, second + 2), B = win(f, second, third + 2), C = win(f, third, s18b + 2), D = win(f, s18b, s19 + 2), E = on(f, s19, 8)
  const hero: Beat[] = [[0, 'idle', 'thinking'], [out, 'lookFar', 'thinking'], [give, 'explain', 'neutral'], [name, 'point', 'smiling'], [fact, 'crossNoA', 'smiling'], [receipts, 'hold', 'smiling'], [write, 'type', 'smiling'], [hours, 'countA', 'smiling'], [practice, 'countB', 'smiling'], [problems, 'thumbsUp', 'smiling'], [luck, 'stop', 'neutral'], [read, 'read', 'smiling'], [facts, 'confident', 'smiling'], [loud, 'talk', 'neutral'], [me, 'relief', 'smiling'], [grows, 'nervous', 'worried'], [shrinks, 'relief', 'smiling'], [admire, 'present', 'smiling'], [beginner, 'shrug', 'smiling'], [somewhere, 'lookFar', 'smiling'], [depth, 'explain', 'neutral'], [shallow, 'point', 'smug'], [sneak, 'crossNoA', 'smiling'], [walked, 'walkA', 'smiling'], [act, 'confident', 'smiling']]
  // # the receipt prints line by line
  const lines = [[write, 'WHAT I ACTUALLY DID'], [hours, 'THE HOURS'], [practice, 'THE PRACTICE'], [problems, 'PROBLEMS SOLVED']] as const
  const cloudS = lerp(0.5, 1.0, on(f, grows, 16)) * lerp(1, 0.4, on(f, shrinks, 16))

  return (
    <g>
      <Stage id="fro" spot={0.5 + 0.4 * on(f, walked, 10)} seats={on(f, admire, 10) * (1 - on(f, s19, 8))} />
      {A > 0.001 && <g opacity={A}>
        {/* # the exit sign */}
        <g opacity={on(f, s13, 6) * (1 - on(f, first, 6))} transform={`translate(760 600) scale(${pop(f, s13)})`}><rect x={-140} y={-60} width={280} height={120} rx={12} fill="#3E8A46" stroke={INK} strokeWidth={6} /><text y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"', letterSpacing: 6 }}>EXIT →</text></g>
        <g opacity={on(f, out, 6) * (1 - on(f, first, 6))}><Tag x={CX} y={460} text="HOW DO YOU GET OUT?" s={pop(f, out)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, first, 6)}><Tag x={CX} y={460} text="1 · NAME IT" s={pop(f, first)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, give, 6)} transform={`translate(760 760) scale(${pop(f, name) * 0.9 + 0.1})`}><rect x={-240} y={-80} width={480} height={160} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} /><text y={20} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>{f >= feeling2 ? 'A FEELING' : 'IMPOSTOR FEELING'}</text></g>
        <g opacity={on(f, fact, 6)}><Tag x={760} y={960} text={f >= ability ? 'NOT A FACT ABOUT YOU' : 'NOT A FACT'} s={pop(f, fact)} size={56} fill={CREAM} ink={BURG} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, second, 6) * (1 - on(f, voice, 6))}><Tag x={CX} y={460} text={f >= receipts ? '2 · KEEP THE RECEIPTS' : '2 ·'} s={pop(f, second)} size={54} fill={GOLD} /></g>
        {/* # the long receipt */}
        <g transform="translate(760 560)" opacity={on(f, receipts, 6)}>
          <rect x={-170} y={0} width={340} height={lerp(80, 520, on(f, write, 20) * 0.4 + on(f, problems, 20) * 0.6)} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <path d={`M-170 ${lerp(80, 520, on(f, write, 20) * 0.4 + on(f, problems, 20) * 0.6)} l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20 l20 -20 l20 20`} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <text y={50} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>RECEIPT</text>
          {lines.map(([at, t], k) => <g key={k} opacity={on(f, at, 6)}><text x={-140} y={130 + k * 90} fill={k ? INK : BURG} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>{k > 0 && <text x={140} y={130 + k * 90} textAnchor="end" fill="#3E8A46" style={{ font: '400 40px "Bebas Neue"' }}>✓</text>}</g>)}
          <g opacity={on(f, solved, 6)}><text x={140} y={130 + 3 * 90} textAnchor="end" fill="#3E8A46" style={{ font: '400 40px "Bebas Neue"' }}>✓✓</text></g>
        </g>
        <g opacity={on(f, did, 6) * (1 - on(f, voice, 6))}><Tag x={760} y={1140} text="HOW YOU GOT HERE" s={pop(f, did)} size={38} fill={CREAM} /></g>
        {/* # the voice says luck; read the list */}
        <g opacity={on(f, voice, 6) * (1 - on(f, read, 8))}><g transform={`translate(${CX} 460) scale(${pop(f, luck)})`}><rect x={-200} y={-60} width={400} height={120} rx={40} fill="#F6D7D2" stroke={INK} strokeWidth={5} /><text y={22} textAnchor="middle" fill="#D2463C" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 3 }}>"JUST LUCK"</text></g></g>
        <g opacity={on(f, read, 6) * (1 - on(f, facts, 6))}><Tag x={CX} y={460} text={f >= list ? 'READ THE LIST' : 'READ…'} s={pop(f, f >= list ? list : read)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, facts, 6)}><Tag x={CX} y={460} text={f >= facts2 ? 'THE LIST = FACTS' : f >= feelings ? 'FACTS > FEELINGS' : f >= argue ? 'HARD TO ARGUE WITH' : 'FACTS…'} s={pop(f, f >= facts2 ? facts2 : f >= list2 ? list2 : f >= feelings ? feelings : f >= argue ? argue : facts)} size={54} fill={GOLD} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, third, 6) * (1 - on(f, s18, 6))}><Tag x={CX} y={460} text={f >= loud ? '3 · SAY IT OUT LOUD' : '3 ·'} s={pop(f, third)} size={54} fill={GOLD} /></g>
        {/* # a friend he trusts */}
        <g opacity={on(f, trust, 6) * (1 - on(f, s18, 8))}><Person f={f} who="lib-stranger" beats={[[0, 'idle', 'neutral'], [lot, 'talk', 'smiling'], [me, 'holdChest', 'smiling']]} x={800} s={0.82} flip /></g>
        <g opacity={on(f, me, 6) * (1 - on(f, s18, 8))}><g transform="translate(800 560)"><rect x={-150} y={-60} width={300} height={120} rx={40} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d="M20 56 L40 110 L60 56 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} /><text y={24} textAnchor="middle" fill={BURG} style={{ font: '400 70px "Bebas Neue"', letterSpacing: 3 }}>ME TOO.</text></g></g>
        <g opacity={on(f, lot, 6) * (1 - on(f, me, 6))}><Tag x={800} y={560} text="A LOT OF THE TIME…" s={pop(f, lot)} size={40} fill={CREAM} /></g>
        {/* # the feeling cloud: grows in silence, shrinks when shared */}
        <g opacity={on(f, s18, 6)}>
          <Cloud x={760} y={760} s={cloudS * 0.8} lines={f >= shrinks ? ['…'] : ['IMPOSTOR!']} ink={BURG} fill="#E8E1EF" />
          <Tag x={CX} y={460} text={f >= shared ? 'IT SHRINKS WHEN SHARED' : f >= shrinks ? 'IT SHRINKS…' : f >= silence ? 'IT GROWS IN SILENCE' : 'THE FEELING GROWS…'} s={pop(f, f >= shared ? shared : f >= shrinks ? shrinks : f >= silence ? silence : grows)} size={48} fill={f >= shrinks ? GOLD : CREAM} />
        </g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        {/* # the people you admire, in the seats, with the same little cloud */}
        {Array.from({ length: 7 }, (_, k) => <g key={k}><Fig x={85 + k * 152} y={H - 150} s={on(f, admire + k * 2, 5) * 1.4} c={['#8A5A9C', BLUE, '#3E8A46', CORAL_D, '#2E8C86', BURG, BLUE][k]} />
          {k % 2 === 0 && <g opacity={on(f, thing, 6)}><circle cx={85 + k * 152 + 30} cy={H - 300} r={26} fill="#E8E1EF" stroke={INK} strokeWidth={3} /><text x={85 + k * 152 + 30} y={H - 290} textAnchor="middle" fill={BURG} style={{ font: '400 28px "Bebas Neue"' }}>?!</text></g>}</g>)}
        <g opacity={on(f, admire, 6)}><Tag x={CX} y={460} text={f >= thing ? 'FEELING THE SAME THING' : f >= room ? 'IN THE SAME ROOM' : f >= sitting ? 'MAY BE SITTING…' : 'PEOPLE YOU ADMIRE'} s={pop(f, f >= thing ? thing : f >= room ? room : f >= sitting ? sitting : admire)} size={50} fill={GOLD} /></g>
      </g>}
      {E > 0.001 && <g opacity={E}>
        {/* # NEW HERE badge */}
        <g opacity={on(f, beginner, 6) * (1 - on(f, s20, 6))} transform={`translate(780 720) scale(${pop(f, beginner)})`}><circle r={130} fill={GOLD} stroke={INK} strokeWidth={7} /><text y={-10} textAnchor="middle" fill={INK} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 3 }}>{f >= newer ? 'NEW HERE' : 'BEGINNER'}</text><text y={50} textAnchor="middle" fill={BURG} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, somewhere, 6)}>SOMEWHERE NEW</text></g>
        <g opacity={on(f, belong, 6) * (1 - on(f, s20, 6))}><Tag x={CX} y={460} text={f >= somewhere ? 'PROOF YOU’RE GROWING' : 'NOT PROOF YOU DON’T BELONG'} s={pop(f, f >= somewhere ? somewhere : belong)} size={42} fill={CREAM} ink={BURG} /></g>
        {/* # the pool: shallow end vs deep end */}
        <g opacity={on(f, s20, 6) * (1 - on(f, s21, 6))} transform="translate(520 760)">
          <path d="M0 0 L520 0 L520 320 L0 120 Z" fill="#7FC3E8" stroke={INK} strokeWidth={6} />
          <path d="M0 40 Q130 20 260 40 T520 40" stroke="#FFFFFF" strokeWidth={6} fill="none" />
          <text x={80} y={-20} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, shallow, 6)}>SHALLOW END</text>
          <text x={440} y={-20} textAnchor="middle" fill={BURG} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, depth, 6)}>DEEP END</text>
        </g>
        <g opacity={on(f, s20, 6) * (1 - on(f, s21, 6))}><Tag x={CX} y={460} text={f >= left ? 'NEVER LEFT THE SHALLOW END' : 'OUT OF YOUR DEPTH?'} s={pop(f, f >= left ? left : depth)} size={46} fill={GOLD} /></g>
        {/* # the mask drops */}
        <Mask x={260} y={lerp(700, GROUND + 80, easeOut(span(f, sneak, walked + 6)))} s={on(f, s21, 6) * 0.7} r={lerp(0, 60, on(f, walked, 10))} />
        <g opacity={on(f, s21, 6)}><Tag x={CX} y={460} text={f >= act ? 'NOW ACT LIKE IT' : f >= walked ? 'YOU WALKED IN' : 'YOU DIDN’T SNEAK IN'} s={pop(f, f >= act ? act : f >= walked ? walked : sneak)} size={60} fill={f >= walked ? GOLD : CREAM} ink={BURG} /></g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={f >= walked ? lerp(260, 540, easeOut(span(f, walked, act + 10))) : 260} s={0.84} />
      <Headline text={f < second ? 'NAME IT' : f < third ? 'KEEP THE RECEIPTS' : f < s18b ? 'SAY IT' : f < s19 ? 'EVERYONE' : 'YOU BELONG'} o={f < second ? on(f, s13, 8) * (1 - on(f, second - 4, 4)) : f < third ? on(f, second, 8) * (1 - on(f, third - 4, 4)) : f < s18b ? on(f, third, 8) * (1 - on(f, s18b - 4, 4)) : f < s19 ? on(f, s18b, 8) * (1 - on(f, s19 - 4, 4)) : on(f, s19, 8)} color={INK} />
      <Vig id="fro" />
    </g>
  )
}

export const FR_HOOK = makePiece('fr-hook', 'Fraud: they will find out, waiting to be caught', {
  beats: ['s1', 's1:good', 's1:secretly', 's1:find', 's1:belong', 's2', 's2:job', 's2:promotion', 's2:university', 's2:congratulating', 's2:waiting', 's2:caught', 's2b', 's2b:smile', 's2b:thank', 's2b:inside', 's2b:sure', 's2b:mistake', 's3', 's3:big', 's3:company'],
  sfx: [['s1:good', 'ding'], ['s2:job', 'softpop'], ['s2:promotion', 'softpop'], ['s2:university', 'softpop'], ['s2:congratulating', 'flutter'], ['s2b:mistake', 'thud'], ['s3:company', 'chime']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const FR_NAME = makePiece('fr-name', 'Fraud: Clance & Imes, the impostor phenomenon, 9–82%', {
  beats: ['s4', 's4:psychologists', 's4:clance', 's4:imes', 's4:name', 's4:impostor', 's5', 's5:studied', 's5:women', 's5:degrees', 's5:honours', 's5:careers', 's5:believed', 's5:fooled', 's5b', 's5b:paper', 's5b:successful', 's5b:heads', 's5b:lucky', 's5b:fooling', 's6', 's6:men', 's6:women', 's6:students', 's6:doctors', 's6:beginners', 's6:experts', 's7', 's7:62', 's7:rates', 's7:9', 's7:82', 's7:depending', 's7:measured'],
  sfx: [['s4:impostor', 'ding'], ['s5:fooled', 'swish'], ['s6:men', 'softpop'], ['s6:experts', 'softpop'], ['s7:82', 'impact']],
  Component: Name, mood: 'light', canvas: 'tall',
})
export const FR_TRAP = makePiece('fr-trap', 'Fraud: the trap, the feeling always wins', {
  beats: ['s8', 's8:trap', 's8:works', 's9', 's9:fail', 's9:proves', 's9:enough', 's10', 's10:succeed', 's10:explain', 's10:luck', 's10:timing', 's10:nice', 's11', 's11:happens', 's11:feeling', 's11:wins', 's11:evidence', 's11:counted', 's12', 's12:avoid', 's12:out', 's12:overwork', 's12:overprepare', "s12:don't", 's12:all', 's12b', 's12b:extra', 's12b:success', 's12b:credit', 's12b:overworking', 's12b:you'],
  sfx: [['s9:fail', 'thud'], ['s10:luck', 'tick'], ['s11:counted', 'impact'], ['s12:overwork', 'click'], ["s12:don't", 'thud'], ['s12b:credit', 'whoosh']],
  Component: Trap, mood: 'light', canvas: 'tall',
})
export const FR_OUT = makePiece('fr-out', 'Fraud: name it, keep the receipts, say it out loud', {
  beats: ['s13', 's13:out', 's14', 's14:first', 's14:give', 's14:name', 's14:feeling#2', 's14:fact', 's14:ability', 's15', 's15:second', 's15:receipts', 's15:write', 's15:did', 's15:hours', 's15:practice', 's15:problems', 's15:solved', 's16', 's16:voice', 's16:luck', 's16:read', 's16:list', 's16b', 's16b:facts', 's16b:argue', 's16b:feelings', 's16b:list', 's16b:facts#2', 's17', 's17:third', 's17:loud', 's17:trust', 's17:lot', 's17:me', 's18', 's18:grows', 's18:silence', 's18:shrinks', 's18:shared', 's18b', 's18b:admire', 's18b:sitting', 's18b:room', 's18b:thing', 's19', 's19:beginner', 's19:belong', 's19:somewhere', 's19:new', 's20', 's20:depth', 's20:left', 's20:shallow', 's21', 's21:sneak', 's21:walked', 's21:act'],
  sfx: [['s14:fact', 'thud'], ['s15:hours', 'tick'], ['s15:practice', 'tick'], ['s15:problems', 'tick'], ['s16:list', 'ding'], ['s17:me', 'chime'], ['s18:shrinks', 'swish'], ['s21:walked', 'riser']],
  Component: Out, mood: 'light', canvas: 'tall',
})
