# Rolevise — Factory Smoke Checklist

5-step QA for the BLS working-version factory test. All steps must pass before marking the dry-run green.

| # | Step | Pass criteria |
|---|------|----------------|
| 1 | **Login** | Sign in as `owner@rolevise.demo` / `demo1234` lands on the audit workspace (no signup wall). |
| 2 | **Seed load** | Peak Air Co · Office Manager shows ~10 seeded tasks from `SEED.json`. |
| 3 | **Classify** | Each task can be set to Keep, Automate, or Outsource; no Ghost/deferred option appears. |
| 4 | **Summary** | Audit summary updates live with correct Keep / Automate / Outsource counts. |
| 5 | **Complete path** | Full demo (login → classify all → view summary → export/share) finishes in &lt; 5 minutes. |

**Result:** ☐ Pass · ☐ Fail  
**Tester / date:** TBD  
**Notes:**
