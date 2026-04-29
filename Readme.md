🌟 ArchivaSend – Gestor de Archivos y Envío de Correos

Grupo 4 – SENA Mujeres Digitales 2025
“Automatiza. Organiza. Conecta.”

📘 Descripción del Proyecto

ArchivaSend es una API creada en NestJS que permite a usuarios autenticados subir archivos, listarlos con paginación, y enviarlos por correo electrónico como adjuntos, además de almacenar historial.

El proyecto fue construido de forma colaborativa por el Grupo 4 como parte del programa Mujeres Digitales 2025.

## 👩‍💻 Roles del Equipo /  Integrantes 🧑‍🤝‍🧑

| Integrante             | Rol Principal                     | Entregables / Responsabilidades                                                                 |
|------------------------|-----------------------------------|--------------------------------------------------------------------------------------------------|
| Angélica Grajales      | Autenticación y Gestión de Usuarios | Módulo Auth, registro/login, JWT, AuthGuard, roles (`user`/`admin`), pruebas unitarias           |
| Yesica Sierra          | Base de datos y Entidades         | Modelado en PostgreSQL, entidades `User` y `File`, relaciones con TypeORM                        |
| Carolina Tovio         | Gestión de Archivos               | Subida con Multer, paginación (`/files?page=1&limit=10`), endpoints seguros, pruebas             |
| Evelin Moreno          | Envío de Correos                 | Integración con Resend, envío de adjuntos, historial en BD, manejo de errores                    |
| Yeimi Silva            | Documentación                     | Swagger, decoradores en endpoints,  capturas de evidencia.                            |
| Mónica Ismelia Cañas Reyes | Integración + README            | Estructura base del proyecto, coordinación SCRUM, despliegue en Render, `README.md`    |
Todo el Grupo 4	Despliegue	Despliegue en Render, verificación en producción

 
🛠️ Tecnologías Usadas
Categoría	Tecnología
Framework	NestJS
Base de datos	PostgreSQL
ORM	TypeORM
Autenticación	JWT + Passport
Validaciones	class-validator / class-transformer
Archivos	Multer
Correos	Resend
Documentación	Swagger
Deploy	Render
Gestión	Trello
Versionamiento	GitHub
🚀 Instalación y Ejecución
1️⃣ Instalar dependencias
npm install

2️⃣ Configurar archivo .env
JWT_SECRET=tu_clave_secreta_jwt
RESEND_API_KEY=tu_clave_de_resend

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=gestor_archivos_db

3️⃣ Crear la base de datos

Puedes usar el script:

database.sql


O manualmente:

CREATE DATABASE gestor_archivos_db;

4️⃣ Iniciar servidor
npm run start:dev

5️⃣ Documentación Swagger

👉 http://localhost:3000/api

🔐 Endpoints de Autenticación
Método	Ruta	Descripción
POST	/auth/register	Registrar usuario
POST	/auth/login	Iniciar sesión
Ejemplo de registro
{
  "name": "Mónica",
  "email": "monica@test.com",
  "password": "123456",
  "sector": "comercio"
}

Ejemplo de login
{
  "email": "monica@test.com",
  "password": "123456"
}


Todos los endpoints protegidos requieren:
Authorization: Bearer <token>

📁 Endpoints de Archivos
Método	Ruta	Descripción
POST	/files/upload	Subir archivo (form-data → file)
GET	/files?page=1&limit=10	Listar archivos del usuario con paginación
✉️ Endpoints de Correos
Método	Ruta	Descripción
POST	/mail/send	Enviar archivo por correo
Ejemplo
{
  "to": "destino@test.com",
  "fileId": "uuid-del-archivo"
}

🧪 Pruebas Unitarias
Servicio	Estado
AuthService	✅ Aprobado
FilesService	✅ Aprobado
EmailsService	✅ Aprobado

Ejecutar pruebas:

npm run test

📸 Evidencias

Las evidencias están en:

📁 /evidencias/

Incluyen:
*********

Registro y login

Subida de archivos

Paginación

Envío de correos

Swagger

Pruebas unitarias

☁️ Despliegue
Servicio	URL
API Base	https://archivasend-mujeresdigitales2025.onrender.com

Swagger	https://archivasend-mujeresdigitales2025.onrender.com/api