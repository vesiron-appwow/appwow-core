import fs from "node:fs";
import path from "node:path";

export function saveSubmission(data: Record<string, string>) {
  const dir = path.resolve("src/data/submissions");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = path.join(
    dir,
    `${Date.now()}-${data.name.replace(/\s+/g, "-").toLowerCase()}.json`
  );

  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        ...data,
        status: "pending",
        submittedAt: new Date().toISOString()
      },
      null,
      2
    )
  );
}
