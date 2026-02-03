import type { APIRoute } from "astro";
import { saveSubmission } from "../../lib/submit/save.ts";

/**
 * Phase 3 submission endpoint.
 *
 * Accepts submission data and acknowledges receipt.
 * Persistence is stubbed intentionally for
 * Cloudflare Pages compatibility.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    await saveSubmission(data);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid submission" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

