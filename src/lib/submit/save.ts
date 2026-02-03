/**
 * Phase 3 stub implementation.
 *
 * Submission persistence is intentionally disabled for
 * Cloudflare Pages deployment.
 *
 * This file preserves the API contract so that
 * persistence can be re-enabled in Phase 4
 * (KV / D1 / R2) without touching callers.
 */

export async function saveSubmission(_data: unknown) {
  // Intentionally no filesystem access.
  // This keeps the Worker environment compatible.

  console.log("AppWow submission received (Phase 3 stub)");

  return {
    ok: true,
    id: crypto.randomUUID(),
  };
}
