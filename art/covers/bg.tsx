// ============================================================
// Plain cover background: a soft two-tone gradient + a floor band.
// Owner rule 2026-11-12: vary the background per video. Light tones
// (cream, beige, sand, peach, soft sky) by default; dark (navy, plum)
// only for negative topics (downfall, crash, shockwave).
// ============================================================
import React from 'react'

export const PlainBg: React.FC<{ id: string; top: string; bot: string; floor: string; G?: number }> = ({ id, top, bot, floor, G = 960 }) => (
  <g>
    <defs>
      {/* # the sky: light at the top, a touch warmer near the floor */}
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bot} />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={1920} height={1080} fill={`url(#${id}-sky)`} />
    {/* # the floor the objects stand on */}
    <rect x={0} y={G} width={1920} height={1080 - G} fill={floor} />
    <rect x={0} y={G} width={1920} height={8} fill="#000000" opacity={0.08} />
  </g>
)
