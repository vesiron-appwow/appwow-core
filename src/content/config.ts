import { defineCollection, z } from "astro:content";

const apps = defineCollection({
  type: "data", // IMPORTANT: data = JSON, not Markdown
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(["approved", "review", "rejected", "delisted"]),
    featured: z.boolean().optional(),
    developer: z.string(),
    version: z.string(),
    updatedAt: z.string(),
    capabilities: z.array(z.string()).optional(),
    behaviour: z
      .object({
        requiresInternet: z.boolean().optional(),
        redirectsExternal: z.boolean().optional(),
      })
      .optional(),
    launchUrl: z.string().url(),
  }),
});

export const collections = {
  apps,
};
