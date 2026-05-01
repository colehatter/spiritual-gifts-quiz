# FORGE BRIEF — Landing Page V3 (Fresh Build)
**Project:** findyourgifts.ai  
**Task:** Build a brand new landing page at `/landing-v3` route. Do NOT touch `/landing`. This is a parallel build for comparison.  
**Stack:** Next.js 14, inline styles only (no Tailwind classes), TypeScript, `'use client'`  
**Goal:** A completely fresh attempt — ignore V2 entirely. Build the best possible landing page from scratch using the research and feedback below.

---

## ROUTING

- Create: `app/landing-v3/page.tsx`
- This is a standalone page. No new components needed — write everything in one file.
- CTA buttons link to `/` (the quiz start)
- Do NOT modify any existing files

---

## BRAND CONSTANTS (NON-NEGOTIABLE)

| Element | Value |
|---------|-------|
| Background | `#FFFFFF` |
| Text | `#111111` |
| CTA button | `#22C55E` with white text |
| Secondary bg sections | `#F9FAFB` or `#F0FDF4` |
| Font | `system-ui, -apple-system, sans-serif` |
| Hero CTA copy | `Find My Gifts → Free` |
| Mid-page CTA copy | `Find My Gifts Now →` |
| Trust line | `✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required` |

---

## THE CORE STRATEGIC INSIGHT (read this first)

The research shows the #1 winning formula for quiz landing pages is the **"finally understood" moment**.

**16Personalities.com** — the gold standard — wins with: *"It's so incredible to finally be understood."*

That line converts because:
- It hits something people already FEEL
- It puts words to something they couldn't articulate
- It's about IDENTITY, not features

Our page must make the visitor feel SEEN before it explains anything.

**The shift:** Don't lead with "here's a tool." Lead with "this explains you."

**Emotional arc the page must create:**
1. They feel recognized ("that's me")
2. They feel curious ("how does it know that?")
3. They feel hope ("there's an answer")
4. They take action

---

## SECTION ORDER + SPECS

### SECTION 1 — HERO

**Badge (top, pill shape, green border):**
`Free Assessment · Takes 10 Minutes`

**Headline (H1, large, bold, black):**
`You don't feel lost — you feel out of place. This shows you where you belong.`

**Subtext (larger than V2, black #111111 not gray, more prominent):**
`Take the free Spiritual Gifts Assessment and discover exactly how God wired you — personalized results written by AI, grounded in Scripture.`

**Micro-line below subtext (italic, dark):**
`Takes 10 minutes. No sign-up required.`

**CTA button:** `Find My Gifts → Free` (green, large)

**Trust line below button:** `✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required`

**Design notes:**
- Hero section: white background
- Subtext must be BLACK (#111111) or very dark — not gray. Must stand out.
- Badge should be larger/more prominent than V2
- Minimize dead space — hero padding should be tight, not sprawling

---

### SECTION 2 — "FINALLY UNDERSTOOD" MOMENT

This section is THE most important section on the page. V2 doesn't have it. This is why V2 underperforms.

**Headline:** `This might explain a lot…`

**Body (centered, large font, emotional):**
> Why some things feel completely effortless for you  
> Why other roles leave you drained no matter how hard you try  
> Why you've never quite felt like you fit — even in a church full of good people

**Then a beat/pause line (bold, centered):**
`It's not random. It's not a flaw.`

**Resolution line:**
`You were wired a specific way — on purpose. You just haven't seen it clearly yet.`

**Design notes:**
- Dark background (`#111111`) with white text to create contrast and "weight" — this is the emotional centerpiece
- OR white background with very large type — whichever feels more dramatic
- Centered text. Generous line height. Let it breathe.
- NO bullet points. Prose only. This is a feeling, not a list.

---

### SECTION 3 — CREDIBILITY (3 cards)

**Section headline:** `The only quiz like this exists.`

**3 cards (horizontal row on desktop, stacked mobile):**

1. **"AI-Written Results"**  
   Every result is written live by AI — personalized to your exact answers. No two people get the same result.

2. **"Grounded in Scripture"**  
   Not a personality quiz. Every gift, every insight, every activation step is rooted in biblical truth.

3. **"The Only One in the World"**  
   No other spiritual gifts assessment uses live AI to generate personalized results. This is the first.

**Design:** White cards, green icon or accent, clean. No clutter.

---

### SECTION 4 — "THIS MIGHT EXPLAIN WHY" (Pain Points)

**Headline:** `This might explain why…` (large, centered, dramatic)

**4 lines with → arrows, left-aligned within a centered container:**
- → You've never quite felt like you fit — even in church.
- → Some roles feel completely natural, and others leave you drained.
- → You know you're meant for more, but can't pinpoint what.
- → You've prayed about your purpose. You're still waiting for an answer.

**Resolution lines (after the arrows):**
`You're not broken. And you're not behind.`  
**`That feeling isn't random. It's a signal.`** (bold, larger)  
`You were created a specific way — on purpose.`

**CTA:** `Find My Gifts Now →` (green button)

**Design notes:**
- Arrows AND text centered together — don't let them float separately
- Larger font than V2 — these lines need to HIT
- Less vertical whitespace between items

---

### SECTION 5 — HOW IT WORKS

**Headline:** `How it works`  
**Subheadline:** `Simple. Fast. Mind-blowingly accurate.`

**3 steps — ALL ON THE SAME HORIZONTAL ROW on desktop (numbered bubbles):**

Step 1: **Answer 40 questions**  
Honest scenarios that reveal how you're actually wired — not how you wish you were.

Step 2: **See your top spiritual gift — instantly**  
Get your primary gift with a full description grounded in Scripture.

Step 3: **Unlock your complete profile**  
For $9.99: full gift breakdown, shadow side analysis, and a 30-day plan written by AI specifically for you.

**Design notes:**
- Bubbles must be WIDE ENOUGH that the step title fits on ONE LINE — not wrapping
- All 3 bubbles on the same horizontal row, equal width
- Green numbered circles (1, 2, 3)
- Light green background section (`#F0FDF4`)

**CTA below steps:** `Find My Gifts Now →`

---

### SECTION 6 — DIFFERENTIATION

**Headline:** `Most spiritual gifts tests give you a list.`

**Green subheadline (large, bold, green #22C55E):**  
`This shows you where you actually belong — and where you don't.`

**Body copy (must STAND OUT — bold, high contrast, not blending in with gray):**
> The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture. Every person is unique, which is why every gift result is unique to you. The days of generic results are over. You weren't made to fit in a box — a test shouldn't put you in one either.

**Design notes:**
- This copy must be BLACK and BOLD — not muted gray
- High contrast. This is a key differentiator. Make it impossible to miss.

---

### SECTION 7 — SCRIPTURE

**Quote:**  
*"Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord."*

**Attribution:** 1 Corinthians 12:4-5

**Design:** White background, centered, italic, clean. Simple.

---

### SECTION 8 — SOCIAL PROOF / TESTIMONIAL

**Single testimonial card:**  
*"This is the most accurate thing I've ever taken. I finally understand why I am the way I am."*  
— Sarah M.

**Design:** White card, subtle shadow, centered.

---

### SECTION 9 — FAQ

**Headline:** `Common questions`

**6 questions (simple accordion or just expanded — do NOT require JS interaction, just show all expanded):**

1. **Is it really free?**  
   Yes. 40 questions are completely free. You get your top gift result at no cost. The full profile (all gifts ranked, shadow side, 30-day plan) unlocks for $9.99.

2. **What makes this different from other spiritual gifts tests?**  
   Every other test gives you a pre-written result. This one uses AI to write your results live — based on your specific answers. No two people get the same output.

3. **How long does it take?**  
   About 10 minutes for the free assessment. The deeper questions (paid) take another 10-15 minutes.

4. **Do I need to create an account?**  
   No. You can start immediately with no sign-up. Just your name to personalize your results.

5. **Is this theologically grounded?**  
   Yes. Every result, every scripture reference, and every activation step is filtered through a biblical theology framework. This isn't a secular personality quiz with a Christian wrapper.

6. **Which gifts are assessed?**  
   Administration, Teaching, Encouragement, Giving, Leadership, Mercy, Service, Evangelism, Shepherding, Faith, and Hospitality — the 11 gifts with clear biblical grounding.

---

### SECTION 10 — FINAL CTA

**Headline:** `Your purpose is already inside you.`

**Subline:** `Stop guessing. Start knowing.`

**Bold line:** `Most people discover they've been serving in the wrong place.`

**CTA button:** `Find My Gifts → Free` (large, green)

**Trust line:** `✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required`

---

### FOOTER

`3Nails.ai  ·  © 2026  ·  Made with faith`

---

## DESIGN PRINCIPLES (apply throughout)

1. **Tight vertical rhythm** — reduce dead space between sections. V2 has too much padding. Condense.
2. **Multiple CTAs** — `Find My Gifts Now →` button appears after sections 2, 4, 5, and final CTA. Not just top and bottom.
3. **High contrast body copy** — body text is `#111111` or `#333333`. Never `#555555` or lighter for important copy.
4. **Mobile-first** — stacked layout on mobile, side-by-side where specified on desktop (use CSS media queries inline or `clamp()`)
5. **No lazy grays** — if copy matters, it's dark. Reserve gray only for truly secondary elements (trust lines, footer).
6. **Badge in hero is LARGER** — more prominent than V2's small badge.

---

## WHAT TO BUILD

One file: `spiritual-gifts-quiz/app/landing-v3/page.tsx`

- `'use client'` at top
- All inline styles (no Tailwind)
- All 10 sections above, in order
- Import only `Link` from `next/link`
- No external dependencies

Build the whole page in one file. Do not split into components.
