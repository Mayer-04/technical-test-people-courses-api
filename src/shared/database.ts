import mongoose from "mongoose";
import { ENV_VARS } from "./config.js";
import { logger } from "./logger.js";

class MongoConnection {
  private static instance: MongoConnection;
  private readonly uri: string;

  private constructor(uri: string) {
    this.uri = uri;
    this.registerEvents();
  }

  static getInstance(uri: string): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection(uri);
    }
    return MongoConnection.instance;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      });

      logger.info("MongoDB connection established");
    } catch (error) {
      logger.error("MongoDB initial connection error");
      throw error;
    }
  }

  private registerEvents(): void {
    const connection = mongoose.connection;

    connection.on("connecting", () => {
      logger.info("MongoDB connecting...");
    });

    connection.on("connected", () => {
      logger.info("Mongoose connected to DB");
    });

    connection.on("open", () => {
      logger.info("MongoDB connection opened");
    });

    connection.on("reconnected", () => {
      logger.info("MongoDB reconnected");
    });

    connection.on("disconnecting", () => {
      logger.info("MongoDB disconnecting...");
    });

    connection.on("disconnected", () => {
      logger.warn("Mongoose disconnected");
    });

    connection.on("close", () => {
      logger.info("MongoDB connection closed");
    });

    connection.on("error", (error) => {
      logger.error("MongoDB connection error:", error);
    });
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

const connectDB = async () => {
  const mongo = MongoConnection.getInstance(ENV_VARS.mongoUri);
  await mongo.connect();
};

export { MongoConnection, connectDB };
