export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  status: SubmissionStatus;
  createdAt: string;
};

/**
 * Dummy export to force runtime module emission
 * Required for Vite / Cloudflare SSR
 */
export {};
