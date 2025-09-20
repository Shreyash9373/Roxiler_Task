// src/stores/stores.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  /**
   * Create new store
   */
  async createStore(dto: CreateStoreDto): Promise<Store> {
    const existing = await this.storeRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Store with this email already exists');
    }

    const store = this.storeRepository.create(dto);
    return await this.storeRepository.save(store);
  }

  /**
   * Get all stores with average ratings
   */
  async findAll(filters: {
    name?: string;
    email?: string;
    address?: string;
  }): Promise<any[]> {
    const qb = this.storeRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.ratings', 'rating');

    if (filters.name) {
      qb.andWhere('store.name ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.email) {
      qb.andWhere('store.email ILIKE :email', { email: `%${filters.email}%` });
    }
    if (filters.address) {
      qb.andWhere('store.address ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }

    const stores = await qb.getMany();

    // ✅ calculate average rating
    return stores.map((s) => {
      const avg =
        s.ratings && s.ratings.length > 0
          ? s.ratings.reduce((sum, r) => sum + r.score, 0) / s.ratings.length
          : 0;
      return {
        id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        averageRating: avg,
      };
    });
  }
}
