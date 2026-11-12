// ---------------------------------------------------------------- s20–s24a: step three — make the brand your own.
// A) lane badge 3; Jeff Johnson gets an idea (a lightbulb), a name card NIKE; a winged marble statue: GODDESS OF VICTORY.
// B) Carolyn Davidson at a drafting table; the little tick draws itself on the sheet; her invoice slides in: $35.
// C) a row of shoe boxes, each with the tick, rolls out of the car; customers' speech bubbles all show the tick:
//    people ask for Nike, a name the company owns.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Shoe, OregonWorld, Vig, Headline, Drafting, Invoice, ShoeBox, Tag, LaneBadge, Bubble, Tick, win, CX, FLOOR, INK, ORANGE, MUSTARD, RED, GREEN, TEAL, PAPER, BROWN } from './kit'

const Brand: React.FC<PieceProps> = ({ f, c }) => {
  const s20 = c('s20'), brand = c('s20:brand')
  const s21 = c('s21'), jeff = c('s21:jeff'), name = c('s21:name'), nike = c('s21:nike'), greek = c('s21:greek'), victory = c('s21:victory')
  const s22 = c('s22'), design = c('s22:design'), carolyn = c('s22:carolyn'), drew = c('s22:drew'), logo = c('s22:logo')
  const s23 = c('s23'), bill = c('s23:bill'), d35 = c('s23:35')
  const s24 = c('s24'), every = c('s24:every'), own = c('s24:own'), someone = c('s24:someone')
  const s24a = c('s24a'), ask = c('s24a:ask'), owned = c('s24a:owned')

  const A = win(f, s20, s22), B = win(f, s22, s24), Cc = on(f, s24, 8)
  const jeffB: Beat[] = [[0, 'idle', 'neutral'], [jeff, 'think', 'thinking'], [name, 'pointUp', 'smiling'], [victory, 'present', 'smiling']]
  const carB: Beat[] = [[0, 'idle', 'neutral'], [design, 'think', 'thinking'], [drew, 'point', 'smiling'], [bill, 'offer', 'smiling']]

  return (
    <g>
      <OregonWorld f={f} id="nk-brand" />
      {/* # A) the name */}
      {A > 0.001 && <g opacity={A}>
        <LaneBadge x={CX} y={560} n={3} s={pop(f, s20)} o={on(f, s20, 8) * (1 - on(f, s21, 8))} />
        <Person f={f} who="worker" beats={jeffB} x={230} y={FLOOR} s={0.95} o={on(f, s21 - 4, 8)} />
        <Tag x={230} y={560} t="JEFF JOHNSON" size={40} o={on(f, jeff, 8)} />
        {/* # the lightbulb idea */}
        <g opacity={on(f, name, 8) * (1 - on(f, greek, 8))} transform={`translate(400 640) scale(${pop(f, name)})`}>
          <circle r={56} fill="#FFF0A8" stroke={MUSTARD} strokeWidth={6} /><rect x={-24} y={50} width={48} height={36} rx={6} fill="#B9C3CC" />
        </g>
        <g opacity={on(f, nike, 8)} transform={`translate(700 ${lerp(760, 700, on(f, nike, 12))}) scale(${pop(f, nike)})`}>
          <rect x={-150} y={-70} width={300} height={140} rx={10} fill={PAPER} stroke={INK} strokeWidth={5} />
          <text y={36} textAnchor="middle" fill={INK} style={{ font: '400 110px "Bebas Neue"', letterSpacing: 8 }}>NIKE</text>
        </g>
        {/* # the winged goddess statue */}
        <g opacity={on(f, greek, 8)} transform={`translate(700 ${FLOOR}) scale(${0.9 * pop(f, greek)})`}>
          <rect x={-90} y={-60} width={180} height={60} fill="#E8E1D4" stroke={INK} strokeWidth={4} />
          <path d="M-20 -60 L-30 -240 Q0 -270 30 -240 L20 -60 Z" fill="#F2EEE6" stroke={INK} strokeWidth={4} />
          <circle cx={0} cy={-270} r={24} fill="#F2EEE6" stroke={INK} strokeWidth={4} />
          <path d="M-24 -230 Q-140 -320 -170 -200 Q-110 -230 -26 -170 Z M24 -230 Q140 -320 170 -200 Q110 -230 26 -170 Z" fill="#F7F4EE" stroke={INK} strokeWidth={4} />
        </g>
        <Tag x={700} y={560} t="GODDESS OF VICTORY" size={38} col={MUSTARD} o={on(f, victory, 8)} />
      </g>}
      {/* # B) the logo and its bill */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="investorF" beats={carB} x={220} y={FLOOR} s={0.95} />
        <Tag x={220} y={560} t="CAROLYN DAVIDSON" size={38} o={on(f, carolyn, 8)} />
        <Drafting x={650} y={FLOOR} s={1.0} p={on(f, drew, 24)} o={on(f, s22 + 4, 8)} />
        <Invoice x={lerp(1300, 780, on(f, bill, 16))} y={660} s={0.7} r={6} amtO={on(f, d35, 8)} />
      </g>}
      {/* # C) every pair builds their own name */}
      {Cc > 0.001 && <g opacity={Cc}>
        {Array.from({ length: 8 }, (_, k) => <ShoeBox key={k} x={160 + (k % 4) * 210} y={FLOOR - Math.floor(k / 4) * 100} s={1.05} col={[ORANGE, MUSTARD, '#5C8FB0', TEAL][k % 4]} tick o={on(f, every + k * 3, 6) * (1 - on(f, s24a, 8))} />)}
        <g opacity={on(f, own, 8) * (1 - on(f, s24a, 8))}><Shoe x={CX} y={928} s={1.0} tick={on(f, own, 14)} /></g>
        <Tag x={CX} y={560} t="THEIR OWN NAME" size={50} col={GREEN} tc={PAPER} o={on(f, own + 4, 8) * (1 - on(f, someone, 8))} />
        <g opacity={on(f, s24a, 8)}>
          {[0, 1, 2, 3].map((k) => <g key={k}><Mini look={['buyer', 'investorF', 'worker', 'owner'][k]} x={170 + k * 220} y={FLOOR} scale={0.85} frame={f} seed={k + 31} mood="happy" />
            <Bubble x={190 + k * 220} y={820} s={1.0} o={on(f, ask + k * 4, 8)} /></g>)}
          <Tag x={CX} y={600} t="A NAME THEY OWNED" size={48} col={GREEN} tc={PAPER} o={on(f, owned, 8)} />
        </g>
      </g>}
      <Vig id="nk-brand" />
      <Headline f={f} lines={[[s20, 'STEP 3: YOUR OWN BRAND', INK, 88], [s21, 'THE NAME: NIKE', INK, 104], [s22, 'THE LOGO', INK, 110], [s23, 'HER BILL: $35', RED, 108], [s24, 'EVERY PAIR, THEIR NAME', TEAL, 92]]} />
    </g>
  )
}

export const NK_BRAND = makePiece('nk-brand', 'Step 3 on the Oregon track: lane badge 3; Jeff Johnson thinks, a lightbulb pops and a name card NIKE appears; a winged white marble statue on a plinth (GODDESS OF VICTORY); then Carolyn Davidson at a wooden drafting table where the little tick draws itself on the sheet; her INVOICE drops in: $35; then rows of colourful shoe boxes each carrying the tick, a big orange tick (THEIR OWN NAME); customers whose speech bubbles all show the tick (A NAME THEY OWNED).', {
  canvas: 'tall', mood: 'light', Component: Brand,
  beats: ["s20", "s20:brand", "s21", "s21:jeff", "s21:name", "s21:nike", "s21:greek", "s21:victory", "s22", "s22:design", "s22:carolyn", "s22:drew", "s22:logo", "s23", "s23:bill", "s23:35", "s24", "s24:every", "s24:own", "s24:someone", "s24a", "s24a:ask", "s24a:owned"],
  sfx: [['s21:nike', 'pop', 0.2], ['s22:drew', 'swish', 0.2], ['s23:35', 'ding', 0.2], ['s24a:ask', 'softpop', 0.15]] })
