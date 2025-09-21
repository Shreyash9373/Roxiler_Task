import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  async createOrUpdate(storeId: string, userId: string, dto: CreateRatingDto) {
    let rating = await this.ratingRepo.findOne({
      where: { store: { id: storeId }, user: { id: userId } },
      relations: ['store', 'user'],
    });
    if (rating && dto.value === null) {
      return this.ratingRepo.remove(rating);
    }

    if (rating) {
      rating.score = dto.value;
    } else {
      rating = this.ratingRepo.create({
        score: dto.value,
        store: { id: storeId },
        user: { id: userId },
      });
    }

    return this.ratingRepo.save(rating);
  }
  async findRatingsForOwner(ownerId: string) {
    return this.ratingRepo.find({
      where: { store: { owner: { id: ownerId } } },
      relations: ['user', 'store'],
      select: {
        id: true,
        score: true,
        user: { id: true, name: true, email: true },
        store: { id: true, name: true },
      },
    });
  }
}
