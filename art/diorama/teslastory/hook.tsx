// ---------------------------------------------------------------- s1–s8: the hook
// A) s1–s2  a sunny California road; you stand at the kerb as a red Tesla glides past; an odometer rolls to 10,000,000.
// B) s3     a snowy December 2008 night; a lit workshop; three calendar pages tear off one by one: 3 DAYS LEFT.
// C) s4     the drafting table: a notepad, four lines write themselves in, then DON'T TELL ANYONE in red.
// D) s5–s6  a balance: a real car sits on the left pan; on "betting" a blue-pencil robotaxi + robot on the right pan
//           outweigh it although they are only drawings.
// E) s7–s8  the road of the video drawn on the blueprint: workshop, storm, factory, coin, robot — each lights on its word.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { EXTRA } from './extra'
import { Big, CalPage, Car, Coin, Drafting, Factory, Mark, Notepad, Odometer, Road, Robot, Scale, Tag, TDefs, TGrain, T, WinterNight, Workshop, cues, fadeIn, scene, FLOOR, draw } from './kit'

const K = {
  seen1: 's1:seen', drive1: 's1:drive', past1: 's1:past',
  built2: 's2:built', ten2: 's2:ten', cars2: 's2:cars',
  december3: 's3:december', boss3: 's3:boss', three3: 's3:three', days3: 's3:days', bankrupt3: 's3:bankrupt',
  plan4: 's4:plan', four4: 's4:four', lines4: 's4:lines', written4: 's4:written', ending4: 's4:ending', dont4: "s4:don't", anyone4: 's4:anyone',
  thinking5: 's5:thinking', car5: 's5:car', cars5: 's5:cars', right5: 's5:right',
  mostly6: 's6:mostly', price6: 's6:price', betting6: 's6:betting', barely6: 's6:barely',
  anything7: 's7:anything', stocks7: 's7:stocks', okay7: 's7:okay',
  step8: 's8:step', started8: 's8:started', died8: 's8:died', grew8: 's8:grew', today8: 's8:today', heading8: 's8:heading',
}

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s3') - 4, BC = c('s4') - 4, CD = c('s5') - 4, DE = c('s7') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = fadeIn(f, DE)
  // # the car glides from off-screen left to off-screen right between "drive" and a little after "past"
  const carX = lerp(-400, 2300, easeInOut(span(f, t.drive1 - 10, t.past1 + 40)))
  const odo = Math.round(lerp(0, 10000000, easeInOut(span(f, t.built2, t.cars2 + 6))))
  const pages = Math.floor(lerp(0, 3, span(f, t.three3, t.bankrupt3)) + 0.001)
  const p = (a: number, b: number) => span(f, a, b)
  const tilt = lerp(-14, 14, easeInOut(span(f, t.betting6, t.betting6 + 24)))
  const stops: [string, number, number][] = [['shop', 300, t.started8], ['storm', 640, t.died8], ['factory', 980, t.grew8], ['coin', 1300, t.today8], ['robot', 1620, t.heading8]]
  return (
    <g>
      <TDefs />
      {/* ---------------- A) a Tesla drives past you; ten million built ---------------- */}
      {A > 0 && <g opacity={A}>
        <Road f={f} />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.seen1, 'lookFar', 'smiling'], [t.past1, 'point', 'smiling'], [t.ten2, 'shock', 'shocked']]} x={250} y={1060} s={0.8} />
        <Car kind="small" x={carX} y={930} s={1.05} spin={f / 14} color="url(#tz-red)" o={on(f, t.drive1 - 12, 6)} />
        <Odometer x={1180} y={560} value={odo.toLocaleString('en-US')} s={1.05} o={on(f, t.built2 - 4, 8)} label="TESLAS BUILT" />
      </g>}

      {/* ---------------- B) December 2008: three days ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <WinterNight f={f} />
        <g transform="translate(420 0)">
          <rect x={-260} y={FLOOR - 330} width={520} height={330} fill="#3A2F2A" /><path d={`M-300 ${FLOOR - 330} L0 ${FLOOR - 470} L300 ${FLOOR - 330} Z`} fill="#2A211E" />
          <rect x={-200} y={FLOOR - 280} width={160} height={120} rx={6} fill="#FFD98A" /><rect x={40} y={FLOOR - 280} width={160} height={120} rx={6} fill="#FFD98A" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 30))} />
          <rect x={-60} y={FLOOR - 150} width={120} height={150} fill="#5A473E" />
          <Tag x={0} y={FLOOR - 370} text="TESLA, 2008" size={40} bg={T.red} o={on(f, t.december3, 8)} />
        </g>
        {[0, 1, 2].map((k) => { const gone = k < pages, fall = gone ? span(f, t.three3 + k * ((t.bankrupt3 - t.three3) / 3), t.three3 + k * ((t.bankrupt3 - t.three3) / 3) + 14) : 0
          return <g key={k} transform={`translate(${1260 + fall * 160} ${520 + fall * 420}) rotate(${fall * 50})`} opacity={on(f, t.december3 - 2, 8) * (1 - fall)}><CalPage x={0} y={0} top="DEC 2008" big={String(3 - k)} s={0.95} /></g> })}
        <Tag x={1260} y={860} text="3 DAYS FROM BANKRUPT" size={50} bg={T.red} o={on(f, t.days3, 8)} />
      </g>}

      {/* ---------------- C) the four lines ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Drafting />
        <Notepad x={960} y={590} s={1.0} lines={[
          ['1. Build sports car', p(t.four4, t.four4 + 16)],
          ['2. Use that money to build...', p(t.lines4 - 4, t.lines4 + 14)],
          ['3. ...an even cheaper car', p(t.written4 - 4, t.written4 + 14)],
          ['4. Clean electric power', p(t.ending4 - 8, t.ending4 + 10)]]}
          foot={["Don't tell anyone.", p(t.dont4 - 2, t.anyone4 + 6)]} o={on(f, t.plan4 - 4, 8)} />
        <Tag x={1560} y={300} text="AUGUST 2006" size={44} bg={T.blue} o={on(f, t.written4, 8)} />
      </g>}

      {/* ---------------- D) a car company... priced on drawings ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Drafting />
        <Scale x={960} y={980} s={1.0} tilt={f < t.betting6 ? lerp(0, -14, on(f, t.car5, 10)) : tilt}
          left={<Car kind="small" x={0} y={0} s={0.5} spin={0} color="url(#tz-red)" o={on(f, t.car5 - 2, 8)} />}
          right={<g opacity={on(f, t.betting6 - 2, 10)}><Car kind="cab" x={-50} y={0} s={0.42} ghost={1} /><g transform="translate(80 0)"><Robot x={0} y={0} s={0.3} f={f} /></g></g>} />
        <Tag x={560} y={330} text="TODAY'S CARS" size={44} bg={T.red} o={on(f, t.cars5, 8)} />
        <Tag x={1360} y={330} text="WHAT IT BARELY SELLS YET" size={44} bg={T.blue} o={on(f, t.barely6, 8)} />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.thinking5, 'scratchHead', 'thinking'], [t.right5, 'shrug', 'smug'], [t.betting6, 'shock', 'shocked']]} x={210} y={1060} s={0.72} />
      </g>}

      {/* ---------------- E) the road of the video ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Drafting />
        <path d="M200 720 C 420 640, 560 800, 800 720 S 1180 640, 1400 720 S 1700 780, 1760 700" stroke={T.blue} strokeWidth={10} fill="none" strokeLinecap="round" style={draw(span(f, t.step8 - 4, t.heading8 + 8), 1800)} />
        {stops.map(([kind, x, at], k) => { const o = on(f, at - 2, 8); return o > 0.01 && <g key={k} opacity={o}>
          {kind === 'shop' && <g transform={`translate(${x} 680) scale(0.34)`}><rect x={-260} y={-330} width={520} height={330} fill="#B98A5A" /><path d="M-300 -330 L0 -470 L300 -330 Z" fill={T.woodD} /><rect x={-80} y={-200} width={160} height={200} fill="#5A473E" /></g>}
          {kind === 'storm' && <g transform={`translate(${x} 600)`}><ellipse cx={0} cy={0} rx={110} ry={56} fill={T.nightL} /><ellipse cx={-50} cy={20} rx={70} ry={40} fill={T.night} /><path d="M10 40 L-20 110 L10 105 L-10 170 L50 80 L20 85 L40 40 Z" fill={T.sun} /></g>}
          {kind === 'factory' && <Factory x={x} y={700} s={0.26} />}
          {kind === 'coin' && <Coin x={x} y={640} r={70} />}
          {kind === 'robot' && <Robot x={x} y={720} s={0.28} f={f} wave={on(f, at, 12)} />}
          <Tag x={x} y={820} text={['HOW IT STARTED', 'NEARLY DIED', 'HOW IT GREW', 'TODAY', "WHERE IT'S HEADING"][k]} size={36} bg={T.ink} />
        </g> })}
        <Big x={960} y={960} text="STEP BY STEP" size={70} color={T.blueD} o={on(f, t.step8, 10) * 0.9} />
      </g>}

      <Headline f={f} lines={[[t.ten2, '10 MILLION TESLAS', T.ink, 100], [t.december3, 'DECEMBER 2008', '#fff', 100], [t.plan4, 'THE PLAN', T.ink, 100], [t.price6, 'A PRICE ON THE FUTURE', T.ink, 96]]} until={DE} />
      <Mark f={f} at={(EXTRA['tz-hook'] ?? []).map(c)} />
      <TGrain />
    </g>
  )
}

export const TZ_HOOK = makePiece('tz-hook', "Hook: you watch a red Tesla drive past on a sunny California road while an odometer rolls to 10,000,000 cars built; a snowy December 2008 night outside a lit workshop as three calendar pages tear off (3 days from bankrupt); a notepad on a drafting table writes the four-line 2006 plan and DON'T TELL ANYONE; a balance where a real car is outweighed by blue-pencil drawings of a robotaxi and a robot; the road of the video drawn in blue pencil: workshop, storm, factory, coin, robot", {
  mood: 'light', Component: Hook, beats: [...Object.values(K), ...(EXTRA['tz-hook'] ?? [])],
  sfx: [['s1:drive', 'whoosh', 0.1], ['s2:cars', 'ding', 0.08], ['s3:bankrupt', 'thud', 0.1], ["s4:don't", 'pop', 0.08], ['s6:betting', 'thump', 0.1], ['s8:heading', 'chime', 0.08]] })
