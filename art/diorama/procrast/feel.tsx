// ---------------------------------------------------------------- s7–s13: it's a feeling problem.
// A) study papers stack up, each stamped MOOD (they keep finding the same thing); a clock is struck out on
//    "time", the fog swells on "feel". B) the laptop breathes out three fog puffs: HARD, BORING, NOT GOOD ENOUGH?
// C) the brain's one rule (FEEL BETTER. NOW.); the escapes pop in a ring — phone, snack, video, tidy desk — he
//    grabs the phone, a RELIEF meter shoots up… and the task is still there. D) the bill unrolls and slides over
//    to FUTURE YOU, who sags under it.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Bill, Desk, DESK_TOP, Fog, Headline, Laptop, Person, Phone, PlayVideo, Snack, Spray, Study, SVig, Tag, win, CORAL, CREAM, GOLD, INK, BURG, TEAL, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Feel: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), study = c('s7:study'), keep = c('s7:keep'), same = c('s7:same')
  const s8 = c('s8'), time = c('s8:time'), feel8 = c('s8:feel')
  const s9 = c('s9'), uncomf = c('s9:uncomfortable'), hard = c('s9:hard'), boring = c('s9:boring'), scared = c('s9:scared'), enough = c('s9:enough')
  const s10 = c('s10'), brain = c('s10:brain'), rule = c('s10:rule'), away = c('s10:away'), now10 = c('s10:now')
  const s11 = c('s11'), reaches = c('s11:reaches'), phone = c('s11:phone'), snack = c('s11:snack'), video = c('s11:video'), desk = c('s11:desk')
  const s12 = c('s12'), relief = c('s12:relief'), instant = c('s12:instant'), still = c('s12:still')
  const s13 = c('s13'), researchers = c('s13:researchers'), mood = c('s13:mood'), bill = c('s13:bill'), future = c('s13:future')

  const A = win(f, 0, s9 + 4), BC = win(f, s9, s13 + 4), D = on(f, s13, 10)
  const heroC: Beat[] = [[s9, 'think', 'worried'], [hard, 'nervous', 'worried'], [scared, 'despair', 'worried'], [s10, 'idle', 'neutral'], [away, 'stop', 'worried'],
    [reaches, 'reachUp', 'neutral'], [phone, 'phone', 'smiling'], [relief, 'relax', 'smiling'], [still, 'shock', 'shocked']]
  const relief01 = on(f, relief, 4) * (1 - 0.6 * on(f, still, 10))
  const escapes: [number, number, number, React.ReactNode][] = [
    [phone, 230, 560, null], [snack, 850, 560, <Snack x={0} y={0} s={0.9} />], [video, 230, 860, <PlayVideo x={0} y={0} s={0.9} />], [desk, 850, 860, <Spray x={0} y={20} s={0.9} />]]

  return (
    <g>
      <Study id="pcf" dim={0.2 * on(f, s9, 10) * (1 - on(f, s13, 10))} />
      {/* # A) the same finding, again and again */}
      {A > 0.001 && <g opacity={A}>
        {[0, 1, 2].map((k) => {
          const at = study + k * 6
          return <g key={k} opacity={on(f, at, 6) * (1 - on(f, s8, 8))} transform={`translate(${320 + k * 220} ${760 - k * 20}) rotate(${-6 + k * 6}) scale(${pop(f, at)})`}>
            <rect x={-120} y={-150} width={240} height={300} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
            <text y={-96} textAnchor="middle" fill={TEAL} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>STUDY</text>
            {[0, 1, 2].map((j) => <rect key={j} x={-80} y={-60 + j * 34} width={160} height={8} rx={4} fill={INK} opacity={0.2} />)}
            <g opacity={on(f, same + k * 4, 4)} transform="translate(0 80) rotate(-10)"><rect x={-90} y={-34} width={180} height={68} rx={8} fill="none" stroke={CORAL} strokeWidth={7} /><text y={20} textAnchor="middle" fill={CORAL} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 6 }}>MOOD</text></g>
          </g>
        })}
        {/* # not time… feelings */}
        <g opacity={on(f, time, 6) * (1 - on(f, feel8, 6))} transform={`translate(330 760) scale(${pop(f, time)})`}>
          <circle r={130} fill={CREAM} stroke={INK} strokeWidth={8} /><path d="M0 0 L0 -90 M0 0 L60 30" stroke={INK} strokeWidth={10} strokeLinecap="round" />
          <path d="M-150 -150 L150 150" stroke="#D2463C" strokeWidth={16} strokeLinecap="round" />
        </g>
        <Fog f={f} x={700} y={760} s={lerp(0.4, 1.1, easeOut(span(f, feel8, feel8 + 16)))} o={on(f, feel8, 6)} />
      </g>}
      {/* # B–C) the task breathes out bad feelings; the escapes */}
      {BC > 0.001 && <g opacity={BC}>
        <Desk x={CX} />
        <Laptop x={CX} y={DESK_TOP} glow={1} title="THE TASK" />
        {([['HARD', hard, 300, 620], ['BORING', boring, 780, 600], ['NOT GOOD ENOUGH?', scared, CX, 470]] as const).map(([t, at, x, y], k) => (
          <g key={t} opacity={on(f, at, 6) * (1 - on(f, s10, 8))}>
            <Fog f={f} seed={k + 3} x={x} y={y} s={0.6 * pop(f, at)} />
            <text x={x} y={y + 14} textAnchor="middle" fill={CREAM} style={{ font: `400 ${t.length > 8 ? 40 : 54}px "Bebas Neue"`, letterSpacing: 3 }}>{t}</text>
          </g>
        ))}
        <g opacity={on(f, uncomf, 8) * (1 - on(f, hard, 6))}><Fog f={f} x={CX} y={DESK_TOP - 330} s={0.5} /></g>
        {/* # the brain's one rule */}
        <g opacity={on(f, rule, 6) * (1 - on(f, s11, 8))}><Tag x={CX} y={560} text={f >= away ? 'FEEL BETTER. NOW.' : 'ONE RULE'} s={pop(f, rule)} size={64} fill={GOLD} /></g>
        <g opacity={on(f, brain, 6) * (1 - on(f, rule, 6))}><Tag x={CX} y={560} text="YOUR BRAIN" s={pop(f, brain)} size={60} /></g>
        {/* # the escapes, in a ring around him */}
        {escapes.map(([at, x, y, node], k) => <g key={k} opacity={on(f, at, 6) * (1 - on(f, s12, 8))} transform={`translate(${x} ${y}) scale(${pop(f, at)})`}>
          <circle r={120} fill={CREAM} opacity={0.75} />{node ?? <Phone x={0} y={0} s={0.9} />}
        </g>)}
        {/* # relief meter: shoots up, then the task is still there */}
        <g opacity={on(f, relief, 6) * (1 - on(f, s13, 8))} transform="translate(900 820)">
          <rect x={-50} y={-260} width={100} height={300} rx={20} fill={CREAM} stroke={INK} strokeWidth={6} />
          <rect x={-36} y={26 - 272 * relief01} width={72} height={272 * relief01} rx={12} fill="#3FA06A" />
          <text y={100} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>RELIEF</text>
        </g>
        <g opacity={on(f, still, 6) * (1 - on(f, s13, 8))}><Tag x={CX} y={560} text="STILL THERE" s={pop(f, still)} size={64} fill={CREAM} ink={BURG} /></g>
        {f < s13 + 10 && <Person f={f} who="hero-struggling" beats={heroC} x={250} s={0.9} />}
        {/* # his phone in hand while he escapes */}
        <g opacity={on(f, phone, 6) * (1 - on(f, still, 6))}><Phone x={300} y={GROUND - 500} s={0.45} r={-8} /></g>
      </g>}
      {/* # D) mood now, the bill later */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="hero-struggling" beats={[[s13, 'phone', 'smiling'], [bill, 'offer', 'smiling']]} x={250} s={0.9} />
        <Bill x={lerp(380, 700, easeOut(span(f, bill + 4, future + 6)))} y={520} unroll={easeOut(span(f, bill, bill + 14))} r={lerp(-6, 6, span(f, bill, future + 6))} s={0.9} />
        <g opacity={on(f, future, 8)}>
          <Mini look="hero-struggling" x={860} y={GROUND} scale={2.6} frame={f} seed={8} mood="sad" />
          <Tag x={860} y={GROUND - 640} text="FUTURE YOU" s={pop(f, future)} size={50} fill={CREAM} ink={BURG} />
        </g>
        <g opacity={on(f, researchers, 6) * (1 - on(f, mood, 6))}><Tag x={CX} y={560} text="THE RESEARCH" s={pop(f, researchers)} size={56} /></g>
        <g opacity={on(f, mood, 6) * (1 - on(f, bill, 6))}><Tag x={CX} y={560} text="MOOD: FIXED" s={pop(f, mood)} size={60} fill={GOLD} /></g>
      </g>}
      <Headline text={f < s9 ? 'NOT TIME. FEELINGS.' : f < s13 ? '' : 'FEEL GOOD NOW, PAY LATER'} o={f < s9 ? on(f, time, 8) * (1 - on(f, s9 - 4, 4)) : f >= s13 ? on(f, mood, 8) : 0} color={INK} />
      <SVig id="pcf" />
    </g>
  )
}

export const PC_FEEL = makePiece('pc-feel', 'Procrastination: a feeling problem, the escapes, the bill', {
  beats: ['s7', 's7:study', 's7:keep', 's7:same', 's8', 's8:time', 's8:feel', 's9', 's9:uncomfortable', 's9:hard', 's9:boring', 's9:scared', 's9:enough', 's10', 's10:brain', 's10:rule', 's10:away', 's10:now', 's11', 's11:reaches', 's11:anything', 's11:better', 's11:phone', 's11:snack', 's11:video', 's11:desk', 's12', 's12:relief', 's12:instant', 's12:still', 's13', 's13:researchers', 's13:fixing', 's13:mood', 's13:bill', 's13:future'],
  sfx: [['s7:same', 'thud'], ['s8:feel', 'whoosh'], ['s11:phone', 'pop'], ['s11:snack', 'pop'], ['s11:video', 'pop'], ['s11:desk', 'pop'], ['s12:relief', 'riser'], ['s12:still', 'thud'], ['s13:bill', 'swish']],
  Component: Feel, mood: 'light', canvas: 'tall',
})
