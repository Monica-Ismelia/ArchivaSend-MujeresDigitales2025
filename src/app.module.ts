import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module'; // si ya existe

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '54321',
      database: 'archivasend',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
