// src/stores/stores.controller.ts
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

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
}
