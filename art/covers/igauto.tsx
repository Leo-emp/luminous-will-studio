// ============================================================
// INSTAGRAM ADAPTER — turns any wide YouTube cover (1920×1080) into an
// Instagram Reel cover (1080×1920) without redrawing it (owner 2026-11-13:
// every packaged long video needs a separate IG cover).
//
// The Instagram profile grid shows only the middle 3:4 (y 240–1680), so:
//   pass 1 ('measure', hidden): the wide cover runs once and reports its words,
//          its scenery (sky, rays, glow, ground) and the box of every drawn part
//   1. the scenery is drawn again natively at 1080×1920 (sharp, same colours)
//   2. the drawing ('art' mode: only hero + objects, nothing clipped) is placed
//      under the words, zoomed to fit, standing on the new ground at y ≈ 1560
//   3. the cover's own words are re-set big at the top (y 400), logo at y 276
// Hand-made IG covers (e.g. invest-ig, nvsell-ig) still win over this.
// ============================================================
import React from 'react'
import { BoxProvider, Burst, Glow, Ground, IgCtx, Sky, type Box, type IgCapture, type IgScene } from './kit'
import { Words } from './words'
import { approxMeasure } from '../thumbnails/fitText'
import { Emblem } from '../logo/Emblem'
import { fontFaces } from '../tokens'
import type { Cover } from './registry'

const W = 1080, H = 1920
const LOGO_Y = 276, WORDS_TOP = 400, WORDS_MAX_W = 940, GROUND_T = 1560

// # the words, re-set: same lines and colours, every size scaled so the widest line fits
const fitWords = (cap: IgCapture[]) => {
  const lines = cap.flatMap((c) => c.lines)
  if (!lines.length) return { lines, end: WORDS_TOP }
  const widest = Math.max(...lines.map((l) => approxMeasure(l.t, l.size) + l.size * 0.3))
  const k = Math.min(1.45, WORDS_MAX_W / widest)
  const sized = lines.map((l) => ({ ...l, size: Math.round(l.size * k) }))
  return { lines: sized, end: WORDS_TOP + sized.reduce((h, l) => h + l.size * 0.98, 0) }
}

// # where the drawing goes: scale s and offset (ox, oy) of the wide scene inside the tall frame
const frame = (boxes: Box[], scene: IgScene, wordsEnd: number) => {
  const art = boxes.filter((b) => b.kind !== 'text' && b.kind !== 'scenery')
  const has = art.length > 0
  const x0 = has ? Math.max(0, Math.min(...art.map((b) => b.x))) : 0
  const x1 = has ? Math.min(1920, Math.max(...art.map((b) => b.x + b.w))) : 1920
  const y0 = has ? Math.max(0, Math.min(...art.map((b) => b.y))) : 300
  const groundY = scene.ground?.y ?? 980
  const objBottom = Math.max(0, ...art.filter((b) => b.kind !== 'hero' && b.kind !== 'face').map((b) => Math.min(1080, b.y + b.h)))
  const yb = Math.max(groundY, objBottom)
  const top = wordsEnd + 60
  const s = Math.min(1.15, (W - 30) / Math.max(1, x1 - x0), (GROUND_T + (yb - groundY) - top) / Math.max(1, yb - y0))
  const ox = W / 2 - ((x0 + x1) / 2) * s
  const oy = GROUND_T - groundY * s
  return { s, ox, oy, groundY, drawTop: oy + y0 * s }
}

export const toIg = (base: Cover, id = `${base.id}-ig`): Cover => ({
  id, job: `${base.job}#ig`, canvas: 'tall', // # job ≠ the job folder, so `cc cover <job>` and its gate skip these
  concept: `Instagram version of ${base.id} (auto layout: same scene, drawing and words, everything inside the 3:4 grid crop).`,
  Component: () => {
    const C = base.Component
    const measure = { boxes: [] as Box[], canvas: undefined }
    const m = { mode: 'measure' as const, words: [] as IgCapture[], scene: { bursts: [], glows: [] } as IgScene }
    const art = { mode: 'art' as const, words: [] as IgCapture[], scene: { bursts: [], glows: [] } as IgScene }
    return (
      <div style={{ position: 'absolute', inset: 0, width: W, height: H, overflow: 'hidden' }}>
        <style>{fontFaces()}</style>
        {/* pass 1: measure (hidden) */}
        <div style={{ display: 'none' }}><IgCtx.Provider value={m}><BoxProvider value={measure}><C /></BoxProvider></IgCtx.Provider></div>
        <Later render={() => {
          const sc = m.scene
          const wd = fitWords(m.words)
          const { s, ox, oy, groundY, drawTop } = frame(measure.boxes, sc, wd.end)
          // centre the words in the space between the logo row and the drawing
          const wy = WORDS_TOP + Math.max(0, (drawTop - 50 - wd.end) / 2)
          const map = (x: number, y: number) => [ox + x * s, oy + y * s] as const
          const g = sc.ground
          return <>
            {/* 1. scenery, natively tall */}
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
              <Sky canvas="tall" top={sc.sky?.top ?? '#F4F1EA'} bottom={sc.sky?.bottom ?? '#E2DCCD'} id="ig-sky" />
              {sc.bursts.map((b, i) => { const [cx, cy] = map(b.cx, b.cy); return <Burst key={i} canvas="tall" cx={cx} cy={cy} color={b.color} rays={b.rays} opacity={b.opacity} /> })}
              {sc.glows.map((gl, i) => { const [x, y] = map(gl.x, gl.y); return <Glow key={i} id={`ig-${i}`} x={x} y={y} r={gl.r * Math.max(s, 0.8)} color={gl.color} opacity={gl.opacity} /> })}
              {g && <Ground canvas="tall" y={map(0, groundY)[1]} color={g.color} edge={g.edge} wave={(g.wave ?? 0) * s} />}
            </svg>
            {/* 2. the drawing */}
            <div style={{ position: 'absolute', left: ox, top: oy, width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: '0 0' }}>
              <IgCtx.Provider value={art}><C /></IgCtx.Provider>
            </div>
            {/* 3. words + logo */}
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
              {wd.lines.length > 0 && <Words name="ig-words" lines={wd.lines} x={W / 2} y={wy} rotate={-2} ring={m.words[0].ring} ink={m.words[0].ink} outline={m.words[0].outline} />}
              <g transform={`translate(36 ${LOGO_Y})`}><rect width={96} height={96} rx={16} fill="rgba(5,7,12,0.82)" /><g transform="translate(11 12)"><Emblem size={74} /></g></g>
            </svg>
          </>
        }} />
      </div>
    )
  },
})

// # renders after its earlier siblings, so pass 1 has filled in the boxes, words and scenery
const Later: React.FC<{ render: () => React.ReactNode }> = ({ render }) => <>{render()}</>
