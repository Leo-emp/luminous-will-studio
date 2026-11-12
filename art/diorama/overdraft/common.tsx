// # shared bits for the overdraft Short's scenes: the headline slot (auto-sized to fit x 80–920) and cue helpers
import React from 'react'
import { Label } from '../charts'
import { easeOut, on, span } from '../kit'
import { CX, INK } from './kit'

export type Head = [at: number, text: string, color?: string]
// # one headline at a time at y 330, each from its cue until the next one; size shrinks so it always fits the frame
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number; color?: string }> = ({ f, lines: raw, until = 9e9, y = 330, color = INK }) => {
  const lines = [...raw].sort((p, q) => p[0] - q[0])
  return (
    <g>{lines.map(([a, text, col], k) => {
      const b = k + 1 < lines.length ? lines[k + 1][0] : until
      const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
      const size = Math.min(104, Math.floor(840 / (text.length * 0.44)))
      return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size} font="Bebas Neue" color={col ?? color} o={o} /></g> : null
    })}</g>
  )
}
