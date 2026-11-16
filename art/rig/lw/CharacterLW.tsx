// ============================================================
// CHARACTER LW — the owner-approved Luminous Will hero (render
// approved 2026-11-13: "its ok. i like them"). Same joints, pose
// library and cel shading as the engine's rig; LW's own look:
// warm natural skin, textured crop hair, burgundy signature.
// Four versions of ONE person (same face + hair shape, always a
// touch of burgundy): hero, hero-struggling, hero-fit, hero-rich.
// Drawn in neck-origin coordinates; the origin ends up between
// the feet (place with translate(x y)).
// ============================================================

import React from 'react'
import { useUid } from '../../uid'
import { type ArmPose, type ExpressionId, footDrop, type HandShape, type LegPose, type Pose, SKELETON, type Skeleton } from '../pose'

// # Same proportions as the engine's HD rig (≈ 1 : 6.6 head-to-body)
export const LW_SKELETON: Skeleton = {
  ...SKELETON,
  shoulderR: { x: 92, y: 50 }, shoulderL: { x: -92, y: 50 },
  hipR: { x: 40, y: 270 }, hipL: { x: -40, y: 270 }, hipCentre: { x: 0, y: 270 },
  upperArm: 132, foreArm: 150, handOffset: 16, thigh: 170, shin: 168, foot: 18,
}
// # The fit version: shoulders pushed out, same arm lengths
export const LW_FIT_SKELETON: Skeleton = { ...LW_SKELETON, shoulderR: { x: 104, y: 50 }, shoulderL: { x: -104, y: 50 } }

export type LookLW = {
  top: 'hoodie' | 'tee' | 'blazer' | 'dress'   // # dress = fitted bodice, sash and a flared knee-length skirt (bare arms + legs)
  cloth: [string, string, string]   // # highlight, base, shadow of the top
  inner: string                     // # shirt under a blazer / string colour on a hoodie
  tie?: string
  pants: [string, string]
  pantsCuff: boolean                // # joggers have a ribbed ankle band
  shoes: 'sneaker' | 'dress' | 'heel'
  skin: [string, string]            // # face base, shadow
  // # long = shoulder-length (old library characters). Women (owner 2026-11-16: "make the girl look like a girl"):
  // # waves = long flowing hair past the shoulders, side part, forehead showing; bun = sleek with a top bun; ponytail = high ponytail
  hair: 'crop' | 'messy' | 'neat' | 'long' | 'waves' | 'bun' | 'ponytail'
  fem?: boolean                     // # feminine face (lashes, tinted lips, finer brows) + slimmer legs + fitted top
  lips?: string                     // # lip colour (fem)
  glasses?: string                  // # round glasses in this frame colour (researchers, readers)
  hairColor: [string, string]
  rim: string
  build: 'normal' | 'fit'
  tired?: boolean                   // # eye bags + creases (the struggling version)
  watch?: boolean
}

const SKIN: [string, string] = ['#B9825C', '#9A6645']
const HAIR: [string, string] = ['#24160F', '#5A3B2A']

// # One hero, four versions. Face, hair shape and the burgundy stay; clothes, posture and build change.
export const LOOKS_LW: Record<string, LookLW> = {
  hero: { top: 'hoodie', cloth: ['#A63A50', '#7E1F35', '#5C1426'], inner: '#F3E6D8', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: SKIN, hair: 'crop', hairColor: HAIR, rim: '#F4C9A6', build: 'normal' },
  'hero-struggling': { top: 'hoodie', cloth: ['#8C5560', '#6A3443', '#4D2330'], inner: '#CFC2B4', pants: ['#4A4C55', '#363840'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#A97758', '#8C5F44'], hair: 'messy', hairColor: HAIR, rim: '#D9B79C', build: 'normal', tired: true },
  'hero-fit': { top: 'tee', cloth: ['#B23E56', '#86213A', '#62162A'], inner: '#F3E6D8', pants: ['#262A33', '#1B1E25'], pantsCuff: true, shoes: 'sneaker',
    skin: SKIN, hair: 'crop', hairColor: HAIR, rim: '#F7D2B2', build: 'fit' },
  'hero-rich': { top: 'blazer', cloth: ['#5E6372', '#3C404D', '#272A33'], inner: '#F6F1EA', tie: '#86213A', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'dress',
    skin: SKIN, hair: 'neat', hairColor: HAIR, rim: '#E8D2BC', build: 'normal', watch: true },
  // # LIBRARY (owner 2026-11-13: extra characters live here; famous people are always shown with a name label)
  // # J.K. Rowling (video: Rejected 12 Times): shoulder-length auburn hair, forest-green jacket
  'lib-rowling': { top: 'blazer', cloth: ['#4F7A5E', '#3A5C46', '#284232'], inner: '#F3E6D8', pants: ['#3A3540', '#2A2630'], pantsCuff: false, shoes: 'dress',
    skin: ['#F2CDB2', '#DDAE90'], hair: 'long', hairColor: ['#8A4A2C', '#B56E44'], rim: '#FFE3CF', build: 'normal' },
  // # Thomas Edison (video: He Lost Everything at 67): white side-parted hair, dark three-piece suit, aged skin
  'lib-edison': { top: 'blazer', cloth: ['#3E3A36', '#2C2926', '#1C1A18'], inner: '#F4EFE6', tie: '#2A2A2A', pants: ['#3A3632', '#2A2724'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#E8E4DC', '#FFFFFF'], rim: '#FFE6D2', build: 'normal', tired: true },
  // # Sara Blakely (video: Why You're So Afraid of Failing): long blonde hair, red blazer
  'lib-blakely': { top: 'blazer', cloth: ['#E0565B', '#C23B44', '#8F2832'], inner: '#FFFFFF', pants: ['#F1ECE4', '#D9D2C6'], pantsCuff: false, shoes: 'dress',
    skin: ['#F4D2B8', '#E0B396'], hair: 'long', hairColor: ['#E3B862', '#F4D58C'], rim: '#FFE9D6', build: 'normal' },
  // # Sara's dad at the dinner table (same video): neat grey hair, navy sweater-tee
  'lib-blakely-dad': { top: 'tee', cloth: ['#4A6A9A', '#344F78', '#243858'], inner: '#F3E6D8', pants: ['#4A4540', '#36322E'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#8E8A84', '#B5B0A8'], rim: '#FFE6D2', build: 'normal' },
  // # James Dyson (same video): white swept hair, navy work shirt
  'lib-dyson': { top: 'tee', cloth: ['#3F5E86', '#2D4766', '#1F3249'], inner: '#F3E6D8', pants: ['#3A3D46', '#2A2D34'], pantsCuff: false, shoes: 'dress',
    skin: ['#F0CBAE', '#D9A988'], hair: 'messy', hairColor: ['#E6E2DA', '#FFFFFF'], rim: '#FFE6D2', build: 'normal' },
  // # Daniel Kahneman and Amos Tversky (same video): white neat hair, grey blazer / dark messy hair, tan blazer
  'lib-kahneman': { top: 'blazer', cloth: ['#8D939C', '#6E747E', '#50555E'], inner: '#F4EFE6', pants: ['#4A4C55', '#363840'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#E4E0D8', '#FFFFFF'], rim: '#FFE6D2', build: 'normal', tired: true },
  'lib-tversky': { top: 'blazer', cloth: ['#C9A878', '#A88A5C', '#7E6644'], inner: '#F4EFE6', pants: ['#4A4540', '#36322E'], pantsCuff: false, shoes: 'dress',
    skin: ['#E9BE9A', '#CF9F7C'], hair: 'messy', hairColor: ['#2A1E18', '#4A3A30'], rim: '#FFE3CC', build: 'normal' },
  // # young Sara and her brother at the dinner table (same video): drawn small as kids
  'lib-sara-kid': { top: 'tee', cloth: ['#F59AB0', '#E57490', '#C45470'], inner: '#FFFFFF', pants: ['#5C7AB0', '#45608F'], pantsCuff: false, shoes: 'sneaker',
    skin: ['#F4D2B8', '#E0B396'], hair: 'long', hairColor: ['#E3B862', '#F4D58C'], rim: '#FFE9D6', build: 'normal' },
  'lib-brother-kid': { top: 'tee', cloth: ['#7CC48A', '#5AA56A', '#3F8050'], inner: '#FFFFFF', pants: ['#5C7AB0', '#45608F'], pantsCuff: false, shoes: 'sneaker',
    skin: ['#F4D2B8', '#E0B396'], hair: 'crop', hairColor: ['#8A5A34', '#A8744A'], rim: '#FFE9D6', build: 'normal' },
  // # the doughnut-shop worker and a passer-by (same video; ordinary people, no names)
  'lib-baker': { top: 'tee', cloth: ['#F7B7C8', '#EE93AB', '#D06E8A'], inner: '#FFFFFF', pants: ['#4A4C55', '#363840'], pantsCuff: false, shoes: 'sneaker',
    skin: ['#C98E66', '#AE734E'], hair: 'long', hairColor: ['#2A1A12', '#4A3426'], rim: '#F7D2B2', build: 'normal' },
  'lib-stranger': { top: 'hoodie', cloth: ['#9AA3B0', '#7A8494', '#5C6574'], inner: '#E8E4DC', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#E9BE9A', '#CF9F7C'], hair: 'neat', hairColor: ['#5A3B2A', '#7A5440'], rim: '#FFE3CC', build: 'normal' },
  // # Jia Jiang (same video): short black hair, green hoodie
  'lib-jiang': { top: 'hoodie', cloth: ['#5FA37A', '#3F7F5A', '#2C5C40'], inner: '#F3E6D8', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#E8C29E', '#CFA27E'], hair: 'crop', hairColor: ['#141414', '#3A3A3A'], rim: '#FFE3CC', build: 'normal' },
  // # EVERYDAY CAST (owner 2026-11-16: scenes act out the voice with real people; no names, no famous faces)
  'p-fiance': { top: 'tee', cloth: ['#4FA3A0', '#327F7C', '#235E5C'], inner: '#F3E6D8', pants: ['#3A3D46', '#2A2D34'], pantsCuff: false, shoes: 'dress',
    skin: ['#8E5B3E', '#73462E'], hair: 'crop', hairColor: ['#141010', '#3A2A22'], rim: '#F4C9A6', build: 'normal' },
  // # the bride-to-be: blush-pink sundress with a white sash, long dark waves, heels
  'p-fiancee': { top: 'dress', cloth: ['#FAD3DC', '#F2AFC0', '#DB8DA2'], inner: '#FFFFFF', pants: ['#E8BE98', '#D9AA84'], pantsCuff: false, shoes: 'heel',
    skin: ['#E8BE98', '#CC9E78'], hair: 'waves', hairColor: ['#3A2418', '#7A4E34'], rim: '#FFE3CC', build: 'normal', fem: true, lips: '#B5485E' },
  'p-classmate': { top: 'blazer', cloth: ['#3E5C8C', '#2C4570', '#1E3254'], inner: '#F6F1EA', tie: '#C9A24A', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'dress',
    skin: ['#E9C29E', '#CFA27E'], hair: 'neat', hairColor: ['#1C1410', '#3A2A22'], rim: '#FFE3CC', build: 'normal' },
  // # the hiring manager: dark brown hair in a sleek bun, charcoal blazer over a cream blouse
  'p-boss': { top: 'blazer', cloth: ['#7A7F8C', '#5C616E', '#42464F'], inner: '#F3E4D4', pants: ['#3A3D46', '#2A2D34'], pantsCuff: false, shoes: 'heel',
    skin: ['#A86E4E', '#8A5638'], hair: 'bun', hairColor: ['#3A2418', '#6A4430'], rim: '#F4D2B2', build: 'normal', fem: true, lips: '#8E3E44' },
  // # the new home owner: high ponytail, coral tee, jeans
  'p-buyer': { top: 'tee', cloth: ['#F09A7E', '#DB7A5E', '#B85E44'], inner: '#FFFFFF', pants: ['#5C7AB0', '#45608F'], pantsCuff: false, shoes: 'sneaker',
    skin: ['#C98E66', '#AE734E'], hair: 'ponytail', hairColor: ['#1A120E', '#5A3A28'], rim: '#F7D2B2', build: 'normal', fem: true, lips: '#9E4450' },
  'p-agent': { top: 'blazer', cloth: ['#2F4A6A', '#22374F', '#172638'], inner: '#FFFFFF', tie: '#D2463C', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'dress',
    skin: ['#F0CBAE', '#D9A988'], hair: 'neat', hairColor: ['#6A4A32', '#8A6648'], rim: '#FFE6D2', build: 'normal' },
  'p-partner': { top: 'tee', cloth: ['#9C86C9', '#7E68AE', '#5F4E8A'], inner: '#FFFFFF', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#A97758', '#8C5F44'], hair: 'messy', hairColor: ['#2A1A12', '#4A3426'], rim: '#F4C9A6', build: 'normal' },
  // # researchers, people from history (shown with a desk name plate, never a caption), neighbours, friends
  'p-1950s': { top: 'blazer', cloth: ['#8A6A4E', '#6E523A', '#523C2A'], inner: '#F4EFE6', tie: '#5A2A2A', pants: ['#4A4038', '#3A322C'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#2A1E18', '#4A3A30'], rim: '#FFE6D2', build: 'normal' },
  'p-surgeon': { top: 'blazer', cloth: ['#FFFFFF', '#E8EDF2', '#C9D2DC'], inner: '#BFD8E6', tie: '#3A5A7A', pants: ['#4A4C55', '#363840'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#9A948E', '#C8C2BC'], rim: '#FFE6D2', build: 'normal', glasses: '#3A3A3A' },
  'p-researcher-f': { top: 'blazer', cloth: ['#4FA3A0', '#327F7C', '#235E5C'], inner: '#FFFFFF', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'heel',
    skin: ['#E8C29E', '#CFA27E'], hair: 'bun', hairColor: ['#2A1A12', '#5A3A28'], rim: '#FFE3CC', build: 'normal', fem: true, lips: '#A8485A', glasses: '#2A2A2A' },
  'p-researcher-m': { top: 'tee', cloth: ['#E9D8B8', '#D2BE98', '#B09C78'], inner: '#FFFFFF', pants: ['#3A3D46', '#2A2D34'], pantsCuff: false, shoes: 'dress',
    skin: ['#8E5B3E', '#73462E'], hair: 'neat', hairColor: ['#141010', '#3A2A22'], rim: '#F4C9A6', build: 'normal', glasses: '#2A2A2A' },
  'p-friend-f': { top: 'tee', cloth: ['#9FD0C0', '#7DB8A6', '#5E9886'], inner: '#FFFFFF', pants: ['#F1ECE4', '#D9D2C6'], pantsCuff: false, shoes: 'sneaker',
    skin: ['#F0CBAE', '#D9A988'], hair: 'waves', hairColor: ['#6A4022', '#A06A3E'], rim: '#FFE6D2', build: 'normal', fem: true, lips: '#C0566A' },
  'p-friend-m': { top: 'hoodie', cloth: ['#F2C14E', '#D9A532', '#B08422'], inner: '#FFFFFF', pants: ['#3B4050', '#2B2F3B'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#E9C29E', '#CFA27E'], hair: 'messy', hairColor: ['#3A2418', '#5A3A28'], rim: '#FFE3CC', build: 'normal' },
  'p-elder-f': { top: 'blazer', cloth: ['#B3344F', '#8E2440', '#6A1A30'], inner: '#F3E6D8', pants: ['#4A4540', '#36322E'], pantsCuff: false, shoes: 'heel',
    skin: ['#A86E4E', '#8A5638'], hair: 'bun', hairColor: ['#BDB7B0', '#E2DCD6'], rim: '#F4D2B2', build: 'normal', fem: true, lips: '#8E3E44' },
  'p-elder-m': { top: 'tee', cloth: ['#7A9CC6', '#5C7EA8', '#46628A'], inner: '#FFFFFF', pants: ['#4A4540', '#36322E'], pantsCuff: false, shoes: 'dress',
    skin: ['#EFC7A6', '#D6A484'], hair: 'neat', hairColor: ['#BDB7B0', '#E2DCD6'], rim: '#FFE6D2', build: 'normal', glasses: '#5A4A3A' },
  'p-runner': { top: 'tee', cloth: ['#4F7FD0', '#3562AE', '#244886'], inner: '#FFFFFF', pants: ['#262A33', '#1B1E25'], pantsCuff: true, shoes: 'sneaker',
    skin: ['#C98E66', '#AE734E'], hair: 'crop', hairColor: ['#141010', '#3A2A22'], rim: '#F7D2B2', build: 'fit' },
  'p-colleague-f': { top: 'blazer', cloth: ['#E58A9E', '#CC6C80', '#A85266'], inner: '#FFFFFF', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'heel',
    skin: ['#8E5B3E', '#73462E'], hair: 'waves', hairColor: ['#141010', '#3A2A22'], rim: '#F4C9A6', build: 'normal', fem: true, lips: '#8E2E44' },
  'p-colleague-m': { top: 'blazer', cloth: ['#5E6372', '#3C404D', '#272A33'], inner: '#DCE8F2', tie: '#2E5C9A', pants: ['#2E323D', '#22252D'], pantsCuff: false, shoes: 'dress',
    skin: ['#F0CBAE', '#D9A988'], hair: 'messy', hairColor: ['#8A5A34', '#A8744A'], rim: '#FFE6D2', build: 'normal' },
}

const capsule = (L: number, w1: number, w2: number) =>
  `M${-w1 / 2} 0 L${-w2 / 2} ${L} A${w2 / 2} ${w2 / 2} 0 0 0 ${w2 / 2} ${L} L${w1 / 2} 0 A${w1 / 2} ${w1 / 2} 0 0 0 ${-w1 / 2} 0 Z`

// ------------------------------------------------------------
// FACE — the engine's HD face (white eyes, big pupils, glints),
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

const Eye: React.FC<{ cx: number; spec: FaceSpec; lidFill: string; blink?: number }> = ({ cx, spec, lidFill, blink = 0 }) => {
  const clip = useUid('eyeclip')
  const cy = -100
  // # blink (idle life): a mostly-closed eye is a soft lid curve
  if (blink >= 0.9 && spec.eye !== 'happy') return <path d={`M${cx - 11} ${cy + 1} Q${cx} ${cy + 6} ${cx + 11} ${cy + 1}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  if (spec.eye === 'happy') return <path d={`M${cx - 9} ${cy + 2} Q${cx} ${cy - 9} ${cx + 9} ${cy + 2}`} stroke={LINE} strokeWidth={4} fill="none" strokeLinecap="round" />
  const rx = 11.5, ry = (spec.eye === 'wide' ? 15 : spec.eye === 'squint' ? 8 : 13) * (1 - blink * 0.8)
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

// # to + mix (living film): the face is part-way from `expression` to `to` — brows and gaze slide,
// # eyes and mouth cross-fade (their shapes can't be morphed point by point)
export const FaceLW: React.FC<{ expression: ExpressionId; look: LookLW; blink?: number; to?: ExpressionId; mix?: number }> = ({ expression, look, blink = 0, to, mix = 0 }) => {
  const a = FACES[expression], b = FACES[to ?? expression], m = to ? Math.max(0, Math.min(1, mix)) : 0
  const lerp = (x: number, y: number) => x + (y - x) * m
  const s: FaceSpec = { ...a, browL: [lerp(a.browL[0], b.browL[0]), lerp(a.browL[1], b.browL[1])], browR: [lerp(a.browR[0], b.browR[0]), lerp(a.browR[1], b.browR[1])], browArc: lerp(a.browArc, b.browArc), look: lerp(a.look, b.look) }
  const brow = (x1: number, x2: number, y: [number, number]) =>
    <path d={`M${x1} ${y[0]} Q${(x1 + x2) / 2} ${(y[0] + y[1]) / 2 + s.browArc} ${x2} ${y[1]}`} stroke={BROW} strokeWidth={look.fem ? 4.2 : 6} strokeLinecap="round" fill="none" />
  // # feminine face: two lash flicks at each eye's outer corner, tinted lips
  const lashes = (f: FaceSpec) => !look.fem || f.eye === 'happy' || blink >= 0.9 ? null : (
    <g stroke={LINE} strokeWidth={3} strokeLinecap="round" fill="none">
      <path d="M-26 -106 L-33 -112 M-23 -110 L-28 -117" /><path d="M36 -106 L43 -112 M33 -110 L38 -117" />
    </g>
  )
  const eyesMouth = (f: FaceSpec, o: number) => (
    <g opacity={o}>
      <Eye cx={-15} spec={{ ...f, look: s.look }} lidFill={look.skin[0]} blink={blink} /><Eye cx={25} spec={{ ...f, look: s.look }} lidFill={look.skin[0]} blink={blink} />
      {lashes(f)}
      {look.fem && f.eye === 'happy' && <g stroke={LINE} strokeWidth={2.6} strokeLinecap="round"><path d="M-24 -100 L-29 -104" /><path d="M34 -100 L39 -104" /></g>}
      <path d={f.mouth} stroke={look.lips ?? LINE} strokeWidth={look.lips ? 4.5 : 3.5} fill={f.mouthFill ?? 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
  return (
    <g data-expression={m >= 0.5 && to ? to : expression}>
      <g transform="translate(0 -3)">{brow(-28, -4, s.browL)}{brow(14, 38, s.browR)}</g>
      {/* # nose + soft cheek warmth */}
      <path d="M6 -90 Q12 -79 4 -75" stroke={look.skin[1]} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <ellipse cx={-26} cy={-74} rx={9} ry={5} fill="#D9765E" opacity={look.fem ? 0.4 : 0.22} /><ellipse cx={38} cy={-74} rx={9} ry={5} fill="#D9765E" opacity={look.fem ? 0.4 : 0.22} />
      {m < 1 && eyesMouth(a, 1 - m)}
      {m > 0 && eyesMouth(b, m)}
      {look.tired && <g stroke={look.skin[1]} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}>
        <path d="M-25 -84 Q-15 -79 -5 -84" /><path d="M15 -84 Q25 -79 35 -84" /></g>}
    </g>
  )
}

// ------------------------------------------------------------
// HEAD — the engine's head shape; LW hair styles
// ------------------------------------------------------------
const Head: React.FC<{ look: LookLW; expression: ExpressionId; tilt: number; u: (n: string) => string; blink?: number; blend?: { from: ExpressionId; mix: number } }> = ({ look, expression, tilt, u, blink, blend }) => {
  const [h, hl] = look.hairColor
  return (
    <g transform={`rotate(${tilt} 4 -60)`}>
      <defs>
        <linearGradient id={u('face')} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={look.skin[0]} /><stop offset="100%" stopColor={look.skin[1]} /></linearGradient>
      </defs>
      {/* # long hair: the back mass falls behind the face to the shoulders */}
      {look.hair === 'long' && <path d="M-58 -110 C-66 -170 -24 -196 8 -194 C46 -194 70 -168 64 -110 C66 -70 70 -40 62 -10 L-56 -10 C-64 -40 -62 -70 -58 -110 Z" fill={h} />}
      <ellipse cx={-47} cy={-96} rx={9} ry={14} fill={look.skin[1]} /><ellipse cx={55} cy={-96} rx={9} ry={14} fill={look.skin[1]} />
      <path d="M-46 -104 C-46 -150 -14 -170 8 -168 C42 -166 56 -136 54 -104 C54 -72 44 -50 26 -40 C14 -33 -4 -33 -16 -40 C-34 -50 -46 -74 -46 -104 Z" fill={`url(#${u('face')})`} />
      <path d="M-44 -116 C-46 -80 -36 -52 -16 -40" stroke={look.rim} strokeWidth={3} fill="none" opacity={0.6} />
      {/* # stubble shadow on the struggling version */}
      {look.tired && <path d="M-36 -62 C-28 -44 -8 -36 8 -36 C24 -36 40 -46 46 -62 C38 -52 22 -46 8 -46 C-8 -46 -26 -50 -36 -62 Z" fill={look.skin[1]} opacity={0.55} />}
      {/* # Hair — short textured crop with faded sides (LW), tidy side part (rich), or pushed every way (struggling) */}
      {look.hair === 'long' && <g>
        {/* # a side-swept fringe and two locks framing the face */}
        <path d="M-48 -112 C-54 -160 -20 -188 10 -188 C44 -188 64 -160 58 -112 C50 -146 26 -156 -2 -150 C-22 -146 -38 -132 -48 -112 Z" fill={h} />
        <path d="M-50 -116 C-56 -80 -54 -50 -46 -24 L-38 -24 C-44 -56 -44 -90 -40 -118 Z M58 -116 C64 -80 62 -50 54 -24 L46 -24 C52 -56 52 -90 48 -118 Z" fill={h} />
        <path d="M-20 -170 C0 -180 26 -178 44 -164" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>}
      {/* # WAVES — side part (forehead shows), volume on the crown, a curtain outside the left cheek,
          and a long lock falling in front over the right shoulder; the rest flows down the back (HairBack) */}
      {look.hair === 'waves' && <g>
        <path d="M-50 -108 C-62 -178 -8 -202 16 -198 C56 -196 76 -166 64 -108 C58 -132 46 -148 28 -152 C10 -155 -2 -150 -12 -164 C-22 -146 -40 -134 -50 -108 Z" fill={h} />
        <path d="M-50 -112 C-66 -70 -64 -36 -72 2 C-74 22 -66 36 -56 44 C-54 22 -56 -20 -45 -84 Z" fill={h} />
        <path d="M58 -114 C74 -72 72 -30 76 10 C80 42 70 66 82 90 C64 84 56 62 58 32 C58 2 56 -60 50 -102 Z" fill={h} />
        <path d="M-8 -188 C22 -194 48 -182 58 -158 M-30 -170 C-40 -150 -48 -130 -52 -110 M68 -60 C72 -24 70 8 74 40" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.75} />
        <path d="M-60 -40 C-62 -10 -64 14 -60 30" stroke={hl} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.5} />
      </g>}
      {/* # BUN — hair smoothed back from a soft hairline into a round top bun */}
      {look.hair === 'bun' && <g>
        <circle cx={10} cy={-196} r={28} fill={h} />
        <path d="M-8 -210 C4 -222 26 -220 32 -204" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-48 -104 C-58 -168 -16 -186 10 -186 C44 -186 66 -164 58 -104 C54 -126 42 -146 22 -150 C2 -152 -12 -146 -24 -140 C-36 -132 -44 -120 -48 -104 Z" fill={h} />
        <path d="M-30 -160 C-10 -178 30 -180 50 -158" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
        <path d="M-46 -112 C-50 -96 -48 -84 -44 -76" stroke={h} strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>}
      {/* # PONYTAIL — swept up from a soft hairline, the tail swings behind (HairBack) */}
      {look.hair === 'ponytail' && <g>
        <path d="M-48 -104 C-58 -170 -14 -190 12 -190 C46 -190 68 -166 58 -104 C54 -128 40 -148 18 -152 C-2 -154 -18 -144 -28 -136 C-38 -128 -44 -118 -48 -104 Z" fill={h} />
        <path d="M-34 -188 C-46 -196 -54 -186 -48 -176 C-40 -174 -34 -180 -34 -188 Z" fill={hl} />
        <path d="M-24 -170 C-4 -184 30 -184 50 -162" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>}
      {look.hair !== 'neat' && look.hair !== 'long' && look.hair !== 'waves' && look.hair !== 'bun' && look.hair !== 'ponytail' && <g>
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
      {blend
        ? <FaceLW expression={blend.from} to={expression} mix={blend.mix} look={look} blink={blink} />
        : <FaceLW expression={expression} look={look} blink={blink} />}
      {look.glasses && <g stroke={look.glasses} strokeWidth={4} fill="#FFFFFF" fillOpacity={0.12}>
        <circle cx={-15} cy={-100} r={18} /><circle cx={25} cy={-100} r={18} /><path d="M3 -102 Q5 -106 7 -102" fill="none" /><path d="M-33 -102 L-46 -106" fill="none" /></g>}
    </g>
  )
}

// # the part of long hair that falls BEHIND the shoulders (drawn before the torso, same transform as the head)
const HairBack: React.FC<{ look: LookLW; tilt: number }> = ({ look, tilt }) => {
  const [h, hl] = look.hairColor
  if (look.hair === 'waves') return (
    <g transform={`rotate(${tilt} 4 -60)`}>
      <path d="M-52 -118 C-70 -192 82 -202 66 -118 C76 -60 72 -10 86 40 C92 72 74 92 62 104 C44 96 22 106 2 100 C-20 106 -48 96 -64 104 C-84 84 -78 52 -72 30 C-66 -20 -64 -70 -52 -118 Z" fill={h} />
      <path d="M-40 20 C-44 50 -36 76 -30 96 M30 30 C34 60 28 80 24 98" stroke={hl} strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.45} />
    </g>
  )
  if (look.hair === 'ponytail') return (
    <g transform={`rotate(${tilt} 4 -60)`}>
      <path d="M-34 -184 C-96 -176 -108 -84 -86 -6 C-80 16 -62 8 -64 -14 C-74 -80 -66 -140 -26 -170 Z" fill={h} />
      <path d="M-70 -150 C-88 -110 -90 -60 -80 -20" stroke={hl} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.6} />
    </g>
  )
  return null
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
const Arm: React.FC<{ a: ArmPose; side: 1 | -1; look: LookLW; S: Skeleton }> = ({ a, side, look, S }) => {
  const L1 = S.upperArm * a.up, L2 = S.foreArm * a.fo
  const k = look.build === 'fit' ? 1.16 : 1
  const base = side === 1 ? look.cloth[2] : look.cloth[1]
  const lit = side === 1 ? look.cloth[1] : look.cloth[0]
  const skinA = side === 1 ? look.skin[1] : look.skin[0]
  const bare = look.top === 'tee' || look.top === 'dress'
  // # women's arms are a touch slimmer; a dress has a small puff sleeve
  const w = look.fem ? 0.84 : 1
  const sleeve = look.top === 'dress' ? 0.3 : 0.42
  return (
    <g transform={`rotate(${a.sh})`}>
      {bare
        ? <g>
          <path d={capsule(L1, 50 * k * w, 40 * k * w)} fill={skinA} />
          {/* # bicep curve */}
          {!look.fem && <path d={`M${-side * 20 * k} ${L1 * 0.35} Q${-side * 28 * k} ${L1 * 0.62} ${-side * 18 * k} ${L1 * 0.9}`} stroke={look.rim} strokeWidth={3} fill="none" opacity={0.55} strokeLinecap="round" />}
          <path d={capsule(L1 * sleeve, 56 * k * (look.top === 'dress' ? 1.08 : w), 52 * k * (look.top === 'dress' ? 1.08 : w))} fill={base} />
          <rect x={-26 * k * w} y={L1 * sleeve - 2} width={52 * k * w} height={7} rx={3} fill={look.cloth[2]} opacity={0.8} />
        </g>
        : <g>
          <path d={capsule(L1, 52, 44)} fill={base} />
          <path d={`M${-side * 22} 10 L${-side * 18} ${Math.max(12, L1 - 4)}`} stroke={lit} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
          {look.tired && <path d={`M${-side * 4} ${L1 * 0.5} q${side * 8} 6 ${side * 16} 0`} stroke={look.cloth[2]} strokeWidth={3} fill="none" opacity={0.8} />}
        </g>}
      <g transform={`translate(0 ${L1}) rotate(${a.el})`}>
        {bare
          ? <path d={capsule(L2 + 4, 40 * k * w, 32 * k * w)} fill={skinA} />
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

const Leg: React.FC<{ g: LegPose; look: LookLW; side: 1 | -1; S: Skeleton }> = ({ g, look, side, S }) => {
  const L1 = S.thigh * g.up, L2 = S.shin * g.lo
  const fill = side === 1 ? look.pants[1] : look.pants[0]
  const shoe = look.shoes === 'sneaker'
    ? <g><path d={`M-26 ${L2 - 4} Q-6 ${L2 - 18} 30 ${L2 - 4} L36 ${L2 + 12} L-30 ${L2 + 12} Z`} fill="#F4F1EC" />
      <path d={`M-20 ${L2 - 2} Q4 ${L2 - 12} 26 ${L2 - 2}`} stroke={look.cloth[1]} strokeWidth={4} fill="none" />
      <rect x={-31} y={L2 + 10} width={68} height={7} rx={3} fill="#CFC8BE" /></g>
    : look.shoes === 'heel'
      // # a pointed court shoe with a thin heel, in the outfit's colour
      ? <g><path d={`M-14 ${L2 - 6} Q6 ${L2 - 12} 30 ${L2 + 2} L34 ${L2 + 10} L-6 ${L2 + 10} Z`} fill={look.cloth[2]} />
        <path d={`M-16 ${L2 - 4} L-12 ${L2 + 14} L-6 ${L2 + 14} L-4 ${L2 + 4} Z`} fill={look.cloth[2]} /></g>
      : <path d={`M-24 ${L2 - 4} Q0 ${L2 - 14} 30 ${L2 - 2} L34 ${L2 + 12} L-28 ${L2 + 12} Z`} fill="#1A1210" />
  // # slimmer legs for women; bare legs under a dress are skin
  const fem = look.fem ? 0.8 : 1
  return (
    <g transform={`rotate(${g.hip})`}>
      <path d={capsule(L1 + 8, 60 * fem, 50 * fem)} fill={fill} />
      <g transform={`translate(0 ${L1}) rotate(${g.knee})`}>
        <path d={capsule(L2, 50 * fem, (look.pantsCuff ? 38 : 44) * fem)} fill={fill} />
        {/* # trouser crease (inside the shin only, so a bent knee never shows a stray line) */}
        {look.top !== 'dress' && <path d={`M${side * 8} 6 L${side * 6} ${L2 - 10}`} stroke={look.pants[side === 1 ? 0 : 1]} strokeWidth={2} opacity={0.5} />}
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
const Torso: React.FC<{ look: LookLW }> = ({ look }) => {
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
      {/* # pocket square (only with a tie colour); women get a fine gold necklace instead */}
      {look.tie && <path d="M-84 120 L-60 120 L-66 108 L-74 114 L-80 106 Z" fill={look.tie} />}
      {look.fem && <g><path d="M-30 6 Q4 44 38 6" stroke="#E3BE6A" strokeWidth={3} fill="none" /><circle cx={4} cy={30} r={6} fill="#E3BE6A" /></g>}
      <path d="M-86 124 L-56 124" stroke={sh} strokeWidth={4} strokeLinecap="round" />
      <circle cx={-15} cy={196} r={4} fill={sh} />
      <path d="M-110 70 C-112 120 -98 168 -88 200 C-90 236 -94 262 -96 284" stroke={look.rim} strokeWidth={4} fill="none" opacity={0.5} />
    </g>
  )
  // # DRESS — a fitted bodice with a soft sweetheart neckline, a tied sash, and a flared skirt that ends at the knee
  if (look.top === 'dress') return (
    <g>
      <path d="M-40 0 C-78 6 -100 24 -100 66 C-100 112 -80 150 -68 180 L72 180 C84 150 104 112 104 66 C100 24 80 6 44 0 Z" fill={base} />
      <path d="M22 2 C70 8 104 28 104 66 C104 112 84 150 72 180 L36 180 C42 120 36 60 22 2 Z" fill={sh} opacity={0.6} />
      {/* # neckline: skin shows from the neck to a soft curve */}
      <path d="M-36 0 C-30 40 -12 62 4 56 C20 62 40 40 44 0 Z" fill={look.skin[0]} />
      <path d="M-36 0 C-30 40 -12 62 4 56 C20 62 40 40 44 0" stroke={hi} strokeWidth={4} fill="none" />
      <path d="M-30 8 Q4 46 38 8" stroke="#E3BE6A" strokeWidth={3} fill="none" /><circle cx={4} cy={34} r={6} fill="#E3BE6A" />
      {/* # skirt: flares from the waist to the knee, with soft folds and a lighter hem */}
      <path d="M-70 176 L74 176 C108 250 132 330 144 404 Q4 436 -140 404 C-128 330 -104 250 -70 176 Z" fill={base} />
      <path d="M30 176 L74 176 C108 250 132 330 144 404 Q90 420 50 424 C56 340 46 250 30 176 Z" fill={sh} opacity={0.55} />
      <path d="M-30 190 Q-60 300 -74 418 M10 190 Q4 300 6 428 M44 190 Q70 300 92 420" stroke={sh} strokeWidth={4} fill="none" opacity={0.6} strokeLinecap="round" />
      <path d="M-140 404 Q4 436 144 404" stroke={hi} strokeWidth={6} fill="none" opacity={0.9} />
      <path d="M-100 66 C-100 112 -80 150 -68 180" stroke={hi} strokeWidth={5} fill="none" opacity={0.6} />
      {/* # sash with a bow at the side */}
      <rect x={-72} y={166} width={148} height={20} rx={8} fill={look.inner} />
      <path d="M50 176 L82 158 L84 194 Z M50 176 L84 182 L72 214 Z" fill={look.inner} />
      <circle cx={50} cy={176} r={8} fill={look.inner} stroke={sh} strokeWidth={2} />
    </g>
  )
  // # women's tee: fitted, crew neck, no hood or strings
  if (look.fem && look.top === 'tee') return (
    <g>
      <path d="M-40 0 C-80 6 -104 24 -106 68 C-106 116 -86 160 -80 190 C-84 230 -90 262 -94 286 L98 286 C94 262 88 230 84 190 C90 160 110 116 110 68 C106 24 84 6 44 0 Z" fill={base} />
      <path d="M20 2 C70 6 110 24 110 68 C110 116 90 160 84 190 C88 230 94 262 98 286 L34 286 C38 200 34 80 20 2 Z" fill={sh} opacity={0.7} />
      <path d="M-30 2 Q4 34 38 2" stroke={sh} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M-26 4 Q4 30 34 4 Z" fill={look.skin[0]} />
      <path d="M-106 68 C-106 116 -86 160 -80 190" stroke={hi} strokeWidth={5} fill="none" opacity={0.6} />
      <rect x={-96} y={268} width={196} height={18} rx={4} fill={look.pants[1]} />
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

// # The skeleton a look stands on (the fit build has wider shoulders, same height)
export const skeletonFor = (look: LookLW): Skeleton => (look.build === 'fit' ? LW_FIT_SKELETON : LW_SKELETON)

export const getLookLW = (id: string): LookLW => {
  const l = LOOKS_LW[id]
  if (!l) throw new Error(`unknown look "${id}" (known: ${Object.keys(LOOKS_LW).join(', ')})`)
  return l
}

// # life (optional): blink 0–1, breath −1..1, headTurn degrees — from art/motion/life idleLife()
// # blend (optional): the face is still melting in from this feeling
export const CharacterLW: React.FC<{ pose: Pose; look?: LookLW; frame?: number; breathe?: boolean; life?: { blink: number; breath: number; headTurn: number }; blend?: { from: ExpressionId; mix: number } }> = ({ pose: p, look = LOOKS_LW.hero, frame: f = 0, breathe = true, life, blend }) => {
  const base = useUid('lw')
  const u = (n: string) => `${base}-${n}`
  const S = skeletonFor(look)
  // # breathing moves the torso and arms a touch; the head sways on its own
  const b = life ? life.breath * 1.4 : breathe ? Math.sin(f / 18) * 0.8 : 0
  const tilt = (life ? life.headTurn : Math.sin(f / 40) * 1.5) + p.head
  return (
    <g transform={`translate(0 ${-footDrop(p, S) + p.bob})`}>
      <g transform={`translate(${S.hipL.x} ${S.hipL.y})`}><Leg g={{ ...p.ll, hip: p.ll.hip + 5 }} look={look} side={-1} S={S} /></g>
      <g transform={`translate(${S.hipR.x} ${S.hipR.y})`}><Leg g={{ ...p.rl, hip: p.rl.hip - 5 }} look={look} side={1} S={S} /></g>
      <g transform={`rotate(${p.lean} ${S.hipCentre.x} ${S.hipCentre.y})`}>
        <g transform="translate(0 26) scale(1.14) translate(0 -4)"><HairBack look={look} tilt={tilt} /></g>
        <g transform={`translate(0 ${b})`}><Torso look={look} /></g>
        <path d="M-16 -30 L18 -30 L20 14 L-16 14 Z" fill={look.skin[1]} />
        {look.top === 'hoodie' && <path d="M-56 -4 C-48 30 52 30 60 -4" stroke={look.cloth[0]} strokeWidth={8} fill="none" strokeLinecap="round" />}
        <g transform="translate(0 26) scale(1.14) translate(0 -4)"><Head look={look} expression={p.expression} tilt={tilt} u={u} blink={life?.blink} blend={blend} /></g>
        <g transform={`translate(0 ${b})`}>
          <g transform={`translate(${S.shoulderL.x} ${S.shoulderL.y})`}><Arm a={p.l} side={-1} look={look} S={S} /></g>
          <g transform={`translate(${S.shoulderR.x} ${S.shoulderR.y})`}><Arm a={p.r} side={1} look={look} S={S} /></g>
        </g>
      </g>
    </g>
  )
}

// # Just the head (expression strips, close-ups, covers)
export const HeadLW: React.FC<{ look: LookLW; expression: ExpressionId }> = ({ look, expression }) => {
  const base = useUid('lwh')
  return <Head look={look} expression={expression} tilt={0} u={(n) => `${base}-${n}`} />
}
