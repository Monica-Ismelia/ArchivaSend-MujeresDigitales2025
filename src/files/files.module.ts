import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { File } from './entities/file.entity';
import { User } from 'src/auth/entities/user.entity'; // <-- IMPORTA EL USER

@Module({
  imports: [TypeOrmModule.forFeature([File, User])], // <-- AGREGA EL USER AQUÍ
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
