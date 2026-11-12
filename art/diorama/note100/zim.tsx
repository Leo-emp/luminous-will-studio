// ---------------------------------------------------------------- s20–s25: when step three breaks — Zimbabwe, 2008.
// Dark vault-green night. A) a note resting on three numbered pillars; on "breaks" pillar 3 cracks and the note
//    tips. B) a 2008 calendar page, a ZIMBABWE ribbon, a big press that runs faster and faster, spewing notes into a
//    growing heap; NOV; a price tag ×2 and a clock whose hands race — EVERY ~25 HOURS. C) two loaves: today's and
//    tomorrow's, whose tag is nearly twice as big. D) a price line that shoots off the top of the frame on "peak",
//    the 79.6 BILLION % number, a 1-MONTH page. E) the chain from step two snaps; a shopkeeper refuses a
//    ZIMBABWE DOLLAR note. F) nobody takes it — the notes drain to grey paper and blow away.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { NoteWorld, Vig, Headline, Ribbon, Note, Pillar, Press, CalPage, Clock, Tag, Loaf, Chain, Glint, flyTo, win, CX, CREAM, GOLD, RED, TXT } from './kit'

const FLOOR = 1240, LIGHT = '#F4ECD8'

const Zim: React.FC<PieceProps> = ({ f, c }) => {
  const s20 = c('s20'), step20 = c('s20:step'), three = c('s20:three'), breaks = c('s20:breaks')
  const s21 = c('s21'), y2008 = s21 + 6, zimbabwe = c('s21:zimbabwe'), printed = c('s21:printed'), money = c('s21:money'), fast = c('s21:fast'), november = c('s21:november'), prices21 = c('s21:prices'), doubling = c('s21:doubling'), d25 = c('s21:25')
  const loaf = c('s22:loaf'), twice = c('s22:twice'), tomorrow = c('s22:tomorrow'), today = c('s22:today')
  const peak = c('s23:peak'), rose = c('s23:rose'), d796 = c('s23:796'), billion = c('s23:billion'), single = c('s23:single'), month = c('s23:month')
  const s24 = c('s24'), two = c('s24:two'), broke = c('s24:broke'), refused = c('s24:refused'), zimDollar = c('s24:zimbabwe'), dollar = c('s24:dollar')
  const nobody = c('s25:nobody'), take25 = c('s25:take'), money25 = c('s25:money'), paper = c('s25:paper'), printedOn = c('s25:printed')

  const A = win(f, s20 - 4, s21 - 2), B = win(f, s21 - 2, c('s22') - 2), Cc = win(f, c('s22') - 2, c('s23') - 2), D = win(f, c('s23') - 2, s24 - 2), E = win(f, s24 - 2, c('s25') - 2), F = on(f, c('s25') - 2, 7)
  const crack = on(f, breaks, 12), tip = on(f, breaks + 6, 16)
  const speed = 1 + 4 * on(f, fast, 20)
  const heap = span(f, printed, d25 + 20)
  const keeper: Beat[] = [[s24 - 2, 'idle', 'neutral'], [refused, 'stop', 'angry'], [dollar + 6, 'armsCrossed', 'angry']]
  const you: Beat[] = [[s24 - 2, 'offer', 'worried'], [refused + 10, 'shrug', 'worried']]
  const drain = on(f, paper - 10, 24), blow = on(f, printedOn, 40)

  return (
    <g>
      <NoteWorld f={f} id="nb-zim" dark floor={FLOOR} />
      {/* # A) step three breaks */}
      {A > 0.001 && <g opacity={A}>
        {[1, 2, 3].map((n, i) => <g key={n} opacity={on(f, s20 - 4 + i * 3, 6)}><Pillar x={240 + i * 260} y={FLOOR} h={i === 2 ? lerp(520, 470, tip) : 520} t={`STEP ${n}`} crack={i === 2 ? crack : 0} col={i === 2 && f >= breaks ? '#F2D5CC' : CREAM} /></g>)}
        <g transform={`rotate(${lerp(0, 9, tip)} 300 ${FLOOR - 560})`}><Note x={CX} y={FLOOR - 560 - 128 * 0.9} s={0.9} f={f} /></g>
        <Glint f={f} at={step20} x={760} y={FLOOR - 300} col={GOLD} />
        <Glint f={f} at={three} x={760} y={FLOOR - 420} col={GOLD} />
      </g>}
      {/* # B) Zimbabwe, 2008: the press runs away */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, y2008, 6) * (1 - on(f, november, 6))}><CalPage x={240} y={560} t="2008" s={0.8 * pop(f, y2008)} r={-5} /></g>
        <g opacity={on(f, november, 6)}><CalPage x={240} y={560} t="NOV" sub="2008" s={0.8 * pop(f, november)} r={-5} /></g>
        <g opacity={on(f, zimbabwe, 6)}><Ribbon x={700} y={500} t="ZIMBABWE" size={56} col={GOLD} tc="#1B3D33" s={pop(f, zimbabwe)} /></g>
        <g opacity={on(f, printed, 8)}><Press x={330} y={FLOOR} s={0.78} f={f} speed={speed} dark /></g>
        {/* # notes shooting out of the press into a heap on the right */}
        {f >= money && Array.from({ length: 10 }, (_, i) => { const per = 24 / speed, ph = ((f - money) / per + i / 10) % 1
          const [x, y] = [lerp(500, 760 + ((i * 53) % 140) - 70, ph), lerp(FLOOR - 200, FLOOR - 120 - 260 * heap, ph) - Math.sin(Math.PI * ph) * 160]
          return <Note key={i} x={x} y={y} s={0.2} r={ph * 200 + i * 30} f={f} /> })}
        {Array.from({ length: Math.round(16 * heap) }, (_, i) => <Note key={`h${i}`} x={760 + ((i * 71) % 180) - 90} y={FLOOR - 30 - Math.floor(i / 3) * 34} s={0.24} r={((i * 41) % 40) - 20} f={f} />)}
        <g opacity={on(f, doubling, 6)}><Tag x={600} y={700} t="×2" s={0.9 * pop(f, doubling)} col="#F7D9C4" tc={RED} /></g>
        <g opacity={on(f, d25, 6)}><Clock x={810} y={760} f={f} speed={6} s={0.75 * pop(f, d25)} /></g>
        <g opacity={on(f, d25 + 4, 6)}><Ribbon x={700} y={940} t="EVERY ~25 HOURS" size={44} col={RED} /></g>
        <Glint f={f} at={prices21} x={600} y={650} col={GOLD} />
      </g>}
      {/* # C) a loaf today, nearly twice the price tomorrow */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, loaf, 6)}><Loaf x={290} y={1050} s={1.1 * pop(f, loaf)} /><Tag x={200} y={830} t="$" s={0.8} /></g>
        <g opacity={on(f, twice, 6)}><Loaf x={720} y={1050} s={1.1 * pop(f, twice)} /><Tag x={630} y={800} t="≈ ×2" s={1.15 * pop(f, twice)} col="#F7D9C4" tc={RED} /></g>
        <g opacity={on(f, tomorrow, 6)}><Ribbon x={720} y={1140} t="TOMORROW" size={44} col={RED} /></g>
        <g opacity={on(f, today, 6)}><Ribbon x={290} y={1140} t="TODAY" size={44} col="#3E7A5E" /></g>
      </g>}
      {/* # D) at the peak: 79.6 billion percent in one month */}
      {D > 0.001 && <g opacity={D}>
        {(() => { const t = on(f, peak, 30) + on(f, d796, 20), pts: string[] = []
          for (let i = 0; i <= 40; i++) { const x = 120 + i * 19, k = i / 40, y = FLOOR - 60 - Math.pow(k, 6) * 1300 * Math.min(1, t) ; pts.push(`${x},${y.toFixed(1)}`) }
          return <g>
            <line x1={110} y1={FLOOR - 60} x2={900} y2={FLOOR - 60} stroke="#3F7362" strokeWidth={5} />
            <polyline points={pts.join(' ')} fill="none" stroke={RED} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" opacity={on(f, peak, 6)} />
          </g> })()}
        <g opacity={on(f, d796, 6)}>
          <text x={CX - 40} y={760} textAnchor="middle" fill={GOLD} style={TXT(190 * pop(f, d796))}>79.6</text>
          <text x={CX - 40} y={880} textAnchor="middle" fill={LIGHT} style={TXT(96)} opacity={on(f, billion, 6)}>BILLION %</text>
        </g>
        <g opacity={on(f, month, 6)}><CalPage x={260} y={1060} t="1" sub="MONTH" s={0.72 * pop(f, month)} r={-4} /></g>
        <Glint f={f} at={rose} x={860} y={420} col={GOLD} />
        <Glint f={f} at={single} x={260} y={940} col={GOLD} />
      </g>}
      {/* # E) step two breaks too: the chain snaps, the note is refused */}
      {E > 0.001 && <g opacity={E}>
        <g opacity={1 - on(f, refused - 4, 8)}><Chain a={[140, 640]} b={[880, 640]} grow={1} glow={1} snap={on(f, broke, 10)} /></g>
        <g opacity={on(f, two, 6) * (1 - on(f, refused - 4, 8))}><Ribbon x={CX} y={800} t="STEP 2" size={52} col={GOLD} tc="#1B3D33" /></g>
        <g opacity={on(f, refused - 4, 8)}>
          <Person f={f} who="investorF" beats={you} x={250} y={FLOOR} s={0.74} />
          <Person f={f} who="owner" beats={keeper} x={760} y={FLOOR} s={0.74} />
          <Note x={hand(f, you, 250, FLOOR, 0.74).x + 30} y={hand(f, you, 250, FLOOR, 0.74).y - 50} s={0.34} r={-6} f={f} label="Z$" />
          <g opacity={on(f, zimDollar, 6)}><Ribbon x={420} y={640} t="ZIMBABWE DOLLAR" size={44} col={GOLD} tc="#1B3D33" /></g>
        </g>
      </g>}
      {/* # F) nobody takes it: the notes go grey and blow away like scrap paper */}
      {F > 0.001 && <g opacity={F}>
        {Array.from({ length: 9 }, (_, i) => { const bx = 220 + (i % 3) * 280, by = 640 + Math.floor(i / 3) * 210
          const dx = blow * (500 + i * 60), dy = -blow * (120 + (i % 4) * 60) + Math.sin((f + i * 13) / 10) * 8 * blow
          return <Note key={i} x={bx + dx} y={by + dy} s={0.36} r={((i * 29) % 24) - 12 + blow * (90 + i * 20)} f={f} label="Z$" fade={drain} o={on(f, c('s25') - 2 + i, 6) * (1 - on(f, printedOn + 30, 12))} /> })}
        <g opacity={on(f, nobody, 6) * (1 - on(f, money25, 8))}><Ribbon x={CX} y={1160} t="NOBODY TAKES IT" size={48} col={RED} /></g>
        <Glint f={f} at={take25} x={CX} y={600} col={GOLD} />
      </g>}
      <Vig id="nb-zim" k={0.4} />
      <Headline f={f} lines={[[breaks, 'WHEN STEP 3 BREAKS', LIGHT, 96], [zimbabwe, 'ZIMBABWE, 2008', GOLD, 104], [doubling, 'PRICES DOUBLING', LIGHT, 104], [loaf, 'A LOAF OF BREAD', LIGHT, 104], [peak, 'AT THE PEAK', LIGHT, 110], [single, 'IN ONE MONTH', GOLD, 110], [two, 'STEP 2 BROKE TOO', LIGHT, 100], [refused, 'PEOPLE REFUSED IT', RED, 100], [paper, 'JUST PAPER', LIGHT, 120]]} />
    </g>
  )
}

export const NB_ZIM = makePiece('nb-zim', 'Zimbabwe 2008 on a dark vault-green banknote night: a note resting on three cream pillars marked STEP 1/2/3 — pillar 3 cracks and sinks and the note tips; a 2008 calendar page (then NOV), a gold ZIMBABWE ribbon, a big grey printing press whose rollers spin faster and faster while notes shoot out into a growing heap; a ×2 price tag and a clock with racing hands (EVERY ~25 HOURS); two loaves of bread, TODAY with a small tag and TOMORROW with a ≈ ×2 tag; a red price line that shoots off the top of the frame, the gold 79.6 BILLION % number and a 1 MONTH page; the gold chain from step two snaps; a shopkeeper raises a stop hand at a Z$ note (ZIMBABWE DOLLAR) and folds her arms; finally nine Z$ notes drain to grey and blow away like scrap paper (NOBODY TAKES IT).', {
  canvas: 'tall', mood: 'dark', Component: Zim,
  beats: ["s20", "s20:step", "s20:three", "s20:breaks", "s21", "s21:zimbabwe", "s21:printed", "s21:money", "s21:fast", "s21:november", "s21:prices", "s21:doubling", "s21:25", "s22:loaf", "s22:twice", "s22:tomorrow", "s22:today", "s23:peak", "s23:rose", "s23:796", "s23:billion", "s23:single", "s23:month", "s24", "s24:two", "s24:broke", "s24:refused", "s24:zimbabwe", "s24:dollar", "s25:nobody", "s25:take", "s25:money", "s25:paper", "s25:printed", "s22", "s23", "s25"],
  sfx: [['s20:breaks', 'crack', 0.3], ['s21:fast', 'riser', 0.2], ['s23:796', 'impact', 0.3], ['s24:broke', 'crack', 0.3], ['s25:printed', 'flutter', 0.25]] })
