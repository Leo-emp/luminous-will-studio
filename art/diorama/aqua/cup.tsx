// ---------------------------------------------------------------- s38–s52: step three — one question.
// A) Lena's kitchen: Lena with her phone at the table; 20 question bubbles fill the wall; one drop falls from the phone
//    into a teaspoon (0.26 mL ≈ 5 drops); ChatGPT's 1/15 teaspoon; 100 drops fill the teaspoon (≈ 1 teaspoon a day).
// B) the hidden part: through the window a power plant with a curved cooling tower steams, a pylon line runs to the
//    data center; a 4.5-liter jug per kilowatt hour; a kWh battery with a tiny glowing slice; a second drop flies from the
//    plant into the spoon; ≈ 1.3 mL ≈ 25 drops; a tablespoon: ≈ 27 mL a day.
// C) her home's water: a tall tank of 310 liters beside the tiny spoon (< 0.01%); a bottle and an email (the viral
//    claim); two electricity bars, one nearly 600 times taller; then the spoon again, and The Dalles worrying.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { A, BB, Bottle, DataCenter, Drop, G, Phone, Pylon, PowerPlant, Spoon, Tag, Vapor, Vig, WaterTower, World, win , bump, around } from './kit'

const Cup: React.FC<PieceProps> = ({ f, c }) => {
  const meet38 = c('s38:meet'), lena38 = c('s38:lena'), asks38 = c('s38:asks'), q20 = c('s38:20'), day38 = c('s38:day')
  const s39 = c('s39'), estimated39 = c('s39:estimated'), ml026 = c('s39:026'), five39 = c('s39:five')
  const s40 = c('s40'), chat40 = c('s40:chatgpt'), fifteenth40 = c('s40:fifteenth'), teaspoon40 = c('s40:teaspoon')
  const s41 = c('s41'), d100 = c('s41:100'), teaspoon41 = c('s41:teaspoon')
  const s42 = c('s42'), center42 = c('s42:center'), hidden42 = c('s42:hidden')
  const s43 = c('s43'), electricity43 = c('s43:electricity'), plants43 = c('s43:plants'), cool43 = c('s43:cool')
  const s44 = c('s44'), berkeley44 = c('s44:berkeley'), american44 = c('s44:american'), sit44 = c('s44:sit'), making44 = c('s44:making'), kwh44 = c('s44:kilowatt'), l45 = c('s44:45'), liters44 = c('s44:liters')
  const kwh45 = c('s45:kilowatt'), power45 = c('s45:power'), adds45 = c('s45:adds'), s45 = c('s45'), wh024 = c('s45:024'), slice45 = c('s45:slice'), more45 = c('s45:more'), plant45 = c('s45:plant')
  const s46 = c('s46'), both46 = c('s46:both'), ml13 = c('s46:13'), d25 = c('s46:25')
  const s47 = c('s47'), ml27 = c('s47:27'), tablespoons47 = c('s47:tablespoons')
  const s48 = c('s48'), home48 = c('s48:home'), g82 = c('s48:82'), l300 = c('s48:300')
  const s49 = c('s49'), hundredth49 = c('s49:hundredth')
  const s50 = c('s50'), email50 = c('s50:email'), bottle50 = c('s50:bottle')
  const water48 = c('s48:water'), home48b = c('s48:home#2'), habit49 = c('s49:habit'), less49 = c('s49:less'), both46b = c('s46:together'), s46q = c('s46:question'), reports51 = c('s51:reports'), typical51 = c('s51:typical'), own49 = c('s49:own'), percent49 = c('s49:percent'), assumed51 = c('s51:assumed'), email51 = c('s51:email'), boss40 = c('s40:boss'), number40 = c('s40:number'), typical39 = c('s39:typical'), gemini39 = c('s39:gemini'), s51 = c('s51'), x600 = c('s51:600'), electricity51 = c('s51:electricity'), google51 = c('s51:google')
  const s52 = c('s52'), tiny52 = c('s52:tiny'), dalles52 = c('s52:dalles'), worry52 = c('s52:worry')

  const Aw = win(f, 0, s42, 10), Bw = win(f, s42 - 6, s48, 10), Cw = on(f, s48 - 6, 10)
  const lena: Beat[] = [[0, 'idle', 'smiling'], [lena38, 'waveA', 'smiling', 'waveB', 14], [asks38, 'phone', 'neutral'], [estimated39, 'phone', 'thinking'], [five39, 'point', 'smiling'], [d100, 'countOne', 'neutral'],
    [hidden42, 'think', 'thinking'], [plants43, 'lookFar', 'neutral'], [both46, 'present', 'neutral'], [tablespoons47, 'holdUp', 'smiling'], [home48, 'explain', 'neutral'], [c('s48:american'), 'point', 'neutral'], [hundredth49, 'shrug', 'smiling'], [bottle50, 'shock', 'shocked'], [x600, 'scratchHead', 'thinking'], [c('s52:person'), 'countOne', 'smiling'], [tiny52, 'relax', 'smiling'], [worry52, 'think', 'worried']]
  const fall1 = span(f, ml026, ml026 + 22)
  const fall2 = span(f, more45, more45 + 30)
  const SP: [number, number] = [930, G - 280]
  const tspFill = on(f, ml026 + 18, 10) * 0.2 + on(f, d100, 30) * 0.8

  return (
    <g>
      <World id="aq-cup" f={f} mood="warm" hills={false} />
      {/* # the kitchen: back wall, a window, the table */}
      <rect x={-60} y={180} width={2040} height={G - 180} fill="#F6E7CF" />
      <rect x={-60} y={G - 70} width={2040} height={70} fill="#E2CBA6" />
      <g transform="translate(1180 230)"><rect x={-20} y={-20} width={700} height={460} rx={14} fill="#B98A5E" /><rect width={660} height={420} rx={8} fill={Bw > 0.5 ? '#BFE4F2' : '#CFEAF4'} />
        <path d={`M0 ${420 - 90} Q160 ${420 - 160} 330 ${420 - 110} T660 ${420 - 120} L660 420 L0 420 Z`} fill="#A9CFA0" />
        <rect x={322} width={16} height={420} fill="#B98A5E" /></g>
      <rect x={560} y={G - 250} width={760} height={30} rx={8} fill="#B98A5E" /><rect x={600} y={G - 220} width={24} height={220} fill="#8C6440" /><rect x={1256} y={G - 220} width={24} height={220} fill="#8C6440" />
      <Person f={f} who="investorF" beats={lena} x={330} y={G + 10} s={1.0} />
      {/* # A) twenty questions, five drops, one teaspoon */}
      {Aw > 0.001 && <g opacity={Aw}>
        <Phone x={640} y={G - 370} s={0.75} r={-8} p={span(f, asks38, asks38 + 30)} o={on(f, asks38 - 4, 8)} />
        <g opacity={win(f, q20, s39, 8) + win(f, d100, s42, 8)}>{Array.from({ length: 20 }, (_, k) => <g key={k} transform={`translate(${1250 + (k % 5) * 110} ${280 + Math.floor(k / 5) * 90}) scale(${pop(f, q20 + k)})`} opacity={on(f, q20 + k, 4)}>
          <rect x={-42} y={-30} width={84} height={56} rx={18} fill={A.paper} stroke={A.water} strokeWidth={4} /><text y={14} textAnchor="middle" fill={A.water} style={BB(38)}>?</text></g>)}</g>
        <Tag x={1520} y={G - 330} t="20 QUESTIONS A DAY" size={46} bg={A.water} fg={A.paper} o={win(f, q20, s39, 8)} />
        <Tag x={1520} y={G - 330} t="20 × 5 DROPS = 100 DROPS" size={46} bg={A.water} fg={A.paper} o={win(f, d100, s42, 8)} />
        <Spoon x={SP[0]} y={SP[1]} s={1.1} fill={tspFill} o={on(f, s39, 8)} />
        {fall1 > 0 && fall1 < 1 && <Drop x={lerp(660, SP[0], fall1)} y={lerp(G - 480, SP[1] - 30, fall1) - 120 * Math.sin(Math.PI * fall1)} s={0.8} />}
        <g opacity={win(f, typical39, ml026, 8)}><Phone x={1520} y={540} s={0.8 * pop(f, typical39)} p={on(f, gemini39, 20)} q="G" /></g>
        <Tag x={1520} y={420} t="GEMINI: 0.26 mL" size={50} o={win(f, ml026, s40, 8)} />
        <g opacity={win(f, five39, s40, 8)}>{[0, 1, 2, 3, 4].map((k) => <Drop key={k} x={1360 + k * 80} y={560} s={0.9 * pop(f, five39 + k * 3)} o={on(f, five39 + k * 3, 4)} />)}<Tag x={1520} y={680} t="≈ 5 DROPS" size={42} /></g>
        <g opacity={win(f, boss40, fifteenth40, 8)}><Phone x={1520} y={560} s={0.8 * pop(f, boss40)} p={on(f, number40, 20)} q="GPT" /></g>
        <Tag x={1520} y={420} t="CHATGPT: ≈ 1/15 TEASPOON" size={48} o={win(f, fifteenth40, s41, 8)} />
        <g opacity={win(f, teaspoon40, s41, 8)}><Spoon x={1460} y={600} s={0.9} fill={1 / 15 * 4} /></g>
        {f > d100 && f < d100 + 40 && Array.from({ length: 8 }, (_, k) => { const t = ((f - d100) / 20 + k / 8) % 1; return <Drop key={k} x={lerp(1250 + (k % 4) * 150, SP[0], t)} y={lerp(300, SP[1] - 20, t)} s={0.5} /> })}
        <Tag x={SP[0]} y={SP[1] - 130} t="≈ 1 TEASPOON A DAY" size={44} bg={A.green} fg={A.paper} o={on(f, teaspoon41, 8)} />
      </g>}
      {/* # B) the hidden part: the power plant */}
      {Bw > 0.001 && <g opacity={Bw}>
        <Spoon x={SP[0]} y={SP[1]} s={1.1} big={f >= ml27} fill={f >= ml27 ? on(f, ml27, 20) : 1} />
        <g transform="translate(1180 230)">
          <g opacity={on(f, center42, 10)}><DataCenter x={150} y={350} s={0.32} f={f} vapor={1} /></g>
          <g opacity={on(f, plants43, 10)}><PowerPlant x={500} y={360} s={0.55 * bump(f, power45, c('s43:water'))} f={f} steam={on(f, cool43, 12)} /><Pylon x={300} y={360} s={0.6} />
            <path d="M150 300 Q230 260 300 180 Q390 200 430 270" fill="none" stroke={A.gold} strokeWidth={4 + 60 * (bump(f, c('s43:electricity')) - 1)} /></g>
        </g>
        <Tag x={1510} y={720} t="THE HIDDEN PART: POWER PLANTS" size={42} bg={A.ink} fg={A.paper} o={win(f, hidden42, s44, 8)} />
        <g opacity={win(f, berkeley44, kwh44, 8)} transform={`translate(1510 760) scale(${pop(f, berkeley44)})`}>
          <rect x={-170} y={-60} width={340} height={120} rx={14} fill={A.paper} stroke={A.ink2} strokeWidth={4} /><path d="M-130 -20 L-110 -20 L-100 30 L-140 30 Z" fill={A.aqua} stroke={A.ink2} strokeWidth={3} />
          <text x={30} y={14} textAnchor="middle" fill={A.ink} style={BB(40)}>BERKELEY LAB</text></g>
        <g transform="translate(1180 230)">
          {[[150, 330, american44], [420, 300, sit44]].map(([x, y, a], k) => <g key={k} transform={`translate(${x} ${(y as number) - 40 * on(f, a as number, 10)})`} opacity={win(f, a as number, s45, 6)}><path d="M0 0 C-30 -36 -30 -66 0 -66 C30 -66 30 -36 0 0 Z" fill={A.red} /><circle cy={-44} r={10} fill={A.paper} /></g>)}
          <Vapor x={500} y={150} f={f} t={win(f, making44, s45, 8)} s={0.6} />
        </g>
        <Tag x={1510} y={720} t="1 kWh ≈ 4.5 LITERS OF WATER" size={46} bg={A.water} fg={A.paper} o={win(f, l45, s45, 8)} />
        <g opacity={win(f, liters44, s45, 8)}><Bottle x={1420} y={G - 60} s={0.55} /><Bottle x={1520} y={G - 60} s={0.55} /><Bottle x={1620} y={G - 60} s={0.55} fill={0.5} /></g>
        {/* the kWh battery with a tiny slice */}
        <g opacity={win(f, s45, s46, 8)} transform="translate(1510 760)">
          <rect x={-260} y={-70} width={520} height={140} rx={20} fill={A.paper} stroke={A.ink2} strokeWidth={6} /><rect x={262} y={-28} width={24} height={56} rx={6} fill={A.ink2} />
          <rect x={-246} y={-56} width={492} height={112} rx={12} fill="#E8EEF1" />
          <rect x={-246} y={-56} width={6} height={112} fill={A.gold} opacity={on(f, slice45, 6) * (0.6 + 0.4 * Math.sin(f / 4))} />
          <text x={0} y={18} textAnchor="middle" fill={A.ink2} style={BB(48)} transform={`scale(${pop(f, kwh45)})`}>1 kWh</text>
          <Tag x={-200} y={-120} t="0.24 Wh" size={40} bg={A.gold} o={on(f, wh024, 8)} />
        </g>
        {f >= adds45 && f < more45 + 4 && <Drop x={1680} y={420} s={0.9 * pop(f, adds45)} fill={A.aqua} />}
        {fall2 > 0 && fall2 < 1 && <Drop x={lerp(1680, SP[0] + 40, fall2)} y={lerp(420, SP[1] - 30, fall2) - 200 * Math.sin(Math.PI * fall2)} s={0.9} fill={A.aqua} />}
        <Tag x={SP[0]} y={SP[1] - 140} t="+ ≈ 1 mL AT THE POWER PLANT" size={40} o={win(f, plant45, s46, 8)} />
        <Tag x={SP[0]} y={SP[1] - 140} t="≈ 1.3 mL ≈ 25 DROPS" size={50} bg={A.water} fg={A.paper} o={win(f, ml13, s47, 8)} />
        <g opacity={win(f, both46b, ml13, 6)}><Drop x={SP[0] - 60} y={SP[1] - 60} s={0.8} /><Drop x={SP[0] + 60} y={SP[1] - 60} s={0.8} fill={A.aqua} /></g>
        <g opacity={win(f, s46q, ml13 + 6, 6)}><Drop x={SP[0]} y={SP[1] - 70} s={1.2 * pop(f, s46q)} /></g>
        <g opacity={win(f, d25, s47, 8)}>{Array.from({ length: 25 }, (_, k) => <Drop key={k} x={1310 + (k % 9) * 50} y={780 + Math.floor(k / 9) * 56} s={0.45} o={on(f, d25 + k, 3)} />)}</g>
        <Tag x={SP[0]} y={SP[1] - 150} t="20 QUESTIONS ≈ 27 mL A DAY" size={46} bg={A.green} fg={A.paper} o={on(f, ml27, 8)} />
        <Tag x={SP[0]} y={SP[1] + 110} t="JUST UNDER 2 TABLESPOONS" size={38} o={on(f, tablespoons47, 8)} />
      </g>}
      {/* # C) her home, the bottle claim, and the worry */}
      {Cw > 0.001 && <g opacity={Cw}>
        <g opacity={1 - on(f, s50, 10)}>
          <Spoon x={SP[0]} y={SP[1]} s={0.8} big fill={1} />
          <g opacity={on(f, home48, 10)} transform={`translate(1560 ${G - 70})`}>
            <rect x={-170} y={-560} width={340} height={560} rx={24} fill="#E6F4FA" stroke={A.steelD} strokeWidth={6} />
            <rect x={-160} y={-550 * on(f, g82, 30)} width={320} height={550 * on(f, g82, 30) - 10} rx={18} fill={A.water} opacity={0.85} />
            <text y={-260} textAnchor="middle" fill={A.paper} style={BB(84)} opacity={on(f, l300, 8)}>310 L</text>
            <path d={`M-160 ${-550 * on(f, g82, 30) + 10} q40 -14 80 0 t80 0 t80 0 t80 0`} fill="none" stroke="#FFFFFF" strokeWidth={6} opacity={on(f, water48, 8)} />
            <path d="M-200 -560 L0 -680 L200 -560 Z" fill={A.clayD} opacity={on(f, home48b, 8)} />
          </g>
          <Tag x={1560} y={300} t="HOME: 82 GALLONS A DAY" size={46} o={on(f, g82, 8) * (1 - on(f, l300, 8))} />
          <Tag x={1560} y={300} t="≈ 310 LITERS A DAY" size={46} o={on(f, l300, 8)} />
          <g opacity={on(f, percent49, 8)}><rect x={1384} y={G - 640} width={352} height={572} rx={28} fill="none" stroke={A.green} strokeWidth={8} opacity={0.4 + 0.6 * on(f, own49, 10)} /></g>
          <g opacity={on(f, habit49, 8) * (1 - on(f, s50, 8))}><Phone x={SP[0] - 300} y={SP[1] - 20} s={0.5 * pop(f, habit49)} p={1} /></g>
          <g opacity={on(f, less49, 8)}><path d={`M${SP[0] + 140} ${SP[1]} L1370 ${G - 300}`} stroke={A.green} strokeWidth={6} strokeDasharray="14 10" /></g>
          <Tag x={SP[0]} y={SP[1] - 130} t="AI: < 0.01% OF IT" size={52} bg={A.green} fg={A.paper} o={on(f, hundredth49, 8)} />
        </g>
        <g opacity={win(f, s50, tiny52, 8)}>
          <g transform={`translate(860 ${G - 260}) scale(${pop(f, email50)})`} opacity={on(f, email50, 8)}><rect x={-120} y={-80} width={240} height={160} rx={12} fill={A.paper} stroke={A.ink2} strokeWidth={5} /><path d="M-120 -80 L0 10 L120 -80" fill="none" stroke={A.ink2} strokeWidth={5} /></g>
          <Bottle x={1180} y={G - 250} s={0.9 * pop(f, bottle50)} o={on(f, bottle50, 8)} />
          <Tag x={1020} y={360} t='"ONE EMAIL = ONE BOTTLE"' size={46} o={on(f, bottle50, 8) * (1 - on(f, s51, 8))} />
          {/* electricity bars */}
          <g opacity={on(f, s51, 10)} transform="translate(1560 820)">
            <rect x={-150} y={-560 * on(f, x600, 24)} width={120} height={560 * on(f, x600, 24)} rx={10} fill={A.gold} />
            <rect x={40} y={-6} width={120} height={6} rx={3} fill={A.water} opacity={on(f, google51, 8)} />
            <g opacity={on(f, reports51, 8)}><path d="M100 -20 L100 -120" stroke={A.water} strokeWidth={6} strokeDasharray="10 8" /><circle cx={100} cy={-20} r={14 + 4 * Math.sin((f - reports51) / 4)} fill="none" stroke={A.water} strokeWidth={5} /></g>
            <g opacity={on(f, typical51, 8)}><Phone x={100} y={-220} s={0.45 * pop(f, typical51)} p={1} /></g>
            <text x={-90} y={50} textAnchor="middle" fill={A.ink} style={BB(32)}>2024 ESTIMATE</text>
            <g opacity={win(f, assumed51, x600, 6)} transform="translate(-90 -140)"><circle r={56} fill={A.paper} stroke={A.gold} strokeWidth={6} /><text y={22} textAnchor="middle" fill={A.goldD} style={BB(64)}>?</text></g>
            <g opacity={win(f, email51, x600, 6)} transform="translate(-90 -260)"><rect x={-50} y={-34} width={100} height={68} rx={8} fill={A.paper} stroke={A.ink2} strokeWidth={4} /><path d="M-50 -34 L0 6 L50 -34" fill="none" stroke={A.ink2} strokeWidth={4} /></g><text x={100} y={50} textAnchor="middle" fill={A.ink} style={BB(32)} opacity={on(f, google51, 8)}>GOOGLE NOW</text>
          </g>
          <Tag x={1020} y={360} t="ASSUMED ≈ 600× MORE ELECTRICITY" size={46} bg={A.gold} o={on(f, x600, 8)} />
        </g>
        <g opacity={on(f, tiny52, 10)}>
          <Spoon x={SP[0]} y={SP[1]} s={0.8} big fill={1} /><Tag x={SP[0]} y={SP[1] - 130} t="FOR ONE PERSON: TINY" size={46} bg={A.green} fg={A.paper} />
          <g opacity={on(f, dalles52, 10)}><WaterTower x={1560} y={G - 70} s={0.8} fill={0.8} share={0.29} label="29%" />
            {[0, 1, 2].map((k) => <Mini key={k} look={['buyer', 'worker', 'owner'][k]} x={1380 + k * 180} y={G - 70} scale={0.75} frame={f} seed={k + 51} mood={f >= worry52 ? 'sad' : 'neutral'} />)}
            <Tag x={1560} y={300} t="THE DALLES" size={44} /></g>
        </g>
      </g>}
      <Vig id="aq-cup" />
      <Headline f={f} lines={[[c('s38'), 'STEP 3: ONE QUESTION', A.ink, 96], [s39, 'AT THE DATA CENTER', A.ink, 94], [s42, 'AT THE POWER PLANT', A.ink, 94], [s46, 'BOTH TOGETHER', A.ink, 96], [s48, 'VS. YOUR HOME', A.ink, 96], [s50, 'THAT BOTTLE CLAIM', A.ink, 96], [s52, 'SO WHY WORRY?', A.ink, 96]]} />
    </g>
  )
}

export const AQ_CUP = makePiece('aq-cup', "Step 3, one question, in Lena's kitchen: Lena waves and asks her phone; 20 question bubbles fill the wall (20 questions a day); one drop falls from the phone into a teaspoon (Gemini 0.26 mL), five drops (≈ 5 drops), ChatGPT ≈ 1/15 teaspoon; 100 drops stream into the teaspoon (≈ 1 teaspoon a day); through the window a power plant's curved tower steams, a pylon line runs to the data center (the hidden part); three bottles (1 kWh ≈ 4.5 liters); a kWh battery with one tiny glowing slice (0.24 Wh); a second drop flies from the plant into the spoon (+ ≈ 1 mL); 25 drops (≈ 1.3 mL); a tablespoon fills (≈ 27 mL a day, just under 2 tablespoons); a tall home water tank fills to 310 liters beside the tiny spoon (< 0.01%); an email and a water bottle (the viral claim); an electricity bar nearly 600 times taller than Google's sliver; the spoon again (tiny for one person) and The Dalles' tower with worried townsfolk", {
  mood: 'light', Component: Cup,
  beats: ["s38:lena", "s38:asks", "s38:20", "s39", "s39:estimated", "s39:026", "s39:five", "s40", "s40:fifteenth", "s40:teaspoon", "s41", "s41:100", "s41:teaspoon", "s42", "s42:center", "s42:hidden", "s43", "s43:plants", "s43:cool", "s44", "s44:berkeley", "s44:american", "s44:sit", "s44:making", "s44:kilowatt", "s44:45", "s44:liters", "s45:kilowatt", "s45:power", "s45:adds", "s45", "s45:024", "s45:slice", "s45:more", "s45:plant", "s46", "s46:both", "s46:13", "s46:25", "s47", "s47:27", "s47:tablespoons", "s48", "s48:home", "s48:82", "s48:300", "s49", "s49:hundredth", "s50", "s50:email", "s50:bottle", "s48:water", "s48:home#2", "s49:habit", "s49:less", "s46:together", "s46:question", "s51:reports", "s51:typical", "s49:own", "s49:percent", "s51:assumed", "s51:email", "s40:boss", "s40:number", "s39:typical", "s39:gemini", "s51", "s51:600", "s51:google", "s52", "s52:tiny", "s52:dalles", "s52:worry", "s48:american", "s52:person", "s43:water", "s43:electricity"],
  sfx: [['s39:026', 'softpop', 0.12], ['s45:more', 'softpop', 0.12], ['s50:bottle', 'pop', 0.1]] })
