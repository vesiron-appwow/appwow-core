// src/lib/data/store.ts
// Resolver neutraliser.
// Exists solely to stop Vite/Astro resolving a phantom or stale module.
// No business logic allowed in this file.

export type SubmissionStatus = "draft" | "review" | "approved" | "rejected";

export type Submission = {
  slug: string;
  status: SubmissionStatus;
};

export const __storeShim = true;
