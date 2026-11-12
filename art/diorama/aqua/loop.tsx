// ---------------------------------------------------------------- s67–s77: step five — the trade-off.
// A) a see-saw: a water drop on one end, a lightning bolt on the other; saving water tips it towards electricity.
//    The steaming cooling tower is crossed; a big chip with a cold plate joins a closed loop to a chiller box:
//    liquid goes round and round, no vapour. Microsoft (from August 2024): a tank of 125 million liters saved a year,
//    ≈ 33 million gallons ≈ 1,100 people's home water.
// B) the chiller's power meter ticks up a little; the power plant steams, then a wind turbine and a solar panel
//    appear with no steam; a treatment plant pipes grey treated wastewater to a data center; a ring a little over 1/5.
// C) a pin moves from a hot desert site to a cool, wet northern site with pines and a lake; three weights (water,
//    electricity, money) on a balance; one town tower shared by homes and the data center.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { A, BB, Chip, CoolingTower, DataCenter, Drop, G, House, No, Pipe, PowerPlant, Tag, Vig, WaterTower, World, win , bump, around } from './kit'

const Bolt: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M10 -60 L-30 6 L0 6 L-12 60 L32 -10 L4 -10 Z" fill={A.gold} stroke={A.goldD} strokeWidth={5} strokeLinejoin="round" /></g> : null
const CoinD: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><circle cy={5} r={44} fill={A.goldD} /><circle r={44} fill={A.gold} /><text y={16} textAnchor="middle" fill={A.goldD} style={BB(52)}>$</text></g>
const LOOKS = ['buyer', 'worker', 'owner', 'investorF', 'investor', 'zoe', 'max']

const Loop: React.FC<PieceProps> = ({ f, c }) => {
  const they67 = c('s67:they'), catch67 = c('s67:catch'), saving67 = c('s67:saving'), electricity67 = c('s67:electricity')
  const s68 = c('s68'), evaporate68 = c('s68:evaporate'), chips68 = c('s68:chips'), closed68 = c('s68:closed')
  const s69 = c('s69'), liquid69 = c('s69:liquid'), heat69 = c('s69:heat'), chiller69 = c('s69:chiller'), back69 = c('s69:back'), round69 = c('s69:round'), none69 = c('s69:none')
  const s70 = c('s70'), microsoft70 = c('s70:microsoft'), y2024 = c('s70:august'), l125 = c('s70:125'), year70 = c('s70:year')
  const says70 = c('s70:says'), each70 = c('s70:each'), s71 = c('s71'), g33 = c('s71:33'), p1100 = c('s71:1100')
  const mean73 = c('s73:mean'), water73 = c('s73:water'), back73 = c('s73:back'), home71 = c('s71:home'), whole71 = c('s71:whole'), says72 = c('s72:says'), yearly72 = c('s72:yearly'), clean74 = c('s74:clean'), isnt74 = c("s74:isn't"), s72 = c('s72'), power72 = c('s72:power'), little72 = c('s72:little')
  const s73 = c('s73'), plant73 = c('s73:plant'), wind73 = c('s73:wind'), solar73 = c('s73:solar')
  const s74 = c('s74'), nobody74 = c('s74:nobody'), treated74 = c('s74:treated'), wastewater74 = c('s74:wastewater')
  const s75 = c('s75'), fifth75 = c('s75:fifth')
  const s76 = c('s76'), place76 = c('s76:place'), plentiful76 = c('s76:plentiful'), air76 = c('s76:air'), work76 = c('s76:work')
  const s77 = c('s77'), water77 = c('s77:water'), electricity77 = c('s77:electricity'), money77 = c('s77:money'), town77 = c('s77:town'), shares77 = c('s77:shares')

  const Aw = win(f, 0, s72, 10), Bw = win(f, s72 - 6, s76, 10), Cw = on(f, s76 - 6, 10)
  const tilt = lerp(0, 12, on(f, electricity67, 16))
  const loopP = on(f, closed68, 12)
  const LOOP = 'M600 380 L1380 380 L1380 760 L600 760 Z'
  const pin = on(f, plentiful76, 24)

  return (
    <g>
      <World id="aq-loop" f={f} mood={Cw > 0.5 ? 'cool' : 'day'} />
      {/* # A) the see-saw and the closed loop */}
      {Aw > 0.001 && <g opacity={Aw}>
        <g opacity={win(f, they67, s68, 8)} transform={`translate(960 640) scale(${bump(f, c('s67:catch'))})`}>
          <path d="M-60 140 L0 40 L60 140 Z" fill={A.steelD} />
          <g transform={`rotate(${tilt})`}><rect x={-520} y={10} width={1040} height={30} rx={15} fill="#B98A5E" />
            <g transform={`rotate(${-tilt})`}><Drop x={-420} y={-50} s={2.0 * pop(f, saving67)} o={on(f, saving67 - 4, 6)} /></g>
            <g transform={`translate(420 -60) rotate(${-tilt})`}><Bolt x={0} y={0} s={1.6 * pop(f, electricity67)} o={on(f, electricity67 - 2, 6)} /></g></g>
          <Tag x={-420} y={-230} t="SAVE WATER" size={42} bg={A.water} fg={A.paper} o={on(f, saving67, 8)} />
          <Tag x={420} y={-230} t="USE MORE ELECTRICITY" size={42} bg={A.gold} o={on(f, electricity67, 8)} />
        </g>
        <g opacity={win(f, s68, chips68 + 4, 8)}><CoolingTower x={960} y={G} s={0.95} f={f} spray={1} vapor={1} fan={1} /><No x={960} y={G - 560} r={150} o={on(f, evaporate68, 8)} /></g>
        <g opacity={on(f, chips68, 10)}>
          <path d={LOOP} fill="none" stroke={A.waterD} strokeWidth={34} strokeLinejoin="round" opacity={loopP} />
          <path d={LOOP} fill="none" stroke={A.aqua} strokeWidth={12} strokeDasharray="26 30" strokeDashoffset={-f * 4 * on(f, liquid69, 8)} strokeLinejoin="round" opacity={loopP} />
          <Chip x={600} y={570} s={0.95 * bump(f, c('s69:chips'), c('s71:gallons'))} f={f} heat={1 - on(f, back69, 20) * 0.8} loop={loopP} />
          <g opacity={on(f, chiller69 - 4, 10)} transform={`translate(1380 570) scale(${bump(f, c('s70:designing'))})`}>
            <rect x={-190} y={-150} width={380} height={300} rx={20} fill={A.steel} stroke={A.steelD} strokeWidth={6} />
            {[0, 1].map((k) => <g key={k} transform={`translate(${-80 + k * 160} -30)`}><circle r={60} fill={A.steelD} /><g transform={`rotate(${f * 10})`}><rect x={-50} y={-8} width={100} height={16} rx={8} fill={A.paper} /><rect x={-8} y={-50} width={16} height={100} rx={8} fill={A.paper} /></g></g>)}
            <text y={110} textAnchor="middle" fill={A.paper} style={BB(52)}>CHILLER</text>
          </g>
          <Tag x={960} y={300} t="A CLOSED LOOP" size={48} bg={A.water} fg={A.paper} o={win(f, closed68, heat69, 8)} />
          <Tag x={960} y={300} t="HEAT → CHILLER → BACK" size={48} o={win(f, heat69, round69, 8)} />
          <Tag x={960} y={300} t="ROUND AND ROUND" size={48} o={win(f, round69, none69, 8)} />
          <Tag x={960} y={300} t="NONE OF IT EVAPORATES" size={48} bg={A.green} fg={A.paper} o={win(f, none69, s70, 8)} />
          <Tag x={960} y={300} t="MICROSOFT" size={46} o={win(f, microsoft70, y2024, 8)} /><Tag x={960} y={300} t="MICROSOFT, FROM AUGUST 2024" size={46} o={win(f, y2024, l125, 8)} />
          <Tag x={960} y={300} t="≈ 125 MILLION LITERS SAVED A YEAR" size={46} bg={A.green} fg={A.paper} o={win(f, l125, s71, 8)} />
          <g opacity={win(f, each70, s71, 8)}><DataCenter x={1700} y={300} s={0.3 * pop(f, each70)} f={f} /></g>
          <g opacity={win(f, says70, l125, 8)} transform="translate(1700 300)"><rect x={-80} y={-50} width={160} height={100} rx={30} fill={A.paper} stroke={A.ink2} strokeWidth={5} /><path d="M-20 50 L-40 80 L10 50 Z" fill={A.paper} stroke={A.ink2} strokeWidth={5} />{[0, 1, 2].map((k) => <circle key={k} cx={-36 + k * 36} r={10} fill={A.ink2} />)}</g>
          <Tag x={960} y={930} t="PER DATA CENTER" size={36} o={win(f, year70, s71, 8)} />
          <Tag x={960} y={300} t="≈ 33 MILLION GALLONS" size={48} bg={A.green} fg={A.paper} o={win(f, g33, p1100, 8)} />
          <Tag x={960} y={300} t="≈ 1,100 PEOPLE'S HOME WATER FOR A YEAR" size={44} bg={A.green} fg={A.paper} o={on(f, p1100, 8)} />
          <g opacity={win(f, home71, s72, 8)}><House x={1700} y={G - 80} s={0.6 * pop(f, home71)} /></g>
          <g opacity={win(f, whole71, s72, 8)} transform="translate(250 300)"><rect x={-70} y={-80} width={140} height={160} rx={12} fill={A.paper} stroke={A.ink2} strokeWidth={4} /><rect x={-70} y={-80} width={140} height={36} rx={12} fill={A.red} /><text y={40} textAnchor="middle" fill={A.ink} style={BB(44)}>365</text></g>
          <g opacity={on(f, p1100, 8)}>{Array.from({ length: 11 }, (_, k) => <Mini key={k} look={LOOKS[k % 7]} x={460 + k * 100} y={G + 20} scale={0.4} frame={f} seed={k + 61} mood="happy" />)}</g>
        </g>
      </g>}
      {/* # B) power, wind/solar, wastewater */}
      {Bw > 0.001 && <g opacity={Bw}>
        <g opacity={win(f, s72, s73, 8)}>
          <g transform="translate(640 600)"><rect x={-190} y={-150} width={380} height={300} rx={20} fill={A.steel} stroke={A.steelD} strokeWidth={6} /><text y={110} textAnchor="middle" fill={A.paper} style={BB(52)}>CHILLER</text>
            {[0, 1].map((k) => <g key={k} transform={`translate(${-80 + k * 160} -30)`}><circle r={60} fill={A.steelD} /><g transform={`rotate(${f * 10})`}><rect x={-50} y={-8} width={100} height={16} rx={8} fill={A.paper} /></g></g>)}</g>
          <Pipe d={`M840 600 L1120 600`} f={f} w={14} col={A.gold} o={on(f, power72, 8)} />
          <g transform="translate(1340 600)" opacity={on(f, power72, 8)}><circle r={150} fill={A.paper} stroke={A.ink2} strokeWidth={8} />
            <path d="M-110 30 A110 110 0 0 1 110 30" fill="none" stroke="#D6E3EA" strokeWidth={18} />
            <line x1={0} y1={30} x2={0} y2={-90} stroke={A.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${lerp(-40, -20, on(f, little72, 20))} 0 30)`} />
            <Bolt x={0} y={90} s={0.5} /></g>
          <g opacity={win(f, says72, little72, 8)} transform="translate(1340 330)"><rect x={-80} y={-50} width={160} height={100} rx={30} fill={A.paper} stroke={A.ink2} strokeWidth={5} />{[0, 1, 2].map((k) => <circle key={k} cx={-36 + k * 36} r={10} fill={A.ink2} />)}</g>
          <g opacity={on(f, yearly72, 8)} transform="translate(1600 600)"><rect x={-70} y={-80} width={140} height={160} rx={12} fill={A.paper} stroke={A.ink2} strokeWidth={4} /><rect x={-70} y={-80} width={140} height={36} rx={12} fill={A.red} /><text y={40} textAnchor="middle" fill={A.ink} style={BB(56)}>12</text></g>
          <Tag x={1340} y={300} t="ENERGY USE: UP A LITTLE" size={46} bg={A.gold} o={on(f, little72, 8)} />
        </g>
        <g opacity={win(f, s73, s74, 8)}>
          <PowerPlant x={560} y={G} s={0.95} f={f} steam={on(f, plant73, 12)} />
          <Tag x={560} y={250} t="MORE POWER, MORE WATER THERE" size={42} o={on(f, plant73, 8)} />
          <g opacity={on(f, mean73, 8)}><Drop x={900} y={G - 420} s={1.3 * pop(f, mean73)} /></g>
          <g opacity={on(f, water73, 8)}><Drop x={980} y={G - 300} s={1.0 * pop(f, water73)} /></g>
          <g opacity={on(f, back73, 8)}><path d="M1000 400 Q800 320 700 420" fill="none" stroke={A.ink2} strokeWidth={8} strokeDasharray="16 12" /></g>
          <g opacity={on(f, wind73, 8)} transform={`translate(1260 ${G})`}><rect x={-10} y={-460} width={20} height={460} fill={A.paper} stroke={A.steelD} strokeWidth={3} />
            <g transform={`translate(0 -460) rotate(${f * 4})`}>{[0, 120, 240].map((r) => <path key={r} d="M0 0 L-14 -200 Q0 -220 14 -200 Z" fill={A.paper} stroke={A.steelD} strokeWidth={3} transform={`rotate(${r})`} />)}</g><circle cy={-460} r={16} fill={A.steelD} /></g>
          <g opacity={on(f, solar73, 8)} transform={`translate(1640 ${G})`}><path d="M-150 -60 L150 -60 L190 -200 L-110 -200 Z" fill="#2E5C8A" stroke={A.steelD} strokeWidth={4} />{[1, 2].map((k) => <line key={k} x1={-150 + k * 100} y1={-60} x2={-110 + k * 100} y2={-200} stroke="#BFE4F2" strokeWidth={3} />)}<rect x={-10} y={-60} width={20} height={60} fill={A.steelD} /></g>
          <Tag x={1450} y={250} t="WIND AND SOLAR: ALMOST NO WATER" size={42} bg={A.green} fg={A.paper} o={on(f, solar73, 8)} />
        </g>
        <g opacity={win(f, s74, s76, 8)}>
          <g transform={`translate(420 ${G})`} opacity={on(f, treated74 - 6, 10)}><rect x={-200} y={-200} width={400} height={200} fill={A.concrete} /><rect x={-200} y={-200} width={400} height={18} fill={A.concreteD} />
            {[-110, 0, 110].map((x) => <g key={x}><ellipse cx={x} cy={-20} rx={50} ry={16} fill="#7E9AA6" /><ellipse cx={x} cy={-20} rx={40} ry={11} fill="#9DB4BE" /></g>)}</g>
          <Pipe d={`M620 ${G - 60} L1150 ${G - 60}`} f={f} w={26} col="#A7A9A2" o={on(f, wastewater74, 8)} />
          <DataCenter x={1520} y={G} s={0.8 * bump(f, c('s74:sites'), c("s75:google's"))} f={f} vapor={1} />
          <Tag x={420} y={G - 300} t="TREATED WASTEWATER" size={42} o={on(f, wastewater74, 8)} />
          <g opacity={win(f, isnt74, s75, 8)} transform={`translate(960 520) scale(${pop(f, isnt74)})`}><path d="M-70 -100 L70 -100 L56 100 L-56 100 Z" fill="#E6F4FA" stroke={A.steelD} strokeWidth={5} /><path d="M-64 -20 L64 -20 L56 98 L-56 98 Z" fill="#A7A9A2" opacity={0.8} /><No x={0} y={0} r={140} o={on(f, clean74, 8)} /></g>
          <Tag x={960} y={260} t="WATER NOBODY DRINKS" size={50} o={win(f, nobody74, s75, 8)} />
          <g opacity={on(f, s75, 8)} transform={`translate(960 470) scale(${bump(f, c('s75:covered'))})`}>
            <circle r={130} fill="none" stroke="#D6E3EA" strokeWidth={44} />
            <circle r={130} fill="none" stroke="#A7A9A2" strokeWidth={44} strokeDasharray={`${2 * Math.PI * 130 * 0.22 * on(f, s75 + 6, 20)} 9999`} transform="rotate(-90)" />
            <text y={20} textAnchor="middle" fill={A.ink} style={BB(64)}>22%</text>
            <Tag x={0} y={-200} t="A LITTLE OVER 1/5 OF GOOGLE'S WATER, 2024" size={40} o={on(f, fifth75, 8)} />
          </g>
        </g>
      </g>}
      {/* # C) choose the place; the trade-off; the town shares */}
      {Cw > 0.001 && <g opacity={Cw}>
        <g opacity={win(f, s76, s77, 8)}>
          <rect x={-60} y={180} width={1020} height={G - 180} fill="#F6D9AE" />
          <circle cx={460} cy={340} r={80} fill="#FFD27A" />{[0, 1, 2, 3].map((k) => <path key={k} d={`M${160 + k * 180} ${G + 40} l30 20 l-10 20`} fill="none" stroke={A.clayD} strokeWidth={4} />)}
          <Tag x={460} y={250} t="HOT AND DRY" size={44} bg={A.heat} fg={A.paper} />
          {Array.from({ length: 7 }, (_, k) => <path key={k} d={`M${1060 + k * 130} ${G} L${1110 + k * 130} ${G - 200 - (k % 3) * 40} L${1160 + k * 130} ${G} Z`} fill={A.pine} />)}
          <ellipse cx={1480} cy={G + 40} rx={300} ry={40} fill={A.water} opacity={on(f, plentiful76, 10)} />
          {[0, 1].map((k) => <g key={k} transform={`translate(${1300 + k * 360} 330)`} opacity={on(f, air76, 8)}><ellipse rx={110} ry={34} fill="#FFFFFF" />{[0, 1, 2].map((j) => <path key={j} d={`M${-50 + j * 50} 50 q10 20 0 40`} fill="none" stroke={A.aqua} strokeWidth={6} />)}</g>)}
          <Tag x={1460} y={250} t="PLENTY OF WATER, COOL AIR" size={44} bg={A.water} fg={A.paper} o={on(f, plentiful76, 8)} />
          <DataCenter x={lerp(460, 1460, pin)} y={G} s={0.6} f={f} vapor={1 - on(f, air76, 10)} o={on(f, place76, 8)} />
          <g transform={`translate(${lerp(460, 1460, pin)} ${G - 360})`} opacity={on(f, place76, 6)}><path d="M0 0 C-50 -60 -50 -110 0 -110 C50 -110 50 -60 0 0 Z" fill={A.red} /><circle cy={-74} r={16} fill={A.paper} /></g>
          <Tag x={1460} y={G + 80} t="AIR DOES MOST OF THE WORK" size={36} o={on(f, work76, 8)} />
        </g>
        <g opacity={on(f, s77, 8)}>
          <g opacity={1 - on(f, town77, 10)} transform={`translate(960 620) scale(${bump(f, c('s77:trades'), c('s77:company'))})`}>
            <path d="M-40 180 L0 80 L40 180 Z" fill={A.steelD} /><rect x={-460} y={60} width={920} height={24} rx={12} fill="#B98A5E" />
            {[[water77, -320], [electricity77, 0], [money77, 320]].map(([a, x], k) => <g key={k} transform={`translate(${x} ${-40 - 20 * pop(f, a as number)})`} opacity={on(f, a as number, 6)}>
              <rect x={-120} y={70} width={240} height={30} rx={8} fill={A.steel} />
              {k === 0 && <Drop x={0} y={10} s={1.6} />}{k === 1 && <Bolt x={0} y={0} s={1.3} />}{k === 2 && <CoinD x={0} y={0} s={1.3} />}
              <text y={150} textAnchor="middle" fill={A.ink} style={BB(40)}>{['WATER', 'ELECTRICITY', 'MONEY'][k]}</text></g>)}
          </g>
          <g opacity={on(f, town77, 10)}>
            <WaterTower x={960} y={G} s={1.1} fill={0.8} share={0.29} label="TOWN" />
            {[200, 380, 560].map((x, k) => <House key={k} x={x} y={G} s={0.9} c={['#F4C9A0', '#CFE3C0', '#F2DCA8'][k]} />)}
            <Pipe d={`M900 ${G - 30} L140 ${G - 30}`} f={f} w={14} />
            <Pipe d={`M1020 ${G - 30} L1320 ${G - 30}`} f={f} w={28} />
            <DataCenter x={1600} y={G} s={0.8} f={f} vapor={1} />
            <Tag x={960} y={260} t="THE TOWN SHARES THE WATER" size={50} bg={A.water} fg={A.paper} o={on(f, shares77, 8)} />
          </g>
        </g>
      </g>}
      <Vig id="aq-loop" />
      <Headline f={f} lines={[[c('s67'), 'STEP 5: THE TRADE-OFF', A.ink, 96], [s68, 'COOLING WITHOUT VAPOR', A.ink, 94], [s72, 'THE CATCH', A.ink, 100], [s74, 'ANOTHER FIX', A.ink, 100], [s76, 'CHOOSE THE PLACE', A.ink, 98], [s77, 'EVERY CHOICE TRADES', A.ink, 96]]} />
    </g>
  )
}

export const AQ_LOOP = makePiece('aq-loop', "Step 5, the trade-off: a see-saw with a water drop on one end and a lightning bolt on the other tips towards electricity (save water, use more electricity); a steaming cooling tower is crossed out; a big chip with a cold plate joins a closed loop of pipe to a CHILLER box with spinning fans, liquid flowing round and round with no vapour (none of it evaporates); Microsoft from August 2024, ≈ 125 million liters saved a year per data center ≈ 33 million gallons ≈ 1,100 people's home water (a row of little people); the chiller's power meter needle ticks up a little; a power plant steams (more power, more water there), then a wind turbine spins and a solar panel appears (almost no water); a treatment plant pipes grey treated wastewater to a data center, a ring 22% (a little over 1/5); a red pin moves a data center from a hot dry desert to a cool wet pine site with a lake and breezy clouds; a balance with a drop, a bolt and a dollar coin (water, electricity, money); one town tower shared by homes and a data center", {
  mood: 'light', Component: Loop,
  beats: ["s67:they", "s67:saving", "s67:electricity", "s68", "s68:evaporate", "s68:chips", "s68:closed", "s69", "s69:liquid", "s69:heat", "s69:chiller", "s69:back", "s69:round", "s69:none", "s70", "s70:microsoft", "s70:august", "s70:125", "s70:year", "s70:says", "s70:each", "s71", "s71:33", "s71:1100", "s73:mean", "s73:water", "s73:back", "s71:home", "s71:whole", "s72:says", "s72:yearly", "s74:clean", "s74:isn't", "s72", "s72:power", "s72:little", "s73", "s73:plant", "s73:wind", "s73:solar", "s74", "s74:nobody", "s74:treated", "s74:wastewater", "s75", "s75:fifth", "s76", "s76:place", "s76:plentiful", "s76:air", "s76:work", "s77", "s77:water", "s77:electricity", "s77:money", "s77:town", "s77:shares", "s67:catch", "s69:chips", "s71:gallons", "s70:designing", "s74:sites", "s75:google's", "s75:covered", "s77:trades", "s77:company"],
  sfx: [['s68:closed', 'click', 0.12], ['s70:125', 'ding', 0.12], ['s77:shares', 'softpop', 0.1]] })
