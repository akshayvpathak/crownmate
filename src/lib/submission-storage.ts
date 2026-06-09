import { promises as fs } from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");

interface Submission {
  type: string;
  data: Record<string, unknown>;
  createdAt: string;
}

async function readSubmissions(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

export async function saveSubmission(
  type: string,
  data: Record<string, unknown>,
): Promise<void> {
  const submissions = await readSubmissions();
  submissions.unshift({ type, data, createdAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  await fs.writeFile(
    SUBMISSIONS_FILE,
    JSON.stringify(submissions.slice(0, 1000), null, 2),
  );
}
