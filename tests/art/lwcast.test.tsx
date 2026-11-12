// ============================================================
// LW CAST — the owner-approved burgundy hero (2026-11-13) in four
// versions is the cast every Actor draws.
// ============================================================
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Actor, actorHeight, STANDING_PX } from '../../art/rig/Actor'
import { CharacterLW, getLookLW, LOOKS_LW } from '../../art/rig/lw/CharacterLW'
import { getPose, type ExpressionId } from '../../art/rig/pose'

const svg = (el: React.ReactElement) => renderToStaticMarkup(<svg>{el}</svg>)

describe('LW looks', () => {
  it('has exactly the four approved hero versions', () => {
    expect(Object.keys(LOOKS_LW)).toEqual(['hero', 'hero-struggling', 'hero-fit', 'hero-rich'])
  })
  it('keeps the approved colours', () => {
    expect(LOOKS_LW.hero.cloth[1]).toBe('#7E1F35')
    expect(LOOKS_LW.hero.skin).toEqual(['#B9825C', '#9A6645'])
    expect(LOOKS_LW['hero-rich'].tie).toBe('#86213A')
  })
  it('refuses an unknown look by name', () => {
    expect(() => getLookLW('nope')).toThrow(/unknown look "nope"/)
  })
})

describe('CharacterLW', () => {
  const EX: ExpressionId[] = ['neutral', 'thinking', 'shocked', 'worried', 'smiling', 'smug', 'angry']
  it('draws every expression', () => {
    for (const e of EX) expect(svg(<CharacterLW pose={{ ...getPose('idle'), expression: e }} look={LOOKS_LW.hero} />)).toContain(`data-expression="${e}"`)
  })

  it('two actors in one frame never share an SVG id (Review Focus 4)', () => {
    const html = svg(<g><Actor who="hero" pose="nervous" expression="worried" x={400} y={1000} /><Actor who="hero-struggling" pose="slump" x={900} y={1000} /></g>)
    const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1])
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
    for (const [, ref] of html.matchAll(/url\(#([^)]+)\)/g)) expect(ids).toContain(ref)
  })

  it('every version stands the same height (Review Focus 5)', () => {
    for (const who of Object.keys(LOOKS_LW)) expect(Math.abs(actorHeight('idle', 1, who) - STANDING_PX), who).toBeLessThanOrEqual(1)
  })

  it('a blink closes the eyes', () => {
    const open = svg(<CharacterLW pose={getPose('idle')} look={LOOKS_LW.hero} />)
    const shut = svg(<CharacterLW pose={getPose('idle')} look={LOOKS_LW.hero} life={{ blink: 1, breath: 0, headTurn: 0 }} />)
    expect(open).toContain('fill="#FBF8F3"')
    expect(shut).not.toContain('fill="#FBF8F3"')
  })

  it('a blend shows both feelings half way', () => {
    const html = svg(<CharacterLW pose={{ ...getPose('idle'), expression: 'smiling' }} look={LOOKS_LW.hero} blend={{ from: 'worried', mix: 0.5 }} />)
    expect((html.match(/opacity="0.5"/g) ?? []).length).toBeGreaterThanOrEqual(2)
  })
})
