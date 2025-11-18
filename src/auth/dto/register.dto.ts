import { ApiProperty } from '@nestjs/swagger'; // Importa  ejemplo  para que los usuarios sepan el formato esperado
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'; // Importa los validadores necesarios
import { UserSector } from '../entities/user.entity';// Importa el enum UserSector de la entidad User

export class RegisterDto { // Define la clase RegisterDto
  @ApiProperty({ example: 'John Doe',// Proporciona un ejemplo para la documentación Swagger
    description: 'Nombre completo del usuario'
   })
   @IsNotEmpty() // Valida que el campo no esté vacío
  name: string; // Define la propiedad name de tipo string

  @ApiProperty({ example: 'john@test.com', // Proporciona un ejemplo para la documentación Swagger
    description: 'Correo electrónico del usuario'
   })
  @IsEmail() // Valida que el campo sea un correo electrónico válido
  email: string;

  @ApiProperty({ example: '123456', // Proporciona un ejemplo para la documentación Swagger
    description: 'Contraseña del usuario de  al menos 6 caracteres',
   })
  @IsNotEmpty() // Valida que el campo no esté vacío
  @MinLength(6) // Valida que la contraseña tenga al menos 6 caracteres
  password: string;

  @ApiProperty({ example: 'COMERCIO', // Proporciona un ejemplo para la documentación Swagger
    enum: UserSector, //
      description: 'Sector al que pertenece el usuario COMERCIO, BANCA, EDUCACION', 
    }) // Define la propiedad sector como opcional usando el enum UserSector
  sector?: UserSector;
}
