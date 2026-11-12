// ============================================================
// KIT — long video "Nvidia: The Full Story" (1920×1080), drawn fresh for this video (r82/r83).
// Art direction: THE PIXEL WORKSHOP. A warm paper world (cream main, r57) where everything is built from little
// square dots: screens are mosaics, money is a glass JAR that rides through the whole story (the viewer's $1,000),
// chips glow lime, and the "thousands of tiny workers" are small painters on a grid. Settings change by chapter:
// a 1990s diner booth, a cramped startup office, a mosaic wall, a night trading floor, a Toronto lab, a server hall,
// a harbour with a chip factory, a money workbench, a long road into the future. Depth: far wall, mid objects with
// soft shadows, near floor; light from top-left; paper grain + vignette. Only engine helpers are shared.
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, on, span } from '../kit'

export const G = 900 // floor line
export const BB = (size: number, ls = 1.5): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: ls })
export const IN = (size: number, w = 700): React.CSSProperties => ({ font: `${w} ${size}px Inter` })
export const X = {
  ink: '#22262E', ink2: '#4A5262', inkL: '#8E96A6',
  paper: '#F6F0E2', paperL: '#FFFBF2', paperD: '#E7DCC6', paperDD: '#CDBE9F',
  lime: '#8CC63F', limeD: '#5E8F22', limeL: '#D6EDB4', glow: '#C8F07A',
  char: '#2B3038', charL: '#3E4652', charD: '#1C2026',
  coral: '#E8664F', coralD: '#B2432F', coralL: '#F8C9BC',
  sky: '#7FB8DE', skyD: '#3F7FAE', skyL: '#D5E8F4',
  butter: '#F4CF5D', butterD: '#C99A26', butterL: '#FBEBB5',
  teal: '#2F9C94', tealD: '#1E6C66', tealL: '#C3E6E1',
  plum: '#7A5C99', red: '#D6453A', green: '#3E9B5F', white: '#FFFFFF', glass: '#E9F4F2',
}
export const cues = <T extends Record<string, string>>(c: (k: string) => number, K: T) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }
// # scenes dip: the old one is gone by b, the next starts at b — never two pictures at once
export const fadeIn = (f: number, a: number, d = 8) => (a <= 0 ? 1 : clamp01((f - a) / d))
export const scene = (f: number, a: number, b: number, d = 8) => (f >= b ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - (b - d)) / d)))
// # on between a and b (fade in over d, out before b)
export const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
export const money = (v: number) => v >= 1e6 ? `$${(v / 1e6).toFixed(v >= 1e7 ? 0 : 2).replace(/\.?0+$/, '')}M` : `$${Math.round(v).toLocaleString('en-US')}`

export const XDefs: React.FC<{ bg?: string }> = ({ bg = X.paper }) => (
  <>
    <rect width={1920} height={1080} fill={bg} />
    <defs>
      <linearGradient id="gx-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={X.paperL} /><stop offset="1" stopColor={X.paper} /></linearGradient>
      <linearGradient id="gx-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D9C9A6" /><stop offset="1" stopColor="#B9A57E" /></linearGradient>
      <linearGradient id="gx-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E2430" /><stop offset="1" stopColor="#323B4B" /></linearGradient>
      <linearGradient id="gx-chip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A5462" /><stop offset="1" stopColor="#23282F" /></linearGradient>
      <linearGradient id="gx-lime" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={X.glow} /><stop offset="1" stopColor={X.lime} /></linearGradient>
      <linearGradient id="gx-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0.6" /><stop offset="0.35" stopColor="#fff" stopOpacity="0.08" /><stop offset="1" stopColor="#fff" stopOpacity="0.35" /></linearGradient>
      <linearGradient id="gx-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9CCBE6" /><stop offset="1" stopColor="#F8E9CF" /></linearGradient>
      <linearGradient id="gx-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F2B88A" /><stop offset="1" stopColor="#FBE8CC" /></linearGradient>
      <linearGradient id="gx-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6FB0D6" /><stop offset="1" stopColor="#3F7FAE" /></linearGradient>
      <linearGradient id="gx-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBE39A" /><stop offset="1" stopColor={X.butterD} /></linearGradient>
      <radialGradient id="gx-halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={X.glow} stopOpacity="0.75" /><stop offset="1" stopColor={X.glow} stopOpacity="0" /></radialGradient>
      <radialGradient id="gx-vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#2A2010" stopOpacity="0.22" /></radialGradient>
      <filter id="gx-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" /><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0.07 0" /></filter>
    </defs>
  </>
)
export const XGrain: React.FC = () => <><rect width={1920} height={1080} filter="url(#gx-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#gx-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ backdrops (one per setting)
// # warm paper room with a faint dot-grid wall and a wooden floor
export const Room: React.FC<{ tint?: string }> = ({ tint = 'url(#gx-wall)' }) => (
  <g>
    <rect width={1920} height={G} fill={tint} />
    {Array.from({ length: 18 }, (_, i) => Array.from({ length: 8 }, (_, j) => <rect key={i + '-' + j} x={60 + i * 106} y={70 + j * 100} width={10} height={10} rx={2} fill={X.paperDD} opacity={0.35} />))}
    <rect y={G - 26} width={1920} height={26} fill={X.paperDD} />
    <rect y={G} width={1920} height={180} fill="url(#gx-floor)" />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={G} width={4} height={180} fill="#fff" opacity={0.15} />)}
  </g>
)
// # a 1990s roadside diner: checker floor, teal booth, a window with a palm-lined road at dusk
export const Diner: React.FC = () => (
  <g>
    <rect width={1920} height={G} fill="#F3E3C8" />
    <rect y={0} width={1920} height={60} fill={X.coral} /><rect y={60} width={1920} height={10} fill={X.coralD} />
    <g transform="translate(260 140)"><rect x={-14} y={-14} width={1428} height={428} rx={18} fill={X.char} />
      <rect width={1400} height={400} rx={10} fill="url(#gx-dusk)" />
      <rect y={300} width={1400} height={100} fill="#C9A77E" opacity={0.6} />
      {[180, 520, 900, 1240].map((x) => <g key={x}><rect x={x} y={150} width={10} height={170} fill="#6E5A44" /><path d={`M${x + 5} 150 q-60 -10 -90 30 M${x + 5} 150 q60 -10 90 30 M${x + 5} 150 q-20 -40 -70 -40 M${x + 5} 150 q20 -40 70 -40`} stroke="#5E7A4A" strokeWidth={12} fill="none" strokeLinecap="round" /></g>)}
      {[350, 700, 1050].map((x) => <rect key={x} x={x - 4} y={0} width={8} height={400} fill={X.char} />)}
    </g>
    <rect y={G - 30} width={1920} height={30} fill={X.tealD} />
    {Array.from({ length: 24 }, (_, i) => Array.from({ length: 4 }, (_, j) => <rect key={i + '-' + j} x={i * 80} y={G + j * 45} width={80} height={45} fill={(i + j) % 2 ? '#fff' : X.char} opacity={(i + j) % 2 ? 0.9 : 0.85} />))}
  </g>
)
// # a cramped startup office at night: one desk lamp, boxes, a wall calendar
export const Office: React.FC<{ dim?: number }> = ({ dim = 0 }) => (
  <g>
    <rect width={1920} height={G} fill="#E9DDC4" />
    <rect width={1920} height={G} fill={X.charD} opacity={0.25 * dim} />
    {[[1500, 160, 300, 220]].map(([x, y, w, h], k) => <g key={k}><rect x={x - 12} y={y - 12} width={w + 24} height={h + 24} rx={8} fill="#BFA882" /><rect x={x} y={y} width={w} height={h} fill="#2E3A52" />{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={x + 20 + (i * 53) % w} cy={y + 20 + (i * 37) % (h - 30)} r={2.5} fill="#fff" opacity={0.7} />)}</g>)}
    <rect y={G - 24} width={1920} height={24} fill="#BFA882" />
    <rect y={G} width={1920} height={180} fill="#9F8A66" />
  </g>
)
// # a night trading floor: deep slate, a ticker strip, faint candle grid
export const Floor: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="url(#gx-night)" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={0} y={160 + k * 90} width={1920} height={2} fill="#fff" opacity={0.05} />)}
    {Array.from({ length: 13 }, (_, k) => <rect key={k} x={80 + k * 150} y={0} width={2} height={G} fill="#fff" opacity={0.04} />)}
    <rect y={G} width={1920} height={180} fill="#171B23" />
    <rect y={G} width={1920} height={6} fill={X.lime} opacity={0.4} />
  </g>
)
// # a university lab: pale blue wall, a long bench, a pin board
export const Lab: React.FC = () => (
  <g>
    <rect width={1920} height={G} fill="#E3EEF2" />
    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={k * 290} y={0} width={6} height={G} fill="#fff" opacity={0.6} />)}
    <rect y={G - 150} width={1920} height={20} fill={X.char} /><rect y={G - 130} width={1920} height={130} fill="#C6D3D8" />
    <rect y={G} width={1920} height={180} fill="#9FB1B8" />
  </g>
)
// # a server hall: cool grey, rows of rack silhouettes fading to the back, a lit floor
export const Hall: React.FC<{ lit?: number }> = ({ lit = 1 }) => (
  <g>
    <rect width={1920} height={G} fill="#DCE3E6" />
    {[0, 1, 2].map((r) => <g key={r} opacity={0.18 + r * 0.1}>{Array.from({ length: 12 - r * 2 }, (_, k) => { const w = 90 + r * 20, gap = 1920 / (12 - r * 2); return <g key={k}><rect x={k * gap + 20} y={G - 300 - (2 - r) * 40} width={w} height={300 + (2 - r) * 40} rx={6} fill={X.char} />
      {Array.from({ length: 6 }, (_, j) => <rect key={j} x={k * gap + 34} y={G - 280 - (2 - r) * 40 + j * 48} width={w - 28} height={8} rx={4} fill={X.lime} opacity={0.5 * lit} />)}</g> })}</g>)}
    <rect y={G} width={1920} height={180} fill="#B5C0C5" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 160} y={G} width={158} height={180} fill="#fff" opacity={k % 2 ? 0.08 : 0} />)}
  </g>
)
// # a harbour: sky, sea, a far coast with a factory
export const Harbour: React.FC = () => (
  <g>
    <rect width={1920} height={620} fill="url(#gx-sky)" />
    <rect y={620} width={1920} height={460} fill="url(#gx-sea)" />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={(k * 233) % 1900} y={660 + (k % 4) * 80} width={120} height={6} rx={3} fill="#fff" opacity={0.25} />)}
  </g>
)
// # an open road at golden hour, receding to the horizon
export const Road: React.FC = () => (
  <g>
    <rect width={1920} height={560} fill="url(#gx-dusk)" />
    <path d="M0 560 Q480 470 960 540 T1920 520 L1920 600 L0 600 Z" fill="#D9B98E" />
    <rect y={560} width={1920} height={520} fill="#E7D2A8" />
    <path d="M880 560 L1040 560 L1500 1080 L420 1080 Z" fill="#6B6A6E" />
    {Array.from({ length: 6 }, (_, k) => { const t = k / 6, y = 570 + t * t * 510, h = 10 + t * 50; return <rect key={k} x={958 - 2 - t * 8} y={y} width={4 + t * 16} height={h} fill={X.butter} /> })}
  </g>
)

// ------------------------------------------------------------ the through-line object: the viewer's money jar
// # a glass jar of coins; fill 0..1; label on a paper tag tied to its neck
export const Jar: React.FC<{ x: number; y: number; s?: number; fill: number; label?: string; o?: number; crack?: number; glow?: number }> = ({ x, y, s = 1, fill, label, o = 1, crack = 0, glow = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0.01 && <circle cx={0} cy={-150} r={260} fill="url(#gx-halo)" opacity={glow} />}
    <ellipse cx={0} cy={6} rx={140} ry={16} fill="#000" opacity={0.16} />
    <path d="M-120 -250 Q-130 -280 -95 -290 L95 -290 Q130 -280 120 -250 L120 -20 Q120 0 100 0 L-100 0 Q-120 0 -120 -20 Z" fill={X.glass} opacity={0.9} />
    {fill > 0.005 && <g>{Array.from({ length: Math.max(1, Math.round(fill * 12)) }, (_, k) => <g key={k}><ellipse cx={(k % 2 ? 18 : -18)} cy={-14 - k * 21} rx={92} ry={14} fill={X.butterD} /><ellipse cx={(k % 2 ? 18 : -18)} cy={-20 - k * 21} rx={92} ry={14} fill={X.butter} /></g>)}</g>}
    <path d="M-120 -250 Q-130 -280 -95 -290 L95 -290 Q130 -280 120 -250 L120 -20 Q120 0 100 0 L-100 0 Q-120 0 -120 -20 Z" fill="url(#gx-glass)" stroke="#B9CFCB" strokeWidth={5} />
    <rect x={-104} y={-322} width={208} height={40} rx={10} fill={X.char} />
    {crack > 0.01 && <path d={`M-40 -260 l30 ${50 * crack} l-24 ${40 * crack} l36 ${50 * crack}`} stroke={X.ink} strokeWidth={5} fill="none" opacity={crack} />}
    {label && <g transform="translate(150 -250) rotate(6)"><line x1={-50} y1={-40} x2={0} y2={-10} stroke={X.ink2} strokeWidth={3} /><rect x={-6} y={-36} width={Math.max(150, label.length * 30 + 40)} height={70} rx={10} fill={X.paperL} stroke={X.paperDD} strokeWidth={3} /><text x={-6 + Math.max(150, label.length * 30 + 40) / 2} y={14} textAnchor="middle" fill={X.ink} style={BB(54)}>{label}</text></g>}
  </g>
)
// # a share certificate (one share, or a stack)
export const Share: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; n?: number }> = ({ x, y, s = 1, r = 0, o = 1, n = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {Array.from({ length: Math.min(6, n) }, (_, k) => <g key={k} transform={`translate(${-k * 6} ${-k * 8})`}>
      <rect x={-110} y={-70} width={220} height={140} rx={8} fill="#FFF9E8" stroke={X.limeD} strokeWidth={5} />
      <rect x={-96} y={-56} width={192} height={112} rx={4} fill="none" stroke={X.lime} strokeWidth={2} />
      <text x={0} y={-14} textAnchor="middle" fill={X.limeD} style={BB(34, 4)}>SHARE</text>
      <circle cx={0} cy={28} r={18} fill={X.butter} stroke={X.butterD} strokeWidth={3} />
    </g>)}
  </g>
)
// ------------------------------------------------------------ chips and machines
// # a GPU chip seen from above: dark package, lime die, gold pins; `on` lights the die; `grid` draws its tiny cores
export const Chip: React.FC<{ x: number; y: number; s?: number; lit?: number; o?: number; label?: string; r?: number; grid?: number }> = ({ x, y, s = 1, lit = 1, o = 1, label, r = 0, grid = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {lit > 0.01 && <circle r={230} fill="url(#gx-halo)" opacity={0.7 * lit} />}
    <rect x={-150} y={-150} width={300} height={300} rx={20} fill="#000" opacity={0.18} transform="translate(10 14)" />
    {[0, 1, 2, 3].map((side) => <g key={side} transform={`rotate(${side * 90})`}>{Array.from({ length: 9 }, (_, k) => <rect key={k} x={-120 + k * 30} y={-172} width={14} height={26} rx={3} fill={X.butterD} />)}</g>)}
    <rect x={-150} y={-150} width={300} height={300} rx={20} fill="url(#gx-chip)" />
    <rect x={-95} y={-95} width={190} height={190} rx={10} fill={lit > 0.5 ? 'url(#gx-lime)' : '#5A6472'} />
    {grid > 0.01 && Array.from({ length: 64 }, (_, k) => <rect key={k} x={-86 + (k % 8) * 22} y={-86 + Math.floor(k / 8) * 22} width={16} height={16} rx={3} fill={X.limeD} opacity={grid * (0.35 + 0.5 * ((k * 7) % 5) / 5)} />)}
    {label && <text y={label.length > 6 ? 16 : 22} textAnchor="middle" fill={X.charD} style={BB(label.length > 8 ? 40 : 64, 3)}>{label}</text>}
  </g>
)
// # a graphics card (gaming card): long board, two fans, gold edge
export const Card: React.FC<{ x: number; y: number; s?: number; o?: number; spin?: number; r?: number; lit?: number }> = ({ x, y, s = 1, o = 1, spin = 0, r = 0, lit = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-250} y={-90} width={500} height={180} rx={18} fill="#000" opacity={0.18} transform="translate(10 12)" />
    <rect x={-250} y={-90} width={500} height={180} rx={18} fill={X.char} />
    <rect x={-250} y={60} width={500} height={30} fill={X.charL} />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={-220 + k * 22} y={90} width={14} height={20} fill={X.butterD} />)}
    {[-120, 120].map((cx) => <g key={cx} transform={`translate(${cx} -10)`}><circle r={68} fill={X.charD} stroke={X.charL} strokeWidth={6} />
      <g transform={`rotate(${spin * 360})`}>{[0, 1, 2, 3, 4].map((b) => <path key={b} d="M0 0 Q20 -30 6 -60 L-6 -60 Q4 -30 0 0" fill="#5D6675" transform={`rotate(${b * 72})`} />)}</g><circle r={14} fill={X.lime} opacity={0.5 + 0.5 * lit} /></g>)}
    <rect x={-240} y={-86} width={480} height={10} rx={5} fill={X.lime} opacity={0.4 + 0.6 * lit} />
  </g>
)
// # a server rack: tall cabinet of trays; `lit` counts how many tray lights are on (0..trays)
export const Rack: React.FC<{ x: number; y: number; s?: number; o?: number; trays?: number; lit?: number; glow?: number; f?: number }> = ({ x, y, s = 1, o = 1, trays = 9, lit = 9, glow = 0, f = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0.01 && <ellipse cx={0} cy={-300} rx={260} ry={360} fill="url(#gx-halo)" opacity={glow} />}
    <ellipse cx={0} cy={6} rx={170} ry={16} fill="#000" opacity={0.18} />
    <rect x={-150} y={-640} width={300} height={640} rx={14} fill={X.charD} />
    <rect x={-136} y={-626} width={272} height={612} rx={8} fill={X.char} />
    {Array.from({ length: trays }, (_, k) => { const ty = -606 + k * (590 / trays); const on1 = k < lit
      return <g key={k}><rect x={-124} y={ty} width={248} height={590 / trays - 10} rx={5} fill={X.charL} />
        {Array.from({ length: 8 }, (_, j) => <rect key={j} x={-112 + j * 30} y={ty + 10} width={18} height={590 / trays - 30} rx={3} fill={on1 ? X.lime : '#58616F'} opacity={on1 ? 0.55 + 0.45 * Math.abs(Math.sin(f / 9 + j + k)) : 1} />)}</g> })}
  </g>
)
// # a little screen made of square dots: `cols`×`rows` cells, `paint` 0..1 how many are coloured (left→right, top→bottom), `pic` picks the drawing
export const Mosaic: React.FC<{ x: number; y: number; w: number; h: number; cols: number; rows: number; paint: number; o?: number; pic?: 'sun' | 'storm' | 'atom' | 'scan' | 'cat'; frame?: boolean }> = ({ x, y, w, h, cols, rows, paint, o = 1, pic = 'sun', frame = true }) => {
  if (o <= 0.01) return null
  const cw = w / cols, ch = h / rows, n = Math.floor(paint * cols * rows + 0.001)
  const col = (i: number, j: number) => {
    const u = (i + 0.5) / cols, v = (j + 0.5) / rows
    if (pic === 'sun') { if ((u - 0.68) ** 2 + (v - 0.32) ** 2 < 0.02) return X.butter; if (v > 0.66) return v > 0.8 ? X.limeD : X.lime; return v < 0.33 ? X.skyD : X.sky }
    if (pic === 'storm') { const d = Math.hypot(u - 0.5, v - 0.5), a = Math.atan2(v - 0.5, u - 0.5); return Math.sin(a * 2 + d * 18) > 0.2 && d < 0.45 ? '#FFFFFF' : d < 0.45 ? X.sky : X.skyD }
    if (pic === 'atom') { const d = Math.hypot(u - 0.5, v - 0.5); return d < 0.08 ? X.coral : Math.abs(d - 0.28) < 0.04 || Math.abs(Math.hypot((u - 0.5) * 2, v - 0.5) - 0.3) < 0.03 ? X.butter : X.char }
    if (pic === 'scan') { const d = Math.hypot((u - 0.5) * 1.3, v - 0.45); return d < 0.3 ? (Math.abs(u - 0.5) < 0.04 ? '#fff' : '#9FB6C8') : '#1E2C3C' }
    const d = Math.hypot(u - 0.5, v - 0.58); const ear = (Math.abs(u - 0.32) < 0.08 || Math.abs(u - 0.68) < 0.08) && v > 0.18 && v < 0.36
    return ear || d < 0.3 ? (Math.abs(u - 0.4) < 0.04 && Math.abs(v - 0.52) < 0.04) || (Math.abs(u - 0.6) < 0.04 && Math.abs(v - 0.52) < 0.04) ? X.ink : X.butter : X.skyL
  }
  return (
    <g opacity={o}>
      {frame && <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} rx={18} fill={X.char} />}
      <rect x={x} y={y} width={w} height={h} fill="#3A4250" />
      {Array.from({ length: cols * rows }, (_, k) => { const i = k % cols, j = Math.floor(k / cols)
        return <rect key={k} x={x + i * cw + 1} y={y + j * ch + 1} width={cw - 2} height={ch - 2} fill={k < n ? col(i, j) : '#4A5361'} /> })}
    </g>
  )
}
// # a tiny painter (one of the "thousands of simple workers"): round body, cap, brush that dabs
export const Painter: React.FC<{ x: number; y: number; s?: number; f: number; seed?: number; color?: string; o?: number }> = ({ x, y, s = 1, f, seed = 0, color = X.lime, o = 1 }) => {
  if (o <= 0.01) return null
  const dab = Math.sin(f / 4 + seed * 1.7)
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={22} ry={6} fill="#000" opacity={0.15} />
    <path d="M-18 0 Q-20 -40 0 -42 Q20 -40 18 0 Z" fill={X.char} />
    <circle cx={0} cy={-54} r={15} fill="#F2C9A5" />
    <path d="M-16 -58 Q0 -78 16 -58 Z" fill={color} />
    <g transform={`rotate(${-30 + dab * 22} 10 -30)`}><rect x={8} y={-34} width={34} height={5} rx={2} fill="#8A6A44" /><rect x={40} y={-36} width={10} height={9} rx={2} fill={color} /></g>
  </g>
}
// # a smart worker (CPU core): bigger figure at a desk that handles one tile at a time
export const Desk: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-70} width={180} height={18} rx={6} fill="#8A6A44" /><rect x={-80} y={-52} width={12} height={52} fill="#6E5236" /><rect x={68} y={-52} width={12} height={52} fill="#6E5236" />
  </g>
)

// ------------------------------------------------------------ small objects
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string }> = ({ x, y, r = 40, o = 1, label = '$' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill="url(#gx-gold)" stroke={X.butterD} strokeWidth={r * 0.12} /><circle r={r * 0.7} fill="none" stroke={X.butterD} strokeWidth={r * 0.05} opacity={0.6} />
    <text y={r * 0.3} textAnchor="middle" fill={X.butterD} style={BB(r * (label.length > 3 ? 0.5 : label.length > 1 ? 0.7 : 0.9))}>{label}</text>
  </g>
)
export const Bills: React.FC<{ x: number; y: number; n: number; o?: number; s?: number }> = ({ x, y, n, o = 1, s = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${(k % 3 - 1) * 4} ${-k * 16})`}>
    <rect x={-110} y={-16} width={220} height={22} rx={4} fill="#2E7A4A" /><rect x={-110} y={-22} width={220} height={22} rx={4} fill="#7DBE8C" /><rect x={-36} y={-20} width={72} height={18} rx={9} fill="#5FA170" /></g>)}</g>
)
export const Cal: React.FC<{ x: number; y: number; top: string; big: string; o?: number; s?: number; color?: string; r?: number }> = ({ x, y, top, big, o = 1, s = 1, color = X.coral, r = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={16} fill="#000" opacity={0.12} transform="translate(8 10)" />
    <rect x={-150} y={-170} width={300} height={340} rx={16} fill="#fff" />
    <rect x={-150} y={-170} width={300} height={90} rx={16} fill={color} /><rect x={-150} y={-100} width={300} height={20} fill={color} />
    <text y={-108} textAnchor="middle" fill="#fff" style={BB(top.length > 9 ? 40 : 50, 4)}>{top}</text>
    <text y={90} textAnchor="middle" fill={X.ink} style={BB(big.length > 4 ? 100 : 150)}>{big}</text>
  </g>
)
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; bg?: string; ink?: string }> = ({ x, y, text, o = 1, size = 40, bg = X.ink, ink = '#fff' }) => {
  if (o <= 0.01) return null
  const w = text.length * size * 0.5 + size * 1.1
  return <g opacity={o}><rect x={x - w / 2} y={y - size * 0.82} width={w} height={size * 1.28} rx={size * 0.64} fill={bg} /><text x={x} y={y + size * 0.22} textAnchor="middle" fill={ink} style={BB(size, 2)}>{text}</text></g>
}
export const Big: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number; anchor?: 'start' | 'middle' | 'end' }> = ({ x, y, text, size = 90, color = X.ink, o = 1, anchor = 'middle' }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={BB(size, 2)}>{text}</text>
)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 100, p }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return <g strokeLinecap="round" stroke={X.coral} strokeWidth={r * 0.17}>
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} />
    {b > 0 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} />}
  </g>
}
export const Tick: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 50, p }) => p <= 0.01 ? null : (
  <g opacity={clamp01(p * 1.5)}><circle cx={x} cy={y} r={r} fill={X.green} /><path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} stroke="#fff" strokeWidth={r * 0.18} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number; dash?: boolean }> = ({ x1, y1, x2, y2, p = 1, color = X.ink, w = 12, dash }) => {
  if (p <= 0.01) return null
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1)
  return <g><line x1={x1} y1={y1} x2={x - Math.cos(a) * w * 1.6} y2={y - Math.sin(a) * w * 1.6} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? `${w * 2} ${w * 1.6}` : undefined} />
    <path d={`M${x} ${y} L${x - Math.cos(a - 0.5) * w * 3.4} ${y - Math.sin(a - 0.5) * w * 3.4} L${x - Math.cos(a + 0.5) * w * 3.4} ${y - Math.sin(a + 0.5) * w * 3.4} Z`} fill={color} /></g>
}
// # a price line drawn along points [x,y] up to p (0..1), with a dot at the tip
export const Line: React.FC<{ pts: [number, number][]; p: number; color?: string; w?: number }> = ({ pts, p, color = X.lime, w = 10 }) => {
  if (p <= 0.01) return null
  const n = (pts.length - 1) * clamp01(p), i = Math.floor(n), t = n - i
  const tip = i >= pts.length - 1 ? pts[pts.length - 1] : [lerp(pts[i][0], pts[i + 1][0], t), lerp(pts[i][1], pts[i + 1][1], t)]
  const d = 'M' + [...pts.slice(0, i + 1), tip].map((q) => q.join(' ')).join(' L')
  return <g><path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinejoin="round" strokeLinecap="round" /><circle cx={tip[0]} cy={tip[1]} r={w * 1.4} fill={color} stroke="#fff" strokeWidth={4} /></g>
}
// # a key-word underline (this video's own gap filler): a lime dot-bar that builds under the headline on a spoken word
export const Mark: React.FC<{ f: number; at: number[]; y?: number; w?: number }> = ({ f, at, y = 214, w = 420 }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12), n = 12, x0 = 960 - w / 2
  return <g opacity={o}>{Array.from({ length: n }, (_, k) => k / n < p ? <rect key={k} x={x0 + k * (w / n)} y={y - 6} width={w / n - 6} height={12} rx={3} fill={k % 3 === 2 ? X.butter : X.lime} /> : null)}</g>
}
