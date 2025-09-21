import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { User } from 'src/users/entities/user.entity';
import { RatingsService } from 'src/ratings/ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Rating, User])],
  controllers: [StoresController],
  providers: [StoresService, RatingsService],
})
export class StoresModule {}
