import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("src/data/submissions");

if (!fs.existsSync(dir)) {
  console.log("No submissions directory found.");
  process.exit(0);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

if (!files.length) {
  console.log("No submissions found.");
  process.exit(0);
}

console.log("\nPENDING SUBMISSIONS:\n");

files.forEach((file, index) => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
  console.log(`${index + 1}. ${data.name}`);
  console.log(`   URL: ${data.url}`);
  console.log(`   Submitted: ${data.submittedAt}`);
  console.log(`   Status: ${data.status}`);
  console.log("");
});
