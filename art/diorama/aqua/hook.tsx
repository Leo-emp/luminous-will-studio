// ---------------------------------------------------------------- s1–s9: the hook.
// A) Lena at her kitchen table types a question; the answer pops up; a signal arcs to a data center on a far hill,
//    5 drops pop above its cooling tower and rise as vapour; Lena thinks "five drops?", shrugs, nods.
// B) billions of little question bubbles stream into the building (2.5 BILLION A DAY); seawater is crossed, a tap
//    fills a glass (CLEAN ENOUGH TO DRINK).
// C) a small Oregon city: the water tower fills and one company's slice turns orange (29%); five signposts light up
//    for the five steps.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, type Beat } from '../aimoney/common'
import { A, BB, DataCenter, Drop, G, House, No, Phone, Tag, Vapor, Vig, WaterTower, World, arcAt, win , bump, around } from './kit'

const Table: React.FC<{ x: number }> = ({ x }) => (
  <g><rect x={x - 230} y={G - 250} width={460} height={28} rx={8} fill="#B98A5E" /><rect x={x - 200} y={G - 222} width={22} height={222} fill="#8C6440" /><rect x={x + 178} y={G - 222} width={22} height={222} fill="#8C6440" />
    <g transform={`translate(${x + 140} ${G - 250})`}><rect x={-26} y={-60} width={52} height={60} rx={8} fill="#F4F0E6" stroke={A.ink2} strokeWidth={3} /><path d="M26 -46 q22 0 22 18 q0 18 -22 18" fill="none" stroke={A.ink2} strokeWidth={5} /></g></g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const question1 = c('s1:question'), chatbot1 = c('s1:chatbot'), seconds1 = c('s1:seconds'), s1 = c('s1'), type1 = c('s1:type'), answer1 = c('s1:answer'), pops1 = c('s1:pops')
  const building2 = c('s2:building'), far2 = c('s2:far'), d5 = c('s2:5'), vapor2 = c('s2:vapor'), answer2 = c('s2:answer')
  const thinking3 = c('s3:thinking'), five3 = c('s3:five'), nothing3 = c('s3:nothing')
  const one4 = c('s4:one'), right4 = c('s4:right')
  const s5 = c('s5'), billions5 = c('s5:billions'), chat5 = c('s5:chatgpt'), b25 = c('s5:25')
  const seawater6 = c("s6:isn't"), sea6 = c('s6:seawater'), google6 = c("s6:google's"), drink6 = c('s6:drink'), tap6 = c('s6:tap')
  const s7 = c('s7'), oregon7 = c('s7:oregon'), single7 = c('s7:single'), d29 = c('s7:29'), water7 = c('s7:water')
  const s8 = c('s8'), engineer8 = c('s8:engineer'), okay8 = c('s8:okay')
  const s9 = c('s9'), step9 = c('s9:step'), thirsty9 = c('s9:thirsty'), comes9 = c('s9:comes'), question9 = c('s9:question'), adds9 = c('s9:adds'), done9 = c('s9:done')

  const Aw = win(f, 0, s5, 10), Bw = win(f, s5 - 6, s7, 10), Cw = on(f, s7 - 6, 10)
  const lena: Beat[] = [[0, 'phone', 'neutral'], [pops1, 'phone', 'smiling'], [building2, 'lookFar', 'neutral'], [thinking3, 'think', 'thinking'], [nothing3, 'shrug', 'smiling'], [right4, 'nodA', 'smiling', 'nodB', 14],
    [billions5, 'shock', 'shocked'], [sea6, 'stop', 'neutral'], [drink6, 'hold', 'thinking'], [s8, 'relax', 'smiling'], [okay8, 'thumbsUp', 'smiling'], [step9, 'present', 'smiling']]
  const DC: [number, number] = [1400, G - 160]
  const sig = span(f, building2, building2 + 24)
  const bubbles = Array.from({ length: 24 }, (_, k) => k)

  return (
    <g>
      <World id="aq-hook" f={f} mood={Cw > 0.5 ? 'day' : 'warm'} />
      {/* # A) the question, the far building, five drops */}
      {Aw > 0.001 && <g opacity={Aw}>
        <Table x={470} />
        <Person f={f} who="investorF" beats={lena} x={330} y={G + 10} s={0.95} />
        <Phone x={560} y={G - 380} s={0.9} r={-6} p={span(f, answer1, pops1 + 14)} o={on(f, type1 - 6, 8)} />
        <g opacity={win(f, question1, building2, 8)} transform={`translate(760 ${G - 600}) scale(${pop(f, question1)})`}><rect x={-70} y={-48} width={140} height={96} rx={30} fill={A.paper} stroke={A.water} strokeWidth={6} /><text y={26} textAnchor="middle" fill={A.water} style={BB(72)}>?</text></g>
        <g opacity={win(f, chatbot1, building2, 8)} transform={`translate(560 ${G - 380})`}><circle r={190} fill="none" stroke={A.aqua} strokeWidth={8} opacity={0.5 + 0.5 * Math.sin((f - chatbot1) / 4)} /></g>
        <g opacity={win(f, seconds1, building2, 8)} transform={`translate(900 ${G - 400})`}><circle r={60} fill={A.paper} stroke={A.ink2} strokeWidth={6} /><line x1={0} y1={0} x2={0} y2={-44} stroke={A.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${(f - seconds1) * 12})`} /></g>
        <DataCenter x={DC[0]} y={G - 20} s={0.95} f={f} vapor={on(f, vapor2, 12)} o={on(f, building2 - 4, 12)} />
        <Tag x={DC[0] - 120} y={G - 420} t="FAR AWAY" size={38} o={win(f, far2, d5, 8)} />
        {sig > 0 && sig < 1 && (() => { const [x, y] = arcAt([620, G - 470], [DC[0] + 310, G - 360], sig, 260); return <circle cx={x} cy={y} r={14} fill={A.water} /> })()}
        <path d={`M620 ${G - 470} Q1100 ${G - 800} ${DC[0] + 310} ${G - 360}`} fill="none" stroke={A.water} strokeWidth={5} strokeDasharray="10 14" opacity={0.6 * win(f, building2 + 10, answer2 + 20, 10)} />
        {[0, 1, 2, 3, 4].map((k) => { const rise = span(f, vapor2 + k * 3, vapor2 + 40 + k * 3); return <Drop key={k} x={DC[0] + 190 + k * 70} y={G - 520 - rise * 180} s={1.1 * pop(f, d5 + k * 3)} o={on(f, d5 + k * 3, 6) * (1 - rise)} /> })}
        <Vapor x={DC[0] + 310} y={G - 470} f={f} t={win(f, vapor2, nothing3, 12)} s={0.8} />
        <Tag x={DC[0] + 330} y={G - 640} t="5 DROPS" size={48} bg={A.water} fg={A.paper} o={win(f, d5, one4, 8)} />
        <g opacity={win(f, five3, right4, 8)}><Tag x={960} y={420} t="FIVE DROPS?" size={56} /></g>
        <g opacity={on(f, one4, 8)}><Drop x={960} y={460} s={1.4 * pop(f, one4)} face /><Tag x={960} y={330} t="ONE QUESTION: TINY" size={44} o={on(f, right4, 8)} /></g>
      </g>}
      {/* # B) billions of questions; drinking water */}
      {Bw > 0.001 && <g opacity={Bw}>
        <DataCenter x={1380} y={G - 20} s={1.0} f={f} vapor={on(f, billions5, 10)} />
        {bubbles.map((k) => { const t = ((f - billions5) * 0.012 + k / 24) % 1; const sx = 120 + (k % 6) * 90, sy = 300 + Math.floor(k / 6) * 110
          return f >= billions5 + k ? <g key={k} transform={`translate(${lerp(sx, 1240, t)} ${lerp(sy, G - 260, t)}) scale(${1 - 0.5 * t})`} opacity={on(f, billions5 + k, 6) * (1 - on(f, sea6, 8))}><rect x={-34} y={-24} width={68} height={48} rx={16} fill={A.paper} stroke={A.water} strokeWidth={4} /><text y={12} textAnchor="middle" fill={A.water} style={BB(34)}>?</text></g> : null })}
        <Tag x={1380} y={G - 380} t="CHATGPT" size={40} o={win(f, chat5, sea6, 8)} />
        <Tag x={560} y={260} t="2.5 BILLION A DAY" size={60} bg={A.water} fg={A.paper} o={win(f, b25, sea6, 8)} />
        {/* seawater: a wave panel, crossed */}
        <g opacity={win(f, sea6, google6, 8)} transform="translate(560 560)">
          <rect x={-200} y={-140} width={400} height={280} rx={30} fill="#2E7FAE" />
          {[0, 1, 2].map((k) => <path key={k} d={`M-180 ${-60 + k * 60} q45 -30 90 0 t90 0 t90 0 t90 0`} fill="none" stroke="#FFFFFF" strokeWidth={8} opacity={0.8} />)}
          <Tag x={0} y={190} t="SEAWATER" size={40} />
          <No x={0} y={0} r={160} o={on(f, seawater6 - 2, 8)} />
        </g>
        {/* the tap fills a glass */}
        <g opacity={on(f, google6, 10)} transform={`translate(560 640) ${around(80, -20, bump(f, c('s6:clean'), c('s6:same')))}`}>
          <path d="M-120 -330 L40 -330 Q80 -330 80 -290 L80 -250" fill="none" stroke={A.steelD} strokeWidth={36} strokeLinecap="round" />
          <rect x={-150} y={-360} width={60} height={60} rx={10} fill={A.steel} />
          {f >= drink6 && <rect x={70} y={-240} width={20} height={Math.min(230, (f - drink6) * 14)} fill={A.water} opacity={0.8} />}
          <path d="M10 -100 L150 -100 L136 60 L24 60 Z" fill="#E6F4FA" stroke={A.steelD} strokeWidth={5} />
          <path d={`M${10 + 6} ${60 - 150 * span(f, drink6, drink6 + 50)} L${150 - 6} ${60 - 150 * span(f, drink6, drink6 + 50)} L136 58 L24 58 Z`} fill={A.water} opacity={0.75} />
        </g>
        <Tag x={560} y={810} t="CLEAN ENOUGH TO DRINK" size={44} bg={A.paper} o={on(f, drink6, 8)} />
        <Tag x={560} y={260} t="SAME AS YOUR TAP" size={48} o={on(f, tap6, 8)} />
      </g>}
      {/* # C) one city's water; five steps */}
      {Cw > 0.001 && <g opacity={Cw}>
        <g opacity={1 - on(f, s8, 10)}>
          {[[260, '#F4C9A0'], [440, '#CFE3C0'], [620, '#F2DCA8'], [1300, '#F4C9A0'], [1480, '#CFE3C0'], [1660, '#F2DCA8']].map(([x, col], k) => <House key={k} x={x as number} y={G} s={0.9} c={col as string} o={on(f, s7 + k * 2, 8)} />)}
          <WaterTower x={960} y={G} s={1.2} fill={on(f, oregon7, 20) * 0.85} share={0.29 * on(f, d29, 18)} label={f >= d29 ? '29%' : undefined} o={on(f, s7, 10)} />
          <Tag x={960} y={250} t="A SMALL CITY IN OREGON" size={44} o={win(f, oregon7, single7, 8)} />
          <Tag x={1200} y={430} t="ONE COMPANY" size={42} bg={A.heat} fg={A.paper} o={win(f, single7, s8, 8)} />
          <Tag x={960} y={250} t="29% OF THE CITY'S WATER" size={48} bg={A.heat} fg={A.paper} o={win(f, water7, s8, 8)} />
        </g>
        <g opacity={on(f, s8, 10)}>
          <Person f={f} who="investorF" beats={lena} x={260} y={G + 10} s={0.9} />
          <g opacity={win(f, engineer8, s9, 8)} transform={`translate(1000 560) scale(${pop(f, engineer8)})`}><path d="M-170 40 Q-170 -150 0 -150 Q170 -150 170 40 Z" fill={A.gold} stroke={A.goldD} strokeWidth={8} /><rect x={-210} y={30} width={420} height={40} rx={20} fill={A.goldD} /><rect x={-24} y={-150} width={48} height={190} fill={A.goldD} opacity={0.5} /><Tag x={0} y={170} t="ENGINEER" size={40} /><No x={0} y={-30} r={210} o={on(f, engineer8 + 8, 8)} /></g>
          {[thirsty9, comes9, question9, adds9, done9].map((a, k) => { const x = 620 + k * 280, lit = on(f, a, 8), bb = k === 0 ? bump(f, c('s9:computer')) : 1
            return <g key={k} opacity={on(f, step9 + k * 3, 8)} transform={`translate(${x} ${G}) scale(${bb})`}>
              <rect x={-8} y={-260} width={16} height={260} fill="#8C6440" />
              <g transform={`translate(0 ${-280 - 10 * pop(f, a)})`}><rect x={-110} y={-70} width={220} height={120} rx={14} fill={lit > 0.5 ? A.water : A.paper} stroke={A.ink} strokeOpacity={0.2} strokeWidth={3} />
                <text y={-12} textAnchor="middle" fill={lit > 0.5 ? A.paper : A.waterD} style={BB(48)}>{k + 1}</text>
                <text y={32} textAnchor="middle" fill={lit > 0.5 ? A.paper : A.ink} style={BB(30)}>{['THIRSTY CHIPS', 'WHERE FROM', 'ONE QUESTION', 'ADDING UP', 'THE FIXES'][k]}</text></g>
            </g> })}
        </g>
      </g>}
      <Vig id="aq-hook" />
      <Headline f={f} lines={[[s1, 'ONE QUESTION', A.ink, 96], [building2, 'SOMEWHERE FAR AWAY', A.ink, 92], [s5, 'BILLIONS A DAY', A.ink, 96], [google6, "IT'S DRINKING WATER", A.waterD, 92], [s7, 'ONE TOWN, ONE CUSTOMER', A.ink, 90], [s8, 'NO ENGINEER NEEDED', A.ink, 92], [step9, '5 STEPS', A.ink, 100]]} />
    </g>
  )
}

export const AQ_HOOK = makePiece('aq-hook', "Hook: Lena at her kitchen table types a question on her phone and the answer pops up; a dotted signal arcs to a white data center on a far hill; five water drops pop above its cooling tower and rise away as vapour (5 DROPS); Lena thinks, shrugs, nods; then billions of little question bubbles stream into the building (2.5 BILLION A DAY), a seawater wave panel is crossed out and a tap fills a glass (CLEAN ENOUGH TO DRINK); a small Oregon city's water tower fills and one company's orange slice takes 29%; five numbered signposts light up for the five steps", {
  mood: 'light', Component: Hook,
  beats: ["s1:question", "s1:chatbot", "s1:seconds", "s1", "s1:type", "s1:answer", "s1:pops", "s2:building", "s2:far", "s2:5", "s2:vapor", "s2:answer", "s3:thinking", "s3:five", "s3:nothing", "s4:one", "s4:right", "s5", "s5:billions", "s5:chatgpt", "s5:25", "s6:isn't", "s6:seawater", "s6:google's", "s6:drink", "s6:tap", "s7", "s7:oregon", "s7:single", "s7:29", "s7:water", "s8", "s8:engineer", "s8:okay", "s9", "s9:step", "s9:thirsty", "s9:comes", "s9:question", "s9:adds", "s9:done", "s6:clean", "s6:same", "s9:computer"],
  sfx: [['s2:5', 'pop', 0.12], ['s5:25', 'whoosh', 0.1], ['s7:29', 'ding', 0.12]] })
