// ---------------------------------------------------------------- s14–s17: you are not alone.
// A) a lecture hall fills seat by seat; on "95" nineteen of the twenty students drift to their phones
//    (a lilac puff over each) and the count reads UP TO 95%. B) five adults on a street; one has a looping
//    arrow over him: NOT A BAD WEEK → A HABIT. C) the bigger the task matters, the bigger the fog: the laptop
//    grows, the fog swells to fill the frame, a crack runs through a gold trophy on "hurt".
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Fog, Headline, Laptop, Person, Phone, SVig, Tag, win, CORAL, CREAM, GOLD, INK, BURG, TEAL, SAGE, GROUND, CX, W, H, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Company: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), sounds = c('s14:sounds'), big = c('s14:big'), company = c('s14:company')
  const s15 = c('s15'), review = c('s15:review'), estimates = c('s15:estimates'), n95 = c('s15:95'), college = c('s15:college'), procr = c('s15:procrastinate')
  const s16 = c('s16'), adult = c('s16:adult'), five = c('s16:five'), week = c('s16:week'), habit = c('s16:habit')
  const s17 = c('s17'), matters = c('s17:matters'), louder = c('s17:louder'), failing = c('s17:failing'), hurt = c('s17:hurt')

  const A = win(f, 0, s16 + 4), B = win(f, s16, s17 + 4), C = on(f, s17, 10)
  const drift = on(f, n95, 10)
  const heroC: Beat[] = [[s17, 'idle', 'neutral'], [matters, 'holdChest', 'thinking'], [louder, 'nervous', 'worried'], [failing, 'despair', 'worried'], [hurt, 'slump', 'worried']]

  return (
    <g>
      {/* # a warm hall: sage walls, coral rows */}
      <rect width={W} height={H} fill={SAGE.sky[0]} />
      <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={SAGE.floor} />
      {/* # A) the lecture hall: 4 rows × 5 seats, filling on "company" */}
      {A > 0.001 && <g opacity={A}>
        <rect x={160} y={400} width={760} height={120} rx={10} fill={TEAL} stroke={INK} strokeWidth={6} />
        <text x={CX} y={480} textAnchor="middle" fill={CREAM} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 6 }}>LECTURE 1</text>
        {Array.from({ length: 20 }, (_, k) => {
          const row = Math.floor(k / 5), col = k % 5, x = 160 + col * 190, y = 760 + row * 150
          const lost = k !== 7 // # one student out of twenty keeps working
          return <g key={k} opacity={on(f, company + k, 4)}>
            <Mini look={k % 3 === 0 ? 'hero-struggling' : k % 3 === 1 ? 'hero-fit' : 'hero-rich'} x={x} y={y} scale={1.05} frame={f} seed={k} mood={lost ? 'neutral' : 'happy'} />
            <rect x={x - 70} y={y - 40} width={140} height={34} rx={6} fill={CORAL} stroke={INK} strokeWidth={4} />
            {lost && <g opacity={drift * on(f, procr + (k % 5) * 2, 6)}><Fog f={f} seed={k} x={x + 40} y={y - 190} s={0.22} /><Phone x={x - 30} y={y - 70} s={0.22} /></g>}
          </g>
        })}
        <g opacity={on(f, n95, 6)}><Tag x={CX} y={640} text="UP TO 95%" s={pop(f, n95)} size={80} fill={GOLD} /></g>
        <g opacity={on(f, review, 6) * (1 - on(f, n95, 6))}><Tag x={CX} y={640} text={f >= estimates ? 'ESTIMATES' : 'ONE BIG REVIEW'} s={pop(f, review)} size={58} /></g>
      </g>}
      {/* # B) one adult in five: a habit, not a bad week */}
      {B > 0.001 && <g opacity={B}>
        <rect x={0} y={GROUND - 40} width={W} height={40} fill={SAGE.trim} />
        {[0, 1, 2, 3, 4].map((k) => {
          const x = 150 + k * 195, me = k === 2
          return <g key={k} opacity={on(f, adult + k * 3, 5)}>
            {me && <circle cx={x} cy={GROUND - 230} r={170} fill={GOLD} opacity={0.3 * on(f, five, 8)} />}
            <Mini look={me ? 'hero-struggling' : k % 2 ? 'hero-fit' : 'hero-rich'} x={x} y={GROUND} scale={2.3} frame={f} seed={k + 30} mood={me ? 'sad' : 'neutral'} />
            {me && <g opacity={on(f, habit, 6)} transform={`translate(${x} ${GROUND - 620}) rotate(${(f - habit) * 4})`}>
              <path d="M-70 0 A70 70 0 1 1 0 70" stroke={CORAL} strokeWidth={14} fill="none" strokeLinecap="round" /><path d="M-10 54 L4 72 L-16 86" stroke={CORAL} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>}
          </g>
        })}
        <g opacity={on(f, five, 6)}><Tag x={CX} y={560} text="1 IN 5" s={pop(f, five)} size={80} fill={GOLD} /></g>
        <g opacity={on(f, week, 6) * (1 - on(f, habit, 6))} transform="translate(540 1110)">
          <Tag x={0} y={0} text="A BAD WEEK" s={pop(f, week)} size={50} />
          <path d={`M-170 -4 L${lerp(-170, 170, easeOut(span(f, week + 4, week + 14)))} 6`} stroke="#D2463C" strokeWidth={12} strokeLinecap="round" />
        </g>
        <g opacity={on(f, habit, 6)}><Tag x={CX} y={1110} text="A HABIT" s={pop(f, habit)} size={60} fill={CREAM} ink={BURG} /></g>
      </g>}
      {/* # C) the more it matters, the louder the feeling */}
      {C > 0.001 && <g opacity={C}>
        <Laptop x={700} y={1100} s={lerp(0.7, 1.15, easeOut(span(f, matters, louder + 10)))} glow={1} title="MY DREAM" />
        <Fog f={f} seed={9} x={700} y={640} s={lerp(0.4, 1.5, easeOut(span(f, louder, failing + 10)))} o={on(f, louder, 8)} />
        {/* # the trophy of "what if I fail": it cracks on "hurt" */}
        <g opacity={on(f, failing, 6)} transform={`translate(760 520) scale(${pop(f, failing) * 0.9})`}>
          <path d="M-80 -110 L80 -110 L64 -10 Q0 40 -64 -10 Z" fill={GOLD} stroke={INK} strokeWidth={6} />
          <rect x={-16} y={20} width={32} height={60} fill={GOLD} stroke={INK} strokeWidth={5} /><rect x={-60} y={80} width={120} height={30} rx={6} fill={BURG} stroke={INK} strokeWidth={5} />
          <path d={`M-10 -110 L10 -70 L-14 -40 L${lerp(-14, 8, on(f, hurt, 6))} ${lerp(-40, -4, on(f, hurt, 6))}`} stroke={INK} strokeWidth={6} fill="none" opacity={on(f, hurt, 4)} />
        </g>
        <Person f={f} who="hero-struggling" beats={heroC} x={260} s={0.9} />
      </g>}
      <Headline text={f < s15 ? "YOU'RE NOT ALONE" : f < s17 ? '' : 'MATTERS MORE, FEELS WORSE'} o={f < s15 ? on(f, sounds, 8) * (1 - on(f, s15 - 4, 4)) : f >= s17 ? on(f, louder, 8) : 0} color={INK} />
      <rect width={W} height={H} fill="url(#pcf-vg)" opacity={0} />
      <SVig id="pcc" />
      <defs><radialGradient id="pcc-vg" cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.22} /></radialGradient></defs>
    </g>
  )
}

export const PC_COMPANY = makePiece('pc-company', 'Procrastination: 95% of students, 1 in 5 adults, the louder fog', {
  beats: ['s14', 's14:sounds', 's14:big', 's14:company', 's15', 's15:review', 's15:estimates', 's15:95', 's15:college', 's15:procrastinate', 's16', 's16:adult', 's16:five', 's16:week', 's16:habit', 's17', 's17:matters', 's17:louder', 's17:gets', 's17:because', 's17:failing', 's17:hurt'],
  sfx: [['s14:company', 'softpop'], ['s15:95', 'ding'], ['s16:five', 'pop'], ['s16:habit', 'swish'], ['s17:hurt', 'crack']],
  Component: Company, mood: 'light', canvas: 'tall',
})
