// ============================================================
// KIT — long video "Anthropic: The Full Story of the Company Behind Claude" (1920×1080), drawn fresh (r82/r83).
// Art direction: THE PAPER LAB. A warm paper-cut world: every object is cut from thick cream, terracotta, sage
// and gold card, with a soft paper shadow under each layer (depth), a fine paper grain and a warm vignette.
// Two moods: LIGHT = cream paper sky with layered paper hills and a paper city (the story, the product, the money);
// NIGHT = deep ink-navy card with paper stars (costs, losses, fights, risk). Claude is drawn as a glowing paper
// LANTERN (our own design, never a logo). Settings change by chapter: the old lab, the new office, the library,
// the rating room, the rulebook desk, the chip hall, the investors' table, the bank help desk, the coin towers,
// the $100 note, the boardroom, the courthouse, the Pentagon, the stock exchange.
// Only the engine (timing, Person rig, Headline, Mini) is shared with other videos.
// ============================================================
import React from 'react'
import { clamp01, easeOut, easeInOut, lerp, on, pop, rnd, span } from '../kit'

export const G = 905 // # ground line
export const K = {
  ink: '#2B2A3A', ink2: '#5B566B', inkL: '#9A93A6',
  paper: '#F8F0E2', paper2: '#EFE2CB', paper3: '#E2D0B0', paperL: '#FFFAF1',
  terra: '#D2693F', terraD: '#9E4626', terraL: '#F3BC9C',
  sage: '#86AE8F', sageD: '#557A62', sageL: '#D3E6D3',
  sky: '#B4D3E6', skyD: '#6E9DBE', skyL: '#E5F0F6',
  navy: '#25324C', navyD: '#18213A', navyL: '#3C4C6E',
  gold: '#E8B84B', goldD: '#AE8128', goldL: '#F8E2A6',
  plum: '#7D5C8F', plumL: '#CDB7DA',
  red: '#D2453B', redL: '#F4B3AC', green: '#3E9B63', greenL: '#BFE3CB',
  white: '#FFFFFF',
}
export const BB = (size: number, ls = 1.5): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: ls })
export const IN = (size: number, w = 700): React.CSSProperties => ({ font: `${w} ${size}px Inter` })

// ------------------------------------------------------------ timing helpers (scenes dip: old gone by b, next starts at b)
export const cues = <T extends Record<string, string>>(c: (k: string) => number, M: T) => Object.fromEntries(Object.entries(M).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }
export const fadeIn = (f: number, a: number, d = 8) => (a <= 0 ? 1 : clamp01((f - a) / d))
export const scene = (f: number, a: number, b: number, d = 8) => (f >= b ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - (b - d)) / d)))
export const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
export const grow = (f: number, a: number, d = 18) => easeInOut(span(f, a, a + d))
export { clamp01, easeOut, easeInOut, lerp, on, pop, rnd, span }

// ------------------------------------------------------------ paper shadow: every cut-out casts a soft offset shadow
export const Cut: React.FC<{ children: React.ReactNode; d?: number; o?: number }> = ({ children, d = 7, o = 0.16 }) => (
  <g><g transform={`translate(${d} ${d * 1.2})`} opacity={o} filter="url(#an-sh)">{children}</g>{children}</g>
)

// ------------------------------------------------------------ the two worlds
export const Defs: React.FC = () => (
  <defs>
    <filter id="an-sh" x="-10%" y="-10%" width="120%" height="130%"><feColorMatrix type="matrix" values="0 0 0 0 0.23  0 0 0 0 0.16  0 0 0 0 0.09  0 0 0 1 0" /><feGaussianBlur stdDeviation="4" /></filter>
    <filter id="an-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" /><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.17  0 0 0 0.075 0" /></filter>
    <radialGradient id="an-vig" cx="0.5" cy="0.45" r="0.78"><stop offset="0.62" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#3A2410" stopOpacity="0.22" /></radialGradient>
    <radialGradient id="an-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFE7A8" stopOpacity="0.95" /><stop offset="0.45" stopColor="#F6C66A" stopOpacity="0.45" /><stop offset="1" stopColor="#F6C66A" stopOpacity="0" /></radialGradient>
    <linearGradient id="an-skyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3E3C8" /><stop offset="1" stopColor="#FBF5EA" /></linearGradient>
    <linearGradient id="an-skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1C2640" /><stop offset="1" stopColor="#34446A" /></linearGradient>
    <linearGradient id="an-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E4CFA9" /><stop offset="1" stopColor="#CDB287" /></linearGradient>
    <linearGradient id="an-floorN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2A3654" /><stop offset="1" stopColor="#1A2238" /></linearGradient>
    <linearGradient id="an-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C98E5C" /><stop offset="1" stopColor="#9B653B" /></linearGradient>
    <linearGradient id="an-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F8E2A6" /><stop offset="1" stopColor="#C9952E" /></linearGradient>
    <linearGradient id="an-screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2D3B5C" /><stop offset="1" stopColor="#1F2942" /></linearGradient>
  </defs>
)
export const Grain: React.FC = () => <><rect width={1920} height={1080} filter="url(#an-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#an-vig)" pointerEvents="none" /></>

// # LIGHT: cream paper sky, two layers of torn-paper hills, drifting paper clouds, a paper floor
export const Day: React.FC<{ f: number; city?: boolean; hills?: boolean; tint?: string }> = ({ f, city = false, hills = true, tint }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#an-skyL)" />
    {tint && <rect width={1920} height={1080} fill={tint} opacity={0.25} />}
    <circle cx={1560} cy={210} r={92} fill={K.goldL} opacity={0.8} />
    {[[260, 190, 1], [980, 140, 0.8], [1700, 300, 0.9]].map(([x, y, s], k) => { const dx = ((f * (0.25 + k * 0.08) + x) % 2200) - 140
      return <g key={k} transform={`translate(${dx} ${y}) scale(${s})`} opacity={0.9}><Cut d={4} o={0.1}><path d="M-110 20 Q-100 -30 -40 -20 Q-20 -70 40 -40 Q100 -60 110 0 Q140 20 110 30 L-100 30 Z" fill={K.paperL} /></Cut></g> })}
    {hills && <>
      <path d="M0 640 Q200 540 420 600 Q640 660 860 570 Q1100 480 1340 580 Q1580 660 1920 560 L1920 1080 L0 1080 Z" fill={K.sageL} />
      <path d="M0 720 Q260 640 520 700 Q760 750 1000 680 Q1260 610 1520 690 Q1740 750 1920 680 L1920 1080 L0 1080 Z" fill="#BFD6BE" />
    </>}
    {city && <g opacity={0.85}>{Array.from({ length: 16 }, (_, k) => { const h = 120 + rnd(k + 3) * 220, w = 80 + rnd(k + 9) * 60, x = k * 125 - 20
      return <g key={k}><rect x={x} y={G - 60 - h} width={w} height={h} fill={k % 3 === 0 ? '#E8D6B8' : k % 3 === 1 ? '#DDE7E0' : '#EBD3C3'} />{Array.from({ length: Math.floor(h / 60) }, (_, j) => <rect key={j} x={x + 16} y={G - 40 - h + j * 60} width={w - 32} height={22} rx={4} fill="#fff" opacity={0.5} />)}</g> })}</g>}
    <rect y={G} width={1920} height={180} fill="url(#an-floor)" />
    <rect y={G} width={1920} height={8} fill="#fff" opacity={0.35} />
  </g>
)
// # NIGHT: deep ink card with paper stars and a low paper skyline
export const Night: React.FC<{ f: number; skyline?: boolean }> = ({ f, skyline = true }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#an-skyN)" />
    {Array.from({ length: 34 }, (_, k) => { const x = rnd(k) * 1920, y = rnd(k + 50) * 560, tw = 0.5 + 0.5 * Math.sin(f / 18 + k)
      return <path key={k} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill={K.goldL} opacity={0.3 + 0.5 * tw} /> })}
    {skyline && <path d="M0 760 L120 760 L120 700 L220 700 L220 740 L360 740 L360 660 L440 660 L440 730 L600 730 L600 690 L720 690 L720 750 L900 750 L900 680 L1000 680 L1000 740 L1180 740 L1180 650 L1260 650 L1260 720 L1420 720 L1420 700 L1560 700 L1560 750 L1720 750 L1720 690 L1920 690 L1920 1080 L0 1080 Z" fill="#2E3B5C" />}
    <rect y={G} width={1920} height={180} fill="url(#an-floorN)" />
  </g>
)
// # an interior: a paper wall with a skirting board, a window, and a wooden floor
export const Room: React.FC<{ wall?: string; dark?: boolean; window?: boolean }> = ({ wall = '#F3E6D0', dark = false, window: w = true }) => (
  <g>
    <rect width={1920} height={G} fill={dark ? '#2B3756' : wall} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 170 + 40} y={0} width={2} height={G} fill={dark ? '#fff' : '#B89A6E'} opacity={0.08} />)}
    {w && <g transform="translate(1500 180)"><rect x={-14} y={-14} width={328} height={288} rx={10} fill={dark ? '#1E2842' : '#D7BE97'} /><rect width={300} height={260} fill={dark ? '#3C4C6E' : '#CFE2EC'} /><rect x={145} width={10} height={260} fill={dark ? '#1E2842' : '#D7BE97'} /><rect y={125} width={300} height={10} fill={dark ? '#1E2842' : '#D7BE97'} /></g>}
    <rect y={G - 26} width={1920} height={26} fill={dark ? '#1E2842' : '#D2B88E'} />
    <rect y={G} width={1920} height={180} fill={dark ? '#1C2539' : 'url(#an-wood)'} />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={k * 230} y={G} width={3} height={180} fill="#000" opacity={0.08} />)}
  </g>
)

// ------------------------------------------------------------ CLAUDE: a glowing paper lantern (our own drawing)
// # glow 0..1, s scale; talk makes the inner flame flicker; size = model size (family)
export const Lantern: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; glow?: number; tint?: string }> = ({ x, y, s = 1, o = 1, f, glow = 1, tint = K.terra }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y + Math.sin(f / 22) * 6 * s}) scale(${s})`}>
    <circle r={230} fill="url(#an-glow)" opacity={0.35 + 0.55 * glow} />
    <rect x={-14} y={-196} width={28} height={36} rx={6} fill={K.ink} />
    <path d="M0 -196 Q-60 -250 0 -262 Q60 -250 0 -196" fill="none" stroke={K.ink} strokeWidth={8} />
    <Cut d={8}><path d="M-110 -160 Q-160 0 -110 160 L110 160 Q160 0 110 -160 Z" fill={tint} /></Cut>
    <path d="M-92 -160 Q-132 0 -92 160 L92 160 Q132 0 92 -160 Z" fill="#FFE2B0" opacity={0.55 + 0.4 * glow} />
    {[-60, 0, 60].map((d) => <path key={d} d={`M${d * 1.1} -160 Q${d * 1.6} 0 ${d * 1.1} 160`} stroke={tint} strokeWidth={6} fill="none" opacity={0.6} />)}
    <path d={`M0 ${70} Q-34 ${20 - 8 * Math.sin(f / 5)} 0 ${-50 - 10 * Math.sin(f / 4)} Q34 ${20 - 8 * Math.cos(f / 6)} 0 ${70}`} fill={K.gold} opacity={0.6 + 0.4 * glow} />
    <rect x={-120} y={150} width={240} height={30} rx={10} fill={K.ink} /><rect x={-120} y={-176} width={240} height={24} rx={10} fill={K.ink} />
  </g>
)
// # a speech bubble with short words (chat), attached to a point
export const Bubble: React.FC<{ x: number; y: number; w: number; text: string; o?: number; side?: 'l' | 'r'; fill?: string; color?: string; size?: number }> = ({ x, y, w, text, o = 1, side = 'l', fill = K.paperL, color = K.ink, size = 38 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.9 + 0.1 * o})`}>
    <Cut d={5}><g><rect x={-w / 2} y={-46} width={w} height={92} rx={30} fill={fill} />
      <path d={side === 'l' ? `M${-w / 2 + 40} 40 L${-w / 2 + 20} 78 L${-w / 2 + 80} 40 Z` : `M${w / 2 - 40} 40 L${w / 2 - 20} 78 L${w / 2 - 80} 40 Z`} fill={fill} /></g></Cut>
    <text x={0} y={size * 0.36} textAnchor="middle" fill={color} style={IN(size, 600)}>{text}</text>
  </g>
)
// # a label stuck to a part: a small paper tag (Bebas)
export const Tag: React.FC<{ x: number; y: number; text: string; size?: number; bg?: string; color?: string; o?: number; r?: number }> = ({ x, y, text, size = 48, bg = K.ink, color = K.white, o = 1, r = 0 }) => {
  if (o <= 0.01) return null
  const w = Math.max(80, text.length * size * 0.5 + 44)
  return <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${0.92 + 0.08 * o})`}><Cut d={4}><rect x={-w / 2} y={-size * 0.72} width={w} height={size * 1.3} rx={size * 0.3} fill={bg} /></Cut><text x={0} y={size * 0.33} textAnchor="middle" fill={color} style={BB(size)}>{text}</text></g>
}
// # a hand-drawn cross that grows on (r68: a comfortable, visible size)
export const Cross: React.FC<{ x: number; y: number; s?: number; p: number; color?: string }> = ({ x, y, s = 1, p, color = K.red }) => p <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, p * 2)}>
    <path d={`M-90 -90 L${-90 + 180 * clamp01(p * 2)} ${-90 + 180 * clamp01(p * 2)}`} stroke={color} strokeWidth={26} strokeLinecap="round" />
    <path d={`M90 -90 L${90 - 180 * clamp01(p * 2 - 1)} ${-90 + 180 * clamp01(p * 2 - 1)}`} stroke={color} strokeWidth={26} strokeLinecap="round" />
  </g>
)
export const Check: React.FC<{ x: number; y: number; s?: number; p: number; color?: string }> = ({ x, y, s = 1, p, color = K.green }) => p <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s * (0.8 + 0.2 * p)})`} opacity={Math.min(1, p * 2)}><circle r={70} fill={color} /><path d="M-34 0 L-8 26 L38 -26" stroke="#fff" strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)

// ------------------------------------------------------------ objects
// # a gold coin seen from the front (optionally with a short label)
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string; spin?: number }> = ({ x, y, r = 40, o = 1, label = '$', spin = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${Math.max(0.15, Math.abs(Math.cos(spin)))} 1)`}>
    <circle r={r} fill={K.goldD} transform={`translate(0 ${r * 0.12})`} /><circle r={r} fill="url(#an-gold)" /><circle r={r * 0.72} fill="none" stroke={K.goldD} strokeWidth={r * 0.08} />
    <text y={r * 0.33} textAnchor="middle" fill={K.goldD} style={BB(r * (label.length > 2 ? 0.6 : 0.95))}>{label}</text>
  </g>
)
// # a stack of coins (n coins high)
export const CoinStack: React.FC<{ x: number; y: number; n: number; r?: number; o?: number }> = ({ x, y, n, r = 46, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${x} ${y - k * r * 0.32})`}><ellipse rx={r} ry={r * 0.32} cy={r * 0.12} fill={K.goldD} /><ellipse rx={r} ry={r * 0.32} fill={k % 2 ? K.gold : '#F0C963'} /></g>)}</g>
)
// # a money bag with an amount on it
export const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, text = '$', color = K.sage }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={8}><path d="M-40 -230 L40 -230 L24 -190 Q150 -140 150 -40 Q150 0 0 0 Q-150 0 -150 -40 Q-150 -140 -24 -190 Z" fill={color} /></Cut>
    <path d="M-50 -200 Q0 -180 50 -200" stroke={K.sageD} strokeWidth={14} fill="none" />
    <text y={-62} textAnchor="middle" fill={K.white} style={BB(text.length > 5 ? 58 : 76)}>{text}</text>
  </g>
)
// # a paper banknote (with an amount), r rotation
export const Note: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string; w?: number }> = ({ x, y, s = 1, o = 1, r = 0, text = '$100', w = 420 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Cut d={6}><rect x={-w / 2} y={-100} width={w} height={200} rx={16} fill="#BFDDB9" /></Cut>
    <rect x={-w / 2 + 16} y={-84} width={w - 32} height={168} rx={10} fill="none" stroke={K.sageD} strokeWidth={5} />
    <circle cx={0} cy={0} r={58} fill="#A6CF9F" stroke={K.sageD} strokeWidth={4} />
    <text y={22} textAnchor="middle" fill={K.sageD} style={BB(64)}>$</text>
    <text x={-w / 2 + 34} y={-42} fill={K.sageD} style={BB(46)}>{text}</text><text x={w / 2 - 34} y={70} textAnchor="end" fill={K.sageD} style={BB(46)}>{text}</text>
  </g>
)
// # a share certificate (paper with a seal)
export const Share: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, text = 'SHARE', color = K.terra }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Cut d={6}><rect x={-120} y={-80} width={240} height={160} rx={10} fill={K.paperL} /></Cut>
    <rect x={-106} y={-66} width={212} height={132} rx={6} fill="none" stroke={color} strokeWidth={5} strokeDasharray="12 6" />
    <text y={-14} textAnchor="middle" fill={color} style={BB(44)}>{text}</text>
    <circle cx={64} cy={36} r={22} fill={K.gold} stroke={K.goldD} strokeWidth={4} />
    <rect x={-80} y={20} width={100} height={8} rx={4} fill={K.inkL} /><rect x={-80} y={38} width={70} height={8} rx={4} fill={K.inkL} />
  </g>
)
// # a book standing (spine label), or lying
export const Book: React.FC<{ x: number; y: number; w?: number; h?: number; color: string; o?: number; r?: number; mark?: boolean }> = ({ x, y, w = 60, h = 220, color, o = 1, r = 0, mark }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={6} fill={color} /><rect x={-w / 2 + 8} y={-h + 24} width={w - 16} height={10} rx={4} fill="#fff" opacity={0.6} /><rect x={-w / 2 + 8} y={-34} width={w - 16} height={10} rx={4} fill="#fff" opacity={0.5} />
    {mark && <g transform={`translate(0 ${-h / 2})`}><circle r={w * 0.32} fill={K.ink} /><circle cx={-w * 0.1} cy={-3} r={w * 0.07} fill="#fff" /><circle cx={w * 0.1} cy={-3} r={w * 0.07} fill="#fff" /><path d={`M${-w * 0.14} ${w * 0.14} L${w * 0.14} ${w * 0.14}`} stroke="#fff" strokeWidth={3} /></g>}
  </g>
)
// # a bookshelf full of books (fill 0..1 shows how many have arrived)
export const Shelf: React.FC<{ x: number; y: number; w: number; rows?: number; fill?: number; o?: number }> = ({ x, y, w, rows = 3, fill = 1, o = 1 }) => {
  if (o <= 0.01) return null
  const cols = Math.floor(w / 58), cs = [K.terra, K.sage, K.sky, K.gold, K.plum, K.navyL, K.terraL]
  return <g opacity={o}><Cut d={8}><rect x={x - 20} y={y - rows * 250 - 20} width={w + 40} height={rows * 250 + 40} rx={10} fill="#B98557" /></Cut>
    {Array.from({ length: rows }, (_, rr) => <g key={rr}><rect x={x} y={y - (rr + 1) * 250 + 10} width={w} height={240} fill="#8E5F37" />
      {Array.from({ length: cols }, (_, k) => { const i = rr * cols + k, sh = clamp01(fill * rows * cols - i); return sh > 0 && <Book key={k} x={x + 30 + k * 58} y={y - rr * 250 - 4} w={50} h={170 + rnd(i) * 50} color={cs[i % cs.length]} o={sh} /> })}
      <rect x={x} y={y - rr * 250 - 10} width={w} height={14} fill="#B98557" /></g>)}</g>
}
// # a laptop with a screen child
export const Laptop: React.FC<{ x: number; y: number; s?: number; o?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, children }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={8}><g><rect x={-260} y={-330} width={520} height={330} rx={20} fill={K.ink} /><path d="M-320 0 L320 0 L290 34 L-290 34 Z" fill="#A3A0AE" /></g></Cut>
    <rect x={-236} y={-306} width={472} height={282} rx={8} fill="url(#an-screen)" />
    <g transform="translate(0 -165)">{children}</g>
  </g>
)
// # a phone held up, screen child
export const PhoneBig: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, r = 0, children }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Cut d={8}><rect x={-190} y={-360} width={380} height={720} rx={50} fill={K.ink} /></Cut>
    <rect x={-170} y={-336} width={340} height={672} rx={34} fill={K.paperL} /><rect x={-50} y={-326} width={100} height={18} rx={9} fill={K.ink} />
    {children}
  </g>
)
// # a server rack with glowing chips (lit 0..1)
export const Rack: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; f: number; seed?: number }> = ({ x, y, s = 1, o = 1, lit = 1, f, seed = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={8}><rect x={-110} y={-520} width={220} height={520} rx={12} fill="#33405F" /></Cut>
    {Array.from({ length: 9 }, (_, k) => <g key={k}><rect x={-92} y={-500 + k * 54} width={184} height={42} rx={6} fill="#24304A" />
      {Array.from({ length: 6 }, (_, j) => { const b = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(f / 6 + k * 1.7 + j * 2.1 + seed)); return <circle key={j} cx={-70 + j * 18} cy={-479 + k * 54} r={5} fill={j % 3 === 0 ? K.gold : '#8FE0C0'} opacity={lit * b} /> })}
      <rect x={30} y={-490 + k * 54} width={52} height={22} rx={4} fill="#3D4D72" /></g>)}
  </g>
)
// # a computer chip (square with legs)
export const Chip: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 && <circle r={150} fill="url(#an-glow)" opacity={glow} />}
    {Array.from({ length: 6 }, (_, k) => <g key={k}><rect x={-62 + k * 24} y={-100} width={8} height={24} fill={K.goldD} /><rect x={-62 + k * 24} y={76} width={8} height={24} fill={K.goldD} /><rect x={-100} y={-62 + k * 24} width={24} height={8} fill={K.goldD} /><rect x={76} y={-62 + k * 24} width={24} height={8} fill={K.goldD} /></g>)}
    <Cut d={6}><rect x={-80} y={-80} width={160} height={160} rx={14} fill={K.navy} /></Cut>
    <rect x={-46} y={-46} width={92} height={92} rx={8} fill={K.navyL} stroke={K.gold} strokeWidth={4} />
  </g>
)
// # a paper office/lab building with a sign
export const Building: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number; o?: number; sign?: string; color?: string; roof?: string; door?: number; lit?: number }> = ({ x, y, w = 460, h = 420, s = 1, o = 1, sign, color = '#EADBC2', roof = K.terra, door = 0, lit = 0.6 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={10}><g><rect x={-w / 2} y={-h} width={w} height={h} fill={color} /><rect x={-w / 2 - 20} y={-h - 30} width={w + 40} height={36} rx={6} fill={roof} /></g></Cut>
    {Array.from({ length: Math.floor((h - 160) / 90) }, (_, r) => Array.from({ length: Math.floor(w / 110) }, (_, c) => <rect key={`${r}-${c}`} x={-w / 2 + 34 + c * 110} y={-h + 40 + r * 90} width={64} height={54} rx={6} fill="#FFF3D2" opacity={0.35 + lit * 0.65 * rnd(r * 7 + c)} />))}
    <rect x={-60} y={-150} width={120} height={150} rx={8} fill={K.navy} /><rect x={-60 + 120 * door * 0.0} y={-150} width={120 * (1 - door)} height={150} rx={8} fill={roof} />
    {sign && <g transform={`translate(0 ${-h - 76})`}><Cut d={4}><rect x={-Math.max(140, sign.length * 16 + 40)} y={-36} width={Math.max(280, sign.length * 32 + 80)} height={64} rx={12} fill={K.ink} /></Cut><text y={14} textAnchor="middle" fill={K.paperL} style={BB(46, 4)}>{sign}</text></g>}
  </g>
)
// # a calendar page
export const Cal: React.FC<{ x: number; y: number; s?: number; o?: number; top: string; big: string; color?: string }> = ({ x, y, s = 1, o = 1, top, big, color = K.terra }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={6}><rect x={-140} y={-150} width={280} height={300} rx={18} fill={K.paperL} /></Cut>
    <rect x={-140} y={-150} width={280} height={90} rx={18} fill={color} /><rect x={-140} y={-80} width={280} height={20} fill={color} />
    {[-80, 80].map((d) => <rect key={d} x={d - 8} y={-172} width={16} height={46} rx={8} fill={K.ink} />)}
    <text y={-90} textAnchor="middle" fill="#fff" style={BB(top.length > 9 ? 42 : 52)}>{top}</text>
    <text y={90} textAnchor="middle" fill={K.ink} style={BB(big.length > 4 ? 104 : 140)}>{big}</text>
  </g>
)
// # a gavel
export const Gavel: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-14} y={-20} width={28} height={220} rx={10} fill="url(#an-wood)" />
    <Cut d={5}><rect x={-90} y={-80} width={180} height={80} rx={18} fill="#8B5530" /></Cut><rect x={-96} y={-70} width={24} height={60} rx={8} fill={K.gold} /><rect x={72} y={-70} width={24} height={60} rx={8} fill={K.gold} />
  </g>
)
// # a courthouse
export const Court: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; color?: string }> = ({ x, y, s = 1, o = 1, sign = 'COURT', color = K.paperL }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <Cut d={10}><g><rect x={-300} y={-60} width={600} height={60} fill={K.paper3} /><rect x={-260} y={-340} width={520} height={280} fill={color} /><path d="M-290 -340 L0 -470 L290 -340 Z" fill={K.paper3} /></g></Cut>
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-230 + k * 88} y={-320} width={36} height={250} rx={6} fill={K.paper2} />)}
    <text y={-356} textAnchor="middle" fill={K.ink2} style={BB(40, 6)}>{sign}</text>
  </g>
)
// # a person-sized desk / table top
export const Desk: React.FC<{ x: number; y: number; w: number; o?: number; color?: string }> = ({ x, y, w, o = 1, color = '#A9744A' }) => o <= 0.01 ? null : (
  <g opacity={o}><Cut d={8}><g><rect x={x - w / 2} y={y} width={w} height={30} rx={8} fill={color} /><rect x={x - w / 2 + 30} y={y + 30} width={24} height={G - y - 30} fill="#7C5131" /><rect x={x + w / 2 - 54} y={y + 30} width={24} height={G - y - 30} fill="#7C5131" /></g></Cut></g>
)
// # a big round "company pie" (value) with a highlighted slice of share p (0..1), the slice pulled out by pull
export const Pie: React.FC<{ x: number; y: number; r: number; slice: number; pull?: number; o?: number; color?: string; sliceColor?: string }> = ({ x, y, r, slice, pull = 0, o = 1, color = K.terra, sliceColor = K.gold }) => {
  if (o <= 0.01) return null
  const a = slice * Math.PI * 2, mid = -Math.PI / 2 + a / 2, dx = Math.cos(mid) * pull, dy = Math.sin(mid) * pull
  const pt = (t: number, rr = r) => `${Math.cos(t) * rr} ${Math.sin(t) * rr}`
  return <g opacity={o} transform={`translate(${x} ${y})`}>
    <Cut d={10}><path d={`M0 0 L${pt(-Math.PI / 2 + a)} A${r} ${r} 0 ${a > Math.PI ? 0 : 1} 1 ${pt(-Math.PI / 2)} Z`} fill={color} /></Cut>
    {slice > 0.001 && <g transform={`translate(${dx} ${dy})`}><Cut d={6}><path d={`M0 0 L${pt(-Math.PI / 2)} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${pt(-Math.PI / 2 + a)} Z`} fill={sliceColor} /></Cut></g>}
    <circle r={r * 0.18} fill="#fff" opacity={0.2} />
  </g>
}
// # a stock exchange ticker board (lit letters)
export const Board: React.FC<{ x: number; y: number; w: number; h: number; o?: number; children?: React.ReactNode }> = ({ x, y, w, h, o = 1, children }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}><Cut d={10}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22} fill={K.navyD} /></Cut><rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={14} fill="#121A2E" />{children}</g>
)
// # the small word-synced flourish under the headline (marks a key spoken word, so no stretch passes unmarked)
export const Mark: React.FC<{ f: number; at: number[]; y?: number; w?: number; color?: string }> = ({ f, at, y = 214, w = 380, color = K.terra }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12), x0 = 960 - w / 2
  return <g opacity={o}><rect x={x0} y={y - 4} width={w * p} height={8} rx={4} fill={color} /><circle cx={x0 + w * p} cy={y} r={9} fill={color} /></g>
}
