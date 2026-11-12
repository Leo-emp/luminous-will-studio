// # THROWAWAY SPIKE entry: Luminous Will hero sheet (4 versions) + expression strip
import React from 'react'
import { AbsoluteFill, Composition, registerRoot } from 'remotion'
import { loadBrandFonts } from '../../art/fonts'
import { getPose } from '../../art/rig/pose'
import type { ExpressionId, Pose } from '../../art/rig/pose'
import { LW_LOOKS, LWCharacter, LWHead } from './LWHero'

const INK = '#3A1622', BURG = '#7E1F35'
const pose = (id: string, expression?: ExpressionId): Pose => ({ ...getPose(id), ...(expression ? { expression } : {}) })

const Pill: React.FC<{ x: number; y: number; title: string; sub: string }> = ({ x, y, title, sub }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-34} width={340} height={68} rx={34} fill="#FFF9F1" filter="url(#shadow)" />
    <text y={-2} textAnchor="middle" fontFamily="Bebas Neue" fontSize={38} fill={INK} letterSpacing={2}>{title}</text>
    <text y={24} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={17} fill="#8A6A62">{sub}</text>
  </g>
)

const Backdrop: React.FC = () => (
  <>
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F7EDE2" /><stop offset="100%" stopColor="#EFD9C8" /></linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6"><stop offset="0%" stopColor="#FFF6EA" /><stop offset="100%" stopColor="#FFF6EA" stopOpacity={0} /></radialGradient>
      <filter id="shadow" x="-20%" y="-40%" width="140%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#7E1F35" floodOpacity="0.14" /></filter>
    </defs>
    <rect width={1920} height={1080} fill="url(#bg)" />
    <rect width={1920} height={1080} fill="url(#glow)" />
    <rect y={990} width={1920} height={90} fill="#E2C4B0" />
  </>
)

const Sheet: React.FC = () => {
  loadBrandFonts()
  const cols: { x: number; look: keyof typeof LW_LOOKS; pose: Pose; title: string; sub: string }[] = [
    { x: 250, look: 'ordinary', pose: pose('pockets', 'smiling'), title: 'ORDINARY', sub: 'default · most lines' },
    { x: 730, look: 'struggling', pose: pose('slump', 'worried'), title: 'STRUGGLING', sub: '"tired, stuck, broke"' },
    { x: 1210, look: 'fit', pose: pose('confident', 'smug'), title: 'FIT', sub: '"discipline built him"' },
    { x: 1690, look: 'rich', pose: pose('present', 'smiling'), title: 'SUCCESSFUL', sub: '"years later, he made it"' },
  ]
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <Backdrop />
        <text x={960} y={92} textAnchor="middle" fontFamily="Bebas Neue" fontSize={76} fill={INK} letterSpacing={4}>LUMINOUS WILL · THE HERO</text>
        <text x={960} y={132} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={22} fill={BURG}>Same face, same hair shape, always a touch of burgundy. Clothes, posture and build change.</text>
        {cols.map((c) => (
          <g key={c.look}>
            <ellipse cx={c.x} cy={1000} rx={150} ry={18} fill="#B98A78" opacity={0.35} />
            <g transform={`translate(${c.x} 1000) scale(0.86)`}><LWCharacter pose={c.pose} look={LW_LOOKS[c.look]} /></g>
            <Pill x={c.x} y={205} title={c.title} sub={c.sub} />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  )
}

const Faces: React.FC = () => {
  loadBrandFonts()
  const ex: { e: ExpressionId; label: string }[] = [
    { e: 'neutral', label: 'CALM' }, { e: 'smiling', label: 'PROUD' }, { e: 'angry', label: 'DETERMINED' },
    { e: 'worried', label: 'STRUGGLING' }, { e: 'shocked', label: 'SHOCKED' }, { e: 'thinking', label: 'THINKING' },
  ]
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <Backdrop />
        <text x={960} y={110} textAnchor="middle" fontFamily="Bebas Neue" fontSize={76} fill={INK} letterSpacing={4}>THE HERO · EXPRESSIONS</text>
        {ex.map((x, i) => {
          const cx = 210 + (i % 3) * 750 * 0.95 + (i % 3) * 0, cy = i < 3 ? 470 : 900
          const px = 330 + (i % 3) * 630
          return (
            <g key={x.e}>
              <circle cx={px} cy={cy - 120} r={175} fill="#FFF9F1" filter="url(#shadow)" />
              <g transform={`translate(${px - 9} ${cy + 100}) scale(2)`}><LWHead look={LW_LOOKS.ordinary} expression={x.e} /></g>
              <text x={px} y={cy + 92} textAnchor="middle" fontFamily="Bebas Neue" fontSize={40} fill={INK} letterSpacing={2}>{x.label}</text>
              {cx < 0 && null}
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}

const Root: React.FC = () => (
  <>
    <Composition id="LWHeroSheet" component={Sheet} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="LWHeroFaces" component={Faces} durationInFrames={1} fps={30} width={1920} height={1080} />
  </>
)

registerRoot(Root)
