import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Rating } from 'src/ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store, Rating])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
