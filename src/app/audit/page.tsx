"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../lib/auth";
import { seed, CLASSIFICATIONS_KEY, LABELS, Classification } from "../../lib/seed";

type MapT = Record<string, Classification>;

export default function AuditPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [map, setMap] = useState<MapT>({});

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    const initial: MapT = {};
    for (const t of seed.tasks) initial[t.id] = t.suggested;
    try {
      const raw = localStorage.getItem(CLASSIFICATIONS_KEY);
      if (raw) Object.assign(initial, JSON.parse(raw));
    } catch {}
    setMap(initial);
    setReady(true);
  }, [router]);

  function setClass(id: string, value: Classification) {
    setMap((prev) => {
      const next = { ...prev, [id]: value };
      localStorage.setItem(CLASSIFICATIONS_KEY, JSON.stringify(next));
      return next;
    });
  }

  const counts = useMemo(() => {
    const c = { keep: 0, automate: 0, outsource: 0 };
    for (const t of seed.tasks) {
      const v = map[t.id] || t.suggested;
      c[v] += 1;
    }
    return c;
  }, [map]);

  if (!ready) return <div className="wrap"><p className="muted">Loading audit…</p></div>;

  return (
    <div className="wrap" style={{ paddingTop: 32 }}>
      <p className="muted">{seed.company} · {seed.role}</p>
      <h1>Role audit</h1>
      <p className="muted">Classify every task. No deferred / ghost option.</p>
      <div className="card summary">
        <div className="stat"><strong>{counts.keep}</strong><span className="muted">Keep</span></div>
        <div className="stat"><strong>{counts.automate}</strong><span className="muted">Automate</span></div>
        <div className="stat"><strong>{counts.outsource}</strong><span className="muted">Outsource</span></div>
        <Link className="btn" href="/audit/summary">View summary</Link>
      </div>
      {seed.tasks.map((t) => {
        const value = map[t.id] || t.suggested;
        return (
          <article key={t.id} className="card">
            <h3 style={{ marginTop: 0 }}>{t.title}</h3>
            <p className="muted">{t.description}</p>
            <p className="muted" style={{ fontSize: 13 }}>{t.frequency} · {t.hours_per_week}h/wk · suggested {LABELS[t.suggested]}</p>
            <div className="row">
              {(["keep","automate","outsource"] as Classification[]).map((opt) => (
                <button key={opt} type="button" className={"class-btn" + (value === opt ? " active" : "")} onClick={() => setClass(t.id, opt)}>{LABELS[opt]}</button>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
