// ---------------------------------------------------------------- s22–s28: step three + the test + the loop back.
// TW_SIDE (s22–s24): a tag 3; the two flats side by side at dusk — Max left (his TV and sofa), Zoe right (a stack of
//   gold coins). Zoe: a coral −$5,800 tag, then her coin stack grows year by year (+$31,800 A YEAR). Max: −$24,200,
//   and his things grey out and shrink ("worth less every day").
// TW_END (s25–s28): the test as two rows of pictures — GOOD: bundle → cap → a big gold pile (pays back) beside a small
//   coral cost pile; BAD: bundle → TV that fades → a coral interest pile that keeps growing. Then the two friends,
//   opposite endings (green up arrow over Zoe, red down arrow over Max). Last line: the hook's loan paper with the BAD
//   stamp returns; the stamp lifts off and a big "?" takes its place, a cap and a TV pop beside it: what did it buy?
import React from 'react'
import { lerp, on, pop, span, easeOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Bundle, Cap, City, Coin, Curve, CX, Flat, GROUND, HangTag, Headline, INK, INK2, MAX, MAX_L, PAPER, Sofa, TV, Vig, win, ZOE, GOLD } from './kit'

const Arrow: React.FC<{ x: number; y: number; up: boolean; p: number; color: string; len?: number }> = ({ x, y, up, p, color, len = 200 }) => {
  const L = len * p; if (L < 6) return null; const d = up ? -1 : 1
  return <g><rect x={x - 18} y={up ? y - L + 30 : y} width={36} height={Math.max(0, L - 30)} rx={6} fill={color} /><path d={`M${x - 42} ${y + d * (L - 40)} L${x} ${y + d * L} L${x + 42} ${y + d * (L - 40)} Z`} fill={color} /></g>
}

const Side: React.FC<PieceProps> = ({ f, c }) => {
  const s22 = c('s22'), ahead = c('s22:ahead'), three = c('s22:three'), side = c('s22:side')
  const s23 = c('s23'), d58 = c('s23:5800'), earn = c('s23:earn'), d318 = c('s23:31800'), every = c('s23:every'), year = c('s23:year')
  const s24 = c('s24'), d242 = c('s24:24200'), things = c('s24:things'), less = c('s24:less'), day = c('s24:day')
  const slide = easeOut(span(f, side, side + 16))
  const zB: Beat[] = [[0, 'idle', 'neutral'], [s23, 'think', 'thinking'], [earn, 'celebrate', 'smiling'], [every, 'fistPump', 'smiling'], [s24, 'idle', 'smiling']]
  const mB: Beat[] = [[0, 'idle', 'neutral'], [ahead, 'scratchHead', 'thinking'], [s24, 'nervous', 'worried'], [less, 'facepalm', 'worried']]
  const years = Math.min(5, Math.floor(span(f, earn, year + 30) * 5.99))       // # coin rows land year by year
  const fade = on(f, less, 30)
  return (
    <g>
      <City id="tw-side" f={f} />
      <g opacity={on(f, three, 6) * (1 - on(f, side, 8))}><HangTag x={CX} y={760} text="3" size={120} string={[CX, 560]} s={pop(f, three)} /></g>
      {/* # the two flats slide in on "side by side" */}
      <g opacity={slide} transform={`translate(${(1 - slide) * -200} 0)`}><Flat x={80} y={GROUND} w={380} h={640} wall="#F4C7B4" lit={1 - 0.6 * fade} /></g>
      <g opacity={slide} transform={`translate(${(1 - slide) * 200} 0)`}><Flat x={560} y={GROUND} w={360} h={640} wall="#CDEDE4" /></g>
      {/* # Max's things fade and shrink */}
      <g opacity={slide * on(f, s22 + 4, 6)} transform={`translate(330 ${GROUND - 26}) scale(${1 - 0.25 * fade}) translate(-330 ${-(GROUND - 26)})`}>
        <TV x={330} y={GROUND - 330} s={0.55} age={0.2 + 0.8 * on(f, things, 20)} f={f} />
        <Sofa x={330} y={GROUND - 26} s={0.5} age={0.3 + 0.7 * on(f, day, 20)} />
      </g>
      <g opacity={on(f, s22, 8)}><Person f={f} who="max" beats={mB} x={lerp(300, 170, slide)} y={GROUND + 20} s={0.62} />
        <Person f={f} who="zoe" beats={zB} x={lerp(700, 850, slide)} y={GROUND + 20} s={0.62} flip /></g>
      {/* # costs */}
      <HangTag x={680} y={600} text="−$5,800" size={54} color={MAX_L} o={on(f, d58, 6)} s={pop(f, d58)} r={-4} />
      <HangTag x={290} y={600} text="−$24,200" size={54} color={MAX_L} o={on(f, d242, 6)} s={pop(f, d242)} r={4} />
      {/* # Zoe's pay-back: coin rows landing year by year */}
      {Array.from({ length: years * 4 }, (_, i) => { const r = Math.floor(i / 4), k = i % 4
        return <Coin key={i} x={630 + k * 0 + (r % 2) * 6} y={GROUND - 40 - (r * 4 + k) * 22} s={0.9} /> })}
      <HangTag x={760} y={760} text="+$31,800/YR" size={46} color={GOLD} o={on(f, d318, 6)} s={pop(f, d318)} r={-3} />
      <Vig id="tw-side" />
      <Headline f={f} lines={[[ahead, 'WHO CAME OUT AHEAD?', INK, 92], [s23, 'ZOE: PAYS ITSELF BACK', ZOE, 90], [s24, 'MAX: JUST COSTS', MAX, 96]]} />
    </g>
  )
}

const End: React.FC<PieceProps> = ({ f, c }) => {
  const s25 = c('s25'), test = c('s25:test'), good = c('s25:good'), buys = c('s25:buys'), pays = c('s25:pays'), more = c('s25:more'), costs = c('s25:costs')
  const s26 = c('s26'), bad = c('s26:bad'), loses = c('s26:loses'), value = c('s26:value'), interest = c('s26:interest'), piling = c('s26:piling')
  const s27 = c('s27'), same2 = c('s27:same#2'), opposite = c('s27:opposite'), endings = c('s27:endings')
  const s28 = c('s28'), all = c('s28:all'), bad28 = c('s28:bad'), ask = c('s28:ask'), thing = c('s28:thing'), what = c('s28:what'), buy = c('s28:buy')
  const R = win(f, s25, s27, 10), P = win(f, s27, s28 + 6, 10), L = on(f, s28, 10)
  const Y1 = 640, Y2 = 1030
  const zB: Beat[] = [[0, 'idle', 'smiling'], [opposite, 'celebrate', 'smiling']]
  const mB: Beat[] = [[0, 'idle', 'neutral'], [opposite, 'slump', 'worried']]
  return (
    <g>
      <City id="tw-end" f={f} />
      {/* # the test: two rows of pictures */}
      {R > 0.001 && <g opacity={R}>
        <rect x={60} y={Y1 - 210} width={900} height={330} rx={28} fill={PAPER} opacity={0.92 * on(f, good, 8)} />
        <rect x={60} y={Y2 - 230} width={900} height={350} rx={28} fill={PAPER} opacity={0.92 * on(f, bad, 8)} />
        <g opacity={on(f, test, 6)}><text x={90} y={Y1 - 150} fill={ZOE} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, good, 6)}>GOOD DEBT</text></g>
        <g opacity={on(f, good, 6)}><Bundle x={190} y={Y1 + 30} s={0.62 * pop(f, good)} /></g>
        <Curve a={[270, Y1 - 30]} b={[420, Y1 - 30]} lift={60} p={on(f, buys, 12)} color={INK2} w={12} />
        <g opacity={on(f, buys, 6)}><Cap x={500} y={Y1} s={1.05 * pop(f, buys)} f={f} /></g>
        <Curve a={[600, Y1 - 40]} b={[790, Y1 - 60]} lift={90} p={on(f, pays, 14)} color={ZOE} w={14} />
        {Array.from({ length: 7 }, (_, i) => <Coin key={i} x={830 + (i % 2) * 8} y={Y1 + 40 - i * 22} s={0.85} o={on(f, pays + 8 + i * 2, 4)} />)}
        {Array.from({ length: 2 }, (_, i) => <Coin key={i} x={700} y={Y1 + 40 - i * 22} s={0.7} color={MAX_L} o={on(f, costs, 4)} />)}
        <g opacity={on(f, more, 6)}><text x={830} y={Y1 + 110} textAnchor="middle" fill={ZOE} style={{ font: '400 48px "Bebas Neue"' }}>PAYS BACK</text><text x={700} y={Y1 + 110} textAnchor="middle" fill={MAX} style={{ font: '400 48px "Bebas Neue"' }}>COST</text></g>
        <g opacity={on(f, bad, 6)}><text x={90} y={Y2 - 170} fill={MAX} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>BAD DEBT</text>
          <Bundle x={190} y={Y2 + 30} s={0.62 * pop(f, bad)} /></g>
        <Curve a={[270, Y2 - 30]} b={[400, Y2 - 30]} lift={60} p={on(f, s26 + 10, 12)} color={INK2} w={12} />
        <g opacity={on(f, s26 + 12, 6)}><TV x={510} y={Y2 + 80} s={0.75} age={on(f, loses, 20)} f={f} /></g>
        <g opacity={on(f, value, 6) * (1 - 0.5 * on(f, value + 20, 20))}><Arrow x={510} y={Y2 - 140} up={false} p={on(f, value, 12)} color={MAX} len={120} /></g>
        {Array.from({ length: 9 }, (_, i) => <Coin key={i} x={820 + (i % 2) * 8} y={Y2 + 60 - i * 22} s={0.85} color={MAX_L} o={on(f, interest + i * 4, 4)} />)}
        <g opacity={on(f, piling, 6)}><text x={820} y={Y2 + 130} textAnchor="middle" fill={MAX} style={{ font: '400 48px "Bebas Neue"' }}>INTEREST</text></g>
      </g>}
      {/* # same money, opposite endings */}
      {P > 0.001 && <g opacity={P}>
        <Bundle x={300} y={GROUND - 520} s={0.5 * pop(f, s27)} /><Bundle x={700} y={GROUND - 520} s={0.5 * pop(f, same2)} />
        <Person f={f} who="zoe" beats={zB} x={300} y={GROUND + 20} s={0.8} />
        <Person f={f} who="max" beats={mB} x={700} y={GROUND + 20} s={0.8} flip />
        <g opacity={on(f, opposite, 6)}><Arrow x={150} y={GROUND - 380} up p={on(f, opposite, 14)} color={ZOE} len={220} /><Arrow x={860} y={GROUND - 600} up={false} p={on(f, endings, 14)} color={MAX} len={220} /></g>
      </g>}
      {/* # the loop back: the hook's loan paper, BAD stamp → "?" */}
      {L > 0.001 && <g opacity={L} transform={`translate(${CX} 820) rotate(-4)`}>
        <g transform={`scale(${0.9 * pop(f, s28)})`}>
          <rect x={-230} y={-290} width={460} height={580} rx={14} fill={PAPER} stroke={INK} strokeWidth={6} />
          <rect x={-170} y={-230} width={220} height={36} rx={6} fill={INK} />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-170} y={-150 + k * 52} width={k % 2 ? 260 : 340} height={14} rx={7} fill={INK2} opacity={0.4} />)}
          <g opacity={on(f, s28, 4) * (1 - on(f, ask, 10))} transform={`translate(30 ${40 - on(f, ask, 14) * 120}) rotate(-14)`}>
            <rect x={-170} y={-80} width={340} height={160} rx={18} fill="none" stroke={MAX} strokeWidth={14} />
            <text x={0} y={46} textAnchor="middle" fill={MAX} style={{ font: '400 140px "Bebas Neue"', letterSpacing: 8 }}>BAD</text>
          </g>
          <g opacity={on(f, thing, 6)} transform={`translate(20 60) scale(${pop(f, thing)})`}><circle cx={0} cy={-40} r={130} fill={GOLD} /><text x={0} y={30} textAnchor="middle" fill={INK} style={{ font: '400 230px "Bebas Neue"' }}>?</text></g>
        </g>
        <g opacity={on(f, what, 6)}><Cap x={-330} y={-330} s={0.7 * pop(f, what)} f={f} /></g>
        <g opacity={on(f, buy, 6)}><TV x={340} y={-250} s={0.45 * pop(f, buy)} f={f} /></g>
      </g>}
      <Vig id="tw-end" />
      <Headline f={f} lines={[[test, 'THE TEST', INK, 104], [s27, 'SAME $16,000, SAME 10 YEARS', INK, 76], [opposite, 'OPPOSITE ENDINGS', INK, 100], [all, 'ALL DEBT IS BAD?', INK, 100], [what, 'WHAT DID IT BUY?', ZOE, 104]]} />
    </g>
  )
}

export const TW_SIDE = makePiece('tw-side', 'Step three at dusk: a tag 3, then Max’s coral flat and Zoe’s mint flat slide in side by side; Zoe gets a −$5,800 tag and a stack of gold coins grows beside her year by year (+$31,800/YR) while she celebrates; Max gets −$24,200 and his TV and sofa grey out and shrink while he facepalms', {
  canvas: 'tall', mood: 'light', Component: Side,
  beats: ["s22", "s22:ahead", "s22:three", "s22:side", "s23", "s23:5800", "s23:earn", "s23:31800", "s23:every", "s23:year", "s24", "s24:24200", "s24:things", "s24:less", "s24:day"],
  sfx: [['s22:side', 'whoosh', 0.15], ['s23:earn', 'coin', 0.2], ['s24:less', 'swish', 0.15]] })

export const TW_END = makePiece('tw-end', 'The test as two rows of pictures at dusk: GOOD DEBT — bundle → graduation cap → a tall gold coin pile (PAYS BACK) beside a small coral COST pile; BAD DEBT — bundle → a TV that fades, a red down-arrow, a coral INTEREST pile that keeps growing; then Zoe and Max under their same bundles with opposite arrows (green up, red down); last, the hook’s loan paper returns, its BAD stamp lifts off and a big gold ? takes its place, a cap and a TV pop beside it', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s25", "s25:test", "s25:good", "s25:buys", "s25:pays", "s25:more", "s25:costs", "s26", "s26:bad", "s26:loses", "s26:value", "s26:interest", "s26:piling", "s27", "s27:same#2", "s27:opposite", "s27:endings", "s28", "s28:bad", "s28:ask", "s28:thing", "s28:what", "s28:buy"],
  sfx: [['s25:pays', 'coin', 0.2], ['s26:piling', 'thud', 0.15], ['s27:opposite', 'swish', 0.15], ['s28:thing', 'pop', 0.25]] })
