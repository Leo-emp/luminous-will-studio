// ============================================================
// THROWAWAY SPIKE — Luminous Will hero, drawn with CapitalCode's
// HD rig craft (same joints, same pose library, same cel shading)
// but LW's own look: natural warm skin, textured crop hair, a
// burgundy hoodie. Four versions: ordinary, struggling, fit, rich.
// Nothing here is wired into CapitalCode; delete the folder freely.
// ============================================================

import React from 'react'
import { useUid } from '../../art/uid'
import { type ArmPose, type ExpressionId, footDrop, type HandShape, type LegPose, type Pose, SKELETON, type Skeleton } from '../../art/rig/pose'

// # Same proportions as CapitalCode's HD rig (≈ 1 : 6.6 head-to-body)
const BASE: Skeleton = {
  ...SKELETON,
  shoulderR: { x: 92, y: 50 }, shoulderL: { x: -92, y: 50 },
  hipR: { x: 40, y: 270 }, hipL: { x: -40, y: 270 }, hipCentre: { x: 0, y: 270 },
  upperArm: 132, foreArm: 150, handOffset: 16, thigh: 170, shin: 168, foot: 18,
}
// # The fit version: shoulders pushed out, same arm lengths
const FIT: Skeleton = { ...BASE, shoulderR: { x: 104, y: 50 }, shoulderL: { x: -104, y: 50 } }

export type LWLook = {
  top: 'hoodie' | 'tee' | 'blazer'
  cloth: [string, string, string]   // # highlight, base, shadow of the top
  inner: string                     // # shirt under a blazer / string colour on a hoodie
  tie?: string
  pants: [string, string]
  pantsCuff: boolean                // # joggers have a ribbed ankle band
  shoes: 'sneaker' | 'dress'
  skin: [string, string]            // # face base, shadow
  hair: 'crop' | 'messy' | 'neat'
  hairColor: [string, string]
  rim: string
  build: 'normal' | 'fit'
  tired?: boolean                   // # eye bags + creases (the struggling version)
  watch?: boolean
}

const SKIN: [string, string] = ['#B9825C', '#9A6645']
const HAIR: [string, string] = ['#24160F', '#5A3B2A']

// # One hero, four versions. Face, hair shape and the burgundy stay; clothes, posture and build change.
export const LW_LOOKS: Record<'ordinary' | 'struggling' | 'fit' | 'rich', LWLook> = {
  ordinary: { top: 'hoodie', cloth: ['#A63A50', '#7E1F35', '#5C1426'], inner: '#F3E6D8', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: SKIN, hair: 'crop', hairColor: HAIR, rim: '#F4C9A6', build: 'normal' },
  struggling: { top: 'hoodie', cloth: ['#8C5560', '#6A3443', '#4D2330'], inner: '#CFC2B4', pants: ['#4A4C55', '#363840'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#A97758', '#8C5F44'], hair: 'messy', hairColor: HAIR, rim: '#D9B79C', build: 'normal', tired: true },
  fit: { top: 'tee', cloth: ['#B23E56', '#86213A', '#62162A'], inner: '#F3E6D8', pants: ['#262A33', '#1B1E25'], pantsCuff: true, shoes: 'sneaker',
    skin: SKIN, hair: 'crop', hairColor: HAIR, rim: '#F7D2B2', build: 'fit' },
  rich: { top: 'blazer', cloth: ['#5E6372', '#3C404D', '#272A33'], inner: '#F6F1EA', tie: '#86213A', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'dress',
    skin: SKIN, hair: 'neat', hairColor: HAIR, rim: '#E8D2BC', build: 'normal', watch: true },
}

const capsule = (L: number, w1: number, w2: number) =>
  `M${-w1 / 2} 0 L${-w2 / 2} ${L} A${w2 / 2} ${w2 / 2} 0 0 0 ${w2 / 2} ${L} L${w1 / 2} 0 A${w1 / 2} ${w1 / 2} 0 0 0 ${-w1 / 2} 0 Z`

// ------------------------------------------------------------
// FACE — CapitalCode's HD face (white eyes, big pupils, glints),
// recoloured for natural skin: dark brown brows and lines.
// ------------------------------------------------------------
const LINE = '#2A1710', BROW = '#2A1710'
type FaceSpec = { browL: [number, number]; browR: [number, number]; browArc: number; eye: 'open' | 'wide' | 'happy' | 'lidded' | 'squint'; look: number; mouth: string; mouthFill?: string }
const FACES: Record<ExpressionId, FaceSpec> = {
  neutral: { browL: [-122, -120], browR: [-120, -122], browArc: -4, eye: 'open', look: 3, mouth: 'M-2 -62 Q10 -59 22 -63' },
  thinking: { browL: [-120, -120], browR: [-132, -126], browArc: -4, eye: 'open', look: 4, mouth: 'M2 -61 Q13 -59 23 -64' },
  shocked: { browL: [-130, -132], browR: [-132, -130], browArc: -6, eye: 'wide', look: 0, mouth: 'M-3 -60 A8 10 0 1 0 13 -60 A8 10 0 1 0 -3 -60', mouthFill: '#3A1A14' },
  worried: { browL: [-114, -124], browR: [-124, -114], browArc: 2, eye: 'open', look: 0, mouth: 'M-6 -56 Q-1 -62 4 -58 Q9 -54 15 -60' },
  smiling: { browL: [-122, -124], browR: [-124, -122], browArc: -5, eye: 'happy', look: 0, mouth: 'M-8 -64 Q9 -59 26 -66 Q18 -45 0 -52 Q-6 -57 -8 -64 Z', mouthFill: '#FFFFFF' },
  smug: { browL: [-116, -116], browR: [-126, -122], browArc: -3, eye: 'lidded', look: 3, mouth: 'M2 -61 Q14 -59 24 -68' },
  angry: { browL: [-126, -112], browR: [-112, -126], browArc: 2, eye: 'squint', look: 0, mouth: 'M-4 -57 L18 -57' },
}

const Eye: React.FC<{ cx: number; spec: FaceSpec; lidFill: string }> = ({ cx, spec, lidFill }) => {
  const clip = useUid('eyeclip')
  const cy = -100
  if (spec.eye === 'happy') return <path d={`M${cx - 9} ${cy + 2} Q${cx} ${cy - 9} ${cx + 9} ${cy + 2}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  const rx = 11.5, ry = spec.eye === 'wide' ? 15 : spec.eye === 'squint' ? 8 : 13
  const lid = spec.eye === 'lidded' ? 8 : spec.eye === 'squint' ? 4 : 0
  const pr = spec.eye === 'wide' ? 6.5 : 8
  const px = cx + spec.look, py = cy + 1.5
  return (
    <g>
      <defs><clipPath id={clip}><ellipse cx={cx} cy={cy} rx={rx} ry={ry} /></clipPath></defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FBF8F3" />
      <circle cx={px} cy={py} r={pr} fill="#24140D" />
      <circle cx={px + 2.8} cy={py - 3.2} r={2.6} fill="#FFFFFF" />
      <circle cx={px - 2.4} cy={py + 2.6} r={1.1} fill="#FFFFFF" opacity={0.7} />
      {/* # lowered lid, clipped to the eye so no square patch shows on the skin */}
      {lid > 0 && <g clipPath={`url(#${clip})`}>
        <path d={`M${cx - rx - 2} ${cy - ry - 2} L${cx + rx + 2} ${cy - ry - 2} L${cx + rx + 2} ${cy - ry + lid + 4} Q${cx} ${cy - ry + lid + 8} ${cx - rx - 2} ${cy - ry + lid + 4} Z`} fill={lidFill} /></g>}
      <path d={`M${cx - rx - 1.5} ${cy - ry * 0.25 + lid} Q${cx} ${cy - ry - 3 + (lid > 0 ? lid + 4 : 0)} ${cx + rx + 1.5} ${cy - ry * 0.35 + lid}`} stroke={LINE} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    </g>
  )
}

const Face: React.FC<{ expression: ExpressionId; look: LWLook }> = ({ expression, look }) => {
  const s = FACES[expression]
  const brow = (x1: number, x2: number, y: [number, number]) =>
    <path d={`M${x1} ${y[0]} Q${(x1 + x2) / 2} ${(y[0] + y[1]) / 2 + s.browArc} ${x2} ${y[1]}`} stroke={BROW} strokeWidth={6} strokeLinecap="round" fill="none" />
  return (
    <g>
      <g transform="translate(0 -3)">{brow(-28, -4, s.browL)}{brow(14, 38, s.browR)}</g>
      {/* # nose + soft cheek warmth */}
      <path d="M6 -90 Q12 -79 4 -75" stroke={look.skin[1]} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <ellipse cx={-26} cy={-74} rx={9} ry={5} fill="#D9765E" opacity={0.22} /><ellipse cx={38} cy={-74} rx={9} ry={5} fill="#D9765E" opacity={0.22} />
      <Eye cx={-15} spec={s} lidFill={look.skin[0]} /><Eye cx={25} spec={s} lidFill={look.skin[0]} />
      {look.tired && <g stroke={look.skin[1]} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}>
        <path d="M-25 -84 Q-15 -79 -5 -84" /><path d="M15 -84 Q25 -79 35 -84" /></g>}
      <path d={s.mouth} stroke={s.mouthFill === '#FFFFFF' ? LINE : LINE} strokeWidth={3.5} fill={s.mouthFill ?? 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

// ------------------------------------------------------------
// HEAD — CapitalCode's head shape; LW hair styles
// ------------------------------------------------------------
const Head: React.FC<{ look: LWLook; expression: ExpressionId; tilt: number; u: (n: string) => string }> = ({ look, expression, tilt, u }) => {
  const [h, hl] = look.hairColor
  return (
    <g transform={`rotate(${tilt} 4 -60)`}>
      <defs>
        <linearGradient id={u('face')} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={look.skin[0]} /><stop offset="100%" stopColor={look.skin[1]} /></linearGradient>
      </defs>
      <ellipse cx={-47} cy={-96} rx={9} ry={14} fill={look.skin[1]} /><ellipse cx={55} cy={-96} rx={9} ry={14} fill={look.skin[1]} />
      <path d="M-46 -104 C-46 -150 -14 -170 8 -168 C42 -166 56 -136 54 -104 C54 -72 44 -50 26 -40 C14 -33 -4 -33 -16 -40 C-34 -50 -46 -74 -46 -104 Z" fill={`url(#${u('face')})`} />
      <path d="M-44 -116 C-46 -80 -36 -52 -16 -40" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.6} />
      {/* # stubble shadow on the struggling version */}
      {look.tired && <path d="M-36 -62 C-28 -44 -8 -36 8 -36 C24 -36 40 -46 46 -62 C38 -52 22 -46 8 -46 C-8 -46 -26 -50 -36 -62 Z" fill={look.skin[1]} opacity={0.55} />}
      {/* # Hair — short textured crop with faded sides (LW), tidy side part (rich), or pushed every way (struggling) */}
      {look.hair !== 'neat' && <g>
        <path d="M-48 -100 C-50 -122 -46 -132 -42 -138 L-40 -104 Z M56 -100 C58 -122 54 -132 50 -138 L48 -104 Z" fill={h} opacity={0.55} />
        <path d="M-44 -122 C-50 -156 -24 -184 8 -186 C42 -186 62 -160 54 -122 C46 -138 30 -146 8 -146 C-14 -146 -34 -138 -44 -122 Z" fill={h} />
      </g>}
      {look.hair === 'crop' && <g>
        {/* # textured top: one solid mass with a soft wavy crown, highlights kept INSIDE the hair */}
        <path d="M-44 -124 C-50 -150 -40 -172 -24 -182 C-16 -194 -2 -190 4 -196 C14 -202 26 -192 34 -194 C48 -194 58 -178 58 -162 C62 -148 58 -134 54 -122 C46 -138 30 -146 8 -146 C-14 -146 -34 -138 -44 -124 Z" fill={h} />
        <path d="M-30 -160 C-22 -174 -12 -180 -2 -182" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.85} />
        <path d="M6 -176 C16 -186 28 -186 36 -182" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.85} />
        <path d="M-14 -164 C-6 -170 4 -172 12 -170" stroke={hl} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
        <path d="M44 -176 C54 -166 56 -150 54 -132" stroke={hl} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.7} />
      </g>}
      {look.hair === 'messy' && <g>
        {[[-46, -146, -66, -176, -30, -164], [-30, -164, -30, -212, -4, -174], [-8, -172, 6, -218, 18, -172], [12, -172, 44, -208, 40, -162], [34, -164, 74, -178, 54, -136], [-36, -128, -62, -132, -44, -112]].map(([x1, y1, cx, cy, x2, y2], k) => (
          <path key={k} d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} Z`} fill={h} />))}
        {[[-26, -168, -24, -190], [0, -174, 4, -198], [22, -172, 32, -192]].map(([x1, y1, x2, y2], k) => (
          <path key={k} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={hl} strokeWidth={3.5} strokeLinecap="round" opacity={0.7} />))}
      </g>}
      {look.hair === 'neat' && <g>
        <path d="M-48 -100 C-56 -146 -24 -184 12 -184 C50 -184 66 -152 58 -104 L54 -98 C52 -124 38 -140 14 -142 C-10 -142 -32 -128 -48 -100 Z" fill={h} />
        <path d="M-20 -148 C-6 -186 34 -196 60 -160 C40 -166 18 -160 -2 -144 Z" fill={h} />
        <path d="M-20 -150 L-14 -180" stroke="#0E0805" strokeWidth={3} strokeLinecap="round" />
        <path d="M-6 -164 C12 -184 38 -186 56 -166" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M12 -184 C50 -184 66 -152 58 -108" stroke={hl} strokeWidth={3} fill="none" opacity={0.8} />
      </g>}
      <Face expression={expression} look={look} />
    </g>
  )
}

const Hand: React.FC<{ shape: HandShape; skin: string; rim: string }> = ({ shape, skin, rim }) => {
  if (shape === 'pocket') return null
  const f = (x: number, len: number, rot: number, k: number) => <path key={k} d={capsule(len, 11, 9)} transform={`translate(${x} 10) rotate(${rot})`} fill={skin} />
  const fingers =
    shape === 'thumb' ? [<rect key="f" x={-16} y={2} width={32} height={22} rx={10} fill={skin} />, <path key="t" d={capsule(30, 12, 10)} transform="translate(-14 6) rotate(160)" fill={skin} />]
    : shape === 'fist' ? [<rect key="f" x={-16} y={2} width={32} height={22} rx={10} fill={skin} />]
    : shape === 'point' ? [f(-4, 34, 0, 0), <rect key="r" x={0} y={4} width={20} height={18} rx={8} fill={skin} />]
    : shape === 'open' ? [-12, -4, 4, 12].map((x, k) => f(x * 1.2, 26, x * 2.2, k))
    : shape === 'chin' ? [-10, -2, 6].map((x, k) => f(x, 26, -16 + k * 6, k))
    : [-10, -3, 4, 11].map((x, k) => f(x, 22 - Math.abs(x) * 0.3, x * 0.6, k))
  return (
    <g>
      <ellipse cx={0} cy={4} rx={16} ry={16} fill={skin} />
      {fingers}
      {shape !== 'fist' && shape !== 'thumb' && <path d={capsule(20, 11, 9)} transform={`translate(${shape === 'chin' ? 12 : -14} 2) rotate(${shape === 'open' ? 70 : shape === 'chin' ? -60 : 40})`} fill={skin} />}
      <path d="M14 -6 Q19 6 14 16" stroke={rim} strokeWidth={2} fill="none" opacity={0.5} />
    </g>
  )
}

// ------------------------------------------------------------
// ARM — hoodie sleeve with a ribbed cuff, a short tee sleeve over
// a bare (muscled, on the fit build) arm, or a blazer sleeve
// ------------------------------------------------------------
const Arm: React.FC<{ a: ArmPose; side: 1 | -1; look: LWLook; S: Skeleton }> = ({ a, side, look, S }) => {
  const L1 = S.upperArm * a.up, L2 = S.foreArm * a.fo
  const k = look.build === 'fit' ? 1.16 : 1
  const base = side === 1 ? look.cloth[2] : look.cloth[1]
  const lit = side === 1 ? look.cloth[1] : look.cloth[0]
  const skinA = side === 1 ? look.skin[1] : look.skin[0]
  const bare = look.top === 'tee'
  return (
    <g transform={`rotate(${a.sh})`}>
      {bare
        ? <g>
          <path d={capsule(L1, 50 * k, 40 * k)} fill={skinA} />
          {/* # bicep curve */}
          <path d={`M${-side * 20 * k} ${L1 * 0.35} Q${-side * 28 * k} ${L1 * 0.62} ${-side * 18 * k} ${L1 * 0.9}`} stroke={look.rim} strokeWidth={3} fill="none" opacity={0.55} strokeLinecap="round" />
          <path d={capsule(L1 * 0.42, 56 * k, 52 * k)} fill={base} />
          <rect x={-26 * k} y={L1 * 0.42 - 2} width={52 * k} height={7} rx={3} fill={look.cloth[2]} opacity={0.8} />
        </g>
        : <g>
          <path d={capsule(L1, 52, 44)} fill={base} />
          <path d={`M${-side * 22} 10 L${-side * 18} ${Math.max(12, L1 - 4)}`} stroke={lit} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
          {look.tired && <path d={`M${-side * 4} ${L1 * 0.5} q${side * 8} 6 ${side * 16} 0`} stroke={look.cloth[2]} strokeWidth={3} fill="none" opacity={0.8} />}
        </g>}
      <g transform={`translate(0 ${L1}) rotate(${a.el})`}>
        {bare
          ? <path d={capsule(L2 + 4, 40 * k, 32 * k)} fill={skinA} />
          : <g>
            <path d={capsule(L2 + 4, 44, 38)} fill={base} />
            <path d={`M${-side * 18} 6 L${-side * 15} ${Math.max(8, L2 - 6)}`} stroke={lit} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
            {/* # cuff: ribbed band (hoodie) or shirt cuff (blazer) */}
            {a.hand !== 'pocket' && (look.top === 'hoodie'
              ? <g><rect x={-19} y={L2 - 16} width={38} height={18} rx={6} fill={look.cloth[2]} />
                {[-10, -3, 4, 11].map((x) => <line key={x} x1={x} x2={x} y1={L2 - 13} y2={L2 - 1} stroke={look.cloth[1]} strokeWidth={2} opacity={0.7} />)}</g>
              : <rect x={-17} y={L2 - 6} width={34} height={8} rx={4} fill={look.inner} />)}
          </g>}
        {look.watch && side === -1 && a.hand !== 'pocket' && <g><rect x={-18} y={L2 - 22} width={36} height={12} rx={4} fill="#C9A45C" /><rect x={-8} y={L2 - 25} width={16} height={18} rx={4} fill="#E3C680" stroke="#9C7A3A" strokeWidth={2} /></g>}
        <g transform={`translate(0 ${L2 + S.handOffset})`}><Hand shape={a.hand} skin={look.skin[0]} rim={look.rim} /></g>
      </g>
    </g>
  )
}

const Leg: React.FC<{ g: LegPose; look: LWLook; side: 1 | -1; S: Skeleton }> = ({ g, look, side, S }) => {
  const L1 = S.thigh * g.up, L2 = S.shin * g.lo
  const fill = side === 1 ? look.pants[1] : look.pants[0]
  const shoe = look.shoes === 'sneaker'
    ? <g><path d={`M-26 ${L2 - 4} Q-6 ${L2 - 18} 30 ${L2 - 4} L36 ${L2 + 12} L-30 ${L2 + 12} Z`} fill="#F4F1EC" />
      <path d={`M-20 ${L2 - 2} Q4 ${L2 - 12} 26 ${L2 - 2}`} stroke={look.cloth[1]} strokeWidth={4} fill="none" />
      <rect x={-31} y={L2 + 10} width={68} height={7} rx={3} fill="#CFC8BE" /></g>
    : <path d={`M-24 ${L2 - 4} Q0 ${L2 - 14} 30 ${L2 - 2} L34 ${L2 + 12} L-28 ${L2 + 12} Z`} fill="#1A1210" />
  return (
    <g transform={`rotate(${g.hip})`}>
      <path d={capsule(L1 + 8, 60, 50)} fill={fill} />
      <g transform={`translate(0 ${L1}) rotate(${g.knee})`}>
        <path d={capsule(L2, 50, look.pantsCuff ? 38 : 44)} fill={fill} />
        <path d={`M${side * 8} -${L1 * 0.6} L${side * 6} ${L2 - 10}`} stroke={look.pants[side === 1 ? 0 : 1]} strokeWidth={2} opacity={0.5} />
        {/* # joggers: side stripe + ribbed ankle cuff */}
        {look.pantsCuff && <g>
          <path d={`M${-side * 20} -${L1 * 0.7} L${-side * 16} ${L2 - 24}`} stroke={look.cloth[1]} strokeWidth={4} opacity={0.85} strokeLinecap="round" />
          <rect x={-20} y={L2 - 22} width={40} height={14} rx={5} fill={look.pants[1]} stroke={look.pants[0]} strokeWidth={1.5} /></g>}
        <g transform={`translate(0 ${L2}) scale(1.3) translate(0 ${-L2})`}>{shoe}</g>
      </g>
    </g>
  )
}

// ------------------------------------------------------------
// TORSO — hoodie (hood around the neck, strings, pocket, hem band),
// fitted tee (fit build), or open blazer with a burgundy tie
// ------------------------------------------------------------
const Torso: React.FC<{ look: LWLook }> = ({ look }) => {
  const [hi, base, sh] = look.cloth
  const fit = look.build === 'fit'
  if (look.top === 'blazer') return (
    <g>
      <path d="M-44 4 L48 4 L46 262 L-42 262 Z" fill={look.inner} />
      <path d="M12 4 L48 4 L46 262 L18 262 Z" fill="#000" opacity={0.06} />
      <rect x={-48} y={258} width={98} height={16} rx={3} fill={look.pants[1]} />
      {look.tie && <path d="M-2 14 L10 14 L14 30 L8 150 L2 164 L-4 150 L-8 30 Z" fill={look.tie} />}
      <path d="M-38 2 C-78 8 -106 24 -110 68 C-112 120 -98 168 -88 200 C-90 236 -94 262 -96 284 L-18 288 L-14 150 Z" fill={base} />
      <path d="M44 2 C84 8 112 24 116 68 C118 120 104 168 94 200 C96 236 100 262 102 284 L24 288 L20 150 Z" fill={sh} />
      <path d="M-38 2 L-26 2 L-12 112 L-30 70 L-50 60 Z" fill={hi} opacity={0.9} />
      <path d="M44 2 L32 2 L18 112 L36 70 L56 60 Z" fill={base} opacity={0.9} />
      {/* # pocket square in burgundy */}
      <path d="M-84 120 L-60 120 L-66 108 L-74 114 L-80 106 Z" fill={look.tie} />
      <path d="M-86 124 L-56 124" stroke={sh} strokeWidth={4} strokeLinecap="round" />
      <circle cx={-15} cy={196} r={4} fill={sh} />
      <path d="M-110 70 C-112 120 -98 168 -88 200 C-90 236 -94 262 -96 284" stroke={look.rim} strokeWidth={4} fill="none" opacity={0.5} />
    </g>
  )
  const body = fit
    ? 'M-44 0 C-94 4 -122 22 -124 66 C-122 112 -100 160 -86 200 C-86 232 -88 258 -90 274 L94 274 C92 258 90 232 90 200 C104 160 126 112 128 66 C126 22 98 4 48 0 Z'
    : 'M-40 0 C-80 6 -108 24 -112 68 C-114 120 -102 168 -94 200 C-96 236 -98 262 -100 286 L104 286 C102 262 100 236 98 200 C106 168 118 120 116 68 C112 24 84 6 44 0 Z'
  return (
    <g>
      <path d={body} fill={base} />
      {/* # shadow side + soft folds */}
      <path d={fit ? 'M18 0 C70 4 124 22 128 66 C126 112 104 160 90 200 C90 232 92 258 94 274 L30 274 C34 200 30 80 18 0 Z' : 'M20 2 C70 6 112 24 116 68 C118 120 106 168 98 200 C100 236 102 262 104 286 L34 286 C38 200 34 80 20 2 Z'} fill={sh} opacity={0.75} />
      <path d={fit ? 'M-124 66 C-122 112 -100 160 -86 200' : 'M-112 68 C-114 120 -102 168 -94 200 C-96 236 -98 262 -100 286'} stroke={hi} strokeWidth={5} fill="none" opacity={0.6} />
      {fit
        ? <g>
          {/* # crew neck + chest line */}
          <path d="M-30 2 Q2 30 34 2" stroke={sh} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M-70 110 Q-34 126 -4 114 M10 114 Q40 126 74 110" stroke={sh} strokeWidth={3} fill="none" opacity={0.6} strokeLinecap="round" />
          <rect x={-90} y={262} width={184} height={14} rx={4} fill={look.pants[1]} /></g>
        : <g>
          {look.tired && <g stroke={sh} strokeWidth={3} fill="none" opacity={0.9} strokeLinecap="round">
            <path d="M-80 120 q14 10 30 2" /><path d="M40 150 q16 8 34 -2" /><path d="M-60 214 q20 6 36 -4" /></g>}
          {/* # kangaroo pocket */}
          <path d="M-62 186 L66 186 L84 258 L-80 258 Z" fill={sh} opacity={0.55} />
          <path d="M-62 186 L66 186" stroke={hi} strokeWidth={4} opacity={0.5} strokeLinecap="round" />
          {/* # ribbed hem band */}
          <rect x={-102} y={262} width={208} height={26} rx={8} fill={sh} />
          {[-80, -56, -32, -8, 16, 40, 64, 88].map((x) => <line key={x} x1={x} x2={x} y1={266} y2={284} stroke={base} strokeWidth={2} opacity={0.6} />)}
          {/* # hood folded around the neck */}
          <path d="M-56 -4 C-60 -30 64 -30 60 -4 C52 26 -48 26 -56 -4 Z" fill={sh} />
          <path d="M-44 0 C-30 -12 34 -12 48 0 C36 18 -32 18 -44 0 Z" fill="#2A0F18" opacity={0.6} />
          <path d="M-56 -4 C-48 30 52 30 60 -4" stroke={hi} strokeWidth={8} fill="none" strokeLinecap="round" />
          {/* # drawstrings */}
          <path d="M-12 20 L-16 96" stroke={look.inner} strokeWidth={5} strokeLinecap="round" />
          <path d="M18 20 L22 104" stroke={look.inner} strokeWidth={5} strokeLinecap="round" />
          <rect x={-20} y={94} width={8} height={14} rx={3} fill={look.inner} /><rect x={18} y={102} width={8} height={14} rx={3} fill={look.inner} />
        </g>}
    </g>
  )
}

export const LWCharacter: React.FC<{ pose: Pose; look: LWLook }> = ({ pose: p, look }) => {
  const base = useUid('lw')
  const u = (n: string) => `${base}-${n}`
  const S = look.build === 'fit' ? FIT : BASE
  return (
    <g transform={`translate(0 ${-footDrop(p, S) + p.bob})`}>
      <g transform={`translate(${S.hipL.x} ${S.hipL.y})`}><Leg g={{ ...p.ll, hip: p.ll.hip + 5 }} look={look} side={-1} S={S} /></g>
      <g transform={`translate(${S.hipR.x} ${S.hipR.y})`}><Leg g={{ ...p.rl, hip: p.rl.hip - 5 }} look={look} side={1} S={S} /></g>
      <g transform={`rotate(${p.lean} ${S.hipCentre.x} ${S.hipCentre.y})`}>
        <Torso look={look} />
        <path d="M-16 -30 L18 -30 L20 14 L-16 14 Z" fill={look.skin[1]} />
        {look.top === 'hoodie' && <path d="M-56 -4 C-48 30 52 30 60 -4" stroke={look.cloth[0]} strokeWidth={8} fill="none" strokeLinecap="round" />}
        <g transform="translate(0 26) scale(1.14) translate(0 -4)"><Head look={look} expression={p.expression} tilt={p.head} u={u} /></g>
        <g transform={`translate(${S.shoulderL.x} ${S.shoulderL.y})`}><Arm a={p.l} side={-1} look={look} S={S} /></g>
        <g transform={`translate(${S.shoulderR.x} ${S.shoulderR.y})`}><Arm a={p.r} side={1} look={look} S={S} /></g>
      </g>
    </g>
  )
}

// # Just the head (for the expression strip)
export const LWHead: React.FC<{ look: LWLook; expression: ExpressionId }> = ({ look, expression }) => {
  const base = useUid('lwh')
  return <Head look={look} expression={expression} tilt={0} u={(n) => `${base}-${n}`} />
}
