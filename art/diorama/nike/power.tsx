// ---------------------------------------------------------------- s15–s19: step two — the problem with someone else's shoes.
// Dusk on the track. The supplier's factory (left) feeds a conveyor of shoe boxes to Blue Ribbon's car (right): only while
// the belt runs are there shoes to sell. The supplier's valve wheel on the belt = the power. 1971: an envelope flies over —
// ULTIMATUM; a pie of Blue Ribbon fills 51% in the supplier's red, a crown above the factory. It didn't happen: the red slice
// pulls back, 1972, the belt snaps in two — the partnership is over.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { OregonWorld, Vig, Headline, Factory, ShoeBox, Car, Calendar, Tag, LaneBadge, Pie, arcAt, win, CX, FLOOR, INK, ORANGE, MUSTARD, RED, GREEN, TEAL, PAPER, BROWN2 } from './kit'

const BELT_Y = 1090, B0 = 330, B1 = 620

const Power: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), problem = c('s15:problem'), someone = c('s15:someone')
  const s16 = c('s16'), sell = c('s16:sell'), kept = c('s16:kept'), sending = c('s16:sending')
  const s16a = c('s16a'), made = c('s16a:made'), held = c('s16a:held'), power = c('s16a:power')
  const onit17 = c('s17:onitsuka'), blue18 = c('s18:blue'), partnership = c('s19:partnership'), s17 = c('s17'), offer = c('s17:offer'), ultimatum = c('s17:ultimatum')
  const s18 = c('s18'), d51 = c('s18:51'), supplier = c('s18:supplier'), charge = c('s18:charge')
  const s19 = c('s19'), happen = c('s19:happen'), by = c('s19:by'), over = c('s19:over')

  const Pi = win(f, s18 - 4, by)
  const snap = on(f, partnership, 14)
  const running = f < partnership
  const flow = on(f, sending - 6, 8)
  return (
    <g>
      <OregonWorld f={f} id="nk-pow" tone="dusk" />
      <LaneBadge x={CX} y={560} n={2} s={pop(f, s15)} o={on(f, s15, 8) * (1 - on(f, s16, 8))} />
      {/* # the supplier, the belt, the car */}
      <g opacity={on(f, problem - 4, 8)}>
        <Factory x={200} y={FLOOR - 30} s={0.85} big={on(f, held, 16)} />
        <circle cx={200} cy={FLOOR - 160} r={200} fill="none" stroke={MUSTARD} strokeWidth={10} opacity={on(f, onit17, 6) * (1 - on(f, offer, 8))} />
        <Tag x={200} y={lerp(860, 800, on(f, held, 16))} t="SUPPLIER" size={40} col={RED} tc={PAPER} o={on(f, someone, 8)} />
        {/* # belt in two halves (snaps apart at the end) */}
        {[0, 1].map((h) => { const x0 = h ? (B0 + B1) / 2 : B0, x1 = h ? B1 : (B0 + B1) / 2, dx = (h ? 30 : -30) * snap, dr = (h ? 8 : -8) * snap
          return <g key={h} transform={`translate(${dx} ${snap * 20}) rotate(${dr} ${(x0 + x1) / 2} ${BELT_Y})`}>
            <rect x={x0} y={BELT_Y} width={x1 - x0} height={24} rx={12} fill="#3B3A36" />
            {Array.from({ length: Math.floor((x1 - x0) / 40) }, (_, i) => <circle key={i} cx={x0 + 20 + i * 40} cy={BELT_Y + 12} r={8} fill={MUSTARD} transform={running ? `rotate(${f * 6} ${x0 + 20 + i * 40} ${BELT_Y + 12})` : undefined} />)}
          </g> })}
        <rect x={B0 + 10} y={BELT_Y + 24} width={12} height={FLOOR - BELT_Y - 24} fill={BROWN2} /><rect x={B1 - 22} y={BELT_Y + 24} width={12} height={FLOOR - BELT_Y - 24} fill={BROWN2} />
        {/* # boxes ride the belt while it runs */}
        {running && Array.from({ length: 3 }, (_, k) => { const t = ((f - sell) / 50 + k / 3) % 1; return f >= sell ? <ShoeBox key={k} x={lerp(B0 + 30, B1 - 20, t)} y={BELT_Y} s={0.55} col={[ORANGE, MUSTARD, '#5C8FB0'][k]} o={flow} /> : null })}
        <Car x={820} y={FLOOR} s={0.8} trunk={1} boxes={running ? 4 : 1} flip />
        <Tag x={820} y={920} t="BLUE RIBBON" size={40} col="#2E6FB5" tc={PAPER} o={on(f, s16, 8)} />
        {/* # the valve wheel = the supplier's power */}
        <g opacity={on(f, made, 8)} transform={`translate(${B0 + 40} ${BELT_Y - 90}) rotate(${on(f, power, 20) * 120}) scale(${pop(f, made)})`}>
          <circle r={46} fill="none" stroke={RED} strokeWidth={12} />{[0, 60, 120].map((a) => <line key={a} x1={-46} y1={0} x2={46} y2={0} stroke={RED} strokeWidth={10} transform={`rotate(${a})`} />)}<circle r={12} fill={INK} />
        </g>
        <Tag x={B0 + 40} y={BELT_Y - 200} t="THE POWER" size={36} col={RED} tc={PAPER} o={on(f, power, 8) * (1 - on(f, s17, 8))} />
      </g>
      {/* # 1971: the ultimatum */}
      <Calendar x={CX} y={760} s={0.8} t="1971" o={on(f, s17, 8) * (1 - on(f, offer - 8, 8))} />
      {f >= offer && f < offer + 24 && (() => { const [x, y] = arcAt([220, 820], [780, 800], on(f, offer, 20), 200); return <g transform={`translate(${x} ${y})`}><rect x={-60} y={-38} width={120} height={76} rx={6} fill={PAPER} stroke={INK} strokeWidth={4} /><path d="M-60 -38 L0 6 L60 -38" fill="none" stroke={INK} strokeWidth={4} /></g> })()}
      <Tag x={CX} y={600} t="ULTIMATUM" size={60} col={RED} tc={PAPER} o={on(f, ultimatum, 8) * (1 - on(f, s18, 8))} />
      {/* # the 51% pie */}
      {Pi > 0.001 && <g opacity={Pi}>
        <Pie x={CX} y={680} r={170} share={0.51 * on(f, d51, 20) * (1 - on(f, happen, 16))} split={0} />
        <Tag x={CX} y={890} t={f >= happen ? 'DIDN’T HAPPEN' : '51% TO ONITSUKA'} size={42} col={f >= happen ? GREEN : RED} tc={PAPER} o={on(f, blue18, 8)} />
        <g opacity={on(f, supplier, 8) * (1 - on(f, happen, 8))} transform={`translate(200 700) scale(${1 + 0.2 * on(f, charge, 8)})`}>
          <path d="M-60 40 L-70 -30 L-30 0 L0 -50 L30 0 L70 -30 L60 40 Z" fill={MUSTARD} stroke={INK} strokeWidth={4} />
        </g>
      </g>}
      <Calendar x={CX} y={860} s={0.8} t="1972" o={on(f, by, 8)} />
      <Tag x={CX} y={540} t="PARTNERSHIP OVER" size={48} col={INK} tc={PAPER} o={on(f, over, 8)} />
      <Vig id="nk-pow" />
      <Headline f={f} lines={[[s15, 'STEP 2: THE PROBLEM', '#FFF3E0', 92], [s16, 'NO SHIPMENTS, NO SALES', '#FFF3E0', 88], [s16a, 'THE SUPPLIER HAD THE POWER', MUSTARD, 80], [s17, '1971: AN ULTIMATUM', '#FFF3E0', 92], [s18, 'IT WANTED 51%', MUSTARD, 104], [s19, 'BY 1972, IT WAS OVER', '#FFF3E0', 92]]} />
    </g>
  )
}

export const NK_POWER = makePiece('nk-power', 'Step 2 on the track at dusk: lane badge 2; the SUPPLIER factory on the left feeds a brass-roller conveyor of shoe boxes into Blue Ribbon’s turquoise car on the right; a red valve wheel on the belt turns (THE POWER) as the factory grows; a 1971 calendar, an envelope flies from the factory to the car (ULTIMATUM); a pie of Blue Ribbon fills 51% in red (51% TO ONITSUKA) and a crown appears above the factory; then the red slice pulls back (DIDN’T HAPPEN), a 1972 calendar, and the conveyor snaps in two (PARTNERSHIP OVER).', {
  canvas: 'tall', mood: 'dark', Component: Power,
  beats: ["s15", "s15:problem", "s15:someone", "s16", "s16:sell", "s16:kept", "s16:sending", "s16a", "s16a:made", "s16a:held", "s16a:power", "s17:onitsuka", "s18:blue", "s19:partnership", "s17", "s17:offer", "s17:ultimatum", "s18", "s18:51", "s18:supplier", "s18:charge", "s19", "s19:happen", "s19:by", "s19:over"],
  sfx: [['s16a:power', 'click', 0.2], ['s17:ultimatum', 'thud', 0.25], ['s18:51', 'pop', 0.2], ['s19:over', 'crack', 0.25]] })
