import { ApiProperty } from '@nestjs/swagger'; // Importa  ejemplo  para que los usuarios sepan el formato esperado
import { IsEmail, IsNotEmpty } from 'class-validator'; // Importa los validadores necesarios

export class LoginDto {// Define la clase LoginDto
  @ApiProperty({ example: 'john@test.com', description: 'Correo electrónico del usuario' }) // Proporciona un ejemplo para la documentación Swagger
  @IsEmail() // Valida que el campo sea un correo electrónico válido
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' }) // Proporciona un ejemplo para la documentación Swagger
  @IsNotEmpty() // Valida que el campo no esté vacío
  password: string;
}
