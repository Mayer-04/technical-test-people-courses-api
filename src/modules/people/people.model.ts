import { type InferSchemaType, model, Schema, type Types } from "mongoose";

const peopleSchema = new Schema(
  {
    nombre: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    curso: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "personas",
  },
);

type PeopleType = InferSchemaType<typeof peopleSchema> & {
  _id: Types.ObjectId;
};

const People = model<PeopleType>("People", peopleSchema);

export { People, type PeopleType };
