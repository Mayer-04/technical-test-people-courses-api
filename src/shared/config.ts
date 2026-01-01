import { readFileSync } from "node:fs";
import { env, loadEnvFile } from "node:process";

if (readFileSync(".env")) {
  loadEnvFile();
}

const { PORT, MONGO_URI } = env;

export { PORT, MONGO_URI };
