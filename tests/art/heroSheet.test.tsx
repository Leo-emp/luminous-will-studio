// ============================================================
// HERO SHEET — the owner-approved style-bible pages for the LW
// hero (4 versions + 6 expressions) render from the engine.
// ============================================================
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { HeroFaces, HeroSheet } from '../../art/stylebible/HeroLW'

it('the sheet shows the four hero versions with their titles', () => {
  const html = renderToStaticMarkup(<HeroSheet />)
  expect((html.match(/data-expression=/g) ?? []).length).toBe(4)
  for (const t of ['ORDINARY', 'STRUGGLING', 'FIT', 'SUCCESSFUL']) expect(html).toContain(`>${t}<`)
})

it('the faces page shows the six approved expressions', () => {
  const html = renderToStaticMarkup(<HeroFaces />)
  expect((html.match(/data-expression=/g) ?? []).length).toBe(6)
  for (const t of ['CALM', 'PROUD', 'DETERMINED', 'STRUGGLING', 'SHOCKED', 'THINKING']) expect(html).toContain(`>${t}<`)
})
