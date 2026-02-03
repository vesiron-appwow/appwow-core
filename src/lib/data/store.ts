export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  name: string;
  description: string;
  category: string;
  launchUrl: string;
  developer: string;
  status: SubmissionStatus;
  createdAt: string;
};

const KEY = "submissions";

export async function getSubmissions(env: any): Promise<Submission[]> {
  const raw = await env.APPWOW_DATA.get(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveSubmissions(
  env: any,
  submissions: Submission[]
) {
  await env.APPWOW_DATA.put(KEY, JSON.stringify(submissions));
}

export async function addSubmission(
  env: any,
  submission: Submission
) {
  const submissions = await getSubmissions(env);
  submissions.push(submission);
  await saveSubmissions(env, submissions);
}

export async function updateSubmissionStatus(
  env: any,
  id: string,
  status: SubmissionStatus
) {
  const submissions = await getSubmissions(env);
  const item = submissions.find(s => s.id === id);
  if (!item) return false;
  item.status = status;
  await saveSubmissions(env, submissions);
  return true;
}
