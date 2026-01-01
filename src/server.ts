import app from "./app.js";
import { MONGO_URI, PORT } from "./shared/config.js";
import { MongoConnection } from "./shared/database.js";

const port = Number(PORT) ?? 8000;
const mongo = MongoConnection.getInstance(MONGO_URI!);

try {
  await mongo.connect();

  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      console.log("HTTP server closed.");
      await mongo.disconnect();
      console.log("Database connection closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
} catch (error) {
  console.log("Failed to start application:", error);
  process.exit(1);
}

process.on("unhandledRejection", (err) => {
  console.error("Critical: Unhandled rejection:", err);
});
