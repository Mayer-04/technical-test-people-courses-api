export const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export class HttpError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Petición incorrecta") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "No autorizado") {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Acceso prohibido") {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Recurso no encontrado") {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflicto con el estado actual") {
    super(message, HttpStatus.CONFLICT);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Error interno del servidor") {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
