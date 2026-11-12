// ---------------------------------------------------------------- s9–s12: how it started (2003–2004)
// A) s9–s10  a small California workshop, July 2003: two founders at a bench, a blue-pencil sports car pinned to the
//            wall; on "beat" the pencil car races past a grey petrol sports car; on "box" a slow grey box car is crossed out.
// B) s11–s12 a third man walks in with a money bag; a jar of the first $7.5M fills, his $6.5M part in gold; a chair
//            marked CHAIRMAN slides under him.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { EXTRA } from './extra'
import { CalPage, Car, Cross, Mark, MoneyBag, Tag, TDefs, TGrain, T, Workshop, cues, fadeIn, scene, FLOOR, draw } from './kit'

const K = {
  july9: 's9:july', two9: 's9:two', entrepreneurs9: 's9:entrepreneurs', eberhard9: 's9:eberhard', tarpenning9: 's9:tarpenning', tiny9: 's9:tiny', california9: 's9:california',
  idea10: 's10:idea', electric10: 's10:electric', compromises10: 's10:compromises', beat10: 's10:beat', gas10: 's10:gas', slow10: 's10:slow', box10: 's10:box',
  musk11: 's11:musk', not11: 's11:not', arrived11: 's11:arrived', money11: 's11:money',
  put12: 's12:put', half12: 's12:half', first12: 's12:first', raised12: 's12:raised', chairman12: 's12:chairman',
}

const Start: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s11') - 4
  const A = scene(f, -20, AB), Bs = fadeIn(f, AB)
  const race = easeInOut(span(f, t.beat10 - 4, t.beat10 + 34))
  const walkIn = easeInOut(span(f, t.musk11 - 6, t.arrived11 + 18))
  const jar = easeInOut(span(f, t.put12, t.raised12 + 6))
  return (
    <g>
      <TDefs />
      {/* ---------------- A) two founders, one idea ---------------- */}
      {A > 0 && <g opacity={A}>
        <Workshop />
        <CalPage x={1500} y={430} top="JULY" big="2003" s={0.8} o={on(f, t.july9, 8) * (1 - on(f, t.idea10, 8))} />
        <Tag x={1500} y={640} text="CALIFORNIA" size={44} bg={T.blue} o={on(f, t.california9, 8) * (1 - on(f, t.idea10, 8))} />
        {/* the bench */}
        <rect x={180} y={FLOOR - 190} width={760} height={30} rx={6} fill={T.woodD} /><rect x={210} y={FLOOR - 160} width={24} height={160} fill={T.woodD} /><rect x={886} y={FLOOR - 160} width={24} height={160} fill={T.woodD} />
        <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [t.eberhard9, 'present', 'smiling'], [t.idea10, 'explain', 'smiling'], [t.beat10, 'fistPump', 'smiling']]} x={360} y={1060} s={0.7} o={on(f, t.two9 - 4, 8)} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [t.tarpenning9, 'thumbsUp', 'smiling'], [t.idea10, 'think', 'thinking'], [t.box10, 'shrug', 'smug']]} x={720} y={1060} s={0.7} o={on(f, t.two9 - 2, 8)} />
        <Tag x={360} y={1030} text="EBERHARD" size={36} bg={T.ink} o={on(f, t.eberhard9, 8) * (1 - on(f, t.idea10, 8))} />
        <Tag x={720} y={1030} text="TARPENNING" size={36} bg={T.ink} o={on(f, t.tarpenning9, 8) * (1 - on(f, t.idea10, 8))} />
        {/* the idea: a pencil sports car on the wall, then racing */}
        <g opacity={on(f, t.idea10 - 2, 8)}>
          <rect x={1080} y={250} width={720} height={330} rx={8} fill={T.paperL} opacity={1 - on(f, t.beat10 - 6, 8)} />
          <Car kind="roadster" x={f < t.beat10 - 4 ? 1440 : lerp(1440, 1700, race)} y={f < t.beat10 - 4 ? 500 : 760} s={f < t.beat10 - 4 ? 0.9 : 0.75} ghost={f < t.electric10 ? 1 : 1 - on(f, t.electric10, 14)} spin={f / 10 * race} />
          {f >= t.beat10 - 4 && <Car kind="sedan" x={lerp(1500, 1240, race)} y={760} s={0.6} color="#9AA3AE" spin={f / 14} o={1 - on(f, t.slow10 - 4, 8)} />}
          {f >= t.beat10 - 4 && <Tag x={1700} y={600} text="ELECTRIC" size={40} bg={T.red} o={on(f, t.beat10, 8) * (1 - on(f, t.slow10 - 4, 8))} />}
          {f >= t.beat10 - 4 && <Tag x={1240} y={600} text="GAS" size={40} bg="#7D8999" o={on(f, t.gas10, 8) * (1 - on(f, t.slow10 - 4, 8))} />}
        </g>
        <g opacity={on(f, t.slow10, 8)}>
          <g transform={`translate(1360 ${FLOOR - 20})`}><ellipse cx={0} cy={4} rx={170} ry={12} fill="#000" opacity={0.16} /><rect x={-150} y={-180} width={300} height={150} rx={12} fill="#A7B0BC" /><rect x={-120} y={-160} width={110} height={70} rx={6} fill="url(#tz-glass)" /><circle cx={-90} cy={-30} r={34} fill={T.tyre} /><circle cx={90} cy={-30} r={34} fill={T.tyre} /></g>
          <Cross x={1360} y={FLOOR - 120} r={120} p={span(f, t.box10, t.box10 + 12)} />
        </g>
      </g>}

      {/* ---------------- B) the money arrives ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Workshop />
        <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [t.musk11, 'think', 'thinking'], [t.money11, 'celebrate', 'smiling'], [t.chairman12, 'clapA', 'smiling', 'clapB', 10]]} x={240} y={1060} s={0.62} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [t.musk11, 'idle', 'thinking'], [t.money11, 'thumbsUp', 'smiling']]} x={480} y={1060} s={0.62} />
        <Tag x={360} y={560} text="THE TWO FOUNDERS" size={40} bg={T.ink} o={on(f, t.not11, 8) * (1 - on(f, t.put12, 8))} />
        <Person f={f} who="investor" beats={f < t.arrived11 + 18 ? [[0, 'walkA', 'neutral', 'walkB', 9]] : [[0, 'carry', 'smiling'], [t.put12, 'offer', 'smiling'], [t.chairman12, 'confident', 'smug']]} x={lerp(1900, 860, walkIn)} y={1060} s={0.66} o={on(f, t.musk11 - 6, 8)} />
        <Tag x={lerp(1900, 860, walkIn)} y={1030} text="ELON MUSK" size={36} bg={T.red} o={on(f, t.musk11, 8)} />
        {/* the jar of the first round */}
        <g transform="translate(1400 0)" opacity={on(f, t.put12 - 4, 8)}>
          <rect x={-170} y={330} width={340} height={480} rx={40} fill="#E9F1F7" stroke={T.steelD} strokeWidth={6} />
          <rect x={-150} y={790 - 440 * jar} width={300} height={440 * jar} rx={24} fill={T.green} opacity={0.85} />
          <rect x={-150} y={790 - 440 * jar * (6.5 / 7.5)} width={300} height={440 * jar * (6.5 / 7.5)} rx={24} fill={T.sun} />
          <rect x={-130} y={350} width={30} height={440} rx={14} fill="#fff" opacity={0.35} />
          <Tag x={0} y={300} text="FIRST $7.5M RAISED" size={42} bg={T.ink} o={on(f, t.first12, 8)} />
          <Tag x={0} y={640} text="MUSK: $6.5M" size={46} bg={T.sunD} o={on(f, t.half12, 8)} />
        </g>
        <MoneyBag x={lerp(1900, 860, walkIn) + 80} y={920} s={0.55} label="$" o={on(f, t.money11 - 2, 8) * (1 - on(f, t.put12 + 8, 8))} />
        <g opacity={on(f, t.chairman12 - 2, 8)} transform={`translate(${860} ${FLOOR + 10})`}><rect x={-90} y={-170} width={20} height={170} fill={T.woodD} /><rect x={-90} y={-60} width={180} height={20} fill={T.woodD} /><rect x={70} y={-60} width={20} height={60} fill={T.woodD} /></g>
        <Tag x={860} y={720} text="CHAIRMAN" size={44} bg={T.blue} o={on(f, t.chairman12, 8)} />
      </g>}

      <Headline f={f} lines={[[t.july9, '2003: A TINY START', T.ink, 96], [t.idea10, 'NO COMPROMISES', T.ink, 96], [t.musk11, 'THEN, THE MONEY', T.ink, 96]]} />
      <Mark f={f} at={(EXTRA['tz-start'] ?? []).map(c)} />
      <TGrain />
    </g>
  )
}

export const TZ_START = makePiece('tz-start', 'How it started: a small California workshop in July 2003, the two founders at a bench, a blue-pencil sports car on the wall comes to life and races past a grey gas sports car, a slow grey box car crossed out; then Elon Musk walks in with a money bag, a jar of the first $7.5M fills with his $6.5M in gold, a CHAIRMAN chair', {
  mood: 'light', Component: Start, beats: [...Object.values(K), ...(EXTRA['tz-start'] ?? [])],
  sfx: [['s10:beat', 'whoosh', 0.1], ['s10:box', 'pop', 0.08], ['s12:half', 'coin', 0.1], ['s12:chairman', 'ding', 0.08]] })
