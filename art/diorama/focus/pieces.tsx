// ---------------------------------------------------------------- the four scenes of "Why You Can't Focus Anymore".
// HOOK s1–s2b) he sits at the desk to do ONE THING; a 2-minute clock sweeps and — blink — the phone is in his hand;
//    NOT BROKEN · NOT ALONE; then the world gets louder: notification chips swarm in around him.
// SECONDS s3–s6b) GLORIA MARK · UC IRVINE (a labelled research clipboard, no portrait); a 20-year timeline; two
//    stopwatches: EARLY STUDIES ~2.5 MIN vs RECENT ~47 SEC; then the attention beam hops from tab to tab — MESSAGE,
//    NEW TAB, NOTIFICATION — and a thought bubble pops: GONE.
// RESIDUE s7–s11) two task cards; when he switches, a lime "residue" thread stays stuck to the first card; he is
//    split half/half (HALF REPLYING · HALF READING) and a battery reads TIRED; a long dotted road back to the desk with
//    a clock: ~23 MIN TO GET BACK.
// FIX s12–s21) a silent phone face-down on the desk; two brain-power columns: PHONE ON DESK lower than PHONE IN
//    ANOTHER ROOM; BUSY NOT CHECKING IT; a tapping finger. Then the fix: the phone goes out the door, tabs close one
//    by one, a bell is crossed out, a 25:00 timer, the beam wanders and is gently brought back; finally it lands on ONE task.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Beam, Chip, Col, Desk, DESK_Y, FVig, Headline, Laptop, Person, Phone, Room, Stopwatch, TabCard, Tag, win, CORAL, CREAM, GOLD, INK, BURG, LIME, SLATE_D, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const one = c('s1:one'), two = c('s1:two'), holding = c('s1:holding'), phone = c('s1:phone'), remember = c('s1:remember'), picking = c('s1:picking')
  const s2 = c('s2'), familiar = c('s2:familiar'), broken = c('s2:broken'), alone = c('s2:alone')
  const s2b = c('s2b'), worse = c('s2b:worse'), world = c('s2b:world'), louder = c('s2b:louder')

  const inHand = f >= holding
  const hero: Beat[] = [[0, 'type', 'neutral'], [two, 'type', 'neutral'], [holding, 'phone', 'neutral'], [remember, 'phone', 'shocked'], [s2, 'idle', 'thinking'], [broken, 'shrug', 'smiling'], [s2b, 'idle', 'neutral'], [louder, 'nervous', 'worried']]
  const chips = ['NEW MESSAGE', 'SALE: 50% OFF', '3 LIKES', 'BREAKING NEWS', 'REMINDER', 'WHO VIEWED YOU']

  return (
    <g>
      <Room id="fch" />
      <Desk x={640} />
      <Laptop x={640} y={DESK_Y} title="ONE THING" glow={on(f, one, 8) * (1 - on(f, holding, 4))} />
      {!inHand && <Phone x={860} y={DESK_Y - 12} s={0.5} r={90} />}
      {inHand && <Phone x={420} y={GROUND - 520} s={0.5} r={-10} />}
      <g opacity={on(f, two, 6) * (1 - on(f, s2, 8))}><Stopwatch x={860} y={560} s={0.7 * pop(f, two)} t={lerp(0, 0.95, span(f, two, holding))} label="2 MIN" /></g>
      <g opacity={on(f, picking, 6) * (1 - on(f, s2, 6))}><Tag x={720} y={980} text="WHEN DID I PICK IT UP?" s={pop(f, picking)} size={44} fill={CREAM} ink={BURG} /></g>
      <g opacity={on(f, broken, 6) * (1 - on(f, s2b, 6))}><Tag x={760} y={560} text={f >= alone ? 'NOT BROKEN · NOT ALONE' : 'NOT BROKEN'} s={pop(f, f >= alone ? alone : broken)} size={48} fill={GOLD} /></g>
      {/* # the louder world */}
      {chips.map((t, k) => <Chip key={t} x={[760, 300, 820, 280, 700, 860][k]} y={[480, 520, 680, 760, 900, 1060][k]} text={t} s={0.8 * pop(f, world + k * 3)} o={on(f, world + k * 3, 4)} r={-6 + k * 3} />)}
      <Person f={f} who="hero-struggling" beats={hero} x={360} s={0.88} />
      <Headline text={f < s2 ? 'ONE THING' : f < s2b ? '' : 'A LOUDER WORLD'} o={f < s2 ? on(f, one, 8) * (1 - on(f, s2 - 4, 4)) : f >= s2b ? on(f, worse, 8) : 0} color={INK} />
      <FVig id="fch" />
    </g>
  )
}

const Seconds: React.FC<PieceProps> = ({ f, c }) => {
  const s3 = c('s3'), gloria = c('s3:gloria'), twenty = c('s3:twenty'), screens = c('s3:screens'), work = c('s3:work')
  const s4 = c('s4'), early = c('s4:early'), minutes = c('s4:minutes'), switching = c('s4:switching')
  const s5 = c('s5'), recent = c('s5:recent'), dropped = c('s5:dropped'), n47 = c('s5:47')
  const s6 = c('s6'), minute = c('s6:minute'), jumps = c('s6:jumps')
  const s6b = c('s6b'), message = c('s6b:message'), tab = c('s6b:tab'), notification = c('s6b:notification'), thought = c('s6b:thought'), gone = c('s6b:gone')

  const A = win(f, 0, s6 + 4), B = on(f, s6, 10)
  const tabs: [string, number, number][] = [['THE TASK', 220, 760], ['MESSAGES', 540, 620], ['NEW TAB', 860, 760], ['NEWS', 380, 980], ['SHOPPING', 720, 980]]
  // # the beam hops: task → messages → new tab → news …
  const hops = [s6, jumps, message, tab, notification]
  let hi = 0
  for (let k = 0; k < hops.length; k++) if (f >= hops[k]) hi = k
  const target = tabs[[0, 1, 2, 3, 4][hi]]
  const prev = tabs[[0, 0, 1, 2, 3][hi]]
  const t = easeOut(span(f, hops[hi], hops[hi] + 6))

  return (
    <g>
      <Room id="fcs" />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, gloria, 6) * (1 - on(f, s4, 8))} transform={`translate(760 640) rotate(3) scale(${pop(f, gloria)})`}>
          <rect x={-170} y={-210} width={340} height={420} rx={14} fill="#B98258" stroke={INK} strokeWidth={6} />
          <rect x={-140} y={-170} width={280} height={360} rx={8} fill="#FFFFFF" />
          <text y={-110} textAnchor="middle" fill={BURG} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>GLORIA MARK</text>
          <text y={-66} textAnchor="middle" fill={INK} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>UC IRVINE · ATTENTION</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-100} y={-20 + k * 44} width={200 - (k % 2) * 50} height={8} rx={4} fill={INK} opacity={0.25} />)}
        </g>
        <g opacity={on(f, twenty, 6) * (1 - on(f, s4, 6))} transform="translate(120 1100)">
          <rect x={0} y={0} width={840} height={14} rx={7} fill={INK} />
          {[0, 1, 2, 3, 4].map((k) => <g key={k}><circle cx={k * 210} cy={7} r={16} fill={k === 0 ? LIME : CREAM} stroke={INK} strokeWidth={4} /><text x={k * 210} y={70} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"' }}>{['2004', '2009', '2014', '2019', 'NOW'][k]}</text></g>)}
          <Tag x={420} y={-80} text="~20 YEARS OF TRACKING" s={pop(f, twenty)} size={44} fill={GOLD} />
        </g>
        <g opacity={on(f, early, 6)}><Stopwatch x={300} y={720} s={0.85} t={lerp(0, 1, easeOut(span(f, minutes, switching + 10)))} label="~2.5 MIN" tone={SLATE_D} /><text x={300} y={540} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>EARLY STUDIES</text></g>
        <g opacity={on(f, recent, 6)}><Stopwatch x={780} y={720} s={0.85} t={lerp(0, 47 / 150, easeOut(span(f, n47, n47 + 12)))} label={f >= n47 ? '~47 SEC' : '?'} tone={CORAL} /><text x={780} y={540} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>RECENT STUDIES</text></g>
        <g opacity={on(f, dropped, 6)}><Tag x={CX} y={1100} text="ON ONE SCREEN, BEFORE SWITCHING" s={pop(f, dropped)} size={40} /></g>
        <g opacity={on(f, screens, 6) * (1 - on(f, s4, 6))}><Tag x={330} y={560} text="SCREENS AT WORK" s={pop(f, screens)} size={46} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {tabs.map(([tx, x, y], k) => <TabCard key={tx} x={x} y={y} text={tx} s={0.85} lit={target[0] === tx ? 1 : 0} />)}
        <Beam x0={CX} y0={380} x1={lerp(prev[1], target[1], t)} y1={lerp(prev[2], target[2], t)} w={130} />
        <g opacity={on(f, minute, 6) * (1 - on(f, s6b, 6))}><Tag x={CX} y={480} text="UNDER A MINUTE" s={pop(f, minute)} size={58} fill={GOLD} /></g>
        <g opacity={on(f, thought, 6)} transform={`translate(${CX} 470) scale(${f >= gone ? lerp(1, 1.4, span(f, gone, gone + 6)) : pop(f, thought)})`}>
          <g opacity={f >= gone ? 1 - span(f, gone, gone + 8) : 1}><ellipse rx={210} ry={70} fill={CREAM} stroke={INK} strokeWidth={5} /><text y={18} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"' }}>YOUR THOUGHT…</text></g>
          {f >= gone && <text y={22} textAnchor="middle" fill={CORAL} style={{ font: '400 80px "Bebas Neue"', letterSpacing: 6 }} opacity={on(f, gone + 4, 4)}>GONE</text>}
        </g>
      </g>}
      <Headline text={f < s6 ? '47 SECONDS' : 'ATTENTION, JUMPING'} o={f < s6 ? on(f, n47, 8) : on(f, jumps, 8) * (1 - on(f, s6b, 4)) + on(f, s6b, 8) * 0} color={INK} />
      <FVig id="fcs" />
    </g>
  )
}

const Residue: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), jump = c('s7:jump'), costs = c('s7:costs')
  const s8 = c('s8'), leroy = c('s8:leroy'), switch8 = c('s8:switch'), another = c('s8:another'), stuck = c('s8:stuck'), first = c('s8:first')
  const s9 = c('s9'), residue = c('s9:residue')
  const s10 = c('s10'), fully = c('s10:fully'), answering = c('s10:answering'), reading = c('s10:reading'), tired = c('s10:tired')
  const s11 = c('s11'), pulled = c('s11:pulled'), long = c('s11:long'), study = c('s11:study'), n23 = c('s11:23'), interrupted = c('s11:interrupted')

  const A = win(f, 0, s10 + 4), B = win(f, s10, s11 + 4), C = on(f, s11, 10)
  const hx = f < switch8 ? 300 : lerp(300, 760, easeOut(span(f, switch8, another + 10)))
  const hero: Beat[] = [[s7, 'idle', 'neutral'], [costs, 'scratchHead', 'thinking'], [switch8, 'walkA', 'neutral'], [switch8 + 8, 'walkB', 'neutral'], [another + 10, 'type', 'neutral'], [stuck, 'think', 'worried'], [residue, 'shrug', 'thinking']]
  const heroB: Beat[] = [[s10, 'phone', 'neutral'], [reading, 'read', 'neutral'], [tired, 'slump', 'worried']]
  const heroC: Beat[] = [[s11, 'idle', 'worried'], [pulled, 'walkA', 'neutral'], [long, 'walkB', 'worried'], [study, 'walkA', 'worried'], [n23, 'walkB', 'worried'], [interrupted, 'slump', 'worried']]
  const road = span(f, pulled, interrupted + 20)

  return (
    <g>
      <Room id="fcr" />
      {A > 0.001 && <g opacity={A}>
        <TabCard x={300} y={700} text="TASK A" s={1.1} lit={f < switch8 ? 1 : 0} />
        <TabCard x={760} y={700} text="TASK B" s={1.1} lit={f >= another ? 1 : 0} o={on(f, costs - 6, 6)} />
        {/* # the residue thread: stays stuck to task A after the switch */}
        <g opacity={on(f, stuck, 6)}>
          <path d={`M330 760 C 450 ${860 + Math.sin(f / 6) * 20} 600 ${640 + Math.cos(f / 7) * 20} ${hx - 40} ${GROUND - 520}`} stroke={LIME} strokeWidth={14} fill="none" strokeLinecap="round" />
          <circle cx={330} cy={760} r={20} fill={LIME} stroke={INK} strokeWidth={4} />
        </g>
        <g opacity={on(f, leroy, 6) * (1 - on(f, s9, 6))}><Tag x={CX} y={470} text="SOPHIE LEROY" s={pop(f, leroy)} size={56} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, residue, 6)}><Tag x={CX} y={470} text="ATTENTION RESIDUE" s={pop(f, residue) * 1.15} size={64} fill={LIME} /></g>
        <g opacity={on(f, first, 6) * (1 - on(f, s9, 6))}><Tag x={300} y={940} text="PART OF YOU: STILL HERE" s={pop(f, first)} size={40} /></g>
        <Person f={f} who="hero-struggling" beats={hero} x={hx} s={0.85} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <rect x={CX - 3} y={420} width={6} height={GROUND - 420} fill={INK} opacity={0.3} strokeDasharray="20 14" />
        <g opacity={on(f, answering, 6)}><Tag x={270} y={560} text="HALF REPLYING" s={pop(f, answering)} size={50} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, reading, 6)}><Tag x={810} y={560} text="HALF READING" s={pop(f, reading)} size={50} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, tired, 6)} transform="translate(810 1000)">
          <rect x={-130} y={-50} width={260} height={100} rx={16} fill="none" stroke={INK} strokeWidth={9} /><rect x={130} y={-20} width={18} height={40} rx={4} fill={INK} />
          <rect x={-118} y={-38} width={lerp(236, 30, easeOut(span(f, tired, tired + 16)))} height={76} rx={8} fill={lerp(1, 0, span(f, tired, tired + 16)) > 0.4 ? '#3FA06A' : '#E2574C'} />
          <text y={100} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>FULLY TIRED</text>
        </g>
        <g opacity={on(f, fully, 6) * (1 - on(f, answering, 6))}><Tag x={CX} y={470} text="NEVER FULLY IN ONE PLACE" s={pop(f, fully)} size={46} /></g>
        <Person f={f} who="hero-struggling" beats={heroB} x={CX} s={0.88} />
      </g>}
      {C > 0.001 && <g opacity={C}>
        <path d={`M120 ${GROUND - 20} Q300 ${GROUND - 200} 540 ${GROUND - 60} T940 ${GROUND - 120}`} stroke={INK} strokeWidth={10} strokeDasharray="24 18" fill="none" opacity={0.6} />
        <g transform="translate(110 0)"><Desk x={830} /><Laptop x={830} y={DESK_Y} s={0.7} title="BACK TO WORK" /></g>
        <g opacity={on(f, n23, 6)}><Stopwatch x={560} y={620} s={0.8 * pop(f, n23)} t={easeOut(span(f, n23, interrupted + 20)) * (23 / 60)} label="~23 MIN" /></g>
        <g opacity={on(f, long, 6) * (1 - on(f, n23, 6))}><Tag x={560} y={560} text="A LONG WAY BACK" s={pop(f, long)} size={54} /></g>
        <Person f={f} who="hero-struggling" beats={heroC} x={lerp(140, 700, road)} y={GROUND - 20 - Math.sin(road * Math.PI) * 60} s={0.75} />
      </g>}
      <Headline text={f < s10 ? 'EVERY JUMP COSTS' : f < s11 ? 'HALF HERE, HALF THERE' : 'GETTING BACK'} o={f < s10 ? on(f, jump, 8) * (1 - on(f, s10 - 4, 4)) : f < s11 ? on(f, s10, 8) * (1 - on(f, s11 - 4, 4)) : on(f, pulled, 8)} color={INK} />
      <FVig id="fcr" />
    </g>
  )
}

const Fix: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), strangest = c('s12:strangest'), buzz = c('s12:buzz')
  const s13 = c('s13'), experiment = c('s13:experiment'), worse = c('s13:worse'), tests = c('s13:tests'), desk = c('s13:desk'), silent = c('s13:silent'), room = c('s13:room')
  const s14 = c('s14'), busy = c('s14:busy'), checking = c('s14:checking')
  const s14b = c('s14b'), read = c('s14b:read'), tapping = c('s14b:tapping'), shoulder = c('s14b:shoulder')
  const s15 = c('s15'), willpower = c('s15:willpower'), space = c('s15:space')
  const s16 = c('s16'), phone = c('s16:phone'), another16 = c('s16:another#2')
  const s17 = c('s17'), close = c('s17:close'), tab = c('s17:tab'), need = c('s17:need')
  const s17b = c('s17b'), notification = c('s17b:notification')
  const s18 = c('s18'), task = c('s18:task'), timer = c('s18:timer'), wanders = c('s18:wanders'), back = c('s18:back')
  const s19 = c('s19'), wander = c('s19:wander'), normal = c('s19:normal'), practising = c('s19:practising')
  const s20 = c('s20'), gone = c('s20:gone'), hundred = c('s20:hundred')
  const s21 = c('s21'), place = c('s21:place'), land = c('s21:land'), watch = c('s21:watch')

  const A = win(f, 0, s15 + 4), B = on(f, s15, 10)
  const phoneOut = easeOut(span(f, phone, another16 + 10))
  const tabsLeft = f < close ? 4 : f < need ? 3 - Math.min(2, Math.floor(span(f, close, need) * 3)) : 1
  // # the beam: wanders on "wanders"/"wander", comes back on "back"/"practising", lands on the task on "land"
  const drift = (f >= wanders && f < back + 6) || (f >= wander && f < practising) ? Math.sin((f - wanders) / 8) * 260 : 0
  const hero: Beat[] = [[s12, 'idle', 'thinking'], [buzz, 'shrug', 'neutral'], [s13, 'type', 'neutral'], [worse, 'scratchHead', 'worried'], [busy, 'think', 'thinking'], [tapping, 'nervous', 'worried']]
  const heroB: Beat[] = [[s15, 'explain', 'neutral'], [phone, 'carry', 'smiling'], [another16 + 10, 'idle', 'smiling'], [close, 'type', 'neutral'], [timer, 'point', 'smiling'], [task, 'type', 'neutral'], [wanders, 'lookFar', 'thinking'], [back, 'type', 'smiling'], [normal, 'nodA', 'smiling'], [gone, 'present', 'smiling'], [land, 'type', 'smiling'], [watch, 'fistPump', 'smiling']]

  return (
    <g>
      <Room id="fcf" />
      {A > 0.001 && <g opacity={A}>
        <Desk x={640} />
        <Laptop x={600} y={DESK_Y} title="THE TEST" />
        <Phone x={860} y={DESK_Y - 12} s={0.5} r={90} down={1} buzz={0} f={f} />
        <g opacity={on(f, buzz, 6) * (1 - on(f, s13, 6))}><Tag x={760} y={560} text="NO BUZZ NEEDED" s={pop(f, buzz)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, silent, 6) * (1 - on(f, s14b, 8))}>
          <Col x={360} y={1150} h={lerp(0, 150, easeOut(span(f, desk, silent + 10)))} label="PHONE ON DESK" tone={CORAL} />
          <Col x={760} y={1150} h={lerp(0, 230, easeOut(span(f, room - 4, room + 10)))} label="IN ANOTHER ROOM" tone={LIME} o={on(f, room - 4, 6)} />
          <text x={CX} y={860} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>BRAIN-POWER TESTS</text>
        </g>
        <g opacity={on(f, experiment, 6) * (1 - on(f, silent, 6))}><Tag x={760} y={560} text="FACE DOWN. SILENT." s={pop(f, experiment)} size={52} /></g>
        <g opacity={on(f, busy, 6) * (1 - on(f, s14b, 6))}><Tag x={760} y={560} text="BUSY NOT CHECKING IT" s={pop(f, busy)} size={50} fill={CREAM} ink={BURG} /></g>
        {/* # the tapping finger */}
        <g opacity={on(f, tapping, 6) * (1 - on(f, s15, 6))} transform={`translate(540 ${640 + Math.abs(Math.sin(f / 3)) * 20})`}><rect x={-20} y={-120} width={40} height={120} rx={20} fill="#E9B48C" stroke={INK} strokeWidth={5} /><text x={0} y={60} textAnchor="middle" fill={CORAL} style={{ font: '400 46px "Bebas Neue"' }}>TAP TAP</text></g>
        <Person f={f} who="hero" beats={hero} x={300} s={0.88} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Desk x={640} />
        <Laptop x={600} y={DESK_Y} title="ONE TASK" glow={on(f, land, 10)} />
        {/* # the door; the phone goes out */}
        <g transform="translate(1000 0)"><rect x={-90} y={GROUND - 520} width={160} height={520} fill="#9C7650" stroke={INK} strokeWidth={6} /></g>
        <g opacity={on(f, phone, 6) * (1 - on(f, another16 + 10, 6))}><Phone x={lerp(860, 1080, phoneOut)} y={lerp(DESK_Y - 12, GROUND - 300, phoneOut)} s={0.5} r={lerp(90, 0, phoneOut)} /></g>
        <g opacity={on(f, another16, 6) * (1 - on(f, s17, 6))}><Tag x={720} y={560} text="ANOTHER ROOM" s={pop(f, another16)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, willpower, 6) * (1 - on(f, s16, 6))}><Tag x={720} y={560} text={f >= space ? 'DESIGN YOUR SPACE' : 'NOT JUST WILLPOWER'} s={pop(f, f >= space ? space : willpower)} size={54} fill={CREAM} ink={BURG} /></g>
        {/* # the tabs: close one by one */}
        {['TAB', 'TAB', 'TAB', 'THE ONE'].map((t, k) => <g key={k} opacity={on(f, close - 6, 6) * (k === 3 || k < tabsLeft - 1 ? 1 : 0) * (1 - on(f, s18, 8))}><TabCard x={680 + (k - 1.5) * 90} y={560 + k * 18} text={t} s={0.6} lit={k === 3 ? 1 : 0} /></g>)}
        <g opacity={on(f, notification, 6) * (1 - on(f, s18, 8))} transform={`translate(860 820) scale(${pop(f, notification)})`}><path d="M-50 30 Q-50 -60 0 -60 Q50 -60 50 30 L64 50 L-64 50 Z" fill={GOLD} stroke={INK} strokeWidth={6} /><circle cy={66} r={14} fill={INK} /><path d="M-90 -90 L90 90" stroke="#D2463C" strokeWidth={14} strokeLinecap="round" /></g>
        <g opacity={on(f, timer, 6) * (1 - on(f, s20, 8))}><Stopwatch x={860} y={600} s={0.6} t={lerp(1, 0.7, span(f, timer, s20))} label="25:00" tone={LIME} /></g>
        <Beam x0={CX} y0={380} x1={600 + drift} y1={DESK_Y - 140 - Math.abs(drift) * 0.3} w={120} o={on(f, task, 8)} />
        <g opacity={on(f, normal, 6) * (1 - on(f, s20, 6))}><Tag x={330} y={480} text={f >= practising ? 'BRING IT BACK = PRACTICE' : 'WANDERING IS NORMAL'} s={pop(f, f >= practising ? practising : normal)} size={46} fill={GOLD} /></g>
        <g opacity={on(f, hundred, 6) * (1 - on(f, s21, 6))}>{[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M${CX} 640 L${CX + Math.cos(k) * 380} ${640 + Math.sin(k) * 300}`} stroke={LIME} strokeWidth={10} opacity={0.6} />)}<Tag x={CX} y={480} text="NOT GONE. JUST PULLED." s={pop(f, gone)} size={50} /></g>
        <g opacity={on(f, land, 6)}><Tag x={CX} y={480} text="ONE PLACE TO LAND" s={pop(f, land)} size={64} fill={LIME} /></g>
        <Person f={f} who="hero" beats={heroB} x={300} s={0.88} />
      </g>}
      <Headline text={f < s15 ? 'THE SILENT PHONE' : f < s18 ? 'SET UP THE ROOM' : f < s20 ? 'ONE TASK' : ''} o={f < s15 ? on(f, strangest, 8) * (1 - on(f, s15 - 4, 4)) : f < s18 ? on(f, phone, 8) * (1 - on(f, s18 - 4, 4)) : f < s20 ? on(f, task, 8) * (1 - on(f, s20 - 4, 4)) : 0} color={INK} />
      <FVig id="fcf" />
    </g>
  )
}

export const FC_HOOK = makePiece('fc-hook', 'Focus: one thing, then the phone is in your hand', {
  beats: ['s1:one', 's1:two', 's1:holding', 's1:phone', 's1:remember', 's1:picking', 's2', 's2:familiar', 's2:broken', 's2:alone', 's2b', 's2b:worse', 's2b:world', 's2b:louder'],
  sfx: [['s1:holding', 'glitch'], ['s2:broken', 'pop'], ['s2b:world', 'pop'], ['s2b:louder', 'riser']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const FC_SECONDS = makePiece('fc-seconds', 'Focus: from 2.5 minutes to 47 seconds', {
  beats: ['s3', 's3:gloria', 's3:twenty', 's3:screens', 's3:work', 's4', 's4:early', 's4:studies', 's4:stayed', 's4:screen', 's4:minutes', 's4:switching', 's5', 's5:recent', 's5:dropped', 's5:47', 's6', 's6:minute', 's6:jumps', 's6b', 's6b:message', 's6b:tab', 's6b:notification', 's6b:thought', 's6b:gone'],
  sfx: [['s3:gloria', 'pop'], ['s4:minutes', 'tick'], ['s5:47', 'ding'], ['s6:jumps', 'swish'], ['s6b:message', 'swish'], ['s6b:tab', 'swish'], ['s6b:notification', 'swish'], ['s6b:gone', 'softpop']],
  Component: Seconds, mood: 'light', canvas: 'tall',
})
export const FC_RESIDUE = makePiece('fc-residue', 'Focus: attention residue and the long way back', {
  beats: ['s7', 's7:jump', 's7:costs', 's8', 's8:leroy', 's8:switch', 's8:another', 's8:stuck', 's8:first', 's9', 's9:residue', 's10', 's10:fully', 's10:answering', 's10:reading', 's10:tired', 's11', 's11:pulled', 's11:long', 's11:study', 's11:found', 's11:people', 's11:23', 's11:average', 's11:interrupted'],
  sfx: [['s8:switch', 'whoosh'], ['s8:stuck', 'softpop'], ['s9:residue', 'ding'], ['s10:tired', 'thud'], ['s11:23', 'tick']],
  Component: Residue, mood: 'light', canvas: 'tall',
})
export const FC_FIX = makePiece('fc-fix', 'Focus: the silent phone, then one place to land', {
  beats: ['s12', 's12:part', 's12:strangest', 's12:phone', 's12:buzz', 's13', 's13:experiment', 's13:worse', 's13:tests', 's13:desk', 's13:silent', 's13:room', 's14', 's14:busy', 's14:checking', 's14b', 's14b:read', 's14b:tapping', 's14b:shoulder', 's15', 's15:willpower', 's15:space', 's16', 's16:phone', 's16:face', 's16:desk', 's16:another#2', 's17', 's17:close', 's17:tab', 's17:need', 's17b', 's17b:turn', 's17b:notification', 's17b:truly', 's18', 's18:task', 's18:timer', 's18:wanders', 's18:back', 's19', 's19:wander', 's19:normal', 's19:time', 's19:bring', 's19:practising', 's20', 's20:gone', 's20:hundred', 's21', 's21:place', 's21:land', 's21:watch'],
  sfx: [['s13:room', 'ding'], ['s14b:tapping', 'tick'], ['s16:another#2', 'whoosh'], ['s17:close', 'click'], ['s17b:notification', 'swish'], ['s18:timer', 'click'], ['s21:land', 'chime']],
  Component: Fix, mood: 'light', canvas: 'tall',
})
