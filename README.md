# Luminous Will Studio

The agent and art engine that makes **Luminous Will** videos: polished illustrations that act out every line of the voiceover, with LW's own burgundy hero, characters and world.

- Formats: Shorts (9:16, 2–3 min, made from scratch) and long videos (16:9, 8–10 min).
- Topics: discipline, comebacks, mindset, psychology.
- Design: `docs/superpowers/specs/2026-11-13-lw-illustrated-studio-design.md`

## Use

```bash
npm install
npm test            # all tests
npm run typecheck
npm run lw -- help  # the agent's commands
npm run scan        # secret scan (also runs before every push)
```

## Hard rules

- This repo is **public**: never commit `.env*` (only `.env.example`), keys or tokens.
- It is completely separate from the owner's other projects: nothing here imports from, writes into or runs inside any other repo.
