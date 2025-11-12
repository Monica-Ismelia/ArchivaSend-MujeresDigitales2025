import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashed_password',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mocked_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('$2a$salt' as any);
    jest.spyOn(bcrypt, 'hash').mockImplementation(async (plain: string) => 'hashed_' + plain);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async (plain: string, hashed: string) => {
      return hashed === 'hashed_' + plain || (hashed === 'hashed_password' && plain === 'validpass');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('registra un nuevo usuario con contraseña hasheada', async () => {
      const dto: RegisterDto = { name: 'New', email: 'new@example.com', password: 'Secret123!' };
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockImplementation((u) => ({ ...u, id: 'u1' }));
      (userRepository.save as jest.Mock).mockImplementation(async (u) => u);

      const result = await service.register(dto);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({
        id: 'u1',
        name: 'New',
        email: 'new@example.com',
        role: 'user',
      }));
      expect((result as any).password).toBeUndefined();
    });

    it('rechaza si el correo ya existe', async () => {
      const dto: RegisterDto = { name: 'Dup', email: 'test@example.com', password: 'Secret123!' };
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.register(dto)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('login', () => {
    function mockQueryBuilderReturn(user: User | null) {
      const qb: any = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(user),
      };
      (userRepository.createQueryBuilder as jest.Mock).mockReturnValue(qb);
      return qb;
    }

    it('login exitoso devuelve token', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'validpass' };
      mockQueryBuilderReturn(mockUser);

      const res = await service.login(dto);

      expect(userRepository.createQueryBuilder).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalledWith(expect.objectContaining({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      }));
      expect(res).toEqual({ access_token: 'mocked_token' });
    });

    it('falla si el correo no existe', async () => {
      const dto: LoginDto = { email: 'noexist@example.com', password: 'whatever' };
      mockQueryBuilderReturn(null);

      await expect(service.login(dto)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('falla si la contraseña es incorrecta', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'wrongpass' };
      mockQueryBuilderReturn(mockUser);

      await expect(service.login(dto)).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
