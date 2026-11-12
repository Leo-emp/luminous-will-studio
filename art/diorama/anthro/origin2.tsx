// ---------------------------------------------------------------- s20–s26: a public benefit corporation, the plan, the first money
// A) s20–s21  the new office gets a gold seal PUBLIC BENEFIT CORPORATION on "public benefit"; a normal company is a
//             one-pan scale: coins drop into the OWNERS pan on "money" / "owners".
// B) s22–s23  a second pan appears with a glowing globe of little people (MISSION) on "mission"; a paper rulebook
//             gets the mission written in on "written"/"rules"; the scale levels on "responsibly"; globe glows on "humanity".
// C) s24      a paper mountain path: the founders climb to a flag FRONT OF THE FIELD on "front"; at the top they study the
//             lantern with a magnifier on "study"; a shield SAFE lights on "safe".
// D) s25–s26  May 2021: a money bag $124M lands on "million"; then a giant shadow-bag towers over it and it looks tiny
//             on "tiny"; the lantern's blueprint is drawn on "building".
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { BB, Bag, Building, Cal, Coin, Cut, Day, Defs, G, Grain, IN, K, Lantern, Mark, Room, Tag, cues, easeInOut, fadeIn, lerp, on, pop, scene, span, clamp01 } from './kit'

const M = {
  unusual20: 's20:unusual', public20: 's20:public', corporation20: 's20:corporation',
  normal21: 's21:normal', money21: 's21:money', owners21: 's21:owners',
  must22: 's22:must', weigh22: 's22:weigh', mission22: 's22:mission', written22: 's22:written', rules22: 's22:rules',
  mission23: "s23:anthropic's", develop23: 's23:develop', responsibly23: 's23:responsibly', humanity23: 's23:humanity',
  plan24: 's24:plan', build24: 's24:build', themselves24: 's24:themselves', front24: 's24:front', study24: 's24:study', safe24: 's24:safe',
  may25: 's25:may', raised25: 's25:raised', million25: 's25:million', started25: 's25:started',
  money26: 's26:money', tiny26: 's26:tiny', know26: 's26:know', building26: 's26:building',
}
const EXTRA: string[] = []

// # the balance scale: tilt in degrees (+ = left pan down)
const Scale: React.FC<{ x: number; y: number; tilt: number; right: number; o?: number; left?: React.ReactNode; rightC?: React.ReactNode }> = ({ x, y, tilt, right, o = 1, left, rightC }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <Cut d={8}><g><rect x={-16} y={-460} width={32} height={460} fill={K.goldD} /><path d="M-130 0 L130 0 L90 -40 L-90 -40 Z" fill={K.goldD} /></g></Cut>
    <g transform={`translate(0 -460) rotate(${-tilt})`}>
      <Cut d={6}><rect x={-380} y={-14} width={760} height={28} rx={14} fill="url(#an-gold)" /></Cut>
      <g transform={`translate(-350 0) rotate(${tilt})`}><line x1={0} y1={0} x2={-110} y2={170} stroke={K.goldD} strokeWidth={5} /><line x1={0} y1={0} x2={110} y2={170} stroke={K.goldD} strokeWidth={5} /><path d="M-150 170 L150 170 L110 215 L-110 215 Z" fill={K.gold} /><g transform="translate(0 165)">{left}</g></g>
      <g transform={`translate(350 0) rotate(${tilt})`} opacity={right}><line x1={0} y1={0} x2={-110} y2={170} stroke={K.goldD} strokeWidth={5} /><line x1={0} y1={0} x2={110} y2={170} stroke={K.goldD} strokeWidth={5} /><path d="M-150 170 L150 170 L110 215 L-110 215 Z" fill={K.gold} /><g transform="translate(0 165)">{rightC}</g></g>
    </g>
    <circle cy={-460} r={26} fill={K.goldD} />
  </g>
)
// # a globe with little people standing round it
const Globe: React.FC<{ x: number; y: number; r: number; f: number; glow?: number; o?: number }> = ({ x, y, r, f, glow = 0, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    {glow > 0 && <circle r={r * 2} fill="url(#an-glow)" opacity={glow} />}
    <Cut d={5}><circle r={r} fill={K.sky} /></Cut>
    <path d={`M${-r * 0.6} ${-r * 0.3} q${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1} q${r * 0.2} ${r * 0.3} ${-r * 0.1} ${r * 0.5} q${-r * 0.4} ${r * 0.1} ${-r * 0.5} ${-r * 0.4} Z M${r * 0.2} ${r * 0.2} q${r * 0.3} ${-r * 0.2} ${r * 0.5} ${r * 0.1} q0 ${r * 0.4} ${-r * 0.4} ${r * 0.4} Z`} fill={K.sage} />
    {Array.from({ length: 6 }, (_, k) => { const a = -Math.PI / 2 + (k - 2.5) * 0.42; return <g key={k} transform={`translate(${Math.cos(a) * r} ${Math.sin(a) * r}) rotate(${(a * 180) / Math.PI + 90})`}><circle cy={-r * 0.22} r={r * 0.09} fill={[K.terra, K.ink, K.plum, K.goldD, K.sageD, K.navyL][k]} /><rect x={-r * 0.07} y={-r * 0.15} width={r * 0.14} height={r * 0.16} rx={4} fill={[K.terra, K.ink, K.plum, K.goldD, K.sageD, K.navyL][k]} /></g> })}
  </g>
)
// # a paper rulebook, open, with the mission line written in (w = how much is written)
const Rulebook: React.FC<{ x: number; y: number; s?: number; o?: number; w: number; title?: string }> = ({ x, y, s = 1, o = 1, w, title = 'COMPANY RULES' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={8}><path d="M-300 -180 Q-150 -210 0 -180 Q150 -210 300 -180 L300 180 Q150 150 0 180 Q-150 150 -300 180 Z" fill={K.paperL} /></Cut>
    <path d="M0 -180 L0 180" stroke={K.paper3} strokeWidth={6} />
    <text x={-150} y={-120} textAnchor="middle" fill={K.ink} style={BB(40)}>{title}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-260} y={-80 + k * 50} width={220} height={12} rx={6} fill={K.paper3} />)}
    <text x={150} y={-120} textAnchor="middle" fill={K.terra} style={BB(44)}>THE MISSION</text>
    <rect x={40} y={-90} width={220 * clamp01(w * 3)} height={12} rx={6} fill={K.terra} /><rect x={40} y={-40} width={220 * clamp01(w * 3 - 1)} height={12} rx={6} fill={K.terra} /><rect x={40} y={10} width={160 * clamp01(w * 3 - 2)} height={12} rx={6} fill={K.terra} />
  </g>
)

const Origin2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, M)
  const AB = c('s24') - 4, BC = c('s25') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  const coins = Math.floor(lerp(0, 5, span(f, t.money21, t.owners21 + 10)) + 0.001)
  const rightIn = on(f, t.mission22 - 4, 12)
  const tilt = lerp(lerp(0, 14, on(f, t.money21, 14)), 0, easeInOut(span(f, t.responsibly23 - 6, t.responsibly23 + 14)))
  const climb = easeInOut(span(f, t.build24, t.front24 + 10))
  const shadow = easeInOut(span(f, t.money26 - 4, t.tiny26 + 6))
  return (
    <g>
      <Defs />
      {/* ---------------- A + B) the public benefit corporation: owners + mission on one scale ---------------- */}
      {A > 0 && <g opacity={A}>
        <Day f={f} />
        {/* # first the office gets its seal, then it slides left and the scale arrives */}
        <g opacity={1 - on(f, t.normal21 - 6, 10)}>
          <Building x={760} y={G} w={600} h={460} sign="ANTHROPIC" roof={K.terra} />
          <g transform={`translate(1360 520) scale(${pop(f, t.public20 - 2, 14)}) rotate(-8)`} opacity={on(f, t.public20 - 2, 8)}><Cut d={8}><circle r={170} fill={K.gold} /></Cut><circle r={140} fill="none" stroke={K.goldD} strokeWidth={8} strokeDasharray="14 10" /><text y={-30} textAnchor="middle" fill={K.ink} style={BB(46)}>PUBLIC</text><text y={20} textAnchor="middle" fill={K.ink} style={BB(46)}>BENEFIT</text><text y={70} textAnchor="middle" fill={K.ink} style={BB(40)}>CORPORATION</text></g>
        </g>
        {f >= t.normal21 - 10 && <g opacity={on(f, t.normal21 - 6, 10)}>
          <Scale x={960} y={G + 10} tilt={tilt} right={rightIn}
            left={<g>{Array.from({ length: coins }, (_, k) => <Coin key={k} x={-80 + (k % 3) * 80} y={-30 - Math.floor(k / 3) * 70} r={36} />)}</g>}
            rightC={<Globe x={0} y={-110} r={100} f={f} glow={on(f, t.humanity23, 14) * 0.8} />} />
          <Tag x={lerp(610, 610, 0)} y={G + 70} text="OWNERS' MONEY" size={44} bg={K.goldD} o={on(f, t.owners21, 8)} />
          <Tag x={1310} y={G + 70} text="THE MISSION" size={44} bg={K.terra} o={on(f, t.mission22, 8)} />
          <Rulebook x={960} y={300} s={0.62} w={span(f, t.written22 - 4, t.rules22 + 12)} o={on(f, t.written22 - 6, 8) * (1 - on(f, t.mission23 - 6, 8))} />
          <g opacity={on(f, t.develop23 - 4, 8)}><Tag x={960} y={290} text="ADVANCED AI, RESPONSIBLY" size={50} bg={K.ink} o={1 - on(f, t.humanity23 - 4, 8)} /><Tag x={960} y={290} text="FOR HUMANITY, LONG TERM" size={50} bg={K.sageD} o={on(f, t.humanity23 - 4, 8)} /></g>
        </g>}
      </g>}

      {/* ---------------- C) build it at the front of the field, to study how to make it safe ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Day f={f} hills={false} />
        <Cut d={12}><path d="M0 1080 L0 900 Q400 880 700 700 Q1000 520 1300 330 L1460 300 L1600 330 Q1800 500 1920 600 L1920 1080 Z" fill={K.sageL} /></Cut>
        <path d="M200 900 Q500 860 760 680 Q1000 520 1300 340" stroke={K.paper3} strokeWidth={26} fill="none" strokeDasharray="34 22" />
        <g transform="translate(1440 300)" opacity={on(f, t.front24 - 6, 10)}><rect x={-6} y={-200} width={12} height={200} fill={K.ink} /><path d={`M6 -200 L${190 + 10 * Math.sin(f / 6)} -160 L6 -120 Z`} fill={K.terra} /><Tag x={0} y={70} text="THE FRONT OF THE FIELD" size={40} bg={K.ink} /></g>
        {[0, 1, 2].map((k) => { const u = clamp01(climb - k * 0.08); const px = lerp(260, 1300, u) - k * 70, py = u < 0.5 ? lerp(900, 690, u / 0.5) : lerp(690, 345, (u - 0.5) / 0.5)
          return <Mini key={k} look={['investor', 'investorF', 'zoe'][k]} x={px} y={py + 4} scale={0.8} frame={f} seed={k + 80} /> })}
        <Lantern x={1640} y={640} s={0.5} f={f} o={on(f, t.themselves24 - 4, 10)} />
        <g transform={`translate(1520 760) rotate(${-20 + 10 * Math.sin(f / 10)})`} opacity={on(f, t.study24 - 2, 8)}><circle r={70} fill={K.skyL} opacity={0.5} stroke={K.ink} strokeWidth={14} /><rect x={50} y={40} width={26} height={120} rx={10} fill={K.ink} transform="rotate(-40)" /></g>
        <g transform={`translate(1780 470) scale(${pop(f, t.safe24 - 2, 14)})`} opacity={on(f, t.safe24 - 2, 8)}><Cut d={6}><path d="M0 -90 L80 -60 Q80 40 0 90 Q-80 40 -80 -60 Z" fill={K.sageD} /></Cut><text y={16} textAnchor="middle" fill="#fff" style={BB(48)}>SAFE</text></g>
      </g>}

      {/* ---------------- D) May 2021: $124 million, soon tiny ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Room wall="#F1E5D1" />
        <Cal x={300} y={380} top="MAY" big="2021" o={on(f, t.may25 - 4, 10) * (1 - on(f, t.know26 - 6, 8))} />
        <g opacity={on(f, t.money26 - 4, 10) * (1 - on(f, t.know26 - 6, 8))}><Bag x={1300} y={G + 20} s={lerp(0.6, 2.6, shadow)} text="" color="#D9CDB6" /></g>
        <g transform={`translate(0 ${(1 - pop(f, t.million25 - 6, 16)) * -500})`} opacity={on(f, t.raised25 - 4, 8) * (1 - on(f, t.know26 - 6, 8))}><Bag x={lerp(900, 760, shadow)} y={G + 20} s={lerp(1.2, 0.55, shadow)} text="$124M" /></g>
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [t.raised25, 'celebrate', 'smiling'], [t.tiny26, 'shrug', 'thinking']]} x={480} y={1045} s={0.7} o={on(f, t.may25 - 4, 10) * (1 - on(f, t.know26 - 6, 8))} />
        {f >= t.know26 - 10 && <g opacity={on(f, t.know26 - 6, 10)}>
          <rect x={460} y={220} width={1000} height={640} rx={20} fill="#2D5C8A" />
          {Array.from({ length: 11 }, (_, k) => <rect key={k} x={460 + k * 100} y={220} width={2} height={640} fill="#fff" opacity={0.15} />)}
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={460} y={220 + k * 100} width={1000} height={2} fill="#fff" opacity={0.15} />)}
          <g transform="translate(960 560)" opacity={0.95}><path d={`M-110 -160 Q-160 0 -110 160 L110 160 Q160 0 110 -160 Z`} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray={`${1400 * span(f, t.building26 - 10, t.building26 + 16)} 2000`} /><rect x={-120} y={150} width={240} height={30} rx={10} fill="none" stroke="#fff" strokeWidth={5} opacity={span(f, t.building26, t.building26 + 10)} /><rect x={-120} y={-176} width={240} height={24} rx={10} fill="none" stroke="#fff" strokeWidth={5} opacity={span(f, t.building26, t.building26 + 10)} /></g>
          <text x={960} y={830} textAnchor="middle" fill="#fff" style={BB(48, 6)} opacity={on(f, t.building26, 8)}>WHAT WERE THEY BUILDING?</text>
        </g>}
      </g>}

      <Headline f={f} lines={[[t.unusual20, 'AN UNUSUAL KIND OF COMPANY', K.ink, 96], [t.plan24, 'THE PLAN', K.ink, 110], [t.may25, 'THE FIRST MONEY', K.ink, 104]]} until={t.know26 - 6} />
      <Mark f={f} at={EXTRA.map(c)} />
      <Grain />
    </g>
  )
}

export const AN_ORIGIN2 = makePiece('an-origin2', 'A public benefit corporation: a gold PUBLIC BENEFIT CORPORATION seal on the new office; a gold balance scale where coins fall into the OWNERS pan, then a glowing globe of little people (THE MISSION) fills the other pan and a rulebook gets the mission written in, and the scale levels; three founders climb a paper mountain path to a flag THE FRONT OF THE FIELD and study the lantern with a magnifier, a SAFE shield; May 2021: a $124M money bag lands, then a giant bag shadow makes it look tiny; a blueprint of the lantern is drawn', {
  mood: 'light', Component: Origin2, beats: [...Object.values(M), ...EXTRA],
  sfx: [['s20:public', 'pop', 0.08], ['s25:million', 'cash', 0.1]] })
