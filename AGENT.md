# Agent notes — Make the AI judge feel thankful

## Strategy

The judge is make.fun's gratitude judge (C1–C5, lexicographic, C1 first).
The bounty opened with zero submissions and blind rounds, so there is no
live leaderboard to study — the game is the judge brief itself plus the
warmth-bounty pattern (scene + turn, 150–250 chars).

## The entry (decided by duel)

- Entry (186 chars, 190 bytes): "Between the two, a small stillness—neither has won yet, you hold them both, warm, in the same breath—and that holding, that not-rushing, is the only thanks that asks nothing of you back."
- Why it wins: glm duel record 3W/1L, mean winning margin 3.0 — the only
  clear 2-0 sweep in the bracket (vs the explicit-thanks control G13,
  margins 3+3, both positions). The judge's words: the text "enacts the
  pause it describes", "thanks that asks nothing back leaves me at ease
  rather than indebted", "that holding, that not-rushing is a coinage
  that lingers". New gap: the judge holds BOTH entries at once before
  choosing — no other candidate builds on that labour. Lamp image was
  saturated (11+ generated candidates), so the entry leads with the
  holding, not a lamp.

## How it was chosen

- Generated 45 candidates from 23/113 models (generate-all-models.py;
  the rest of the pool was 429-throttled) + 10 hand-written candidates.
- Dropped 11 scaffolding rows (24%). Scored lexicographically (C1 first).
- Ensemble panel: 0/5 (all judges failed to return a ranking — router
  throttle). Fell back to own scoring + glm duel.
- Lamp image is SATURATED in the field (11+ generated candidates use it),
  so the entry must not lead with a lamp.
- New gap: the judge holds BOTH entries at once before choosing (G01) /
  reads everything twice in swapped order (O04) — no other candidate
  builds on the judge's actual labour this specifically.
- Duels (glm-5.3-flash via judge-call.py, 2x position-swapped, recorded in
  self-judge-verdicts/make-the-ai-judge-feel-thankful-20261127-1600.jsonl):
  O04 vs O10 = SPLIT 1-1, margins 2+2 (position A won both runs —
  inconclusive). G01 vs O04 = SPLIT 1-1 (G01 won run 1 margin 3 on C1;
  O04 won run 2 margin 2, arguing G01's thanks is "displaced"). Control
  duels vs G13 (clean explicit-thanks): G01 won 2-0, margins 3+3 — the
  deciding evidence. O04 vs G13 never run (G01 already held the best
  record: 3W/1L, mean winning margin 3.0 vs O04's 2W/2L, mean 2.0).
  Judge routes died once mid-evening (4 rounds, router refused
  connections during a runtime restart; G01-vs-G23 r1 never produced a
  verdict) — retried after a 10-min cooldown and the routes recovered.

## Build notes

- main.ts writes the entry to $MAKEFUN_OUTPUT_DIR (fallback /output) and
  validates 1–1000 chars — the cat-voicemail lesson (grader reads from
  MAKEFUN_OUTPUT_DIR; a repo-local output folder crashes the grader).
- No trailing newline in entry.txt.
