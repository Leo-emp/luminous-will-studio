// ---------------------------------------------------------------- s19–s21: park it; s22–s27: tonight.
// PARK) loops fly into an open notebook and each ring closes (mint) as it lands; the notebook shuts and a little
//    padlock clicks: HELD SOMEWHERE SAFE. A PLAN stamp lands on a loop and the popping-up loops thin out from six
//    to one. On "solve" a puzzle is crossed out; on "park" the loops sit in a car park, bays marked P.
// TONIGHT) back in the attic: the notebook on the nightstand; he writes tomorrow's list — DEAL WITH WORK is struck,
//    SEND THE REPORT BEFORE LUNCH replaces it. Lamp off. A new loop pops up at night; he writes it down, shuts the
//    book: TOMORROW'S JOB. NOT YOUR ENEMY → the loops rest in the book, he lies down, the stars come out: REST.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Attic, BedBack, BedFront, Headline, Lamp, Loop, NoteBook, NVig, Person, Tag, win, AMBER, CREAM, GOLD, INK, BURG, MINT, MINT_D, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Park: React.FC<PieceProps> = ({ f, c }) => {
  const s19 = c('s19'), writing = c('s19:writing'), down = c('s19:down'), loop = c('s19:loop'), held = c('s19:held'), safe = c('s19:safe')
  const s20 = c('s20'), experiments = c('s20:experiments'), plan = c('s20:plan'), unfinished = c('s20:unfinished'), cut = c('s20:cut'), popping = c('s20:popping')
  const s21 = c('s21'), solve = c('s21:solve'), tonight = c('s21:tonight'), park = c('s21:park')

  const A = win(f, 0, s20 + 4), B = win(f, s20, s21 + 4), C = on(f, s21, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [writing, 'type', 'neutral'], [held, 'present', 'smiling'], [s20, 'explain', 'neutral'], [plan, 'point', 'smiling'], [cut, 'nodA', 'smiling'], [s21, 'idle', 'neutral'], [solve, 'crossNoA', 'neutral'], [park, 'taDa', 'smiling']]
  const flyIn = (k: number) => easeOut(span(f, writing + k * 6, writing + k * 6 + 16))
  const left = f < cut ? 6 : Math.max(1, Math.round(lerp(6, 1, span(f, cut, popping + 14))))

  return (
    <g>
      <Attic id="nmp" f={f} lamp={0.8} />
      {/* # A) into the notebook, rings close, book locks */}
      {A > 0.001 && <g opacity={A}>
        <NoteBook x={700} y={900} s={0.9} open={1 - on(f, held, 8)} />
        {[0, 1, 2].map((k) => { const t = flyIn(k)
          return <Loop key={k} f={f} seed={k + 20} x={lerp(300 + k * 260, 700, t)} y={lerp(520, 900, t)} s={lerp(0.6, 0.3, t)} o={on(f, s19, 6) * (1 - on(f, held, 6))} close={t} />
        })}
        <g opacity={on(f, held, 6)} transform={`translate(700 900) scale(${pop(f, held)})`}>
          <rect x={-50} y={-20} width={100} height={80} rx={12} fill={GOLD} stroke={INK} strokeWidth={6} />
          <path d={`M-30 -20 L-30 ${-50 + 0 * on(f, safe, 4)} Q0 -90 30 -50 L30 ${-20 - 14 * (1 - on(f, safe, 4))}`} stroke={INK} strokeWidth={10} fill="none" />
        </g>
        <g opacity={on(f, safe, 6)}><Tag x={700} y={560} text="HELD SOMEWHERE SAFE" s={pop(f, safe)} size={52} fill={MINT} ink={INK} /></g>
        <Person f={f} who="hero" beats={hero} x={230} s={0.9} />
      </g>}
      {/* # B) a specific plan cuts the pop-ups */}
      {B > 0.001 && <g opacity={B}>
        {Array.from({ length: 6 }, (_, k) => <Loop key={k} f={f} seed={k + 30} x={480 + (k % 3) * 200} y={620 + Math.floor(k / 3) * 300} s={0.55} o={on(f, s20 + k * 2, 4) * (k < left ? 1 : 1 - on(f, cut + (5 - k) * 4, 6))} close={k === 0 ? on(f, plan, 8) : 0} />)}
        <g opacity={on(f, plan, 4)} transform={`translate(480 620) rotate(-14) scale(${lerp(1.6, 1, easeOut(span(f, plan, plan + 6)))})`}>
          <rect x={-90} y={-40} width={180} height={80} rx={10} fill="none" stroke={MINT} strokeWidth={9} />
          <text y={22} textAnchor="middle" fill={MINT} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 8 }}>PLAN</text>
        </g>
        <g opacity={on(f, popping, 6)}><Tag x={CX} y={460} text="FEWER POP-UPS" s={pop(f, popping)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, experiments, 6) * (1 - on(f, popping, 6))}><Tag x={CX} y={460} text="MORE EXPERIMENTS" s={pop(f, experiments)} size={50} /></g>
        <Person f={f} who="hero" beats={hero} x={230} s={0.9} />
      </g>}
      {/* # C) don't solve it, park it */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, solve, 6) * (1 - on(f, park, 6))} transform={`translate(720 700) scale(${pop(f, solve)})`}>
          {[[-60, -60], [60, -60], [-60, 60], [60, 60]].map(([x, y], k) => <rect key={k} x={x - 56} y={y - 56} width={112} height={112} rx={10} fill={[AMBER, MINT, CREAM, GOLD][k]} stroke={INK} strokeWidth={6} />)}
          <path d="M-150 -150 L150 150" stroke="#D2463C" strokeWidth={16} strokeLinecap="round" opacity={on(f, tonight, 6)} />
        </g>
        <g opacity={on(f, park, 6)}>
          <rect x={360} y={GROUND - 90} width={680} height={90} fill="#3C4170" />
          {[0, 1, 2].map((k) => <g key={k}>
            <rect x={400 + k * 220} y={GROUND - 80} width={8} height={80} fill={CREAM} />
            <text x={500 + k * 220} y={GROUND - 120} textAnchor="middle" fill={CREAM} style={{ font: '400 50px "Bebas Neue"' }}>P</text>
            <Loop f={f} seed={k + 40} x={505 + k * 220} y={GROUND - 260} s={0.5 * pop(f, park + k * 3)} o={on(f, park + k * 3, 4)} close={1} />
          </g>)}
          <Tag x={700} y={560} text="PARK IT" s={pop(f, park) * 1.2} size={80} fill={GOLD} />
        </g>
        <Person f={f} who="hero" beats={hero} x={230} s={0.9} />
      </g>}
      <Headline text={f < s20 ? 'WRITE IT DOWN' : f < s21 ? 'MAKE A PLAN' : 'SOLVE? NO.'} o={f < s20 ? on(f, writing, 8) * (1 - on(f, s20 - 4, 4)) : f < s21 ? on(f, plan, 8) * (1 - on(f, s21 - 4, 4)) : on(f, solve, 8) * (1 - on(f, park - 2, 4))} color={CREAM} />
      <NVig id="nmp" />
    </g>
  )
}

const Tonight: React.FC<PieceProps> = ({ f, c }) => {
  const s22 = c('s22'), notebook = c('s22:notebook'), bed = c('s22:bed')
  const s23 = c('s23'), light = c('s23:light'), write = c('s23:write'), list = c('s23:list'), specific = c('s23:specific'), deal = c('s23:deal'), report = c('s23:report'), lunch = c('s23:lunch')
  const s24 = c('s24'), thought = c('s24:thought'), middle = c('s24:middle'), argue = c('s24:argue')
  const s25 = c('s25'), write25 = c('s25:write'), close = c('s25:close'), job = c('s25:job')
  const s26 = c('s26'), enemy = c('s26:enemy'), scared = c('s26:scared'), forget = c('s26:forget')
  const s27 = c('s27'), page = c('s27:page'), worry = c('s27:worry'), rest = c('s27:rest')

  const lampLit = f < s24 ? 1 : 1 - on(f, s24 - 10, 8)
  const writing = (f >= write && f < s24) || (f >= write25 && f < close)
  const items = ['DEAL WITH WORK', 'SEND THE REPORT BEFORE LUNCH', 'BUY MILK ON THE WAY HOME', 'CALL GRANDMA AT 6']
  const written = f < list ? 0 : f < specific ? 1 : f < report ? 1 : f < s24 ? 4 : f < write25 ? 4 : 5
  // # the night: he sits up for the new thought, then lies down to rest (sleeper bump in the bed)
  const lying = on(f, s27, 12)
  const hero: Beat[] = [[s22, 'sit', 'neutral'], [notebook, 'sit', 'smiling'], [write, 'sit', 'thinking'], [s24, 'sit', 'neutral'], [thought, 'sit', 'shocked'], [argue, 'sit', 'neutral'], [write25, 'sit', 'thinking'], [job, 'sit', 'smiling'], [enemy, 'sit', 'smiling']]

  return (
    <g>
      <Attic id="nmt" f={f} lamp={lampLit} />
      <BedBack x={520} />
      <Lamp x={110} lit={lampLit} />
      <g opacity={1 - lying}><Person f={f} who="hero" beats={hero} x={330} y={GROUND - 170} s={0.85} /></g>
      <BedFront x={520} bump={lying} up={1 - lying} />
      {/* # sleeping head on the pillow once he lies down */}
      <g opacity={lying}><circle cx={-110 + 520 + 10} cy={GROUND - 250} r={44} fill="#8A5A3C" stroke={INK} strokeWidth={5} /><path d={`M${420 - 36} ${GROUND - 262} q10 6 20 0 M${420 + 4} ${GROUND - 262} q10 6 20 0`} stroke={INK} strokeWidth={4} fill="none" /></g>
      {/* # the notebook on the nightstand, then big while he writes */}
      <g opacity={on(f, notebook, 6)}>
        <NoteBook x={writing ? 720 : 110} y={writing ? 700 : GROUND - 225} s={writing ? 1.2 : 0.25} open={f >= close && f < s26 ? 1 - on(f, close, 6) : f >= s26 ? 0 : 1} items={[...items, 'IDEA: ASK FOR FEEDBACK']} written={written} strike={f >= deal ? 0 : -1} />
      </g>
      <g opacity={on(f, specific, 6) * (1 - on(f, s24, 6))}><Tag x={720} y={460} text="BE SPECIFIC" s={pop(f, specific)} size={56} fill={GOLD} /></g>
      {/* # a new thought in the night */}
      <Loop f={f} seed={50} x={760} y={560} s={0.7 * pop(f, thought)} o={on(f, thought, 6) * (1 - on(f, write25 + 6, 8))} label="NEW THOUGHT" loud={on(f, middle, 6) * (1 - on(f, argue, 6))} />
      <g opacity={on(f, argue, 6) * (1 - on(f, s25, 6))}><Tag x={720} y={980} text="DON'T ARGUE. WRITE." s={pop(f, argue)} size={52} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, job, 6) * (1 - on(f, s26, 8))}><Tag x={720} y={560} text="TOMORROW'S JOB" s={pop(f, job)} size={64} fill={MINT} ink={INK} /></g>
      <g opacity={on(f, enemy, 6) * (1 - on(f, s27, 8))}><Tag x={720} y={560} text={f >= scared ? 'IT JUST FEARS YOU FORGET' : 'NOT YOUR ENEMY'} s={pop(f, f >= scared ? scared : enemy)} size={f >= scared ? 44 : 60} /></g>
      {/* # rest: the closed loops sleep in the book, zzz */}
      <g opacity={on(f, page, 8)}>
        {[0, 1, 2].map((k) => <text key={k} x={560 + k * 50} y={GROUND - 320 - k * 60 - ((f - page) % 60)} fill={CREAM} opacity={0.8 * on(f, page + k * 8, 8)} style={{ font: `400 ${70 - k * 14}px "Bebas Neue"` }}>Z</text>)}
        <g opacity={on(f, rest, 8)}><Tag x={720} y={560} text="REST" s={pop(f, rest) * 1.2} size={96} fill={GOLD} /></g>
        <g opacity={on(f, worry, 6) * (1 - on(f, rest, 6))}><Tag x={720} y={560} text="THE PAGE HOLDS IT" s={pop(f, worry)} size={54} fill={MINT} ink={INK} /></g>
      </g>
      <Headline text={f < s24 ? "TOMORROW'S LIST" : f < s26 ? '2 AM? WRITE IT.' : ''} o={f < s24 ? on(f, light, 8) * (1 - on(f, s24 - 4, 4)) : f < s26 ? on(f, middle, 8) * (1 - on(f, s26 - 4, 4)) : 0} color={CREAM} />
      <NVig id="nmt" />
    </g>
  )
}

export const NM_PARK = makePiece('nm-park', 'Night mind: write it down, make a plan, park it', {
  beats: ['s19', 's19:writing', 's19:down', 's19:loop', 's19:held', 's19:safe', 's20', 's20:experiments', 's20:plan', 's20:unfinished', 's20:cut', 's20:popping', 's21', 's21:solve', 's21:tonight', 's21:park'],
  sfx: [['s19:held', 'click'], ['s20:plan', 'thud'], ['s21:park', 'ding']],
  Component: Park, mood: 'light', canvas: 'tall',
})
export const NM_TONIGHT = makePiece('nm-tonight', 'Night mind: tonight — the list, the 2 a.m. thought, rest', {
  beats: ['s22', 's22:notebook', 's22:bed', 's23', 's23:light', 's23:write', 's23:list', 's23:specific', 's23:deal', 's23:report', 's23:lunch', 's24', 's24:thought', 's24:middle', 's24:argue', 's25', 's25:write', 's25:close', 's25:tell', 's25:yourself', 's25:job', 's26', 's26:enemy', 's26:scared', 's26:forget', 's27', 's27:page', 's27:worry', 's27:rest'],
  sfx: [['s22:notebook', 'softpop'], ['s23:deal', 'swish'], ['s24:thought', 'pop'], ['s25:close', 'thud'], ['s27:rest', 'chime']],
  Component: Tonight, mood: 'light', canvas: 'tall',
})
