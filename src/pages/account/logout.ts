import type { APIRoute } from "astro";
import { clearSession } from "../../lib/auth/session.ts";



export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      ...clearSession(),
      Location: "/"
    }
  });
};
