import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { StoresModule } from './stores/stores.module';
import { RatingsModule } from './ratings/ratings.module';
import { Store } from './stores/entities/store.entity';
import { Rating } from './ratings/entities/rating.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Supabase connection string
      entities: [User, Store, Rating],
      synchronize: true, // turn OFF in production
    }),
    AuthModule,
    UsersModule,
    StoresModule,
    RatingsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
