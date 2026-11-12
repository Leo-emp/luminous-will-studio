// ---------------------------------------------------------------- s53–s66: step four — how the drops add up.
// A) streams of question bubbles from everywhere land in the same three buildings; a big tank fills
//    (≈ 212,000 GALLONS A DAY); a crowd of little people (≈ 2,600 people's home water).
// B) a data center with four signs popping on (email, photos, streaming, search); two tanks 2014 → 2023 (×3,
//    17 billion gallons); a big crowd (≈ 580,000 people every day); a row of 12 tanks for the power plants (×12);
//    a 2028 tank rising to almost twice.
// C) eight even cups turn uneven (two overflow); one building at a never-closing tap; rainy town vs dry town (homes
//    and a farm); a ring 72 / 14 / 14; "whose water?" over a house tap; a chip with a question mark.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { A, BB, Chip, DataCenter, Drop, G, House, PowerPlant, Tag, Vapor, Vig, World, win , bump, around } from './kit'

const LOOKS = ['buyer', 'worker', 'owner', 'investorF', 'investor', 'zoe', 'max']
const Tank: React.FC<{ x: number; y: number; w: number; h: number; fill: number; col?: string; o?: number; label?: string }> = ({ x, y, w, h, fill, col = A.water, o = 1, label }) => o > 0.001 ? (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={14} fill="#E6F4FA" stroke={A.steelD} strokeWidth={5} />
    <rect x={-w / 2 + 6} y={-h * fill + 6} width={w - 12} height={Math.max(0, h * fill - 12)} rx={10} fill={col} opacity={0.85} />
    {label && <text y={46} textAnchor="middle" fill={A.ink} style={BB(36)}>{label}</text>}
  </g>) : null

const Scale: React.FC<PieceProps> = ({ f, c }) => {
  const problem53 = c('s53:problem'), billions53 = c('s53:billions'), landing53 = c('s53:landing'), few53 = c('s53:few')
  const s54 = c('s54'), b25 = c('s54:25'), fifteenth54 = c('s54:fifteenth'), g212 = c('s54:212000'), centers54 = c('s54:centers')
  const s55 = c('s55'), p2600 = c('s55:2600'), home55 = c('s55:home'), chatbot55 = c("s55:chatbot's")
  const s56 = c('s56'), part56 = c('s56:part'), email56 = c('s56:email'), photos56 = c('s56:photos'), streaming56 = c('s56:streaming'), searches56 = c('s56:searches')
  const s57 = c('s57'), y2023 = c('s57:2023'), b17 = c('s57:17'), three57 = c('s57:three'), y2014 = c('s57:2014')
  const s58 = c('s58'), p580 = c('s58:580000'), single58 = c('s58:single')
  const berkeley59 = c('s59:berkeley'), part59 = c('s59:part'), s59 = c('s59'), plants59 = c('s59:plants'), x12 = c('s59:12')
  const biggest60 = c('s60:biggest'), alone60 = c('s60:alone'), every60 = c('s60:every'), y2023b = c('s60:2023'), s60 = c('s60'), growing60 = c('s60:growing'), y2028 = c('s60:2028'), twice60 = c('s60:twice')
  const s61 = c('s61'), national61 = c('s61:national'), hides61 = c('s61:hides'), spread61 = c('s61:spread'), evenly61 = c('s61:evenly'), one53 = c('s53:one'), question53 = c('s53:question')
  const s62 = c('s62'), local62 = c('s62:local'), household62 = c('s62:household'), tap62 = c('s62:tap')
  const plenty63 = c('s63:plenty'), matter63 = c('s63:matter'), s63 = c('s63'), rainy63 = c('s63:rainy'), dry63 = c('s63:dry'), drought63 = c('s63:drought'), homes63 = c('s63:homes'), farms63 = c('s63:farms')
  const s64 = c('s64'), p72 = c('s64:72'), low64 = c('s64:low'), p14 = c('s64:14'), high64 = c('s64:high')
  const s65 = c('s65'), question65 = c('s65:question'), drops65 = c('s65:drops'), answer65 = c('s65:answer'), whose65 = c('s65:whose')
  const s66 = c('s66'), cool66 = c('s66:cool'), without66 = c('s66:without')

  const Aw = win(f, 0, s56, 10), Bw = win(f, s56 - 6, s61, 10), Cw = on(f, s61 - 6, 10)
  const ring = (p: number, from: number, col: string, k: number) => <circle key={k} r={230} fill="none" stroke={col} strokeWidth={70} strokeDasharray={`${2 * Math.PI * 230 * p} 9999`} strokeDashoffset={-2 * Math.PI * 230 * from} transform="rotate(-90)" />

  return (
    <g>
      <World id="aq-scale" f={f} mood={Cw > 0.5 ? 'day' : 'cool'} />
      {/* # A) billions into a few buildings */}
      {Aw > 0.001 && <g opacity={Aw}>
        {[0, 1, 2].map((k) => <DataCenter key={k} x={1180 + k * 0} y={G - 0} s={0.55} f={f} vapor={on(f, landing53, 10)} o={k === 0 ? on(f, few53 - 6, 10) * (1 - on(f, g212 - 6, 10)) : 0} />)}
        <g opacity={on(f, few53 - 6, 10) * (1 - on(f, g212 - 6, 10))}><DataCenter x={1600} y={G - 120} s={0.45 * bump(f, c('s54:questions'), c('s54:day'))} f={f} vapor={1} /><DataCenter x={1700} y={G} s={0.5} f={f} vapor={1} /></g>
        {f > billions53 && Array.from({ length: 30 }, (_, k) => { const t = ((f - billions53) * 0.014 + k / 30) % 1; const sx = 80 + (k % 6) * 110, sy = 260 + Math.floor(k / 6) * 110
          return <g key={k} opacity={on(f, billions53 + k, 4) * (1 - on(f, g212 - 6, 8))} transform={`translate(${lerp(sx, 1380, t)} ${lerp(sy, G - 180, t)}) scale(${0.9 - 0.5 * t})`}><rect x={-34} y={-24} width={68} height={48} rx={16} fill={A.paper} stroke={A.water} strokeWidth={4} /><text y={12} textAnchor="middle" fill={A.water} style={BB(34)}>?</text></g> })}
        <g opacity={win(f, one53, billions53, 6)} transform={`translate(400 500) scale(${1.6 * pop(f, question53)})`}><rect x={-50} y={-34} width={100} height={68} rx={22} fill={A.paper} stroke={A.water} strokeWidth={5} /><text y={18} textAnchor="middle" fill={A.water} style={BB(52)}>?</text></g>
        <Tag x={1400} y={300} t="THE SAME FEW BUILDINGS" size={46} o={win(f, few53, s54, 8)} />
        <Tag x={700} y={260} t="CHATGPT: ≈ 2.5 BILLION A DAY" size={48} bg={A.water} fg={A.paper} o={win(f, b25, g212, 8)} />
        <Tag x={700} y={360} t="× 1/15 TEASPOON EACH" size={42} o={win(f, fifteenth54, g212, 8)} />
        <Tank x={560} y={G - 40} w={420} h={520 * bump(f, c('s54:every'), c('s54:centers'))} fill={on(f, g212, 40)} o={win(f, g212 - 6, s55 + 20, 10)} />
        <Tag x={560} y={290} t="≈ 212,000 GALLONS A DAY" size={50} bg={A.water} fg={A.paper} o={win(f, g212, s56, 8)} />
        <Tag x={560} y={380} t="JUST AT THE DATA CENTERS" size={36} o={win(f, centers54, s55, 8)} />
        <g opacity={win(f, s55, s56, 8)}>{Array.from({ length: 26 }, (_, k) => <Mini key={k} look={LOOKS[k % 7]} x={980 + (k % 9) * 100} y={G - 300 + Math.floor(k / 9) * 150} scale={0.42} frame={f} seed={k + 3} mood="happy" />).filter((_, k) => f >= s55 + k)}
          <Tag x={1380} y={G + 70} t="EACH = 100 PEOPLE" size={32} o={on(f, p2600, 8)} />
          <g opacity={on(f, home55, 8)}><House x={1820} y={G - 130} s={0.6} /></g>
          <g opacity={on(f, chatbot55, 8)} transform={`translate(560 600) scale(${pop(f, chatbot55)})`}><rect x={-60} y={-110} width={120} height={220} rx={20} fill="#1F2B36" /><rect x={-50} y={-96} width={100} height={190} rx={10} fill="#F5FAFC" /><rect x={-10} y={-84} width={52} height={24} rx={10} fill={A.water} /></g>
          <Tag x={1380} y={300} t="≈ 2,600 PEOPLE'S HOME WATER" size={46} bg={A.green} fg={A.paper} o={on(f, p2600, 8)} /></g>
      </g>}
      {/* # B) all data centers */}
      {Bw > 0.001 && <g opacity={Bw}>
        <g opacity={win(f, s56, s57, 8)}>
          <DataCenter x={960} y={G} s={1.1 * bump(f, c('s56:centers'), c('s56:run'))} f={f} vapor={1} />
          <Tag x={960} y={300} t="AI IS ONLY PART OF IT" size={46} o={on(f, part56, 8)} />
          {[[email56, 'EMAIL'], [photos56, 'PHOTOS'], [streaming56, 'STREAMING'], [searches56, 'SEARCH']].map(([a, t], k) => <g key={k} transform={`translate(${420 + k * 360} 430) scale(${pop(f, a as number)})`} opacity={on(f, a as number, 6)}>
            <circle r={70} fill={A.paper} stroke={A.water} strokeWidth={6} />
            {k === 0 && <g><rect x={-38} y={-26} width={76} height={52} rx={6} fill="none" stroke={A.waterD} strokeWidth={6} /><path d="M-38 -26 L0 6 L38 -26" fill="none" stroke={A.waterD} strokeWidth={6} /></g>}
            {k === 1 && <g><rect x={-38} y={-28} width={76} height={56} rx={6} fill="none" stroke={A.waterD} strokeWidth={6} /><path d="M-30 20 L-6 -6 L10 10 L20 0 L32 20 Z" fill={A.waterD} /></g>}
            {k === 2 && <path d="M-20 -30 L30 0 L-20 30 Z" fill={A.waterD} />}
            {k === 3 && <g><circle cx={-8} cy={-8} r={24} fill="none" stroke={A.waterD} strokeWidth={7} /><line x1={10} y1={10} x2={32} y2={32} stroke={A.waterD} strokeWidth={9} strokeLinecap="round" /></g>}
            <text y={112} textAnchor="middle" fill={A.ink} style={BB(34)}>{t as string}</text></g>)}
        </g>
        <g opacity={win(f, s57, s58, 8)}>
          <Tank x={700} y={G - 40} w={200} h={520 / 3 * on(f, y2014, 12) + 0.001} fill={1} label="2014" o={on(f, y2014, 6)} />
          <Tank x={1100} y={G - 40} w={200 * bump(f, c('s57:american'), c('s57:site'))} h={520 * on(f, y2023, 30) + 0.001} fill={1} label="2023" />
          <Tag x={900} y={260} t="ALL US DATA CENTERS: ≈ 17 BILLION GALLONS" size={46} bg={A.water} fg={A.paper} o={on(f, b17, 8)} />
          <Tag x={1450} y={G - 300} t="≈ 3×" size={48} bg={A.gold} o={on(f, three57, 8)} />
        </g>
        <g opacity={win(f, s58, s59, 8)}>
          {Array.from({ length: 84 }, (_, k) => <Mini key={k} look={LOOKS[k % 7]} x={260 + (k % 14) * 110} y={G - 420 + Math.floor(k / 14) * 80} scale={0.3} frame={f} seed={k + 11} mood="happy" />).filter((_, k) => f >= s58 + k * 0.4)}
          <Tag x={960} y={270} t="≈ 580,000 PEOPLE'S HOME WATER" size={50} bg={A.green} fg={A.paper} o={on(f, p580, 8)} />
          <Tag x={960} y={G + 70} t="EVERY SINGLE DAY" size={40} o={on(f, single58, 8)} />
        </g>
        <g opacity={win(f, s59, s60, 8)}>
          <Tank x={260} y={G - 60} w={120} h={180} fill={1} label="ON SITE" />
          <PowerPlant x={760} y={G - 420} s={0.45} f={f} steam={1} o={on(f, plants59, 8)} />
          {Array.from({ length: 12 }, (_, k) => <Tank key={k} x={520 + k * 115} y={G - 60} w={100} h={180} fill={on(f, x12 + k * 2, 8)} col={A.aqua} o={on(f, x12 + k * 2, 6)} />)}
          <g opacity={win(f, berkeley59, x12, 8)} transform={`translate(1300 420) scale(${pop(f, berkeley59)})`}><rect x={-170} y={-60} width={340} height={120} rx={14} fill={A.paper} stroke={A.ink2} strokeWidth={4} /><text y={14} textAnchor="middle" fill={A.ink} style={BB(40)}>BERKELEY LAB</text></g>
          <g opacity={win(f, part59, x12 + 10, 8)}><rect x={460} y={G - 260} width={1400} height={220} rx={24} fill="none" stroke={A.aqua} strokeWidth={6} strokeDasharray="18 12" /></g>
          <Tag x={1200} y={300} t="POWER PLANTS: ≈ 12× AS MUCH" size={48} bg={A.ink} fg={A.paper} o={on(f, x12, 8)} />
        </g>
        <g opacity={on(f, s60, 8)}>
          <Tank x={760} y={G - 40} w={220} h={300 * on(f, every60, 14) + 0.001} fill={1} label="ALL DATA CENTERS" o={on(f, every60, 6)} />
          <Tag x={760} y={G - 400} t="2023" size={40} o={on(f, y2023b, 8)} />
          <Tank x={1160} y={G - 40} w={220} h={120 + 180 * on(f, y2028, 20) + 260 * on(f, twice60, 30)} fill={1} col={A.heat} label="BIGGEST, 2028" o={on(f, biggest60, 8)} />
          <g opacity={on(f, alone60, 8)}><DataCenter x={1520} y={G} s={0.4 * pop(f, alone60)} f={f} vapor={1} /></g>
          <Tag x={960} y={250} t="UP TO ALMOST 2×" size={52} bg={A.heat} fg={A.paper} o={on(f, twice60, 8)} />
          <Tag x={960} y={250} t="AND GROWING" size={48} o={win(f, growing60, y2028, 8)} />
        </g>
      </g>}
      {/* # C) whose water */}
      {Cw > 0.001 && <g opacity={Cw}>
        <g opacity={win(f, s61, s62, 8)}>
          {Array.from({ length: 8 }, (_, k) => { const big = k === 2 || k === 5; const t = on(f, spread61, 20); return <Tank key={k} x={260 + k * 200} y={G - 60} w={120} h={lerp(200, big ? 480 : 90, t) * on(f, national61 + k * 2, 10) + 0.001} fill={1} col={big ? A.heat : A.water} o={on(f, national61 + k * 2, 6)} /> })}
          <g opacity={win(f, hides61, spread61, 8)} transform="translate(960 380)"><rect x={-220} y={-60} width={440} height={120} rx={20} fill={A.ink} /><text y={20} textAnchor="middle" fill={A.paper} style={BB(56)}>ONE BIG TOTAL</text></g>
          <Tag x={960} y={280} t="NOT SPREAD EVENLY" size={52} o={on(f, evenly61, 8)} />
        </g>
        <g opacity={win(f, s62, s63, 8)}>
          <DataCenter x={1200} y={G} s={1.0} f={f} vapor={1} />
          <g transform="translate(520 360)"><rect x={-60} y={-40} width={300} height={80} rx={20} fill={A.steel} stroke={A.steelD} strokeWidth={6} /><rect x={180} y={20} width={60} height={60} fill={A.steel} /><rect x={-120} y={-70} width={80} height={60} rx={12} fill={A.steelD} />
            {f >= household62 && <rect x={196} y={80} width={28} height={G - 450} fill={A.water} opacity={0.8} />}</g>
          <Tag x={760} y={250} t="ONE LOCAL SUPPLY" size={46} o={on(f, local62, 8)} />
          <Tag x={1200} y={G - 380} t="A TAP THAT NEVER CLOSES" size={42} bg={A.water} fg={A.paper} o={on(f, tap62, 8)} />
        </g>
        <g opacity={win(f, s63, s64, 8)}>
          <rect x={-60} y={180} width={1020} height={G - 180} fill="#CFE3EC" opacity={on(f, rainy63, 8)} />
          <g opacity={on(f, rainy63, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${200 + k * 280} 320)`}><ellipse rx={110} ry={40} fill="#9FB4C2" />{[0, 1, 2, 3].map((j) => <line key={j} x1={-60 + j * 40} y1={50 + ((f * 4 + j * 20) % 60)} x2={-70 + j * 40} y2={80 + ((f * 4 + j * 20) % 60)} stroke={A.water} strokeWidth={5} />)}</g>)}
            <ellipse cx={300} cy={G - 40} rx={120 + 120 * on(f, plenty63, 16)} ry={40} fill={A.water} /><DataCenter x={700} y={G} s={0.5} f={f} vapor={1} o={on(f, matter63, 8)} /><Tag x={450} y={250} t="RAINY: PLENTY" size={44} /></g>
          <rect x={960} y={180} width={1020} height={G - 180} fill="#F6D9AE" opacity={on(f, dry63, 8)} />
          <g opacity={on(f, dry63, 8)}><circle cx={1700} cy={330} r={80} fill="#FFD27A" /><ellipse cx={1250} cy={G - 30} rx={110 * (1 - 0.5 * on(f, drought63, 20))} ry={18} fill={A.water} />
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M${1080 + k * 90} ${G + 30} l30 20 l-10 20`} fill="none" stroke={A.clayD} strokeWidth={4} />)}
            <DataCenter x={1500} y={G} s={0.5} f={f} vapor={1} /><Tag x={1450} y={250} t="DRY: A DROUGHT" size={44} bg={A.heat} fg={A.paper} o={on(f, drought63, 8)} />
            <House x={1150} y={G} s={0.7} o={on(f, homes63, 8)} />
            <g opacity={on(f, farms63, 8)} transform={`translate(1820 ${G})`}><rect x={-70} y={-120} width={140} height={120} fill={A.red} /><path d="M-86 -116 L0 -190 L86 -116 Z" fill="#8E2F28" /><rect x={-24} y={-70} width={48} height={70} fill="#F2E6D0" /></g></g>
        </g>
        <g opacity={win(f, s64, s65, 8)} transform={`translate(760 590) scale(${bump(f, c('s64:fresh'))})`}>
          {ring(0.72 * on(f, p72, 20), 0, A.green, 0)}{ring(0.14 * on(f, p14, 12), 0.72, A.gold, 1)}{ring(0.14 * on(f, high64, 12), 0.86, A.red, 2)}
          <text y={20} textAnchor="middle" fill={A.ink} style={BB(60)}>GOOGLE 2024</text>
          <Tag x={760} y={-140} t="72% LOW RISK OF RUNNING SHORT" size={42} bg={A.green} fg={A.paper} o={on(f, low64, 8)} />
          <Tag x={760} y={-30} t="14% MEDIUM" size={42} bg={A.gold} o={on(f, p14, 8)} />
          <Tag x={760} y={80} t="14% HIGH RISK" size={42} bg={A.red} fg={A.paper} o={on(f, high64, 8)} />
        </g>
        <g opacity={win(f, s65, s66, 8)}>
          <g opacity={on(f, question65 - 4, 8)}><House x={760} y={G} s={1.4} c="#F4C9A0" /></g><DataCenter x={1400} y={G} s={0.7} f={f} vapor={1} o={on(f, answer65, 8)} />
          {f >= drops65 && [0, 1, 2, 3].map((k) => { const t = ((f - drops65) * 0.02 + k / 4) % 1; return <Drop key={k} x={lerp(760, 1400, t)} y={G - 300 - 120 * Math.sin(Math.PI * t)} s={0.8 * on(f, drops65 + k * 3, 6)} /> })}
          <Tag x={1080} y={300} t="WHOSE WATER?" size={64} bg={A.water} fg={A.paper} o={on(f, whose65, 8)} />
        </g>
        <g opacity={on(f, s66, 8)}>
          <Chip x={960} y={560} s={bump(f, c('s66:step'), c('s66:drinking'))} f={f} heat={on(f, cool66, 10)} />
          <g transform={`translate(1300 380) scale(${pop(f, without66)})`} opacity={on(f, without66, 6)}><circle r={90} fill={A.paper} stroke={A.water} strokeWidth={8} /><text y={40} textAnchor="middle" fill={A.water} style={BB(120)}>?</text></g>
          <Tag x={960} y={850} t="COOL IT WITHOUT DRINKING WATER?" size={44} o={on(f, without66, 8)} />
        </g>
      </g>}
      <Vig id="aq-scale" />
      <Headline f={f} lines={[[c('s53'), 'STEP 4: HOW IT ADDS UP', A.ink, 96], [s56, 'ALL DATA CENTERS', A.ink, 96], [s59, 'PLUS THE POWER PLANTS', A.ink, 94], [s60, 'AND IT IS GROWING', A.ink, 96], [s61, 'WHAT THE TOTAL HIDES', A.ink, 96], [s64, 'WHERE GOOGLE DRAWS IT', A.ink, 94], [s66, 'THE LAST STEP', A.ink, 96]]} />
    </g>
  )
}

export const AQ_SCALE = makePiece('aq-scale', "Step 4, how the drops add up: streams of question bubbles from everywhere land in the same few white data centers (ChatGPT ≈ 2.5 billion a day × 1/15 teaspoon); a big tank fills (≈ 212,000 gallons a day); a crowd of little people (each = 100, ≈ 2,600 people's home water); one data center with four round signs popping on: email, photos, streaming, search (AI is only part of it); two tanks 2014 and 2023, three times taller (≈ 17 billion gallons); a big crowd (≈ 580,000 people every day); a small on-site tank beside a power plant and twelve tanks (≈ 12× as much); a 2028 tank rising to almost twice; eight even tanks turn uneven; a giant tap that never closes into one building; split rainy town (rain clouds, a full lake) vs dry town in a drought (a shrinking pond, cracked ground, homes and a red farm barn); a ring 72% green / 14% gold / 14% red; drops flowing from a house to a data center (whose water?); a hot chip with a question mark", {
  mood: 'light', Component: Scale,
  beats: ["s53:billions", "s53:landing", "s53:few", "s54", "s54:25", "s54:fifteenth", "s54:212000", "s54:centers", "s55", "s55:2600", "s55:home", "s55:chatbot's", "s56", "s56:part", "s56:email", "s56:photos", "s56:streaming", "s56:searches", "s57", "s57:2023", "s57:17", "s57:three", "s57:2014", "s58", "s58:580000", "s58:single", "s59:berkeley", "s59:part", "s59", "s59:plants", "s59:12", "s60:biggest", "s60:alone", "s60:every", "s60:2023", "s60", "s60:growing", "s60:2028", "s60:twice", "s61", "s61:national", "s61:hides", "s61:spread", "s61:evenly", "s53:one", "s53:question", "s62", "s62:local", "s62:household", "s62:tap", "s63:plenty", "s63:matter", "s63", "s63:rainy", "s63:dry", "s63:drought", "s63:homes", "s63:farms", "s64", "s64:72", "s64:low", "s64:14", "s64:high", "s65", "s65:question", "s65:drops", "s65:answer", "s65:whose", "s66", "s66:cool", "s66:without", "s54:questions", "s54:day", "s54:every", "s56:centers", "s56:run", "s57:american", "s57:site", "s64:fresh", "s66:step", "s66:drinking"],
  sfx: [['s54:212000', 'whoosh', 0.1], ['s57:three', 'ding', 0.1], ['s65:whose', 'pop', 0.12]] })
