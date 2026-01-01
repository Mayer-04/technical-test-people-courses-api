import type { Request, Response } from "express";
import type { CourseService } from "./course.service.js";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  findAll = async (_req: Request, res: Response) => {
    const courses = await this.courseService.findAll();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const course = await this.courseService.create(data);
    return res.status(201).json({
      success: true,
      data: course,
    });
  };
}
