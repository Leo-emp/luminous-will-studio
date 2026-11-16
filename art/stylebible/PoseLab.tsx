// # POSE LAB — try candidate poses side by side (inputProps.poses = Pose objects, JSON); dev tool only
import React from 'react'
import { Actor } from '../rig/Actor'
import type { Pose } from '../rig/pose'
export const PoseLab: React.FC<{ poses: Pose[]; who?: string }> = ({ poses, who = 'p-fiance' }) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080"><rect width={1920} height={1080} fill="#EEE6DA" /><line x1={0} y1={900} x2={1920} y2={900} stroke="#999" strokeWidth={3} />
    {poses.map((p, i) => <g key={i}><Actor who={(p as Pose & { who?: string }).who ?? who} pose={p} x={200 + i * 380} y={900} scale={1} /><text x={200 + i * 380} y={980} textAnchor="middle" style={{ font: '700 40px sans-serif' }}>{i}</text></g>)}
  </svg>
)
