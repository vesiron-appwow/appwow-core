export type Role = "public" | "developer" | "reviewer" | "admin";

export const roleRank: Record<Role, number> = {
  public: 0,
  developer: 1,
  reviewer: 2,
  admin: 3
};
