"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_EMAIL, DEMO_PASSWORD, isLoggedIn, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/audit");
    } else {
      setReady(true);
    }
  }, [router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/audit");
  }

  if (!ready) {
    return (
      <div className="login-wrap">
        <p>Checking session…</p>
      </div>
    );
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <span className="eyebrow">Demo login</span>
        <h1 style={{ fontSize: "1.75rem" }}>Sign in to Rolevise</h1>
        <p className="lede" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Use the seeded owner account to open the Peak Air Co audit.
        </p>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error ? <div className="error">{error}</div> : null}
          <div style={{ marginTop: "1.25rem" }}>
            <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
              Sign in
            </button>
          </div>
        </form>
        <p className="hint">
          Demo credentials: {DEMO_EMAIL} / {DEMO_PASSWORD}
        </p>
      </div>
    </div>
  );
}
