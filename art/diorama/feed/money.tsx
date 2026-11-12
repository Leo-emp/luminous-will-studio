// ---------------------------------------------------------------- s5–s9: STEP ONE — where the money comes from.
// A) the giant phone scrolls; every third post is now a gold AD post; on "impression" the AD post glows as it
//    passes. B) three businesses on the left drop coins that fly into the ad slots. C) a big ring: $64.6B, 98% of it
//    from ads. D) two glowing bars rise: +10% MORE ADS and +14% PRICE PER AD.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { FeedWorld, Vig, Headline, Pill, Coin, FeedPhone, Biz, Ring, Glint, flyTo, win, CX, FLOOR, WHITE, PINK, CYAN, MINT, GOLD, SOFT, TXT } from './kit'

const Money: React.FC<PieceProps> = ({ f, c }) => {
  const one = c('s5:one'), money = c('s5:money'), comes = c('s5:comes')
  const posts = c('s6:posts'), ad = c('s6:ad'), shows = c('s6:shows'), screen = c('s6:screen'), impression = c('s6:impression')
  const businesses = c('s7:businesses'), pay = c('s7:pay'), ads7 = c('s7:ads'), front = c('s7:front')
  const july = c('s8:july'), september = c('s8:september'), made = c('s8:made'), d646 = c('s8:646'), d98 = c('s8:98'), ads8 = c('s8:ads')
  const year = c('s9:year'), showed = c('s9:showed'), d10 = c('s9:10'), charged = c('s9:charged'), d14 = c('s9:14'), each = c('s9:each')

  const A = win(f, c('s5') - 2, july - 2), Cc = win(f, july - 2, c('s9') - 2), D = on(f, c('s9') - 2, 8)
  const shift = on(f, businesses, 18)
  const sc = (f - c('s5')) * 6
  return (
    <g>
      <FeedWorld f={f} id="ig-money" />
      {A > 0.001 && <g opacity={A}>
        <FeedPhone x={lerp(CX, 660, shift)} y={810} s={lerp(0.82, 0.74, shift)} f={f} scroll={sc} adEvery={f >= ad ? 3 : 0} adGlow={on(f, impression, 8)} />
        {[0, 1, 2].map((k) => { const bx = 190, by = 560 + k * 300
          return <g key={k} opacity={on(f, businesses + k * 3, 8)}>
            <Biz x={bx} y={by + 80} kind={k as 0 | 1 | 2} s={0.6} />
            {f >= pay + k * 4 && Array.from({ length: 2 }, (_, i) => { const t0 = pay + k * 4 + i * 14, p = flyTo(f, t0, [bx, by - 60], [660, 560 + ((k + i) % 3) * 220], 18, 90)
              return f >= t0 && p[2] < 1 ? <Coin key={i} x={p[0]} y={p[1]} s={0.6} /> : null })}
          </g> })}
        <Glint f={f} at={money} x={CX + 200} y={420} col={GOLD} />
        <Glint f={f} at={comes} x={CX - 200} y={600} col={CYAN} />
        <Glint f={f} at={posts} x={CX} y={500} col={PINK} />
        <Glint f={f} at={shows} x={CX + 150} y={760} col={GOLD} />
        <Glint f={f} at={screen} x={CX - 150} y={1000} col={CYAN} />
        <Glint f={f} at={ads7} x={660} y={500} col={GOLD} />
        <Glint f={f} at={front} x={660} y={1000} col={GOLD} />
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        <Ring x={CX} y={780} r={260} p={on(f, d98, 30) * 0.976} col={GOLD} t={f >= d646 ? '$64.6B' : ''} sub={f >= d98 ? '98% FROM ADS' : f >= made ? 'REVENUE' : ''} s={pop(f, july - 2)} />
        <g opacity={on(f, july, 6)}><Pill x={CX} y={1180} t={f >= september ? 'JULY – SEPT 2026' : 'JULY'} size={44} col="#3E3490" /></g>
        <Glint f={f} at={ads8} x={CX + 230} y={560} col={GOLD} />
      </g>}
      {D > 0.001 && <g opacity={D}>
        {[[showed, d10, '+10%', 'MORE ADS', CYAN, 0.62], [charged, d14, '+14%', 'PRICE PER AD', PINK, 0.82]].map(([a, b, v, l, col, hgt], k) => { const x = 300 + k * 400, base = 1180, h = 560 * (hgt as number) * on(f, b as number, 18)
          return <g key={k} opacity={on(f, a as number, 6)}>
            <rect x={x - 110} y={base - h} width={220} height={h} rx={24} fill={col as string} />
            <rect x={x - 110} y={base - h} width={220} height={Math.min(h, 30)} rx={15} fill={WHITE} opacity={0.3} />
            <text x={x} y={base - h - 30} textAnchor="middle" fill={WHITE} style={TXT(90)} opacity={on(f, b as number, 6)}>{v as string}</text>
            <text x={x} y={base + 56} textAnchor="middle" fill={SOFT} style={TXT(48)}>{l as string}</text>
          </g> })}
        <line x1={150} y1={1180} x2={850} y2={1180} stroke={SOFT} strokeWidth={4} />
        <Glint f={f} at={year} x={CX} y={500} col={GOLD} />
        <Glint f={f} at={each} x={700} y={560} col={GOLD} />
      </g>}
      <Vig id="ig-money" />
      <Headline f={f} lines={[[one, 'STEP 1', PINK, 120], [money, 'WHERE THE MONEY COMES FROM', WHITE, 80], [ad, 'EVERY FEW POSTS: AN AD', GOLD, 88], [impression, '= AN AD IMPRESSION', GOLD, 96], [businesses, 'BUSINESSES PAY META', WHITE, 96], [july, 'META, JULY – SEPTEMBER 2026', WHITE, 80], [year, 'VS A YEAR BEFORE', WHITE, 104]]} />
    </g>
  )
}

export const IG_MONEY = makePiece('ig-money', 'Step one: the giant glowing phone keeps scrolling and every third post becomes a gold AD post that glows as it passes (an ad impression); the phone slides right while three little glowing businesses appear down the left and toss gold coins that arc into the ad slots; then a big gold ring fills to 98% around $64.6B (98% FROM ADS, JULY – SEPT 2026); finally two glowing bars rise — a cyan +10% MORE ADS and a pink +14% PRICE PER AD.', {
  canvas: 'tall', mood: 'dark', Component: Money,
  beats: ["s5:one", "s5:money", "s5:comes", "s6:posts", "s6:ad", "s6:shows", "s6:screen", "s6:impression", "s7:businesses", "s7:pay", "s7:ads", "s7:front", "s8:july", "s8:september", "s8:made", "s8:646", "s8:98", "s8:ads", "s9:year", "s9:showed", "s9:10", "s9:charged", "s9:14", "s9:each", "s5", "s9"],
  sfx: [['s6:ad', 'pop', 0.2], ['s7:pay', 'coin', 0.2], ['s8:646', 'ding', 0.25], ['s9:14', 'riser', 0.2]] })
