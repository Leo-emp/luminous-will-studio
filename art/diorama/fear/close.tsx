// ---------------------------------------------------------------- "Why You're So Afraid of Failing" — part 4 (s69–s85)
// STEPS s69–s77) the shallow end: three steps lead down into the pool, each a numbered card. 1 NAME THE REAL FEAR (two
//    doors: THE FAILURE? · SOMEONE SEEING IT?) and the scale tips back a little. 2 SHRINK THE BET (a big crate WHOLE
//    BUSINESS shrinks to SELL ONE THING; WHOLE ALBUM → ONE SONG, ONE FRIEND). 3 THE SUNDAY QUESTION — WHAT DID I FAIL AT
//    THIS WEEK?; NOTHING = PLAYED IT SAFE; a notebook list fills: FAILED AT · LEARNED; its title turns from MISTAKES to
//    PROOF I'M SOMEONE WHO TRIES.
// DIVE s78–s85) the brain still counts losses ×2 — but YOU DECIDE. Sara, Dyson and Jia (labelled) wave from the deck:
//    none of them stopped being afraid; FEAR DOESN'T GET THE FINAL WORD. The high board again — and next to it a low
//    board appears: YOUR FIRST SMALL ATTEMPT. You walk out, a little wobbly, and jump. Splash. You come up smiling:
//    ONE STEP FURTHER ALONG.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import {
  Board, Cloud, Headline, Mark, NameTag, Parasol, Person, Pool, Ring, Say, Sky, SunDisc, Tag, Vig, walkBeats, win,
  AQUA, AQUA_D, AQUA_L, BURG, CORAL, CORAL_D, CREAM, GOLD, GOLD_L, GREY, INK, LEAF, SAND, SUN, SUN_L, TILE, CX, GROUND, W, H, on, pop, lerp, span, easeOut, type Beat,
} from './kit'

// # a numbered step card that sits on a pool step
const StepCard: React.FC<{ x: number; y: number; n: number; text: string; o: number; lit: number }> = ({ x, y, n, text, o, lit }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * lit})`} opacity={o}>
    <rect x={-240} y={-60} width={480} height={120} rx={20} fill={lit > 0.5 ? SUN : '#FFFFFF'} stroke={INK} strokeWidth={5} />
    <circle cx={-170} cy={0} r={38} fill={CORAL} stroke={INK} strokeWidth={4} />
    <text x={-170} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{n}</text>
    <text x={-96} y={14} textAnchor="start" fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

const Steps: React.FC<PieceProps> = ({ f, c }) => {
  const s69 = c('s69'), work = c('s69:work'), week = c('s69:week')
  const s70 = c('s70'), first = c('s70:first'), name = c('s70:name'), hold = c('s70:hold'), part = c('s70:part'), failure = c('s70:failure'), someone = c('s70:someone')
  const s71 = c('s71'), naming = c('s71:naming'), weight = c('s71:weight'), scale = c('s71:scale')
  const s72 = c('s72'), second = c('s72:second'), shrink = c('s72:shrink'), business = c('s72:business'), sell = c('s72:sell'), person72 = c('s72:person'), write72 = c('s72:write'), album = c('s72:album'), share = c('s72:share'), friend = c('s72:friend')
  const s73 = c('s73'), small = c('s73:small'), failures73 = c('s73:failures'), survive = c('s73:survive')
  const s74 = c('s74'), third = c('s74:third'), dinner = c('s74:dinner'), sunday = c('s74:sunday'), fail = c('s74:fail')
  const s75 = c('s75'), nothing = c('s75:nothing'), good75 = c('s75:good'), played = c('s75:played'), safe = c('s75:safe')
  const s76 = c('s76'), list = c('s76:list'), failure2 = c('s76:failure'), learned = c('s76:learned')
  const s77 = c('s77'), time = c('s77:time'), mistakes = c('s77:mistakes'), proof = c('s77:proof'), tries = c('s77:tries')

  const step = f < second ? 0 : f < third ? 1 : 2
  const card = (k: number) => k === step ? 1 : 0
  const S1 = win(f, s70, s72), S2 = win(f, s72, s74), S3 = on(f, s74, 10)
  const shrinkB = easeOut(span(f, sell - 4, sell + 12)), shrinkA = easeOut(span(f, share - 4, share + 12))
  const tilt = lerp(22, 8, easeOut(span(f, naming, weight + 14)))
  const entries = [[failure2, 'FAILED AT: ASKING FOR THE PROMOTION', 'LEARNED: ASK EARLIER'], [learned, 'FAILED AT: FIRST OPEN MIC', 'LEARNED: PRACTISE THE START']]
  const hero: Beat[] = [[0, 'idle', 'neutral'], [work, 'present', 'smiling'], [first, 'countOne', 'neutral'], [c('s70:fear'), 'think', 'thinking'], [hold, 'nervous', 'worried'], [part, 'think', 'thinking'], [failure, 'weighA', 'thinking'], [someone, 'weighB', 'thinking'], [naming, 'relief', 'smiling'],
    [second, 'countOne', 'neutral'], [business, 'carryHeavy', 'worried'], [sell, 'offer', 'smiling'], [album, 'shrug', 'neutral'], [share, 'offer', 'smiling'], [small, 'thumbsUp', 'smiling'],
    [third, 'countOne', 'neutral'], [sunday, 'think', 'thinking'], [fail, 'talk', 'smiling'], [nothing, 'shrug', 'neutral'], [safe, 'armsCrossed', 'neutral'], [list, 'read', 'neutral'], [learned, 'read', 'smiling'], [proof, 'holdUp', 'smiling'], [tries, 'celebrate', 'smiling']]

  return (
    <g>
      <Sky id="ffp" />
      <SunDisc x={1760} y={130} r={56} f={f} />
      <Cloud x={420} y={110} s={0.7} />
      {/* # the shallow end: deck, three steps going down into the water */}
      <rect x={0} y={GROUND - 20} width={W} height={H} fill={TILE} />
      <g transform={`translate(0 ${GROUND - 20})`}>
        {[0, 1, 2].map((k) => <rect key={k} x={60 + k * 140} y={k * 40} width={W} height={40} fill={k % 2 ? TILE : '#ECEFEA'} stroke="#D5DBD8" strokeWidth={2} />)}
        <rect x={480} y={120} width={W} height={100} fill={AQUA} opacity={0.9} />
      </g>
      <g opacity={on(f, s69, 10)}>
        {[[0, 'NAME THE REAL FEAR'], [1, 'SHRINK THE BET'], [2, 'THE SUNDAY QUESTION']].map(([k, t]) => (
          <StepCard key={k as number} x={260 + (k as number) * 500} y={180} n={(k as number) + 1} text={t as string} o={on(f, [first, second, third][k as number], 10)} lit={card(k as number)} />
        ))}
      </g>
      <Headline text="STARTING THIS WEEK" o={win(f, week - 10, first)} y={180} />
      {/* # 1 — name the real fear */}
      {S1 > 0.001 && <g opacity={S1}>
        <g opacity={on(f, failure, 8)} transform={`translate(980 520) scale(${pop(f, failure)})`}>
          <rect x={-170} y={-130} width={340} height={260} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <text y={10} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>THE FAILURE?</text>
        </g>
        <g opacity={on(f, someone, 8)} transform={`translate(1420 520) scale(${pop(f, someone)})`}>
          <rect x={-200} y={-130} width={400} height={260} rx={20} fill={SUN_L} stroke={INK} strokeWidth={5} />
          <text y={-10} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>SOMEONE</text>
          <text y={50} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>SEEING IT?</text>
        </g>
        <g opacity={on(f, name, 8) * (1 - on(f, failure, 8))}><Say x={1200} y={420} lines={['WHICH PART SCARES ME?']} s={pop(f, name)} /></g>
        {/* # a little scale tips back toward level */}
        <g opacity={on(f, naming, 10)} transform="translate(1200 820)">
          <rect x={-8} y={-140} width={16} height={140} fill="#D2A26E" stroke={INK} strokeWidth={4} />
          <g transform={`translate(0 -140) rotate(${tilt})`}><rect x={-200} y={-8} width={400} height={16} rx={8} fill="#D2A26E" stroke={INK} strokeWidth={4} /><rect x={150} y={8} width={60} height={46} fill={GREY} stroke={INK} strokeWidth={3} /><rect x={-210} y={8} width={60} height={30} fill={LEAF} stroke={INK} strokeWidth={3} /></g>
          <text y={50} textAnchor="middle" fill={LEAF} opacity={on(f, scale, 8)} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>LIGHTER ALREADY</text>
        </g>
      </g>}
      {/* # 2 — shrink the bet */}
      {S2 > 0.001 && <g opacity={S2}>
        <g transform={`translate(1000 ${GROUND - 260}) scale(${lerp(1.3, 0.55, shrinkB) * pop(f, business)})`} opacity={on(f, business, 8)}>
          <rect x={-180} y={-150} width={360} height={300} rx={16} fill="#C9895B" stroke={INK} strokeWidth={6} />
          <text y={-10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>{shrinkB > 0.5 ? 'SELL ONE' : 'THE WHOLE'}</text>
          <text y={60} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>{shrinkB > 0.5 ? 'THING' : 'BUSINESS'}</text>
        </g>
        <g transform={`translate(1500 ${GROUND - 260}) scale(${lerp(1.3, 0.55, shrinkA) * pop(f, write72)})`} opacity={on(f, write72, 8)}>
          <rect x={-170} y={-170} width={340} height={340} rx={10} fill={CORAL} stroke={INK} strokeWidth={6} />
          <circle r={110} fill={INK} /><circle r={30} fill={SUN} />
          <text y={-190} textAnchor="middle" fill={INK} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 3 }}>{shrinkA > 0.5 ? 'ONE SONG' : 'THE WHOLE ALBUM'}</text>
        </g>
        <g opacity={on(f, friend, 8)}><Tag x={1500} y={GROUND - 60} text="ONE FRIEND" fill={SUN_L} size={44} /></g>
        <g opacity={on(f, person72, 8)}><Tag x={1000} y={GROUND - 60} text="ONE PERSON" fill={SUN_L} size={44} /></g>
        <Headline text={f >= c('s73:easy') ? 'SMALL FAILURES ARE EASY TO SURVIVE' : f >= failures73 ? 'SMALL ATTEMPTS = SMALL FAILURES' : 'SMALL ATTEMPTS'} o={on(f, small, 8)} color={LEAF} y={330} />
        <g opacity={on(f, shrink, 1)} />
      </g>}
      {/* # 3 — the Sunday question + the list */}
      {S3 > 0.001 && <g opacity={S3}>
        <g opacity={on(f, sunday, 8)} transform={`translate(860 470) scale(${pop(f, sunday)})`}>
          <rect x={-120} y={-120} width={240} height={240} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          <rect x={-120} y={-120} width={240} height={70} rx={20} fill={CORAL} />
          <text y={-70} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>SUNDAY</text>
          <text y={60} textAnchor="middle" fill={INK} style={{ font: '400 90px "Bebas Neue"' }}>?</text>
        </g>
        <Say x={1360} y={360} lines={['WHAT DID I FAIL AT', 'THIS WEEK?']} o={on(f, fail - 4, 8) * (1 - on(f, list, 8))} s={pop(f, fail - 4)} fill={SUN_L} size={54} />
        <g opacity={on(f, nothing, 8) * (1 - on(f, list, 8))}><Tag x={1360} y={600} text={f >= played ? 'NOTHING = PLAYED IT SAFE' : f >= good75 ? 'NOT A GOOD WEEK…' : 'NOTHING?'} fill="#FFFFFF" s={pop(f, nothing)} /></g>
        <g opacity={on(f, dinner, 1)} />
        {/* # the notebook list */}
        <g opacity={on(f, list, 10)} transform={`translate(1360 560) rotate(-2) scale(${pop(f, list)})`}>
          <rect x={-380} y={-300} width={760} height={600} rx={16} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
          {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M-340 ${-180 + k * 56} L340 ${-180 + k * 56}`} stroke={AQUA_L} strokeWidth={3} />)}
          <path d="M-300 -300 L-300 300" stroke={CORAL} strokeWidth={3} />
          <text y={-220} textAnchor="middle" fill={f >= proof ? LEAF : GREY} style={{ font: '400 58px "Bebas Neue"', letterSpacing: 3 }}>{f >= proof ? "PROOF I'M SOMEONE WHO TRIES" : f >= c('s77:stops') ? 'A LIST OF MISTAKES?' : 'MY FAILURE LIST'}</text>
          {entries.map(([at, a, b], k) => <g key={k} opacity={on(f, at as number, 8)}>
            <text x={-280} y={-130 + k * 168} fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{a as string}</text>
            <text x={-280} y={-74 + k * 168} fill={LEAF} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{b as string}</text>
          </g>)}
          <g opacity={on(f, time, 8)}>{[0, 1, 2].map((k) => <rect key={k} x={-280} y={220 - 40 + k * 0} width={lerp(0, 560, easeOut(span(f, time + k * 8, time + k * 8 + 12)))} height={0} />)}
            <text x={-280} y={206} fill={GREY} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>+ 12 MORE…</text>
          </g>
        </g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={380} s={0.6} />
      <Vig id="ffp" />
    </g>
  )
}
// # "one person" pops just after "sell"
const person1 = (_f: number, sell: number) => sell + 12

// ---------------------------------------------------------------- DIVE s78–s85
const Dive: React.FC<PieceProps> = ({ f, c }) => {
  const s78 = c('s78'), brain = c('s78:brain'), double = c('s78:double'), built = c('s78:built')
  const s79 = c('s79'), decision = c('s79:decision')
  const s80 = c('s80'), sara = c('s80:sara'), doorstep = c('s80:doorstep'), dyson = c('s80:dyson'), thousands = c('s80:thousands'), jia = c('s80:jia'), purpose = c('s80:purpose')
  const s81 = c('s81'), afraid = c('s81:afraid'), letting = c('s81:letting'), final = c('s81:final')
  const s82 = c('s82'), think = c('s82:think'), years = c('s82:years')
  const s83 = c('s83'), smallest = c('s83:smallest'), ordinary = c('s83:ordinary'), attempt = c('s83:attempt'), week = c('s83:week')
  const s84 = c('s84'), make = c('s84:make'), messy = c('s84:messy'), fail = c('s84:fail')
  const s85 = c('s85'), tries = c('s85:tries'), fails = c('s85:fails'), further = c('s85:further'), waiting = c('s85:waiting'), ready = c('s85:ready')

  const A = win(f, 0, s82 + 2), B = on(f, s82, 10)
  const BX = 520, LOWX = 1060, LOWH = 70, LTOP = GROUND - 40 - LOWH
  const low = easeOut(span(f, smallest, smallest + 16))
  // # the hero walks to the low board, out to its tip, jumps on "fail", splashes, surfaces
  const walk = easeOut(span(f, make, messy + 10))
  const jump = span(f, fail, fail + 22)
  const tipX = LOWX + 330
  const hx = jump > 0 ? lerp(tipX, tipX + 180, jump) : lerp(860, tipX, walk)
  const onBoard = walk > 0.25 ? LTOP : GROUND
  const hy = jump > 0 ? lerp(onBoard, GROUND + 260, jump) - Math.sin(jump * Math.PI) * 220 : lerp(GROUND, LTOP, easeOut(span(f, make + 4, make + 14)))
  const splash = span(f, fail + 18, fail + 48)
  const up = easeOut(span(f, tries, tries + 20))
  const heroB: Beat[] = [[s82, 'idle', 'thinking'], [think, 'lookFar', 'thinking'], [years, 'pointUp', 'neutral'], [smallest, 'think', 'thinking'], [attempt, 'point', 'smiling'], [week, 'nodA', 'smiling'],
    ...walkBeats(make, messy + 10, 'smiling'), [messy + 10, 'nervous', 'smiling'], [fail, 'jump', 'smiling']]
  const swim: Beat[] = [[s85, 'celebrate', 'smiling'], [further, 'fistPump', 'smiling'], [ready, 'waveA', 'smiling']]
  const trio: [string, string, number, number][] = [['lib-blakely', 'SARA BLAKELY', sara, 640], ['lib-dyson', 'JAMES DYSON', dyson, 1060], ['lib-jiang', 'JIA JIANG', jia, 1480]]
  const heroA: Beat[] = [[0, 'idle', 'thinking'], [brain, 'think', 'thinking'], [double, 'shrug', 'neutral'], [s79, 'idle', 'neutral'], [decision, 'confident', 'smiling'], [s80, 'idle', 'smiling'], [s81, 'nodA', 'smiling'], [final, 'thumbsUp', 'smiling']]

  return (
    <g>
      <Sky id="ffv" warm={on(f, s85, 30)} />
      <SunDisc x={1700} y={160} f={f} />
      <Cloud x={300} y={150} s={0.9} /><Cloud x={1100} y={100} s={0.7} />
      <Pool f={f} splash={splash} splashX={tipX + 180} />
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 40} width={W} height={60} fill={TILE} />
        {/* # the brain still counts double — you decide */}
        <g opacity={win(f, brain - 6, s80 + 6)} transform={`translate(1100 430) scale(${pop(f, brain - 6) * 0.9})`}>
          <path d="M-120 20 C-150 -40 -110 -110 -50 -110 C-30 -140 30 -140 50 -110 C110 -110 150 -40 120 20 C130 70 80 100 40 90 C20 110 -20 110 -40 90 C-80 100 -130 70 -120 20 Z" fill="#F6A9B8" stroke={INK} strokeWidth={6} />
          <text y={30} textAnchor="middle" fill={CORAL_D} opacity={on(f, double, 8)} style={{ font: '400 90px "Bebas Neue"' }}>×2</text>
          <text y={190} textAnchor="middle" fill={GREY} opacity={on(f, built, 8)} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>HOW IT'S BUILT</text>
        </g>
        <g opacity={win(f, decision, s80 + 6)}><Tag x={1100} y={160} text="BUT YOU DECIDE" fill={SUN} s={pop(f, decision)} /></g>
        {/* # the three who tried */}
        <g opacity={on(f, s80, 10)}>
          {trio.map(([who, nm, at, x]) => <g key={who} opacity={on(f, at, 8)}>
            <Person f={f} who={who} beats={[[at, 'waveA', 'smiling'], [at + 10, 'waveB', 'smiling'], [at + 20, 'idle', 'smiling'], [final, 'thumbsUp', 'smiling']]} x={x} y={GROUND - 30} s={0.56} />
            <NameTag x={x} y={GROUND - 450} name={nm} s={0.75} />
          </g>)}
          <g opacity={on(f, doorstep, 8)}><Tag x={640} y={250} text="NO AFTER NO" fill="#FFFFFF" size={40} /></g>
          <g opacity={on(f, thousands, 8)}><Tag x={1060} y={250} text="5,126 FAILURES" fill="#FFFFFF" size={40} /></g>
          <Mark x={1200} y={330} ok={false} s={0.5 * pop(f, c('s80:work'))} o={on(f, c('s80:work'), 6) * (1 - on(f, jia, 8))} />
          <g opacity={on(f, purpose, 8)}><Tag x={1480} y={250} text="REJECTED ON PURPOSE" fill="#FFFFFF" size={40} /></g>
          <Headline text={f >= final ? "FEAR DOESN'T GET THE FINAL WORD" : f >= afraid ? 'STILL AFRAID…' : ''} o={on(f, afraid, 8)} color={BURG} y={120} />
          <g opacity={on(f, letting, 1)} />
        </g>
        <Person f={f} who="hero" beats={heroA} x={240} y={GROUND - 30} s={0.6} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Parasol x={150} s={0.8} />
        <Ring x={1700} y={GROUND + 80} s={0.7} r={f * 0.4} />
        <Board x={BX} h={300} len={360} label="THE BIG LEAP" />
        {/* # the low board: your smallest first attempt */}
        <g opacity={low} transform={`translate(0 ${(1 - low) * 60})`}>
          <Board x={LOWX} h={LOWH} len={360} bend={f >= messy && jump === 0 ? 6 + Math.sin(f / 2.5) * 4 : 0} label="FIRST SMALL ATTEMPT" />
        </g>
        <g opacity={on(f, ordinary, 8) * (1 - on(f, s84, 8))}><Tag x={LOWX + 200} y={560} text="SMALL · ORDINARY · THIS WEEK" fill={SUN_L} size={46} s={pop(f, ordinary)} /></g>
        <g opacity={win(f, messy, fail + 10)}><Tag x={LOWX + 200} y={440} text="A LITTLE MESSY IS FINE" fill="#FFFFFF" size={44} /></g>
        {/* # the jump, then surfacing in the water */}
        {f < fail + 30 && <Person f={f} who="hero" beats={heroB} x={hx} y={hy} s={0.58} />}
        {f >= fail + 30 && <g>
          <Person f={f} who="hero" beats={swim} x={tipX + 180} y={GROUND + 330 - up * 70 + Math.sin(f / 10) * 6} s={0.58} />
          <rect x={0} y={GROUND + 150} width={W} height={H} fill={AQUA} opacity={0.92} />
          <path d={`M0 ${GROUND + 150} ${Array.from({ length: 33 }, (_, k) => `Q${k * 60 + 30} ${GROUND + 140 + Math.sin(f / 6 + k) * 6} ${k * 60 + 60} ${GROUND + 150}`).join(' ')}`} stroke={AQUA_L} strokeWidth={6} fill="none" />
        </g>}
        <Headline text={f >= further ? 'ONE STEP FURTHER ALONG' : f >= fails ? 'TRIED · FAILED · STILL HERE' : f >= tries ? 'YOU TRIED' : ''} o={on(f, tries, 8)} color={BURG} />
        <g opacity={on(f, c('s85:version#2'), 8)}><Tag x={BX - 60} y={300} text={f >= waiting ? 'STILL WAITING TO BE READY' : 'THE VERSION STILL WAITING…'} fill={GREY} ink="#FFFFFF" size={40} /></g>
      </g>}
      <Vig id="ffv" />
    </g>
  )
}

export const FF_STEPS = makePiece('ff-steps', 'Fear: three steps — name it, shrink the bet, the Sunday question', {
  beats: ['s69', 's69:work', 's69:week', 's70', 's70:first', 's70:name', 's70:fear', 's70:hold', 's70:part', 's70:failure', 's70:someone', 's71', 's71:naming', 's71:weight', 's71:scale', 's72', 's72:second', 's72:shrink', 's72:business', 's72:sell', 's72:person', 's72:write', 's72:album', 's72:share', 's72:friend', 's73', 's73:small', 's73:failures', 's73:easy', 's73:survive', 's74', 's74:third', 's74:dinner', 's74:sunday', 's74:fail', 's75', 's75:nothing', 's75:good', 's75:played', 's75:safe', 's76', 's76:list', 's76:failure', 's76:learned', 's77', 's77:time', 's77:stops', 's77:mistakes', 's77:proof', 's77:tries'],
  sfx: [['s70:first', 'pop'], ['s71:naming', 'swish'], ['s72:second', 'pop'], ['s72:sell', 'softpop'], ['s72:share', 'softpop'], ['s74:third', 'pop'], ['s74:sunday', 'tick'], ['s76:list', 'flutter'], ['s77:proof', 'chime']],
  Component: Steps, mood: 'light',
})
export const FF_DIVE = makePiece('ff-dive', 'Fear: the low board — you jump', {
  beats: ['s78', 's78:brain', 's78:double', 's78:built', 's79', 's79:decision', 's80', 's80:sara', 's80:doorstep', 's80:dyson', 's80:thousands', 's80:work', 's80:jia', 's80:purpose', 's81', 's81:afraid', 's81:letting', 's81:final', 's82', 's82:think', 's82:years', 's83', 's83:smallest', 's83:ordinary', 's83:attempt', 's83:week', 's84', 's84:make', 's84:messy', 's84:fail', 's85', 's85:tries', 's85:fails', 's85:further', 's85:version#2', 's85:waiting', 's85:ready'],
  sfx: [['s78:double', 'thud'], ['s79:decision', 'ding'], ['s80:sara', 'softpop'], ['s80:dyson', 'softpop'], ['s80:jia', 'softpop'], ['s81:final', 'chime'], ['s83:smallest', 'pop'], ['s84:fail', 'whoosh'], ['s85:tries', 'impact'], ['s85:further', 'riser']],
  Component: Dive, mood: 'light',
})
