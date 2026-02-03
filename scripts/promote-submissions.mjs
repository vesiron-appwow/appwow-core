import fs from "node:fs";
import path from "node:path";

const [,, filename, slug, role] = process.argv;

if (!filename || !slug || !role) {
  console.log("Usage: node scripts/promote-submission.mjs <submission-file> <slug> <role>");
  process.exit(1);
}

if (!["reviewer", "admin"].includes(role)) {
  console.log("Forbidden: reviewer or admin role required.");
  process.exit(1);
}

const submissionsDir = path.resolve("src/data/submissions");
const appsFile = path.resolve("src/data/apps.json");

const submissionPath = path.join(submissionsDir, filename);

if (!fs.existsSync(submissionPath)) {
  console.log("Submission file not found.");
  process.exit(1);
}

const submission = JSON.parse(fs.readFileSync(submissionPath, "utf-8"));
const apps = JSON.parse(fs.readFileSync(appsFile, "utf-8"));

apps.push({
  slug,
  name: submission.name,
  description: submission.description,
  category: "utilities",
  icon: "/icons/default.png",
  url: submission.url,
  status: "approved",
  featured: false
});

fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2));
fs.unlinkSync(submissionPath);

console.log(`Promoted "${submission.name}" → apps.json as "${slug}"`);
