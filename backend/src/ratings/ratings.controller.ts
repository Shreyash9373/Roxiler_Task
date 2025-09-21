import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-store-users')
  async getUsersWhoRated(@Req() req: any) {
    const ownerId = req.user.userId;
    return this.ratingsService.findRatingsForOwner(ownerId);
  }
}
