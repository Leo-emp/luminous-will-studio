// ---------------------------------------------------------------- s8–s11: STEP ONE — you need dollars.
// A) a big engraved "1" medallion; you turn out your empty pockets, a stack of notes waits. B) THE LAW: a law book
//    whose gavel comes down, a note lands on it; a TAX envelope and a DEBT envelope slide in beside it. C) a tax bill
//    stamped PAY IN $ swallows a note; a crowd of people appears, each with a note above them; a calendar flips years.
// D) a worker carries a box and gets paid in notes; a chicken and a pair of seashells each get a cross.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { NoteWorld, Vig, Headline, Ribbon, Cross, Note, LawBook, Letter, CalPage, Chicken, Shells, Glint, flyTo, win, CX, INKG, GREEN, RED, GOLD, CREAM, SHADE, TXT, MINTL } from './kit'

const FLOOR = 1240
const Medal: React.FC<{ x: number; y: number; n: string; s?: number; o?: number; f: number }> = ({ x, y, n, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={150} fill={SHADE} transform="translate(8 10)" />
    {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 12 + f / 200) * 150} cy={Math.sin(i * Math.PI / 12 + f / 200) * 150} r={16} fill={GOLD} />)}
    <circle r={150} fill={GOLD} stroke={INKG} strokeWidth={5} />
    <circle r={118} fill={MINTL} stroke={INKG} strokeWidth={4} />
    <text y={62} textAnchor="middle" fill={INKG} style={TXT(190)}>{n}</text>
  </g>
)
const Pile: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; n?: number }> = ({ x, y, s = 1, o = 1, f, n = 4 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={310} ry={20} fill={SHADE} />
    {Array.from({ length: n }, (_, k) => <Note key={k} x={(k % 2) * 10 - 5} y={-128 - k * 30} s={1} r={(k % 2 ? 1 : -1) * 1.5} f={f} />)}
  </g>
)

const Need: React.FC<PieceProps> = ({ f, c }) => {
  const s8 = c('s8'), one = c('s8:one'), need = c('s8:need'), dollars8 = c('s8:dollars')
  const law = c('s9:law'), dollars9 = c('s9:dollars'), pay = c('s9:pay'), taxes9 = c('s9:taxes'), debts = c('s9:debts'), america = c('s9:america')
  const s10 = c('s10'), owed = c('s10:owed'), dollars10 = c('s10:dollars'), millions = c('s10:millions'), people = c('s10:people'), need10 = c('s10:need'), every = c('s10:every'), year = c('s10:year')
  const work = c('s11:work'), dollars11 = c('s11:dollars'), not = c('s11:not'), chickens = c('s11:chickens'), seashells = c('s11:seashells')

  const A = win(f, s8 - 4, law - 2), B = win(f, law - 2, s10 - 2), C = win(f, s10 - 2, c('s11') - 2), D = on(f, c('s11') - 2, 7)
  const youA: Beat[] = [[s8 - 4, 'idle', 'neutral'], [need, 'emptyPockets', 'worried'], [dollars8, 'point', 'smiling']]
  const workB: Beat[] = [[c('s11') - 2, 'carry', 'neutral'], [dollars11, 'receive', 'smiling'], [not, 'crossNoA', 'smiling', 'crossNoB', 14], [seashells + 10, 'thumbsUp', 'smiling']]
  const noteIn = flyTo(f, dollars10, [760, 560], [CX, 830], 18, 80)
  const crowd = Array.from({ length: 10 }, (_, i) => ({ x: 150 + (i % 5) * 175 + (Math.floor(i / 5) % 2) * 60, y: 960 + Math.floor(i / 5) * 270, look: ['buyer', 'investor', 'owner', 'worker', 'investorF'][i % 5] }))

  return (
    <g>
      <NoteWorld f={f} id="nb-need" floor={FLOOR} />
      {/* # A) step one: you need dollars */}
      {A > 0.001 && <g opacity={A}>
        <Medal x={CX} y={600} n="1" s={pop(f, one)} o={on(f, one, 6)} f={f} />
        <Person f={f} who="investorF" beats={youA} x={260} y={FLOOR} s={0.74} o={on(f, s8 - 4, 8)} />
        <g opacity={on(f, dollars8, 6)}><Pile x={720} y={FLOOR - 4} s={0.42 * pop(f, dollars8)} f={f} /></g>
      </g>}
      {/* # B) the law: taxes and debts are paid in dollars */}
      {B > 0.001 && <g opacity={B}>
        <LawBook x={CX} y={1160} s={1.25 * pop(f, law - 2)} hit={on(f, law + 4, 6)} />
        <g opacity={on(f, dollars9, 6)}><Note x={CX - 20} y={lerp(700, 960, on(f, dollars9, 14))} s={0.5} f={f} r={-3} /></g>
        <g opacity={on(f, taxes9, 6)} transform={`translate(${lerp(-200, 0, on(f, taxes9, 14))} 0)`}><Letter x={220} y={640} s={0.95} r={-6} t="TAXES" /></g>
        <g opacity={on(f, debts, 6)} transform={`translate(${lerp(200, 0, on(f, debts, 14))} 0)`}><Letter x={780} y={640} s={0.95} r={6} t="DEBTS" /></g>
        <g opacity={on(f, pay, 6)}><Ribbon x={CX} y={470} t="PAID IN DOLLARS" size={50} col={GREEN} s={pop(f, pay)} /></g>
        <Glint f={f} at={america} x={CX + 180} y={1000} />
      </g>}
      {/* # C) millions of people owe taxes in dollars, every year */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={1 - on(f, millions, 8)}>
          <Letter x={CX} y={760} s={1.6 * pop(f, s10 - 2)} t="PAY IN $" />
          {f >= dollars10 && noteIn[2] < 1 && <Note x={noteIn[0]} y={noteIn[1]} s={lerp(0.5, 0.2, noteIn[2])} f={f} />}
        </g>
        {crowd.map((p, i) => { const t0 = millions + i * 2
          return <g key={i} opacity={on(f, t0, 6)}>
            <Mini look={p.look} x={p.x} y={p.y} scale={0.62 * pop(f, t0)} frame={f} seed={i * 7 + 3} mood={f >= need10 ? 'happy' : 'neutral'} />
            <g opacity={on(f, need10 + i, 6)}><Note x={p.x} y={p.y - 230 - Math.sin((f + i * 9) / 16) * 6} s={0.18 * pop(f, need10 + i)} f={f} /></g>
          </g> })}
        <g opacity={on(f, every, 6)}><CalPage x={CX} y={560} t={['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][Math.min(11, Math.max(0, Math.floor((f - every) / 5)))]} sub='EVERY YEAR' s={0.85 * pop(f, every)} r={-3} /></g>
      </g>}
      {/* # D) you work for dollars — not chickens or seashells */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="worker" beats={workB} x={250} y={FLOOR} s={0.76} />
        {[0, 1, 2].map((k) => { const p = flyTo(f, dollars11 + k * 4, [CX + 100, 420], [300, 820 - k * 30], 18, 60)
          return f >= dollars11 + k * 4 ? <Note key={k} x={p[0]} y={p[1]} s={0.3} r={k * 4 - 4} f={f} /> : null })}
        <g opacity={on(f, chickens, 6)}><Chicken x={720} y={760} s={0.95 * pop(f, chickens)} f={f} /><g opacity={on(f, chickens + 12, 6)}><Cross x={730} y={660} s={0.8 * pop(f, chickens + 12)} /></g></g>
        <g opacity={on(f, seashells, 6)}><Shells x={720} y={1180} s={0.95 * pop(f, seashells)} /><g opacity={on(f, seashells + 12, 6)}><Cross x={720} y={1110} s={0.75 * pop(f, seashells + 12)} /></g></g>
        <Glint f={f} at={work} x={250} y={760} />
      </g>}
      <Vig id="nb-need" />
      <Headline f={f} lines={[[one, 'STEP 1', GREEN, 120], [need, 'YOU NEED DOLLARS', INKG, 100], [law, 'THE LAW', INKG, 110], [taxes9, 'TAXES + DEBTS', INKG, 104], [owed, 'TAXES ARE OWED IN $', INKG, 92], [millions, 'MILLIONS NEED THEM', INKG, 96], [work, 'SO YOU WORK FOR DOLLARS', GREEN, 84]]} />
    </g>
  )
}

export const NB_NEED = makePiece('nb-need', 'Step one on banknote paper: a gold engraved medal with a big 1; you turn out empty pockets beside a stack of $100 notes; THE LAW book gets a gavel slam and a note lands on it, TAXES and DEBTS envelopes slide in either side (PAID IN DOLLARS); a big envelope stamped PAY IN $ swallows a note; a crowd of ten people pops up, each with a note floating above them, under an EVERY YEAR calendar; a worker carrying a box gets paid three notes, while a chicken and a pair of seashells each get a red cross.', {
  canvas: 'tall', mood: 'light', Component: Need,
  beats: ["s8", "s8:one", "s8:need", "s8:dollars", "s9:law", "s9:dollars", "s9:pay", "s9:taxes", "s9:debts", "s9:america", "s10", "s10:owed", "s10:dollars", "s10:millions", "s10:people", "s10:need", "s10:every", "s10:year", "s11:work", "s11:dollars", "s11:not", "s11:chickens", "s11:seashells", "s11"],
  sfx: [['s9:law', 'thud', 0.3], ['s10:millions', 'pop', 0.2], ['s11:dollars', 'cash', 0.25], ['s11:seashells', 'pop', 0.2]] })
