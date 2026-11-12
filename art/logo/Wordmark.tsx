// ============================================================
// WORDMARK — "Luminous Will" in burgundy (PLACEHOLDER until the
// owner approves a real LW logo), with an optional spaced
// tagline underneath (banner / brand card only; it is
// unreadable at small sizes).
// ============================================================

import React from 'react'
import { COLORS } from '../tokens'

export const TAGLINE = 'DISCIPLINE  /  COMEBACKS  /  MINDSET  /  PSYCHOLOGY'

export const Wordmark: React.FC<{ height: number; tagline?: boolean; opacity?: number; taglineOpacity?: number }> = ({
  height, tagline = false, opacity = 1, taglineOpacity = 1,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', opacity }}>
    <div style={{ fontFamily: 'Bebas Neue', fontSize: height, lineHeight: 1, letterSpacing: height * 0.03, color: COLORS.LW.burgundy }}>Luminous Will</div>
    {tagline && (
      <div style={{ marginTop: height * 0.32, fontFamily: 'Inter', fontWeight: 600, fontSize: height * 0.17,
        letterSpacing: height * 0.045, color: COLORS.LW.ink, opacity: taglineOpacity, whiteSpace: 'pre' }}>{TAGLINE}</div>
    )}
  </div>
)
