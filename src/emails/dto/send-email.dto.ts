import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    name: 'to',
    required: true,
    type: String,
    description: 'Correo electrónico del destinatario.',
    example: 'usuario@correo.com',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    name: 'fileId',
    required: true,
    type: String,
    description: 'ID del archivo previamente subido que será enviado como adjunto.',
    example: 'a3f1e1d3-9b2c-4c28-85af-f0a8f3e1a4b2',
  })
  @IsNotEmpty()
  @IsUUID()
  fileId: string;
}