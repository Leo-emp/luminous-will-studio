# LW Studio — Plan 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the new public `luminous-will-studio` repo as a stripped copy of CapitalCode's engine, with LW's own identity, secret safety and the approved burgundy hero as the cast every scene draws.

**Architecture:** A one-off import script copies an allowlist of CapitalCode's engine files (read-only on the source) into `C:\Users\User\luminous-will-studio`. Per-video CapitalCode art, covers, the Next.js app and the database are left behind, and CapitalCode names, env vars and branding become LW's. The approved spike hero (`LuminousWill/docs/lw-illustrated/hero-spike/LWHero.tsx`) becomes `art/rig/lw/CharacterLW.tsx` and replaces the HD cast behind `Actor`.

**Tech Stack:** TypeScript 5.8, Node 22, Remotion 4.0.506 (pinned, same as CapitalCode), React 19, Vitest 4, tsx. Git Bash on Windows.

**Spec:** `C:\Users\User\LuminousWill\docs\superpowers\specs\2026-11-13-lw-illustrated-studio-design.md` (moved into the new repo in Task 1).

**Series:** Plan 1 Foundation (this) → Plan 2 Video agent (topic, research, script, Azure voice + `voice_tier`, no music, SFX, scenes, **LW prop kit + world library starter** (alarm clock, dumbbells, punch bag, running shoes, books, phone, bed, stairs, mirror, trophy; settings: dawn bedroom, gym, street, boxing ring, track, rooftop, office), render incl. GitHub cloud, package with AI-voice line) → Plan 3 Covers (YouTube + Instagram pairs) → Plan 4 Learning + character library approval flow + doctor.

## Global Constraints

- **Never create, edit, delete, run jobs in, or import from `C:\Users\User\capitalcode`.** Read and copy only. After every task, `git -C /c/Users/User/capitalcode status --porcelain` must match the snapshot taken in Task 1 Step 1.
- New repo path: `C:\Users\User\luminous-will-studio`. GitHub: `Leo-emp/luminous-will-studio`, **public**.
- Public repo: never commit `.env*` (except `.env.example` with empty values), keys, tokens, `output/`, `temp/`, `*.db`, personal details. Secret scan before every push.
- Keys may be copied between the owner's own `.env` files but are never printed, logged or committed.
- Remotion packages pinned at exactly `4.0.506` (match CapitalCode; `@remotion/cli` and `@remotion/renderer` `^4.0.506` as in source).
- Code is heavily commented for a learner (owner preference): a header block per file, plus `// #` comments on non-obvious lines, following CapitalCode's style.
- Never rewrite files via PowerShell `Get-Content`/`Set-Content`; use the editor tools or Node.
- Burgundy base `#7E1F35`; hero skin `['#B9825C', '#9A6645']`; hair `['#24160F', '#5A3B2A']` (approved render values).
- Commit messages end with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Import script pointed at the wrong place** (destination inside the source, source equal to destination, or a missing source): it must refuse before writing anything. *Test in Task 1.*
2. **A `.env.local` or other dotfile secret slipping into the copy:** the allowlist must never include it, and the scanner must flag it if it appears. *Tests in Tasks 1 and 3.*
3. **Real key formats missed by the scanner** (Azure 32-hex key in an assignment, AWS `AKIA…`, GitHub `ghp_…`, Stripe `sk_live_`/`pk_live_`/`whsec_`) while empty `.env.example` placeholders pass. *Tests in Task 3.*
4. **Two LW actors in one frame** (hero + a struggling hero in a before/after) sharing SVG ids, so a clip or gradient bleeds across: every id must be unique per instance. *Test in Task 4.*
5. **The fit hero standing taller or shorter than the ordinary hero:** a before/after must line up, so the standing height must be equal. *Test in Task 4.*

---

### Task 1: Import the engine into a new repo

**Files:**
- Create: `C:\Users\User\luminous-will-studio\scripts\import-engine.mjs`
- Create: `tests/scripts/importEngine.test.ts`
- Create (copied): everything on the allowlist below
- Create: `docs/superpowers/specs/2026-11-13-lw-illustrated-studio-design.md` and this plan (copied from `LuminousWill/docs/superpowers/…`), plus `docs/lw-illustrated/hero-spike/*` (copied)

**Interfaces:**
- Produces: `importEngine({ src: string, dest: string, dryRun?: boolean }): { copied: string[]; skipped: string[] }`, exported from `scripts/import-engine.mjs`, with a CLI `node scripts/import-engine.mjs <src> <dest>`. Also exports `ALLOW: string[]` and `DENY: RegExp[]`.

- [ ] **Step 1: Snapshot CapitalCode.** Run `git -C /c/Users/User/capitalcode status --porcelain | sort > /c/Users/User/AppData/Local/Temp/cc-status-before.txt` and `git -C /c/Users/User/capitalcode rev-parse HEAD >> …` (the same file). Every later task compares against it.

- [ ] **Step 2: Create the repo folder.** `mkdir /c/Users/User/luminous-will-studio && cd $_ && git init -b main`.

- [ ] **Step 3: Write the failing test** `tests/scripts/importEngine.test.ts` (it uses temp dirs, never the real CapitalCode):
  - `refuses when dest is inside src`: `importEngine({src: tmp, dest: join(tmp,'x')})` throws `/inside the source/`.
  - `refuses when src === dest`: throws `/same folder/`.
  - `refuses a missing src`: throws `/source not found/`.
  - `copies only allowlisted paths`: a fixture src with `agent/a.ts`, `src/app/page.tsx`, `.env.local`, `output/v.mp4`, `art/rig/pose.ts`. Afterwards only `agent/a.ts` and `art/rig/pose.ts` exist in dest, and `copied` lists exactly those two.
  - `never writes into src`: the src tree's file list and mtimes are unchanged after the run.
  - `DENY wins over ALLOW`: `art/x/.env` inside an allowed folder is skipped.

- [ ] **Step 4: Run it to make sure it fails.** `npx vitest run tests/scripts/importEngine.test.ts` → FAIL (module not found).

- [ ] **Step 5: Implement `scripts/import-engine.mjs`.** Use `fs.cpSync` per allowlisted entry, with a `filter` that rejects any path matching `DENY`. Resolve real paths before the safety checks.
  - `ALLOW` = `agent/`, `art/`, `tests/agent/`, `tests/art/`, `tests/fixtures/`, `public/fonts/`, `public/sfx/`, `public/textures/`, `scripts/generate-sfx.sh`, `scripts/generate-silent-sfx.sh`, `scripts/make-sfx.sh`, `.github/render/`, `.github/workflows/render.yml`, `remotion.config.ts`, `tsconfig.json`, `vitest.config.ts`, `package.json`, `.gitignore`.
  - `DENY` = `/(^|\/)\.env/`, `/(^|\/)node_modules\//`, `/\.db$/`, `/(^|\/)(output|temp|brand|research|spike)\//`, `/\.mp4$|\.wav$|\.mp3$/` except under `public/sfx/`.

- [ ] **Step 6: Run the test to make sure it passes.** Same command → PASS (6 tests).

- [ ] **Step 7: Run the real import.** `node scripts/import-engine.mjs /c/Users/User/capitalcode /c/Users/User/luminous-will-studio`. Then copy the spec, this plan and `docs/lw-illustrated/hero-spike/` from `/c/Users/User/LuminousWill/docs/` into the same paths in the new repo (copies; the originals stay put).

- [ ] **Step 8: Verify CapitalCode is untouched.** Regenerate the status and HEAD into `cc-status-after.txt`. `diff` against the before file → no output.

- [ ] **Step 9: Commit.** Message: `chore: import engine from CapitalCode (copy, allowlisted)`. The body lists ALLOW and states that the source is unmodified.

### Task 2: Strip CapitalCode-specific parts, rebrand to LW, tests green

**Files:**
- Modify: `package.json` (name `luminous-will-studio`; remove `next`, `drizzle-orm`, `drizzle-kit`, `@libsql/client`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `@google/genai`; remove the `dev`/`build`/`start`/`pipeline`/`db:*` scripts; keep `test`, `test:watch`, `typecheck`; add `"lw": "tsx agent/cli.ts"`)
- Modify: `art/diorama/pieces.ts` (keep the file, empty the block between `// # pieces:begin` and its end marker); delete every per-video diorama file and folder (see Step 3)
- Modify: `art/covers/index.ts` (keep the file and the `toIg` import; empty the cover list); delete per-video cover data files
- Modify: `agent/cloud.ts` (`GH_REPO = 'Leo-emp/luminous-will-studio'`); `.github/workflows/render.yml` (secrets `LW_AWS_ACCESS_KEY_ID` / `LW_AWS_SECRET_ACCESS_KEY`; header comment says Luminous Will)
- Modify: every `CC_` env var → `LW_` (for example `CC_RENDER_ON` → `LW_RENDER_ON`), CLI help text and header comments ("CAPITALCODE AGENT CLI" → "LUMINOUS WILL STUDIO CLI")
- Modify: `art/logo/*` (draw a placeholder LW monogram: burgundy `#7E1F35` circle with cream "LW" in Bebas Neue; no CapitalCode emblem geometry)
- Modify: `art/tokens.ts` (add `LW = { burgundy: '#7E1F35', cream: '#F7EDE2', ink: '#3A1622' }` to `COLORS`)
- Create: `tests/brand/noCapitalCode.test.ts`; `README.md`; `NOTICE.md`

**Interfaces:**
- Consumes: the imported tree from Task 1.
- Produces: a repo where `npm test` and `npm run typecheck` pass, and `npx tsx agent/cli.ts help` prints LW command help.

- [ ] **Step 1: Write the failing test** `tests/brand/noCapitalCode.test.ts`:
  - `no CapitalCode names in code`: walk `agent/`, `art/`, `scripts/`, `.github/`. No file matches `/capitalcode|CapitalCode|CAPITALCODE|\bCC_[A-Z]/`. `NOTICE.md` is outside these folders and is the only place allowed to credit the origin.
  - `no imports outside the repo`: no `.ts`/`.tsx`/`.mjs` file contains `from '` followed by a path that resolves outside the repo root, or the literal `capitalcode/`.
  - `GH_REPO is LW's`: `GH_REPO === 'Leo-emp/luminous-will-studio'`.

- [ ] **Step 2: Run it.** `npx vitest run tests/brand` → FAIL.

- [ ] **Step 3: Delete per-video art.** In `art/diorama/`, keep only `kit.tsx`, `cues.ts`, `registry.ts`, `pieces.ts` (emptied) and any file that `npx tsc --noEmit` shows the kept non-diorama code still imports. Delete every other file and subfolder (they are CapitalCode videos). In `art/covers/`, delete every file that calls `makeCover(` with a video's data and keep the kit, registry, `index.ts` (emptied), `igauto` and `CoverStill`. Also delete `art/covers/cast.tsx` (it draws CapitalCode's cast).
  **Finance-only library parts:** in `art/props/`, `art/scenes/`, `art/vignettes/` and `art/infographics/`, delete every entry whose subject is finance or a CapitalCode setting (coins, cash, cards, banks, shops, trading floors, casinos, money charts), and remove it from that folder's registry. Keep generic tools: `art/motion/*`, layout and text fitting, transitions, grain and vignette, generic chart and card frames, and the registries themselves (empty is fine). Rule for unclear cases: if the thing would look out of place in a motivation video without CapitalCode's story around it, delete it. List the deleted entries in the commit body.

- [ ] **Step 4: Apply the package, rename, logo and token edits** listed under Files. Run `npm install` to regenerate `package-lock.json` (Remotion stays at 4.0.506).

- [ ] **Step 5: Fix fallout with one rule.** Run `npm run typecheck && npm test`. A test that fails *only* because it references deleted per-video art or covers, the deleted `src/` app or CapitalCode branding is deleted or retargeted at a kept piece of the kit. Any other failure is a real bug: fix it. List the removed tests in the commit body.

- [ ] **Step 6: Write `README.md`** (what LW Studio is, `npm test`, `npm run lw -- help`, and the hard rule that it never touches CapitalCode) and `NOTICE.md` (engine originally copied from the owner's CapitalCode project on 2026-11-13; independent since).

- [ ] **Step 7: Run everything.** `npm run typecheck && npm test` → all pass. `npm run lw -- help` → lists commands, header says Luminous Will Studio.

- [ ] **Step 8: Verify CapitalCode is untouched** (diff as in Task 1 Step 8).

- [ ] **Step 9: Commit.** Message: `refactor: strip CapitalCode-specific art, app and branding; rebrand to LW`.

### Task 3: Public-repo secret safety

**Files:**
- Create: `scripts/secret-scan.mjs`, `tests/scripts/secretScan.test.ts`, `.githooks/pre-push`, `.env.example`
- Modify: `.gitignore`, `package.json` (add `"scan": "node scripts/secret-scan.mjs"` and `"prepare": "git config core.hooksPath .githooks"`)

**Interfaces:**
- Produces: `scanText(path: string, text: string): { path: string; line: number; kind: string }[]` and `scanRepo(root: string): Finding[]` (scans `git ls-files` plus staged files), and a CLI that exits 1 on any finding and prints `path:line kind` without the matched value.

- [ ] **Step 1: Write the failing test** `tests/scripts/secretScan.test.ts`. Build every fake key at runtime (for example `'AKIA' + 'Q'.repeat(16)`) so the test file itself never contains a key-shaped literal.
  - Detects `kind:'aws'` for `AKIA` + 16 uppercase alphanumerics.
  - Detects `kind:'github'` for `ghp_` + 36 alphanumerics.
  - Detects `kind:'stripe'` for `sk_live_`/`pk_live_`/`whsec_` + 24 alphanumerics.
  - Detects `kind:'assigned-secret'` for `AZURE_SPEECH_KEY=` followed by 32 hex characters, and for any `*_KEY`/`*_SECRET`/`*_TOKEN` assigned a 20+ character value.
  - Detects `kind:'dotenv'` for any tracked path matching `/(^|\/)\.env(?!\.example$)/`.
  - Passes `.env.example` lines like `AZURE_SPEECH_KEY=`.
  - Output never includes the matched value: `JSON.stringify(findings)` doesn't contain the fake key.

- [ ] **Step 2: Run it** → FAIL.

- [ ] **Step 3: Implement `scripts/secret-scan.mjs`** with the patterns above (regexes, line by line; skip binary files over 1 MB).

- [ ] **Step 4: Run it** → PASS.

- [ ] **Step 5: Add the hooks and ignore rules.** `.githooks/pre-push` runs `node scripts/secret-scan.mjs || exit 1`. `.gitignore` adds `.env*`, `!.env.example`, `output/`, `temp/`, `*.db`, `node_modules/`. `.env.example` lists `AZURE_SPEECH_KEY=` and `AZURE_SPEECH_REGION=` (more come in Plan 2). Run `npm run prepare`.

- [ ] **Step 6: Scan the repo.** `npm run scan` → exit 0, no findings.

- [ ] **Step 7: Commit.** Message: `chore: secret scanner + pre-push hook for the public repo`.

### Task 4: The approved LW hero becomes the cast

**Files:**
- Create: `art/rig/lw/CharacterLW.tsx` (ported from `docs/lw-illustrated/hero-spike/LWHero.tsx`, with imports pointing at this repo's `art/uid` and `art/rig/pose`)
- Modify: `art/rig/Actor.tsx` (draw `CharacterLW`, cast = `LOOKS_LW`)
- Delete: `art/rig/hd/CharacterHD.tsx` once nothing imports it
- Modify/replace: `tests/art/character.test.tsx`, `tests/art/looks.test.tsx`, `tests/art/actor.test.tsx`, `tests/art/faces.test.tsx` (HD cast → LW looks)

**Interfaces:**
- Consumes: `Pose`, `ExpressionId`, `getPose`, `footDrop`, `handPosition`, `SKELETON`, `Skeleton` from `art/rig/pose`; `useUid` from `art/uid`; `idleLife` from `art/motion/life`.
- Produces, from `art/rig/lw/CharacterLW.tsx`:
  - `type LookLW`: the spike's `LWLook` fields, unchanged names: `top`, `cloth`, `inner`, `tie?`, `pants`, `pantsCuff`, `shoes`, `skin`, `hair`, `hairColor`, `rim`, `build`, `tired?`, `watch?`.
  - `LW_SKELETON: Skeleton` (the spike's `BASE`) and `LW_FIT_SKELETON: Skeleton` (the spike's `FIT`).
  - `skeletonFor(look: LookLW): Skeleton`.
  - `LOOKS_LW: Record<string, LookLW>` with keys exactly `'hero' | 'hero-struggling' | 'hero-fit' | 'hero-rich'` (the spike's ordinary, struggling, fit, rich values).
  - `getLookLW(id: string): LookLW`, which throws `unknown look "<id>" (known: hero, hero-struggling, hero-fit, hero-rich)`.
  - `CharacterLW: React.FC<{ pose: Pose; look?: LookLW; frame?: number; breathe?: boolean; life?: { blink: number; breath: number; headTurn: number }; blend?: { from: ExpressionId; mix: number } }>`.
  - `HeadLW: React.FC<{ look: LookLW; expression: ExpressionId }>`.
- `Actor` keeps its current props and its exports `CAST`, `STANDING_PX = 560`, `actorHeight`, `heldPoint`; `who` now takes LW look ids.

- [ ] **Step 1: Write the failing tests** (render with `react-dom/server` `renderToStaticMarkup` inside `<svg>`, as the existing art tests do):
  - `looks`: `Object.keys(LOOKS_LW)` deep-equals `['hero','hero-struggling','hero-fit','hero-rich']`; `LOOKS_LW.hero.cloth[1] === '#7E1F35'`; `LOOKS_LW.hero.skin` deep-equals `['#B9825C','#9A6645']`; `LOOKS_LW['hero-rich'].tie === '#86213A'`; `getLookLW('nope')` throws `/unknown look "nope"/`.
  - `expressions`: for each of `neutral, thinking, shocked, worried, smiling, smug, angry`, the markup of `<CharacterLW pose={{...getPose('idle'), expression: e}} look={LOOKS_LW.hero}/>` contains `data-expression="<e>"`.
  - `unique ids (Review Focus 4)`: two `<Actor>`s, `who="hero"` and `who="hero-struggling"` with pose `worried`, in one svg have no repeated `id="…"` values (collect them all and compare `Set` size to array length), and every `url(#x)` refers to an id in the markup.
  - `equal height (Review Focus 5)`: `actorHeight('idle', 1)` is within 1 px of `560` for each of the 4 looks (use `skeletonFor`).
  - `life + blend`: rendering with `life={{blink:1,breath:0,headTurn:0}}` draws closed eyes (no `<ellipse` with `fill="#FBF8F3"` in the face group); `blend={{from:'worried', mix:0.5}}` with expression `smiling` renders both expressions' mouths at opacity 0.5.

- [ ] **Step 2: Run them** → FAIL.

- [ ] **Step 3: Port the spike into `art/rig/lw/CharacterLW.tsx`.** Keep the drawing exactly as approved. Add what `Actor` needs that the spike lacks: `life` (blink closes the eyes as `CharacterHD` does; breath moves the torso by `breath*1.4`; `headTurn` is added to the head tilt) and `blend` (cross-fade the eyes and mouth from `blend.from` to `expression` by `mix`, sliding the brows, as `FaceHD` does). Expose `skeletonFor`.

- [ ] **Step 4: Point `Actor` at `CharacterLW`.** `CAST = Object.keys(LOOKS_LW)`; height and hand math use `skeletonFor(getLookLW(who))`; remove the `CharacterHD` import, delete `art/rig/hd/CharacterHD.tsx`, and update anything else `npx tsc --noEmit` flags.

- [ ] **Step 5: Run the tests** → PASS. Then `npm run typecheck && npm test` → all pass.

- [ ] **Step 6: Commit.** Message: `feat(rig): approved LW hero (4 versions) is the cast`.

### Task 5: Hero style-bible stills render in the repo

**Files:**
- Create: `art/stylebible/HeroLW.tsx` (the sheet and faces compositions, from the spike's `index.tsx`, using `CharacterLW`/`HeadLW` and `COLORS.LW`)
- Modify: `art/compositions.tsx` (register `LWHeroSheet` and `LWHeroFaces`, both 1920×1080, 1 frame)
- Create: `docs/lw-illustrated/approved/hero-sheet.png` and `hero-faces.png` (copied from `docs/lw-illustrated/hero-spike/`)
- Test: `tests/art/heroSheet.test.tsx`

**Interfaces:**
- Consumes: `CharacterLW`, `HeadLW`, `LOOKS_LW`, `getPose`, `loadBrandFonts`.
- Produces: composition ids `LWHeroSheet` and `LWHeroFaces`.

- [ ] **Step 1: Write the failing test.** The `Sheet` markup contains 4 `data-actor` groups (or 4 `CharacterLW` roots) and the titles `ORDINARY`, `STRUGGLING`, `FIT`, `SUCCESSFUL`; the `Faces` markup contains the labels `CALM, PROUD, DETERMINED, STRUGGLING, SHOCKED, THINKING`.

- [ ] **Step 2: Run it** → FAIL.

- [ ] **Step 3: Implement `art/stylebible/HeroLW.tsx`** and register both compositions. Keep the spike's layout: columns at x 250/730/1210/1690, scale 0.86, floor at y 1000; faces at scale 2 in a 3×2 grid.

- [ ] **Step 4: Run it** → PASS.

- [ ] **Step 5: Render the stills and compare by eye.** Find the Remotion entry file that `art/compositions.tsx` is registered from (the root `index` file used by `remotion.config.ts`/the `stylebible` command). Run `npx remotion still <entry> LWHeroSheet temp/hero-sheet.png` and the same for `LWHeroFaces`. Open both next to `docs/lw-illustrated/approved/*.png`: the hero, the four versions and the expressions must match the approved renders, and only the fonts may differ by a pixel or so.

- [ ] **Step 6: Verify CapitalCode is untouched** (diff as in Task 1 Step 8).

- [ ] **Step 7: Commit.** Message: `feat(stylebible): LW hero sheet + expressions compositions`.

### Task 6: Publish the public GitHub repo

**Files:** none new.

- [ ] **Step 1: Ask the owner to confirm creating the public repo now.** Creating it publishes the code. Stop here until they say yes.
- [ ] **Step 2:** `npm run scan` → exit 0.
- [ ] **Step 3:** `gh repo create Leo-emp/luminous-will-studio --public --source . --remote origin --push`.
- [ ] **Step 4:** Check `gh repo view Leo-emp/luminous-will-studio --json visibility` → `PUBLIC`, and that `git ls-files | grep -E '(^|/)\.env'` prints only `.env.example`.
- [ ] **Step 5:** Final CapitalCode check (diff as in Task 1 Step 8) → no output.
