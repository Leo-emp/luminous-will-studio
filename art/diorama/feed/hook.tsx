// ---------------------------------------------------------------- s1–s4: the hook inside the feed.
// A) a giant glowing phone whose feed really scrolls; you stand beside it; on "close" the screen goes dark and a
//    1¢ coin gets a cross ("didn't cost you a cent"). B) three little businesses light up behind with question marks;
//    a $? tag swings from your hand. C) a crowd of glowing dots, one highlighted (just one person). D) a tall tower
//    labelled META with three plain app pills — INSTAGRAM, FACEBOOK, WHATSAPP — then three numbered circles.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { FeedWorld, Vig, Headline, Pill, Cross, Coin, FeedPhone, Biz, Dot, Tower, Glint, win, CX, FLOOR, WHITE, PINK, CYAN, MINT, GOLD, VIOLET, TXT } from './kit'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const open = c('s1:open'), instagram = c('s1:instagram'), scroll = c('s1:scroll'), ten = c('s1:ten'), close = c('s1:close'), cost = c("s1:didn't"), cent = c('s1:cent')
  const paying = c('s2:paying'), all = c('s2:all'), worth = c('s2:worth'), them = c('s2:them')
  const thinking = c('s3:thinking'), one = c('s3:one'), person = c('s3:person'), much = c('s3:much')
  const meta = c('s4:meta'), company = c('s4:company'), insta4 = c('s4:instagram'), facebook = c('s4:facebook'), whatsapp = c('s4:whatsapp'), tells = c('s4:tells'), three = c('s4:three'), steps = c('s4:steps')

  const A = win(f, 0, thinking - 2), Cc = win(f, thinking - 2, meta - 2), D = win(f, meta - 2, three - 2), E = on(f, three - 2, 7)
  const sc = Math.min(f, close) * 7 + Math.max(0, f - close) * 0 // # the feed scrolls until "close"
  const dark = on(f, close, 10)
  const you: Beat[] = [[0, 'phone', 'smiling'], [close, 'idle', 'smiling'], [paying, 'shrug', 'thinking'], [worth, 'holdUp', 'thinking']]
  const hp = hand(f, you, 200, FLOOR, 0.72)
  const crowd = Array.from({ length: 40 }, (_, i) => ({ x: 130 + (i % 8) * 105 + (Math.floor(i / 8) % 2) * 50, y: 560 + Math.floor(i / 8) * 150 }))
  return (
    <g>
      <FeedWorld f={f} id="ig-hook" />
      {A > 0.001 && <g opacity={A}>
        {/* # businesses glowing behind the phone (who's paying?) */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, paying + k * 3, 8)}>
          <Biz x={870} y={[640, 940, 1240][k]} kind={k as 0 | 1 | 2} s={0.6} />
          <text x={870} y={[640, 940, 1240][k] - 190} textAnchor="middle" fill={WHITE} style={TXT(70)} opacity={on(f, all + k * 2, 6)}>?</text>
        </g>)}
        <g transform={`translate(${lerp(0, -70, on(f, paying, 18))} ${lerp(0, 60, on(f, paying, 18))}) translate(620 760) scale(${lerp(1, 0.72, on(f, paying, 18))}) translate(-620 -760)`} opacity={1 - on(f, paying, 18) * 0.5}>
          <FeedPhone x={620} y={810} s={0.8 * pop(f, open - 2)} f={f} scroll={sc} o={on(f, open - 2, 6)}>
            <rect x={-236} y={-476} width={472} height={952} fill="#05030F" opacity={dark * 0.85} />
          </FeedPhone>
        </g>
        <Person f={f} who="investorF" beats={you} x={200} y={FLOOR} s={0.72} />
        <g opacity={on(f, cent - 2, 6) * (1 - on(f, paying, 8))}><Coin x={200} y={640} s={1.1 * pop(f, cent - 2)} t="1¢" /><g opacity={on(f, cent + 6, 6)}><Cross x={200} y={640} s={0.6} /></g></g>
        <g opacity={on(f, worth, 6)}>
          <line x1={hp.x} y1={hp.y} x2={hp.x + 30} y2={hp.y - 70} stroke={WHITE} strokeWidth={3} />
          <g transform={`translate(${hp.x + 30} ${hp.y - 120}) rotate(${-8 + Math.sin((f - worth) / 6) * 5})`}><rect x={-70} y={-40} width={140} height={80} rx={14} fill={GOLD} /><text y={22} textAnchor="middle" fill="#5A3A00" style={TXT(60)}>$?</text></g>
        </g>
        <Glint f={f} at={instagram} x={620} y={360} col={PINK} />
        <Glint f={f} at={scroll} x={760} y={600} col={CYAN} />
        <Glint f={f} at={ten} x={520} y={900} col={CYAN} />
        <Glint f={f} at={them} x={860} y={560} col={GOLD} />
      </g>}
      {/* # C) just one person in a crowd */}
      {Cc > 0.001 && <g opacity={Cc}>
        {crowd.map((p, i) => <Dot key={i} x={p.x} y={p.y} s={1.6 * pop(f, thinking + i * 0.3)} col={i === 19 && f >= one ? GOLD : i % 2 ? CYAN : PINK} o={(i === 19 ? 1 : 1 - 0.6 * on(f, person, 8))} />)}
        <g opacity={on(f, person, 6)}><circle cx={crowd[19].x} cy={crowd[19].y - 12} r={70} fill="none" stroke={GOLD} strokeWidth={6} /></g>
        <g opacity={on(f, much, 6)}><Coin x={crowd[19].x + 110} y={crowd[19].y - 80} s={0.5 * pop(f, much)} t="¢" /></g>
      </g>}
      {/* # D) Meta tells us */}
      {D > 0.001 && <g opacity={D}>
        <Tower x={680} y={FLOOR} s={0.9 * pop(f, meta - 2)} t="META" lit={on(f, tells, 30)} />
        {[[insta4, 'INSTAGRAM', PINK], [facebook, 'FACEBOOK', VIOLET], [whatsapp, 'WHATSAPP', MINT]].map(([at, t, col], k) => <g key={k} opacity={on(f, at as number, 6)}><Pill x={250} y={640 + k * 130} t={t as string} size={46} col={col as string} s={pop(f, at as number)} /></g>)}
        <Glint f={f} at={company} x={680} y={FLOOR - 640} col={GOLD} />
      </g>}
      {E > 0.001 && <g opacity={E}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 3, 6)} transform={`translate(${200 + k * 300} 800) scale(${pop(f, three + k * 3)})`}>
          <circle r={130} fill={[PINK, CYAN, GOLD][k]} opacity={0.25} /><circle r={115} fill={[PINK, CYAN, GOLD][k]} />
          <text y={52} textAnchor="middle" fill={WHITE} style={TXT(150)}>{k + 1}</text>
          <Glint f={f} at={steps + k * 3} x={80} y={-90} />
        </g>)}
      </g>}
      <Vig id="ig-hook" />
      <Headline f={f} lines={[[cent, "IT'S FREE…", WHITE, 120], [paying, "SO WHO'S PAYING?", PINK, 104], [worth, 'WHAT ARE YOU WORTH?', GOLD, 100], [one, 'JUST ONE PERSON?', WHITE, 104], [meta, 'META TELLS US', WHITE, 110], [three, '3 STEPS', WHITE, 120]]} />
    </g>
  )
}

export const IG_HOOK = makePiece('ig-hook', 'Hook inside the feed (deep indigo night with a pink and cyan aurora): a giant glowing phone whose feed of candy-coloured photo posts really scrolls while you stand beside it; on "close" the screen goes dark and a 1¢ coin gets a cross; three little glowing businesses (a shop, a car, a sneaker) light up behind with question marks as a gold $? tag swings from your hand; a crowd of forty glowing person-dots with one ringed in gold; a tall indigo tower labelled META with three plain pills INSTAGRAM, FACEBOOK, WHATSAPP; then three big numbered circles.', {
  canvas: 'tall', mood: 'dark', Component: Hook,
  beats: ["s1:open", "s1:instagram", "s1:scroll", "s1:ten", "s1:close", "s1:didn't", "s1:cent", "s2:paying", "s2:all", "s2:worth", "s2:them", "s3:thinking", "s3:one", "s3:person", "s3:much", "s4:meta", "s4:company", "s4:instagram", "s4:facebook", "s4:whatsapp", "s4:tells", "s4:three", "s4:steps"],
  sfx: [['s1:close', 'click', 0.25], ['s1:cent', 'thud', 0.2], ['s2:paying', 'pop', 0.2], ['s4:meta', 'whoosh', 0.2], ['s4:three', 'pop', 0.25]] })
