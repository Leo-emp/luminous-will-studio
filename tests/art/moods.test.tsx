// # Light (cream/beige) and dark (navy) moods: every piece follows its mood through CSS variables
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { THEMES, themeStyle } from '../../art/diorama/kit'
import { moodOf } from '../../art/diorama/pieces'
import { getPiece, PIECES } from '../../art/diorama/registry'

test('the light mood is a cream/beige stage with dark navy ink', () => {
  expect(THEMES.light.bg).toEqual(['#F8EFDF', '#E6D5B8'])
  expect(THEMES.light.ink).toBe('#16294A')
  expect(THEMES.dark.ink).not.toBe(THEMES.light.ink)
})

test('the theme style carries the stage, ink and paper variables', () => {
  const html = renderToStaticMarkup(<svg><g style={themeStyle('light')} /></svg>)
  for (const v of ['--cc-bg0:#F8EFDF', '--cc-ink:#16294A', '--cc-paper:#FFFFFF', '--cc-edge:#CDB58C']) expect(html).toContain(v)
})
