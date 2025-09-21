import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RatingsService } from 'src/ratings/ratings.service';
import { CreateRatingDto } from 'src/ratings/dto/create-rating.dto';
import { UpdateRatingDto } from 'src/ratings/dto/update-rating.dto';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly ratingsService: RatingsService,
  ) {}

  @Post()
  createStore(@Body() dto: CreateStoreDto) {
    return this.storesService.createStore(dto);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
  ) {
    return this.storesService.findAll({ name, email, address });
  }

  @Get('with-ratings')
  async getStores(
    @Query('name') name?: string,
    @Query('address') address?: string,
    @Req() req?: any,
  ) {
    const userId = req.user.userId;
    return this.storesService.findAllWithRatings({ name, address }, userId);
  }

  @Post(':id/rate')
  async rateStore(
    @Param('id') storeId: string,
    @Body() dto: CreateRatingDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.ratingsService.createOrUpdate(storeId, userId, dto);
  }

  @Patch(':id/rate')
  async updateRating(
    @Param('id') storeId: string,
    @Body() dto: UpdateRatingDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return this.ratingsService.createOrUpdate(storeId, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-store-average')
  async getMyStoreAverage(@Req() req: any) {
    const ownerId = req.user.userId;
    return this.storesService.getOwnerStoreAverage(ownerId);
  }
}
