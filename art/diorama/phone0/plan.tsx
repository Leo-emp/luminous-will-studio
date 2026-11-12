// ---------------------------------------------------------------- s21–s25: even if you stay — the plan you must keep.
// A) two plan cards: THE PLAN YOU'D PICK and THE DEAL'S PLAN (it glows, "required"); an EXAMPLE pill; the deal plan's
//    card gets a coral +$15 sticker. B) a coin drip: each month one +$15 coin falls into a coral jar — 36 coins — the jar
//    reads $540. C) a tall gold stack of $900 credits; the $540 slides off it into the jar; $360 is what is left.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { StoreWorld, Vig, Headline, Pill, PlanCard, Coin, Stack, Glint, win, CX, FLOOR, INK, TEAL, TEAL2, CORAL, CORAL2, SUN, SUN2, PLUM, WHITE, TXT, SHADE } from './kit'

const Jar: React.FC<{ x: number; y: number; fill: number; t?: string; o?: number }> = ({ x, y, fill, t, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={16} fill={SHADE} />
    <clipPath id="ph-jar"><path d="M-120 0 L-130 -300 Q-130 -330 -100 -330 L100 -330 Q130 -330 130 -300 L120 0 Z" /></clipPath>
    <path d="M-120 0 L-130 -300 Q-130 -330 -100 -330 L100 -330 Q130 -330 130 -300 L120 0 Z" fill="#FFFFFF" opacity={0.55} stroke="#CFC2EE" strokeWidth={5} />
    <g clipPath="url(#ph-jar)"><rect x={-140} y={-330 * fill} width={280} height={330 * fill} fill={CORAL} opacity={0.85} />
      {Array.from({ length: Math.round(12 * fill) }, (_, i) => <ellipse key={i} cx={((i * 53) % 180) - 90} cy={-20 - i * 26} rx={46} ry={12} fill={SUN2} opacity={0.6} />)}</g>
    <rect x={-100} y={-370} width={200} height={40} rx={10} fill="#A99BD0" />
    {t && <text y={-130} textAnchor="middle" fill={WHITE} style={TXT(84)}>{t}</text>}
  </g>
)

const Plan: React.FC<PieceProps> = ({ f, c }) => {
  const stay = c('s21:stay'), years = c('s21:years'), cost = c('s21:cost')
  const deals = c('s22:deals'), require = c('s22:require'), plans = c('s22:plans')
  const say = c('s23:say'), keep = c('s23:keep'), d15 = c('s23:15'), more = c('s23:more'), pick = c('s23:pick')
  const d36 = c('s24:36'), months = c('s24:months'), d540 = c('s24:540'), extra = c('s24:extra')
  const s25 = c('s25'), d900 = c('s25:900'), saved = c('s25:saved'), you25 = c('s25:you'), d360 = you25 + 8

  const A = win(f, c('s21') - 2, c('s24') - 2), B = on(f, c('s24') - 2, 8), Cst = on(f, s25 - 2, 8)
  const coinsIn = Math.min(36, Math.max(0, (f - d36) / 1.2))
  return (
    <g>
      <StoreWorld f={f} id="ph-plan" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, years, 6)}><Pill x={CX} y={470} t="YOU STAY ALL 3 YEARS" size={44} col={TEAL2} s={pop(f, years)} /></g>
        <g opacity={on(f, plans - 4, 6)}><PlanCard x={280} y={830} s={0.9 * pop(f, plans - 4)} name="YOU'D PICK" price="$" col={TEAL} /></g>
        <g opacity={on(f, require, 6)}><PlanCard x={720} y={830} s={0.9 * pop(f, require)} name="DEAL NEEDS" price={f >= d15 ? '$$' : '$'} col={PLUM} lit={on(f, keep, 8)} /></g>
        <g opacity={on(f, say, 6)}><Pill x={CX} y={1180} t="EXAMPLE" size={38} col={INK} /></g>
        <g opacity={on(f, d15, 6)} transform={`translate(880 1010) rotate(10) scale(${pop(f, d15)})`}>
          <circle r={92} fill={SHADE} transform="translate(6 8)" /><circle r={92} fill={CORAL} /><circle r={76} fill="none" stroke={WHITE} strokeWidth={4} opacity={0.6} />
          <text y={22} textAnchor="middle" fill={WHITE} style={TXT(64)}>+$15</text>
        </g>
        <Glint f={f} at={cost} x={CX + 200} y={470} />
        <Glint f={f} at={deals} x={720} y={640} />
        <Glint f={f} at={more} x={830} y={540} />
        <Glint f={f} at={pick} x={280} y={640} />
        <Glint f={f} at={stay} x={CX - 220} y={470} />
      </g>}
      {B > 0.001 && <g opacity={B * (1 - on(f, s25 - 2, 8)) + Cst}>
        <Jar x={lerp(CX, 760, Cst)} y={FLOOR - 40} fill={Math.min(1, coinsIn / 36) * 0.85} t={f >= d540 ? '$540' : ''} />
        {B > 0 && Cst === 0 && f >= d36 && coinsIn < 36 && Array.from({ length: 3 }, (_, i) => { const ph = ((f - d36) / 10 + i / 3) % 1
          return <Coin key={i} x={CX + ((i * 37) % 60) - 30} y={lerp(420, FLOOR - 340, ph)} s={0.6} col={SUN} t="15" /> })}
        <g opacity={on(f, months, 6) * (1 - on(f, s25 - 2, 6))}><Pill x={CX} y={520} t={`${Math.min(36, Math.floor(coinsIn))} OF 36 MONTHS`} size={44} col={PLUM} /></g>
        <Glint f={f} at={extra} x={CX + 140} y={FLOOR - 400} />
      </g>}
      {Cst > 0.001 && <g opacity={Cst}>
        <Stack x={300} y={FLOOR - 40} n={lerp(22, 9, on(f, saved, 20))} s={1.2} />
        {f >= saved && on(f, saved, 20) < 1 && Array.from({ length: 4 }, (_, i) => { const ph = on(f, saved + i * 3, 16)
          return ph > 0 && ph < 1 ? <Coin key={i} x={lerp(300, 760, ph)} y={lerp(700, FLOOR - 340, ph) - Math.sin(Math.PI * ph) * 160} s={0.7} col={SUN} /> : null })}
        <g opacity={on(f, d900, 6) * (1 - on(f, saved, 8))}><Pill x={300} y={470} t="$900 OF CREDITS" size={44} col={SUN2} s={pop(f, d900)} /></g>
        <g opacity={on(f, d360, 6)}><Pill x={300} y={560} t="$360 SAVED" size={58} col={TEAL2} s={pop(f, d360)} /></g>
      </g>}
      <Vig id="ph-plan" />
      <Headline f={f} lines={[[cost, 'ONE MORE COST', INK, 110], [require, 'DEALS NEED CERTAIN PLANS', INK, 84], [d15, '+$15 A MONTH (EXAMPLE)', CORAL2, 88], [d36, '$15 × 36 MONTHS', INK, 104], [d540, '= $540 EXTRA', CORAL2, 120], [d900, '$900 − $540', INK, 120], [d360, '= $360 SAVED', TEAL2, 120]]} />
    </g>
  )
}

export const PH_PLAN = makePiece('ph-plan', 'Even if you stay all 3 years: two plan cards — a teal YOU\'D PICK and a glowing plum DEAL NEEDS card that gets a coral +$15 sticker (EXAMPLE); then gold $15 coins drop one by one into a big glass jar that fills coral, counting the months to 36, and the jar reads $540; finally a tall gold stack of $900 of credits loses coins that arc across into the $540 jar, leaving a short stack — $360 SAVED.', {
  canvas: 'tall', mood: 'light', Component: Plan,
  beats: ["s21:stay", "s21:years", "s21:cost", "s22:deals", "s22:require", "s22:plans", "s23:say", "s23:keep", "s23:15", "s23:more", "s23:pick", "s24:36", "s24:months", "s24:540", "s24:extra", "s25", "s25:900", "s25:saved", "s25:you", "s21", "s24"],
  sfx: [['s23:15', 'pop', 0.25], ['s24:36', 'tick', 0.15], ['s24:540', 'cash', 0.25], ['s25:saved', 'coin', 0.25]] })
