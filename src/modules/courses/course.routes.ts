import { Router } from "express";
import { CourseController } from "./course.controller.js";
import { Course } from "./course.model.js";
import { CourseService } from "./course.service.js";

const courseRoutes = Router();

const courseService = new CourseService(Course);
const courseController = new CourseController(courseService);

courseRoutes.get("/", courseController.findAll);
courseRoutes.post("/", courseController.create);

export { courseRoutes };
