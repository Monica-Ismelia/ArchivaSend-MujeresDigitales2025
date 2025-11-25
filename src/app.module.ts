import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    // Variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // 🟢 Si usamos Render / Railway
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: false, // nunca en prod
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        // 🟡 Localhost
        return {
          type: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: +configService.get('DB_PORT', 5432),
          username: configService.get('DB_USERNAME', 'postgres'),
          password: configService.get('DB_PASSWORD', 'postgres'),
          database: configService.get('DB_DATABASE', 'gestor_archivos_db'),
          autoLoadEntities: true,
          synchronize: true, // SOLO local
        };
      },
    }),

    AuthModule,
    FilesModule,
    EmailsModule,
  ],
})
export class AppModule {}
