# Rolevise — BLS Working-Version Factory Brief

**Source:** IdeaBrowser Rolevise (Aug 23 2026)  
**Engagement:** $99 hire-vs-automate audit  
**Factory mode:** BLS dry-run (parallel to proposal E2E)  
**Language rule:** This is a **working version**, not an MVP. Ship a usable product loop.

---

## Product pitch

Rolevise helps small-business owners decide what to **keep**, **automate**, or **outsource** for a given role. Owners pay $99 for a structured hire-vs-automate audit: map the role’s recurring work, classify each task, and leave with a clear staffing/automation plan—no vague “AI will fix it” advice.

**Never Ghost deferred:** every seeded task must land in Keep / Automate / Outsource. No “maybe later” bucket in the working version.

---

## Core loop

1. **Sign in** as the demo owner.
2. **Open** the Peak Air Co · Office Manager role audit.
3. **Review** ~10 seeded tasks and assign each to Keep / Automate / Outsource.
4. **Generate** a one-page audit summary (counts + recommended next actions).
5. **Export / share** the result (PDF or shareable link is enough for the working version).

---

## Seed data

| Field | Value |
|-------|--------|
| Company | Peak Air Co |
| Role | Office Manager |
| Demo login | `owner@rolevise.demo` / `demo1234` |
| Tasks | See `SEED.json` (~10 tasks) |

---

## Success criteria

- [ ] Demo login works without signup friction.
- [ ] Peak Air Co / Office Manager role loads with seeded tasks.
- [ ] Every task can be classified Keep / Automate / Outsource (no Ghost / deferred state).
- [ ] Audit summary reflects live classification counts.
- [ ] End-to-end path completes in under 5 minutes for a cold demo.
- [ ] Smoke checklist in `SMOKE.md` passes green.

---

## Stack notes

- Prefer a fast full-stack path (e.g. Next.js + Postgres or SQLite) suitable for Vercel preview.
- Auth: simple email/password for demo account; seed on first boot.
- Persist classifications so a refresh does not wipe the audit mid-demo.
- Keep UI tight: role header → task list with classifiers → summary panel.

---

## Factory / process notes

- Parallel track to proposal E2E; this brief is the factory dry-run artifact.
- Do not rebrand as MVP in copy, PRs, or commits—use **working version**.
- Fill `LINK.md` with repo / PR / Vercel preview when available.
