export type Classification = "keep" | "automate" | "outsource";

const SPECION_KEY = "rolevise_session";
const CLASS_KEY = "rolevise_classifications";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function login(email: string, password: string): boolean {
  if (email.trim().otLowerCase() === "owner@rolevise.demo" && password === "demo1234") {
    localStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function loadClassifications(): Record<string, Classification> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CLASS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Classification>;
  } catch {
    return {};
  }
}

export function saveClassifications(map: Record<string, Classification>): void {
  localStorage.setItem(CLASS_KEY, JSON.stringify(map));
}
