// ============================================================
// WORLD KIT — LW "illustrated scenes" style (owner 2026-11-16):
// every voiceover line is ACTED OUT in its own drawn scene — a real
// place, real people doing the thing the voice says, light and depth.
// The hero only appears when the line is about "you". Text is never
// the illustration (a caption or a sign on a prop is fine).
//
// This file holds the shared machinery:
//   • Reel   — cuts between scenes on cue frames, with a dissolve and
//              a slow camera move inside each scene (push in / pull out / drift)
//   • light  — soft shadows, glows, light beams, haze, vignette
//   • People — the rig, acting on beats (pose + face changes)
// Places live in places.tsx, props in props.tsx.
// Tall canvas 1080 × 1920. Captions sit in the band y 1290–1490, so faces
// should stay above ~1260 (wide shots) or the shot is a close-up.
// ============================================================
import React from 'react'
import { Actor } from '../rig/Actor'
import { cyclePose, getPose, mixPose, type ExpressionId, type PoseId } from '../rig/pose'
import { useUid } from '../uid'
import { easeInOut, easeOut, lerp, span, clamp01 } from '../diorama/kit'

export const W = 1080, H = 1920, CX = 540
// # the usual floor line for a wide shot: feet just above the caption band
export const FLOOR = 1250

// ------------------------------------------------------------ REEL: scenes cut on cue frames
// # a camera move inside one scene: zoom from s0 to s1 around the focus point (fx, fy), drifting by (dx, dy)
export type Cam = { fx?: number; fy?: number; s0?: number; s1?: number; dx?: number; dy?: number }
// # one cut: starts at frame `at`, draws with (local frame since the cut, absolute frame)
export type Cut = { at: number; cam?: Cam; draw: (lf: number, f: number) => React.ReactNode }
const XF = 9   // # dissolve length in frames

export const Reel: React.FC<{ f: number; cuts: Cut[]; end: number }> = ({ f, cuts, end }) => {
  const sorted = [...cuts].sort((a, b) => a.at - b.at)
  return (
    <g>
      {sorted.map((cut, i) => {
        const a = cut.at, b = sorted[i + 1]?.at ?? end
        // # a cut is on screen from its start until the next one has fully dissolved in
        if (f < a - 1 || f > b + XF) return null
        const o = i === 0 ? 1 : easeOut(span(f, a, a + XF))
        const c = cut.cam ?? {}
        const t = easeInOut(span(f, a, b + XF))
        const s = lerp(c.s0 ?? 1, c.s1 ?? 1.06, t)
        const fx = c.fx ?? CX, fy = c.fy ?? 900
        const tx = (c.dx ?? 0) * t, ty = (c.dy ?? 0) * t
        return (
          <g key={i} opacity={o}>
            <g transform={`translate(${fx + tx} ${fy + ty}) scale(${s}) translate(${-fx} ${-fy})`}>{cut.draw(f - a, f)}</g>
          </g>
        )
      })}
    </g>
  )
}

// ------------------------------------------------------------ people
// # a beat: from local frame `at`, hold this pose (and face)
export type Beat = [at: number, pose: string, expression?: ExpressionId]
// # loop: [poseA, poseB, period] plays a two-pose cycle (running, clapping, waving) instead of the beats
export const Person: React.FC<{ lf: number; f: number; who: string; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; seed?: number; o?: number; loop?: [string, string, number] }> = ({ lf, f, who, beats, x, y = FLOOR, s = 1, flip = false, seed = 3, o = 1, loop }) => {
  let i = 0
  for (let k = 0; k < beats.length; k++) if (lf >= beats[k][0]) i = k
  const cur = beats[i], prev = beats[Math.max(0, i - 1)]
  const t = i === 0 ? 1 : easeOut(span(lf, cur[0], cur[0] + 9))
  const pose = loop ? { ...cyclePose(f, loop[0] as PoseId, loop[1] as PoseId, loop[2]), expression: cur[2] ?? getPose(loop[0]).expression } : mixPose(getPose(prev[1]), getPose(cur[1]), t)
  const ex = cur[2] ?? getPose(cur[1]).expression
  const from = prev[2] ?? getPose(prev[1]).expression
  return (
    <g opacity={o}>
      <ContactShadow x={x} y={y} w={150 * s} />
      <Actor who={who} pose={pose} expression={ex} blend={t < 1 && from !== ex ? { from, mix: t } : undefined} x={x} y={y} scale={s} frame={f} flip={flip} life={seed} />
    </g>
  )
}

// ------------------------------------------------------------ light + depth
// # a soft oval shadow on the floor under a person or object
export const ContactShadow: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.28 }) => {
  const id = useUid('cs')
  return (
    <g>
      <defs><radialGradient id={id}><stop offset="0%" stopColor="#140A10" stopOpacity={o} /><stop offset="100%" stopColor="#140A10" stopOpacity={0} /></radialGradient></defs>
      <ellipse cx={x} cy={y + 4} rx={w} ry={w * 0.16} fill={`url(#${id})`} />
    </g>
  )
}
// # a round glow (lamps, phones, the sun)
export const Glow: React.FC<{ x: number; y: number; r: number; color: string; o?: number }> = ({ x, y, r, color, o = 0.6 }) => {
  const id = useUid('gl')
  if (o <= 0.001) return null
  return (
    <g>
      <defs><radialGradient id={id}><stop offset="0%" stopColor={color} stopOpacity={o} /><stop offset="45%" stopColor={color} stopOpacity={o * 0.35} /><stop offset="100%" stopColor={color} stopOpacity={0} /></radialGradient></defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  )
}
// # a light beam from a window: a soft quad that fades along its length
export const Beam: React.FC<{ pts: [number, number][]; color?: string; o?: number }> = ({ pts, color = '#FFF1D6', o = 0.22 }) => {
  const id = useUid('bm')
  const [a, , , d] = pts
  return (
    <g style={{ mixBlendMode: 'screen' }}>
      <defs><linearGradient id={id} gradientUnits="userSpaceOnUse" x1={a[0]} y1={a[1]} x2={d[0]} y2={d[1] + 400}><stop offset="0%" stopColor={color} stopOpacity={o} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <path d={`M${pts.map((p) => p.join(' ')).join(' L')} Z`} fill={`url(#${id})`} />
    </g>
  )
}
// # a vertical gradient fill for a rect (sky, wall, floor)
export const Grad: React.FC<{ x?: number; y?: number; w?: number; h?: number; top: string; bottom: string; mid?: string; rx?: number }> = ({ x = 0, y = 0, w = W, h = H, top, bottom, mid, rx }) => {
  const id = useUid('gr')
  return (
    <g>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={top} />{mid && <stop offset="55%" stopColor={mid} />}<stop offset="100%" stopColor={bottom} /></linearGradient></defs>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${id})`} />
    </g>
  )
}
// # the frame's edge darkening; `warm` tints it
export const Vignette: React.FC<{ o?: number; color?: string }> = ({ o = 0.35, color = '#120812' }) => {
  const id = useUid('vg')
  return (
    <g pointerEvents="none">
      <defs><radialGradient id={id} cx="0.5" cy="0.42" r="0.78"><stop offset="55%" stopColor={color} stopOpacity={0} /><stop offset="100%" stopColor={color} stopOpacity={o} /></radialGradient></defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
    </g>
  )
}
// # an even colour wash over everything (time of day, mood)
export const Wash: React.FC<{ color: string; o: number; blend?: 'multiply' | 'screen' | 'soft-light' | 'normal' }> = ({ color, o, blend = 'multiply' }) =>
  o <= 0.001 ? null : <rect width={W} height={H} fill={color} opacity={o} style={{ mixBlendMode: blend }} pointerEvents="none" />
// # floating dust / bokeh in the light
export const Motes: React.FC<{ f: number; n?: number; x0?: number; x1?: number; y0?: number; y1?: number; color?: string; o?: number; r?: number; seed?: number }> = ({ f, n = 14, x0 = 0, x1 = W, y0 = 200, y1 = 1300, color = '#FFF3D6', o = 0.5, r = 6, seed = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, k) => {
      const a = rnd(seed * 31 + k), b = rnd(seed * 17 + k * 3), c = rnd(seed * 7 + k * 11)
      const x = lerp(x0, x1, a) + Math.sin(f / 40 + k) * 14
      const y = lerp(y1, y0, (b + f / (500 + c * 300)) % 1)
      return <circle key={k} cx={x} cy={y} r={r * (0.4 + c)} fill={color} opacity={o * (0.3 + 0.7 * Math.abs(Math.sin(f / 30 + k)))} />
    })}
  </g>
)

// ------------------------------------------------------------ small helpers
export const rnd = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
export const on = (lf: number, a: number, d = 12) => easeOut(span(lf, a, a + d))
export const off = (lf: number, a: number, d = 10) => 1 - easeOut(span(lf, a, a + d))
// # a little overshoot "pop" for a prop appearing
export const pop = (lf: number, a: number, d = 12) => { const x = clamp01((lf - a) / d), c = 1.4; return x <= 0 ? 0 : 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
export { lerp, span, easeOut, easeInOut, clamp01 }
