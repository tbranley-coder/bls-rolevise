export const DEMO_EMAIL = "owner@rolevise.demo";
export const DEMO_PASSWORD = "demo1234";
export const SESSION_KEY = "rolevise-session";

export type Session = {
  email: string;
  loggedInAt: string;
};

export function login(
  email: string,
  password: string
): { ok: true; session: Session } | { ok: false; error: string } {
  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return {
      ok: false,
      error: "Invalid demo credentials. Use owner@rolevise.demo / demo1234.",
    };
  }
  const session: Session = {
    email: DEMO_EMAIL,
    loggedInAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    document.cookie = SESSION_KEY + "=1; path=/; SameSite=Lax";
  }
  return { ok: true, session };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  document.cookie = SESSION_KEY + "=; path=/; max-age=0";
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}
