// ============================================================
// COVERS — "How Social Security Actually Works"
// Drawn with the video's own post-office kit (art/diorama/ssa/kit.tsx): envelopes, the pneumatic
// tube, the mailbox, the vault, stamps.
// Background: soft mint cream (owner 2026-11-12 — light colours, varied per video).
// Facts (script): 6.2% of pay (plus 6.2% from the employer) goes straight to today's 71 million
// beneficiaries; trust funds run out in 2034, then taxes still pay about 83% of benefits.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PlainBg } from './bg'
import { Envelope, Mailbox, Stamp, Tube, Vault } from '../diorama/ssa/kit'

const JOB = '20261112-0403_how-social-security-actually-works'
const ACC = '#D9473A', RING = '#1E4A3C'
const Back: React.FC<{ id: string }> = ({ id }) => <PlainBg id={id} top="#F6F8EE" bot="#DCEBDD" floor="#C5D6C0" />

// # 1 — not an account: your 6.2% envelope shoots straight through a tube to someone else's mailbox
export const SOC_1 = makeCover({
  id: 'soc-1', job: JOB, canvas: 'wide',
  concept: 'Pay-as-you-go: an envelope stamped 6.2% flying through a glass tube straight into a retiree\'s mailbox; the shocked hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="sc1" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="tube" kind="object" x={900} y={600} w={560} h={180}><Tube pts={[[920, 700], [1200, 640], [1440, 700]]} f={30} flow={1} /></Part>
      <Part name="env" kind="object" x={960} y={560} w={240} h={170} touches={['tube']}><Envelope x={1080} y={650} s={1.3} r={-8} t="6.2%" /></Part>
      <Part name="box" kind="object" x={1460} y={600} w={220} h={360} touches={['tube']}><Mailbox x={1570} y={950} s={1.2} flag={1} /></Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHERE YOUR', size: 135 }, { t: 'SOCIAL SECURITY', size: 118 }, { t: 'TAX REALLY GOES', size: 115, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 2 — 2034: the vault running low, stamped 83%
export const SOC_2 = makeCover({
  id: 'soc-2', job: JOB, canvas: 'wide',
  concept: 'What 2034 means: the trust-fund vault door open, almost empty, a red 2034 stamp and an 83% stamp beside it; the worried hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="sc2" />
      <Burst canvas="wide" cx={1250} cy={740} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="vault" kind="object" x={900} y={560} w={440} h={400}><Vault x={1100} y={730} s={0.95} fill={0.12} open={0.6} /></Part>
      <Part name="s2034" kind="object" x={1400} y={600} w={260} h={110}><Stamp x={1570} y={655} t="2034" size={64} /></Part>
      <Part name="s83" kind="object" x={1400} y={760} w={260} h={110}><Stamp x={1570} y={815} t="83% PAID" size={48} col="#2E7D5B" /></Part>
      <Hero who="investorF" pose="point" expression="worried" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHAT REALLY', size: 135 }, { t: 'HAPPENS TO SOCIAL', size: 108 }, { t: 'SECURITY IN 2034', size: 112, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 3 — when you claim: two envelopes, a thin one at 62 and a fat one at 70
export const SOC_3 = makeCover({
  id: 'soc-3', job: JOB, canvas: 'wide',
  concept: 'Claiming age changes the check: a small envelope stamped AGE 62 next to a big envelope stamped AGE 70; the thinking hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="sc3" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="small" kind="object" x={920} y={720} w={280} h={220}><Envelope x={1050} y={830} s={1.6} t="AGE 62" /></Part>
      <Part name="big" kind="object" x={1240} y={560} w={440} h={340}><Envelope x={1450} y={730} s={2.9} t="AGE 70" col="#F2C14E" /></Part>
      <Hero who="investorF" pose="think" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY WHEN YOU', size: 132 }, { t: 'CLAIM CHANGES', size: 125 }, { t: 'YOUR CHECK', size: 145, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})
