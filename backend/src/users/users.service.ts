import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user (Admin or Normal user)
   */
  async createUser(dto: CreateUserDto): Promise<User> {
    // check if email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // ✅ Explicitly tell TS this is DeepPartial<User>
    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    } as DeepPartial<User>);

    return this.usersRepository.save(user);
  }

  /**
   * Find all users with optional filters
   */
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

    // ✅ add average rating if role = STORE_OWNER
    return users.map((u) => {
      if (u.role === 'STORE_OWNER' && u.stores?.length) {
        // compute average rating across all owned stores
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
}
