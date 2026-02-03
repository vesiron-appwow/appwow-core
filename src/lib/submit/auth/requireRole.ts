import type { Role } from "./roles";
import { roleRank } from "./roles.ts";
import { getSession } from "./session.ts";


export function requireRole(request: Request, minRole: Role): boolean {
  const session = getSession(request);
  if (!session) return false;
  return roleRank[session.role] >= roleRank[minRole];
}
