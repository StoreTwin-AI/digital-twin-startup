import { SESSION_KEY } from "./constants";
import type { District, StartupInput, TrialSession } from "./types";

function safeParse(raw: string): Partial<TrialSession> | null {
  try {
    return JSON.parse(raw) as Partial<TrialSession>;
  } catch (error) {
    console.error("[TrialSpace] sessionStorage JSON parse failed:", error);
    return null;
  }
}

export function saveDistrict(district: District): void {
  if (typeof window === "undefined") return;
  try {
    const existing = readSession();
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ ...existing, district }),
    );
  } catch (error) {
    console.error("[TrialSpace] saveDistrict failed:", error);
  }
}

export function saveInput(input: StartupInput): void {
  if (typeof window === "undefined") return;
  try {
    const existing = readSession();
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ ...existing, input }),
    );
  } catch (error) {
    console.error("[TrialSpace] saveInput failed:", error);
  }
}

export function saveSession(session: TrialSession): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("[TrialSpace] saveSession failed:", error);
  }
}

export function readSession(): Partial<TrialSession> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return {};
    return safeParse(raw) ?? {};
  } catch (error) {
    console.error("[TrialSpace] readSession failed:", error);
    return {};
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("[TrialSpace] clearSession failed:", error);
  }
}
