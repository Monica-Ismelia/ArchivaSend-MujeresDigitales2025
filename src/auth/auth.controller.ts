import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'; // Importa los decoradores y utilidades necesarias de NestJS
import { AuthService } from './auth.service'; // Importa el servicio de autenticación
import { RegisterDto } from './dto/register.dto'; // Importa el DTO de registro
import { LoginDto } from './dto/login.dto'; // Importa el DTO de inicio de sesión
import { ApiBody, ApiOperation } from '@nestjs/swagger'; // Importa los decoradores de Swagger para la documentación de la API

@Controller('auth') // Define el controlador con la ruta base 'auth'
export class AuthController { // Define la clase AuthController
  constructor(private readonly authService: AuthService) {} // Inyecta el servicio de autenticación

  @Post('register') // Define la ruta POST /auth/register
  @ApiBody({ type: RegisterDto }) // para mostrar el esquema en Swagger
  @ApiOperation({ summary: 'Registro de un nuevo usuario' })// Documenta la operación en Swagger
  @UsePipes(new ValidationPipe({ whitelist: true })) // Usa el pipe de validación con la opción whitelist
  register(@Body() dto: RegisterDto) { // Método para manejar el registro de usuarios
    return this.authService.register(dto); // Llama al método register del servicio de autenticación
  } // Cierra el método register

  @Post('login') // Define la ruta POST /auth/login
  @ApiBody({ type: LoginDto }) // para mostrar el esquema en Swagger
  @ApiOperation({ summary: 'Inicio de sesión de un usuario' }) // Documenta la operación en Swagger
  @UsePipes(new ValidationPipe({ whitelist: true })) // Usa el pipe de validación con la opción whitelist
  login(@Body() dto: LoginDto) { // Método para manejar el inicio de sesión de usuarios
    return this.authService.login(dto); // Llama al método login del servicio de autenticación
  } // Cierra el método login
}
