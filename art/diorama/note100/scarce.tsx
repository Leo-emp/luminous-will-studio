// ---------------------------------------------------------------- s17–s19: STEP THREE — there can't be too many.
// A) a gold "3" medal; notes rain into an overflowing heap that gets a cross. B) the bakery shelf: four cakes; three
//    shoppers each hold one note — on "twice" a second note slides out behind each; the cakes stay four (each counted)
//    and their price tags climb up their strings. C) the Federal Reserve building; a big dial swings and settles at 2
//    — ≈ 2% A YEAR — while a single price tag creeps up slowly beside it.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Mini } from '../../rig/Mini'
import { NoteWorld, Vig, Headline, Ribbon, Cross, Note, Cake, Tag, Temple, Dial, Glint, win, CX, INKG, GREEN, RED, GOLD, SHADE, TXT, MINTL, WOOD, WOOD2 } from './kit'

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

const Scarce: React.FC<PieceProps> = ({ f, c }) => {
  const three = c('s17:three'), cant = c("s17:can't"), many = c('s17:many')
  const s18 = c('s18'), everyone = c('s18:everyone'), twice = c('s18:twice'), dollars = c('s18:dollars'), bakery = c('s18:bakery'), same = c('s18:same'), number = c('s18:number'), cakes = c('s18:cakes'), prices = c('s18:prices'), climb = c('s18:climb')
  const central = c('s19:central'), federal = c('s19:federal'), aims = c('s19:aims'), rising = c('s19:rising'), d2 = c('s19:2'), year = c('s19:year')

  const A = win(f, three - 6, s18 - 2), B = win(f, s18 - 2, c('s19') - 2), C = on(f, c('s19') - 2, 7)
  const SHELF = 800
  // # the dial: wobbles from "aims", settles on 2 by the spoken "2"
  const settle = on(f, d2, 20), wob = Math.sin((f - aims) / 5) * 1.6 * (1 - settle)
  const dialV = f < aims ? 0 : lerp(lerp(0, 2, on(f, aims, 20)) + wob, 2, settle)

  return (
    <g>
      <NoteWorld f={f} id="nb-scarce" floor={FLOOR} />
      {/* # A) step three: not too many */}
      {A > 0.001 && <g opacity={A}>
        <Medal x={CX} y={560} n="3" s={pop(f, three - 6)} o={on(f, three - 6, 6)} f={f} />
        {Array.from({ length: 14 }, (_, i) => { const t0 = cant + i * 2, land = 1180 - Math.floor(i / 5) * 46 - (i % 2) * 14
          const y = lerp(760, land, on(f, t0, 12))
          return f >= t0 ? <Note key={i} x={300 + (i % 5) * 100 + (Math.floor(i / 5) % 2) * 40} y={y} s={0.3} r={((i * 37) % 30) - 15} f={f} /> : null })}
        <g opacity={on(f, many + 8, 6)}><Cross x={CX} y={1080} s={1.1 * pop(f, many + 8)} /></g>
      </g>}
      {/* # B) twice the dollars, the same cakes → prices climb */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, bakery, 8)}>
          <rect x={110} y={SHELF} width={780} height={26} rx={6} fill={WOOD} stroke={INKG} strokeWidth={4} />
          {[150, 850].map((x) => <rect key={x} x={x - 10} y={SHELF + 26} width={20} height={60} fill={WOOD2} />)}
          {[0, 1, 2, 3].map((i) => { const x = 210 + i * 195
            const rise = on(f, prices + i * 3, 16) * 120 + on(f, climb, 30) * 60
            return <g key={i}>
              <Cake x={x} y={SHELF} s={0.85} f={f} col={['#F3A7B8', '#F6D58A', '#B7DDB8', '#F3A7B8'][i]} />
              <line x1={x} y1={SHELF - 120} x2={x + 10} y2={SHELF - 190 - rise} stroke={INKG} strokeWidth={3} opacity={on(f, prices, 6)} />
              <g opacity={on(f, prices + i * 3, 6)}><Tag x={x - 20} y={SHELF - 240 - rise} t={f >= climb ? '$$' : '$'} s={0.7} r={-10} col={f >= climb ? '#F7D9C4' : '#FFF8E8'} tc={f >= climb ? RED : INKG} /></g>
              <g opacity={on(f, number + i * 4, 6) * (1 - on(f, prices, 8))}><circle cx={x} cy={SHELF - 190} r={28} fill={GREEN} /><text x={x} y={SHELF - 176} textAnchor="middle" fill="#FFF8E8" style={TXT(40)}>{i + 1}</text></g>
            </g> })}
        </g>
        {[0, 1, 2].map((i) => { const x = 230 + i * 270, t0 = everyone + i * 2
          return <g key={i} opacity={on(f, t0, 6)}>
            <Mini look={['investorF', 'buyer', 'worker'][i]} x={x} y={1220} scale={0.6 * pop(f, t0)} frame={f} seed={i * 11 + 1} mood={f >= climb ? 'sad' : 'happy'} />
            <Note x={x - 20 * on(f, twice, 12)} y={1000} s={0.2} r={-4} f={f} />
            <g opacity={on(f, twice + i * 2, 6)}><Note x={x + 30 * on(f, twice + i * 2, 12)} y={990} s={0.2} r={5} f={f} /></g>
          </g> })}
        <Glint f={f} at={same} x={210} y={SHELF - 150} />
        <Glint f={f} at={dollars} x={CX} y={960} />
      </g>}
      {/* # C) the Fed aims for about 2% a year */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, central, 8)}><Temple x={CX} y={FLOOR} s={0.95 * pop(f, central)} t={f >= federal ? 'FEDERAL RESERVE' : 'CENTRAL BANK'} /></g>
        <g opacity={on(f, aims, 6)}><Dial x={CX} y={600} v={Math.max(0, Math.min(6, dialV))} max={6} s={0.95 * pop(f, aims)} t={f >= d2 ? '2%' : ''} mark={2} /></g>
        <g opacity={on(f, rising, 6)}><Glint f={f} at={rising} x={CX + 150} y={480} /></g>
        <g opacity={on(f, year, 6)}><Ribbon x={CX} y={830} t="≈ 2% A YEAR" size={50} col={GREEN} s={pop(f, year)} /></g>
      </g>}
      <Vig id="nb-scarce" />
      <Headline f={f} lines={[[three, 'STEP 3', GREEN, 120], [cant, 'NOT TOO MANY', INKG, 110], [twice, 'TWICE THE DOLLARS…', INKG, 96], [same, '…SAME CAKES', INKG, 104], [prices, 'PRICES CLIMB', RED, 110], [federal, 'THE FEDERAL RESERVE', INKG, 92], [rising, 'AIMS FOR SLOW RISES', INKG, 92]]} />
    </g>
  )
}

export const NB_SCARCE = makePiece('nb-scarce', 'Step three on banknote paper: a gold medal with a big 3 as notes rain into an overflowing heap that gets a red cross; a wooden bakery shelf of four cakes, three shoppers below each holding a note — a second note slides out behind each (2× THE DOLLARS), the cakes are counted 1–4 (SAME 4 CAKES) and their price tags climb up their strings from $ to $$ as the shoppers frown; then the columned FEDERAL RESERVE building with a big cream dial whose red needle swings and settles at a green 2% mark (≈ 2% A YEAR) while one price tag creeps slowly upward.', {
  canvas: 'tall', mood: 'light', Component: Scarce,
  beats: ["s17:three", "s17:can't", "s17:many", "s18", "s18:everyone", "s18:twice", "s18:dollars", "s18:bakery", "s18:same", "s18:number", "s18:cakes", "s18:prices", "s18:climb", "s19:central", "s19:federal", "s19:aims", "s19:rising", "s19:2", "s19:year", "s19"],
  sfx: [['s17:many', 'thud', 0.25], ['s18:twice', 'pop', 0.2], ['s18:climb', 'riser', 0.25], ['s19:2', 'ding', 0.3]] })
