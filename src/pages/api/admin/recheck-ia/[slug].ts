export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ params, url }) => {
  const id = params.slug;

  if (!id) {
    return Response.redirect(new URL("/admin", url), 302);
  }

  const apps = await getCollection("apps");
  const app = apps.find(a => a.id === id);

  if (!app) {
    return Response.redirect(new URL("/admin", url), 302);
  }

  // Recompute IA compliance from current data
  const manifest = !!app.data.manifest;
  const serviceWorker = !!app.data.serviceWorker;
  const offline = app.data.offline === true;
  const installable = app.data.installable === true;

  let iaStatus: "instant-app" | "partial" | "web-only";

  if (manifest && serviceWorker && offline) {
    iaStatus = "instant-app";
  } else if (manifest || serviceWorker) {
    iaStatus = "partial";
  } else {
    iaStatus = "web-only";
  }

  // Update JSON file
  const filePath = path.join(
    process.cwd(),
    "src/content/apps",
    `${id}.json`
  );

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  data.iaCompliance = {
    status: iaStatus,
    manifest,
    serviceWorker,
    offline,
    installable,
    checkedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

  return Response.redirect(
    new URL(`/admin/${id}`, url),
    302
  );
};
