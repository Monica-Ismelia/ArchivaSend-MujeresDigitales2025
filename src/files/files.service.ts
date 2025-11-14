import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from 'src/auth/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async upload(file: Express.Multer.File, user: User) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    const newFile = this.fileRepository.create({
      filename: file.originalname,
      url: `/uploads/${file.originalname}`,
      user,
    });

    return await this.fileRepository.save(newFile);
  }

  async findAll(userId: number, page = 1, limit = 10) {
    const [data, total] = await this.fileRepository.findAndCount({
      where: { user: { id: userId } as any },
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      total,
      page,
      lastPage: Math.ceil(total / limit),
      data,
    };
  }
}
