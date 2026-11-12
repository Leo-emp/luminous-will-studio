// ---------------------------------------------------------------- s7–s14a: step one — be the middleman.
// A) lane badge 1; a factory (left) → a shoe box (middle) → a runner (right): the middleman. Then 1964: Phil Knight (a
//    runner) and Bill Bowerman (his coach, clipboard) each hold up a $500 note; a blue ribbon rosette: BLUE RIBBON SPORTS.
// B) a factory gets a cross (they made no shoes); a plain box with an empty dashed logo spot; the car trunk full of boxes.
// C) across the sea, ONITSUKA TIGER · JAPAN: boxes arc over to the car; runners on the track; Knight sells from the trunk.
// D) a stack of boxes: 1,300 PAIRS → a cash bag $8,000 → one shoe ≈ $6 A PAIR; boxes stack one at a time.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { OregonWorld, Vig, Headline, Factory, ShoeBox, Shoe, Car, Note, Calendar, Tag, Cross, LaneBadge, CashBag, arcAt, win, CX, FLOOR, INK, ORANGE, MUSTARD, RED, GREEN, TEAL, PAPER, NAVY } from './kit'

const Middle: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), middleman = c('s7:middleman')
  const s8 = c('s8'), runner = c('s8:runner'), phil = c('s8:phil'), coach = c('s8:coach'), bill = c('s8:bill'), each = c('s8:each'), d500 = c('s8:500')
  const s9 = c('s9'), blue = c('s9:blue')
  const s10 = c('s10'), make = c('s10:make')
  const s10a = c('s10a'), factory = c('s10a:factory'), logo = c('s10a:logo'), boxes = c('s10a:boxes'), car10 = c('s10a:car')
  const japanese = c('s11:japanese'), s11 = c('s11'), bought = c('s11:bought'), onitsuka = c('s11:onitsuka'), sold = c('s11:sold'), america = c('s11:america')
  const s12 = c('s12'), track = c('s12:track'), car12 = c('s12:car')
  const s13 = c('s13'), d1300 = c('s13:1300'), d8000 = c('s13:8000')
  const s14 = c('s14'), d6 = c('s14:6')
  const s14a = c('s14a'), business = c('s14a:business'), pair = c('s14a:pair'), time = c('s14a:time')

  const A1 = win(f, s7, s8), A2 = win(f, s8, s10), B = win(f, s10, s11), Cc = win(f, s11, s13), D = on(f, s13, 8)
  const knB: Beat[] = [[0, 'idle', 'smiling'], [runner, 'waveA', 'smiling', 'waveB', 10], [each, 'holdUp', 'smiling']]
  const boB: Beat[] = [[0, 'idle', 'neutral'], [coach, 'explain', 'smiling'], [each, 'holdUp', 'smiling']]
  const kn = hand(f, knB, 260, FLOOR, 0.95), bo = hand(f, boB, 620, FLOOR, 0.95)
  const sellB: Beat[] = [[0, 'idle', 'smiling'], [track, 'offer', 'smiling'], [car12, 'present', 'smiling']]

  return (
    <g>
      <OregonWorld f={f} id="nk-mid" />
      {/* # A1) the middleman in one picture */}
      {A1 > 0.001 && <g opacity={A1}>
        <LaneBadge x={CX} y={540} n={1} s={pop(f, s7)} />
        <Factory x={190} y={FLOOR - 40} s={0.8} o={on(f, middleman - 2, 8)} />
        <ShoeBox x={CX} y={FLOOR - 60} s={1.2} o={on(f, middleman + 4, 8)} />
        <Tag x={CX} y={900} t="MIDDLEMAN" size={46} col={MUSTARD} o={on(f, middleman, 8)} />
        <g opacity={on(f, middleman + 8, 8)}><Mini look="buyer" x={820} y={FLOOR} scale={0.9} frame={f} seed={3} mood="happy" /></g>
        {[[300, 620], [600, 760]].map(([a, b], k) => <path key={k} d={`M${a + 20} 1150 L${b - 20} 1150`} stroke={INK} strokeWidth={8} strokeLinecap="round" opacity={on(f, middleman + 6 + k * 4, 6)} />)}
      </g>}
      {/* # A2) 1964: two founders, $500 each, Blue Ribbon Sports */}
      {A2 > 0.001 && <g opacity={A2}>
        <Calendar x={820} y={780} s={0.9} t="1964" o={on(f, s8, 8) * (1 - on(f, bill - 6, 8))} />
        <Person f={f} who="investor" beats={knB} x={260} y={FLOOR} s={0.95} o={on(f, runner - 4, 8)} />
        <Person f={f} who="owner" beats={boB} x={620} y={FLOOR} s={0.95} o={on(f, coach - 4, 8)} />
        <Tag x={260} y={560} t="PHIL KNIGHT" size={40} o={on(f, phil, 8)} />
        <Tag x={620} y={560} t="BILL BOWERMAN · COACH" size={36} o={on(f, bill, 8)} />
        <Note x={kn.x} y={kn.y - 30} s={0.6} o={on(f, each, 8)} />
        <Note x={bo.x} y={bo.y - 30} s={0.6} o={on(f, each + 3, 8)} />
        {/* # the blue ribbon rosette */}
        <g opacity={on(f, blue, 8)} transform={`translate(830 820) scale(${pop(f, blue)})`}>
          <path d="M-40 40 L-70 170 L-30 150 L-10 190 L10 60 Z M40 40 L70 170 L30 150 L10 190 L-10 60 Z" fill="#2E6FB5" stroke={INK} strokeWidth={4} />
          {Array.from({ length: 16 }, (_, k) => <circle key={k} cx={Math.cos(k / 16 * Math.PI * 2) * 80} cy={Math.sin(k / 16 * Math.PI * 2) * 80} r={26} fill="#3D86D6" stroke={INK} strokeWidth={3} />)}
          <circle r={74} fill="#2E6FB5" stroke={INK} strokeWidth={4} /><circle r={52} fill={PAPER} />
          <text y={10} textAnchor="middle" fill="#2E6FB5" style={{ font: '400 30px "Bebas Neue"' }}>BRS</text>
        </g>
        <Tag x={760} y={460} t="BLUE RIBBON SPORTS" size={34} col="#2E6FB5" tc={PAPER} o={on(f, blue + 6, 8)} />
      </g>}
      {/* # B) no factory, no logo, just boxes in a car */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, boxes - 4, 8)}>
          <Factory x={300} y={FLOOR - 40} s={1.1} o={on(f, s10, 8)} />
          <Cross x={300} y={1000} s={1.0} o={on(f, make, 6)} />
          <g opacity={on(f, logo, 8)}>
            <ShoeBox x={720} y={FLOOR - 40} s={1.6} col="#B9A486" />
            <rect x={660} y={1110} width={120} height={60} rx={8} fill="none" stroke={PAPER} strokeWidth={5} strokeDasharray="12 8" />
          </g>
        </g>
        <Car x={lerp(1300, 520, on(f, boxes - 4, 22))} y={FLOOR} s={1.2} trunk={on(f, boxes, 12)} boxes={on(f, boxes, 20) * 6} />
        <Tag x={300} y={820} t="JUST BOXES" size={44} o={on(f, car10, 8)} />
      </g>}
      {/* # C) bought from Japan, sold from the trunk at track meets */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={1 - on(f, track - 4, 8)}>
          <g opacity={on(f, japanese, 8)}><rect x={40} y={1070} width={400} height={30} rx={15} fill="#5C8FB0" />{[0, 1, 2, 3].map((k) => <path key={k} d={`M${60 + k * 90} 1080 q20 -14 40 0`} fill="none" stroke="#FFFFFF" strokeWidth={4} />)}</g>
          <Factory x={190} y={1060} s={0.8} o={on(f, s11, 8)} />
          <Tag x={190} y={660} t="ONITSUKA TIGER · JAPAN" size={34} col={RED} tc={PAPER} o={on(f, onitsuka, 8)} />
          {[0, 1, 2, 3].map((k) => { const t = on(f, bought + k * 7, 22); if (t <= 0 || t >= 1) return null; const [x, y] = arcAt([220, 980], [700, 1100], t, 260); return <ShoeBox key={k} x={x} y={y} s={0.6} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} /> })}
          <Car x={720} y={FLOOR} s={0.95} trunk={1} boxes={6} />
          <g opacity={on(f, america, 8)}>{[0, 1].map((k) => <Mini key={k} look={['buyer', 'worker'][k]} x={440 + k * 120} y={FLOOR} scale={0.75} frame={f} seed={k + 7} mood="happy" />)}</g>
          <Tag x={720} y={820} t="SOLD IN AMERICA" size={38} o={on(f, sold, 8)} />
        </g>
        <g opacity={on(f, track - 4, 8)}>
          {[0, 1, 2].map((k) => <Mini key={k} look={['hero', 'buyer', 'worker'][k]} x={((k * 260 + (f - track) * 6) % 1200) - 60} y={1200 + k * 30} scale={0.6} frame={f} seed={k + 11} mood="happy" />)}
          <Car x={680} y={FLOOR} s={1.0} trunk={1} boxes={6} />
          <Person f={f} who="investor" beats={sellB} x={300} y={FLOOR} s={0.85} />
          <Tag x={600} y={800} t="TRACK MEETS" size={44} col={MUSTARD} o={on(f, track, 8)} />
        </g>
      </g>}
      {/* # D) year one: 1,300 pairs, $8,000, ≈ $6 a pair */}
      {D > 0.001 && <g opacity={D}>
        {Array.from({ length: 10 }, (_, k) => <ShoeBox key={k} x={260 + (k % 2) * 30} y={FLOOR - k * 62} s={0.8} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} o={on(f, s13 + k * 2, 5) * (1 - on(f, s14, 8))} />)}
        <Tag x={270} y={560} t="1,300 PAIRS" size={46} o={on(f, d1300, 8) * (1 - on(f, s14, 8))} />
        <CashBag x={720} y={FLOOR} s={1.4 * pop(f, d8000)} t="$8,000" o={on(f, d8000, 6) * (1 - on(f, s14a, 8))} />
        <g opacity={on(f, s14, 8) * (1 - on(f, s14a, 8))}><Shoe x={280} y={1110} s={0.9} /><Tag x={280} y={900} t="≈ $6 A PAIR" size={48} col={MUSTARD} o={on(f, d6, 8)} /></g>
        {/* # one pair at a time */}
        {Array.from({ length: 7 }, (_, k) => <ShoeBox key={k} x={CX + ((k % 3) - 1) * 180} y={FLOOR - Math.floor(k / 3) * 90} s={1.0} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} o={on(f, business + k * 5, 5)} />)}
        <Tag x={CX} y={860} t="A REAL BUSINESS" size={46} col={GREEN} tc={PAPER} o={on(f, pair, 8)} />
      </g>}
      <Vig id="nk-mid" />
      <Headline f={f} lines={[[s7, 'STEP 1: THE MIDDLEMAN', INK, 92], [s8, '1964: $500 EACH', INK, 100], [s10, 'NO FACTORY', RED, 104], [s11, 'SHOES FROM JAPAN', INK, 100], [s12, 'SOLD FROM HIS CAR', INK, 100], [s13, 'YEAR ONE', INK, 110], [s14a, 'ONE PAIR AT A TIME', TEAL, 96]]} />
    </g>
  )
}

export const NK_MIDDLE = makePiece('nk-middle', 'Step 1 on the 1964 Oregon track: a lane badge 1 over a factory, a shoe box and a runner with arrows (MIDDLEMAN); a 1964 calendar; Phil Knight (a runner) waves and coach Bill Bowerman explains, each holds up a $500 note; a blue ribbon rosette BRS (BLUE RIBBON SPORTS); a factory gets a red cross, a plain box with an empty dashed logo spot; the turquoise car rolls in, trunk opening on stacked boxes (JUST BOXES); across the sea ONITSUKA TIGER · JAPAN, boxes arc over to the car, customers arrive (SOLD IN AMERICA); runners race along the track while Knight sells from the open trunk (TRACK MEETS); a stack of boxes (1,300 PAIRS), a cash bag $8,000, one shoe ≈ $6 A PAIR; boxes stack up one at a time (A REAL BUSINESS).', {
  canvas: 'tall', mood: 'light', Component: Middle,
  beats: ["s7", "s7:middleman", "s8", "s8:runner", "s8:phil", "s8:coach", "s8:bill", "s8:each", "s9", "s9:blue", "s10", "s10:make", "s10a", "s10a:factory", "s10a:logo", "s10a:boxes", "s10a:car", "s11:japanese", "s11", "s11:bought", "s11:onitsuka", "s11:sold", "s11:america", "s12", "s12:track", "s12:car", "s13", "s13:1300", "s13:8000", "s14", "s14:6", "s14a", "s14a:business", "s14a:pair", "s14a:time"],
  sfx: [['s8:500', 'cash', 0.2], ['s9:blue', 'pop', 0.2], ['s10:make', 'thud', 0.2], ['s11:bought', 'whoosh', 0.15], ['s13:8000', 'coin', 0.2]] })
