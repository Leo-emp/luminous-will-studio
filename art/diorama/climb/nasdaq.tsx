// ---------------------------------------------------------------- s19–s24: it really happened — the Nasdaq, 2000–2015, by moonlight.
// A) a sheet of paper with "−50% → +100%" (maths on paper) folds away and a mountain rises in its place.
// B) the mountain is drawn THROUGH THREE REAL CLOSES only (heights to scale: 5,049 · 1,114 · 5,056; spacing to scale in
//    time; the straight ridges between them are drawn, not data — labelled on screen): MAR 2000 peak flag + NASDAQ + tech
//    chips; a glassy bubble round the peak pops; a red trail runs down to OCT 2002 · 1,114 (−78%); a green dotted trail
//    climbs the long ridge (+353%); the dashed old-record line reaches the APR 2015 flag; a 15 YEARS span runs under it.
import React from 'react'
import { easeOut, lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Label } from '../charts'
import { Alps, Dust, GAIN, GAIN_L, GOLD, Headline, INK, LOSS, LOSS_L, Paper, SKY_N, SNOW, Tag, Vig } from './kit'

const BASE = 1180, HMAX = 700
const hy = (v: number) => BASE - (v / 5056.06) * HMAX                // # height to scale
const tx = (yr: number) => 200 + (yr - 2000.19) * 44                  // # time to scale (years)
const P1 = { x: tx(2000.19), y: hy(5048.62) }, P2 = { x: tx(2002.77), y: hy(1114.11) }, P3 = { x: tx(2015.31), y: hy(5056.06) }

const Nasdaq: React.FC<PieceProps> = ({ f, c }) => {
  const maths = c('s19:maths'), paper = c('s19:paper'), really = c('s19:really'), happened = c('s19:happened')
  const march = c('s20:march'), nasdaq = c('s20:nasdaq'), tech = c('s20:tech'), record = c('s20:record'), d5049 = c('s20:5049')
  const dot = c('s21:dot'), bubble = c('s21:bubble'), burst = c('s21:burst')
  const october = c('s22:october'), fallen = c('s22:fallen'), d1114 = c('s22:1114'), thats = c("s22:that's"), d78 = c('s22:78')
  const climb = c('s23:climb'), d1114b = c('s23:1114'), back = c('s23:back'), d5049b = c('s23:5049'), it23 = c('s23:it'), d353 = c('s23:353')
  const close = c('s24:close'), old = c('s24:old'), april = c('s24:april'), more = c('s24:more'), d15 = c('s24:15'), peak = c('s24:peak')

  const A = 1 - on(f, happened, 10), rise = easeOut(span(f, really, really + 30))
  const down = on(f, fallen, 20), up = on(f, back, 60)
  // # the trail from P2 to P3, drawn up to fraction `up`
  const trail = { x: lerp(P2.x, P3.x, up), y: lerp(P2.y, P3.y, up) }
  const pop5 = on(f, burst, 4)
  return (
    <g>
      <Alps id="cl-nasdaq" f={f} tone="night" />
      {/* # A) the maths on paper */}
      {A > 0.001 && <g opacity={A * on(f, maths, 6)} transform={`translate(0 ${-on(f, happened, 10) * 120})`}>
        <Paper x={500} y={760} s={pop(f, maths)} r={lerp(-4, 3, on(f, paper, 10))} lines={['−50%  →  +100%', 'TO GET BACK']} />
      </g>}
      {/* # B) the mountain rises */}
      <g opacity={rise} transform={`translate(0 ${(1 - rise) * 300})`}>
        <path d={`M70 ${BASE} L${P1.x} ${P1.y} L${P2.x} ${P2.y} L${P3.x} ${P3.y} L960 ${BASE} Z`} fill="#24365C" />
        <path d={`M${P1.x} ${P1.y} L${P2.x} ${P2.y} L${(P1.x + P2.x) / 2 - 30} ${BASE} L70 ${BASE} Z`} fill="#2D4373" />
        <path d={`M${P2.x} ${P2.y} L${P3.x} ${P3.y} L${P3.x - 40} ${BASE} Z`} fill="#1C2C4D" />
        <path d={`M${P1.x - 22} ${P1.y + 70} L${P1.x} ${P1.y} L${P1.x + 18} ${P1.y + 56} L${P1.x + 4} ${P1.y + 46} L${P1.x - 8} ${P1.y + 62} Z`} fill={SNOW} />
        <path d={`M${P3.x - 70} ${P3.y + 54} L${P3.x} ${P3.y} L${P3.x + 10} ${P3.y + 64} L${P3.x - 14} ${P3.y + 44} L${P3.x - 34} ${P3.y + 58} Z`} fill={SNOW} />
        <rect x={60} y={BASE - 4} width={910} height={8} rx={4} fill="#3C4A6C" />
        <Label x={500} y={1274} text="DRAWN THROUGH 3 REAL CLOSES" size={30} font="Bebas Neue" color={SKY_N} o={on(f, march, 8)} />
      </g>
      {/* # MAR 2000: the record peak, NASDAQ, tech chips, flag, 5,049 */}
      <g opacity={on(f, nasdaq, 8)}><Label x={650} y={1110} text="NASDAQ" size={88} font="Bebas Neue" color="#4E6596" /></g>
      <Tag x={P1.x + 170} y={350} text="MAR 2000" color={SNOW} tc={INK} o={on(f, march, 6)} size={46} />
      <g opacity={on(f, tech, 6) * (1 - on(f, burst, 6))}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${P1.x - 60 + k * 60} ${P1.y + 150 + (k % 2) * 30}) scale(${pop(f, tech + k * 3)})`}>
        <rect x={-22} y={-22} width={44} height={44} rx={6} fill="#3B4C70" stroke={SKY_N} strokeWidth={3} />
        {[-12, 0, 12].map((d) => <g key={d}><line x1={d} y1={-30} x2={d} y2={-22} stroke={SKY_N} strokeWidth={3} /><line x1={d} y1={22} x2={d} y2={30} stroke={SKY_N} strokeWidth={3} /></g>)}
      </g>)}</g>
      <g opacity={on(f, record, 6)}>
        <line x1={P1.x} y1={P1.y} x2={P1.x} y2={P1.y - 100} stroke={SNOW} strokeWidth={5} />
        <path d={`M${P1.x} ${P1.y - 100} L${P1.x + 70} ${P1.y - 86 + Math.sin(f / 6) * 4} L${P1.x} ${P1.y - 70} Z`} fill={GOLD} />
      </g>
      <Tag x={P1.x + 170} y={432} text="5,049" color={GOLD} tc={INK} o={on(f, d5049, 6)} s={pop(f, d5049)} size={56} />
      {/* # the bubble round the peak, then it pops */}
      {f < burst + 12 && <g opacity={on(f, dot, 8) * (1 - pop5)}>
        <circle cx={P1.x + 10} cy={P1.y + 20} r={150 + Math.sin(f / 5) * (f >= bubble ? 8 : 3)} fill={SKY_N} opacity={0.12} stroke={SKY_N} strokeWidth={4} />
        <ellipse cx={P1.x - 50} cy={P1.y - 60} rx={30} ry={14} fill="#FFFFFF" opacity={0.5} transform={`rotate(-30 ${P1.x - 50} ${P1.y - 60})`} />
      </g>}
      {f >= burst && f < burst + 20 && <g opacity={1 - span(f, burst, burst + 20)}>{Array.from({ length: 10 }, (_, k) => { const a = k / 10 * Math.PI * 2, r = 150 + span(f, burst, burst + 20) * 90
        return <line key={k} x1={P1.x + 10 + Math.cos(a) * r * 0.8} y1={P1.y + 20 + Math.sin(a) * r * 0.8} x2={P1.x + 10 + Math.cos(a) * r} y2={P1.y + 20 + Math.sin(a) * r} stroke={SKY_N} strokeWidth={5} strokeLinecap="round" /> })}</g>}
      {/* # OCT 2002: the red trail down to 1,114, −78% */}
      <g opacity={on(f, fallen, 6)}><line x1={P1.x} y1={P1.y} x2={lerp(P1.x, P2.x, down)} y2={lerp(P1.y, P2.y, down)} stroke={LOSS_L} strokeWidth={10} strokeLinecap="round" /></g>
      <Dust x={P2.x} y={P2.y} f={f} at={fallen + 18} n={10} spread={90} />
      <Tag x={P2.x + 40} y={P2.y + 110} text="OCT 2002" color={SNOW} tc={INK} o={on(f, october, 6)} size={46} />
      <g opacity={on(f, d1114, 6) * (1 - 0.0)}><circle cx={P2.x} cy={P2.y} r={14 + 6 * on(f, d1114b, 6) * (1 - on(f, d1114b + 20, 10))} fill={LOSS} /></g>
      <Tag x={P2.x + 150} y={P2.y - 40} text="1,114" color={LOSS} o={on(f, d1114, 6)} s={pop(f, d1114)} size={56} />
      <g opacity={on(f, thats, 6) * (1 - on(f, climb, 8))}>
        <path d={`M${P1.x - 90} ${P1.y} h-20 V${P2.y} h20`} fill="none" stroke={LOSS_L} strokeWidth={6} />
        <Tag x={P1.x - 20} y={(P1.y + P2.y) / 2 + 60} text="−78%" color={LOSS} o={on(f, d78, 6)} s={pop(f, d78)} size={60} />
      </g>
      {/* # the long climb back: a green dotted trail up the ridge, +353% */}
      <g opacity={on(f, climb, 6)}><line x1={P2.x} y1={P2.y} x2={trail.x} y2={trail.y} stroke={GAIN_L} strokeWidth={10} strokeDasharray="4 18" strokeLinecap="round" /><circle cx={trail.x} cy={trail.y} r={12} fill={GAIN_L} /></g>
      <g opacity={on(f, d5049b, 6) * (1 - on(f, d5049b + 30, 10))}><circle cx={P1.x} cy={P1.y} r={40} fill="none" stroke={GOLD} strokeWidth={5} /></g>
      <g opacity={on(f, it23, 6)}>
        <path d={`M${P3.x + 50} ${P2.y} h20 V${P3.y + 10} h-20`} fill="none" stroke={GAIN_L} strokeWidth={6} />
        <Tag x={P3.x - 40} y={(P2.y + P3.y) / 2 + 40} text="+353%" color={GAIN} o={on(f, d353, 6)} s={pop(f, d353)} size={64} />
      </g>
      {/* # APR 2015: back above the old record, 15 years later */}
      <g opacity={on(f, close, 8)}><line x1={P1.x} y1={P1.y} x2={lerp(P1.x, P3.x, on(f, old, 20))} y2={P1.y} stroke={GOLD} strokeWidth={4} strokeDasharray="14 10" /></g>
      <g opacity={on(f, april, 6)}>
        <line x1={P3.x} y1={P3.y} x2={P3.x} y2={P3.y - 100} stroke={SNOW} strokeWidth={5} />
        <path d={`M${P3.x} ${P3.y - 100} L${P3.x - 70} ${P3.y - 86 + Math.sin(f / 6) * 4} L${P3.x} ${P3.y - 70} Z`} fill={GAIN} />
        <Tag x={P3.x - 160} y={P3.y - 70} text="APR 2015" color={SNOW} tc={INK} size={46} s={pop(f, april)} />
      </g>
      <g opacity={on(f, more, 6)}>
        <line x1={P1.x} y1={BASE + 30} x2={lerp(P1.x, P3.x, on(f, more, 24))} y2={BASE + 30} stroke={GOLD} strokeWidth={6} />
        <circle cx={P1.x} cy={BASE + 30} r={9} fill={GOLD} /><circle cx={lerp(P1.x, P3.x, on(f, more, 24))} cy={BASE + 30} r={9} fill={GOLD} />
      </g>
      <Tag x={(P1.x + P3.x) / 2} y={BASE + 30} text="15 YEARS" color={GOLD} tc={INK} o={on(f, d15, 6)} s={pop(f, d15)} size={52} />
      <g opacity={on(f, peak, 6) * (1 - on(f, peak + 24, 10))}><circle cx={P1.x} cy={P1.y - 86} r={56} fill="none" stroke={GOLD} strokeWidth={4} /></g>
      <Vig id="cl-nasdaq" />
      <Headline f={f} lines={[[maths, 'NOT JUST ON PAPER', SNOW, 100], [nasdaq, 'THE NASDAQ, 2000', SNOW, 100], [burst, 'THE DOT-COM BUBBLE BURSTS', SNOW, 86], [d78, 'DOWN 78%', LOSS_L, 110], [d353, 'NEEDED +353%', GAIN_L, 110], [april, 'BACK ONLY IN 2015', SNOW, 100]]} />
    </g>
  )
}

export const CL_NASDAQ = makePiece('cl-nasdaq', 'It really happened, by moonlight: a sheet of paper "−50% → +100% TO GET BACK" folds away and a mountain rises, drawn through three real Nasdaq closes (DRAWN THROUGH 3 REAL CLOSES): MAR 2000 peak with tech chips, gold flag and 5,049; a glassy bubble round the peak pops; a red trail runs down to OCT 2002 · 1,114 with a −78% bracket; a green dotted trail climbs the long ridge (+353%); the dashed old-record line reaches the APR 2015 green flag; a 15 YEARS span runs underneath', {
  canvas: 'tall', mood: 'dark', Component: Nasdaq,
  beats: ["s19:maths", "s19:paper", "s19:really", "s19:happened", "s20:march", "s20:nasdaq", "s20:tech", "s20:record", "s20:5049", "s21:dot", "s21:bubble", "s21:burst", "s22:october", "s22:fallen", "s22:1114", "s22:that's", "s22:78", "s23:climb", "s23:1114", "s23:back", "s23:5049", "s23:it", "s23:353", "s24:close", "s24:old", "s24:april", "s24:more", "s24:15", "s24:peak"],
  sfx: [['s21:burst', 'pop', 0.25], ['s22:78', 'thud', 0.25], ['s23:353', 'riser', 0.2], ['s24:april', 'chime', 0.2]] })
