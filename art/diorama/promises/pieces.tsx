// ---------------------------------------------------------------- the four scenes of "Why You Keep Breaking Promises to Yourself".
// HOOK s1–s3b) the hallway: he sticks THIS TIME, FOR REAL on Monday's calendar box; the days tick on and by WEDNESDAY the
//    note peels off and drifts away; PROMISE − PLAN = WISH (the note turns into a dandelion puff that blows away); a
//    SELF-TRUST meter drops and cracks.
// GAP s4–s6) two cliff edges: I PLAN TO … and I ACTUALLY DO, with a gap between them: THE INTENTION–BEHAVIOUR GAP; three
//    blurry goals float (GET FIT · STUDY MORE · CALL FAMILY); a moon (TIRED EVENING), a sofa and a buzzing phone pull
//    him down onto the sofa: VAGUE LOSES.
// IF-THEN s7–s12) a card PETER GOLLWITZER · IMPLEMENTATION INTENTION; the railway switch: IF 7AM MONDAY → THEN SHOES ON;
//    on "moment" the lever throws and the train rolls up the THEN track; the shoes by the door glow; 94 STUDIES stack up,
//    8,000+ PEOPLE; a dial swings to MEDIUM–LARGE.
// PLAN s13–s21) two more switches for the hard moments (IF I WANT TO SKIP → THEN 5 MINUTES; IF PHONE IN BED → THEN CHARGER
//    ACROSS THE ROOM); DECIDE ONCE (he signs a note calmly); NO ARGUMENT; he writes his own IF … THEN … sticky; the moment
//    arrives and the note lights up; he hands the plan to his faded future self; SELF-TRUST fills back up.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Hallway, Headline, Person, PVig, Sticky, Switch, Tag, Trust, Vague, Week, win, COBALT, COBALT_L, CREAM, GOLD, GOLD_L, INK, BURG, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const told = c('s1:told'), time = c('s1:time'), really = c('s1:really')
  const s2 = c('s2'), promise = c('s2:promise'), quietly = c('s2:quietly'), disappear = c('s2:disappear'), wednesday = c('s2:wednesday')
  const s3 = c('s3'), mean = c('s3:mean'), plan = c('s3:plan'), wish = c('s3:wish')
  const s3b = c('s3b'), broken = c('s3b:broken'), harder = c('s3b:harder'), believe = c('s3b:believe')

  const day = f < s2 ? 0 : f < wednesday ? (f < quietly ? 0 : 1) : 2
  const peel = easeOut(span(f, disappear, wednesday + 14))
  const blow = easeOut(span(f, wish, wish + 20))
  const hero: Beat[] = [[0, 'idle', 'smiling'], [told, 'point', 'smiling'], [really, 'fistPump', 'smiling'], [s2, 'idle', 'neutral'], [disappear, 'lookFar', 'worried'], [wednesday, 'shrug', 'worried'], [s3, 'idle', 'thinking'], [plan, 'explain', 'neutral'], [wish, 'slump', 'worried'], [broken, 'despair', 'worried']]

  return (
    <g>
      <Hallway id="prh" />
      <Week x={160} y={560} day={day} />
      {/* # the promise note: stuck on Monday, peels off by Wednesday */}
      <Sticky x={lerp(160, 520, peel)} y={lerp(560, 360, peel)} r={lerp(-4, 40, peel)} s={0.55 * pop(f, told)} o={on(f, told, 6) * (1 - on(f, s3b, 8)) * (1 - blow)} text={['THIS TIME', 'FOR REAL!']} />
      <g opacity={on(f, wednesday, 6) * (1 - on(f, s3, 6))}><Tag x={CX} y={780} text="GONE BY WEDNESDAY" s={pop(f, wednesday)} size={56} fill={CREAM} ink={BURG} /></g>
      {/* # promise − plan = wish: a dandelion that blows apart */}
      <g opacity={on(f, plan, 6) * (1 - on(f, s3b, 8))}>
        <Tag x={CX} y={780} text="PROMISE − PLAN = WISH" s={pop(f, plan)} size={56} fill={GOLD} />
        <g transform="translate(720 980)">
          <path d="M0 0 L0 160" stroke="#5E8F50" strokeWidth={8} />
          {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2, d = 40 + blow * (200 + k * 20)
            return <g key={k} opacity={1 - blow * 0.8}><path d={`M${Math.cos(a) * d * 0.3} ${Math.sin(a) * d * 0.3 - blow * 100} L${Math.cos(a) * d} ${Math.sin(a) * d - blow * 160}`} stroke="#FFFFFF" strokeWidth={4} /><circle cx={Math.cos(a) * d} cy={Math.sin(a) * d - blow * 160} r={8} fill="#FFFFFF" /></g> })}
          <circle r={14} fill="#E8E2D0" />
        </g>
      </g>
      <g opacity={on(f, s3b, 6)}><Trust x={760} y={1140} v={lerp(0.8, 0.35, easeOut(span(f, broken, harder + 10)))} crack={on(f, believe, 6)} s={0.95} /></g>
      <g opacity={on(f, harder, 6)}><Tag x={CX} y={480} text="HARDER TO BELIEVE YOURSELF" s={pop(f, harder)} size={46} fill={CREAM} ink={BURG} /></g>
      <Person f={f} who="hero-struggling" beats={hero} x={300} s={0.88} />
      <Headline text={f < s3 ? 'THIS TIME. REALLY.' : f < s3b ? '' : ''} o={f < s3 ? on(f, time, 8) * (1 - on(f, s3 - 4, 4)) : 0} color={INK} />
      <PVig id="prh" />
    </g>
  )
}

const Gap: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), intention = c('s4:intention'), gap = c('s4:gap'), space = c('s4:space'), plan = c('s4:plan'), actually = c('s4:actually')
  const s5 = c('s5'), vague = c('s5:vague'), fit = c('s5:fit'), study = c('s5:study'), family = c('s5:family')
  const s6 = c('s6'), loses = c('s6:loses'), front = c('s6:front'), tired = c('s6:tired'), sofa = c('s6:sofa'), phone = c('s6:phone')

  const A = win(f, 0, s5 + 4), B = on(f, s5, 10)
  const open = easeOut(span(f, gap, space + 10))
  const hero: Beat[] = [[s5, 'idle', 'thinking'], [fit, 'fistPump', 'smiling'], [study, 'read', 'neutral'], [family, 'phone', 'neutral'], [loses, 'slump', 'worried'], [tired, 'slump', 'worried'], [sofa, 'sit', 'neutral'], [phone, 'phone', 'neutral']]
  const sat = f >= sofa

  return (
    <g>
      <Hallway id="prg" door={B > 0.5} />
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={GROUND - 70} width={1080} height={800} fill="#B98A5E" />
        {/* # two cliffs and the gap */}
        <path d={`M0 ${GROUND - 300} L${CX - 40 - 160 * open} ${GROUND - 300} L${CX - 60 - 160 * open} 1920 L0 1920 Z`} fill={COBALT} />
        <path d={`M1080 ${GROUND - 300} L${CX + 40 + 160 * open} ${GROUND - 300} L${CX + 60 + 160 * open} 1920 L1080 1920 Z`} fill={COBALT} />
        <g opacity={on(f, plan, 6)}><Tag x={220} y={GROUND - 420} text="I PLAN TO…" s={pop(f, plan)} size={52} fill={CREAM} ink={INK} /></g>
        <g opacity={on(f, actually, 6)}><Tag x={860} y={GROUND - 420} text="I ACTUALLY DO" s={pop(f, actually)} size={48} fill={GOLD} /></g>
        <g opacity={on(f, intention, 6)}><Tag x={CX} y={520} text="THE INTENTION–BEHAVIOUR GAP" s={pop(f, intention)} size={46} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Vague x={320} y={540} text="GET FIT" o={on(f, fit, 6) * (1 - on(f, loses, 8))} />
        <Vague x={760} y={680} text="STUDY MORE" o={on(f, study, 6) * (1 - on(f, loses, 8))} />
        <Vague x={460} y={840} text="CALL FAMILY" o={on(f, family, 6) * (1 - on(f, loses, 8))} />
        <g opacity={on(f, tired, 6)}><circle cx={820} cy={520} r={70} fill="#F6EFD2" /><circle cx={850} cy={500} r={62} fill={GOLD_L} opacity={0.0} /><Tag x={820} y={660} text="TIRED EVENING" s={pop(f, tired)} size={40} /></g>
        <g opacity={on(f, sofa, 6)}>
          <rect x={160} y={GROUND - 220} width={440} height={170} rx={34} fill={COBALT} stroke={INK} strokeWidth={6} />
          <rect x={130} y={GROUND - 320} width={70} height={280} rx={28} fill={COBALT} stroke={INK} strokeWidth={6} /><rect x={560} y={GROUND - 320} width={70} height={280} rx={28} fill={COBALT} stroke={INK} strokeWidth={6} />
        </g>
        <g opacity={on(f, phone, 6)} transform={`translate(${480 + Math.sin(f * 2.4) * 4} ${GROUND - 460}) rotate(-10)`}><rect x={-30} y={-54} width={60} height={108} rx={10} fill={INK} /><rect x={-24} y={-46} width={48} height={88} rx={6} fill="#5AA9F0" /></g>
        <g opacity={on(f, loses, 6)}><Tag x={CX} y={480} text="VAGUE LOSES" s={pop(f, loses)} size={66} fill={CREAM} ink={BURG} /></g>
        <Person f={f} who="hero-struggling" beats={hero} x={sat ? 380 : 300} y={sat ? GROUND - 120 : GROUND} s={0.88} />
        {sat && <rect x={160} y={GROUND - 170} width={440} height={120} rx={30} fill={COBALT} stroke={INK} strokeWidth={6} />}
      </g>}
      <Headline text={f < s5 ? 'THE GAP' : 'VAGUE GOALS'} o={f < s5 ? on(f, s4, 8) * (1 - on(f, s5 - 4, 4)) : on(f, vague, 8) * (1 - on(f, loses - 4, 4))} color={INK} />
      <PVig id="prg" />
    </g>
  )
}

const IfThen: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), gollwitzer = c('s7:gollwitzer'), simple = c('s7:simple'), implementation = c('s7:implementation')
  const s8 = c('s8'), friendlier = c('s8:friendlier'), ifthen = c('s8:ifthen')
  const s9 = c('s9'), exercise = c('s9:exercise'), seven = c('s9:seven'), monday = c('s9:monday'), shoes = c('s9:shoes'), door = c('s9:door')
  const s10 = c('s10'), tie = c('s10:tie'), moment = c('s10:moment'), reminder = c('s10:reminder')
  const s11 = c('s11'), combined = c('s11:combined'), n94 = c('s11:94'), n8000 = c('s11:8000'), followed = c('s11:followed')
  const s12 = c('s12'), tiny = c('s12:tiny'), medium = c('s12:medium'), large = c('s12:large'), deal = c('s12:deal')

  const A = win(f, 0, s9 + 4), B = win(f, s9, s11 + 4), C = on(f, s11, 10)
  const thrown = on(f, moment, 6)
  const train = span(f, moment, reminder + 30)
  const hero: Beat[] = [[s9, 'idle', 'neutral'], [exercise, 'shrug', 'neutral'], [seven, 'pointUp', 'thinking'], [shoes, 'reachDown', 'smiling'], [moment, 'pull', 'smiling'], [reminder, 'thumbsUp', 'smiling']]
  const dial = lerp(-80, 30, easeOut(span(f, medium, large + 10)))

  return (
    <g>
      <Hallway id="pri" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, gollwitzer, 6)} transform={`translate(${CX} 720) scale(${pop(f, gollwitzer)})`}>
          <rect x={-330} y={-170} width={660} height={340} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text y={-90} textAnchor="middle" fill={COBALT} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 4 }}>PETER GOLLWITZER</text>
          <text y={-36} textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>PSYCHOLOGIST</text>
          <text y={50} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, implementation, 6)}>IMPLEMENTATION</text>
          <text y={110} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, implementation, 6)}>INTENTION</text>
        </g>
        <g opacity={on(f, simple, 6) * (1 - on(f, implementation, 6))}><Tag x={CX} y={480} text="A SIMPLE FIX" s={pop(f, simple)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, ifthen, 6)}><Tag x={CX} y={480} text="= AN IF-THEN PLAN" s={pop(f, ifthen)} size={60} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Switch x={650} y={920} s={0.75} thrown={thrown} train={train} ifText={f >= monday ? '7AM MONDAY' : '…'} thenText={f >= shoes ? 'SHOES ON' : '…'} />
        {/* # the running shoes by the door, glowing on "door" */}
        <g opacity={on(f, shoes, 6)} transform={`translate(880 ${GROUND - 40})`}>
          <ellipse cx={0} cy={-10} rx={140} ry={40} fill={GOLD_L} opacity={0.6 * on(f, door, 6)} />
          {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 50} 0)`}><path d="M-50 0 Q-44 -40 -8 -42 Q14 -28 42 -20 Q56 -14 54 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} /><rect x={-52} y={-4} width={108} height={10} rx={5} fill={COBALT} /></g>)}
        </g>
        <g opacity={on(f, exercise, 6) * (1 - on(f, seven, 6))}><Vague x={CX} y={520} text="I'LL EXERCISE MORE" /></g>
        <g opacity={on(f, reminder, 6)}><Tag x={CX} y={500} text="THE MOMENT = THE REMINDER" s={pop(f, reminder)} size={48} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={hero} x={220} s={0.85} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # 94 studies stacking, 8,000+ people */}
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={180 + (k % 2) * 8} y={1150 - k * 34} width={260} height={30} rx={4} fill={k % 2 ? '#FFFFFF' : COBALT_L} stroke={INK} strokeWidth={3} opacity={on(f, combined + k * 2, 3)} />)}
        <g opacity={on(f, n94, 6)}><Tag x={310} y={620} text="94 STUDIES" s={pop(f, n94)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, n8000, 6)}><Tag x={310} y={500} text="8,000+ PEOPLE" s={pop(f, n8000)} size={50} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, followed, 6) * (1 - on(f, s12, 6))}><Tag x={760} y={800} text="MORE FOLLOW-THROUGH" s={pop(f, followed)} size={44} fill={GOLD} /></g>
        {/* # the effect dial */}
        <g opacity={on(f, tiny, 6)} transform="translate(760 960)">
          <path d="M-200 0 A200 200 0 0 1 200 0" fill="none" stroke={INK} strokeWidth={10} />
          <path d="M-200 0 A200 200 0 0 1 -60 -190" fill="none" stroke="#C9C2B8" strokeWidth={30} />
          <path d="M-60 -190 A200 200 0 0 1 120 -160" fill="none" stroke={COBALT_L} strokeWidth={30} />
          <path d="M120 -160 A200 200 0 0 1 200 0" fill="none" stroke={GOLD} strokeWidth={30} />
          <g transform={`rotate(${dial})`}><rect x={-6} y={-180} width={12} height={180} rx={6} fill={BURG} /></g><circle r={20} fill={BURG} />
          <text x={-200} y={60} fill={INK} style={{ font: '400 36px "Bebas Neue"' }}>TINY</text>
          <text x={120} y={60} fill={INK} style={{ font: '400 36px "Bebas Neue"' }}>LARGE</text>
          <text y={140} textAnchor="middle" fill={BURG} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, large, 6)}>MEDIUM–LARGE</text>
        </g>
        <g opacity={on(f, deal, 6)}><Tag x={760} y={560} text="A BIG DEAL" s={pop(f, deal)} size={60} fill={GOLD} /></g>
      </g>}
      <Headline text={f < s9 ? 'THE SIMPLE FIX' : f < s11 ? 'IF… THEN…' : 'DOES IT WORK?'} o={f < s9 ? on(f, gollwitzer, 8) * (1 - on(f, s9 - 4, 4)) : f < s11 ? on(f, s9, 8) * (1 - on(f, s11 - 4, 4)) : on(f, combined, 8)} color={INK} />
      <PVig id="pri" />
    </g>
  )
}

const Plan: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), hard = c('s13:hard')
  const s14 = c('s14'), skipping = c('s14:skipping'), five = c('s14:five'), phone = c('s14:phone'), bed = c('s14:bed'), charger = c('s14:charger'), room = c('s14:room')
  const s15 = c('s15'), decision = c('s15:decision'), once = c('s15:once'), calmly = c('s15:calmly'), arrives = c('s15:arrives')
  const s16 = c('s16'), argue = c('s16:argue'), follow = c('s16:follow')
  const s16b = c('s16b'), choice = c('s16b:choice'), showing = c('s16b:showing')
  const s17 = c('s17'), pick = c('s17:pick'), breaking = c('s17:breaking')
  const s18 = c('s18'), write = c('s18:write'), happens = c('s18:happens'), specific = c('s18:specific'), where = c('s18:where')
  const s19 = c('s19'), moment = c('s19:moment'), remembering = c('s19:remembering')
  const s20 = c('s20'), willpower = c('s20:willpower'), future = c('s20:future'), follow20 = c('s20:follow')
  const s21 = c('s21'), keep = c('s21:keep'), easier = c('s21:easier'), trust = c('s21:trust')

  const A = win(f, 0, s15 + 4), B = win(f, s15, s17 + 4), C = on(f, s17, 10)
  const hero: Beat[] = [[s13, 'idle', 'neutral'], [skipping, 'shrug', 'neutral'], [five, 'countOne', 'smiling'], [phone, 'phone', 'neutral'], [charger, 'point', 'smiling'], [s15, 'idle', 'neutral'], [decision, 'type', 'neutral'], [calmly, 'relax', 'smiling'], [argue, 'crossNoA', 'smiling'], [follow, 'walkA', 'smiling'], [follow + 8, 'walkB', 'smiling'], [showing, 'confident', 'smiling'],
    [pick, 'think', 'thinking'], [write, 'type', 'neutral'], [specific, 'point', 'neutral'], [moment, 'pointUp', 'smiling'], [future, 'offer', 'smiling'], [keep, 'holdChest', 'smiling'], [trust, 'celebrate', 'smiling']]

  return (
    <g>
      <Hallway id="prp" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, skipping, 6) * (1 - on(f, phone - 4, 6))}><Switch x={650} y={900} s={0.72} thrown={on(f, five, 6)} train={span(f, five, phone - 4)} ifText="I WANT TO SKIP" thenText="5 MINUTES" /></g>
        <g opacity={on(f, phone, 6)}><Switch x={650} y={900} s={0.72} thrown={on(f, charger, 6)} train={span(f, charger, room + 30)} ifText="PHONE IN BED" thenText="ACROSS THE ROOM" /></g>
        <g opacity={on(f, hard, 6) * (1 - on(f, skipping, 6))}><Tag x={CX} y={480} text="FOR THE HARD MOMENTS" s={pop(f, hard)} size={56} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={hero} x={200} s={0.85} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, decision, 6) * (1 - on(f, s16, 6))}><Sticky x={720} y={760} s={1.1 * pop(f, decision)} r={-4} text={['DECIDED:', 'IF…', 'THEN…']} /></g>
        <g opacity={on(f, once, 6) * (1 - on(f, s16, 6))}><Tag x={720} y={480} text="DECIDE ONCE. CALMLY." s={pop(f, once)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, argue, 6) * (1 - on(f, s16b, 6))}><Tag x={720} y={480} text="NO ARGUMENT NEEDED" s={pop(f, argue)} size={54} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, choice, 6)}><Tag x={720} y={480} text="THE PLAN ALREADY CHOSE" s={pop(f, choice)} size={50} fill={GOLD} /></g>
        <g opacity={on(f, arrives, 6) * (1 - on(f, s16b, 8))}><circle cx={720} cy={860} r={90} fill="#FFFFFF" stroke={INK} strokeWidth={6} /><path d="M720 860 L720 800 M720 860 L760 880" stroke={INK} strokeWidth={8} strokeLinecap="round" /></g>
        <Person f={f} who="hero" beats={hero} x={lerp(200, 300, span(f, follow, follow + 20))} s={0.85} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, write, 6)}><Sticky x={700} y={760} s={1.25 * pop(f, write)} r={-3} text={f >= happens ? ['IF 7AM MON', 'THEN SHOES', 'BY THE DOOR'] : ['IF …', 'THEN …']} /></g>
        <g opacity={on(f, moment, 6) * (1 - on(f, s20, 6))}><circle cx={700} cy={760} r={190} fill={GOLD_L} opacity={0.45 * (0.8 + 0.2 * Math.sin(f / 4))} /></g>
        <g opacity={on(f, pick, 6) * (1 - on(f, write, 6))}><Tag x={CX} y={480} text="PICK ONE PROMISE" s={pop(f, pick)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, specific, 6) * (1 - on(f, s19, 6))}><Tag x={CX} y={480} text="WHEN? WHERE?" s={pop(f, specific)} size={60} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, remembering, 6) * (1 - on(f, s20, 6))}><Tag x={CX} y={480} text="THE MOMENT REMEMBERS" s={pop(f, remembering)} size={52} fill={GOLD} /></g>
        {/* # hand the plan to your future self */}
        <g opacity={on(f, future, 8) * (1 - on(f, s21, 8))}>
          <g opacity={0.45}><Person f={f} who="hero-fit" beats={[[future, 'receive', 'smiling']]} x={820} s={0.85} /></g>
          <Tag x={820} y={GROUND - 640} text="FUTURE YOU" s={pop(f, future)} size={40} />
        </g>
        <g opacity={on(f, willpower, 6) * (1 - on(f, future, 6))}><Tag x={CX} y={480} text="NOT MORE WILLPOWER" s={pop(f, willpower)} size={54} /></g>
        <g opacity={on(f, follow20, 6) * (1 - on(f, s21, 6))}><Tag x={CX} y={480} text="A PLAN THEY CAN FOLLOW" s={pop(f, follow20)} size={50} fill={GOLD} /></g>
        <g opacity={on(f, s21, 6)}><Trust x={860} y={1150} v={lerp(0.35, 0.95, easeOut(span(f, keep, trust + 20)))} s={0.95} /><Tag x={CX} y={480} text={f >= easier ? 'EASIER TO TRUST' : 'EVERY PROMISE KEPT'} s={pop(f, f >= easier ? easier : keep)} size={56} fill={GOLD} /></g>
        <Person f={f} who="hero" beats={hero} x={300} s={0.85} />
      </g>}
      <Headline text={f < s15 ? 'PLAN THE HARD PARTS' : f < s17 ? '' : f < s20 ? 'YOUR FIRST IF-THEN' : 'KEEP THE PROMISE'} o={f < s15 ? on(f, skipping, 8) * (1 - on(f, s15 - 4, 4)) : f < s17 ? 0 : f < s20 ? on(f, s17, 8) * (1 - on(f, s20 - 4, 4)) : on(f, willpower, 8)} color={INK} />
      <PVig id="prp" />
    </g>
  )
}

export const PR_HOOK = makePiece('pr-hook', 'Promises: gone by Wednesday', {
  beats: ['s1:told', 's1:time', 's1:really', 's2', 's2:promise', 's2:quietly', 's2:disappear', 's2:wednesday', 's3', 's3:mean', 's3:plan', 's3:wish', 's3b', 's3b:broken', 's3b:harder', 's3b:believe'],
  sfx: [['s1:told', 'softpop'], ['s2:wednesday', 'swish'], ['s3:wish', 'whoosh'], ['s3b:believe', 'crack']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const PR_GAP = makePiece('pr-gap', 'Promises: the intention-behaviour gap, vague loses', {
  beats: ['s4', 's4:intention', 's4:gap', 's4:space', 's4:plan', 's4:actually', 's5', 's5:vague', 's5:fit', 's5:study', 's5:family', 's6', 's6:loses', 's6:front', 's6:tired', 's6:sofa', 's6:phone'],
  sfx: [['s4:gap', 'crack'], ['s5:fit', 'softpop'], ['s5:study', 'softpop'], ['s5:family', 'softpop'], ['s6:sofa', 'thud'], ['s6:phone', 'tick']],
  Component: Gap, mood: 'light', canvas: 'tall',
})
export const PR_IFTHEN = makePiece('pr-ifthen', 'Promises: if-then plans (Gollwitzer, 94 studies)', {
  beats: ['s7', 's7:gollwitzer', 's7:simple', 's7:implementation', 's8', 's8:friendlier', 's8:ifthen', 's9', 's9:exercise', 's9:decide', 's9:seven', 's9:monday', 's9:shoes', 's9:door', 's10', 's10:tie', 's10:moment', 's10:reminder', 's11', 's11:combined', 's11:94', 's11:8000', 's11:people', 's11:clear', 's11:difference', 's11:followed', 's12', 's12:tiny', 's12:medium', 's12:large', 's12:deal'],
  sfx: [['s7:implementation', 'ding'], ['s10:moment', 'click'], ['s10:reminder', 'chime'], ['s11:94', 'pop'], ['s11:8000', 'pop'], ['s12:large', 'riser']],
  Component: IfThen, mood: 'light', canvas: 'tall',
})
export const PR_PLAN = makePiece('pr-plan', 'Promises: plan the hard moments, write your own if-then', {
  beats: ['s13', 's13:hard', 's14', 's14:skipping', 's14:five', 's14:phone', 's14:bed', 's14:charger', 's14:room', 's15', 's15:decision', 's15:once', 's15:calmly', 's15:arrives', 's16', 's16:argue', 's16:follow', 's16b', 's16b:choice', 's16b:showing', 's17', 's17:pick', 's17:breaking', 's18', 's18:write', 's18:happens', 's18:specific', 's18:where', 's19', 's19:moment', 's19:remembering', 's20', 's20:keeping', 's20:promises', 's20:yourself', 's20:having', 's20:willpower', 's20:future', 's20:follow', 's21', 's21:keep', 's21:easier', 's21:trust'],
  sfx: [['s14:five', 'click'], ['s14:charger', 'click'], ['s15:once', 'thud'], ['s18:write', 'swish'], ['s19:moment', 'ding'], ['s20:future', 'whoosh'], ['s21:trust', 'chime']],
  Component: Plan, mood: 'light', canvas: 'tall',
})
