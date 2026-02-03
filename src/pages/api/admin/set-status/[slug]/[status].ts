import type { APIRoute } from "astro";
import { updateSubmissionStatus } from "../../../../lib/data/store";

export const POST: APIRoute = async ({ params, locals }) => {
  const { id, status } = params;

  if (
    status !== "approved" &&
    status !== "rejected" &&
    status !== "pending"
  ) {
    return new Response("Invalid status", { status: 400 });
  }

  const ok = await updateSubmissionStatus(
    locals.env,
    id!,
    status as any
  );

  if (!ok) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
};
