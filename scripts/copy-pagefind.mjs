import { cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

await cp(
  resolve(projectRoot, "dist/pagefind"),
  resolve(projectRoot, "public/pagefind"),
  { recursive: true }
);
