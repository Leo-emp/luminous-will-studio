// ---------------------------------------------------------------- s10–s19: born in a diner, and the one idea
// A) s10–s11  a 1990s diner booth: three engineers at the table; a napkin sketch of a chip draws itself; coffee steams;
//             an APRIL 1993 page and a small $40,000 jar on the table.
// B) s12–s15  a games screen made of dots: it zooms to its grid (≈ 2 MILLION DOTS), repaints 60 times a second,
//             a counter rolls past 100 MILLION A SECOND.
// C) s16      the CPU: four smart workers at desks, one tile handed along at a time.
// D) s17      the GPU: a grid of 40 tiny painters over the same screen, all dabbing at once — it fills in one go.
// E) s18–s19  the painters shrink into one glowing chip; a lime thread runs out of it to the right… then the chip cracks red.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Cal, Chip, Diner, Jar, Mark, Mosaic, Painter, Room, Tag, X, XDefs, XGrain, BB, G, cues, fadeIn, scene, Desk } from './kit'

const K = {
  three10: 's10:three', engineers10: 's10:engineers', priem10: 's10:priem',
  sketched11: 's11:sketched', diner11: 's11:diner', april11: 's11:april', forty11: 's11:forty', bank11: 's11:bank',
  games12: 's12:games', special12: 's12:special', chip12: 's12:chip',
  screen13: 's13:screen', pixels13: 's13:pixels', two13: 's13:two',
  smoothly14: 's14:smoothly', colour14: 's14:colour', sixty14: 's14:sixty',
  hundred15: 's15:hundred', second15: 's15:second',
  cpu16: 's16:cpu', smart16: 's16:smart', after16: 's16:after',
  opposite17: 's17:opposite', thousands17: 's17:thousands', colouring17: 's17:colouring', same17: 's17:same',
  picture18: 's18:picture', idea18: 's18:idea', small18: 's18:small', story18: 's18:story',
  killed19: 's19:killed', company19: 's19:company',
}

const Diner1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s12') - 4, BC = c('s16') - 4, CD = c('s17') - 4, DE = c('s18') - 4
  const A = scene(f, -20, AB), B = scene(f, AB, BC), C = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  const zoomGrid = on(f, t.pixels13 - 2, 12)
  const rep = f >= t.sixty14 ? ((f - t.sixty14) % 12) / 12 : 1
  const count = Math.round(lerp(0, 124, span(f, t.hundred15 - 4, t.second15 + 6)))
  // C) a queue of 8 tiles, handed one at a time to 4 desks
  const step = Math.max(0, Math.floor((f - t.smart16) / 9))
  const shrink = easeInOut(span(f, t.idea18 - 4, t.small18 + 8))
  return (
    <g>
      <XDefs />
      {/* ---------------- A) the diner booth ---------------- */}
      {A > 0 && <g opacity={A}>
        <Diner />
        <rect x={420} y={640} width={1080} height={40} rx={12} fill={X.tealD} />
        <rect x={420} y={600} width={1080} height={50} rx={14} fill="#fff" />
        <rect x={930} y={680} width={60} height={220} fill={X.char} />
        {[['buyer', 620, t.three10], ['worker', 960, t.engineers10], ['owner', 1300, t.priem10]].map(([who, x, at], k) =>
          <g key={k} opacity={on(f, (at as number) - 8, 8)}><Person f={f} who={who as string} beats={[[0, 'idle', 'neutral'], [t.sketched11 + k * 6, k === 1 ? 'explain' : 'think', k === 1 ? 'smiling' : 'thinking'], [t.forty11, k === 2 ? 'countA' : 'idle', 'smiling']]} x={x as number} y={1010} s={0.62} /></g>)}
        {/* napkin with a chip sketch that draws on "sketched" */}
        <g transform="translate(960 560) rotate(-4)" opacity={on(f, t.sketched11 - 4, 8)}>
          <rect x={-120} y={-60} width={240} height={110} rx={6} fill="#fff" stroke={X.paperDD} strokeWidth={3} />
          <rect x={-50} y={-40} width={100} height={70} rx={6} fill="none" stroke={X.ink} strokeWidth={4} strokeDasharray="340" strokeDashoffset={340 * (1 - span(f, t.sketched11, t.sketched11 + 24))} />
          {[-30, -10, 10, 30].map((d) => <line key={d} x1={d} y1={-48} x2={d} y2={-40} stroke={X.ink} strokeWidth={3} opacity={on(f, t.sketched11 + 20, 6)} />)}
        </g>
        {[700, 1220].map((x, k) => <g key={k}><path d={`M${x - 34} 600 L${x + 34} 600 L${x + 26} 540 L${x - 26} 540 Z`} fill="#fff" stroke={X.coralD} strokeWidth={4} />
          <path d={`M${x - 8} 530 q12 -22 0 -44`} stroke={X.inkL} strokeWidth={4} fill="none" opacity={0.5 + 0.5 * Math.sin(f / 10 + k)} /></g>)}
        <Cal x={1650} y={330} top="APRIL" big="1993" color={X.coral} s={0.6} r={4} o={on(f, t.april11 - 2, 8)} />
        <Jar x={300} y={G + 10} s={0.62} fill={0.35} label="$40,000" o={on(f, t.forty11 - 2, 8)} />
      </g>}

      {/* ---------------- B) a screen of dots ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room />
        {(() => { const w = lerp(760, 1100, zoomGrid), h = w * 0.56, x = 960 - w / 2, y = 300 + (1 - zoomGrid) * 40
          const cols = Math.round(lerp(16, 32, zoomGrid)), rows = Math.round(cols * 0.56)
          return <g>
            <Mosaic x={x} y={y} w={w} h={h} cols={cols} rows={rows} paint={f < t.sixty14 ? on(f, t.games12, 20) : rep} pic="sun" o={on(f, t.games12 - 6, 8)} />
            <rect x={940} y={y + h + 22} width={40} height={60} fill={X.charL} /><rect x={840} y={y + h + 80} width={240} height={20} rx={8} fill={X.charL} />
          </g> })()}
        <Tag x={1660} y={420} text="PIXELS" size={46} bg={X.ink} o={on(f, t.pixels13, 8)} />
        <Tag x={1660} y={520} text="≈ 2 MILLION" size={46} bg={X.limeD} o={on(f, t.two13, 8)} />
        <Tag x={260} y={420} text="60 TIMES" size={46} bg={X.coral} o={on(f, t.sixty14, 8)} />
        <Tag x={260} y={500} text="A SECOND" size={38} bg={X.coralD} o={on(f, t.sixty14 + 4, 8)} />
        {f >= t.hundred15 - 4 && <g><rect x={560} y={960} width={800} height={90} rx={45} fill={X.char} />
          <text x={960} y={1022} textAnchor="middle" fill={X.glow} style={BB(60, 3)}>{count} MILLION COLOURS / SECOND</text></g>}
      </g>}

      {/* ---------------- C) the CPU: a few smart workers ---------------- */}
      {C > 0 && <g opacity={C}>
        <Room />
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, t.cpu16 - 4 + k * 4, 8)}>
          <Desk x={420 + k * 360} y={G} s={1.3} />
          <Mini look={['hero', 'worker', 'owner', 'buyer'][k]} x={420 + k * 360} y={G - 20} scale={1.25} frame={f} seed={k + 21} mood="neutral" />
          {step % 4 === k && f > t.smart16 && <rect x={420 + k * 360 - 34} y={G - 170} width={68} height={68} rx={10} fill={X.butter} stroke={X.butterD} strokeWidth={4} />}
        </g>)}
        {/* the queue of jobs waiting their turn */}
        {Array.from({ length: 10 }, (_, k) => { const left = k - step / 4; return left >= -0.5 && <rect key={k} x={260 + left * 150} y={420} width={110} height={110} rx={14} fill={X.butterL} stroke={X.butterD} strokeWidth={4} opacity={on(f, t.after16 - 10, 8)} /> })}
        <Tag x={960} y={330} text="CPU: A FEW SMART WORKERS" size={50} bg={X.ink} o={on(f, t.smart16, 8)} />
        <Tag x={960} y={620} text="ONE JOB AFTER ANOTHER" size={40} bg={X.inkL} o={on(f, t.after16, 8)} />
      </g>}

      {/* ---------------- D) the GPU: thousands of simple painters ---------------- */}
      {D > 0 && <g opacity={D}>
        <Room />
        {(() => { const x = 360, y = 280, w = 1200, h = 560, cols = 10, rows = 4, all = on(f, t.colouring17, 10)
          return <g>
            <Mosaic x={x} y={y} w={w} h={h} cols={30} rows={14} paint={span(f, t.colouring17, t.same17 + 6) > 0.99 ? 1 : 0} pic="sun" frame />
            {f >= t.colouring17 && f < t.same17 + 6 && <Mosaic x={x} y={y} w={w} h={h} cols={30} rows={14} paint={0} pic="sun" frame={false} o={1 - span(f, t.colouring17, t.same17 + 6)} />}
            {Array.from({ length: cols * rows }, (_, k) => { const i = k % cols, j = Math.floor(k / cols)
              return <Painter key={k} x={x + (i + 0.5) * (w / cols)} y={y + (j + 0.95) * (h / rows)} s={0.95} f={f * all} seed={k} color={[X.lime, X.butter, X.coral, X.sky][k % 4]} o={on(f, t.thousands17 - 6 + (k % 7), 6)} /> })}
          </g> })()}
        <Tag x={960} y={950} text="GPU: THOUSANDS OF SIMPLE WORKERS" size={48} bg={X.limeD} o={on(f, t.thousands17, 8)} />
      </g>}

      {/* ---------------- E) one idea → one chip; then it nearly dies ---------------- */}
      {E > 0 && <g opacity={E}>
        <Room />
        {Array.from({ length: 40 }, (_, k) => { const i = k % 10, j = Math.floor(k / 10), x0 = 360 + (i + 0.5) * 120, y0 = 280 + (j + 0.95) * 140
          return <Painter key={k} x={lerp(x0, 560, shrink)} y={lerp(y0, 600, shrink)} s={1 - shrink * 0.9} f={f} seed={k} color={[X.lime, X.butter, X.coral, X.sky][k % 4]} o={1 - shrink} /> })}
        {(() => { const dying = on(f, t.killed19 - 2, 10); return <g>
          <Chip x={560} y={560} s={0.9} lit={shrink * (1 - dying)} o={shrink} label={dying > 0.5 ? '' : 'ONE IDEA'} />
          <path d="M710 560 C 900 480 1100 640 1300 560 S 1640 520 1800 560" stroke={X.lime} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray="1300" strokeDashoffset={1300 * (1 - span(f, t.small18, t.story18 + 10))} opacity={1 - dying} />
          {dying > 0.01 && <path d="M520 440 l40 60 l-30 50 l50 70 l-20 60" stroke={X.red} strokeWidth={10} fill="none" opacity={dying} />}
          <Tag x={1250} y={760} text="MANY SMALL SUMS AT ONCE" size={46} bg={X.limeD} o={on(f, t.small18, 8) * (1 - dying)} />
          <Tag x={1250} y={760} text="IT ALMOST KILLED THEM" size={46} bg={X.red} o={dying} />
        </g> })()}
      </g>}

      <Headline f={f} lines={[[c('s10'), 'THREE ENGINEERS', X.ink, 110], [t.games12, 'WHY GAMES NEED A SPECIAL CHIP', X.ink, 96], [t.cpu16, 'A NORMAL CHIP', X.ink, 110], [t.opposite17, "NVIDIA'S IDEA", X.ink, 110], [t.picture18, 'THE ONE IDEA', X.ink, 110]]} />
      <Mark f={f} at={(EXTRA['gx-diner'] ?? []).map(c)} />
      <XGrain />
    </g>
  )
}

export const GX_DINER = makePiece('gx-diner', 'Born in a diner: three engineers in a 1990s diner booth, a napkin chip sketch drawing itself, coffee steam, an APRIL 1993 page and a $40,000 jar; a games screen made of dots zooms to its grid (≈ 2 MILLION PIXELS), repaints 60 times a second while a counter rolls to 124 MILLION COLOURS / SECOND; the CPU as four smart workers at desks taking one job at a time from a queue; the GPU as 40 tiny painters over the screen dabbing at once so it fills in one go; the painters shrink into one glowing chip with a lime thread running out of it, which then cracks red: it almost killed them', {
  mood: 'light', Component: Diner1, beats: [...Object.values(K), ...(EXTRA['gx-diner'] ?? [])],
  sfx: [['s17:same', 'pop', 0.08]] })
