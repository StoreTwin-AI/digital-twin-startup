import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const lockPath = join(process.cwd(), ".next", "dev", "lock");

if (existsSync(lockPath)) {
  rmSync(lockPath, { force: true });
  console.log("Removed stale .next/dev/lock");
} else {
  console.log("No dev lock file found");
}
