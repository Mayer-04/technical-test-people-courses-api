import mongoose from "mongoose";

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

      console.log("MongoDB connection established");
    } catch (error) {
      console.error("MongoDB initial connection error");
      throw error;
    }
  }

  private registerEvents(): void {
    const connection = mongoose.connection;

    connection.on("connecting", () => {
      console.log("MongoDB connecting...");
    });

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("open", () => {
      console.log("MongoDB connection opened");
    });

    connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    connection.on("disconnecting", () => {
      console.log("MongoDB disconnecting...");
    });

    connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    connection.on("close", () => {
      console.log("MongoDB connection closed");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export { MongoConnection };
