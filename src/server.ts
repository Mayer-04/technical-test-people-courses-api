import app from "./app.js";
import { ENV_VARS } from "./shared/config.js";
import { connectDB } from "./shared/database.js";
import { logger } from "./shared/logger.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV_VARS.port, () => {
      logger.info(`Server running on port ${ENV_VARS.port}`);
    });
  } catch (error) {
    logger.error(error, "Failed to start server");
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  logger.error(err, "Critical: Unhandled rejection");
});
