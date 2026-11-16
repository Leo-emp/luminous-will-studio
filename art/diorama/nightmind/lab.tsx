// ---------------------------------------------------------------- s12–s18: the sleep lab.
// A) a sleep-lab bedroom: a bed with a sleeper-bump, a monitor with a busy brainwave; BAYLOR UNIVERSITY and 57
//    YOUNG ADULTS tags; a 5-minute timer over a notepad. B) two lists side by side: DONE (ticks) vs TO-DO (open
//    boxes); the moon arcs across the window, the wave slows. C) two "time to fall asleep" bars: the to-do bar is
//    shorter — ABOUT 9 MIN FASTER; a vague line is rewritten specific and the bar shrinks again. D) honest note:
//    SMALL STUDY · HEALTHY YOUNG ADULTS, then the price tag: 5 MINUTES + A PEN.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Attic, BedBack, BedFront, Headline, Monitor, NVig, SleepBar, Tag, win, AMBER, CREAM, GOLD, INK, BURG, MINT, MINT_D, GROUND, CX, on, pop, lerp, span, easeOut } from './kit'
import { Mini } from '../../rig/Mini'

const List: React.FC<{ x: number; y: number; head: string; done: boolean; n: number; s?: number }> = ({ x, y, head, done, n, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-190} width={300} height={380} rx={12} fill="#FFFDF6" stroke={INK} strokeWidth={6} />
    <text y={-130} textAnchor="middle" fill={done ? MINT_D : BURG} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>{head}</text>
    {[0, 1, 2, 3].map((k) => k < n && <g key={k} transform={`translate(-110 ${-80 + k * 64})`}>
      <rect width={36} height={36} rx={6} fill="none" stroke={INK} strokeWidth={4} />
      {done && <path d="M6 18 L15 28 L31 6" stroke="#2E8B57" strokeWidth={6} fill="none" strokeLinecap="round" />}
      <rect x={52} y={14} width={150 - (k % 2) * 40} height={10} rx={5} fill={INK} opacity={0.3} />
    </g>)}
  </g>
)

const Lab: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), simple = c('s12:simple'), tested = c('s12:tested'), lab = c('s12:lab')
  const s13 = c('s13'), baylor = c('s13:baylor'), n57 = c('s13:57'), young = c('s13:young'), n5 = c('s13:5'), writing = c('s13:writing'), bed = c('s13:bed')
  const s14 = c('s14'), half = c('s14:half'), finished = c('s14:finished'), other = c('s14:other'), todo = c('s14:todo'), next = c('s14:next')
  const s15 = c('s15'), measured = c('s15:measured'), sleep = c('s15:sleep'), night = c('s15:night')
  const s16 = c('s16'), faster = c('s16:faster'), n9 = c('s16:9'), average = c('s16:average')
  const s17 = c('s17'), specific = c('s17:specific'), quicker = c('s17:quicker'), drifted = c('s17:drifted')
  const s18 = c('s18'), small = c('s18:small'), healthy = c('s18:healthy'), costs = c('s18:costs'), five = c('s18:five'), pen = c('s18:pen')

  const A = win(f, 0, s14 + 4), B = win(f, s14, s16 + 4), C = win(f, s16, s18 + 4), D = on(f, s18, 10)
  const moon = span(f, s15, s16)
  const todoW = f < faster ? 520 : lerp(520, 400, easeOut(span(f, faster, n9 + 10))) - lerp(0, 90, easeOut(span(f, quicker, drifted + 10)))

  return (
    <g>
      <Attic id="nmb" f={f} lamp={0.15} />
      {/* # A) the sleep lab */}
      {A > 0.001 && <g opacity={A}>
        <BedBack x={600} />
        <BedFront x={600} bump={1} />
        <Monitor f={f} x={260} y={700} s={0.8 * pop(f, lab)} calm={0} />
        <g opacity={on(f, lab, 6)}><path d="M330 760 Q420 900 380 1010" stroke={MINT} strokeWidth={5} fill="none" strokeDasharray="12 10" /></g>
        <g opacity={on(f, simple, 6) * (1 - on(f, s13, 6))}><Tag x={CX} y={480} text="TESTED IN A SLEEP LAB" s={pop(f, tested)} size={52} fill={MINT} ink={INK} /></g>
        <g opacity={on(f, baylor, 6)}><Tag x={700} y={480} text="BAYLOR UNIVERSITY" s={pop(f, baylor)} size={46} /></g>
        {/* # 57 young adults: a little crowd + the count */}
        <g opacity={on(f, n57, 6) * (1 - on(f, n5, 6))}>
          {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, n57 + k, 3)}><Mini look={['hero-fit', 'hero-rich', 'hero-struggling'][k % 3]} x={560 + (k % 5) * 100} y={760 + Math.floor(k / 5) * 160} scale={0.9} frame={f} seed={k + 40} mood="happy" /></g>)}
          <Tag x={760} y={620} text="57 YOUNG ADULTS" s={pop(f, n57)} size={50} fill={GOLD} />
        </g>
        <g opacity={on(f, n5, 6)} transform={`translate(780 760) scale(${pop(f, n5)})`}>
          <circle r={110} fill={CREAM} stroke={INK} strokeWidth={8} />{/* # five minutes of the hour = a 30° slice */}<path d="M0 0 L0 -92 A92 92 0 0 1 46 -79.7 Z" fill={AMBER} />
          <text y={170} textAnchor="middle" fill={CREAM} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>5 MIN OF WRITING</text>
        </g>
      </g>}
      {/* # B) two lists, one night */}
      {B > 0.001 && <g opacity={B}>
        <List x={300} y={760} head="DONE LIST" done n={f >= finished ? 4 : 0} s={0.95 * pop(f, half)} />
        <g opacity={on(f, other, 6)}><List x={780} y={760} head="TO-DO LIST" done={false} n={f >= todo ? 4 : 1} s={0.95 * pop(f, other)} /></g>
        <g opacity={on(f, next, 6) * (1 - on(f, s15, 6))}><Tag x={780} y={1030} text="NEXT FEW DAYS" s={pop(f, next)} size={46} fill={GOLD} /></g>
        {/* # the night passes: the moon arcs over the window, the monitor wave calms */}
        <g opacity={on(f, measured, 8)}>
          <circle cx={lerp(660, 940, moon)} cy={560 - Math.sin(moon * Math.PI) * 120} r={40} fill="#F6EFD2" />
          <Monitor f={f} x={CX} y={1080} s={0.6} calm={easeOut(span(f, sleep, night + 20))} />
        </g>
      </g>}
      {/* # C) who fell asleep faster */}
      {C > 0.001 && <g opacity={C}>
        <text x={120} y={560} fill={CREAM} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>TIME TO FALL ASLEEP</text>
        <SleepBar x={120} y={700} w={520} label="DONE LIST" tone="#8C86A8" o={on(f, s16, 6)} />
        <SleepBar x={120} y={880} w={todoW} label="TO-DO LIST" tone={MINT} o={on(f, s16, 6)} />
        <g opacity={on(f, n9, 6)}><Tag x={780} y={1060} text="ABOUT 9 MIN FASTER" s={pop(f, n9)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, average, 6) * (1 - on(f, s17, 6))}><text x={780} y={1160} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>ON AVERAGE</text></g>
        {/* # a vague line rewritten specific */}
        <g opacity={on(f, specific, 6)} transform="translate(560 1160)">
          <text x={-300} y={0} fill="#C9C3E0" style={{ font: '400 40px "Bebas Neue"' }} opacity={1 - on(f, quicker, 6)}>• WORK STUFF</text>
          <path d={`M-306 -14 L${lerp(-306, -80, easeOut(span(f, specific + 4, quicker)))} -14`} stroke="#D2463C" strokeWidth={6} opacity={1 - on(f, quicker, 6)} />
          <text x={-300} y={0} fill={MINT} style={{ font: '400 40px "Bebas Neue"' }} opacity={on(f, quicker, 6)}>• EMAIL SAM THE REPORT BY 10</text>
        </g>
      </g>}
      {/* # D) small study, tiny price */}
      {D > 0.001 && <g opacity={D}>
        <Tag x={CX} y={560} text="SMALL STUDY" s={pop(f, small)} size={64} fill={CREAM} ink={BURG} />
        <g opacity={on(f, healthy, 6)}><Tag x={CX} y={720} text="HEALTHY YOUNG ADULTS" s={pop(f, healthy)} size={46} /></g>
        <g opacity={on(f, costs, 6)} transform={`translate(${CX} 960) scale(${pop(f, costs)})`}>
          <path d="M-280 -80 L200 -80 L280 0 L200 80 L-280 80 Z" fill={GOLD} stroke={INK} strokeWidth={7} />
          <circle cx={190} cy={0} r={16} fill={INK} />
          <text x={-40} y={20} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>{f >= pen ? '5 MIN + A PEN' : f >= five ? '5 MIN' : 'COST'}</text>
        </g>
        <g opacity={on(f, pen, 6)} transform={`translate(830 1130) rotate(-30) scale(${pop(f, pen)})`}><rect x={-120} y={-14} width={220} height={28} rx={8} fill={BURG} stroke={INK} strokeWidth={5} /><path d="M100 -14 L140 0 L100 14 Z" fill={CREAM} stroke={INK} strokeWidth={5} /></g>
      </g>}
      <Headline text={f < s14 ? 'THE SLEEP LAB' : f < s16 ? 'ONE NIGHT, TWO LISTS' : f < s18 ? 'TO-DO LIST WINS' : 'THE FINE PRINT'} o={f < s14 ? on(f, lab, 8) * (1 - on(f, s14 - 4, 4)) : f < s16 ? on(f, s14, 8) * (1 - on(f, s16 - 4, 4)) : f < s18 ? on(f, faster, 8) * (1 - on(f, s18 - 4, 4)) : on(f, small, 8)} color={CREAM} />
      <NVig id="nmb" />
    </g>
  )
}

export const NM_LAB = makePiece('nm-lab', 'Night mind: the Baylor sleep-lab study', {
  beats: ['s12', 's12:simple', 's12:tested', 's12:lab', 's13', 's13:baylor', 's13:57', 's13:young', 's13:5', 's13:writing', 's13:bed', 's14', 's14:half', 's14:finished', 's14:other', 's14:todo', 's14:next', 's15', 's15:measured', 's15:sleep', 's15:night', 's16', 's16:faster', 's16:9', 's16:average', 's17', 's17:specific', 's17:quicker', 's17:drifted', 's18', 's18:small', 's18:healthy', 's18:costs', 's18:five', 's18:pen'],
  sfx: [['s12:lab', 'click'], ['s13:57', 'pop'], ['s13:5', 'tick'], ['s14:half', 'swish'], ['s14:other', 'swish'], ['s16:9', 'ding'], ['s17:quicker', 'softpop'], ['s18:pen', 'pop']],
  Component: Lab, mood: 'light', canvas: 'tall',
})
