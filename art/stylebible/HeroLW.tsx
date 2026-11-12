// ============================================================
// HERO LW — style-bible pages for the owner-approved Luminous
// Will hero (2026-11-13): the four versions side by side, and the
// six approved expressions. Same layout as the approved renders
// in docs/lw-illustrated/approved/.
// ============================================================
import React from 'react'
import { AbsoluteFill } from 'remotion'
import { CharacterLW, HeadLW, LOOKS_LW } from '../rig/lw/CharacterLW'
import { getPose, type ExpressionId, type Pose } from '../rig/pose'
import { COLORS } from '../tokens'

const INK = COLORS.LW.ink, BURG = COLORS.LW.burgundy
const pose = (id: string, expression?: ExpressionId): Pose => ({ ...getPose(id), ...(expression ? { expression } : {}) })

// # Cream pill label with a title and a small line underneath
const Pill: React.FC<{ x: number; y: number; title: string; sub: string }> = ({ x, y, title, sub }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-34} width={340} height={68} rx={34} fill="#FFF9F1" filter="url(#hl-shadow)" />
    <text y={-2} textAnchor="middle" fontFamily="Bebas Neue" fontSize={38} fill={INK} letterSpacing={2}>{title}</text>
    <text y={24} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={17} fill="#8A6A62">{sub}</text>
  </g>
)

// # Warm cream backdrop with a soft glow and a floor band
const Backdrop: React.FC = () => (
  <>
    <defs>
      <linearGradient id="hl-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.LW.cream} /><stop offset="100%" stopColor="#EFD9C8" /></linearGradient>
      <radialGradient id="hl-glow" cx="0.5" cy="0.35" r="0.6"><stop offset="0%" stopColor="#FFF6EA" /><stop offset="100%" stopColor="#FFF6EA" stopOpacity={0} /></radialGradient>
      <filter id="hl-shadow" x="-20%" y="-40%" width="140%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={BURG} floodOpacity="0.14" /></filter>
    </defs>
    <rect width={1920} height={1080} fill="url(#hl-bg)" />
    <rect width={1920} height={1080} fill="url(#hl-glow)" />
    <rect y={990} width={1920} height={90} fill="#E2C4B0" />
  </>
)

// # The four versions (approved layout: columns 250/730/1210/1690, scale 0.86, floor at y 1000)
const COLS: { x: number; look: string; pose: Pose; title: string; sub: string }[] = [
  { x: 250, look: 'hero', pose: pose('pockets', 'smiling'), title: 'ORDINARY', sub: 'default · most lines' },
  { x: 730, look: 'hero-struggling', pose: pose('slump', 'worried'), title: 'STRUGGLING', sub: '"tired, stuck, broke"' },
  { x: 1210, look: 'hero-fit', pose: pose('confident', 'smug'), title: 'FIT', sub: '"discipline built him"' },
  { x: 1690, look: 'hero-rich', pose: pose('present', 'smiling'), title: 'SUCCESSFUL', sub: '"years later, he made it"' },
]

export const HeroSheet: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Backdrop />
      <text x={960} y={92} textAnchor="middle" fontFamily="Bebas Neue" fontSize={76} fill={INK} letterSpacing={4}>LUMINOUS WILL · THE HERO</text>
      <text x={960} y={132} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={22} fill={BURG}>Same face, same hair shape, always a touch of burgundy. Clothes, posture and build change.</text>
      {COLS.map((c) => (
        <g key={c.look}>
          <ellipse cx={c.x} cy={1000} rx={150} ry={18} fill="#B98A78" opacity={0.35} />
          <g transform={`translate(${c.x} 1000) scale(0.86)`}><CharacterLW pose={c.pose} look={LOOKS_LW[c.look]} breathe={false} /></g>
          <Pill x={c.x} y={205} title={c.title} sub={c.sub} />
        </g>
      ))}
    </svg>
  </AbsoluteFill>
)

// # The six approved expressions (3 × 2 grid, heads at scale 2 inside cream discs)
const FACES: { e: ExpressionId; label: string }[] = [
  { e: 'neutral', label: 'CALM' }, { e: 'smiling', label: 'PROUD' }, { e: 'angry', label: 'DETERMINED' },
  { e: 'worried', label: 'STRUGGLING' }, { e: 'shocked', label: 'SHOCKED' }, { e: 'thinking', label: 'THINKING' },
]

export const HeroFaces: React.FC = () => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Backdrop />
      <text x={960} y={110} textAnchor="middle" fontFamily="Bebas Neue" fontSize={76} fill={INK} letterSpacing={4}>THE HERO · EXPRESSIONS</text>
      {FACES.map((x, i) => {
        const px = 330 + (i % 3) * 630, cy = i < 3 ? 470 : 900
        return (
          <g key={x.e}>
            <circle cx={px} cy={cy - 120} r={175} fill="#FFF9F1" filter="url(#hl-shadow)" />
            <g transform={`translate(${px - 9} ${cy + 100}) scale(2)`}><HeadLW look={LOOKS_LW.hero} expression={x.e} /></g>
            <text x={px} y={cy + 92} textAnchor="middle" fontFamily="Bebas Neue" fontSize={40} fill={INK} letterSpacing={2}>{x.label}</text>
          </g>
        )
      })}
    </svg>
  </AbsoluteFill>
)
