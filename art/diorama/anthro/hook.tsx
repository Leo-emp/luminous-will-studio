// ---------------------------------------------------------------- s1–s9: the hook
// A) s1–s2  you at a kitchen table with your phone: two chat bubbles (fix my email, explain this letter); a paper
//           door behind the phone opens on "behind", a warm glow inside; coins drop out of the phone on "money".
// B) s3     a paper office with the ANTHROPIC sign rises on "anthropic"; the lantern (Claude) lights on "claude".
// C) s4     a small paper doorway: seven little people walk out carrying boxes ("quit their jobs"), 2021 calendar.
// D) s5     a big pace dial: the needle swings up to $81B A YEAR on "eighty-one"; coins pour on "money".
// E) s6     a stock board lights ANT on "stock"; a row of little people each take a share on "anyone" / "piece".
// F) s7–s8  you think; a tiny chat bubble grows huge on "big", a rocket trail on "fast"; on "tech" a tangle of
//           cogs and code blows away and you give a thumbs up.
// G) s9     the road of the video: seven stops on a paper path, each lights up on its word.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, beat } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { BB, Board, Bubble, Building, Cal, Coin, CoinStack, Cut, Day, Defs, G, Gavel, Grain, K, Lantern, Mark, Note, PhoneBig, Room, Share, Tag, cues, fadeIn, lerp, on, pop, scene, span, easeInOut, clamp01, Desk } from './kit'

const M = {
  asked1: 's1:asked', email1: 's1:email', letter1: 's1:letter',
  behind2: 's2:behind', answer2: 's2:answer', money2: 's2:money',
  companies3: 's3:companies', anthropic3: 's3:anthropic', claude3: 's3:claude',
  six4: 's4:six', group4: 's4:group', quit4: 's4:quit', jobs4: 's4:jobs',
  brings5: 's5:brings', money5: 's5:money', pace5: 's5:pace', eightyone5: 's5:eightyone', year5: 's5:year',
  next6: 's6:next', anyone6: 's6:anyone', piece6: 's6:piece', stock6: 's6:stock',
  thinking7: 's7:thinking', chatbot7: 's7:chatbot', big7: 's7:big', fast7: 's7:fast',
  tech8: 's8:tech', follow8: 's8:follow',
  story9: 's9:story', came9: 's9:came', makes9: 's9:makes', money9: 's9:money', goes9: 's9:goes', charge9: 's9:charge', fights9: 's9:fights', happens9: 's9:happens',
}
const EXTRA: string[] = []

// # a little paper rocket (for "that fast")
const Rocket: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-30 60 Q-60 120 -20 150 L20 150 Q60 120 30 60 Z" fill={K.gold} opacity={0.9} />
    <Cut d={5}><path d="M0 -120 Q60 -60 50 60 L-50 60 Q-60 -60 0 -120 Z" fill={K.paperL} /></Cut>
    <circle cy={-20} r={22} fill={K.sky} stroke={K.ink} strokeWidth={5} />
    <path d="M-50 20 L-90 80 L-50 60 Z M50 20 L90 80 L50 60 Z" fill={K.terra} />
  </g>
)
// # a cog (for the tech tangle)
const Cog: React.FC<{ x: number; y: number; r: number; rot: number; color: string; o?: number }> = ({ x, y, r, rot, color, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${rot})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r * 1.25} width={r * 0.32} height={r * 0.5} rx={4} fill={color} transform={`rotate(${k * 45})`} />)}<circle r={r} fill={color} /><circle r={r * 0.4} fill={K.paper} /></g>
)
// # the pace dial
const Dial: React.FC<{ x: number; y: number; v: number; o?: number }> = ({ x, y, v, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <Cut d={10}><path d="M-380 0 A380 380 0 0 1 380 0 L320 0 A320 320 0 0 0 -320 0 Z" fill={K.paper3} /></Cut>
    {[[K.sage, 0, 0.33], [K.gold, 0.33, 0.66], [K.terra, 0.66, 1]].map(([col, a, b], k) => { const t0 = Math.PI * (1 + (a as number)), t1 = Math.PI * (1 + (b as number))
      return <path key={k} d={`M${Math.cos(t0) * 370} ${Math.sin(t0) * 370} A370 370 0 0 1 ${Math.cos(t1) * 370} ${Math.sin(t1) * 370} L${Math.cos(t1) * 330} ${Math.sin(t1) * 330} A330 330 0 0 0 ${Math.cos(t0) * 330} ${Math.sin(t0) * 330} Z`} fill={col as string} /> })}
    {Array.from({ length: 11 }, (_, k) => { const t = Math.PI * (1 + k / 10); return <rect key={k} x={-4} y={-300} width={8} height={30} fill={K.ink} transform={`rotate(${(t * 180) / Math.PI + 90})`} /> })}
    <g transform={`rotate(${-90 + 180 * v})`}><path d="M-14 0 L0 -290 L14 0 Z" fill={K.ink} /></g>
    <circle r={40} fill={K.ink} /><circle r={16} fill={K.gold} />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, M)
  const AB = c('s3') - 4, BC = c('s4') - 4, CD = c('s5') - 4, DE = c('s6') - 4, EF = c('s7') - 4, FG = c('s9') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = scene(f, DE, EF), Fs = scene(f, EF, FG), Gs = fadeIn(f, FG)
  const stops: [string, number, number][] = [['lab', 250, t.came9], ['lantern', 480, t.makes9], ['coin', 710, t.money9], ['note', 940, t.goes9], ['table', 1170, t.charge9], ['gavel', 1400, t.fights9], ['board', 1640, t.happens9]]
  const stopNames = ['WHERE FROM', 'WHAT IT MAKES', 'MONEY IN', 'MONEY OUT', 'WHO DECIDES', 'THE FIGHTS', 'NEXT WEEK']
  return (
    <g>
      <Defs />
      {/* ---------------- A) your phone, and who is behind the answer ---------------- */}
      {A > 0 && <g opacity={A}>
        <Room />
        <g opacity={on(f, t.behind2 - 6, 10)}>
          <Cut d={8}><rect x={1180} y={250} width={340} height={G - 250} rx={12} fill="#C8A274" /></Cut>
          <rect x={1210} y={280} width={280} height={G - 280} fill="#3A2C22" />
          <circle cx={1350} cy={560} r={200} fill="url(#an-glow)" opacity={on(f, t.behind2, 14)} />
          <g transform={`translate(1210 280) scale(${1 - 0.85 * easeInOut(span(f, t.behind2, t.behind2 + 16))} 1)`}><rect width={280} height={G - 280} fill="#B98557" /><circle cx={240} cy={(G - 280) / 2} r={12} fill={K.gold} /></g>
          <Lantern x={1350} y={600} s={0.55} f={f} o={on(f, t.answer2, 12)} />
        </g>
        <Desk x={760} y={800} w={1000} />
        <Person f={f} who="hero" beats={[[0, 'phone', 'neutral'], [t.letter1, 'phone', 'thinking'], [t.behind2, 'think', 'thinking'], [t.money2, 'scratchHead', 'shocked']]} x={520} y={1040} s={0.78} />
        <PhoneBig x={960} y={500} s={0.78} r={-3} o={on(f, t.asked1 - 4, 10)}>
          <Bubble x={20} y={-200} w={320} text="Fix my email?" size={36} side="r" o={on(f, t.email1 - 2, 8)} fill={K.terraL} />
          <Bubble x={-10} y={-60} w={330} text="Explain this letter" size={34} side="r" o={on(f, t.letter1 - 2, 8)} fill={K.terraL} />
          <Bubble x={0} y={90} w={320} text="Sure, here it is" size={34} o={on(f, t.answer2 - 4, 8)} fill={K.skyL} />
        </PhoneBig>
        {[0, 1, 2, 3].map((k) => { const p = span(f, t.money2 + k * 4, t.money2 + k * 4 + 22); return p > 0 && <Coin key={k} x={900 + (k - 1.5) * 70} y={lerp(640, G - 40, easeInOut(p))} r={34} spin={f / 6 + k} o={on(f, t.money2 + k * 4, 4)} /> })}
      </g>}

      {/* ---------------- B) the company and its AI ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Day f={f} city />
        <g transform={`translate(0 ${(1 - pop(f, t.anthropic3 - 4, 16)) * 300})`} opacity={on(f, t.anthropic3 - 4, 10)}><Building x={620} y={G} w={560} h={480} sign="ANTHROPIC" roof={K.terra} /></g>
        <Lantern x={1360} y={560} s={1.05} f={f} o={on(f, t.claude3 - 6, 10)} glow={on(f, t.claude3, 14)} />
        <Tag x={1360} y={830} text="CLAUDE" size={56} bg={K.terra} o={on(f, t.claude3, 10)} />
        {[0, 1, 2, 3, 4].map((k) => <Mini key={k} look={['zoe', 'max', 'worker', 'owner', 'buyer'][k]} x={260 + k * 120 + (k > 2 ? 900 : 0)} y={G + 120} scale={0.75} frame={f} seed={k} mood="happy" />).slice(0, Math.floor(lerp(0, 5, span(f, t.companies3, t.companies3 + 20)) + 0.01))}
      </g>}

      {/* ---------------- C) less than six years ago: seven people walk out ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Day f={f} />
        <Cal x={1560} y={420} top="JANUARY" big="2021" o={on(f, t.six4 - 2, 10)} />
        <Building x={420} y={G} w={520} h={420} sign="AI LAB" roof={K.navyL} color="#E3DCCF" door={on(f, t.group4, 10)} />
        {Array.from({ length: 7 }, (_, k) => { const p = easeInOut(span(f, t.group4 + k * 5, t.quit4 + 40 + k * 5)); return p > 0 && <g key={k}>
          <Mini look={['investor', 'investorF', 'zoe', 'max', 'worker', 'owner', 'buyer'][k]} x={lerp(420, 760 + k * 150, p)} y={G + 110} scale={0.95} frame={f} seed={k + 3} />
          <g opacity={on(f, t.quit4 - 2, 8)} transform={`translate(${lerp(420, 760 + k * 150, p) + 34} ${G + 40})`}><Cut d={3}><rect x={-30} y={-24} width={60} height={44} rx={4} fill="#C8A274" /></Cut></g>
        </g> })}
      </g>}

      {/* ---------------- D) the pace dial ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Day f={f} hills={false} tint={K.goldL} />
        <Dial x={960} y={800} v={0.05 + 0.88 * easeInOut(span(f, t.pace5, t.eightyone5 + 12))} o={on(f, t.brings5 - 6, 10)} />
        <Tag x={960} y={950} text="$81 BILLION A YEAR" size={70} bg={K.terra} o={on(f, t.eightyone5, 10)} />
        {Array.from({ length: 8 }, (_, k) => { const p = span(f, t.money5 + k * 3, t.money5 + k * 3 + 26); return p > 0 && p < 1 && <Coin key={k} x={k % 2 ? 260 + k * 18 : 1660 - k * 18} y={lerp(260, 900, easeInOut(p))} r={40} spin={f / 5 + k} /> })}
        <CoinStack x={300} y={G + 60} n={on(f, t.year5, 10) * 7} /><CoinStack x={1620} y={G + 60} n={on(f, t.year5, 10) * 7} />
      </g>}

      {/* ---------------- E) next week: anyone can buy a piece ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Room wall="#EADFCB" window={false} />
        <Cal x={300} y={420} top="NEXT WEEK" big="?" color={K.sageD} o={on(f, t.next6 - 2, 10)} />
        <Board x={1080} y={400} w={1000} h={360} o={on(f, t.next6, 10)}>
          <text x={-340} y={60} fill={on(f, t.stock6, 6) > 0.5 ? K.gold : '#3A4A6A'} style={BB(200, 20)}>ANT</text>
          <rect x={60} y={-60} width={360} height={130} rx={12} fill="#1E2A44" />
          <text x={240} y={30} textAnchor="middle" fill={K.greenL} opacity={on(f, t.stock6, 8)} style={BB(80)}>STOCK MARKET</text>
        </Board>
        {Array.from({ length: 6 }, (_, k) => { const a = t.anyone6 + k * 4; return <g key={k} opacity={on(f, a - 4, 8)}>
          <Mini look={['zoe', 'max', 'worker', 'owner', 'buyer', 'investorF'][k]} x={600 + k * 190} y={G + 120} scale={0.85} frame={f} seed={k + 9} mood="happy" />
          <Share x={600 + k * 190} y={lerp(560, G - 70, easeInOut(span(f, t.piece6 + k * 3, t.piece6 + k * 3 + 16)))} s={0.62} o={on(f, t.piece6 + k * 3, 8)} text="ANT" />
        </g> })}
      </g>}

      {/* ---------------- F) how does a chatbot get that big, that fast? ---------------- */}
      {Fs > 0 && <g opacity={Fs}>
        <Day f={f} />
        <Person f={f} who="hero" beats={[[0, 'think', 'thinking'], [t.big7, 'shock', 'shocked'], [t.tech8, 'relax', 'smiling'], [t.follow8, 'thumbsUp', 'smiling']]} x={420} y={1040} s={0.8} />
        {f < t.tech8 + 10 && <g opacity={1 - on(f, t.tech8, 10)}>
          <g transform={`translate(1150 560) scale(${lerp(0.35, 1.25, easeInOut(span(f, t.big7 - 4, t.big7 + 14)))})`} opacity={on(f, t.chatbot7 - 4, 8)}><Bubble x={0} y={0} w={440} text="Hi! How can I help?" size={40} fill={K.terraL} /></g>
          <g opacity={on(f, t.fast7 - 2, 8)}><path d={`M900 980 Q1300 ${900 - 300 * span(f, t.fast7, t.fast7 + 20)} 1700 ${300 + 120 * (1 - span(f, t.fast7, t.fast7 + 20))}`} stroke={K.gold} strokeWidth={14} fill="none" strokeDasharray="30 20" /><Rocket x={lerp(1300, 1700, span(f, t.fast7, t.fast7 + 20))} y={lerp(800, 300, span(f, t.fast7, t.fast7 + 20))} s={0.7} r={50} /></g>
        </g>}
        {f >= t.tech8 - 8 && <g>{[[1100, 520, 80, K.navyL], [1300, 640, 60, K.terra], [1480, 520, 90, K.sageD], [1250, 420, 50, K.gold]].map(([x, y, r, col], k) => {
          const away = span(f, t.tech8 + 6, t.tech8 + 30); return <Cog key={k} x={(x as number) + away * 900} y={(y as number) - away * 200} r={r as number} rot={f * 3 * (k % 2 ? 1 : -1)} color={col as string} o={on(f, t.tech8 - 8, 8) * (1 - away)} /> })}
          <text x={1290 + 900 * span(f, t.tech8 + 6, t.tech8 + 30)} y={760} textAnchor="middle" fill={K.ink2} opacity={on(f, t.tech8 - 8, 8) * (1 - span(f, t.tech8 + 6, t.tech8 + 30))} style={{ font: '700 54px "JetBrains Mono"' }}>{'{ } < / >'}</text></g>}
      </g>}

      {/* ---------------- G) the road of the video ---------------- */}
      {Gs > 0 && <g opacity={Gs}>
        <Day f={f} />
        <path d={`M120 ${G - 40} L1800 ${G - 40}`} stroke={K.paper3} strokeWidth={60} strokeLinecap="round" opacity={on(f, t.story9 - 4, 10)} />
        <path d={`M120 ${G - 40} L${lerp(120, 1800, easeInOut(span(f, t.story9, t.happens9 + 10)))} ${G - 40}`} stroke={K.terraL} strokeWidth={22} strokeLinecap="round" strokeDasharray="40 24" />
        {stops.map(([kind, x, at], k) => { const o = on(f, at - 2, 8), lit = pop(f, at - 2, 14); return o > 0.01 && <g key={k} opacity={o}>
          <g transform={`translate(${x} ${G - 120}) scale(${0.9 + 0.1 * lit})`}>
            {kind === 'lab' && <Building x={0} y={40} w={170} h={170} s={1} sign="" roof={K.navyL} color="#E3DCCF" />}
            {kind === 'lantern' && <Lantern x={0} y={-80} s={0.42} f={f} />}
            {kind === 'coin' && <Coin x={0} y={-70} r={70} />}
            {kind === 'note' && <Note x={0} y={-70} s={0.45} text="$100" />}
            {kind === 'table' && <g>{[-60, 0, 60].map((d) => <Mini key={d} look={d ? 'investor' : 'investorF'} x={d} y={20} scale={0.6} frame={f} seed={d + 30} />)}<Cut d={5}><rect x={-110} y={-40} width={220} height={26} rx={8} fill="#A9744A" /></Cut></g>}
            {kind === 'gavel' && <Gavel x={0} y={-80} s={0.6} r={-30 + 20 * Math.sin(f / 8)} />}
            {kind === 'board' && <Board x={0} y={-80} w={200} h={120}><text x={0} y={22} textAnchor="middle" fill={K.gold} style={BB(64, 8)}>ANT</text></Board>}
          </g>
          <Tag x={x} y={G + 90} text={stopNames[k]} size={32} bg={K.ink} />
        </g> })}
      </g>}

      <Headline f={f} lines={[[t.anthropic3, 'ANTHROPIC', K.ink, 110], [t.six4, 'LESS THAN SIX YEARS AGO', K.ink, 96], [t.brings5, 'TODAY', K.ink, 110], [t.next6, 'NEXT WEEK?', K.ink, 110], [t.chatbot7, 'THAT BIG, THAT FAST?', K.ink, 104], [t.story9, 'THE WHOLE STORY', K.ink, 104]]} />
      <Mark f={f} at={EXTRA.map(c)} />
      <Grain />
    </g>
  )
}

export const AN_HOOK = makePiece('an-hook', 'Hook: you ask your phone to fix an email and explain a letter; a paper door behind the phone opens on a glowing lantern and coins drop; the ANTHROPIC office rises and the Claude lantern lights; seven little people walk out of an AI lab with boxes (January 2021); a pace dial swings to $81 billion a year; a stock board lights ANT and people take a share each; a chat bubble grows huge and a rocket shoots up; cogs and code blow away; a paper road with seven stops lights up stop by stop', {
  mood: 'light', Component: Hook, beats: [...Object.values(M), ...EXTRA],
  sfx: [['s2:money', 'coin', 0.1], ['s5:eightyone', 'ding', 0.1], ['s6:stock', 'chime', 0.08]] })
