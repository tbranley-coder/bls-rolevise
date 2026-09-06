"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../../lib/auth";
import { seed, CLASSIFICATIONS_KEY, LABELS, Classification } from "../../../lib/seed";

type MapT = Record<string, Classification>;

export default function SummaryPage() {
  const router = useRouter();
  const [map, setMap] = useState<MapT>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    const initial: MapT = {};
    for (const t of seed.tasks) initial[t.id] = t.suggested;
    try { const raw = localStorage.getItem(CLASSIFICATIONS_KEY); if (raw) Object.assign(initial, JSON.parse(raw)); } catch {}
    setMap(initial);
    setReady(true);
  }, [router]);

  const grouped = useMemo(() => {
    const g: Record<Classification, typeof seed.tasks> = { keep: [], automate: [], outsource: [] };
    for (const t of seed.tasks) g[map[t.id] || t.suggested].push(t);
    return g;
  }, [map]);

  function exportMd() {
    const lines = ["# Rolevise audit — " + seed.company + " / " + seed.role, ""];
    (Object.keys(grouped) as Classification[]).forEach((k) => {
      lines.push("## " + LABELS[k]);
      grouped[k].forEach((t) => lines.push("- " + t.title));
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "rolevise-peak-air-audit.md"; a.click();
    URL.revokeObjectURL(url);
  }

  if (!ready) return <div className="wrap"><p className="muted">Loading…</p></div>;

  return (
    <div className="wrap" style={{ paddingTop: 32 }}>
      <p className="muted">{seed.company} · {seed.role}</p>
      <h1>Audit summary</h1>
      <div className="card summary">
        <div className="stat"><strong>{grouped.keep.length}</strong><span className="muted">Keep</span></div>
        <div className="stat"><strong>{grouped.automate.length}</strong><span className="muted">Automate</span></div>
        <div className="stat"><strong>{grouped.outsource.length}</strong><span className="muted">Outsource</span></div>
      </div>
      {(Object.keys(grouped) as Classification[]).map((k) => (
        <section key={k} className="card">
          <h2><span className={"pill " + k}>{LABELS[k]}</span></h2>
          <ul>{grouped[k].map((t) => <li key={t.id}>{t.title}</li>)}</ul>
        </section>
      ))}
      <div className="card">
        <h2>Starter automation stubs</h2>
        <ol>
          <li>Appointment reminder texts 24h before service</li>
          <li>Invoice create + send after job close</li>
          <li>CRM / whiteboard job-status sync after each visit</li>
        </ol>
      </div>
      <div className="card">
        <h2>Unlock full report — $99</h2>
        <p className="muted">Mock checkout for this working-version dry-run.</p>
        <button className="btn" type="button" onClick={() => alert("Mock Stripe checkout — $99 (dry-run)")}>Pay $99 (mock)</button>
      </div>
      <div className="row">
        <button className="btn secondary" type="button" onClick={exportMd}>Export markdown</button>
        <button className="btn secondary" type="button" onClick={() => window.print()}>Print / PDF</button>
        <Link className="btn" href="/audit">Back to tasks</Link>
      </div>
    </div>
  );
}
