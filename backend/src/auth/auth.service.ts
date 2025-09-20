import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, email, password, address, role } = registerDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    return await this.usersRepository.save(user);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, user };
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new ForbiddenException('User not found');

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid)
      throw new ForbiddenException('Old password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.usersRepository.save(user);

    return { message: 'Password updated successfully' };
  }
}
