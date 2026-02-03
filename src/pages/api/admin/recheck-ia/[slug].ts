import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Admin API disabled in Pages build"
    }),
    { status: 503 }
  );
};
