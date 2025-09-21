import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    } as DeepPartial<User>);

    return this.usersRepository.save(user);
  }

  async findAll(filters: {
    name?: string;
    email?: string;
    address?: string;
    role?: string;
  }): Promise<User[]> {
    const qb = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.stores', 'store')
      .leftJoinAndSelect('user.ratings', 'rating');
    if (filters.name) {
      qb.andWhere('user.name ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.email) {
      qb.andWhere('user.email ILIKE :email', { email: `%${filters.email}%` });
    }
    if (filters.address) {
      qb.andWhere('user.address ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }
    if (filters.role) {
      qb.andWhere('user.role = :role', { role: filters.role });
    }

    const users = await qb.getMany();

    return users.map((u) => {
      if (u.role === 'STORE_OWNER' && u.stores?.length) {
        const allRatings = u.stores.flatMap((s) => s.ratings ?? []);
        const avg =
          allRatings.length > 0
            ? allRatings.reduce((sum, r) => sum + r.score, 0) /
              allRatings.length
            : 0;
        return { ...u, averageRating: avg };
      }
      return u;
    });
  }
  async getAllOwners() {
    return this.usersRepository.find({
      where: { role: UserRole.STORE_OWNER },
      select: ['id', 'name'],
    });
  }
}
