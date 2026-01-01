import type { Model } from "mongoose";
import { ConflictError, NotFoundError } from "../../shared/errors.js";
import type { PeopleType } from "./people.model.js";

export interface CreatePerson {
  nombre: string;
  cedula: string;
  email?: string;
  curso: string;
}

export class PeopleService {
  constructor(private readonly peopleModel: Model<PeopleType>) {}

  async findAll(): Promise<PeopleType[]> {
    return this.peopleModel.find().lean();
  }

  async create(data: CreatePerson): Promise<PeopleType> {
    try {
      const newPerson = await this.peopleModel.create(data);
      return newPerson.toObject();
    } catch (error: any) {
      if (error.code === 11000) {
        if (error.keyPattern.cedula) {
          throw new ConflictError("La cédula ya está registrada en el sistema");
        }
        if (error.keyPattern.email) {
          throw new ConflictError("El correo electrónico ya está en uso");
        }
      }
      throw error;
    }
  }

  async findById(id: string): Promise<PeopleType> {
    const person = await this.peopleModel.findById(id).lean();

    if (!person) {
      throw new NotFoundError("No existe una persona con ese ID");
    }

    return person;
  }

  async update(id: string, data: Partial<CreatePerson>): Promise<PeopleType> {
    const updatedPerson = await this.peopleModel.findByIdAndUpdate(id, data, {
      new: true,
      lean: true,
      runValidators: true,
    });

    if (!updatedPerson) {
      throw new NotFoundError("La persona con ese ID no existe para actualizar");
    }

    return updatedPerson;
  }

  async getColombianID(cedula: string) {
    const colombianID = await this.peopleModel
      .findOne({ cedula: cedula })
      .populate({
        path: "curso",
        select: "nombre codigo descripcion",
      })
      .lean()
      .exec();

    if (!colombianID) {
      throw new NotFoundError("La persona no existe");
    }

    return colombianID;
  }
}
