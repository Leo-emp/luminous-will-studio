// ---------------------------------------------------------------- s9–s12b the rejections; s13–s17b the one yes.
// NO) a warm café by a rainy window; she writes and the page stack grows page by page; the manuscript goes into an
//    envelope and flies off; letters come back one after another, each stamped NO and numbered 1…12, stacking into a
//    wobbling pile; #12 lands; then the letters turn into tags: EXCUSE TO STOP.
// YES) a door: BLOOMSBURY. The chairman hands the first chapter to his daughter (ALICE, 8); a big MORE! bubble.
//    A sticky note: KEEP YOUR DAY JOB. A tiny pile: ~500 COPIES — then the books stack into a tower past the top of the
//    frame and a counter rolls to 500,000,000+; she stands beside it, labelled: ONE OF THE BEST-SELLING AUTHORS EVER.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { makePiece, type PieceProps } from '../registry'
import { Cafe, Copy, Edinburgh, Envelope, Headline, Manuscript, NameTag, NoLetter, Person, RVig, Table, Tag, win, CREAM, GOLD, INK, BURG, MOSS, NAVY, PAPER, RED, GROUND, CX, on, pop, lerp, span, easeOut, type Beat } from './kit'

const Nos: React.FC<PieceProps> = ({ f, c }) => {
  const kept = c('s9:kept'), writing = c('s9:writing'), page = c('s9:page'), time = c('s9:time')
  const s10 = c('s10'), finished = c('s10:finished'), agent = c('s10:agent'), sent = c('s10:sent'), publishers = c('s10:publishers')
  const s11 = c('s11'), another = c('s11:another'), no = c('s11:no'), accounts = c('s11:accounts'), dozen = c('s11:dozen')
  const s12 = c('s12'), imagine = c('s12:imagine'), twelfth = c('s12:twelfth'), story = c('s12:story'), telling = c('s12:telling')
  const s12b = c('s12b'), letters = c('s12b:letters'), excuse = c('s12b:excuse'), stop = c('s12b:stop'), blamed = c('s12b:blamed')

  const A = win(f, 0, s11 + 4), B = on(f, s11, 10)
  const pages = Math.min(1, span(f, kept, finished))
  const fly = easeOut(span(f, sent, publishers + 10))
  const her: Beat[] = [[0, 'sit', 'thinking'], [writing, 'sit', 'neutral'], [finished, 'sit', 'smiling'], [sent, 'sit', 'smiling']]
  const herB: Beat[] = [[s11, 'idle', 'neutral'], [no, 'nervous', 'worried'], [dozen, 'slump', 'worried'], [imagine, 'idle', 'thinking'], [story, 'holdChest', 'neutral'], [excuse, 'shrug', 'worried'], [blamed, 'confident', 'neutral']]
  // # the twelve letters arrive between "another" and "twelfth"
  const arrive = (k: number) => lerp(another, twelfth, k / 11)

  return (
    <g>
      {A > 0.001 && <g opacity={A}>
        <Cafe id="rwn" />
        <Table x={680} />
        <g opacity={1 - on(f, sent, 6)}><Manuscript x={640} y={GROUND - 300} s={0.8} h={pages} title={f >= finished ? 'BOOK ONE ✓' : 'BOOK ONE'} /></g>
        <g opacity={on(f, page, 6) * (1 - on(f, s10, 6))}><Tag x={680} y={560} text="ONE PAGE AT A TIME" s={pop(f, page)} size={52} fill={GOLD} /></g>
        <g opacity={on(f, agent, 6) * (1 - on(f, publishers + 12, 6))}><Envelope x={lerp(640, 1300, fly)} y={lerp(GROUND - 380, 300, fly)} s={0.9} r={fly * 30} /></g>
        <g opacity={on(f, publishers, 6)}><Tag x={680} y={560} text="TO PUBLISHERS" s={pop(f, publishers)} size={52} /></g>
        <Person f={f} who="lib-rowling" beats={her} x={380} y={GROUND - 40} s={0.85} />
        <NameTag x={380} y={GROUND - 710} name="J.K. ROWLING" o={1 - on(f, kept, 10) * 0.6} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Edinburgh id="rwn2" f={f} rain={0.9} />
        {Array.from({ length: 12 }, (_, k) => { const at = arrive(k), t = easeOut(span(f, at, at + 8))
          return <NoLetter key={k} x={lerp(1200, 720 + ((k * 37) % 60) - 30, t)} y={lerp(300, 1100 - k * 26, t)} s={0.8} r={-10 + ((k * 23) % 20)} n={k + 1} o={on(f, at, 3) * (1 - on(f, letters + 30, 10))} />
        })}
        <g opacity={on(f, accounts, 6) * (1 - on(f, s12, 6))}><Tag x={720} y={460} text="ABOUT A DOZEN" s={pop(f, dozen)} size={60} fill={GOLD} /></g>
        <g opacity={on(f, twelfth, 6) * (1 - on(f, s12b, 6))}><Tag x={720} y={460} text="NO #12" s={pop(f, twelfth)} size={70} fill={CREAM} ink={RED} /></g>
        <g opacity={on(f, telling, 6) * (1 - on(f, s12b, 6))}><Tag x={330} y={460} text="STILL WORTH TELLING" s={pop(f, telling)} size={44} fill={GOLD} /></g>
        {/* # each letter becomes an easy excuse to stop */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, excuse + k * 5, 5) * (1 - on(f, blamed + 10, 8))}><Tag x={720} y={560 + k * 130} text={['EXCUSE TO STOP', 'GOOD REASON TO QUIT', 'NOBODY WOULD BLAME YOU'][k]} s={pop(f, excuse + k * 5)} size={44} r={-4 + k * 4} /></g>)}
        <g opacity={on(f, stop, 4)}><Manuscript x={720} y={1150} s={0.55} h={1} /></g>
        <Person f={f} who="lib-rowling" beats={herB} x={260} s={0.85} />
        <NameTag x={260} y={GROUND - 660} name="J.K. ROWLING" />
      </g>}
      <Headline text={f < s11 ? 'SHE KEPT WRITING' : f < s12b ? 'NO. NO. NO…' : ''} o={f < s11 ? on(f, writing, 8) * (1 - on(f, s11 - 4, 4)) : f < s12b ? on(f, no, 8) * (1 - on(f, s12b - 4, 4)) : 0} color={INK} />
      <RVig id="rwn" />
    </g>
  )
}

const Yes: React.FC<PieceProps> = ({ f, c }) => {
  const small = c('s13:small'), bloomsbury = c('s13:bloomsbury'), chance = c('s13:chance')
  const s14 = c('s14'), chairman = c('s14:chairman'), chapter = c('s14:chapter'), daughter = c('s14:daughter'), rest = c('s14:rest')
  const s15 = c('s15'), reportedly = c('s15:reportedly'), job = c('s15:job'), money = c('s15:money')
  const s16 = c('s16'), tiny = c('s16:tiny'), n500 = c('s16:500'), hardback = c('s16:hardback')
  const s17 = c('s17'), today = c('s17:today'), sold = c('s17:sold'), million = c('s17:million'), world = c('s17:world')
  const s17b = c('s17b'), woman = c('s17b:woman'), day = c('s17b:day'), bestselling = c('s17b:bestselling'), lived = c('s17b:lived')

  const A = win(f, 0, s16 + 4), B = on(f, s16, 10)
  const rise = easeOut(span(f, sold, world + 20))
  const count = f < sold ? 500 : Math.round(lerp(500, 500000000, Math.pow(rise, 3)))
  const her: Beat[] = [[s16, 'idle', 'neutral'], [tiny, 'shrug', 'neutral'], [sold, 'shock', 'shocked'], [world, 'celebrate', 'smiling'], [woman, 'confident', 'smiling'], [bestselling, 'taDa', 'smiling']]

  return (
    <g>
      <Edinburgh id="rwy" f={f} rain={0.2} warm={on(f, s13Start(c), 20)} />
      {A > 0.001 && <g opacity={A}>
        {/* # the publisher's door */}
        <g transform="translate(300 0)">
          <rect x={-150} y={GROUND - 560} width={300} height={560} fill={MOSS} stroke={INK} strokeWidth={8} />
          <circle cx={100} cy={GROUND - 280} r={14} fill={GOLD} />
          <g opacity={on(f, bloomsbury, 6)} transform={`translate(0 ${GROUND - 640}) scale(${pop(f, bloomsbury)})`}><rect x={-190} y={-44} width={380} height={88} rx={10} fill={INK} /><text y={20} textAnchor="middle" fill={GOLD} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 6 }}>BLOOMSBURY</text></g>
        </g>
        <g opacity={on(f, small, 6) * (1 - on(f, chance, 6))}><Tag x={760} y={480} text="A SMALL PUBLISHER" s={pop(f, small)} size={50} /></g>
        <g opacity={on(f, chance, 6) * (1 - on(f, s14, 6))}><Tag x={760} y={480} text="YES." s={pop(f, chance) * 1.3} size={90} fill={GOLD} /></g>
        {/* # the chairman and his daughter (Minis, labelled) */}
        <g opacity={on(f, chairman, 6)}>
          <Mini look="hero-rich" x={640} y={GROUND} scale={2.4} frame={f} seed={101} mood="happy" />
          <Tag x={640} y={GROUND - 520} text="THE CHAIRMAN" s={pop(f, chairman)} size={36} />
        </g>
        <g opacity={on(f, daughter, 6)}>
          <Mini look="hero-fit" x={880} y={GROUND} scale={1.5} frame={f} seed={102} mood="happy" />
          <Tag x={880} y={GROUND - 340} text="HIS DAUGHTER, 8" s={pop(f, daughter)} size={36} fill={GOLD} />
        </g>
        <g opacity={on(f, chapter, 6) * (1 - on(f, s15, 8))}><rect x={lerp(700, 830, easeOut(span(f, chapter + 6, daughter + 6)))} y={GROUND - 260} width={70} height={90} rx={4} fill={PAPER} stroke={INK} strokeWidth={4} /></g>
        <g opacity={on(f, rest, 4) * (1 - on(f, s15, 8))} transform={`translate(880 ${GROUND - 520}) scale(${pop(f, rest)})`}><ellipse rx={130} ry={70} fill={CREAM} stroke={INK} strokeWidth={6} /><text y={22} textAnchor="middle" fill={RED} style={{ font: '400 70px "Bebas Neue"' }}>MORE!</text></g>
        <g opacity={on(f, job, 6)} transform={`translate(760 560) rotate(5) scale(${pop(f, job)})`}><rect x={-200} y={-80} width={400} height={160} fill="#FFE98A" stroke={INK} strokeWidth={5} /><text y={-10} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"' }}>"KEEP YOUR DAY JOB"</text><text y={50} textAnchor="middle" fill={INK} style={{ font: '400 32px "Bebas Neue"' }} opacity={on(f, money, 6)}>KIDS' BOOKS DON'T PAY</text></g>
        <g opacity={on(f, reportedly, 6) * (1 - on(f, job, 6))}><Tag x={760} y={560} text="EVEN THEN..." s={pop(f, reportedly)} size={52} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # 500 copies, then the tower */}
        {Array.from({ length: 34 }, (_, k) => {
          const show = k < 3 ? on(f, n500, 6) : on(f, sold + (k - 3) * 1.4, 3)
          return <Copy key={k} x={720 + ((k * 13) % 14) - 7} y={GROUND - k * 26} s={1.4} tone={[NAVY, BURG, MOSS, '#6A4A8A'][k % 4]} />
        }).filter((_, k) => (k < 3 ? f >= n500 : f >= sold + (k - 3) * 1.4))}
        <g opacity={on(f, n500, 6) * (1 - on(f, s17, 6))}><Tag x={720} y={1000} text={f >= hardback ? '~500 HARDBACKS' : '~500 COPIES'} s={pop(f, n500)} size={52} fill={CREAM} ink={NAVY} /></g>
        <g opacity={on(f, tiny, 6) * (1 - on(f, n500, 6))}><Tag x={720} y={1000} text="TINY" s={pop(f, tiny)} size={60} /></g>
        <g opacity={on(f, sold, 6)} transform="translate(720 470)">
          <rect x={-300} y={-60} width={600} height={120} rx={16} fill={INK} />
          <text y={30} textAnchor="middle" fill={GOLD} style={{ font: '400 84px "Bebas Neue"', letterSpacing: 3 }}>{count.toLocaleString('en-GB')}{f >= million ? '+' : ''}</text>
        </g>
        <g opacity={on(f, million, 6) * (1 - on(f, s17b, 6))}><Tag x={720} y={620} text="COPIES WORLDWIDE" s={pop(f, million)} size={46} fill={GOLD} /></g>
        <g opacity={on(f, bestselling, 6)}><Tag x={720} y={620} text="ONE OF THE BEST-SELLING EVER" s={pop(f, bestselling)} size={44} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, day, 6) * (1 - on(f, bestselling, 6))}><Tag x={720} y={620} text="THE 'DAY JOB' WRITER" s={pop(f, day)} size={44} /></g>
        <Person f={f} who="lib-rowling" beats={her} x={300} s={0.88} />
        <NameTag x={300} y={GROUND - 680} name="J.K. ROWLING" />
      </g>}
      <Headline text={f < s16 ? 'ONE YES' : f < s17 ? 'A TINY START' : '500 MILLION+'} o={f < s16 ? on(f, chance, 8) * (1 - on(f, s16 - 4, 4)) : f < s17 ? on(f, tiny, 8) * (1 - on(f, s17 - 4, 4)) : on(f, today, 8) * (1 - on(f, s17b - 4, 4)) + on(f, lived, 8)} color={INK} />
      <RVig id="rwy" />
    </g>
  )
}
// # the piece starts on s13 (Bloomsbury): the city warms up from there
const s13Start = (c: (k: string) => number) => c('s13')

export const RW_NOS = makePiece('rw-nos', 'Rowling: page by page, twelve rejections', {
  beats: ['s9', 's9:kept', 's9:writing', 's9:page', 's9:time', 's10', 's10:finished', 's10:agent', 's10:sent', 's10:publishers', 's11', 's11:another', 's11:no', 's11:accounts', 's11:dozen', 's12', 's12:imagine', 's12:twelfth', 's12:story', 's12:telling', 's12b', 's12b:letters', 's12b:excuse', 's12b:stop', 's12b:blamed'],
  sfx: [['s10:sent', 'whoosh'], ['s11:no', 'thud'], ['s11:dozen', 'thud'], ['s12:twelfth', 'impact'], ['s12b:excuse', 'pop']],
  Component: Nos, mood: 'light', canvas: 'tall',
})
export const RW_YES = makePiece('rw-yes', 'Rowling: Bloomsbury says yes, 500 copies to 500 million', {
  beats: ['s13', 's13:small', 's13:bloomsbury', 's13:chance', 's14', 's14:chairman', 's14:chapter', 's14:daughter', 's14:rest', 's15', 's15:reportedly', 's15:job', 's15:money', 's16', 's16:tiny', 's16:500', 's16:hardback', 's17', 's17:today', 's17:sold', 's17:million', 's17:world', 's17b', 's17b:woman', 's17b:day', 's17b:bestselling', 's17b:lived'],
  sfx: [['s13:chance', 'chime'], ['s14:rest', 'pop'], ['s15:job', 'softpop'], ['s16:500', 'tick'], ['s17:sold', 'riser'], ['s17:million', 'cash'], ['s17b:bestselling', 'ding']],
  Component: Yes, mood: 'light', canvas: 'tall',
})
