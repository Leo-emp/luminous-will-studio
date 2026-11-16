// ---------------------------------------------------------------- s1–s4b: the trip, the spotlight only you can see.
// HOOK) the common room: he walks in, trips over nothing (oops), heat lines rise off his face, the room dims and a
//    spotlight slams onto him; four people sit around; "?" over each on "everyone saw it". Then the truth: a
//    REPLAYED ×20 bubble over him — while the others are on their phones/chatting, nobody looking (NOT EVEN NOTICED).
//    A memory puff pops (FORGOTTEN). The spotlight stays on him: ONLY YOU CAN SEE IT.
// SHIRT) s5–s10: Cornell. The cheesy Barry Manilow T-shirt; a student walks into a room of eight; two meters:
//    THEY GUESSED ~50% vs REALLY ~25% → 2× AS VISIBLE AS REAL.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Common, Heat, Headline, Meter, Person, Shirt, Spot, SVg, Tag, win, BRICK, CREAM, GOLD, INK, BURG, TEAL, TEALD, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const walk = c('s1:walk'), room = c('s1:room'), trip = c('s1:trip'), nothing = c('s1:nothing'), face = c('s1:face'), hot = c('s1:hot')
  const s2 = c('s2'), rest = c('s2:rest'), everyone = c('s2:everyone'), saw = c('s2:saw'), why = c('s2:why')
  const s3 = c('s3'), replayed = c('s3:replayed'), bed = c('s3:bed'), most = c('s3:most'), notice = c('s3:notice')
  const s4 = c('s4'), few = c('s4:few'), forgotten = c('s4:forgotten')
  const s4b = c('s4b'), believe = c('s4b:believe'), standing = c('s4b:standing'), spotlight = c('s4b:spotlight'), nobody = c('s4b:nobody'), see = c('s4b:see')

  const dim = on(f, hot, 8)
  const hx = lerp(-100, 470, easeOut(span(f, 0, trip)))
  const hero: Beat[] = [[0, 'walkA', 'smiling'], [8, 'walkB', 'smiling'], [16, 'walkA', 'smiling'], [24, 'walkB', 'smiling'], [trip, 'oops', 'shocked'], [face, 'facepalm', 'worried'], [s2, 'nervous', 'worried'], [everyone, 'holdChest', 'worried'],
    [s3, 'think', 'thinking'], [most, 'idle', 'neutral'], [notice, 'shrug', 'thinking'], [s4, 'idle', 'neutral'], [s4b, 'nervous', 'worried'], [spotlight, 'idle', 'worried']]
  // # four people around the room; they look up "?" on "everyone saw it" (his imagination), then they're busy
  const people: [number, number, string][] = [[140, GROUND - 40, 'phone'], [330, GROUND + 60, 'chat'], [780, GROUND + 60, 'chat'], [960, GROUND - 40, 'book']]
  const imagined = on(f, everyone, 6) * (1 - on(f, most, 8))

  return (
    <g>
      <Common id="sph" dim={dim} />
      <Spot x={hx} o={on(f, hot, 6)} w={230} />
      {people.map(([x, y, kind], k) => <g key={k}>
        <Mini look={['hero-fit', 'hero-rich', 'hero-fit', 'hero-rich'][k]} x={x} y={y} scale={2} frame={f} seed={k + 60} mood={imagined > 0.5 ? 'sad' : 'happy'} />
        {/* # imagined: everyone staring "?" ; truth: phones, chats, books */}
        <g opacity={imagined}><text x={x} y={y - 380} textAnchor="middle" fill={BRICK} style={{ font: '400 90px "Bebas Neue"' }}>?</text></g>
        <g opacity={on(f, most, 8)}>
          {kind === 'phone' && <rect x={x + 10} y={y - 250} width={40} height={66} rx={8} fill={INK} />}
          {kind === 'book' && <rect x={x - 50} y={y - 240} width={100} height={60} rx={6} fill={TEAL} stroke={INK} strokeWidth={4} />}
          {kind === 'chat' && <g><ellipse cx={x} cy={y - 400} rx={56} ry={36} fill={CREAM} stroke={INK} strokeWidth={4} /><text x={x} y={y - 388} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>LOL</text></g>}
        </g>
      </g>)}
      <Heat f={f} x={hx} y={GROUND - 560} o={on(f, face, 4) * (1 - on(f, s3, 8))} />
      <g opacity={on(f, nothing, 4) * (1 - on(f, s2, 6))}><text x={hx + 110} y={GROUND - 10} fill={CREAM} style={{ font: '400 46px "Bebas Neue"' }}>(NOTHING)</text></g>
      <g opacity={on(f, saw, 6) * (1 - on(f, s3, 6))}><Tag x={CX} y={480} text="EVERYONE SAW IT?" s={pop(f, saw)} size={58} fill={GOLD} /></g>
      {/* # the replay bubble */}
      <g opacity={on(f, replayed, 6) * (1 - on(f, s4, 8))} transform={`translate(${hx + 230} 560) scale(${pop(f, replayed)})`}>
        <ellipse rx={170} ry={90} fill={CREAM} stroke={INK} strokeWidth={6} /><circle cx={-130} cy={110} r={18} fill={CREAM} stroke={INK} strokeWidth={5} />
        <path d="M-90 0 A40 40 0 1 1 -50 40" stroke={BURG} strokeWidth={10} fill="none" /><path d="M-60 34 L-46 44 L-60 56" stroke={BURG} strokeWidth={8} fill="none" />
        <text x={40} y={20} textAnchor="middle" fill={INK} style={{ font: '400 58px "Bebas Neue"' }}>{f >= bed ? 'REPLAY ×20' : 'REPLAY'}</text>
      </g>
      <g opacity={on(f, notice, 6) * (1 - on(f, s4, 6))}><Tag x={CX} y={480} text="NOBODY NOTICED" s={pop(f, notice)} size={58} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, forgotten, 6) * (1 - on(f, s4b, 6))}><Tag x={CX} y={480} text="ALREADY FORGOTTEN" s={pop(f, forgotten)} size={56} /></g>
      <g opacity={on(f, see, 6)}><Tag x={CX} y={480} text="ONLY YOU SEE IT" s={pop(f, see)} size={62} fill={GOLD} /></g>
      <g opacity={on(f, believe, 6) * (1 - on(f, see, 6))}><Tag x={CX} y={480} text="YOUR BRAIN: NOPE" s={pop(f, believe)} size={56} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={hx} s={0.85} />
      <Headline text={f < s3 ? 'EVERYONE SAW?' : f < s4b ? 'NOPE.' : 'A SPOTLIGHT'} o={f < s3 ? on(f, everyone, 8) * (1 - on(f, s3 - 4, 4)) : f < s4b ? on(f, most, 8) * (1 - on(f, s4b - 4, 4)) : on(f, standing, 8)} color={dim > 0.5 ? CREAM : INK} />
      <SVg id="sph" />
    </g>
  )
}

const ShirtPiece: React.FC<PieceProps> = ({ f, c }) => {
  const cornell = c('s5:cornell'), tested = c('s5:tested'), tshirt = c('s5:tshirt')
  const s6 = c('s6'), put = c('s6:put'), photo = c('s6:photo'), barry = c('s6:barry'), walk = c('s6:walk'), full = c('s6:full')
  const s7 = c('s7'), uncool = c('s7:uncool'), planet = c('s7:planet')
  const s8 = c('s8'), guessed = c('s8:guessed'), half = c('s8:half'), noticed = c('s8:noticed')
  const s9 = c('s9'), real = c('s9:real'), quarter = c('s9:quarter')
  const s10 = c('s10'), twice = c('s10:twice'), visible = c('s10:visible')

  const A = win(f, 0, s8 + 4), B = on(f, s8, 10)
  const sx = lerp(-200, 560, easeOut(span(f, walk, full + 20)))
  const student: Beat[] = [[0, 'idle', 'neutral'], [put, 'shrug', 'worried'], [walk, 'walkA', 'worried'], [walk + 8, 'walkB', 'worried'], [walk + 16, 'walkA', 'worried'], [walk + 24, 'walkB', 'worried'], [full + 20, 'nervous', 'worried'], [uncool, 'facepalm', 'worried']]

  return (
    <g>
      <Common id="sps" dim={0.25 * B} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, cornell, 6)}><Tag x={CX} y={470} text="CORNELL UNIVERSITY" s={pop(f, cornell)} size={56} fill={CREAM} ink={TEALD} /></g>
        {/* # the shirt on a hanger, then he wears it into the room */}
        <g opacity={on(f, tshirt, 6) * (1 - on(f, walk, 8))}><Shirt x={CX} y={820} s={1.15 * pop(f, tshirt)} r={-3} /></g>
        <g opacity={on(f, photo, 6) * (1 - on(f, walk, 8))}><Tag x={CX} y={1120} text={f >= barry ? 'BARRY MANILOW' : 'A GIANT PHOTO'} s={pop(f, photo)} size={52} fill={GOLD} /></g>
        {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, full + k * 2, 4)}><Mini look={k % 2 ? 'hero-fit' : 'hero-rich'} x={150 + (k % 4) * 260 + (k > 3 ? 120 : 0)} y={k > 3 ? GROUND + 80 : GROUND - 60} scale={1.8} frame={f} seed={k + 70} /></g>)}
        <g opacity={on(f, walk, 6)}>
          <Person f={f} who="hero-struggling" beats={student} x={sx} s={0.85} />
          {/* # the shirt drawn over his chest */}
          <Shirt x={sx} y={GROUND - 330} s={0.34} />
        </g>
        <g opacity={on(f, uncool, 6)}><Tag x={CX} y={470} text="MOST UNCOOL OUTFIT EVER" s={pop(f, uncool)} size={50} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, planet, 6)}><text x={820} y={640} fill={BRICK} style={{ font: '400 120px "Bebas Neue"' }} transform="rotate(-10 820 640)">!!!</text></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Meter x={290} y={760} v={lerp(0, 0.5, easeOut(span(f, half, half + 14)))} label="THEY GUESSED" tone={BRICK} big={f >= half ? '~50%' : ''} s={pop(f, guessed)} />
        <g opacity={on(f, real, 6)}><Meter x={790} y={760} v={lerp(0, 0.25, easeOut(span(f, quarter, quarter + 14)))} label="REALLY NOTICED" tone={TEAL} big={f >= quarter ? '~25%' : ''} s={pop(f, real)} /></g>
        <g opacity={on(f, twice, 6)}><Tag x={CX} y={1100} text="2× MORE VISIBLE THAN REAL" s={pop(f, twice)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, noticed, 6) * (1 - on(f, real, 6))}><Shirt x={790} y={780} s={0.6} /></g>
      </g>}
      <Headline text={f < s8 ? 'THE T-SHIRT TEST' : f < s10 ? 'GUESS VS REAL' : 'HALF AS WATCHED'} o={f < s8 ? on(f, tested, 8) * (1 - on(f, s8 - 4, 4)) : f < s10 ? on(f, guessed, 8) * (1 - on(f, s10 - 4, 4)) : on(f, visible, 8)} color={INK} />
      <SVg id="sps" />
    </g>
  )
}

export const SP_HOOK = makePiece('sp-hook', 'Spotlight: the trip nobody noticed', {
  beats: ['s1:walk', 's1:room', 's1:trip', 's1:nothing', 's1:face', 's1:hot', 's2', 's2:rest', 's2:everyone', 's2:saw', 's2:why', 's3', 's3:replayed', 's3:bed', 's3:most', 's3:notice', 's4', 's4:few', 's4:forgotten', 's4b', 's4b:believe', 's4b:standing', 's4b:spotlight', 's4b:nobody', 's4b:see'],
  sfx: [['s1:trip', 'thud'], ['s1:hot', 'impact'], ['s3:replayed', 'swish'], ['s3:notice', 'pop'], ['s4:forgotten', 'softpop'], ['s4b:see', 'ding']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const SP_SHIRT = makePiece('sp-shirt', 'Spotlight: the Barry Manilow T-shirt study', {
  beats: ['s5', 's5:cornell', 's5:tested', 's5:tshirt', 's6', 's6:put', 's6:photo', 's6:barry', 's6:walk', 's6:full', 's7', 's7:uncool', 's7:planet', 's8', 's8:guessed', 's8:half', 's8:noticed', 's9', 's9:real', 's9:quarter', 's10', 's10:twice', 's10:visible'],
  sfx: [['s5:tshirt', 'pop'], ['s6:barry', 'ding'], ['s7:uncool', 'impact'], ['s8:half', 'tick'], ['s9:quarter', 'tick'], ['s10:twice', 'ding']],
  Component: ShirtPiece, mood: 'light', canvas: 'tall',
})
