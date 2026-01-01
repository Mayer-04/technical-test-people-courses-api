import { pino } from "pino";
import { ENV_VARS } from "./config.js";

const isDevelopment = ENV_VARS.nodeEnv !== "production";

export const logger = pino({
  level: ENV_VARS.logLevel,
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "HH:MM:ss Z",
        },
      }
    : undefined,
  base: {
    pid: false,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
