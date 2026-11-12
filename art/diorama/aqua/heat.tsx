// ---------------------------------------------------------------- s10–s24: step one — why a computer gets thirsty.
// A) inside the hall: server racks with blinking chips; a power cable lights them; they glow hot with shimmer;
//    a warm laptop, then the hall fills wall to wall with racks; a thermometer climbs and the racks slow (lights dim).
// B) the cut-away cooling tower: a sweating face first (sweat dries off), then warm water piped in from the hall is
//    sprayed down, fans spin and pull air in, part of it rises as vapour, cool water flows back, fresh water tops it up.
// C) Google 2024 as ten buckets: in 9.9 billion gallons, 2 buckets drain back out (2.1B), 8 rise as vapour (7.8B);
//    then the buckets go and a pipe leads off to a "?".
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from '../aimoney/common'
import { A, BB, Bucket, CoolingTower, Drop, G, Pipe, Rack, Tag, Vapor, Vig, World, win , bump, around } from './kit'

const Heat: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10'), chips10 = c('s10:chips'), buildings10 = c('s10:buildings'), centers10 = c('s10:centers')
  const almost11 = c('s11:almost'), all11 = c('s11:all'), ends11 = c('s11:ends'), most23 = c('s23:most'), tower19 = c('s19:tower'), sky19b = c('s19:sky'), s11 = c('s11'), electricity11 = c('s11:electricity'), heat11 = c('s11:heat')
  const answer10 = c('s10:answer'), made10 = c('s10:made'), wall12 = c('s12:wall'), machines12 = c('s12:machines'), laptop12 = c('s12:laptop'), warm12 = c('s12:warm'), picture12 = c('s12:picture'), packed12 = c('s12:packed'), powerful12 = c('s12:powerful')
  const s13 = c('s13'), carried13 = c('s13:carried'), slow13 = c('s13:slow'), damaged13 = c('s13:damaged')
  const s14 = c('s14'), efficient14 = c('s14:energyefficient'), water14 = c('s14:water')
  const s15 = c('s15'), sweat15 = c('s15:sweat'), skin15 = c('s15:skin')
  const s16 = c('s16'), warm16 = c('s16:warm'), sprayed16 = c('s16:sprayed'), tower16 = c('s16:tower'), fans16 = c('s16:fans'), air16 = c('s16:air')
  const s17 = c('s17'), evaporates17 = c('s17:evaporates'), vapor17 = c('s17:vapor'), takes17 = c('s17:takes'), rest17 = c('s17:rest'), cooler17 = c('s17:cooler')
  const machines18 = c('s18:machines'), picks18 = c('s18:picks'), drifts19 = c('s19:drifts'), every23 = c('s23:every'), floating23 = c('s23:floating')
  const s18 = c('s18'), back18 = c('s18:back'), around18 = c('s18:around'), again18 = c('s18:again')
  const s19 = c('s19'), gone19 = c('s19:gone'), sky19 = c('s19:sky'), topped19 = c('s19:topped'), fresh19 = c('s19:fresh')
  const s20 = c('s20'), borrows20 = c('s20:borrows'), uses20 = c('s20:uses')
  const s21 = c('s21'), y2024 = c('s21:2024'), took21 = c('s21:took'), b99 = c('s21:99')
  const s22 = c('s22'), b21 = c('s22:21'), wastewater22 = c('s22:wastewater'), b78 = c('s22:78'), never22 = c('s22:never')
  const s23 = c('s23'), eight23 = c('s23:8'), good23 = c('s23:good'), vapor23 = c('s23:vapor')
  const s24 = c('s24'), where24 = c('s24:where')

  const Aw = win(f, 0, s14 + 4, 10), Bw = win(f, s14 - 4, s20, 10), Cw = on(f, s20 - 6, 10)
  const heat = on(f, heat11, 16)
  const fill = on(f, packed12, 20)
  const temp = on(f, s13, 24)

  return (
    <g>
      <World id="aq-heat" f={f} mood={Bw > 0.5 ? 'day' : 'cool'} hills={Bw > 0.5} />
      {/* # A) the hall of hot chips */}
      {Aw > 0.001 && <g opacity={Aw}>
        <rect x={-60} y={180} width={2040} height={G - 180} fill="#DDE7EC" />
        {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-40 + k * 240} y={180} width={14} height={G - 180} fill="#C7D3DA" />)}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, chips10 + k * 3, 8)} transform={around(560 + k * 260, G, bump(f, c('s14:carry'), c('s14:away')))}><g opacity={1 - 0.85 * win(f, laptop12 - 4, packed12, 8)}><Rack x={560 + k * 260} y={G} s={1.25} f={f} heat={heat} seed={k + 1} /></g></g>)}
        {[0, 1, 2, 3].map((k) => <g key={'b' + k} opacity={fill}><Rack x={lerp(k < 2 ? -200 : 2120, k < 2 ? 130 + k * 200 : 1590 + (k - 2) * 200, fill)} y={G} s={1.25} f={f} heat={heat} seed={k + 9} /></g>)}
        {/* power cable */}
        <g opacity={win(f, electricity11, warm12, 8)}><Pipe d={`M-40 360 L1980 360`} f={f} w={14} col={A.gold} /><g transform={`translate(300 360) scale(${pop(f, electricity11)})`}><path d="M0 -50 l-30 60 h30 l-24 56" fill="none" stroke={A.goldD} strokeWidth={10} strokeLinejoin="round" /></g></g>
        <g opacity={win(f, almost11, laptop12, 6)} transform={`translate(560 470) scale(${pop(f, almost11)})`}><path d="M10 -40 L-20 4 L0 4 L-8 40 L22 -6 L4 -6 Z" fill={A.gold} stroke={A.goldD} strokeWidth={4} /></g><g opacity={win(f, all11, laptop12, 6)} transform={`translate(820 470) scale(${pop(f, all11)})`}><path d="M10 -40 L-20 4 L0 4 L-8 40 L22 -6 L4 -6 Z" fill={A.gold} stroke={A.goldD} strokeWidth={4} /></g><g opacity={win(f, ends11, laptop12, 6)} transform={`translate(1080 470) scale(${pop(f, ends11)})`}><path d="M10 -40 L-20 4 L0 4 L-8 40 L22 -6 L4 -6 Z" fill={A.gold} stroke={A.goldD} strokeWidth={4} /></g><g opacity={win(f, heat11, laptop12, 6)} transform={`translate(1340 470) scale(${pop(f, heat11)})`}><path d="M10 -40 L-20 4 L0 4 L-8 40 L22 -6 L4 -6 Z" fill={A.gold} stroke={A.goldD} strokeWidth={4} /></g>
        <g opacity={win(f, answer10, chips10 + 6, 6)} transform={`translate(${lerp(300, 900, on(f, made10, 16))} 500) scale(${pop(f, answer10)})`}><rect x={-60} y={-40} width={120} height={80} rx={26} fill={A.paper} stroke={A.water} strokeWidth={5} /><text y={20} textAnchor="middle" fill={A.water} style={BB(56)}>AI</text></g>
        <Tag x={960} y={250} t="DATA CENTER" size={44} o={win(f, centers10, s11, 8)} />
        <Tag x={960} y={250} t="ELECTRICITY → HEAT" size={50} bg={A.heat} fg={A.paper} o={win(f, heat11, laptop12, 8)} />
        {/* the warm laptop */}
        <g opacity={win(f, laptop12, picture12 + 6, 8)} transform={`translate(960 ${G - 330}) scale(${pop(f, laptop12)})`}>
          <rect x={-200} y={-140} width={400} height={250} rx={16} fill="#2C3E4E" /><rect x={-180} y={-122} width={360} height={214} rx={8} fill="#BFE4F2" />
          <path d="M-250 110 L250 110 L280 150 L-280 150 Z" fill="#8EA3B2" />
          <g opacity={on(f, warm12, 10)}>{[0, 1, 2].map((k) => <path key={k} d={`M${-80 + k * 80} -170 q14 -26 0 -52 q-14 -26 0 -52`} fill="none" stroke={A.heatL} strokeWidth={9} strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(f / 6 + k)} />)}</g>
        </g>
        <Tag x={960} y={250} t="WALL TO WALL" size={48} o={win(f, wall12, s13, 8)} />
        <g opacity={win(f, powerful12, s13, 8)}>{[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={300 + k * 270} cy={G - 380} r={10 + 6 * Math.sin((f - machines12) / 5 + k)} fill="#6FE3A3" opacity={on(f, machines12 + k * 2, 6)} />)}</g>
        {/* the thermometer */}
        <g opacity={win(f, s13, s14 + 4, 8)} transform={`translate(960 420) scale(${bump(f, c('s13:carried'), c('s13:time'))})`}>
          <rect x={-300} y={-30} width={600} height={60} rx={30} fill={A.paper} stroke={A.ink2} strokeWidth={5} />
          <circle cx={-320} r={54} fill={A.red} /><rect x={-300} y={-14} width={lerp(40, 580, temp)} height={28} rx={14} fill={A.red} />
        </g>
        <Tag x={960} y={250} t="TOO HOT: CHIPS SLOW DOWN" size={46} bg={A.red} fg={A.paper} o={win(f, slow13, s14, 8)} />
        <Tag x={960} y={520} t="AND CAN BE DAMAGED" size={40} o={win(f, damaged13, s14, 8)} />
      </g>}
      {/* # B) the cooling tower */}
      {Bw > 0.001 && <g opacity={Bw}>
        {/* water carries heat: a drop appears first */}
        <g opacity={win(f, water14, s15 + 4, 8)}><Drop x={960} y={560} s={2.4 * pop(f, water14)} /><Tag x={960} y={720} t="WATER CARRIES HEAT" size={44} o={on(f, efficient14 - 4, 8)} /></g>
        {/* sweat on skin */}
        <g opacity={win(f, s15, s16, 8)} transform="translate(960 600)">
          <circle r={190} fill="#E9B48C" /><circle cx={-60} cy={-30} r={14} fill={A.ink} /><circle cx={60} cy={-30} r={14} fill={A.ink} /><path d="M-50 60 Q0 90 50 60" fill="none" stroke={A.ink} strokeWidth={10} strokeLinecap="round" />
          {[0, 1, 2].map((k) => { const rise = span(f, skin15 + k * 4, skin15 + 30 + k * 4); return <Drop key={k} x={-120 + k * 120} y={-140 - rise * 140} s={0.7 * on(f, sweat15 + k * 3, 6)} o={1 - rise} /> })}
          <Vapor x={0} y={-220} f={f} t={on(f, skin15, 10)} s={0.6} />
        </g>
        <g opacity={on(f, s16, 10)}>
          {[0, 1].map((k) => <g key={k} transform={`translate(${130 + k * 170} 0) ${around(0, G, bump(f, c('s16:carrying')))}`}><Rack x={0} y={G} s={0.8} f={f} heat={1 - 0.6 * on(f, back18, 14)} seed={k + 3} /></g>)}
          <CoolingTower x={1220} y={G} s={1.05 * bump(f, c('s16:tall'), c('s17:turns'))} f={f} spray={on(f, sprayed16, 8)} fan={on(f, fans16, 10)} vapor={on(f, evaporates17, 12) * (1 - 0.3 * on(f, s20 - 10, 10))} warm={on(f, warm16, 10)} cool={on(f, back18, 10)} makeup={on(f, topped19, 10)} />
          <g opacity={win(f, tower19, s20, 8)}><rect x={1700} y={G - 120} width={140} height={20} rx={10} fill={A.aqua} opacity={0.5 + 0.5 * Math.sin((f - tower19) / 4)} /></g>
          <g opacity={win(f, sky19b, s20, 8)}><circle cx={1640} cy={190} r={110} fill="none" stroke="#FFFFFF" strokeWidth={10} opacity={0.6} /></g>
          <Tag x={1620} y={360} t="COOLING TOWER" size={44} o={win(f, tower16, fans16, 8)} />
          <Tag x={600} y={G - 450} t="WARM WATER IN" size={38} bg={A.heat} fg={A.paper} o={win(f, warm16, sprayed16 + 20, 8)} />
          <Tag x={1220} y={250} t="FANS PULL AIR THROUGH" size={44} o={win(f, fans16, s17, 8)} />
          <Tag x={1620} y={360} t="PART EVAPORATES" size={44} bg={A.water} fg={A.paper} o={win(f, evaporates17, s18, 8)} />
          <Tag x={600} y={G - 130} t="COOLER WATER BACK" size={38} bg={A.waterD} fg={A.paper} o={win(f, back18, s19, 8)} />
          <Tag x={1620} y={360} t="GONE INTO THE SKY" size={44} o={win(f, gone19, topped19, 8)} />
          <Tag x={1700} y={G - 160} t="FRESH WATER TOPS UP" size={36} o={win(f, fresh19, s20, 8)} />
          {/* heat leaving with the vapour (s17), the cooler basin, the loop arrow (s18), a cloud forming in the sky (s19) */}
          <g opacity={win(f, takes17, s18, 8)}>{[0, 1, 2].map((k) => <path key={k} d={`M${1140 + k * 80} ${G - 600} q14 -26 0 -52 q-14 -26 0 -52`} fill="none" stroke={A.heat} strokeWidth={9} strokeLinecap="round" transform={`translate(0 ${-((f * 1.5 + k * 20) % 60)})`} opacity={0.8} />)}</g>
          <g opacity={win(f, rest17, s18 + 10, 8)}><rect x={1020} y={G - 112} width={400} height={20} rx={10} fill={A.aqua} opacity={0.6 + 0.4 * on(f, cooler17, 10)} /></g>
          <g opacity={win(f, machines18, s19, 8)} transform={`translate(300 ${G - 470})`}><circle r={60} fill="none" stroke={A.water} strokeWidth={10} strokeDasharray="300 80" transform={`rotate(${(f - machines18) * 6})`} />
            <circle r={24} fill={on(f, picks18, 8) > 0.5 && f < again18 ? A.heat : A.water} /></g>
          <g opacity={win(f, drifts19, s20, 10)} transform={`translate(${1220 + 300 * on(f, drifts19, 30)} ${300 - 60 * on(f, drifts19, 30)})`}><ellipse rx={120} ry={36} fill="#FFFFFF" /><ellipse cx={-50} cy={-20} rx={60} ry={34} fill="#FFFFFF" /><ellipse cx={46} cy={-26} rx={70} ry={38} fill="#FFFFFF" /></g>
        </g>
      </g>}
      {/* # C) borrowed vs used up: Google's 2024 buckets */}
      {Cw > 0.001 && <g opacity={Cw}>
        <g opacity={win(f, s20, s21, 8)}>
          <g transform="translate(620 640)"><Bucket x={0} y={0} s={2} fill={1} /><path d="M120 -60 q80 -60 160 0" fill="none" stroke={A.green} strokeWidth={10} strokeLinecap="round" /><Bucket x={420} y={0} s={2} fill={on(f, borrows20, 16)} /><Tag x={210} y={140} t="BORROWED: COMES BACK" size={38} o={on(f, borrows20, 8)} /></g>
          <g transform="translate(1440 640)" opacity={on(f, uses20 - 4, 8)}><Bucket x={0} y={0} s={2} fill={1 - on(f, uses20, 20)} /><Vapor x={0} y={-180} f={f} t={on(f, uses20, 10)} s={0.7} /><Tag x={0} y={140} t="USED UP: GONE" size={38} bg={A.water} fg={A.paper} o={on(f, uses20 + 4, 8)} /></g>
        </g>
        <g opacity={on(f, s21, 10) * (1 - on(f, s24, 10))}>
          <rect x={360} y={330} width={1200} height={70} rx={16} fill={A.paper} opacity={on(f, y2024, 8)} />
          <text x={960} y={382} textAnchor="middle" fill={A.ink} style={BB(52)} opacity={on(f, y2024, 8)}>GOOGLE'S DATA CENTERS, 2024</text>
          {Array.from({ length: 10 }, (_, k) => {
            const back = k >= 8, go = back ? on(f, b21, 20) : span(f, b78 + (k * 3), b78 + 50 + k * 3)
            const x = 285 + k * 150, y = G - 110
            return <g key={k} opacity={on(f, took21 + k * 2, 6)}>
              {back ? <g opacity={1 - 0.7 * go} transform={`translate(0 ${lerp(0, 90, go)})`}><Bucket x={x} y={y} s={1.5} fill={on(f, b99, 12)} col={'#7EA8B8'} /></g>
                : <g><Bucket x={x} y={y} s={1.5 * bump(f, c('s21:gallons'))} fill={on(f, b99, 12) * (1 - go)} /><Vapor x={x} y={y - 120} f={f + k * 9} t={go > 0 && go < 1 ? 1 : 0} s={0.45} spread={30} /></g>}
            </g> })}
          <Tag x={960} y={500} t="TOOK IN ≈ 9.9 BILLION GALLONS" size={52} bg={A.water} fg={A.paper} o={win(f, b99, b21, 8)} />
          <Pipe d={`M1440 ${G + 40} L1980 ${G + 40}`} f={f} w={22} o={on(f, b21, 8)} />
          <Tag x={1500} y={G - 330} t="≈ 2.1 BILLION BACK AS WASTEWATER" size={36} o={on(f, wastewater22, 8)} />
          <Tag x={700} y={500} t="≈ 7.8 BILLION NEVER CAME BACK" size={48} bg={A.heat} fg={A.paper} o={on(f, never22, 8) * (1 - on(f, eight23, 8))} />
          <Tag x={700} y={500} t="≈ 8 IN 10 GALLONS GONE" size={56} bg={A.heat} fg={A.paper} o={on(f, eight23, 8)} />
          <Tag x={700} y={600} t="MOSTLY AS VAPOR" size={40} o={on(f, vapor23, 8)} />
          <g opacity={on(f, good23, 8)}>{Array.from({ length: 8 }, (_, k) => <text key={k} x={285 + k * 150} y={G - 40} textAnchor="middle" fill={A.heat} style={BB(40)} opacity={on(f, good23 + k * 2, 6)}>GONE</text>)}</g>
          <g opacity={on(f, most23, 8)}><Vapor x={1200} y={G - 300} f={f + 40} t={1} s={0.8} spread={200} /></g>
          <g opacity={on(f, every23, 8)}><rect x={210} y={G - 290} width={1200} height={200} rx={24} fill="none" stroke={A.heat} strokeWidth={6} strokeDasharray="20 14" /></g>
          <Vapor x={760} y={G - 300} f={f} t={win(f, floating23, s24, 10)} s={1} spread={300} />
        </g>
        <g opacity={on(f, s24, 10)}>
          <CoolingTower x={1380} y={G} s={1.0} f={f} vapor={1} spray={1} makeup={1} />
          <Pipe d={`M-40 ${G - 60} L1170 ${G - 60}`} f={f} w={26} />
          <g transform={`translate(420 ${G - 340}) scale(${1.3 * pop(f, where24)})`} opacity={on(f, where24, 8)}><circle r={110} fill={A.paper} stroke={A.water} strokeWidth={8} /><text y={42} textAnchor="middle" fill={A.water} style={BB(140)}>?</text></g>
        </g>
      </g>}
      <Vig id="aq-heat" />
      <Headline f={f} lines={[[s10, 'STEP 1: THIRSTY CHIPS', A.ink, 96], [s14, 'WATER CARRIES THE HEAT', A.waterD, 92], [s16, 'INSIDE A COOLING TOWER', A.ink, 92], [s20, 'BORROWED VS USED UP', A.ink, 94], [s24, 'WHERE DOES IT COME FROM?', A.ink, 92]]} />
    </g>
  )
}

export const AQ_HEAT = makePiece('aq-heat', "Step 1, why a computer gets thirsty: a hall of server racks with blinking chips; a power cable lights them and they glow hot with heat shimmer; a warm laptop, then racks slide in wall to wall; a thermometer climbs red (chips slow down); a water drop (water carries heat); a sweating face whose sweat drops dry into vapour; a cut-away cooling tower: warm water piped in from the racks is sprayed down, the roof fan spins, part rises as vapour, cooler water flows back, fresh water tops it up; two buckets (borrowed comes back, used up rises as vapour); Google 2024 as ten buckets: 9.9 billion gallons in, two drain back out as wastewater (2.1B), eight rise away as vapour (7.8B, 8 in 10 gone); a pipe leads off to a question mark", {
  mood: 'light', Component: Heat,
  beats: ["s10", "s10:chips", "s10:centers", "s11:almost", "s11:all", "s11:ends", "s23:most", "s19:tower", "s19:sky", "s11", "s11:electricity", "s11:heat", "s10:answer", "s10:made", "s12:wall", "s12:machines", "s12:laptop", "s12:warm", "s12:picture", "s12:packed", "s12:powerful", "s13", "s13:slow", "s13:damaged", "s14", "s14:energyefficient", "s14:water", "s15", "s15:sweat", "s15:skin", "s16", "s16:warm", "s16:sprayed", "s16:tower", "s16:fans", "s17", "s17:evaporates", "s17:takes", "s17:rest", "s17:cooler", "s18:machines", "s18:picks", "s19:drifts", "s23:every", "s23:floating", "s18", "s18:back", "s18:again", "s19", "s19:gone", "s19:topped", "s19:fresh", "s20", "s20:borrows", "s20:uses", "s21", "s21:2024", "s21:took", "s21:99", "s22", "s22:21", "s22:wastewater", "s22:78", "s22:never", "s23", "s23:8", "s23:good", "s23:vapor", "s24", "s24:where", "s14:carry", "s14:away", "s13:carried", "s13:time", "s16:carrying", "s16:tall", "s17:turns", "s21:gallons"],
  sfx: [['s11:heat', 'whoosh', 0.1], ['s16:sprayed', 'swish', 0.12], ['s22:78', 'whoosh', 0.1]] })
