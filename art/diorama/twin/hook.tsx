// ---------------------------------------------------------------- s1–s5: the hook. A brick street at dusk.
// A) a loan paper; a red BAD stamp slams on it ("all debt is bad"). B) Max walks in from the left, Zoe from the
//    right; the exact same $16,000 bundle drops into each one's hands. C) ten years flip by on a wall calendar:
//    Zoe's bundle sends gold coins back to her (paid her back), Max's turns grey and coins drain out (only cost him).
// D) the two bundles side by side with an "=" that turns into a "?"; Max shrugs. E) three paper tags 1-2-3 swing in.
import React from 'react'
import { lerp, on, pop, span, easeOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Bundle, City, Coin, CX, GROUND, HangTag, Headline, INK, INK2, MAX, PAPER, Vig, win, ZOE, Cap, Cross } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const told = c('s1:told'), all = c('s1:all'), bad = c('s1:bad')
  const s2 = c('s2'), zoe = c('s2:zoe'), max = c('s2:max'), borrow = c('s2:borrow'), same = c('s2:same'), d16 = c('s2:16000')
  const s3 = c('s3'), one3 = c('s3:one'), other = c('s3:other'), years = c('s3:years'), paid = c('s3:paid'), cost = c('s3:cost')
  const s4 = c('s4'), debt4 = c('s4:debt#2'), right = c('s4:right'), diff = c('s4:difference')
  const s5 = c('s5'), degree = c('s5:degree'), spot = c('s5:spot'), three = c('s5:three'), steps = c('s5:steps')

  const A = win(f, 0, s2 + 10, 8), B = on(f, s2, 8)
  const mx = lerp(-120, 250, easeOut(span(f, max, max + 34))), zx = lerp(1200, 750, easeOut(span(f, zoe, zoe + 34)))
  const maxB: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 8], [max + 34, 'hold', 'smiling'], [cost, 'despair', 'worried'], [s4, 'shrug', 'thinking'], [diff, 'scratchHead', 'thinking'], [s5, 'idle', 'neutral']]
  const zoeB: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 8], [zoe + 34, 'hold', 'smiling'], [paid, 'celebrate', 'smiling'], [s4, 'think', 'thinking'], [s5, 'present', 'smiling']]
  const C = win(f, s3, s4, 8), D = win(f, s4, s5 + 4, 8), E = on(f, s5, 8)
  const drop = (at: number) => easeOut(span(f, at, at + 14))
  const bund = (x: number, at: number) => ({ x, y: lerp(GROUND - 640, GROUND - 230, drop(at)), o: on(f, at, 4) })
  const mB = bund(mx + 150, d16), zB = bund(zx - 150, d16 + 3)
  const gone = on(f, cost, 16)

  return (
    <g>
      <City id="tw-hook" f={f} />
      {/* # A) the loan paper + the BAD stamp */}
      {A > 0.001 && <g opacity={A} transform={`translate(${CX} 820) scale(${1 - 0.25 * on(f, s2, 10)}) rotate(-4)`}>
        <g transform={`scale(${pop(f, told)})`}>
          <rect x={-230} y={-290} width={460} height={580} rx={14} fill={PAPER} stroke={INK} strokeWidth={6} />
          <rect x={-170} y={-230} width={220} height={36} rx={6} fill={INK} />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-170} y={-150 + k * 52} width={k % 2 ? 260 : 340} height={14} rx={7} fill={INK2} opacity={0.4} />)}
          <path d="M-170 220 q 40 -40 80 0 t 80 0" fill="none" stroke={INK} strokeWidth={5} />
          {/* # the stamp: lands on "bad" */}
          <g opacity={on(f, bad, 3)} transform={`translate(30 40) rotate(-14) scale(${lerp(1.6, 1, easeOut(span(f, bad, bad + 6)))})`}>
            <rect x={-170} y={-80} width={340} height={160} rx={18} fill="none" stroke={MAX} strokeWidth={14} />
            <text x={0} y={46} textAnchor="middle" fill={MAX} style={{ font: '400 140px "Bebas Neue"', letterSpacing: 8 }}>BAD</text>
          </g>
          {/* # the shared doubt: a heavy cloud over the paper */}
          <g opacity={on(f, all, 8)} transform={`translate(0 ${-380 + Math.sin(f / 10) * 6})`}>
            <ellipse cx={-60} cy={0} rx={110} ry={56} fill="#6E6488" /><ellipse cx={60} cy={-16} rx={120} ry={66} fill="#7C729A" /><ellipse cx={0} cy={20} rx={170} ry={44} fill="#6E6488" />
          </g>
        </g>
      </g>}
      {/* # B–D) the two friends on the street */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="max" beats={maxB} x={mx} y={GROUND + 20} s={0.8} />
        <Person f={f} who="zoe" beats={zoeB} x={zx} y={GROUND + 20} s={0.8} flip />
        {/* # the same $16,000 each */}
        {f >= d16 && f < s4 + 8 && <g opacity={1 - on(f, s4, 8)}>
          <Bundle x={mB.x} y={mB.y} s={0.62} o={mB.o} tint={gone} />
          <Bundle x={zB.x} y={zB.y} s={0.62} o={zB.o} />
          <g opacity={win(f, same, s3 + 6)}><HangTag x={CX} y={760} text="SAME $16,000" size={56} r={-3} string={[CX - 150, 700]} s={pop(f, same)} /></g>
        </g>}
      </g>}
      {/* # C) ten years flip by; Zoe's money comes back as coins, Max's drains away */}
      {C > 0.001 && <g opacity={C}>
        <g transform={`translate(${CX} 640)`}>
          <rect x={-120} y={-110} width={240} height={220} rx={14} fill={PAPER} stroke={INK} strokeWidth={5} />
          <rect x={-120} y={-110} width={240} height={56} rx={14} fill={ZOE} />
          <text x={0} y={70} textAnchor="middle" fill={INK} style={{ font: '400 120px "Bebas Neue"' }}>{Math.min(10, Math.max(1, Math.round(1 + 9 * span(f, s3, years + 20))))}</text>
          <text x={0} y={-68} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>YEAR</text>
        </g>
        {[0, 1, 2, 3, 4].map((k) => { const t = span(f, paid + k * 5, paid + k * 5 + 22); if (t <= 0 || t >= 1) return null
          return <Coin key={k} x={lerp(zB.x, zx - 10, t)} y={lerp(zB.y - 60, GROUND - 300, t) - Math.sin(t * Math.PI) * 140} s={0.8} o={1 - t * 0.3} /> })}
        <ellipse cx={zx - 10} cy={GROUND + 20} rx={120} ry={26} fill={ZOE} opacity={0.55 * on(f, one3, 6)} />
        <ellipse cx={mx} cy={GROUND + 20} rx={120} ry={26} fill={MAX} opacity={0.55 * on(f, other, 6)} />
        <g opacity={on(f, paid, 8)}><Cap x={zx - 10} y={GROUND - 520} s={0.6} f={f} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const t = span(f, cost + k * 5, cost + k * 5 + 20); if (t <= 0 || t >= 1) return null
          return <Coin key={k} x={mB.x + (k - 2) * 24} y={lerp(mB.y + 20, GROUND - 10, t)} s={0.7} o={1 - t} color="#E3A08C" /> })}
      </g>}
      {/* # D) "debt is debt, right?": the same two bundles with = turning into ? */}
      {D > 0.001 && <g opacity={D} transform="translate(0 -170)">
        <Bundle x={330} y={800} s={0.8 * pop(f, s4)} /><Bundle x={670} y={800} s={0.8 * pop(f, s4 + 3)} />
        <g opacity={1 - on(f, diff, 6)}><rect x={466} y={740} width={68} height={16} rx={8} fill={INK} /><rect x={466} y={772} width={68} height={16} rx={8} fill={INK} opacity={on(f, debt4, 6)} /></g>
        <g opacity={on(f, diff, 6)} transform={`translate(500 770) scale(${pop(f, diff)})`}><text x={0} y={50} textAnchor="middle" fill={MAX} style={{ font: '400 180px "Bebas Neue"' }}>?</text></g>
        <g opacity={on(f, right, 6)}><HangTag x={CX} y={560} text="DEBT = DEBT?" size={58} r={3} /></g>
      </g>}
      {/* # E) no finance degree needed (a cap, crossed out), then three tags swing in, 1-2-3 */}
      {E > 0.001 && <g opacity={E}>
        <g opacity={win(f, degree, three, 8)}><Cap x={CX} y={720} s={1.3 * pop(f, degree)} f={f} /><Cross x={CX} y={730} r={110} f={f} at={spot} /></g>
        {[0, 1, 2].map((k) => { const at = three + k * 6, sw = Math.sin((f - at) / 9) * 6 * (1 - on(f, at, 40))
          return <g key={k} opacity={on(f, at, 6)}><HangTag x={250 + k * 250} y={760 + k * 20} text={`${k + 1}`} size={110} r={-6 + sw} string={[250 + k * 250, 560]} color={[PAPER, '#FFE2C2', '#DFF3EE'][k]} s={pop(f, at)} /><line x1={250 + k * 250} y1={430} x2={250 + k * 250} y2={560} stroke={INK2} strokeWidth={3} opacity={on(f, at, 6)} /></g> })}
        <g opacity={on(f, steps, 6)}><rect x={150} y={420} width={700} height={12} rx={6} fill={INK} /></g>
      </g>}
      <Vig id="tw-hook" />
      <Headline f={f} lines={[[all, 'ALL DEBT IS BAD?', INK, 104], [zoe, 'TWO FRIENDS', INK, 100], [d16, 'SAME LOAN', ZOE, 100], [years, '10 YEARS LATER', INK, 100], [s4, 'SAME MONEY?', INK, 100], [diff, "WHAT'S THE DIFFERENCE?", MAX, 88], [three, '3 STEPS', INK, 104]]} />
    </g>
  )
}

export const TW_HOOK = makePiece('tw-hook', 'Hook on a brick street at dusk: a loan paper under a grey cloud gets a red BAD stamp; Max walks in from the left and Zoe from the right and the exact same $16,000 cash bundle drops into each one’s hands (tag SAME $16,000); a wall calendar flips 1→10 years: gold coins fly back from Zoe’s bundle to her and a graduation cap appears, Max’s bundle turns grey and coins drain to the pavement; the two bundles side by side with an = that turns into a red ?; a graduation cap crossed out, then three paper tags 1-2-3 swing in on strings', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1:told", "s1:all", "s1:bad", "s2", "s2:zoe", "s2:max", "s2:same", "s2:16000", "s3", "s3:one", "s3:other", "s3:years", "s3:paid", "s3:cost", "s4", "s4:debt#2", "s4:right", "s4:difference", "s5", "s5:degree", "s5:spot", "s5:three", "s5:steps"],
  sfx: [['s1:bad', 'thump', 0.3], ['s2:16000', 'cash', 0.2], ['s3:paid', 'coin', 0.2], ['s4:difference', 'pop', 0.2], ['s5:three', 'click', 0.15]] })
