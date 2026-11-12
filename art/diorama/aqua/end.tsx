// ---------------------------------------------------------------- s78–s83: the answer.
// A) the whole chain builds left to right on its words: a phone question → a hot chip → the cooling tower with vapour
//    rising → a pipe from the town's water tower (clean enough to drink, a local supply) → a power plant steaming.
// B) Lena with her tablespoon (just under 2 tablespoons a day) beside The Dalles' tower with its 29% slice.
// C) Lena's phone pops an answer, five drops rise from it, and her kitchen tap lets one drop fall into her glass.
import React from 'react'
import { on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, type Beat } from '../aimoney/common'
import { A, Chip, CoolingTower, DataCenter, Vapor, Drop, G, Phone, Pipe, PowerPlant, Spoon, Tag, Vig, WaterTower, World, win , bump, around } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const how78 = c('s78:how'), drinking78 = c('s78:drinking')
  const s79 = c('s79'), chips79 = c('s79:chips'), hot79 = c('s79:hot'), carries79 = c('s79:carries'), vapor79 = c('s79:vapor')
  const away79 = c('s79:away'), much79 = c('s79:much'), s80 = c('s80'), drink80 = c('s80:drink'), local80 = c('s80:local'), plant80 = c('s80:plant'), electricity80 = c('s80:electricity')
  const s81 = c('s81'), lena81 = c('s81:lena'), tablespoons81 = c('s81:tablespoons')
  const made82 = c('s82:made'), company82 = c("s82:company's"), s82 = c('s82'), dalles82 = c('s82:dalles'), p29 = c('s82:29'), water82 = c('s82:water')
  const s83 = c('s83'), answer83 = c('s83:answer'), pops83 = c('s83:pops'), drops83 = c('s83:drops'), tap83 = c("s83:somebody's")

  const Aw = win(f, 0, s81, 10), Bw = win(f, s81 - 6, s83, 10), Cw = on(f, s83 - 6, 10)
  const lena: Beat[] = [[0, 'idle', 'smiling'], [lena81, 'holdUp', 'smiling'], [dalles82, 'point', 'thinking'], [p29, 'think', 'worried'], [s83, 'phone', 'neutral'], [pops83, 'phone', 'smiling'], [drops83, 'lookFar', 'thinking'], [tap83, 'point', 'neutral']]
  const dropFall = span(f, tap83, tap83 + 26)

  return (
    <g>
      <World id="aq-end" f={f} mood={Cw > 0.5 ? 'warm' : 'day'} />
      {/* # A) the whole chain */}
      {Aw > 0.001 && <g opacity={Aw}>
        <Phone x={180} y={560} s={0.85} p={on(f, how78, 20)} o={on(f, how78 - 4, 8)} q="AI?" />
        <g opacity={win(f, c('s78:drinking'), chips79 + 10, 6)}><Drop x={180} y={380} s={1.2 * pop(f, c('s78:drinking'))} /></g>
        <Pipe d="M260 560 L360 560" f={f} w={10} col={A.water} o={on(f, chips79, 8)} />
        <Chip x={500} y={560} s={0.6} f={f} heat={on(f, hot79, 10)} o={on(f, chips79, 8)} />
        <Pipe d={`M620 560 L760 560`} f={f} w={14} col={A.heat} o={on(f, carries79, 8)} />
        <g opacity={on(f, carries79, 8)}><CoolingTower x={1000} y={G} s={0.72} f={f} spray={1} fan={1} vapor={on(f, vapor79, 10)} /></g>
        <WaterTower x={1400} y={G} s={0.7} fill={0.8} label="TOWN" o={on(f, s80, 8)} />
        <Pipe d={`M1330 ${G - 40} L1170 ${G - 40}`} f={f} w={18} o={on(f, local80, 8)} />
        <Tag x={1400} y={300} t="CLEAN ENOUGH TO DRINK" size={40} bg={A.water} fg={A.paper} o={win(f, drink80, plant80, 8)} />
        
        <PowerPlant x={1780} y={G} s={0.5} f={f} steam={on(f, electricity80, 10)} o={on(f, plant80, 8)} />
        <Tag x={1700} y={300} t="+ EVEN MORE AT THE POWER PLANT" size={40} o={on(f, plant80 + 6, 8)} />
        <g opacity={win(f, away79, s80, 8)}>{[0, 1, 2].map((k) => <path key={k} d={`M${940 + k * 60} ${G - 420} q12 -22 0 -44 q-12 -22 0 -44`} fill="none" stroke={A.heat} strokeWidth={8} strokeLinecap="round" transform={`translate(0 ${-((f * 1.5 + k * 20) % 60)})`} />)}</g>
        <g opacity={win(f, much79, s80 + 20, 8)}><Vapor x={1000} y={G - 420} f={f + 30} t={1} s={0.9} spread={120} /></g>
        <Tag x={1000} y={300} t="MUCH OF IT FLOATS OFF" size={40} o={win(f, vapor79, s80, 8)} />
      </g>}
      {/* # B) Lena's spoon vs The Dalles */}
      {Bw > 0.001 && <g opacity={Bw}>
        <Person f={f} who="investorF" beats={lena} x={360} y={G + 10} s={1.0} />
        <Spoon x={660} y={G - 420} s={0.9 * bump(f, c('s81:day'), c('s81:comes'))} big fill={on(f, lena81, 20)} />
        <Tag x={720} y={G - 560} t="LENA: UNDER 2 TABLESPOONS A DAY" size={42} bg={A.green} fg={A.paper} o={on(f, tablespoons81, 8)} />
        <WaterTower x={1450} y={G} s={1.15} fill={0.85} share={0.29 * on(f, p29, 18)} label={f >= p29 ? '29%' : 'THE DALLES'} o={on(f, s82, 10)} />
        <g opacity={on(f, made82, 8)}><DataCenter x={1450} y={G + 10} s={0.0001 + 0.5 * on(f, made82, 10)} f={f} vapor={1} o={1 - on(f, company82, 10)} /></g>
        <g opacity={on(f, company82, 8)}><DataCenter x={1820} y={G} s={0.32} f={f} vapor={1} /></g>
        <Tag x={1450} y={260} t="THE DALLES: 29% OF THE CITY'S WATER" size={44} bg={A.heat} fg={A.paper} o={on(f, water82 - 6, 8)} />
      </g>}
      {/* # C) the loop back: an answer, five drops, somebody's tap */}
      {Cw > 0.001 && <g opacity={Cw}>
        <Person f={f} who="investorF" beats={lena} x={360} y={G + 10} s={1.0} />
        <Phone x={640} y={G - 420} s={0.85 * bump(f, c('s83:seconds'), c('s83:remember'))} r={-6} p={span(f, answer83, pops83 + 14)} />
        {[0, 1, 2, 3, 4].map((k) => { const rise = span(f, drops83 + k * 3, drops83 + 50 + k * 3); return <Drop key={k} x={800 + k * 90} y={G - 520 - rise * 200} s={1.0 * pop(f, drops83 + k * 3)} o={on(f, drops83 + k * 3, 6) * (1 - 0.7 * rise)} /> })}
        <g transform={`translate(1450 ${G - 520})`}>
          <path d="M-220 -60 L-40 -60 Q20 -60 20 0 L20 40" fill="none" stroke={A.steelD} strokeWidth={44} strokeLinecap="round" /><rect x={-250} y={-100} width={70} height={80} rx={12} fill={A.steel} />
          {dropFall > 0 && <Drop x={20} y={70 + dropFall * 300} s={0.9} o={1 - span(f, tap83 + 22, tap83 + 30)} />}
          <path d="M-60 300 L100 300 L86 470 L-46 470 Z" fill="#E6F4FA" stroke={A.steelD} strokeWidth={5} transform="translate(-20 0)" />
          <path d="M-74 380 L74 380 L66 468 L-60 468 Z" fill={A.water} opacity={0.75} />
        </g>
        <Tag x={1450} y={260} t="SOMEBODY'S TAP" size={48} bg={A.water} fg={A.paper} o={on(f, tap83, 8)} />
      </g>}
      <Vig id="aq-end" />
      <Headline f={f} lines={[[how78, 'HOW AI USES OUR WATER', A.ink, 96], [drinking78, 'HOW AI USES OUR DRINKING WATER', A.waterD, 88], [s81, 'ONE PERSON VS ONE TOWN', A.ink, 94], [s83, 'NEXT TIME YOU ASK', A.ink, 96]]} />
    </g>
  )
}

export const AQ_END = makePiece('aq-end', "The answer: the whole chain builds left to right on its words: Lena's phone question, a chip glowing hot, a warm pipe into the cooling tower whose vapour floats off, the town's water tower piping clean drinking water from a local supply, and a power plant steaming (even more at the power plant); then Lena holds up a tablespoon (under 2 tablespoons a day) beside The Dalles' water tower with its orange 29% slice; finally her phone pops an answer, five drops rise from it, and a kitchen tap lets one drop fall into a glass (somebody's tap)", {
  mood: 'light', Component: End,
  beats: ["s78:how", "s79", "s79:chips", "s79:hot", "s79:carries", "s79:vapor", "s79:away", "s79:much", "s80", "s80:drink", "s80:local", "s80:plant", "s80:electricity", "s81", "s81:lena", "s81:tablespoons", "s82:made", "s82:company's", "s82", "s82:dalles", "s82:29", "s82:water", "s83", "s83:answer", "s83:pops", "s83:drops", "s83:somebody's", "s78:drinking", "s81:day", "s81:comes", "s83:seconds", "s83:remember"],
  sfx: [['s79:vapor', 'whoosh', 0.08], ['s82:29', 'ding', 0.1], ["s83:somebody's", 'softpop', 0.12]] })
