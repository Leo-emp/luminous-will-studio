// ---------------------------------------------------------------- s25–s37: step two — it comes from the tap.
// A) a sea panel and a muddy river panel are crossed (at least at Google they don't); a big glass of clear water with a
//    78% ring (POTABLE = DRINKABLE); a town water tower feeds houses on the left and a data center on the right by pipes;
//    signals come in from everywhere, but a pin drops on one exact place.
// B) The Dalles: basalt cliffs and the Columbia River, Google's data center by the water; a padlocked folder (secret);
//    a newspaper, a courthouse, a $100,000 bag; the padlock opens; the tower shows 355 MILLION GALLONS, an orange 29%
//    slice; three tanks show nearly three times; new pipes slide in ($28.5M UPGRADE) and a water-rights deed is handed over.
// C) a globe is crossed (not the whole planet); the town's one tower split between homes and one giant customer;
//    then the whole picture shrinks into a phone screen.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, type Beat } from '../aimoney/common'
import { A, BB, Court, DataCenter, Drop, G, House, No, Paper, Phone, Pipe, RiverCity, Tag, Vig, WaterTower, World, win , bump, around } from './kit'

const Tap: React.FC<PieceProps> = ({ f, c }) => {
  const picture25 = c('s25:picture'), seawater25 = c('s25:seawater'), dirty25 = c('s25:dirty'), mostly25 = c('s25:mostly'), dont25 = c("s25:don't")
  const s26 = c('s26'), p78 = c('s26:78'), potable26 = c('s26:potable'), drink26 = c('s26:drink')
  const s27 = c('s27'), buy27 = c('s27:buy'), city27 = c('s27:city'), houses27 = c('s27:houses')
  const s28 = c('s28'), key28 = c('s28:key'), anywhere28 = c('s28:anywhere'), one28 = c('s28:one'), exact28 = c('s28:exact'), place28 = c('s28:place')
  const s29 = c('s29'), dalles29 = c('s29:dalles'), columbia29 = c('s29:columbia'), google29 = c('s29:google')
  const s30 = c('s30'), secret30 = c('s30:secret')
  const newspaper31 = c('s31:newspaper'), sued31 = c('s31:sued'), d100k = c('s31:100000'), case31 = c('s31:case')
  const s32 = c('s32'), dropped32 = c('s32:dropped'), numbers32 = c('s32:numbers'), out32 = c('s32:out')
  const s33 = c('s33'), m355 = c('s33:355'), gallons33 = c('s33:gallons')
  const s34 = c('s34'), p29 = c('s34:29'), whole34 = c('s34:whole'), three34 = c('s34:three'), five34 = c('s34:five')
  const took26 = c('s26:took'), centers26 = c('s26:centers'), always28 = c('s28:always'), taken28 = c('s28:taken'), system35 = c('s35:system'), handed35 = c('s35:handed'), whole34b = c('s34:whole'), city34 = c('s34:city'), much37 = c('s37:much'), question37 = c('s37:question'), s35 = c('s35'), d285 = c('s35:285'), upgrade35 = c('s35:upgrade'), rights35 = c('s35:rights'), city35 = c('s35:city')
  const s36 = c('s36'), planet36 = c('s36:planet'), dry36 = c('s36:dry'), town36 = c("s36:town's"), homes36 = c('s36:homes'), giant36 = c('s36:giant')
  const s37 = c('s37'), shrink37 = c('s37:shrink'), screen37 = c('s37:screen')

  const Aw = win(f, 0, s29, 10), Bw = win(f, s29 - 6, s36, 10), Cw = on(f, s36 - 6, 10)
  const towerA = on(f, s27, 12)
  const shrink = span(f, shrink37, shrink37 + 26)
  const official: Beat[] = [[0, 'idle', 'neutral'], [c('s30:city'), 'point', 'neutral'], [secret30, 'armsCrossed', 'neutral'], [sued31, 'angry', 'angry'], [dropped32, 'shrug', 'neutral'], [rights35, 'offer', 'smiling']]

  return (
    <g>
      <World id="aq-tap" f={f} mood={Bw > 0.5 ? 'cool' : 'day'} hills={Bw < 0.5} />
      {/* # A) not seawater: drinking water from the town */}
      {Aw > 0.001 && <g opacity={Aw}>
        <g opacity={win(f, picture25, seawater25 - 2, 6)}><DataCenter x={960} y={G} s={0.9 * pop(f, picture25)} f={f} vapor={1} /><circle cx={960} cy={300} r={60} fill={A.paper} stroke={A.water} strokeWidth={6} /><text x={960} y={326} textAnchor="middle" fill={A.water} style={BB(80)}>?</text></g>
        <g opacity={win(f, seawater25 - 4, s26, 8)}>
          <g transform={`translate(640 560) scale(${pop(f, seawater25)})`}><rect x={-230} y={-160} width={460} height={320} rx={30} fill="#2E7FAE" />
            {[0, 1, 2].map((k) => <path key={k} d={`M-200 ${-70 + k * 70} q50 -32 100 0 t100 0 t100 0 t100 0`} fill="none" stroke="#FFFFFF" strokeWidth={9} opacity={0.8} transform={`translate(${Math.sin(f / 20 + k) * 12} 0)`} />)}
            <Tag x={0} y={210} t="SEAWATER" size={42} /><No x={0} y={0} r={180} o={on(f, mostly25, 8)} /></g>
          <g opacity={on(f, dirty25, 8)} transform={`translate(1280 560) scale(${pop(f, dirty25)})`}><rect x={-230} y={-160} width={460} height={320} rx={30} fill="#9A8B62" />
            <path d="M-230 40 Q-60 -40 60 30 T230 0 L230 160 L-230 160 Z" fill="#7C6E48" />{[0, 1, 2, 3].map((k) => <ellipse key={k} cx={-150 + k * 100} cy={-60 + (k % 2) * 50} rx={26} ry={10} fill="#6B5E3C" />)}
            <Tag x={0} y={210} t="DIRTY RIVER WATER" size={42} /><No x={0} y={0} r={180} o={on(f, dont25, 8)} /></g>
        </g>
        {/* the glass: 78% drinking water */}
        <g opacity={win(f, s26, s27, 8)}>
          <g transform="translate(960 600)">
            <circle r={250} fill="none" stroke="#D6E3EA" strokeWidth={46} />
            <circle r={250} fill="none" stroke={A.water} strokeWidth={46} strokeDasharray={`${2 * Math.PI * 250 * 0.78 * on(f, p78, 24)} 9999`} transform="rotate(-90)" strokeLinecap="round" />
            <path d="M-90 -150 L90 -150 L70 150 L-70 150 Z" fill="#E6F4FA" stroke={A.steelD} strokeWidth={6} />
            <path d={`M-84 ${150 - 290 * on(f, s26, 20)} L84 ${150 - 290 * on(f, s26, 20)} L70 148 L-70 148 Z`} fill={A.water} opacity={0.75} />
            <text y={20} textAnchor="middle" fill={A.paper} style={BB(110)} opacity={on(f, p78, 8)}>78%</text>
          </g>
          <Tag x={1480} y={480} t="POTABLE" size={50} bg={A.water} fg={A.paper} o={on(f, potable26, 8)} />
          <Tag x={1480} y={580} t="= CLEAN ENOUGH TO DRINK" size={42} o={on(f, drink26, 8)} />
          <Tag x={440} y={480} t="GOOGLE DATA CENTERS, 2024" size={38} o={on(f, s26 + 4, 8)} />
          <g opacity={on(f, centers26, 8)}><DataCenter x={440} y={760} s={0.4 * pop(f, centers26)} f={f} vapor={1} /></g>
          <g opacity={on(f, took26, 8)}><path d="M560 700 Q700 760 760 700" fill="none" stroke={A.water} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-f * 2} /></g>
        </g>
        {/* the town system: tower, houses, data center */}
        <g opacity={towerA}>
          <WaterTower x={760} y={G} s={0.95} fill={0.8} label="CITY" />
          {[150, 330].map((x, k) => <House key={k} x={x} y={G} s={0.9} c={k ? '#CFE3C0' : '#F4C9A0'} o={on(f, houses27 + k * 3, 8)} />)}
          <Pipe d={`M700 ${G - 30} L120 ${G - 30}`} f={f} w={16} o={on(f, houses27, 8)} />
          <Pipe d={`M820 ${G - 30} L1180 ${G - 30}`} f={f} w={22} o={on(f, buy27, 8)} />
          <DataCenter x={1520} y={G} s={0.85 * bump(f, c('s28:part'), c('s28:answer'))} f={f} vapor={0.8} o={on(f, buy27 - 4, 10)} />
          <Tag x={760} y={300} t="THE CITY WATER SYSTEM" size={44} o={win(f, city27, s28, 8)} />
        </g>
        <g opacity={on(f, s28, 8)}>
          {[[180, 300], [520, 240], [1880, 300], [1720, 220], [80, 560]].map(([x, y], k) => { const t = span(f, anywhere28 + k * 3, anywhere28 + 24 + k * 3); return f > anywhere28 + k * 3 && t < 1 ? <circle key={k} cx={lerp(x, 1520, t)} cy={lerp(y, G - 300, t)} r={12} fill={A.water} /> : null })}
          <g opacity={win(f, always28, exact28 + 4, 6)}><circle cx={1520} cy={G - 200} r={240} fill="none" stroke={A.red} strokeWidth={6} strokeDasharray="20 16" transform={`rotate(${f} 1520 ${G - 200})`} /></g>
          <g opacity={on(f, taken28, 8)}><Pipe d={`M820 ${G - 30} L1180 ${G - 30}`} f={f} w={30} col={A.aqua} /></g>
          <g transform={`translate(1520 ${lerp(160, G - 330, on(f, exact28, 14))})`} opacity={on(f, exact28, 6)}>
            <path d="M0 0 C-60 -70 -60 -130 0 -130 C60 -130 60 -70 0 0 Z" fill={A.red} /><circle cy={-88} r={20} fill={A.paper} /></g>
          <Tag x={1520} y={G - 520} t="ONE EXACT PLACE" size={44} bg={A.red} fg={A.paper} o={on(f, place28, 8)} />
        </g>
      </g>}
      {/* # B) The Dalles */}
      {Bw > 0.001 && <g opacity={Bw}>
        <RiverCity f={f} />
        <Tag x={960} y={300} t="THE DALLES, OREGON" size={52} o={win(f, dalles29, secret30, 8)} />
        <Tag x={960} y={G - 90} t="COLUMBIA RIVER" size={36} bg={A.waterD} fg={A.paper} o={win(f, columbia29, secret30, 8)} />
        <DataCenter x={1520} y={G} s={0.8 * bump(f, c('s31:google'), c("s33:google's"))} f={f} vapor={0.8} o={on(f, google29 - 4, 10)} label="GOOGLE" />
        <WaterTower x={760} y={G - 12 * Math.sin(Math.PI * span(f, city34, city34 + 12))} s={1.0 * bump(f, c("s33:city's"))} fill={0.85} share={0.29 * on(f, p29, 18)} label={f >= p29 ? '29%' : 'CITY'} o={on(f, s29 + 10, 10)} />
        <Person f={f} who="owner" beats={official} x={230} y={G + 10} s={0.85} o={on(f, s30, 8) * (1 - on(f, s33, 8))} />
        <Tag x={230} y={G - 420} t="THE CITY" size={36} o={win(f, s30, s33, 8)} />
        {/* the locked folder */}
        <g opacity={win(f, secret30, numbers32 + 20, 8)} transform={`translate(1160 470) scale(${pop(f, secret30)})`}>
          <rect x={-130} y={-90} width={260} height={180} rx={12} fill="#E9C27A" /><rect x={-130} y={-110} width={110} height={30} rx={8} fill="#E9C27A" />
          <text y={10} textAnchor="middle" fill={A.clayD} style={BB(40)}>WATER USE</text>
          <g transform={`translate(0 ${70 + 60 * on(f, dropped32, 10)}) rotate(${30 * on(f, dropped32, 10)})`} opacity={1 - on(f, numbers32, 10)}>
            <rect x={-40} y={-30} width={80} height={64} rx={10} fill={A.steelD} /><path d={`M-24 -30 V-56 A24 24 0 0 1 24 ${-56 + 0} V${-30 - 20 * on(f, dropped32, 10)}`} fill="none" stroke={A.steelD} strokeWidth={12} /></g>
        </g>
        <Tag x={1160} y={300} t="KEPT SECRET" size={44} bg={A.ink} fg={A.paper} o={win(f, secret30, newspaper31, 8)} />
        <Paper x={1800} y={500} s={0.8} r={6} o={win(f, newspaper31, s33, 8)} title="NEWS" />
        <g opacity={win(f, sued31, s32, 8)}><Court x={1160} y={G - 40} s={0.85} /><Tag x={1160} y={300} t="THE CITY SUES THE PAPER" size={44} bg={A.red} fg={A.paper} /></g>
        <g opacity={win(f, d100k, s32, 8)} transform={`translate(1500 ${G - 120}) scale(${pop(f, d100k)})`}>
          <path d="M-70 60 Q-100 -20 -40 -60 L40 -60 Q100 -20 70 60 Z" fill="#C9B38A" stroke="#8C7650" strokeWidth={5} /><text y={30} textAnchor="middle" fill="#4F6B3A" style={BB(70)}>$</text>
          <Tag x={0} y={-110} t="$100,000+ FROM GOOGLE" size={38} /></g>
        <Tag x={1160} y={300} t="CASE DROPPED, NUMBERS OUT" size={44} bg={A.green} fg={A.paper} o={win(f, dropped32, s33, 8)} />
        <Tag x={760} y={300} t="2021: 355 MILLION GALLONS" size={50} bg={A.water} fg={A.paper} o={win(f, m355, s34, 8)} />
        <g opacity={win(f, whole34b, three34, 8)}>{[[300, '#F4C9A0'], [1700, '#CFE3C0']].map(([x, col], k) => <House key={k} x={x as number} y={G} s={0.7} c={col as string} lit={1} />)}</g>
        <Tag x={760} y={300} t="29% OF THE WHOLE CITY'S WATER" size={50} bg={A.heat} fg={A.paper} o={win(f, p29, three34, 8)} />
        {/* nearly three times in five years */}
        <g opacity={win(f, three34, s35, 8)}>{[0, 1].map((k) => <g key={k} transform={`translate(${1180 + k * 160} ${G - 40})`}>
          <rect x={-55} y={-(k ? 300 : 105) * on(f, three34 + k * 8, 12)} width={110} height={(k ? 300 : 105) * on(f, three34 + k * 8, 12)} rx={10} fill={k ? A.heat : A.heatL} />
          <text y={50} textAnchor="middle" fill={A.ink} style={BB(36)}>{k ? '2021' : '5 YRS EARLIER'}</text></g>)}
          <Tag x={1260} y={300} t="NEARLY 3× IN FIVE YEARS" size={44} o={on(f, five34, 8)} /></g>
        {/* the upgrade and the rights */}
        <g opacity={win(f, s35, s36, 8)}>
          <Pipe d={`M${lerp(-400, 0, on(f, d285, 16))} ${G - 30} L${lerp(260, 660, on(f, d285, 16))} ${G - 30}`} f={f} w={30} col="#B7CBD6" />
          <Tag x={420} y={G - 260} t="$28.5 MILLION UPGRADE, PAID BY GOOGLE" size={40} bg={A.green} fg={A.paper} o={on(f, upgrade35, 8)} />
          <Person f={f} who="worker" beats={[[s35, 'idle', 'neutral'], [c('s35:agreed'), 'nodA', 'smiling', 'nodB', 14], [system35, 'point', 'smiling'], [handed35, 'offer', 'smiling']]} x={1240} y={G + 10} s={0.85} />
          <g transform={`translate(${lerp(1330, 980, on(f, city35, 16))} ${G - 300})`} opacity={on(f, handed35, 8)}>
            <rect x={-80} y={-100} width={160} height={200} rx={8} fill="#F7F3E8" stroke={A.ink2} strokeWidth={3} /><text y={-50} textAnchor="middle" fill={A.ink} style={BB(30)}>WATER</text><text y={-16} textAnchor="middle" fill={A.ink} style={BB(30)}>RIGHTS</text>
            {[0, 1, 2].map((k) => <rect key={k} x={-56} y={12 + k * 22} width={112} height={8} rx={4} fill="#B5B0A4" />)}</g>
        </g>
      </g>}
      {/* # C) not the planet: one town's pipes */}
      {Cw > 0.001 && <g opacity={Cw} transform={`translate(${lerp(0, 760, shrink)} ${lerp(0, 330, shrink)}) scale(${lerp(1, 0.2, shrink)})`}>
        <g opacity={win(f, s36, town36, 8)} transform={`translate(960 560) scale(${pop(f, s36)})`}>
          <circle r={240} fill={A.water} /><path d="M-120 -150 Q-40 -200 20 -120 Q80 -60 40 0 Q-20 60 -100 20 Q-180 -40 -120 -150 Z M60 60 Q140 40 180 100 Q140 180 60 150 Z" fill={A.grass} />
          <No x={0} y={0} r={270} o={on(f, dry36, 8)} /><Tag x={0} y={310} t="THE WHOLE PLANET" size={40} o={on(f, planet36, 8)} /></g>
        <g opacity={on(f, town36, 10)}>
          <WaterTower x={960} y={G} s={1.15} fill={0.85} share={0.29} label="ONE TOWN" />
          {[180, 360, 540].map((x, k) => <House key={k} x={x} y={G} s={0.9} c={['#F4C9A0', '#CFE3C0', '#F2DCA8'][k]} o={on(f, homes36 + k * 3, 8)} />)}
          <Pipe d={`M900 ${G - 30} L120 ${G - 30}`} f={f} w={14} o={on(f, homes36, 8)} />
          <Pipe d={`M1030 ${G - 30} L1300 ${G - 30}`} f={f} w={30} o={on(f, giant36, 8)} />
          <DataCenter x={1600} y={G} s={0.9} f={f} vapor={1} o={on(f, giant36 - 4, 10)} />
          <Tag x={360} y={G - 330} t="HOMES" size={40} o={on(f, homes36, 8)} /><Tag x={1600} y={G - 380} t="ONE GIANT CUSTOMER" size={40} bg={A.heat} fg={A.paper} o={on(f, giant36, 8)} />
        </g>
      </g>}
      {Cw > 0.001 && <Phone x={960} y={540} s={1.6 * on(f, c('s37:down'), 14)} p={0} o={on(f, c('s37:down'), 10)} />}
      {Cw > 0.001 && <g opacity={win(f, much37, shrink37 + 6, 8)}><Drop x={1600} y={G - 560} s={1.6 * pop(f, much37)} /><g opacity={on(f, question37, 8)} transform={`translate(1600 ${G - 740})`}><rect x={-60} y={-40} width={120} height={80} rx={26} fill={A.paper} stroke={A.water} strokeWidth={5} /><text y={22} textAnchor="middle" fill={A.water} style={BB(60)}>?</text></g></g>}
      <Vig id="aq-tap" />
      <Headline f={f} lines={[[c('s25'), 'STEP 2: WHERE IT COMES FROM', A.ink, 90], [s26, 'MOSTLY DRINKING WATER', A.waterD, 94], [s27, 'FROM THE CITY SYSTEM', A.ink, 94], [s29, 'ONE TOWN: THE DALLES', A.ink, 94], [s33, 'WHAT THE NUMBERS SHOWED', A.ink, 92], [s35, 'THE DEAL', A.ink, 100], [s36, "ONE TOWN'S PIPES", A.ink, 96], [shrink37, 'NOW: ONE QUESTION', A.ink, 94]]} />
    </g>
  )
}

export const AQ_TAP = makePiece('aq-tap', "Step 2, where the water comes from: a seawater wave panel and a muddy river panel are crossed out; a big glass of clear water inside a blue ring that fills to 78% (POTABLE = clean enough to drink); a town water tower pipes water to houses and to a data center; signals fly in from everywhere and a red pin drops on one exact place; The Dalles between basalt cliffs on the Columbia River with Google's data center; a city official crosses arms by a padlocked WATER USE folder (kept secret); a newspaper and a courthouse (the city sues the paper), a $100,000+ bag from Google; the padlock falls open (case dropped, numbers out); the city tower turns 29% orange (355 million gallons in 2021); two bars show nearly three times in five years; a new pipe slides in ($28.5 million upgrade paid by Google) and a worker hands a WATER RIGHTS deed to the city; a globe is crossed (not the whole planet); one town tower shared by homes and one giant data center, then the picture shrinks into a phone screen", {
  mood: 'light', Component: Tap,
  beats: ["s25:picture", "s25:seawater", "s25:dirty", "s25:mostly", "s25:don't", "s26", "s26:78", "s26:potable", "s26:drink", "s27", "s27:buy", "s27:city", "s27:houses", "s28", "s28:anywhere", "s28:exact", "s28:place", "s29", "s29:dalles", "s29:columbia", "s29:google", "s30", "s30:secret", "s31:newspaper", "s31:sued", "s31:100000", "s32", "s32:dropped", "s32:numbers", "s33", "s33:355", "s34", "s34:29", "s34:three", "s34:five", "s26:took", "s26:centers", "s28:always", "s28:taken", "s35:system", "s35:handed", "s34:whole", "s34:city", "s37:much", "s37:question", "s35", "s35:285", "s35:upgrade", "s35:rights", "s35:city", "s36", "s36:planet", "s36:dry", "s36:town's", "s36:homes", "s36:giant", "s37", "s37:shrink", "s30:city", "s28:part", "s28:answer", "s31:google", "s33:google's", "s33:city's", "s35:agreed", "s37:down"],
  sfx: [['s28:exact', 'pop', 0.12], ['s31:sued', 'thud', 0.1], ['s34:29', 'ding', 0.12]] })
