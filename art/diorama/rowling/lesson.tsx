// ---------------------------------------------------------------- s18–s24: what it means for you.
// A) back to him (you), holding his own letters. HURT stays on (a bruise-red tag) but a big QUIT button is reached
//    for by the letters — he puts his hand over it: THE DECISION IS YOURS. B) ROCK BOTTOM: a stone slab; bricks stack
//    on it into a little house: A SOLID FOUNDATION. C) one NO letter shrinks to a sticky: 1 OPINION · 1 DAY; a judge's
//    gavel marked VERDICT is crossed out. D) his letters fly in — JOBS, SCHOOLS, PEOPLE — NOT FAILING; a big open book
//    on CHAPTER 1 (EARLY IN THE STORY); he turns the page and a gold YES glows on the next one.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Edinburgh, Headline, NoLetter, Person, RVig, Tag, win, CREAM, GOLD, GOLD_L, INK, BURG, NAVY, PAPER, RED, SLATE, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Lesson: React.FC<PieceProps> = ({ f, c }) => {
  const matters = c('s18:matters')
  const s19 = c('s19'), hurting = c('s19:hurting'), made2 = c('s19:made'), decision = c('s19:decision')
  const s20 = c('s20'), rock = c('s20:rock'), solid = c('s20:solid'), rebuilt = c('s20:rebuilt'), life = c('s20:life')
  const s21 = c('s21'), opinion = c('s21:opinion'), day = c('s21:day'), verdict = c('s21:verdict')
  const s22 = c('s22'), collecting = c('s22:collecting'), jobs = c('s22:jobs'), schools = c('s22:schools'), people = c('s22:people'), failing = c('s22:failing')
  const s23 = c('s23'), early = c('s23:early'), story = c('s23:story')
  const s24 = c('s24'), page = c('s24:page'), open = c('s24:open'), yes = c('s24:yes'), away = c('s24:away')

  const A = win(f, 0, s20 + 4), B = win(f, s20, s21 + 4), C = win(f, s21, s22 + 4), D = on(f, s22, 10)
  const heroA: Beat[] = [[0, 'idle', 'neutral'], [matters, 'point', 'neutral'], [hurting, 'holdChest', 'worried'], [made2, 'stop', 'neutral'], [decision, 'confident', 'smiling']]
  const heroD: Beat[] = [[s22, 'idle', 'worried'], [failing, 'crossNoA', 'neutral'], [early, 'present', 'smiling'], [open, 'pull', 'smiling'], [yes, 'celebrate', 'smiling']]
  const bricks = Array.from({ length: 10 }, (_, k) => ({ x: 560 + (k % 4) * 110 - (Math.floor(k / 4) % 2) * 55, y: GROUND - 200 - Math.floor(k / 4) * 62, at: lerp(solid, life + 10, k / 9) }))
  const turn = easeOut(span(f, open, yes))

  return (
    <g>
      <Edinburgh id="rwl" f={f} rain={0} warm={0.6} />
      {/* # A) hurt is allowed; the decision is yours */}
      {A > 0.001 && <g opacity={A}>
        {[0, 1, 2].map((k) => <NoLetter key={k} x={760 + k * 40} y={700 + k * 30} s={0.6} r={-10 + k * 10} o={on(f, k * 6, 6)} />)}
        <g opacity={on(f, hurting, 6)}><Tag x={760} y={480} text="IT STILL HURTS" s={pop(f, hurting)} size={52} fill="#E8A0A0" /></g>
        <g transform={`translate(760 1080) scale(${pop(f, made2)})`} opacity={on(f, made2, 6)}>
          <ellipse cx={0} cy={20} rx={150} ry={40} fill="#6A2020" /><ellipse rx={150} ry={40} fill={RED} stroke={INK} strokeWidth={6} />
          <text y={14} textAnchor="middle" fill={CREAM} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 6 }}>QUIT</text>
          <path d={`M-120 ${-30 - 60 * (1 - on(f, decision, 8))} L120 ${-30 - 60 * (1 - on(f, decision, 8))}`} stroke={INK} strokeWidth={0} />
        </g>
        <g opacity={on(f, decision, 6)}><rect x={590} y={990} width={340} height={70} rx={20} fill={NAVY} stroke={INK} strokeWidth={6} /><text x={760} y={1038} textAnchor="middle" fill={GOLD} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>NOT THEIRS TO PRESS</text></g>
        <g opacity={on(f, decision, 6)}><Tag x={760} y={480} text="YOUR DECISION" s={pop(f, decision)} size={60} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroA} x={300} s={0.88} />
      </g>}
      {/* # B) rock bottom becomes the foundation */}
      {B > 0.001 && <g opacity={B}>
        <rect x={480} y={GROUND - 150} width={520} height={150} rx={10} fill={SLATE.stone2} stroke={INK} strokeWidth={6} />
        <g opacity={on(f, rock, 6)}><text x={740} y={GROUND - 54} textAnchor="middle" fill={CREAM} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>ROCK BOTTOM</text></g>
        {bricks.map((b, k) => <rect key={k} x={b.x} y={b.y - (1 - easeOut(span(f, b.at, b.at + 6))) * 200} width={104} height={56} rx={6} fill="#C8743F" stroke={INK} strokeWidth={4} opacity={on(f, b.at, 4)} />)}
        <g opacity={on(f, life, 6)}><path d={`M540 ${GROUND - 390} L760 ${GROUND - 540} L980 ${GROUND - 390} Z`} fill={BURG} stroke={INK} strokeWidth={6} /></g>
        <g opacity={on(f, solid, 6)}><Tag x={740} y={480} text="A SOLID FOUNDATION" s={pop(f, solid)} size={56} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={[[s20, 'carry', 'neutral'], [rebuilt, 'hold', 'smiling'], [life, 'present', 'smiling']]} x={260} s={0.88} />
      </g>}
      {/* # C) one opinion, one day — not a verdict */}
      {C > 0.001 && <g opacity={C}>
        <NoLetter x={740} y={760} s={lerp(1.1, 0.45, easeOut(span(f, opinion, day + 10)))} r={-6} />
        <g opacity={on(f, opinion, 6)} transform={`translate(740 980) rotate(-3) scale(${pop(f, opinion)})`}><rect x={-200} y={-60} width={400} height={120} fill="#FFE98A" stroke={INK} strokeWidth={5} /><text y={16} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"' }}>{f >= day ? '1 OPINION · 1 DAY' : '1 OPINION'}</text></g>
        <g opacity={on(f, verdict, 6)} transform={`translate(740 520) scale(${pop(f, verdict)})`}>
          <rect x={-110} y={-40} width={160} height={80} rx={12} fill="#8A5A3C" stroke={INK} strokeWidth={5} transform="rotate(-20)" /><rect x={-14} y={-10} width={160} height={20} rx={8} fill="#6B4A3A" transform="rotate(-20)" />
          <text x={0} y={100} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>VERDICT</text>
          <path d="M-160 -100 L160 140" stroke="#D2463C" strokeWidth={16} strokeLinecap="round" opacity={on(f, verdict + 8, 6)} />
        </g>
        <Person f={f} who="hero" beats={[[s21, 'think', 'thinking'], [verdict, 'crossNoA', 'smiling']]} x={260} s={0.88} />
      </g>}
      {/* # D) early in the story; the page turns to YES */}
      {D > 0.001 && <g opacity={D}>
        {([['JOBS', jobs], ['SCHOOLS', schools], ['PEOPLE', people]] as const).map(([t, at], k) => (
          <g key={t} opacity={on(f, at, 5) * (1 - on(f, s23, 8))}><NoLetter x={600 + k * 160} y={720} s={0.55 * pop(f, at)} r={-8 + k * 8} /><text x={600 + k * 160} y={880} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>{t}</text></g>
        ))}
        <g opacity={on(f, failing, 6) * (1 - on(f, s23, 6))}><Tag x={760} y={480} text="NOT FAILING" s={pop(f, failing)} size={62} fill={GOLD} /></g>
        {/* # the open book */}
        <g opacity={on(f, s23, 8)} transform="translate(740 840)">
          <path d="M0 0 Q-130 -40 -280 -10 L-280 -330 Q-130 -360 0 -320 Z" fill={PAPER} stroke={INK} strokeWidth={6} />
          <path d="M0 0 Q130 -40 280 -10 L280 -330 Q130 -360 0 -320 Z" fill="#FFFDF6" stroke={INK} strokeWidth={6} />
          <text x={-140} y={-250} textAnchor="middle" fill={NAVY} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>CHAPTER 1</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-240} y={-200 + k * 40} width={190} height={8} rx={4} fill={INK} opacity={0.2} />)}
          <g opacity={on(f, yes, 6)}><circle cx={140} cy={-170} r={110} fill={GOLD_L} opacity={0.6} /><text x={140} y={-140} textAnchor="middle" fill={GOLD} style={{ font: '400 110px "Bebas Neue"', letterSpacing: 6 }} stroke={INK} strokeWidth={2}>YES</text></g>
          {/* # the turning page */}
          {turn > 0 && turn < 1 && <path d={`M0 -320 Q${130 * (1 - 2 * turn)} -360 ${280 * (1 - 2 * turn)} -330 L${280 * (1 - 2 * turn)} -10 Q${130 * (1 - 2 * turn)} -40 0 0 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={5} />}
        </g>
        <g opacity={on(f, early, 6) * (1 - on(f, s24, 6))}><Tag x={740} y={480} text="EARLY IN THE STORY" s={pop(f, early)} size={56} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, page, 6) * (1 - on(f, yes, 6))}><Tag x={740} y={480} text="KEEP THE PAGE OPEN" s={pop(f, page)} size={52} /></g>
        <g opacity={on(f, away, 6)}><Tag x={740} y={480} text="ONE MORE TRY" s={pop(f, away)} size={66} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={heroD} x={260} s={0.88} />
      </g>}
      <Headline text={f < s20 ? 'WHY SHE MADE IT' : f < s21 ? 'REBUILD' : f < s22 ? 'NOT A VERDICT' : f < s23 ? '' : 'YOUR STORY'} o={f < s20 ? on(f, s19, 8) * (1 - on(f, s20 - 4, 4)) : f < s21 ? on(f, rock, 8) * (1 - on(f, s21 - 4, 4)) : f < s22 ? on(f, verdict, 8) * (1 - on(f, s22 - 4, 4)) : f < s23 ? 0 : on(f, story, 8)} color={INK} />
      <RVig id="rwl" />
    </g>
  )
}

export const RW_LESSON = makePiece('rw-lesson', 'Rowling: your decision, rock bottom as a foundation, early in the story', {
  beats: ['s18', 's18:matters', 's19', 's19:hurting', 's19:let', 's19:made', 's19:decision', 's20', 's20:rock', 's20:solid', 's20:rebuilt', 's20:life', 's21', 's21:opinion', 's21:day', 's21:verdict', 's22', 's22:collecting', 's22:jobs', 's22:schools', 's22:people', 's22:failing', 's23', 's23:early', 's23:story', 's24', 's24:page', 's24:open', 's24:yes', 's24:away'],
  sfx: [['s19:decision', 'thud'], ['s20:solid', 'thump'], ['s21:verdict', 'swish'], ['s22:jobs', 'pop'], ['s22:schools', 'pop'], ['s22:people', 'pop'], ['s24:open', 'flutter'], ['s24:yes', 'chime']],
  Component: Lesson, mood: 'light', canvas: 'tall',
})
