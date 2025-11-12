# 📁 ArchivaSend – Gestor de Archivos y Correo

**Grupo 4 – SENA Mujeres Digitales 2025**  
API backend desarrollada en **NestJS** que permite a los usuarios autenticarse, subir archivos, listarlos con **paginación** y enviarlos por **correo electrónico como adjuntos**.

---

## 🎯 Descripción del proyecto

Esta API responde al enfoque temático asignado: **Gestor de archivos y correo con paginación**.  
Fue construida íntegramente durante las **6 sesiones de 3 horas** del curso, aplicando buenas prácticas de desarrollo backend, arquitectura modular, seguridad y trabajo colaborativo ágil (SCRUM).

El objetivo es ofrecer una solución técnica robusta, documentada y lista para producción, sin necesidad de interfaz frontend.

---

## 👩‍💻 Roles de cada integrante

| N.° | Integrante | Rol principal | Entregable clave |
|-----|------------|----------------|------------------|
| 1 | **Angélica** | Autenticación + Gestión de Usuarios | Módulo `Auth` con registro/login, JWT, `AuthGuard`, roles (`user`/`admin`) y pruebas unitarias |
| 2 | **Yesica** | Base de datos + Entidades + Relaciones | Configuración de TypeORM + PostgreSQL, entidades `User` y `File` con relaciones (`@ManyToOne`, `@OneToMany`), validaciones y migraciones |
| 3 | **Carolina** | Gestión de Archivos (subida + listado paginado) | `POST /files/upload` con Multer, `GET /files?page=1&limit=10` con paginación, acceso restringido al dueño, pruebas del servicio |
| 4 | **Eve** | Envío de Correos (con adjuntos) | Integración con **Resend**, endpoint `POST /mail/send`, manejo de errores (archivo no existe, email inválido), pruebas del servicio |
| 5 | **Yeimi** | Documentación + Swagger + README | Decoradores de Swagger en todos los endpoints, este archivo README, capturas de Postman/Swagger, ejemplos de uso |
| 6 | **Mónica** | Despliegue + Integración | Estructura base del proyecto, coordinación de dailys y Trello, despliegue en **Railway**, verificación de funcionamiento en producción |

---

## 🛠️ Tecnologías y herramientas a  utilizadar

- **Framework**: [NestJS](https://nestjs.com/)
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT + Passport
- **Validaciones**: `class-validator` + `class-transformer`
- **Subida de archivos**: Multer
- **Envío de correos**: Resend
- **Documentación**: Swagger
- **Gestión ágil**: Trello (tablero compartido con docente)
- **Despliegue**: Railway
- **Control de versiones**: GitHub

---

## 📥 Instrucciones para ejecutar la API localmente

### Requisitos previos
- Node.js (v18 o superior)
- PostgreSQL instalado y en ejecución
- Cliente de API (Postman o similar)

### Pasos

1. **Crear y Clonar el repositorio**
2. ** Instalar dependencias**
- npm install
3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con base en .env.example:
JWT_SECRET=tu_clave_secreta_jwt_2025
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=gestor_archivos_db
RESEND_API_KEY=tu_clave_de_resend

4. Crear la base de datos
CREATE DATABASE gestor_archivos_db;

5. Iniciar el servidor en modo desarrollo
npm run start:dev
6. Acceder a la documentación
Swagger: http://localhost:3000/api