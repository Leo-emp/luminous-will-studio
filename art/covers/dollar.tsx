// ============================================================
// COVERS — Short "Why Billionaires Take a $1 Salary"
// Sourced: Meta 2026 proxy (salary $1 in 2025; ≈342M shares); IRS Topic 409 (a gain on shares is taxed when sold).
// Drawn from the video's own gilded art-deco art: the $1 payslip, the gold-edged share certificate pile,
// the red TAX scissors and the green paycheck, the gold balance.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Payslip, CertPile, Dollar, Cheque, Scissors, ArrowUp } from '../diorama/dollar/kit'

const JOB = '20261112-1413_why-billionaires-take-a-1-salary'
const GOLD = '#E9B53A', EMER = '#1F7A5A', RED = '#D8432F'

// # 1) MAIN — a tiny $1 payslip next to a towering glowing pile of share certificates; the shocked hero points at the pile
export const BZ_C1 = makeCover({
  id: 'dollar-1', job: JOB, canvas: 'tall',
  concept: 'A small payslip reading SALARY $1 stands beside a towering, glowing pile of gold-edged share certificates with a green arrow; the shocked hero points up at the pile.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#E6F6EE" bottom="#BFE3D1" />
      <Burst canvas="tall" cx={700} cy={880} color="#FFFFFF" opacity={0.55} />
      <Glow id="bz1" x={700} y={900} r={440} color="#FFF1C4" opacity={0.75} />
      <Ground canvas="tall" y={1440} color="#2E7A62" edge="#D9A93E" />
      <Part name="pile" kind="object" x={540} y={640} w={330} h={800}>
        <CertPile x={705} y={1440} n={24} s={1.3} glow={1} />
      </Part>
      <Part name="arrow" kind="object" x={880} y={620} w={130} h={180} touches={['pile']}>
        <ArrowUp x={945} y={720} s={1.3} />
      </Part>
      <Part name="payslip" kind="object" x={250} y={600} w={300} h={220}>
        <Payslip x={400} y={710} s={0.7} r={-6} name="CEO" co="2025" lit={1} amtO={1} sub="NO BONUS" />
      </Part>
      <Hero pose="pointUp" expression="shocked" x={210} y={2060} scale={1.9} />
      <Words lines={[{ t: 'WHY BILLIONAIRES', size: 120 }, { t: 'TAKE A $1', size: 150, color: RED }, { t: 'SALARY', size: 140 }]} x={540} y={150} rotate={-3} ring="#1F5C4A" />
    </CoverCanvas>
  ),
})

// # 2) the paycheck gets snipped by the TAX scissors while the certificate pile grows untouched — worried hero (night)
export const BZ_C2 = makeCover({
  id: 'dollar-2', job: JOB, canvas: 'tall',
  concept: 'Night deco hall: red TAX scissors snip a slice off a green paycheck while beside it a glowing pile of share certificates grows untouched; the worried hero holds his paycheck.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#1E4A44" bottom="#0A1C1E" />
      <Burst canvas="tall" cx={720} cy={900} color="#F3D27A" opacity={0.18} />
      <Glow id="bz2" x={740} y={940} r={420} color="#F3D27A" opacity={0.35} />
      <Ground canvas="tall" y={1440} color="#071415" edge="#A87A22" />
      <Part name="pile" kind="object" x={600} y={760} w={300} h={680}>
        <CertPile x={750} y={1440} n={20} s={1.2} glow={1} tint={0.8} />
      </Part>
      <Part name="cheque" kind="object" x={250} y={800} w={350} h={150}>
        <Cheque x={420} y={880} s={0.8} amount="$ PAY" cut={0} r={-4} />
      </Part>
      <Part name="scissors" kind="object" x={430} y={640} w={200} h={220} touches={['cheque']}>
        <Scissors x={540} y={720} s={1.1} r={90} open={0.3} />
      </Part>
      <Hero pose="despair" expression="worried" x={210} y={2060} scale={1.9} />
      <Words lines={[{ t: 'HOW THE RICH', size: 130, color: '#F7EEDC' }, { t: 'GET PAID WITHOUT', size: 120, color: GOLD }, { t: 'A PAYCHECK', size: 140, color: '#F7EEDC' }]} x={540} y={150} rotate={-3} ring="#0A1C1E" />
    </CoverCanvas>
  ),
})

// # 3) a gold balance: a single $1 bill rises, the certificate pile sinks it — smug hero
export const BZ_C3 = makeCover({
  id: 'dollar-3', job: JOB, canvas: 'tall',
  concept: 'A gold balance scale: one $1 bill on the high pan, a heavy pile of share certificates sinking the other; the smug hero explains it.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#EFE3C6" bottom="#CFB27A" />
      <Burst canvas="tall" cx={640} cy={900} color="#FFFFFF" opacity={0.3} />
      <Ground canvas="tall" y={1440} color="#1F5C4A" edge="#D9A93E" />
      <Part name="scale" kind="object" x={300} y={700} w={620} h={740}>
        <g transform="translate(-30 0) scale(0.92) translate(52 115)">
          <rect x={640} y={820} width={22} height={620} fill="#A87A22" />
          <path d="M560 1440 L740 1440 L700 1390 L600 1390 Z" fill="#D9A93E" />
          <g transform="rotate(20 651 820)">
            <rect x={360} y={810} width={580} height={20} rx={10} fill="#D9A93E" stroke="#A87A22" strokeWidth={4} />
            {[400, 900].map((px, k) => <g key={k} transform={`translate(${px} 820) rotate(-20)`}>
              <line x1={-80} y1={150} x2={0} y2={0} stroke="#A87A22" strokeWidth={4} /><line x1={80} y1={150} x2={0} y2={0} stroke="#A87A22" strokeWidth={4} />
              <path d="M-110 150 L110 150 L84 186 L-84 186 Z" fill="#D9A93E" stroke="#A87A22" strokeWidth={4} />
              {k === 0 ? <Dollar x={0} y={110} s={0.7} r={-4} /> : <CertPile x={0} y={152} n={9} s={0.8} glow={0.6} />}
            </g>)}
          </g>
        </g>
      </Part>
      <Hero pose="explain" expression="smug" x={200} y={2070} scale={1.8} />
      <Words lines={[{ t: 'WHY THEIR $1', size: 140 }, { t: 'SALARY ISN’T', size: 140, color: EMER }, { t: 'A SACRIFICE', size: 130 }]} x={540} y={150} rotate={-3} ring="#8A6A2E" />
    </CoverCanvas>
  ),
})
