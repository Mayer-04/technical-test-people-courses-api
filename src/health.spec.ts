import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("Health Check Endpoint", () => {
  it("GET /health should return success status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("timestamp");
  });
});
