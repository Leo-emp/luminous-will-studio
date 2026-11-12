// ---------------------------------------------------------------- s10–s19: where it came from (OpenAI → the walkout)
// A) s10–s11  a paper AI lab with the OPENAI sign; a 2020 calendar; Dario steps out (VP OF RESEARCH), then Daniela.
// B) s12      inside: a writing machine prints a paper strip of handwriting; GPT-2 is a small box, GPT-3 a big one.
// C) s13–s14  the discovery: a machine that grows on "bigger", pages pour in on "text", chips plug in on "power",
//             and a staircase of smartness climbs one even step at a time on "steady" / "predictable".
// D) s15–s16  exciting (sparkles) but worrying: the machine shoots up "very powerful, very fast" while a small
//             guard-rail ("SAFETY") is still being built beside it, unfinished on "safe".
// E) s17–s19  a signpost forks (DIRECTION); the group walks off; January 2021: seven arrive at a new ANTHROPIC
//             office; tags CEO and PRESIDENT on the two founders.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { BB, Building, Cal, Chip, Cut, Day, Defs, G, Grain, IN, K, Lantern, Mark, Room, Tag, cues, easeInOut, fadeIn, lerp, on, pop, scene, span, clamp01 } from './kit'

const M = {
  story10: 's10:story', lab10: 's10:lab', openai10: 's10:openai',
  twenty11: 's11:twenty', dario11: 's11:dario', research11: 's11:research', daniela11: 's11:daniela',
  team12: 's12:team', build12: 's12:build', write12: 's12:write', gpt2: 's12:gpt2', gpt3: 's12:gpt3',
  noticed13: 's13:noticed', surprising13: 's13:surprising',
  bigger14: 's14:bigger', text14: 's14:text', power14: 's14:power', smarter14: 's14:smarter', steady14: 's14:steady', predictable14: 's14:predictable',
  exciting15: 's15:exciting', worrying15: 's15:worrying',
  bigger16: 's16:bigger', powerful16: 's16:powerful', fast16: 's16:fast', safe16: 's16:safe',
  differences17: 's17:differences', direction17: 's17:direction', left17: 's17:left',
  january18: 's18:january', seven18: 's18:seven', anthropic18: 's18:anthropic',
  executive19: 's19:executive', president19: 's19:president',
}
const EXTRA: string[] = []

// # the writing machine: a paper box with a slot; size grows; a paper strip with handwriting comes out
const Machine: React.FC<{ x: number; y: number; s: number; o?: number; f: number; strip?: number; label?: string; glow?: number }> = ({ x, y, s, o = 1, f, strip = 0, label, glow = 0.4 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-200} r={260} fill="url(#an-glow)" opacity={glow * 0.5} />
    <Cut d={10}><rect x={-180} y={-380} width={360} height={380} rx={30} fill={K.sky} /></Cut>
    <rect x={-150} y={-350} width={300} height={170} rx={18} fill="url(#an-screen)" />
    {[0, 1, 2].map((k) => <rect key={k} x={-120} y={-320 + k * 44} width={lerp(60, 240, 0.5 + 0.5 * Math.sin(f / 9 + k * 2))} height={18} rx={9} fill={K.goldL} opacity={0.8} />)}
    {[-100, -40, 20, 80].map((d, k) => <circle key={d} cx={d + 10} cy={-120} r={18} fill={k % 2 ? K.terra : K.gold} />)}
    <rect x={-120} y={-60} width={240} height={20} rx={10} fill={K.ink} />
    {strip > 0 && <g><rect x={-100} y={-50} width={200} height={260 * strip} fill={K.paperL} />{Array.from({ length: Math.floor(strip * 6) }, (_, k) => <path key={k} d={`M-80 ${-20 + k * 40} q20 -14 40 0 t40 0 t40 0 t40 0`} stroke={K.ink2} strokeWidth={4} fill="none" />)}</g>}
    {label && <text y={-410} textAnchor="middle" fill={K.ink} style={BB(64)}>{label}</text>}
  </g>
)
// # the smartness staircase: n even steps, each lit as it is climbed
const Stairs: React.FC<{ x: number; y: number; n: number; lit: number; o?: number }> = ({ x, y, n, lit, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => { const p = clamp01(lit * n - k); return <g key={k}><Cut d={6}><rect x={x + k * 110} y={y - (k + 1) * 80} width={110} height={(k + 1) * 80} fill={p > 0 ? K.sage : K.paper3} /></Cut>{p > 0 && <rect x={x + k * 110} y={y - (k + 1) * 80} width={110} height={14} fill={K.sageD} />}</g> })}</g>
)
// # a signpost with two arms
const Signpost: React.FC<{ x: number; y: number; o?: number; tilt?: number }> = ({ x, y, o = 1, tilt = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-12} y={-420} width={24} height={420} fill="#8E5F37" />
    <g transform={`translate(0 -360) rotate(${-6 + tilt})`}><Cut d={5}><path d="M-20 -40 L240 -40 L290 0 L240 40 L-20 40 Z" fill={K.navyL} /></Cut><text x={120} y={14} textAnchor="middle" fill="#fff" style={BB(40)}>OPENAI</text></g>
    <g transform={`translate(0 -250) rotate(${6 - tilt})`}><Cut d={5}><path d="M20 -40 L-240 -40 L-290 0 L-240 40 L20 40 Z" fill={K.terra} /></Cut><text x={-120} y={14} textAnchor="middle" fill="#fff" style={BB(40)}>A NEW LAB</text></g>
  </g>
)

const Origin1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, M)
  const AB = c('s12') - 4, BC = c('s13') - 4, CD = c('s15') - 4, DE = c('s17') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = fadeIn(f, DE)
  const grow14 = easeInOut(span(f, t.bigger14 - 4, t.bigger14 + 16))
  const climb = span(f, t.smarter14 - 6, t.predictable14 + 14)
  const shoot = easeInOut(span(f, t.bigger16 - 6, t.fast16 + 10))
  const walk = easeInOut(span(f, t.left17 - 4, t.left17 + 40)), arrive = easeInOut(span(f, t.seven18 - 6, t.anthropic18 + 10))
  return (
    <g>
      <Defs />
      {/* ---------------- A) OpenAI, 2020, Dario and Daniela ---------------- */}
      {A > 0 && <g opacity={A}>
        <Day f={f} city />
        <Building x={560} y={G} w={620} h={500} sign="OPENAI" roof={K.navyL} color="#E6DED0" o={on(f, t.lab10 - 6, 10)} lit={0.9} />
        <Cal x={1610} y={380} top="THE YEAR" big="2020" color={K.navyL} o={on(f, t.twenty11 - 2, 10)} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.dario11, 'waveA', 'smiling', 'waveB', 14], [t.research11, 'present', 'smiling'], [t.daniela11, 'idle', 'smiling']]} x={1080} y={1045} s={0.72} o={on(f, t.dario11 - 6, 10)} />
        <Tag x={1080} y={560} text="DARIO · VP OF RESEARCH" size={40} bg={K.ink} o={on(f, t.research11 - 2, 8)} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [t.daniela11, 'waveA', 'smiling', 'waveB', 14], [t.daniela11 + 30, 'confident', 'smiling']]} x={1380} y={1045} s={0.72} o={on(f, t.daniela11 - 6, 10)} />
        <Tag x={1400} y={680} text="DANIELA" size={40} bg={K.terra} o={on(f, t.daniela11, 8)} />
      </g>}

      {/* ---------------- B) GPT-2 and GPT-3: machines that write ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Room wall="#E9EEF2" />
        <Machine x={560} y={G} s={0.6} f={f} label="GPT-2" o={on(f, t.gpt2 - 2, 10)} strip={span(f, t.gpt2, t.gpt2 + 40) * 0.5} glow={0.3} />
        <Machine x={1150} y={G} s={1.0} f={f} label="GPT-3" o={on(f, t.gpt3 - 2, 10)} strip={span(f, t.gpt3, t.gpt3 + 40)} glow={0.6} />
        {f < t.gpt2 + 4 && <g opacity={on(f, t.team12 - 4, 10) * (1 - on(f, t.gpt2 - 6, 8))}>
          {[0, 1, 2, 3].map((k) => <Mini key={k} look={['investor', 'investorF', 'max', 'zoe'][k]} x={620 + k * 190} y={G + 110} scale={1} frame={f} seed={k + 40} mood="happy" />)}
          <g opacity={on(f, t.build12, 10)}><Cut d={6}><rect x={780} y={560} width={360} height={220} rx={20} fill={K.paper3} /></Cut><text x={960} y={690} textAnchor="middle" fill={K.ink2} style={BB(60)}>BUILDING...</text></g>
        </g>}
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.write12, 'point', 'smiling'], [t.gpt3, 'present', 'smiling']]} x={1650} y={1045} s={0.68} o={on(f, t.write12 - 6, 10)} />
      </g>}

      {/* ---------------- C) bigger + more text + more power = steadily smarter ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Day f={f} hills={false} tint={K.skyL} />
        <Machine x={430} y={G} s={lerp(0.55, 0.95, grow14)} f={f} o={on(f, BC, 8)} glow={0.3 + 0.6 * grow14} />
        {Array.from({ length: 6 }, (_, k) => { const p = span(f, t.text14 + k * 4, t.text14 + k * 4 + 20); return p > 0 && p < 1 && <g key={k} transform={`translate(${lerp(-80, 420, p)} ${lerp(300, 620, p)}) rotate(${p * 200})`}><Cut d={3}><rect x={-40} y={-50} width={80} height={100} rx={6} fill={K.paperL} /></Cut>{[0, 1, 2].map((j) => <rect key={j} x={-28} y={-30 + j * 22} width={56} height={8} rx={4} fill={K.inkL} />)}</g> })}
        {[0, 1, 2].map((k) => <Chip key={k} x={180 + k * 120} y={G + 70} s={0.4} o={on(f, t.power14 + k * 4, 8)} glow={on(f, t.power14 + k * 4, 8) * 0.6} />)}
        <Stairs x={900} y={G} n={7} lit={climb} o={on(f, t.smarter14 - 8, 10)} />
        <g transform={`translate(${955 + 110 * Math.min(6, Math.floor(climb * 7 + 0.001))} ${G - 80 * (Math.min(6, Math.floor(climb * 7 + 0.001)) + 1) + 4})`} opacity={on(f, t.smarter14 - 4, 8)}><Mini look="investor" x={0} y={0} scale={0.7} frame={f} seed={77} mood="happy" /></g>
        <Tag x={1300} y={G + 80} text="EVEN, STEADY STEPS" size={44} bg={K.sageD} o={on(f, t.steady14, 8)} />
        <Tag x={420} y={290} text="BIGGER" size={44} bg={K.skyD} o={on(f, t.bigger14, 8) * (1 - on(f, t.smarter14, 8))} />
      </g>}

      {/* ---------------- D) exciting, but worrying: power outruns safety ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Day f={f} tint={on(f, t.worrying15, 14) > 0.5 ? K.terraL : undefined} />
        <Machine x={1250} y={G} s={lerp(0.75, 1.55, shoot)} f={f} glow={0.5 + 0.5 * shoot} />
        {shoot > 0.2 && [0, 1, 2].map((k) => <rect key={k} x={850 - k * 40} y={360 + k * 120} width={160} height={10} rx={5} fill={K.terra} opacity={0.6 * (1 - span(f, t.fast16 + 10, t.fast16 + 40))} />)}
        {Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2 + f / 20; return <path key={k} d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" fill={K.gold} transform={`translate(${1250 + Math.cos(a) * 330} ${520 + Math.sin(a) * 200})`} opacity={win(f, t.exciting15 - 2, t.worrying15)} /> })}
        <g opacity={on(f, t.safe16 - 40, 10)}>
          {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={180 + k * 90} y={G - 160} width={22} height={160} fill={K.sageD} opacity={k < 3 ? 1 : 0.25} />)}
          <rect x={170} y={G - 150} width={210} height={20} rx={8} fill={K.sage} /><rect x={170} y={G - 90} width={210} height={20} rx={8} fill={K.sage} />
          <rect x={380} y={G - 150} width={170} height={20} rx={8} fill="none" stroke={K.sage} strokeWidth={4} strokeDasharray="12 10" />
          <Tag x={360} y={G - 230} text="SAFETY" size={48} bg={K.sageD} />
        </g>
        <Person f={f} who="investor" beats={[[0, 'celebrate', 'smiling'], [t.worrying15, 'nervous', 'worried'], [t.powerful16, 'shock', 'shocked'], [t.safe16, 'scratchHead', 'worried']]} x={720} y={1045} s={0.7} />
        <Tag x={360} y={G + 80} text="NOT FINISHED" size={44} bg={K.red} o={on(f, t.safe16, 8)} />
      </g>}

      {/* ---------------- E) a different direction: Anthropic, January 2021 ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Day f={f} />
        <g opacity={1 - on(f, t.january18 - 6, 10)}>
          <Signpost x={760} y={G} tilt={Math.sin(f / 16) * 2} o={on(f, t.direction17 - 6, 10)} />
          {Array.from({ length: 7 }, (_, k) => <Mini key={k} look={['investor', 'investorF', 'zoe', 'max', 'worker', 'owner', 'buyer'][k]} x={lerp(900 + k * 80, 120 + k * 80, walk)} y={G + 110} scale={0.9} frame={f} seed={k + 60} />)}
        </g>
        {f >= t.january18 - 10 && <g opacity={on(f, t.january18 - 6, 10)}>
          <Cal x={300} y={360} top="JANUARY" big="2021" />
          <Building x={1180} y={G} w={600} h={460} sign="ANTHROPIC" roof={K.terra} o={on(f, t.anthropic18 - 4, 10)} lit={on(f, t.anthropic18, 14)} />
          {Array.from({ length: 7 }, (_, k) => <Mini key={k} look={['investor', 'investorF', 'zoe', 'max', 'worker', 'owner', 'buyer'][k]} x={lerp(300 + k * 70, 840 + k * 105, arrive)} y={G + 120} scale={0.95} frame={f} seed={k + 60} mood="happy" />)}
          <Tag x={1180} y={G + 70} text="7 FOUNDERS" size={46} bg={K.ink} o={on(f, t.seven18, 8) * (1 - on(f, t.executive19 - 4, 8))} />
          <Tag x={880} y={G - 210} text="DARIO · CEO" size={40} bg={K.ink} o={on(f, t.executive19 - 2, 8)} />
          <Tag x={1490} y={G - 210} text="DANIELA · PRESIDENT" size={40} bg={K.terra} o={on(f, t.president19 - 2, 8)} />
        </g>}
      </g>}

      <Headline f={f} lines={[[t.lab10, 'WHERE IT CAME FROM', K.ink, 100], [t.team12, 'MACHINES THAT WRITE', K.ink, 100], [t.noticed13, 'BIGGER = SMARTER', K.ink, 104], [t.exciting15, 'EXCITING... AND WORRYING', K.ink, 100], [t.differences17, 'A DIFFERENT DIRECTION', K.ink, 100]]} />
      <Mark f={f} at={EXTRA.map(c)} />
      <Grain />
    </g>
  )
}
const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - clamp01((f - (b - d)) / d))

export const AN_ORIGIN1 = makePiece('an-origin1', 'Where it came from: an OPENAI lab building and a 2020 calendar, Dario (VP of research) and Daniela step out; GPT-2 (a small writing machine) and GPT-3 (a big one) print paper strips of handwriting; a machine grows bigger as pages pour in and chips plug in, and a figure climbs an even staircase of smartness; sparkles turn to worry as the machine shoots up past a half-built SAFETY rail; a signpost (OPENAI / A NEW LAB) and seven people walk off; January 2021: seven founders arrive at the new ANTHROPIC office, tags CEO and PRESIDENT', {
  mood: 'light', Component: Origin1, beats: [...Object.values(M), ...EXTRA],
  sfx: [['s18:anthropic', 'chime', 0.08], ['s16:fast', 'whoosh', 0.08]] })
