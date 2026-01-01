import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../errors.js";
import { logger } from "../logger.js";

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      status: "error",
      message: error.message ?? error,
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      status: "error",
      message: "El recurso solicitado no tiene un ID válido",
      originalValue: error.value,
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors).map((err: any) => {
      if (err.kind === "ObjectId") {
        return `El campo '${err.path}' debe ser un ID válido (hexadecimal de 24 caracteres)`;
      }

      if (err.kind === "required") {
        return `El campo '${err.path}' es obligatorio`;
      }

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

  if (error instanceof mongoose.Error.StrictModeError) {
    res.status(400).json({
      success: false,
      status: "error",
      message: `El campo '${error.path}' no está permitido en este esquema`,
    });
    return;
  }

  logger.error("Error Crítico del Sistema:", error);

  res.status(500).json({
    success: false,
    status: "error",
    message: "Error interno del servidor",
  });
};
