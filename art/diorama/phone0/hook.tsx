// ---------------------------------------------------------------- s1–s5: the hook in a bright pastel phone store.
// A) a coral sale sign: $0 DOWN; a glossy phone glows on the counter; you walk in and look. B) the sign flips to
//    FREE; you shrug ("but is it?"). C) a fishing hook on a line drops from the top and hooks the phone ("the catch").
// D) a big % coin labelled INTEREST gets a cross; the phone's screen shows 0% APR. E) the catch is TIME: a
//    36-box calendar wall slides up, then three numbered pills pop in.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { StoreWorld, Vig, Headline, Pill, Cross, Phone, Sign, Counter, Coin, Grid36, Glint, win, CX, FLOOR, INK, CORAL, CORAL2, TEAL, TEAL2, SUN, PLUM, WHITE, TXT } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const seen = c("s1:you've"), sign = c('s1:sign'), store = c('s1:store'), phone1 = c('s1:phone#2'), zero = c('s1:zero'), down = c('s1:down')
  const further = c('s2:further'), free = c('s2:free'), but = c('s2:but')
  const thinking = c('s3:thinking'), catchW = c('s3:catch')
  const interest = c('s4:interest'), verizon = c('s4:verizon'), plans = c('s4:plans'), zero4 = c('s4:zero'), percent = c('s4:percent')
  const time = c('s5:time'), three = c('s5:three'), steps = c('s5:steps')

  const A = win(f, 0, interest - 2), D = win(f, interest - 2, time - 2), E = on(f, time - 2, 7)
  const you: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 10], [store, 'idle', 'smiling'], [zero, 'point', 'shocked'], [free, 'celebrate', 'smiling'], [but, 'shrug', 'thinking'], [thinking, 'think', 'thinking'], [catchW, 'scratchHead', 'worried']]
  const youX = lerp(-120, 220, on(f, 0, 40))
  const flipped = on(f, free, 10)
  const hookY = lerp(470, 690, on(f, catchW - 4, 18))

  return (
    <g>
      <StoreWorld f={f} id="ph-hook" />
      {/* # A–C) the sign, the phone, you, the hook */}
      {A > 0.001 && <g opacity={A}>
        <Counter x0={430} x1={980} />
        <g opacity={on(f, sign, 8)} transform={`translate(780 ${FLOOR - 250}) scale(${pop(f, sign)}) translate(-780 ${-(FLOOR - 250)})`}>
          <g transform={`translate(780 ${FLOOR - 250}) scale(${Math.abs(Math.cos(flipped * Math.PI))} 1) translate(-780 ${-(FLOOR - 250)})`}>
            <Sign x={780} y={FLOOR - 250} s={0.95} l1={flipped < 0.5 ? (f >= zero ? '$0' : '') : 'FREE'} l2={flipped < 0.5 ? (f >= down ? 'DOWN' : '') : 'PHONE'} col={flipped < 0.5 ? CORAL : TEAL} f={f} />
          </g>
        </g>
        <g opacity={on(f, phone1, 8)}><Phone x={600} y={FLOOR - 400} s={0.45 * pop(f, phone1)} glow={on(f, further, 10)} f={f} /></g>
        {/* # the catch: a hook on a line drops onto the phone */}
        {f >= catchW - 4 && <g>
          <g transform={`translate(${lerp(500, 0, on(f, catchW - 10, 14))} 0)`}><line x1={1120} y1={360} x2={600} y2={440} stroke="#8A5A3C" strokeWidth={14} strokeLinecap="round" /><circle cx={980} cy={382} r={22} fill="#5C6B66" /></g>
          <line x1={600} y1={440} x2={600} y2={hookY - 50} stroke={INK} strokeWidth={4} />
          <path d={`M600 ${hookY - 50} L600 ${hookY + 10} A30 30 0 1 1 ${570} ${hookY + 10}`} fill="none" stroke="#8A80A8" strokeWidth={10} strokeLinecap="round" />
        </g>}
        <Person f={f} who="investor" beats={you} x={youX} y={FLOOR} s={0.76} />
        <Glint f={f} at={seen} x={780} y={FLOOR - 760} />
      </g>}
      {/* # D) not interest: 0% */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, interest - 2, 6)}><Coin x={260} y={760} s={2.2 * pop(f, interest - 2)} col={SUN} t="%" /><g opacity={on(f, interest + 6, 6)}><Cross x={260} y={760} s={1.1} /></g></g>
        <g opacity={on(f, verizon, 6)}><Phone x={700} y={820} s={0.85 * pop(f, verizon)} f={f} screen={<g opacity={on(f, zero4, 6)}><text x={0} y={30} textAnchor="middle" fill={WHITE} style={TXT(130)}>0%</text><text x={0} y={110} textAnchor="middle" fill={WHITE} style={TXT(54)}>{f >= percent ? 'APR' : ''}</text></g>} /></g>
        <g opacity={on(f, plans, 6)}><Pill x={700} y={1150} t="PHONE PAYMENTS" size={42} col={PLUM} /></g>
      </g>}
      {/* # E) the catch is time: a 36-box wall, then three steps */}
      {E > 0.001 && <g opacity={E}>
        <g opacity={1 - on(f, three, 8)}><Grid36 x={130} y={480} cell={110} gap={14} state={() => 'plain'} pop={(i) => pop(f, time + i * 0.6)} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 3, 6)} transform={`translate(${200 + k * 300} 800) scale(${pop(f, three + k * 3)})`}>
          <circle r={120} fill="rgba(42,35,70,0.18)" transform="translate(8 10)" />
          <circle r={120} fill={[CORAL, TEAL, SUN][k]} />
          <circle r={96} fill="none" stroke={WHITE} strokeWidth={5} opacity={0.6} />
          <text y={52} textAnchor="middle" fill={WHITE} style={TXT(150)}>{k + 1}</text>
          <Glint f={f} at={steps + k * 3} x={80} y={-90} />
        </g>)}
      </g>}
      <Vig id="ph-hook" />
      <Headline f={f} lines={[[zero, '$0 DOWN', CORAL2, 130], [free, '…OR EVEN FREE', TEAL2, 110], [catchW, "WHERE'S THE CATCH?", INK, 100], [interest, 'NOT INTEREST', CORAL2, 110], [zero4, '0% AT VERIZON', TEAL2, 104], [time, 'THE CATCH IS TIME', INK, 104], [three, '3 STEPS', INK, 120]]} />
    </g>
  )
}

export const PH_HOOK = makePiece('ph-hook', 'Hook in a bright pastel phone store (lilac wall, glowing phone shelves, mint floor, a pink neon phone sign): you walk in as a coral sale sign reads $0 DOWN and a glossy phone glows on the plum counter; the sign spins round to a teal FREE PHONE and you celebrate, then shrug; a fishing hook on a line drops from the top and hooks the phone (where is the catch?); a giant % coin gets a red cross while a big phone screen shows 0% APR (PHONE PAYMENTS); then a 36-box calendar wall pops up and turns into three big numbered circles.', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1:you've", "s1:sign", "s1:store", "s1:phone#2", "s1:zero", "s1:down", "s2:further", "s2:free", "s2:but", "s3:thinking", "s3:catch", "s4:interest", "s4:verizon", "s4:plans", "s4:zero", "s4:percent", "s5:time", "s5:three", "s5:steps"],
  sfx: [['s1:zero', 'pop', 0.25], ['s2:free', 'swish', 0.25], ['s3:catch', 'click', 0.3], ['s4:interest', 'thud', 0.25], ['s5:three', 'pop', 0.25]] })
