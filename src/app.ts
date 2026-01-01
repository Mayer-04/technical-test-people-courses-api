import express from "express";
import { pinoHttp } from "pino-http";
import { courseRoutes } from "./modules/courses/course.routes.js";
import { peopleRoutes } from "./modules/people/people.routes.js";
import { logger } from "./shared/logger.js";
import { errorHandler } from "./shared/middlewares/error.handler.js";

const app = express();

app.disable("x-powered-by");

app.use(pinoHttp({ logger }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
  });
});

app.use("/personas", peopleRoutes);
app.use("/cursos", courseRoutes);

app.use(errorHandler);

export default app;
