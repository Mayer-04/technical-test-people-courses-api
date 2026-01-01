import express from "express";
import morgan from "morgan";
import { courseRoutes } from "./modules/courses/course.routes.js";
import { peopleRoutes } from "./modules/people/people.routes.js";
import { errorHandler } from "./shared/middlewares/error.handler.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
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
