// # Tests for the vector logo
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { Emblem } from '../../art/logo/Emblem'
import { Wordmark } from '../../art/logo/Wordmark'
import { COLORS } from '../../art/tokens'

test('emblem is the old Luminous Will lion badge (owner 2026-11-15)', () => {
  const html = renderToStaticMarkup(<svg><Emblem size={200} /></svg>)
  expect(html).toContain('lw-logo.png')
  expect(html).not.toContain('>LW<')
})

test('two emblems on one page do not share clip ids', () => {
  const html = renderToStaticMarkup(<svg><Emblem size={40} /><Emblem size={40} /></svg>)
  const ids = [...html.matchAll(/<clipPath id="([^"]+)"/g)].map((m) => m[1])
  expect(new Set(ids).size).toBe(ids.length)
  expect(ids.length).toBeGreaterThanOrEqual(2)
})

test('wordmark spells Luminous Will and the tagline is optional', () => {
  expect(renderToStaticMarkup(<Wordmark height={100} />)).toContain('Luminous Will')
  expect(renderToStaticMarkup(<Wordmark height={100} />)).not.toContain('PSYCHOLOGY')
  expect(renderToStaticMarkup(<Wordmark height={100} tagline />)).toContain('PSYCHOLOGY')
})
