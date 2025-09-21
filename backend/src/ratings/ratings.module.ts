import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store, Rating])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
