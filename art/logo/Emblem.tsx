// ============================================================
// LUMINOUS WILL EMBLEM — the ORIGINAL lion badge from the old formats
// (owner 2026-11-15: "use the same logo we used for the old formats").
// public/lw-logo.png is the round lion + black ring cut out of
// LuminousWill/assets/logo.png (copied, the old repo is untouched).
// Same props and the same 693 × 678 canvas as before, so every caller
// (episode corner, covers, thumbnails, LogoReveal) keeps working.
// `progress` (0..1 per part) lets LogoReveal animate it:
//   arms  = the badge fades in   · slash = it scales up to full size
//   bars  = a soft glow ring around it
// ============================================================

import React from 'react'
import { staticFile } from 'remotion'
import { COLORS } from '../tokens'
import { useUid } from '../uid'

export type EmblemProgress = { arms: number; slash: number; bars: number }
const DONE: EmblemProgress = { arms: 1, slash: 1, bars: 1 }

// # Badge centre and radius inside the 693 × 678 canvas
const CX = 346, CY = 339, R = 300

export const Emblem: React.FC<{ size: number; progress?: EmblemProgress; x?: number; y?: number }> = ({
  size, progress = DONE, x = 0, y = 0,
}) => {
  const clip = useUid('lwclip')
  const p = progress
  // # during the reveal the badge grows from 85 % to 100 %
  const k = 0.85 + 0.15 * p.slash
  return (
    <svg x={x} y={y} width={size} height={size * (678 / 693)} viewBox="0 0 693 678" overflow="visible">
      <defs>
        {/* # round clip so the PNG's edge pixels never show as a square */}
        <clipPath id={clip}><circle cx={CX} cy={CY} r={R} /></clipPath>
      </defs>
      {/* # soft cream glow ring behind the badge */}
      <circle cx={CX} cy={CY} r={R + 10} fill="none" stroke={COLORS.LW.cream} strokeWidth={14} opacity={0.6 * p.bars} />
      <g opacity={p.arms} transform={`translate(${CX} ${CY}) scale(${k}) translate(${-CX} ${-CY})`}>
        <circle cx={CX} cy={CY} r={R} fill="#FFFFFF" />
        <image href={staticFile('lw-logo.png')} x={CX - R} y={CY - R} width={R * 2} height={R * 2} clipPath={`url(#${clip})`} />
      </g>
    </svg>
  )
}
