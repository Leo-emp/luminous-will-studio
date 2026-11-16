// ---------------------------------------------------------------- s1–s3 hook; s4–s8 rock bottom.
// HOOK) a manuscript on a rainy street; NO stamps thud onto it one after another while he (you) flinches. "Picture
//    this": an empty wallet, a pram, the manuscript — NO again. Reveal: she steps out holding the pram: J.K. ROWLING.
// FALL) a delayed train (DELAYED board), she sits at the window and the idea arrives as a gold swirl. "Her life fell
//    apart": three tiles drop out of a little stone wall — a framed photo with a flower (her mother), a ring that
//    splits (the marriage), a suitcase and pram going to EDINBURGH; an empty purse with one coin. A quote card: POOR AS
//    YOU CAN BE · WITHOUT BEING HOMELESS, then "I HAD FAILED ON AN EPIC SCALE" (her words, labelled).
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Edinburgh, Headline, Idea, Manuscript, NameTag, NoLetter, Person, RVig, Tag, win, CREAM, GOLD, GOLD_L, INK, BURG, NAVY, PAPER, RED, SLATE, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Pram: React.FC<{ x: number; y?: number; s?: number }> = ({ x, y = GROUND, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-110 -170 Q-110 -260 -20 -260 L-20 -170 Z" fill={NAVY} stroke={INK} strokeWidth={5} />
    <rect x={-120} y={-170} width={220} height={80} rx={30} fill="#3E5A7A" stroke={INK} strokeWidth={5} />
    <path d="M100 -170 L150 -230" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    {[-70, 60].map((wx) => <circle key={wx} cx={wx} cy={-40} r={36} fill="none" stroke={INK} strokeWidth={8} />)}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const told = c('s1:told'), no = c('s1:no'), times = c('s1:times'), believe = c('s1:believe')
  const s2 = c('s2'), broke = c('s2:broke'), baby = c('s2:baby'), believe2 = c('s2:believe'), turned = c('s2:turned')
  const s3 = c('s3'), rowling = c('s3:rowling'), anyone = c('s3:anyone'), name = c('s3:name')

  const A = win(f, 0, s3 + 4), B = on(f, s3, 10)
  const stamps = [no, no + 6, times, times + 5, believe - 4, believe]
  const hero: Beat[] = [[0, 'idle', 'neutral'], [no, 'nervous', 'worried'], [times, 'slump', 'worried'], [believe, 'despair', 'worried']]
  const her: Beat[] = [[s3, 'idle', 'neutral'], [rowling, 'present', 'smiling'], [name, 'confident', 'neutral']]

  return (
    <g>
      <Edinburgh id="rwh" f={f} />
      {A > 0.001 && <g opacity={A}>
        <Manuscript x={720} y={1000} s={1.1 * pop(f, told)} h={0.8} />
        {stamps.map((at, k) => <NoLetter key={k} x={660 + (k % 3) * 70} y={720 + Math.floor(k / 3) * 90} s={lerp(1.5, 0.75, easeOut(span(f, at, at + 5)))} r={-12 + k * 6} o={on(f, at, 3) * (1 - on(f, s2, 8))} />)}
        {/* # picture this: an empty wallet, a pram, the book turned down again */}
        <g opacity={on(f, broke, 6) * (1 - on(f, s3, 8))} transform={`translate(330 600) scale(${pop(f, broke)})`}>
          <rect x={-110} y={-70} width={220} height={140} rx={18} fill="#6B4A3A" stroke={INK} strokeWidth={6} /><text y={16} textAnchor="middle" fill={CREAM} style={{ font: '400 50px "Bebas Neue"' }}>£0.00</text>
        </g>
        <g opacity={on(f, baby, 6) * (1 - on(f, s3, 8))}><Pram x={330} s={0.9 * pop(f, baby)} /></g>
        <g opacity={on(f, turned, 4) * (1 - on(f, s3, 8))}><NoLetter x={720} y={760} s={lerp(1.6, 1, easeOut(span(f, turned, turned + 6)))} r={8} /></g>
        <g opacity={on(f, believe2, 6) * (1 - on(f, turned, 4))}><Tag x={720} y={560} text="THE ONE THING" s={pop(f, believe2)} size={52} fill={GOLD} /></g>
        <g opacity={1 - on(f, broke, 6)}><Person f={f} who="hero-struggling" beats={hero} x={300} s={0.88} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Pram x={770} s={0.9} />
        <Person f={f} who="lib-rowling" beats={her} x={460} s={0.9} />
        <NameTag x={460} y={GROUND - 640} name="J.K. ROWLING" o={on(f, rowling, 6)} />
        <g opacity={on(f, anyone, 6)}><Tag x={CX} y={480} text="BEFORE ANYONE KNEW HER" s={pop(f, anyone)} size={52} fill={CREAM} ink={BURG} /></g>
      </g>}
      <Headline text={f < s3 ? 'NO. NO. NO.' : ''} o={f < s3 ? on(f, times, 8) * (1 - on(f, s2 - 4, 4)) : 0} color={INK} />
      <RVig id="rwh" />
    </g>
  )
}

const Fall: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), delayed = c('s4:delayed'), train = c('s4:train'), wizard = c('s4:wizard'), head = c('s4:head')
  const s5 = c('s5'), years = c('s5:years'), apart = c('s5:apart')
  const s6 = c('s6'), mother = c('s6:mother'), marriage = c('s6:marriage'), edinburgh = c('s6:edinburgh'), daughter = c('s6:daughter'), money = c('s6:money')
  const s7 = c('s7'), poor = c('s7:poor'), britain = c('s7:britain'), homeless = c('s7:homeless')
  const s8 = c('s8'), words = c('s8:words'), failed = c('s8:failed'), epic = c('s8:epic')

  const A = win(f, 0, s5 + 4), B = win(f, s5, s7 + 4), C = on(f, s7, 10)
  const sit: Beat[] = [[0, 'sit', 'neutral'], [delayed, 'sit', 'thinking'], [wizard, 'sit', 'smiling']]
  const walkB: Beat[] = [[s5, 'idle', 'worried'], [apart, 'slump', 'worried'], [mother, 'holdChest', 'worried'], [marriage, 'despair', 'worried'], [edinburgh, 'walkA', 'neutral'], [edinburgh + 8, 'walkB', 'neutral'], [edinburgh + 16, 'walkA', 'neutral'], [edinburgh + 24, 'walkB', 'neutral'], [money, 'emptyPockets', 'worried']]
  const herC: Beat[] = [[s7, 'idle', 'worried'], [poor, 'slump', 'worried'], [failed, 'despair', 'worried'], [epic, 'shrug', 'neutral']]
  const wallX = 760
  const tiles: [number, string][] = [[mother, 'photo'], [marriage, 'ring'], [edinburgh, 'case']]

  return (
    <g>
      {/* # A) the delayed train */}
      {A > 0.001 && <g opacity={A}>
        <rect width={1080} height={1920} fill="#C9B79A" />
        <rect x={0} y={420} width={1080} height={520} fill="#8FA3B8" />
        {[0, 1, 2].map((k) => <rect key={k} x={60 + k * 340} y={460} width={300} height={440} rx={30} fill={SLATE.sky[0]} stroke="#5A4A3A" strokeWidth={18} />)}
        {/* # fields outside, not moving (delayed) */}
        {[0, 1, 2].map((k) => <path key={k} d={`M${60 + k * 340} 780 Q${210 + k * 340} 720 ${360 + k * 340} 790 L${360 + k * 340} 900 L${60 + k * 340} 900 Z`} fill="#7FA36E" />)}
        <rect x={0} y={GROUND - 120} width={1080} height={120} fill="#7A3A30" />
        <rect x={0} y={GROUND} width={1080} height={680} fill="#5A4A3A" />
        <g opacity={on(f, delayed, 6)} transform={`translate(780 360) scale(${pop(f, delayed)})`}>
          <rect x={-170} y={-50} width={340} height={100} rx={10} fill={INK} /><text y={22} textAnchor="middle" fill="#FFB547" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 8 }}>DELAYED</text>
        </g>
        <Idea f={f} x={560} y={620} s={pop(f, wizard) * lerp(0.6, 1.1, span(f, wizard, head + 10))} o={on(f, wizard, 6)} />
        <g opacity={on(f, head, 6)}><Tag x={780} y={1050} text="AN IDEA ARRIVES" s={pop(f, head)} size={52} fill={GOLD} /></g>
        <Person f={f} who="lib-rowling" beats={sit} x={360} y={GROUND - 120} s={0.85} />
        {/* # the train seat in front of her legs, so she sits in it */}
        <rect x={190} y={GROUND - 290} width={340} height={170} rx={30} fill="#8E2A40" stroke={INK} strokeWidth={6} />
        <NameTag x={360} y={GROUND - 690} name="J.K. ROWLING" o={1 - on(f, wizard, 10) * 0.7} />
        <g opacity={on(f, train, 6) * (1 - on(f, wizard, 6))}><text x={780} y={1110} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>1990</text></g>
      </g>}
      {/* # B) the wall falls apart, one tile at a time */}
      {B > 0.001 && <g opacity={B}>
        <Edinburgh id="rwf" f={f} rain={0.8} />
        <g opacity={on(f, years, 6)}>
          {Array.from({ length: 9 }, (_, k) => {
            const col = k % 3, row = Math.floor(k / 3), drop = k === 1 ? span(f, mother, mother + 20) : k === 4 ? span(f, marriage, marriage + 20) : k === 6 ? span(f, edinburgh, edinburgh + 20) : k === 8 ? span(f, apart, apart + 16) : 0
            return <rect key={k} x={wallX - 240 + col * 160} y={460 + row * 120 + drop * 700} width={150} height={110} rx={8} fill={k % 2 ? SLATE.stone : SLATE.stone2} stroke={INK} strokeWidth={4} transform={`rotate(${drop * 40} ${wallX - 165 + col * 160} ${515 + row * 120})`} opacity={1 - drop * 0.5} />
          })}
        </g>
        {tiles.map(([at, kind], k) => <g key={kind} opacity={on(f, at, 6) * (1 - on(f, at + 46, 8))} transform={`translate(${wallX} 940) scale(${pop(f, at)})`}>
          <circle r={120} fill={PAPER} stroke={INK} strokeWidth={6} />
          {kind === 'photo' && <g><rect x={-56} y={-70} width={112} height={130} rx={6} fill="#D9C7A8" stroke={INK} strokeWidth={5} /><circle cy={-20} r={26} fill="#B98C6A" /><path d="M-30 50 Q0 10 30 50" fill="#8A6A52" /><circle cx={60} cy={60} r={14} fill={RED} /><path d="M60 74 L60 100" stroke="#4F7A5E" strokeWidth={5} /></g>}
          {kind === 'ring' && <g><path d="M-10 -50 A50 50 0 1 0 -10 50" stroke={GOLD} strokeWidth={16} fill="none" transform={`translate(${-12 * on(f, at + 10, 8)} 0)`} /><path d="M10 -50 A50 50 0 1 1 10 50" stroke={GOLD} strokeWidth={16} fill="none" transform={`translate(${12 * on(f, at + 10, 8)} 0)`} /></g>}
          {kind === 'case' && <g><rect x={-60} y={-40} width={120} height={90} rx={10} fill="#8A5A3C" stroke={INK} strokeWidth={5} /><rect x={-20} y={-60} width={40} height={24} rx={6} fill="none" stroke={INK} strokeWidth={6} /></g>}
        </g>)}
        <g opacity={on(f, edinburgh, 6) * (1 - on(f, money, 6))}><Tag x={wallX} y={1150} text="EDINBURGH" s={pop(f, edinburgh)} size={50} fill={CREAM} ink={NAVY} /></g>
        <g opacity={on(f, daughter, 6) * (1 - on(f, money, 6))}><Pram x={560} s={0.6} /></g>
        <g opacity={on(f, money, 6)} transform={`translate(${wallX} 950) scale(${pop(f, money)})`}>
          <rect x={-120} y={-80} width={240} height={160} rx={30} fill="#6B4A3A" stroke={INK} strokeWidth={6} /><circle cx={0} cy={0} r={26} fill={GOLD} stroke={INK} strokeWidth={4} />
          <text y={130} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"' }}>VERY LITTLE MONEY</text>
        </g>
        <Person f={f} who="lib-rowling" beats={walkB} x={lerp(260, 300, span(f, edinburgh, money))} s={0.85} />
        <NameTag x={280} y={GROUND - 660} name="J.K. ROWLING" />
      </g>}
      {/* # C) her own words */}
      {C > 0.001 && <g opacity={C}>
        <Edinburgh id="rwc" f={f} rain={1} />
        <g opacity={on(f, poor, 6) * (1 - on(f, s8, 8))} transform={`translate(700 700) scale(${pop(f, poor)})`}>
          <rect x={-300} y={-170} width={600} height={340} rx={16} fill={PAPER} stroke={INK} strokeWidth={7} />
          <text y={-80} textAnchor="middle" fill={NAVY} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>"AS POOR AS</text>
          <text y={-10} textAnchor="middle" fill={NAVY} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>YOU CAN BE...</text>
          <text y={70} textAnchor="middle" fill={RED} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, homeless, 6)}>WITHOUT BEING HOMELESS"</text>
          <text y={140} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, britain, 6)}>— MODERN BRITAIN</text>
        </g>
        <g opacity={on(f, failed, 6)} transform={`translate(700 700) scale(${pop(f, failed)})`}>
          <rect x={-300} y={-150} width={600} height={300} rx={16} fill={INK} />
          <text y={-40} textAnchor="middle" fill={CREAM} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>"I HAD FAILED ON</text>
          <text y={50} textAnchor="middle" fill={GOLD} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 6 }} transform={`scale(${1 + 0.15 * on(f, epic, 6)})`}>AN EPIC SCALE"</text>
          <text y={120} textAnchor="middle" fill={CREAM} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }} opacity={on(f, words, 6)}>— J.K. ROWLING, HARVARD, 2008</text>
        </g>
        <Person f={f} who="lib-rowling" beats={herC} x={230} s={0.85} />
        <NameTag x={230} y={GROUND - 660} name="J.K. ROWLING" />
      </g>}
      <Headline text={f < s5 ? 'A DELAYED TRAIN' : f < s7 ? 'IT ALL FELL APART' : 'ROCK BOTTOM'} o={f < s5 ? on(f, delayed, 8) * (1 - on(f, s5 - 4, 4)) : f < s7 ? on(f, apart, 8) * (1 - on(f, s7 - 4, 4)) : on(f, poor, 8)} color={INK} />
      <RVig id="rwh" />
    </g>
  )
}

export const RW_HOOK = makePiece('rw-hook', 'Rowling: no after no, the reveal', {
  beats: ['s1:told', 's1:no', 's1:times', 's1:believe', 's2', 's2:broke', 's2:baby', 's2:believe', 's2:turned', 's3', 's3:rowling', 's3:anyone', 's3:name'],
  sfx: [['s1:no', 'thud'], ['s1:times', 'thud'], ['s1:believe', 'thud'], ['s2:turned', 'impact'], ['s3:rowling', 'chime']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const RW_FALL = makePiece('rw-fall', 'Rowling: the delayed train, rock bottom, her own words', {
  beats: ['s4', 's4:delayed', 's4:train', 's4:wizard', 's4:head', 's5', 's5:years', 's5:apart', 's6', 's6:mother', 's6:marriage', 's6:edinburgh', 's6:daughter', 's6:money', 's7', 's7:poor', 's7:britain', 's7:homeless', 's8', 's8:words', 's8:failed', 's8:epic'],
  sfx: [['s4:delayed', 'click'], ['s4:wizard', 'chime'], ['s5:apart', 'crack'], ['s6:mother', 'softpop'], ['s6:marriage', 'crack'], ['s6:edinburgh', 'whoosh'], ['s6:money', 'coin'], ['s8:epic', 'impact']],
  Component: Fall, mood: 'light', canvas: 'tall',
})
