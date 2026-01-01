import { type InferSchemaType, model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    descripcion: String,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "cursos",
  },
);

type CourseType = InferSchemaType<typeof CourseSchema>;

const Course = model<CourseType>("Course", CourseSchema);

export { Course, type CourseType };
