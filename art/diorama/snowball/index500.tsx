// ---------------------------------------------------------------- s24–s26: not just a Buffett thing.
// A) you shrug beside a wooden S&P 500 crate full of tiny share tickets.
// B) three snowballs roll out of the crate along the valley: 1964 $1, 1994 ≈ $17, 2024 ≈ $390; a coin (dividends) drops in.
// C) a ring around the big one fills 96%: IN THE LAST 30 YEARS; a magnifier over a single stock card gets a cross.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { SnowWorld, Vig, Headline, Sign, Snowball, Crate, Coin0, Magnifier, StockCard, Cross, Flag, win, CX, FLOOR, INK, CORAL, GOLD, GREEN, SNOW, SNOW2 } from './kit'

const Index: React.FC<PieceProps> = ({ f, c }) => {
  const s24 = c('s24'), buffett = c('s24:buffett'), thing = c('s24:thing')
  const s25 = c('s25'), report = c('s25:report'), dollar = c('s25:dollar'), sp = c('s25:sp'), and25 = c('s25:and'), by2 = c('s25:by#2'), dividends = c('s25:dividends'), d17 = c('s25:17'), d390 = c('s25:390')
  const s26 = c('s26'), d96 = c('s26:96'), last = c('s26:last'), picking = c('s26:picking'), stock = c('s26:stock')

  const youB: Beat[] = [[0, 'idle', 'neutral'], [buffett, 'shrug', 'smiling'], [sp, 'point', 'smiling'], [d390, 'shock', 'shocked'], [s26, 'confident', 'smug']]
  const A = on(f, s24, 8)
  const big = on(f, d390, 30), bigR = lerp(60, 165, big), bigX = lerp(560, 740, big)
  const ring = on(f, d96, 20) * 0.96

  return (
    <g>
      <SnowWorld f={f} id="snb-index" />
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="hero" beats={youB} x={170} y={FLOOR} s={0.92} />
        <Crate x={420} y={FLOOR} s={0.85 * pop(f, s24 + 4)} o={on(f, s24 + 4, 8)} />
        {/* # a dividend coin drops into the crate */}
        {f >= dividends && f < dividends + 24 && <Coin0 x={420} y={lerp(700, 1080, on(f, dividends, 18))} s={0.8} />}
        <Sign x={420} y={980} t="WITH DIVIDENDS" size={32} o={on(f, dividends, 8) * (1 - on(f, d17, 8))} />
        {/* # the snowballs roll out */}
        <g opacity={on(f, dollar, 8) * (1 - on(f, d17, 8))}><Snowball id="snb-i1" x={lerp(430, 600, on(f, dollar, 20))} y={FLOOR - 24} r={24} coin /><Sign x={600} y={FLOOR - 100} t="1964: $1" size={36} /></g>
        <g opacity={on(f, d17, 8) * (1 - on(f, d390, 8))}><Snowball id="snb-i2" x={lerp(430, 640, on(f, d17, 20)) + 60 * on(f, and25, 16)} y={FLOOR - 48} r={48} /><Sign x={640} y={FLOOR - 150} t="1994: ≈ $17" size={40} /></g>
        <g opacity={on(f, d390 - 2, 8)}>
          <Snowball id="snb-i3" x={bigX} y={FLOOR - bigR} r={bigR} spin={bigX} glow={Math.max(big * (1 - on(f, by2, 6)), 0.4 + 0.6 * on(f, by2 + 4, 8) * (1 - on(f, s26, 8)))} />
          <Sign x={bigX} y={FLOOR - bigR} t="2024: ≈ $390" size={48} col={GOLD} />
          <circle cx={bigX} cy={FLOOR - bigR} r={bigR + 24} fill="none" stroke={SNOW2} strokeWidth={26} opacity={on(f, d96 - 4, 6)} />
          <circle cx={bigX} cy={FLOOR - bigR} r={bigR + 24} fill="none" stroke={GREEN} strokeWidth={26} strokeDasharray={`${2 * Math.PI * (bigR + 24) * ring} 9999`} transform={`rotate(-90 ${bigX} ${FLOOR - bigR})`} />
                    <Sign x={bigX} y={FLOOR - 2 * bigR - 80} t="96%: LAST 30 YEARS" size={40} col={GREEN} tc={SNOW} o={on(f, last, 8)} />
        </g>
        {/* # no stock picking */}
        <g opacity={on(f, picking, 8)}>
          <StockCard x={320} y={600} s={0.8} t="ONE STOCK" r={-4} />
          <Magnifier x={420} y={560} s={0.7} />
          <Cross x={420} y={560} s={0.6} o={on(f, stock, 6)} />
        </g>
      </g>}
      <Vig id="snb-index" />
      <Headline f={f} lines={[[s24, 'NOT JUST BUFFETT', INK, 108], [sp, '$1 IN THE S&P 500', INK, 100], [s26, '≈ 96% CAME LATE TOO', GREEN, 96]]} />
    </g>
  )
}

export const SB_INDEX = makePiece('snb-index', 'Not just Buffett, in the snowy valley: you shrug beside a wooden S&P 500 crate full of tiny share tickets; a gold coin (WITH DIVIDENDS) drops in; snowballs roll out of it — 1964: $1, then 1994: ≈ $17, then a big glowing one, 2024: ≈ $390; a green ring around it fills 96%: LAST 30 YEARS; a magnifier over a single ONE STOCK card gets a red cross — no stock picking needed.', {
  canvas: 'tall', mood: 'light', Component: Index,
  beats: ["s24", "s24:buffett", "s24:thing", "s25", "s25:report", "s25:dollar", "s25:sp", "s25:and", "s25:by#2", "s25:dividends", "s25:17", "s25:390", "s26", "s26:96", "s26:last", "s26:picking", "s26:stock"],
  sfx: [['s25:dividends', 'coin', 0.2], ['s25:390', 'impact', 0.2], ['s26:96', 'riser', 0.15], ['s26:stock', 'thud', 0.2]] })
