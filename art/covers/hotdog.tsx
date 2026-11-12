// ============================================================
// COVERS — Short "Why Costco's Hot Dog Still Costs $1.50": the hot dog +
// soda combo has cost $1.50 since 1985; kept up with inflation it would be
// ≈ $4.70 (BLS CPI-U, Oct 2026). Drawn from the video's own art: the yellow
// price board, the hot dog, the soda, the ghost $4.70 sticker.
// Light, varied backgrounds (r92): pale sky, butter yellow, blush peach.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PriceBoard, HotDog, Soda, Burst as Sticker, Lock } from '../diorama/hotdog/kit'

const JOB = '20261112-1709_why-costco-s-hot-dog-still-costs-1-50'
const RED = '#E0402F', INK = '#1E2633', TEAL = '#1F8A8F'

// # 1) the hot dog under the never-changing $1.50 board; hero shocked (three text-colour versions for the owner, 2026-11-12)
type C1Text = { id: string; ink: string; key: string; ring: string; outline?: string; note: string }
const c1 = ({ id, ink, key, ring, outline, note }: C1Text) => makeCover({
  id, job: JOB, canvas: 'tall',
  concept: `A big glossy hot dog and a red soda under the yellow HOT DOG + SODA $1.50 board with a SINCE 1985 stamp; the hero stares at the price in shock. Text: ${note}.`,
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#E4F2FB" bottom="#B9DDF2" />
      <Burst canvas="tall" cx={600} cy={980} color="#FFFFFF" opacity={0.3} />
      <Glow id={`${id}g`} x={600} y={900} r={440} color="#FFF3C4" opacity={0.6} />
      <Ground canvas="tall" y={1430} color="#6E8FA8" edge="#9DB9CE" />
      <Part name="board" kind="object" x={300} y={600} w={600} h={360}>
        <PriceBoard x={600} y={800} s={1.2} stamp={1} />
      </Part>
      <Part name="combo" kind="object" x={380} y={1080} w={560} h={380}>
        <HotDog x={600} y={1360} s={1.1} />
        <Soda x={840} y={1420} s={1.05} />
      </Part>
      <Hero pose="shock" expression="shocked" x={200} y={2060} scale={2.0} />
      <Words lines={[{ t: "WHY IS COSTCO'S", size: 116 }, { t: 'HOT DOG STILL', size: 124 }, { t: 'ONLY $1.50?', size: 140, color: key }]} x={540} y={150} rotate={-3} ring={ring} ink={ink} outline={outline} />
    </CoverCanvas>
  ),
})
export const HD_C1 = c1({ id: 'hotdog-1', ink: '#FFFFFF', key: '#F2B632', ring: '#16223D', note: 'white words, the price in mustard yellow, navy ring' })
export const HD_C1B = c1({ id: 'hotdog-1b', ink: '#16223D', key: '#E0402F', ring: '#FFFFFF', outline: '#16223D', note: 'navy words, the price in ketchup red, white ring' })
export const HD_C1C = c1({ id: 'hotdog-1c', ink: '#F2B632', key: '#FFFFFF', ring: '#E0402F', outline: '#7A1E14', note: 'mustard words, the price in white, ketchup-red ring' })

// # 2) the real $1.50 hot dog beside its grey ghost at $4.70; hero thinking
export const HD_C2 = makeCover({
  id: 'hotdog-2', job: JOB, canvas: 'tall',
  concept: 'The real hot dog with a yellow $1.50 sticker beside a grey ghost hot dog whose sticker reads $4.70, the price it would be with inflation; the hero scratches his head.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#FFF4C8" bottom="#F6DB86" />
      <Burst canvas="tall" cx={560} cy={960} color="#FFFFFF" opacity={0.3} />
      <Ground canvas="tall" y={1430} color="#C79A62" edge="#E2BD87" />
      <Part name="dogs" kind="object" x={180} y={580} w={760} h={560}>
        <Sticker x={770} y={690} s={1.05} t="$4.70" col="#D9D2C8" size={78} r={8} />
        <HotDog x={660} y={900} s={1.05} ghost />
        <HotDog x={580} y={1070} s={1.15} />
        <Sticker x={330} y={830} s={1.0} t="$1.50" size={78} r={-8} />
      </Part>
      <Hero pose="scratchHead" expression="thinking" x={200} y={2080} scale={1.8} />
      <Words lines={[{ t: 'THIS HOT DOG', size: 126 }, { t: 'SHOULD COST', size: 126, color: INK }, { t: '$4.70 BY NOW', size: 140, color: RED }]} x={540} y={150} rotate={-3} ring="#8A5A12" />
    </CoverCanvas>
  ),
})

// # 3) the board under a gold padlock; hero smug
export const HD_C3 = makeCover({
  id: 'hotdog-3', job: JOB, canvas: 'tall',
  concept: 'The yellow $1.50 board locked with a big gold padlock above a hot dog; the hero grins smugly.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#FFE7DD" bottom="#F7C1AE" />
      <Glow id="hd3" x={600} y={900} r={440} color="#FFFFFF" opacity={0.5} />
      <Ground canvas="tall" y={1430} color="#C9705A" edge="#E59A84" />
      <Part name="board" kind="object" x={300} y={600} w={600} h={520}>
        <PriceBoard x={600} y={800} s={1.2} />
        <Lock x={600} y={1040} s={1.3} />
      </Part>
      <Part name="dog" kind="object" x={400} y={1200} w={420} h={200}>
        <HotDog x={610} y={1340} s={1.2} />
      </Part>
      <Hero pose="confident" expression="smug" x={200} y={2080} scale={1.8} />
      <Words lines={[{ t: 'THE $1.50 PRICE', size: 118 }, { t: 'COSTCO REFUSES', size: 118, color: TEAL }, { t: 'TO RAISE', size: 140, color: RED }]} x={540} y={150} rotate={-3} ring="#7A3A2A" />
    </CoverCanvas>
  ),
})
