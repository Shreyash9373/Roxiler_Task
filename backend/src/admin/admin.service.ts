import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>,
    @InjectRepository(Rating) private readonly ratingRepo: Repository<Rating>,
  ) {}

  async getStats() {
    const totalUsers = await this.userRepo.count();
    const totalStores = await this.storeRepo.count();
    const totalRatings = await this.ratingRepo.count();

    return {
      totalUsers,
      totalStores,
      totalRatings,
    };
  }
}
