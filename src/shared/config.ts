import { readFileSync } from "node:fs";
import { env, loadEnvFile } from "node:process";

if (readFileSync(".env")) {
  loadEnvFile();
}

const { PORT, MONGO_URI, NODE_ENV, LOG_LEVEL } = env;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

const ENV_VARS = {
  port: Number(PORT) ?? 8000,
  mongoUri: MONGO_URI,
  nodeEnv: NODE_ENV || "development",
  logLevel: LOG_LEVEL || "info",
};

export { ENV_VARS };
