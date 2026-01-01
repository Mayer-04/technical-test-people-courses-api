# API REST - Personas y Cursos

API REST desarrollada como prueba técnica para gestionar personas y cursos. Construida con Node.js, TypeScript, Express 5 y MongoDB.

## Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Tipado estático
- **Express 5** - Framework web
- **MongoDB + Mongoose** - Base de datos NoSQL
- **Pino** - Logger de alto rendimiento
- **Biome** - Linter y formatter
- **Vitest** - Testing
- **pnpm** - Gestor de paquetes

## Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- Node.js (v22 o superior)
- pnpm
- MongoDB (local o en la nube con MongoDB Atlas)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Mayer-04/technical-test-people-courses-api.git
```

1. Instala las dependencias:

```bash
pnpm install
```

1. Copia el archivo de variables de entorno y configúralo:

```bash
cp .env.example .env
```

1. Edita el archivo `.env` con tus valores:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/tu_base_de_datos

# Entorno y logs
NODE_ENV=development
LOG_LEVEL=info
```

> [!IMPORTANT]
> `MONGO_URI` es obligatoria. La aplicación no iniciará si no está definida o está vacía.

> Si usas MongoDB Atlas, coloca la URI de conexión que te proporciona el servicio.

## Ejecutar la aplicación

### Modo desarrollo

```bash
pnpm dev
```

La API estará disponible en `http://localhost:8000`

### Modo producción

```bash
pnpm build
pnpm start
```

## Endpoints

### Health Check

| Método | Ruta      | Descripción              |
| ------ | --------- | ------------------------ |
| GET    | `/health` | Verifica el estado de la API |

### Personas

| Método | Ruta                          | Descripción                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/personas`                   | Obtener todas las personas           |
| POST   | `/personas`                   | Crear una nueva persona              |
| GET    | `/personas/:id`               | Obtener una persona por ID           |
| PUT    | `/personas/:id`               | Actualizar datos de una persona      |
| GET    | `/personas/por-cedula/:cedula`| Buscar persona por cédula            |

#### Ejemplo de body para crear/actualizar persona

```json
{
  "nombre": "Mayer Andres",
  "cedula": "1234567890",
  "email": "mayer@email.com",
  "curso": "ObjectId del curso"
}
```

### Cursos

| Método | Ruta      | Descripción              |
| ------ | --------- | ------------------------ |
| GET    | `/cursos` | Obtener todos los cursos |
| POST   | `/cursos` | Crear un nuevo curso     |

#### Ejemplo de body para crear curso

```json
{
  "nombre": "Introducción a Node.js",
  "codigo": "NODE-001",
  "descripcion": "Curso introductorio de Node.js"
}
```

## Scripts disponibles

| Script          | Descripción                              |
| --------------- | ---------------------------------------- |
| `pnpm dev`      | Inicia el servidor en modo desarrollo   |
| `pnpm build`    | Compila el proyecto a JavaScript         |
| `pnpm start`    | Ejecuta el proyecto compilado           |
| `pnpm test`     | Ejecuta los tests                        |
| `pnpm coverage` | Ejecuta tests con reporte de cobertura  |
| `pnpm lint`     | Analiza el código con Biome             |
| `pnpm format`   | Formatea el código con Biome            |
| `pnpm check`    | Verifica linting y formato              |
| `pnpm check:fix`| Corrige problemas de linting y formato  |

## Estructura del proyecto

```bash
src/
├── app.ts                 # Configuración de Express
├── server.ts              # Punto de entrada de la aplicación
├── modules/
│   ├── courses/           # Módulo de cursos
│   │   ├── course.controller.ts
│   │   ├── course.model.ts
│   │   ├── course.routes.ts
│   │   └── course.service.ts
│   └── people/            # Módulo de personas
│       ├── people.controller.ts
│       ├── people.model.ts
│       ├── people.routes.ts
│       └── people.service.ts
└── shared/                # Código compartido
    ├── config.ts          # Variables de entorno
    ├── database.ts        # Conexión a MongoDB
    ├── errors.ts          # Manejo de errores
    └── middlewares/
        └── error.handler.ts
```

## Testing

Para ejecutar los tests:

```bash
pnpm test
```

Para ver el reporte de cobertura:

```bash
pnpm coverage
```

## Autor

**Mayer Andrés Chaves Prada**

---

Desarrollado como parte de una prueba técnica.
