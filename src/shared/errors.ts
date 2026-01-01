const HttpStatus = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
} as const;

class HttpError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends HttpError {
  constructor(message: string = "Petición incorrecta") {
    super(message, HttpStatus.badRequest);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string = "No autorizado") {
    super(message, HttpStatus.unauthorized);
  }
}

class ForbiddenError extends HttpError {
  constructor(message: string = "Acceso prohibido") {
    super(message, HttpStatus.forbidden);
  }
}

class NotFoundError extends HttpError {
  constructor(message: string = "Recurso no encontrado") {
    super(message, HttpStatus.notFound);
  }
}

class ConflictError extends HttpError {
  constructor(message: string = "Conflicto con el estado actual") {
    super(message, HttpStatus.conflict);
  }
}

class InternalServerError extends HttpError {
  constructor(message: string = "Error interno del servidor") {
    super(message, HttpStatus.internalServerError);
  }
}

export {
  HttpStatus,
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
