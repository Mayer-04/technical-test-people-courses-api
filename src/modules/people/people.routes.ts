import { Router } from "express";
import { PeopleController } from "./people.controller.js";
import { People } from "./people.model.js";
import { PeopleService } from "./people.service.js";

const peopleRoutes = Router();

const peopleService = new PeopleService(People);
const peopleController = new PeopleController(peopleService);

// Lista de personas
peopleRoutes.get("/", peopleController.getAll);

// Crear una persona
peopleRoutes.post("/", peopleController.create);

// Devolver una persona por id
peopleRoutes.get("/:id", peopleController.getById);

// Actualizar los datos de una persona
peopleRoutes.put("/:id", peopleController.update);

// Lógica especial
peopleRoutes.get("/por-cedula/:cedula", peopleController.getColombianID);

export { peopleRoutes };
