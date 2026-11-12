// ---------------------------------------------------------------- s10–s13: STEP TWO — what one person is worth.
// A) a huge crowd of glowing person-dots fills the frame: 3.64 BILLION A DAY. B) a big gold coin heap above them
//    is divided — a stream of coins rains down onto every dot; then the crowd fades to ONE person on a pedestal with
//    a coin stack: $17.72 in three months. C) four quarter stacks (Q4'25 → Q3'26) slide together into one tall
//    glowing stack: ≈ $67 A YEAR.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { FeedWorld, Vig, Headline, Pill, Coin, Dot, Stack, Pedestal, Glint, win, CX, FLOOR, WHITE, PINK, CYAN, GOLD, SOFT, TXT } from './kit'

const PersonP: React.FC<PieceProps> = ({ f, c }) => {
  const two = c('s10:two'), person = c('s10:person'), worth = c('s10:worth')
  const apps = c('s11:apps'), counts = c('s11:counts'), d364 = c('s11:364'), billion = c('s11:billion'), people = c('s11:people'), every = c('s11:every')
  const divide = c('s12:divide'), money = c('s12:money'), people12 = c('s12:people'), reports = c('s12:reports'), d17 = c('s12:17'), d72 = c('s12:72'), months = c('s12:months')
  const add = c('s13:add'), four = c('s13:four'), quarters = c('s13:quarters'), d67 = c('s13:67'), single = c('s13:single')

  const A = win(f, c('s10') - 2, reports - 2), B = win(f, reports - 2, add - 2), Cq = on(f, add - 2, 8)
  const dots = Array.from({ length: 96 }, (_, i) => ({ x: 110 + (i % 12) * 72 + (Math.floor(i / 12) % 2) * 36, y: 640 + Math.floor(i / 12) * 78 }))
  const rain = on(f, divide, 30)
  const you: Beat[] = [[reports - 2, 'idle', 'smiling'], [d17, 'present', 'shocked']]
  const q = [16.56, 15.66, 16.86, 17.72], qn = ["Q4'25", "Q1'26", "Q2'26", "Q3'26"]
  const merge = on(f, d67 - 4, 20)
  return (
    <g>
      <FeedWorld f={f} id="ig-person" />
      {A > 0.001 && <g opacity={A}>
        {dots.map((p, i) => <Dot key={i} x={p.x} y={p.y} s={1.15 * pop(f, apps + (i % 24) * 0.6)} col={i % 3 === 0 ? PINK : i % 3 === 1 ? CYAN : '#9C86FF'} o={on(f, apps + (i % 24) * 0.6, 6)} />)}
        {/* # the big heap of money above, divided and rained onto everyone */}
        <g opacity={on(f, money - 6, 8)}>
          <ellipse cx={CX} cy={500} rx={lerp(300, 120, rain)} ry={lerp(70, 30, rain)} fill={GOLD} opacity={0.9} />
          {Array.from({ length: 9 }, (_, i) => <Coin key={i} x={CX - 200 + i * 50} y={470 - (i % 3) * 20} s={lerp(0.7, 0.3, rain)} />)}
        </g>
        {f >= divide && Array.from({ length: 24 }, (_, i) => { const d = dots[(i * 5) % 96], ph = ((f - divide) / 20 + i / 24) % 1
          return <Coin key={i} x={lerp(CX, d.x, ph)} y={lerp(520, d.y - 60, ph)} s={0.25} o={1 - ph * 0.5} /> })}
        <Glint f={f} at={person} x={CX} y={560} col={GOLD} />
        <Glint f={f} at={counts} x={200} y={620} col={CYAN} />
        <Glint f={f} at={every} x={820} y={1100} col={PINK} />
        <Glint f={f} at={people12} x={700} y={900} col={GOLD} />
        <Glint f={f} at={worth} x={300} y={500} col={GOLD} />
      </g>}
      {/* # B) one person: $17.72 in three months */}
      {B > 0.001 && <g opacity={B}>
        <Pedestal x={340} y={FLOOR} w={280} t="ONE PERSON" />
        <Person f={f} who="investorF" beats={you} x={340} y={FLOOR - 70} s={0.62} />
        <g opacity={on(f, d17, 6)}><Stack x={720} y={FLOOR} n={lerp(0, 18, on(f, d17, 20))} s={1.3} glow={on(f, d72, 8)} /></g>
        <g opacity={on(f, d72, 6)}><Pill x={720} y={560} t="$17.72" size={80} col={GOLD} tc="#4A2E00" s={pop(f, d72)} /></g>
        <g opacity={on(f, months, 6)}><Pill x={720} y={670} t="IN 3 MONTHS" size={40} col="#3E3490" /></g>
        <Glint f={f} at={c('s12:per')} x={720} y={900} col={GOLD} />
        <Glint f={f} at={c('s12:person')} x={340} y={FLOOR - 500} col={WHITE} />
        <Glint f={f} at={c('s12:just')} x={820} y={1000} col={GOLD} />
        <Glint f={f} at={c('s12:three')} x={620} y={760} col={CYAN} />
      </g>}
      {/* # C) four quarters add up to ≈ $67 a year */}
      {Cq > 0.001 && <g opacity={Cq}>
        {q.map((v, k) => { const x0 = 170 + k * 220, x = lerp(x0, CX, merge), n = v * 1.05
          return <g key={k} opacity={on(f, four + k * 3, 6)}>
            <Stack x={x} y={FLOOR} n={n} s={1} o={1 - merge} />
            <g opacity={1 - merge}><text x={x0} y={FLOOR + 60} textAnchor="middle" fill={SOFT} style={TXT(40)}>{qn[k]}</text><text x={x0} y={FLOOR - n * 16 - 50} textAnchor="middle" fill={WHITE} style={TXT(46)}>${v.toFixed(2)}</text></g>
          </g> })}
        <g opacity={merge}><Stack x={CX} y={FLOOR} n={lerp(17, 30, merge)} s={1.1} glow={merge} /></g>
        <g opacity={on(f, d67, 6)}><Pill x={CX + 230} y={700} t="≈ $67 A YEAR" size={64} col={GOLD} tc="#4A2E00" s={pop(f, d67)} /></g>
        <Glint f={f} at={quarters} x={CX} y={900} col={GOLD} />
        <Glint f={f} at={single} x={CX + 230} y={600} col={WHITE} />
      </g>}
      <Vig id="ig-person" />
      <Headline f={f} lines={[[two, 'STEP 2', CYAN, 120], [d364, '3.64 BILLION PEOPLE', WHITE, 100], [billion, '3.64 BILLION A DAY', WHITE, 100], [divide, 'MONEY ÷ PEOPLE', GOLD, 110], [d17, 'META: $17.72 EACH', GOLD, 104], [add, 'ADD 4 QUARTERS', WHITE, 110], [d67, '≈ $67 PER PERSON', GOLD, 108]]} />
    </g>
  )
}

export const IG_PERSON = makePiece('ig-person', 'Step two: a huge crowd of glowing pink, cyan and violet person-dots fills the frame (3.64 BILLION A DAY) under a gold heap of coins that shrinks as coins rain down onto everyone (MONEY ÷ PEOPLE); then one person stands on a violet pedestal (ONE PERSON) beside a coin stack that grows to $17.72 IN 3 MONTHS; finally four quarter stacks labelled Q4\'25 to Q3\'26 ($16.56, $15.66, $16.86, $17.72) slide together and pile into one tall glowing stack — ≈ $67 A YEAR.', {
  canvas: 'tall', mood: 'dark', Component: PersonP,
  beats: ["s10:two", "s10:person", "s10:worth", "s11:apps", "s11:counts", "s11:billion", "s11:people", "s11:every", "s12:divide", "s12:money", "s12:people", "s12:reports", "s12:17", "s12:72", "s12:months", "s13:add", "s13:four", "s13:quarters", "s13:67", "s13:single", "s10", "s12:per", "s12:person", "s12:just", "s12:three"],
  sfx: [['s11:364', 'pop', 0.2], ['s12:divide', 'coin', 0.2], ['s12:72', 'ding', 0.25], ['s13:67', 'chime', 0.3]] })
