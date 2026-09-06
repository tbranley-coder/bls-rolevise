export default function HomePage() {
  return (
    <div className="container hero">
      <div className="hero-card">
        <span className="eyebrow">Working version</span>
        <h1>Know what to keep, automate, or outsource—before you hire.</h1>
        <p className="lede">
          Rolevise runs a structured $99 hire-vs-automate audit for small-business
          roles. Map recurring work, classify every task, and leave with a clear
          staffing and automation plan.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href="/login">
            Start demo audit
          </a>
          <a className="btn btn-secondary" href="/audit">
            Open Peak Air Co workspace
          </a>
        </div>
        <div className="grid-3">
          <div className="feature">
            <strong>1. Sign in</strong>
            Use the demo owner account—no signup wall.
          </div>
          <div className="feature">
            <strong>2. Classify tasks</strong>
            Keep / Automate / Outsource only. No deferred bucket.
          </div>
          <div className="feature">
            <strong>3. Export the plan</strong>
            Live counts, print/PDF, and markdown download.
          </div>
        </div>
      </div>
      <p className="footer-note">
        Seeded demo: Peak Air Co · Office Manager · 10 recurring tasks
      </p>
    </div>
  );
}
