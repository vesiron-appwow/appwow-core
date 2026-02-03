import type { APIRoute } from "astro";
import { addSubmission } from "../../lib/data/store.ts";

export const POST: APIRoute = async ({ request, locals }) => {
  const data = await request.json();

  const submission = {
    id: crypto.randomUUID(),
    name: data.name,
    description: data.description,
    category: data.category,
    launchUrl: data.launchUrl,
    developer: data.developer,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  await addSubmission(locals.env, submission);

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
};

