import type { Role } from "./roles";

export type Session = {
  email: string;
  role: Role;
};

const COOKIE = "appwow_session";

export function getSession(request: Request): Session | null {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${COOKIE}=([^;]+)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  return {
    "Set-Cookie": `${COOKIE}=${encodeURIComponent(
      JSON.stringify(session)
    )}; Path=/; HttpOnly; SameSite=Lax`
  };
}

export function clearSession() {
  return {
    "Set-Cookie": `${COOKIE}=; Path=/; Max-Age=0`
  };
}
