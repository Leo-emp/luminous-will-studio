// ============================================================
// LUMINOUS WILL EMBLEM — PLACEHOLDER monogram until the owner
// approves a real LW logo: a burgundy disc with a soft cream
// rim ("arms"), the letters LW ("slash"), and a small rising
// light ray above them ("bars"). Same props and the same
// 693 × 678 canvas as the old emblem, so every caller (episode
// corner, covers, thumbnails, LogoReveal) keeps working.
// `progress` (0..1 per part) lets LogoReveal animate it.
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'
import { useUid } from '../uid'

export type EmblemProgress = { arms: number; slash: number; bars: number }
const DONE: EmblemProgress = { arms: 1, slash: 1, bars: 1 }

// # Disc centre and radius inside the 693 × 678 canvas
const CX = 346, CY = 339, R = 300

export const Emblem: React.FC<{ size: number; progress?: EmblemProgress; x?: number; y?: number }> = ({
  size, progress = DONE, x = 0, y = 0,
}) => {
  const disc = useUid('lwdisc')
  const p = progress
  const C = 2 * Math.PI * R
  return (
    <svg x={x} y={y} width={size} height={size * (678 / 693)} viewBox="0 0 693 678" overflow="visible">
      <defs>
        <linearGradient id={disc} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A63A50" /><stop offset="60%" stopColor={COLORS.LW.burgundy} /><stop offset="100%" stopColor="#5C1426" />
        </linearGradient>
      </defs>
      {/* # disc fades in, the cream rim draws around it */}
      <circle cx={CX} cy={CY} r={R} fill={`url(#${disc})`} opacity={p.arms} />
      <circle cx={CX} cy={CY} r={R - 14} fill="none" stroke={COLORS.LW.cream} strokeWidth={12} opacity={0.9}
        strokeDasharray={C} strokeDashoffset={C * (1 - p.arms)} transform={`rotate(-90 ${CX} ${CY})`} />
      {/* # the monogram */}
      <text x={CX} y={CY + 95} textAnchor="middle" fill={COLORS.LW.cream} opacity={p.slash}
        style={{ font: '400 300px "Bebas Neue"', letterSpacing: 8 }}>LW</text>
      {/* # a small rising ray of light: the "luminous" */}
      <path d={`M${CX - 70} ${CY - 120} L${CX} ${CY - 190} L${CX + 70} ${CY - 120}`} fill="none" stroke={COLORS.LW.cream}
        strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={p.bars} />
    </svg>
  )
}
