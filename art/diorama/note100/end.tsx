// ---------------------------------------------------------------- s26–s28: the payoff, back on cream banknote paper.
// A) the big $100 note; a roll of paper and a pot of ink (what it's made of) — each crossed. B) three pillars rise
//    under the note one by one on their words — YOU NEED IT · EVERYONE TAKES IT · NOT TOO MANY — and it glows.
// C) the pillars slide away, the note drops, drains to plain paper and shrinks to an 11¢ tag (loops to the start).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { NoteWorld, Vig, Headline, Cross, Note, Pillar, Tag, Glint, win, CX, INKG, GREEN, RED, GOLD2, SHADE, NAVY } from './kit'

const FLOOR = 1240
const PaperRoll: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={12} fill={SHADE} />
    <rect x={-110} y={-120} width={180} height={120} rx={10} fill="#EFE8DA" stroke={INKG} strokeWidth={4} />
    <ellipse cx={70} cy={-60} rx={34} ry={60} fill="#E2D9C6" stroke={INKG} strokeWidth={4} /><ellipse cx={70} cy={-60} rx={12} ry={22} fill="#B9AE98" />
    <path d="M-110 -10 L-160 20 L-60 20 Z" fill="#EFE8DA" stroke={INKG} strokeWidth={3} />
  </g>
)
const InkPot: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={90} ry={10} fill={SHADE} />
    <path d="M-70 0 L-70 -90 Q-70 -110 -40 -110 L40 -110 Q70 -110 70 -90 L70 0 Z" fill={NAVY} stroke={INKG} strokeWidth={4} />
    <rect x={-30} y={-150} width={60} height={42} rx={6} fill={GREEN} stroke={INKG} strokeWidth={4} />
    <path d="M-50 -80 L-50 -20" stroke="#FFFFFF" strokeWidth={6} opacity={0.3} strokeLinecap="round" />
    <path d="M20 -150 L80 -260" stroke={INKG} strokeWidth={6} strokeLinecap="round" /><path d="M80 -260 L96 -290 L86 -254 Z" fill={GOLD2} />
  </g>
)

const End: React.FC<PieceProps> = ({ f, c }) => {
  const s26 = c('s26'), d100 = c('s26:100'), bill = c('s26:bill'), isnt = c("s26:isn't"), because = c('s26:because'), made = c('s26:made')
  const s27 = c('s27'), need = c('s27:need'), everyone = c('s27:everyone'), takes = c('s27:takes'), arent = c("s27:aren't"), many = c('s27:many')
  const s28 = c('s28'), take = c('s28:take'), away = c('s28:away'), back = c('s28:back'), d11 = c('s28:11'), paper = c('s28:paper')

  const A = win(f, s26 - 4, need - 2), lift = on(f, need - 4, 14)
  const rise = [need, everyone, arent].map((t) => on(f, t, 14))
  const gone = on(f, take, 16), drop = on(f, away, 16), drain = on(f, back, 20), shrink = on(f, d11, 16)
  const PH = 440, top = FLOOR - PH - 8
  const noteY = lerp(lerp(640, top - 128 * 1.05, lift), FLOOR - 140, drop)

  return (
    <g>
      <NoteWorld f={f} id="nb-end" floor={FLOOR} />
      {/* # B/C) the pillars under the note */}
      {[0, 1, 2].map((i) => { const x = 220 + i * 280, h = PH * rise[i]
        return h > 4 ? <g key={i} transform={`translate(${lerp(0, (i - 1) * 700, gone)} ${lerp(0, 300, gone)})`} opacity={1 - gone}>
          <Pillar x={x} y={FLOOR} h={Math.max(80, h)} t={['YOU NEED IT', 'EVERYONE TAKES IT', 'NOT TOO MANY'][i]} size={i === 1 ? 34 : 40} o={on(f, [need, everyone, arent][i], 6)} />
        </g> : null })}
      {/* # the note: big, then on its pillars, then dropped and drained */}
      <g opacity={on(f, s26 - 4, 6)}>
        <Note x={CX} y={noteY} s={lerp(1.15, 1.05, lift) * lerp(1, 0.8, drop) * lerp(1, 0.6, shrink)} r={lerp(0, -8, drop) + Math.sin((f - isnt) / 2.5) * 4 * on(f, isnt, 4) * (1 - on(f, isnt + 14, 6))} f={f} glow={on(f, many, 10) * (1 - gone)} fade={drain} />
      </g>
      {/* # A) not what it's made of */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, because, 6)}><PaperRoll x={290} y={1100} s={pop(f, because)} /><g opacity={on(f, made + 8, 6)}><Cross x={270} y={1040} s={0.75} /></g></g>
        <g opacity={on(f, made, 6)}><InkPot x={720} y={1100} s={pop(f, made)} /><g opacity={on(f, made + 12, 6)}><Cross x={720} y={1030} s={0.75} /></g></g>
        <Glint f={f} at={bill} x={CX + 280} y={540} />
      </g>}
      {/* # C) back to 11¢ of paper */}
      <g opacity={on(f, d11, 6)}>
        <Tag x={CX - 60} y={FLOOR - 340} t="11¢" s={1.2 * pop(f, d11)} col="#F7D9C4" tc={RED} />
        <Glint f={f} at={paper} x={CX + 140} y={FLOOR - 200} />
      </g>
      <Vig id="nb-end" />
      <Headline f={f} lines={[[d100, 'YOUR $100 BILL', INKG, 104], [isnt, 'NOT THE PAPER', RED, 110], [s27, 'IT’S WORTH $100 BECAUSE…', INKG, 84], [take, 'TAKE THOSE AWAY…', INKG, 100], [d11, '11¢ OF PAPER', RED, 120]]} />
    </g>
  )
}

export const NB_END = makePiece('nb-end', 'Payoff on cream banknote paper: the big green $100 note; a roll of paper and a pot of ink appear beneath it and each gets a red cross (NOT THE PAPER); the note lifts as three engraved pillars rise under it one by one on their words — YOU NEED IT, EVERYONE TAKES IT, NOT TOO MANY — and it glows gold; then the pillars slide away, the note drops, drains to plain grey paper and shrinks behind a peach 11¢ tag (11¢ OF PAPER), looping back to the opening.', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s26", "s26:bill", "s26:isn't", "s26:because", "s26:made", "s27", "s27:need", "s27:everyone", "s27:takes", "s27:aren't", "s27:many", "s28", "s28:take", "s28:away", "s28:back", "s28:11", "s28:paper"],
  sfx: [['s26:made', 'pop', 0.2], ['s27:need', 'thump', 0.2], ['s27:everyone', 'thump', 0.2], ["s27:aren't", 'thump', 0.2], ['s28:away', 'whoosh', 0.25], ['s28:11', 'ding', 0.3]] })
