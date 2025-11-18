import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { EmailsModule } from './emails/emails.module';
import { User } from './auth/entities/user.entity';
import { File } from './files/entities/file.entity';
import { Email } from './emails/entities/email.entity';

@Module({
  imports: [ // Módulos importados
    ConfigModule.forRoot({ isGlobal: true }), // Carga .env  y lo hace global

    TypeOrmModule.forRootAsync({ // Configura TypeORM de forma asíncrona
      inject: [ConfigService],// Inyecta ConfigService para acceder a las variables de entorno
      useFactory: (configService: ConfigService) => ({ 
        type: 'postgres', // Tipo de base de datos
        host: configService.get('DB_HOST', 'localhost'), // Host de la base de datos
        port: configService.get('DB_PORT', 5432), // Puerto de la base de datos
        username: configService.get('DB_USERNAME', 'postgres'), // Usuario de la base de datos
        password: configService.get('DB_PASSWORD', 'postgres'), // Contraseña de la base de datos
        database: configService.get('DB_DATABASE', 'gestor_archivos_db'), // Nombre de la base de datos
        entities: [User, File, Email], // ← todas tus entidades
        synchronize: configService.get('NODE_ENV') !== 'production', // solo en desarrollo
        logging: false,
      }),
    }),

    AuthModule,
    FilesModule,
    EmailsModule,
  ],
})
export class AppModule {}
