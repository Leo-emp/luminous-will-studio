// ---------------------------------------------------------------- s11–s15: the spotlight effect.
// EFFECT) a stage: THE SPOTLIGHT EFFECT. He stands in a huge cone; HAIR, MISTAKES, AWKWARD balloon up around him.
//    "everyone else" — four more spotlights snap on across the stage, each person with their own worries (MY HAIR,
//    MY MISTAKE…). His trip shrinks to a tiny blip on their day-strip; their own trip is a newspaper HEADLINE.
//    Mistakes: two thermometers — WE EXPECT: HARSH vs THEY JUDGE: MILD.
// FREE) s16–s24: the spotlight pushes his choices (he sits back down); RAISE HAND · POST VIDEO · TRY IT are struck;
//    the audience is mostly empty seats / asleep (BARELY WATCHING); a regret scale tips: SKIPPED CHANCES outweigh
//    LOOKED SILLY. Then the question: IN A WEEK? — a calendar flips seven pages — NO. Everyone in their own light;
//    the stage lamp clicks off, house lights up: FREE TO TRY. He raises his hand, posts, wears the shirt: ✓ ✓ ✓.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Big, Common, Headline, Person, Shirt, Spot, Stage, SVg, Tag, win, BRICK, CREAM, GOLD, GOLD_L, INK, BURG, TEAL, TEAL_L, ROSE, MUSTARD, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Effect: React.FC<PieceProps> = ({ f, c }) => {
  const s11 = c('s11'), call = c('s11:call'), effect = c('s11:effect')
  const s12 = c('s12'), head = c('s12:head'), hair = c('s12:hair'), mistakes = c('s12:mistakes'), awkward = c('s12:awkward'), huge = c('s12:huge')
  const s13 = c('s13'), everyone = c('s13:everyone'), living = c('s13:living'), too = c('s13:too')
  const s14 = c('s14'), busy = c('s14:busy'), worrying = c('s14:worrying'), spotlight14 = c('s14:spotlight')
  const s14b = c('s14b'), stairs = c('s14b:stairs'), blip = c('s14b:blip'), day = c('s14b:day'), headline = c('s14b:headline')
  const s15 = c('s15'), later = c('s15:later'), mistakes15 = c('s15:mistakes'), expect = c('s15:expect'), harshly = c('s15:harshly'), actually = c('s15:actually')

  const A = win(f, 0, s14b + 4), B = win(f, s14b, s15 + 4), C = on(f, s15, 10)
  const zoomOut = easeOut(span(f, everyone, everyone + 20))
  const heroA: Beat[] = [[0, 'idle', 'worried'], [head, 'scratchHead', 'worried'], [hair, 'nervous', 'worried'], [mistakes, 'facepalm', 'worried'], [huge, 'despair', 'worried'], [everyone, 'idle', 'thinking'], [busy, 'lookFar', 'thinking'], [spotlight14, 'shrug', 'smiling']]
  const others: [number, string][] = [[160, 'MY HAIR'], [370, 'MY TEXT'], [760, 'MY MISTAKE'], [950, 'MY JOB']]

  return (
    <g>
      <Stage id="spe" dim={0.6 * A} />
      {A > 0.001 && <g opacity={A}>
        {/* # his cone shrinks from huge to one of five as the others light up */}
        <Spot x={lerp(CX, 560, zoomOut)} w={lerp(330, 150, zoomOut)} top={140} />
        {others.map(([x, t], k) => <g key={k} opacity={on(f, living + k * 4, 4)}>
          <Spot x={x} w={110} top={140} tone={k % 2 ? TEAL_L : GOLD_L} />
          <Mini look={k % 2 ? 'hero-fit' : 'hero-rich'} x={x} y={GROUND} scale={1.7} frame={f} seed={k + 80} mood="sad" />
          <g opacity={on(f, worrying + k * 3, 4)}><Big x={x} y={GROUND - 420 - (k % 2) * 90} text={t} s={0.42} tone={k % 2 ? TEAL_L : ROSE} /></g>
        </g>)}
        <Big x={lerp(300, 300, 0)} y={560} text="HAIR" s={pop(f, hair) * (1 - 0.6 * zoomOut)} o={on(f, hair, 4) * (1 - on(f, s14, 8))} />
        <Big x={780} y={640} text="MISTAKES" s={pop(f, mistakes) * (1 - 0.6 * zoomOut)} o={on(f, mistakes, 4) * (1 - on(f, s14, 8))} tone={GOLD} />
        <Big x={420} y={800} text="AWKWARD" s={pop(f, awkward) * (1 - 0.6 * zoomOut)} o={on(f, awkward, 4) * (1 - on(f, s14, 8))} tone={TEAL_L} />
        <g opacity={on(f, effect, 6) * (1 - on(f, s12, 6))}><Tag x={CX} y={520} text="THE SPOTLIGHT EFFECT" s={pop(f, effect)} size={64} fill={GOLD} /></g>
        <g opacity={on(f, too, 6) * (1 - on(f, s14b, 6))}><Tag x={CX} y={480} text="EVERYONE HAS ONE" s={pop(f, too)} size={58} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero" beats={heroA} x={lerp(CX, 560, zoomOut)} s={lerp(0.95, 0.75, zoomOut)} />
      </g>}
      {/* # B) your trip = a blip in their day; their own trip = the headline */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, day, 6)} transform="translate(120 700)">
          <text x={0} y={-30} fill={CREAM} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>THEIR DAY</text>
          <rect x={0} y={0} width={840} height={70} rx={14} fill={CREAM} stroke={INK} strokeWidth={5} />
          {['WORK', 'LUNCH', 'GYM', 'CALL MUM', 'TV'].map((t, k) => <text key={t} x={70 + k * 175} y={48} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"' }}>{t}</text>)}
          <g opacity={on(f, blip, 4)}><rect x={222} y={-10} width={10} height={90} fill={BRICK} /><text x={227} y={130} textAnchor="middle" fill={CREAM} style={{ font: '400 36px "Bebas Neue"' }}>YOUR TRIP (2 SEC)</text></g>
        </g>
        <g opacity={on(f, stairs, 6) * (1 - on(f, day, 6))}><Tag x={CX} y={560} text="YOUR TRIP" s={pop(f, stairs)} size={60} /></g>
        <g opacity={on(f, headline, 6)} transform={`translate(${CX} 1040) rotate(-4) scale(${pop(f, headline)})`}>
          <rect x={-300} y={-110} width={600} height={220} rx={8} fill="#F3EFE6" stroke={INK} strokeWidth={6} />
          <text y={-46} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>THE DAILY ME</text>
          <rect x={-270} y={-30} width={540} height={6} fill={INK} />
          <text y={50} textAnchor="middle" fill={BRICK} style={{ font: '400 76px "Bebas Neue"' }}>I TRIPPED!</text>
        </g>
      </g>}
      {/* # C) we expect harsh, they judge mild */}
      {C > 0.001 && <g opacity={C}>
        {([['WE EXPECT', 0.9, BRICK, expect, 'HARSH', 330], ['THEY JUDGE', 0.3, TEAL, actually, 'MILD', 750]] as const).map(([t, v, tone, at, word, x], k) => (
          <g key={t} opacity={on(f, at, 6)} transform={`translate(${x} 1000)`}>
            <rect x={-40} y={-400} width={80} height={400} rx={40} fill={CREAM} stroke={INK} strokeWidth={6} />
            <rect x={-26} y={-386 + 372 * (1 - v * easeOut(span(f, at, at + 14)))} width={52} height={372 * v * easeOut(span(f, at, at + 14))} rx={26} fill={tone} />
            <circle cy={30} r={64} fill={tone} stroke={INK} strokeWidth={6} />
            <text y={150} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>{t}</text>
            <text y={-440} textAnchor="middle" fill={k ? TEAL_L : GOLD} style={{ font: '400 66px "Bebas Neue"', letterSpacing: 3 }}>{word}</text>
          </g>
        ))}
        <g opacity={on(f, s15, 6) * (1 - on(f, expect, 6))}><Tag x={CX} y={560} text="SAME WITH MISTAKES" s={pop(f, s15)} size={56} /></g>
      </g>}
      <Headline text={f < s13 ? 'IT FEELS HUGE' : f < s14b ? 'EVERYONE HAS ONE' : f < s15 ? 'A BLIP, NOT NEWS' : 'LESS HARSH THAN YOU THINK'} o={f < s13 ? on(f, huge, 8) * (1 - on(f, s13 - 4, 4)) : f < s14b ? 0 : f < s15 ? on(f, blip, 8) * (1 - on(f, s15 - 4, 4)) : on(f, harshly, 8)} color={CREAM} />
      <SVg id="spe" />
    </g>
  )
}

const Free: React.FC<PieceProps> = ({ f, c }) => {
  const matters = c('s16:matters'), quietly = c('s16:quietly'), choices = c('s16:choices')
  const s17 = c('s17'), hand = c('s17:hand'), video = c('s17:video'), want = c('s17:want')
  const s18 = c('s18'), protect = c('s18:protect'), audience = c('s18:audience'), barely = c('s18:barely')
  const s18b = c('s18b'), regret = c('s18b:regret'), chances = c('s18b:chances'), skipped = c('s18b:skipped'), silly = c('s18b:silly')
  const s19 = c('s19'), hot = c('s19:hot'), question = c('s19:question')
  const s20 = c('s20'), remember = c('s20:remember'), week = c('s20:week')
  const s21 = c('s21'), honest = c('s21:honest'), no = c('s21:no')
  const s22 = c('s22'), worried = c('s22:worried'), busy = c('s22:busy'), yours = c('s22:yours')
  const s23 = c('s23'), stage = c('s23:stage'), free = c('s23:free'), tryIt = c('s23:try')
  const s24 = c('s24'), raise = c('s24:raise'), post = c('s24:post'), wear = c('s24:wear'), shirt = c('s24:shirt')

  const A = win(f, 0, s18b + 4), B = win(f, s18b, s19 + 4), Cq = win(f, s19, s22 + 4), D = on(f, s22, 10)
  const lampOff = on(f, stage, 8)
  const heroA: Beat[] = [[0, 'idle', 'neutral'], [choices, 'slump', 'worried'], [hand, 'reachUp', 'worried'], [hand + 10, 'slump', 'worried'], [video, 'phone', 'worried'], [want, 'despair', 'worried'], [barely, 'shrug', 'thinking']]
  const heroC: Beat[] = [[s19, 'think', 'thinking'], [question, 'pointUp', 'neutral'], [no, 'crossNoA', 'smiling']]
  const heroD: Beat[] = [[s22, 'idle', 'smiling'], [busy, 'lookFar', 'smiling'], [free, 'celebrate', 'smiling'], [raise, 'reachUp', 'smiling'], [post, 'phone', 'smiling'], [wear, 'taDa', 'smiling']]
  const acts: [string, number][] = [['RAISE HAND', hand], ['POST VIDEO', video], ['TRY IT', want]]
  const tip = lerp(0, 14, easeOut(span(f, skipped, silly + 10)))

  return (
    <g>
      {A > 0.001 && <g opacity={A}>
        <Stage id="spf" dim={0.5} />
        <Spot x={330} w={200} top={140} />
        {acts.map(([t, at], k) => <g key={t} opacity={on(f, at, 5)} transform={`translate(780 ${520 + k * 150})`}>
          <Tag x={0} y={0} text={t} s={pop(f, at)} size={50} />
          <path d={`M-150 -4 L${lerp(-150, 150, easeOut(span(f, at + 6, at + 14)))} 6`} stroke="#D2463C" strokeWidth={12} strokeLinecap="round" />
        </g>)}
        {/* # the audience: five seats, most empty, one asleep */}
        <g opacity={on(f, audience, 6)}>
          {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${560 + k * 110} ${GROUND + 140})`}><rect x={-44} y={-60} width={88} height={90} rx={14} fill="#5A1A2A" stroke={INK} strokeWidth={4} /></g>)}
          <Mini look="hero-rich" x={780} y={GROUND + 100} scale={1.2} frame={f} seed={90} />
          <text x={800} y={GROUND - 120} fill={CREAM} style={{ font: '400 50px "Bebas Neue"' }}>Z z</text>
        </g>
        <g opacity={on(f, barely, 6)}><Tag x={CX} y={480} text="BARELY WATCHING" s={pop(f, barely)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, quietly, 6) * (1 - on(f, s17, 6))}><Tag x={CX} y={480} text="IT PICKS FOR YOU" s={pop(f, quietly)} size={56} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero" beats={heroA} x={330} s={0.85} />
      </g>}
      {/* # B) the regret scale */}
      {B > 0.001 && <g opacity={B}>
        <Common id="spr" dim={0} />
        <g transform={`translate(${CX} 760)`}>
          <rect x={-12} y={0} width={24} height={420} fill={INK} /><path d="M-120 430 L120 430 L80 400 L-80 400 Z" fill={INK} />
          <g transform={`rotate(${-tip})`}>
            <rect x={-380} y={-14} width={760} height={28} rx={14} fill={BRICK} stroke={INK} strokeWidth={5} />
            <g transform="translate(-320 0)"><path d="M-100 0 L100 0 L70 120 L-70 120 Z" fill={TEAL} stroke={INK} strokeWidth={5} /><text y={190} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>SKIPPED CHANCES</text>
              {[0, 1, 2].map((k) => <rect key={k} x={-60 + k * 40} y={40 - k * 30} width={60} height={60} rx={8} fill={GOLD} stroke={INK} strokeWidth={4} opacity={on(f, chances + k * 4, 4)} />)}</g>
            <g transform="translate(320 0)"><path d="M-100 0 L100 0 L70 120 L-70 120 Z" fill={TEAL} stroke={INK} strokeWidth={5} /><text y={190} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>LOOKED SILLY</text>
              <g opacity={on(f, silly, 4)}><rect x={-20} y={60} width={40} height={40} rx={6} fill={ROSE} stroke={INK} strokeWidth={4} /></g></g>
          </g>
        </g>
        <g opacity={on(f, regret, 6)}><Tag x={CX} y={480} text="WHAT YOU'LL REGRET" s={pop(f, regret)} size={56} fill={GOLD} /></g>
      </g>}
      {/* # C) the one question: in a week? */}
      {Cq > 0.001 && <g opacity={Cq}>
        <Common id="spq" dim={0.2} />
        <g opacity={on(f, week, 6)} transform="translate(760 800)">
          {Array.from({ length: 7 }, (_, k) => {
            const t = span(f, week + k * 4, week + k * 4 + 8)
            return k < 6 ? <g key={k} transform={`translate(0 ${-t * 500}) rotate(${-t * 30})`} opacity={1 - t}><rect x={-150} y={-180} width={300} height={360} rx={16} fill={CREAM} stroke={INK} strokeWidth={6} /><text y={60} textAnchor="middle" fill={INK} style={{ font: '400 150px "Bebas Neue"' }}>{k + 1}</text></g> : null
          })}
          <g><rect x={-150} y={-180} width={300} height={360} rx={16} fill={CREAM} stroke={INK} strokeWidth={6} /><text y={60} textAnchor="middle" fill={TEAL} style={{ font: '400 150px "Bebas Neue"' }}>7</text></g>
        </g>
        <g opacity={on(f, remember, 6)}><Tag x={CX} y={470} text="IN A WEEK?" s={pop(f, remember)} size={72} fill={GOLD} /></g>
        <g opacity={on(f, no, 4)} transform={`translate(760 800) scale(${pop(f, no) * 1.3})`}><circle r={150} fill="none" stroke={BRICK} strokeWidth={22} /><text y={60} textAnchor="middle" fill={BRICK} style={{ font: '400 170px "Bebas Neue"' }}>NO</text></g>
        <Person f={f} who="hero" beats={heroC} x={260} s={0.85} />
      </g>}
      {/* # D) everyone's in their own light; lamp off, free */}
      {D > 0.001 && <g opacity={D}>
        <Stage id="spz" dim={0.5 * (1 - lampOff)} />
        <g opacity={1 - lampOff}>
          {[160, 950].map((x, k) => <g key={k}><Spot x={x} w={110} top={140} tone={k ? TEAL_L : GOLD_L} /><Mini look={k ? 'hero-fit' : 'hero-rich'} x={x} y={GROUND} scale={1.7} frame={f} seed={k + 95} /></g>)}
          <Spot x={CX} w={200} top={140} />
        </g>
        <g opacity={lampOff}><rect width={1080} height={GROUND} fill={MUSTARD} opacity={0.25} /></g>
        <g opacity={on(f, free, 6) * (1 - on(f, s24, 6))}><Tag x={CX} y={480} text="FREE TO TRY" s={pop(f, free)} size={80} fill={GOLD} /></g>
        {([['RAISE HAND', raise], ['POST VIDEO', post], ['WEAR THE SHIRT', wear]] as const).map(([t, at], k) => (
          <g key={t} opacity={on(f, at, 5)} transform={`translate(800 ${500 + k * 140})`}><Tag x={0} y={0} text={`✓ ${t}`} s={pop(f, at)} size={46} fill={k === 2 ? GOLD : CREAM} /></g>
        ))}
        <g opacity={on(f, shirt, 6)}><Shirt x={CX - 20} y={GROUND - 330} s={0.34} /></g>
        <Person f={f} who="hero" beats={heroD} x={CX - 20} s={0.85} />
      </g>}
      <Headline text={f < s18b ? 'IT CHOOSES FOR YOU' : f < s19 ? '' : f < s22 ? 'ONE QUESTION' : f < s24 ? 'NEVER ON STAGE' : 'GO.'} o={f < s18b ? on(f, choices, 8) * (1 - on(f, s18b - 4, 4)) : f < s19 ? 0 : f < s22 ? on(f, hot, 8) * (1 - on(f, s22 - 4, 4)) : f < s24 ? on(f, stage, 8) * (1 - on(f, s24 - 4, 4)) : on(f, raise, 8)} color={CREAM} />
    </g>
  )
}

export const SP_EFFECT = makePiece('sp-effect', 'Spotlight: everyone has their own spotlight', {
  beats: ['s11', 's11:call', 's11:effect', 's12', 's12:head', 's12:hair', 's12:mistakes', 's12:awkward', 's12:huge', 's13', 's13:everyone', 's13:living', 's13:too', 's14', 's14:busy', 's14:worrying', 's14:hair', 's14:mistakes', 's14:spotlight', 's14b', 's14b:stairs', 's14b:blip', 's14b:day', 's14b:headline', 's15', 's15:later', 's15:mistakes', 's15:expect', 's15:judge', 's15:slipups', 's15:harshly', 's15:actually'],
  sfx: [['s11:effect', 'impact'], ['s12:hair', 'pop'], ['s12:mistakes', 'pop'], ['s12:awkward', 'pop'], ['s13:living', 'click'], ['s14b:blip', 'tick'], ['s14b:headline', 'swish'], ['s15:actually', 'ding']],
  Component: Effect, mood: 'light', canvas: 'tall',
})
export const SP_FREE = makePiece('sp-free', 'Spotlight: what it costs, the week question, free to try', {
  beats: ['s16', 's16:matters', 's16:quietly', 's16:choices', 's17', 's17:hand', 's17:video', 's17:thing', 's17:want', 's18', 's18:protect', 's18:audience', 's18:barely', 's18b', 's18b:years', 's18b:likely', 's18b:regret', 's18b:chances', 's18b:skipped', 's18b:silly', 's19', 's19:hot', 's19:question', 's20', 's20:remember', 's20:week', 's21', 's21:honest', 's21:no', 's22', 's22:worried', 's22:busy', 's22:yours', 's23', 's23:stage', 's23:free', 's23:try', 's24', 's24:raise', 's24:post', 's24:wear', 's24:shirt'],
  sfx: [['s17:hand', 'swish'], ['s17:video', 'swish'], ['s17:want', 'swish'], ['s18:barely', 'softpop'], ['s18b:silly', 'thud'], ['s20:week', 'flutter'], ['s21:no', 'impact'], ['s23:stage', 'click'], ['s23:free', 'chime'], ['s24:raise', 'pop'], ['s24:post', 'pop'], ['s24:wear', 'ding']],
  Component: Free, mood: 'light', canvas: 'tall',
})
