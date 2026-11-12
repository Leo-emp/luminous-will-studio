# Luminous Will Illustrated Studio — Design

Date: 2026-11-13 · Status: draft for owner approval
Brainstormed with the owner in one session. Marks: **(owner)** = the owner decided it; **(my call)** = Claude decided, owner can override; **(builder)** = left to whoever plans and builds it.

---

## 1. Intent and why

Luminous Will (LW) is a motivation channel (YouTube, TikTok, Instagram, Facebook). Its main Shorts and long videos are currently built from Pexels/Pixabay stock clips in a dark aesthetic (Python + MoviePy, `C:\Users\User\LuminousWill`).

That approach is running out of road:
- The pool of clips that fit the brand is small. 7 videos already used 770 different clips (about 110 per video), 22 of them at the 3-use cap. Long videos burn through it fastest.
- Thousands of channels use the same free clips, so they don't feel original.

The owner has watched CapitalCode (their finance channel) become polished illustrated videos in which **drawings act out every line of the voiceover**, and wants LW to work the same way: same craft and quality, but **LW's own hero, characters, colours and world**. **(owner)**

The owner also wants it made the way CapitalCode is: an **intelligent agent** that makes a complete video from one command and gets better from feedback. **(owner)**

**Success:** the owner gives a topic (or none), and the agent delivers a finished, packaged, review-ready Short or long video that looks as polished as CapitalCode, feels like Luminous Will, and is drawn fresh every time.

## 2. Goals, non-goals, anti-goals

**Goals**
- Both formats switch: **main Shorts (9:16) and long videos (16:9)**. **(owner)**
- Topics: motivation, meaning **discipline, comebacks, mindset and psychology**. **(owner)**
- CapitalCode-level visual craft with LW's own identity (section 4).
- An agent like CapitalCode's: one command per video, resume, health check, learning from feedback, cloud render (section 6).

**Non-goals**
- Changing the current LW system. It is left alone for now, including the old main-Shorts pipeline, and the quote, aesthetic and speech reels stay on it. **(owner)**
- Choosing LW's final voice. The owner will choose it later (section 5).
- Auto-posting. Videos stop in review; the owner posts. **(owner, existing LW rule)**

**Anti-goals (would be a failure even if it technically works)**
- **Touching CapitalCode.** LW must never create, edit or delete anything in `C:\Users\User\capitalcode`. The two stay completely separate. **(owner, explicit)**
- **Feelings drawn as characters** (a "Doubt" cloud, a "Comfort" couch creature). Rejected. **(owner)**
- **A fixed cast or ongoing storyline.** No recurring friend, coach or rival with a plot. **(owner)**
- **Music.** The new LW videos have no music bed. **(owner)**
- The old dark aesthetic for this format. **(owner)**
- Reused scenes or templates between videos, or a look that drifts back to "presenter + popping stickers" (CapitalCode's known failure pattern, see section 4.4).

## 3. Formats

| | Shorts | Long |
|---|---|---|
| Canvas | 1080×1920 (9:16) | 1920×1080 (16:9) |
| Length | **2–3 min (owner)**, staying under YouTube's 3-minute Shorts limit | 8–10 min **(my call, from LW's long-form plan)** |
| Loudness | ≈ −11 LUFS, true peak ≤ −0.1 dB (LW's existing Shorts standard) **(my call)** | ≈ −10 LUFS (owner's approved energetic long mix) **(my call)** |
| Music | none **(owner)** | none **(owner)** |
| Origin | **Made from scratch**: its own topic, script, art drawn for the tall frame and render. Never cut from a long video. **(owner)** | Made on its own |

## 4. The look

### 4.1 Same craft as CapitalCode **(owner: "yes" to this read)**
Studied from CapitalCode renders and its rig code (`capitalcode/art/rig/hd/CharacterHD.tsx`, read only):
- Clean vector shapes, two-tone cel shading with a rim light, soft gradients, soft shadows under objects.
- Tall, slim characters about 6.6 heads high, with jointed arms and legs driven by a shared pose library (idle, point, slump, celebrate, run and so on).
- Big expressive eyes (white, large pupil, highlight). Expressions are carried by brows, eyes and mouth.
- Worlds built from soft gradient skies, layered silhouettes (buildings, mountains), glowing light sources and a flat ground strip.
- Few objects per frame (3–4), calm space, a bold condensed title (Bebas Neue style) and cream pill labels.
- **Drawings act out each line as it's spoken**, synced to word timings. **No zoom-ins or zoom-outs; motion comes from the drawing changing. No pile-up:** old objects leave or transform as new ideas arrive. (These are owner rules on CapitalCode; the owner asked for "just like CapitalCode", so they carry over. **(my call)**)

### 4.2 LW's own identity **(owner)**
- Its own hero, characters, colours and world: it must never be mistaken for CapitalCode.
- **Burgundy** is LW's signature colour (owner picked it). Approved hero render uses `#7E1F35` as the base burgundy.
- The approved hero sheet's background is warm cream with a soft peach gradient. Whether that becomes the channel-wide default is **(builder)**, as long as every video's scenes are drawn fresh (4.4).

### 4.3 The hero **(owner approved the render: "its ok. i like them")**
- One recurring default hero who acts out the script whenever it needs a person.
- A young man in his mid 20s, fit but ordinary. Warm natural skin (not CapitalCode's navy), a textured short crop haircut, CapitalCode's eye style, no glasses.
- **Versions of the same person:** same face and hair shape, always a touch of burgundy. Clothes, posture and build change.
  - **Ordinary** (default): burgundy hoodie, charcoal joggers, white trainers.
  - **Struggling**: faded hoodie, messy hair, tired eyes, slumped.
  - **Fit**: burgundy training tee, broader shoulders.
  - **Successful**: charcoal suit, burgundy tie and pocket square, gold watch.
  - **Young** and **Older**: wanted, not yet designed **(owner: "later")**.
- Expressions in the approved sheet: calm, proud, determined, struggling, shocked, thinking.
- Reference: `LuminousWill/docs/lw-illustrated/hero-spike/` holds the approved renders (`hero-sheet.png`, `hero-faces.png`) and the throwaway spike code (`LWHero.tsx`, `index.tsx`). The spike imports CapitalCode paths; it must be **re-homed** into the new repo with copied files, never by importing from CapitalCode.

### 4.4 Other characters **(owner)**
- Drawn **when a script needs them** (a boxing coach, an old man, a famous figure in a story). Real people only, never feelings.
- **Create once, save, reuse:** a new character is designed the first time it's needed, shown to the owner, saved to an LW character library once approved, and reused after that. Small per-video changes (outfit, colours, setting) avoid looking samey. **(owner said yes to this)**
- Same base rig as the hero, so characters are "looks" (colours, hair, outfit, accessories) on one body, as in CapitalCode.
- Famous real people: shown as drawn figures; the voice narrates about them and never imitates them (section 5).

### 4.5 Scenes **(owner)**
- **Every video has many different scenes**, and **every drawing is drawn fresh for that video.** No reused scenes or templates. Only the hero, the saved characters and shared parts (rig, kit pieces) carry between videos.
- Light and darker moods follow the story: cooler or dimmer for the struggle, warm light for the win. Never the old full-dark aesthetic. **(my call; owner didn't object)**

### 4.5b Art library **(owner asked; my split)**
- **Copied from CapitalCode:** the craft and the generic tools (motion: walk, act, breathe, blink, transitions; layout and text fitting; grain and vignette; generic chart and card frames).
- **Never copied:** CapitalCode's scenes, settings (banks, shops, trading floors, casinos), finance props (coins, cash, cards, money charts) and cast.
- **LW's own library, grown over time:** a motivation **prop kit** (alarm clock, dumbbells, punch bag, running shoes, books, phone, bed, stairs, mirror, trophy and more) and **world building blocks** (dawn bedroom, gym, street, boxing ring, track, rooftop, office, hospital, mountain and more). Each part is saved once and reused, like the character library. Every scene that uses them is still composed and drawn fresh for its video (4.5).

### 4.6 Drawing rules (carried over from CapitalCode's owner rules, adapted for LW) **(my call, pending owner check)**
The newest owner rule wins where CapitalCode's taste file and memories disagree: no zooms and no 1.5 s rule.
1. **Continuous transforming illustration:** each beat is one drawing that fills the frame and changes on the words (splits, grows, collapses, morphs into the next idea). No stack of separate stickers.
2. **Everything lands on the word:** a prop appears as it's named, a pose or expression changes on the emotional word.
3. **Characters act:** the hero and others walk, take, push, fall, get up and feel. Key beats are acted out, not shown as captions.
4. **Pictures, not text:** drawings carry the meaning, with text only for a few key words or numbers. At most 3–4 objects per frame.
5. **No pile-up:** when a new idea starts, old objects leave or turn into the new one. Labels vanish when their line ends.
6. **Clean but never empty:** every frame is a full drawn world with depth, shading and texture.
7. **No covering:** nothing lands on top of another object, label or person. New things enter into free space.
8. **No loose labels:** every label is attached to what it names.
9. **No zoom-ins or zoom-outs, and no camera tricks used to pass a check.** Motion comes from the drawing changing.
10. **Don't hold one layout too long:** when the story moves to a new idea (about every 10–15 s), the picture changes to a new layout. Side-by-side comparisons may hold.
11. **Hero only where natural:** he's not on screen in every scene, and the story's other characters and the drawing can own the frame.
12. **Every video has its own art direction:** its own settings, palette mood and time of day, drawn fresh. Never a template of the last video.
13. **New look = sample first:** a video whose drawings are new code gets one scene built and shown to the owner as stills (or a ~30 s clip) before the rest is drawn. Stills are reviewed before every full render.
14. **Explain step by step:** a psychology or habit mechanism (for example how a habit loop forms) is shown one step at a time, on screen and in the voice.
15. **Never:** AI images, stock footage, feelings as characters, or real people's voices.

16. **Sound effects: YES (owner).** Subtle SFX on meaningful actions (a whoosh, a thud, a door, a punch bag, footsteps), supporting the voice and never distracting. No music bed. SFX sources must be free for commercial use. **(sources: builder)**

17. **Famous real people may be drawn (owner)** when a true story is about them, with these rules:
    - Stylised in our rig and style, recognisable from hair, outfit and setting, never a traced photo or a portrait copy.
    - A **name label** when they first appear: a small cream tag attached to them (for example "DAVID GOGGINS · 1990"), fading after a few seconds.
    - True stories only, every fact sourced. Never imply endorsement ("X recommends…"), and they never appear to address the viewer.
    - Never their voice. Narration speaks about them.
    - No team, brand or company logos on their clothes.
    - Covers and thumbnails may show them in a true-story context, never as if backing the channel. Never use them in merchandise or adverts.
    - Sensitive moments (death, crime, illness) are handled respectfully and non-graphically.
    - Each famous person goes into the character library once, after owner approval, like any other character.

### 4.7 Covers and thumbnails **(owner)**
**Copy CapitalCode's cover system** (`cc cover` / `cc recover`), with LW's own hero, colours and **fresh drawings for every video**:
- Custom drawn covers per video, never a template, drawn in the same style as the video (not stills cut from it, unless they're the best option).
- **About 3 cover options per video**, each with a phone-size preview, so the owner picks one. A redo command remakes covers from feedback.
- The background colour varies per video, and the text is polished and fits the art (CapitalCode's current rule).
- Words spark curiosity and are few, big and readable at phone size. The title and cover never promise what the video can't deliver.
- Sizes **(owner: long videos need 2 covers)**:
  - **Long videos: 2 covers each.** (1) **YouTube** 1280×720 (16:9). (2) **Instagram** 1080×1920, a separate tall design (not a crop of the YouTube one) with everything important inside the middle 3:4 area, because Instagram's profile grid crops to 3:4.
  - **Shorts:** 1080×1920, with the same Instagram 3:4-safe rule so one cover works on every platform.
  - Each option the owner picks comes in all the sizes its format needs, drawn as a matched pair (same idea, laid out for each shape).
- LW identity: the burgundy hero (or the story's character), burgundy as the signature accent, an LW logo in the same corner every time. Never CapitalCode's navy-and-champagne brand look.
- Famous people on covers follow rule 17 (true-story context only, never endorsement).
- Copied from CapitalCode, never shared or edited in CapitalCode (section 7).

## 5. Voice

- **For now: CapitalCode's voice**, Azure **"en-US-Andrew:DragonHDLatestNeural"**. **(owner: "for now use capitalcode")**
- The owner will pick LW's own voice later, so the voice must be **one swappable setting**.
- LW uses **its own copy** of the Azure key in its own `.env`. It shares no code or files with CapitalCode. **(owner rule + my call)** Copying keys between the owner's own `.env` files is allowed; keys must never be printed or committed.
- The owner is on the **Azure F0 free tier** and can't spend now. The owner accepts F0 for commercial use. Each job records **`voice_tier: F0`** in its job file, so F0-voiced videos can be listed and re-voiced later if rules ever tighten. **(my call; owner agreed)**
- **Word timings:** Azure gives them. If a later voice (for example Fish Audio) doesn't, timings come from aligning the audio (Whisper-style). **(builder)**
- **Microsoft AI Code of Conduct** (current version, 1 May 2026): every description automatically includes an AI-voice disclosure line, such as "Narration voice is AI-generated". The voice never impersonates real people. Scripts avoid encouraging self-harm, graphic violence, hate and deception. **(my call; owner said "carry on")**

## 6. The agent

Modelled on CapitalCode's agent. Steps, both formats **(owner accepted this outline, minus music and the Fish voice)**:

1. **Topic**: given by the owner or chosen by the agent. Click-worthy, in the four topic areas.
2. **Research**: every hook fact and story fact sourced.
3. **Script**: "you"-first hook, story, lesson. Long videos get a full arc with a cohesive through-line.
4. **Voice** + word timings (section 5).
5. **Visual plan**: scenes and the beats each line acts out; which hero version and which saved characters appear; new characters flagged for owner approval.
6. **Draw + render**: GitHub cloud render with the laptop as fallback. Review stills before the full render (a CapitalCode lesson). **(my call)**
7. **Checks**: loudness, empty frames, sync, text readability.
8. **Package**: title options, description (with the AI-voice line), tags, drawn covers. The video waits in review and is **never posted without the owner**.
9. **Learn**: owner feedback becomes saved rules that the next video reads before scripting (CapitalCode's brief system).

**Nothing done is ever lost (owner asked):** every step saves its result into the job folder (topic, research, script, voice, plan, renders), and a stopped job resumes from the last finished step. Renders go in short chunks (CapitalCode uses ≤900 frames, about 30 s each). A crash, reboot or killed render resumes from the last finished chunk, and after an edit only the chunks that changed are re-rendered. Cloud renders keep the run id so a laptop crash resumes waiting instead of starting a second render, and they keep every finished part, so a cloud run that fails midway only redoes the missing parts. **(owner requirement; how is builder)**

Commands in the style of CapitalCode's `cc` (for example `lw run`, `lw learn`, `lw doctor`, `lw render --on=github`, resume of unfinished jobs). Exact command names are **(builder)**.

Output naming follows the owner's rule for every LW agent: `Title_YYYY-MM-DD_HH-MM_short|long.mp4`, in per-format output folders. **(existing owner rule)**

## 7. Where it lives **(owner chose option 2)**

- **New repo `luminous-will-studio`**, started as a **copy** of CapitalCode's engine (TypeScript + Remotion, character rig, timeline, render, GitHub cloud render, brief and rules system), then adapted for LW.
- **CapitalCode is read-only reference.** Copy files out; never edit, import from, write into, or run jobs inside `capitalcode/`. **(owner, explicit)**
- **Leave the current LW system alone for now (owner).** The old `LuminousWill` repo, including the `luminous-main` skill and the MoviePy main-Shorts pipeline, keeps working exactly as it is. The new studio must not edit, retire or redirect it. Whether to retire it later is a separate owner decision. Quote, aesthetic and speech reels stay there too.
- The new studio may later copy the old repo's **auto-posting** code **(builder: how)**, by copying and not by editing the old repo. Its music library is not needed (no music).
- **The new repo is PUBLIC on GitHub (owner)**, which gives unlimited free Actions minutes for cloud renders. So: no `.env`, keys or tokens ever committed; cloud secrets only in GitHub Actions Secrets; a secret scan before every push; no personal details in code, commits or docs. Scripts, art and rules will be publicly visible, and the owner accepts that.
- Later, once both channels are stable, shared parts could become one package (option 3). Not now.

## 8. Constraints

- **No new spending** right now (Azure F0; free GitHub Actions minutes; existing accounts). **(owner)**
- The laptop runs low on memory. Heavy renders go to GitHub; laptop renders one at a time. **(existing owner rules)**
- Code is **heavily commented** for learning (owner's standing preference).
- On Windows, never rewrite files through PowerShell `Get-Content`/`Set-Content` (encoding damage); use proper file tools.
- Secrets: never print, log or commit keys.

## 9. Left to the builder

- What to copy from CapitalCode versus rewrite, and how to strip CapitalCode-specific art, rules and finance logic.
- Character library format and the approval flow for new characters.
- How hero versions are stored and chosen per line.
- Exact commands, job folder layout, gates and tests.
- Cover style for LW (drawn, burgundy-led, distinct from CapitalCode).
- How finished videos reach the owner's review and posting flow.

## 10. Open items for the owner (not blocking the build)

- Pick LW's own voice (swap the placeholder).
- Design the Young and Older hero versions.
