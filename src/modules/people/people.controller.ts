import type { Request, Response } from "express";
import { Types } from "mongoose";
import type { PeopleService } from "./people.service.js";

export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  getAll = async (_req: Request, res: Response) => {
    const people = await this.peopleService.findAll();
    res.status(200).json(people);
  };

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const newPerson = await this.peopleService.create(data);
    res.status(201).json(newPerson);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID proporcionado no tiene un formato válido",
      });
    }
    const person = await this.peopleService.findById(id);
    res.status(200).json(person);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID proporcionado no tiene un formato válido",
      });
    }

    const data = req.body;
    const updatedPerson = await this.peopleService.update(id, data);
    res.status(200).json(updatedPerson);
  };

  getColombianID = async (req: Request, res: Response) => {
    const { cedula } = req.params;

    if (!cedula) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el parámetro cédula",
      });
    }

    const responseData = await this.peopleService.getColombianID(cedula);
    res.status(200).json(responseData);
  };
}
