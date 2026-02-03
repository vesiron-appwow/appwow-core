import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

/**
 * Helpers
 */
function norm(v: unknown): string {
  return String(v ?? "").trim();
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const POST: APIRoute = async ({ request }) => {
  // We ONLY accept JSON. Your UI already sends this correctly.
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response("Invalid submission format (expected JSON)", {
      status: 400
    });
  }

  let input: any;
  try {
    input = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const name = norm(input.name);
  const description = norm(input.description);
  const homepage = norm(input.homepage);
  const categoriesRaw = norm(input.categories);

  if (!name || !description || !homepage) {
    return new Response(
      "Missing required fields: name, description, homepage",
      { status: 400 }
    );
  }

  const slug = slugify(name);

  const categories = categoriesRaw
    ? categoriesRaw.split(",").map((c: string) => c.trim()).filter(Boolean)
    : [];

  const primaryCategory = categories[0] ?? "general";

  const manifest = !!input.manifest;
  const serviceWorker = !!input.serviceWorker;
  const offline = !!input.offline;
  const installable = !!input.installable;

  /**
   * SCHEMA-COMPLIANT DATA OBJECT
   * (matches your apps collection requirements)
   */
  const data = {
    // REQUIRED BY SCHEMA
    id: slug,
    slug,
    name,
    description,
    category: primaryCategory,
    developer: "external",
    version: "0.1.0",
    updatedAt: new Date().toISOString(),
    launchUrl: homepage,

    // APPWOW CONTROL FIELDS
    status: "review",
    featured: false,

    // IA COMPLIANCE FLAGS
    manifest,
    serviceWorker,
    offline,
    installable,

    iaSnapshot: {
      manifest,
      serviceWorker,
      offline,
      installable,
      capturedAt: new Date().toISOString()
    },

    adminNotes: "",

    categories,

    links: {
      homepage,
      install: homepage
    }
  };

  const filePath = path.join(
    process.cwd(),
    "src/content/apps",
    `${slug}.json`
  );

  if (fs.existsSync(filePath)) {
    return new Response("App already exists", { status: 409 });
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    return new Response("Failed to write submission file", { status: 500 });
  }

  return new Response(
    JSON.stringify({ ok: true, slug }),
    { headers: { "Content-Type": "application/json" } }
  );
};
