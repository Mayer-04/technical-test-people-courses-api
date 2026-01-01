import type { Model } from "mongoose";
import { ConflictError } from "../../shared/errors.js";
import type { CourseType } from "./course.model.js";

interface CreateCourse {
  nombre: string;
  codigo: string;
  descripcion?: string;
}

export class CourseService {
  constructor(private readonly courseModel: Model<CourseType>) {}

  async findAll(): Promise<CourseType[]> {
    return await this.courseModel.find().lean();
  }

  async create(data: CreateCourse): Promise<CourseType> {
    try {
      const newCourse = await this.courseModel.create(data);
      return newCourse.toObject();
    } catch (error: any) {
      if (error.code === 11000) {
        if (error.keyPattern.codigo) {
          throw new ConflictError("El código del curso ya está registrado.");
        }
      }
      throw error;
    }
  }
}
