import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../errors.js";

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  // 1. Errores HTTP Personalizados (lanzados desde tus Servicios)
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      status: "error",
      message: error.message ?? error,
    });
    return;
  }

  // 2. CastError (Top Level): ID inválido en params (GET /personas/id-invalido)
  // Ocurre cuando Mongoose intenta convertir algo que no es un ID antes de validar
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      status: "error",
      message: "El recurso solicitado no tiene un ID válido",
      originalValue: error.value,
    });
    return;
  }

  // 3. ValidationError: Fallan las reglas del Schema al Crear/Actualizar
  // AQUÍ ESTÁ LA MAGIA PARA TU PROBLEMA DEL CURSO "dsadasdad"
  if (error instanceof mongoose.Error.ValidationError) {
    // Iteramos sobre los errores para "traducirlos" si son muy técnicos
    const errorMessages = Object.values(error.errors).map((err: any) => {
      // CASO ESPECIAL: Si un campo (como 'curso') esperaba ObjectId y recibió basura string
      if (err.kind === "ObjectId") {
        return `El campo '${err.path}' debe ser un ID válido (hexadecimal de 24 caracteres)`;
      }

      // CASO ESPECIAL: Validaciones 'required'
      if (err.kind === "required") {
        return `El campo '${err.path}' es obligatorio`;
      }

      // Por defecto, devolvemos el mensaje que define Mongoose o tu Schema
      return err.message;
    });

    res.status(400).json({
      success: false,
      status: "error",
      message: "Error de validación de datos",
      errors: errorMessages,
    });
    return;
  }

  // 5. StrictModeError
  if (error instanceof mongoose.Error.StrictModeError) {
    res.status(400).json({
      success: false,
      status: "error",
      message: `El campo '${error.path}' no está permitido en este esquema`,
    });
    return;
  }

  console.error("Error Crítico del Sistema:", error);

  res.status(500).json({
    success: false,
    status: "error",
    message: "Error interno del servidor",
  });
};
