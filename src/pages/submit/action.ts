import type { APIRoute } from "astro";
import { validate } from "../../lib/submit/validate";
import { saveSubmission } from "../../lib/submit/save";
import { getSession } from "../../lib/submit/auth/session.ts";

export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const session = getSession(request);

  const allowed =
    (session && (session.role === "developer" || session.role === "reviewer" || session.role === "admin")) ||
    key === "ALPHA";

  if (!allowed) {
    return new Response("Forbidden", { status: 403 });
  }

  const formData = await request.formData();

  const data: Record<string, string> = {
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    url: String(formData.get("url") || "")
  };

  if (!validate(data)) {
    return new Response("Invalid submission", { status: 400 });
  }

  saveSubmission(data);

  return Response.redirect("/submit/thanks", 302);
};
