// src/main.ts
import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// ✅ Crea la carpeta uploads si no existe
//const uploadDir = path.join(__dirname, '..', 'uploads');
//if (!fs.existsSync(uploadDir)) {
 // fs.mkdirSync(uploadDir, { recursive: true });
//}

async function bootstrap() { // Función asíncrona para iniciar la aplicación
  const app = await NestFactory.create(AppModule); // Crea una instancia de la aplicación NestJS con el módulo raíz AppModule

  const config = new DocumentBuilder() // Configura la documentación de Swagger
    .setTitle('ArchivaSend - Gestor de Archivos y Correo') // Título de la API
    .setDescription('API backend con NestJS') // Descripción de la API
    .setVersion('1.0') // Versión de la API 
    .addBearerAuth(  // ← Esto activa el sistema de autorización en Swagger
      {
        type: 'http', // Tipo de autorización HTTP
        scheme: 'bearer', // Esquema Bearer
        bearerFormat: 'JWT', // Formato del token
        name: 'JWT', // Nombre del encabezado
        description: 'Ingresa tu token JWT', // Descripción para el usuario
        in: 'header', // Lugar donde se envía el token
      },
      'access-token', // ← debe coincidir con lo que uses en @ApiBearerAuth()
    )
    .build(); // Construye la configuración

  const document = SwaggerModule.createDocument(app, config); // Crea el documento Swagger basado en la configuración
  SwaggerModule.setup('api', app, document); // Configura el endpoint /api para la documentación Swagger

  const port = process.env.PORT || 3000; // Puerto en el que la aplicación escuchará
  await app.listen(port); // Inicia la aplicación y escucha en el puerto especificado
}
bootstrap();