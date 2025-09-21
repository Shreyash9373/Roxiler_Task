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
    try {
      const { name, email, address, ownerId } = dto;
      const existing = await this.storeRepository.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Store with this email already exists');
      }
      const store = this.storeRepository.create({
        name,
        email,
        address,
        owner: { id: ownerId },
      });

      return this.storeRepository.save(store);
    } catch (error) {
      console.log('Error creating store:', error);
      throw new BadRequestException('Failed to create store');
    }
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

  async findAllWithRatings(
    filters: { name?: string; address?: string },
    userId: string,
  ) {
    const qb = this.storeRepository
      .createQueryBuilder('store')
      .leftJoin('store.ratings', 'rating')
      .addSelect('AVG(rating.score)', 'avgRating')
      .addSelect(
        `MAX(CASE WHEN rating.userId = :userId THEN rating.score ELSE NULL END)`,
        'userRating',
      )
      .setParameter('userId', userId)
      .groupBy('store.id');

    if (filters.name) {
      qb.andWhere('store.name ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.address) {
      qb.andWhere('store.address ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }

    const rawStores = await qb.getRawMany();

    return rawStores.map((row) => ({
      id: row.store_id,
      name: row.store_name,
      address: row.store_address,
      averageRating: parseFloat(row.avgRating).toFixed(1),
      userRating: row.userRating ? parseInt(row.userRating, 10) : null,
    }));
  }

  async getOwnerStoreAverage(ownerId: string) {
    const qb = this.storeRepository
      .createQueryBuilder('store')
      .leftJoin('store.ratings', 'rating')
      .select('store.id', 'id')
      .addSelect('store.name', 'name')
      .addSelect('AVG(rating.score)', 'averageRating')
      .where('store.ownerId = :ownerId', { ownerId })
      .groupBy('store.id');

    return qb.getRawMany();
  }
}
