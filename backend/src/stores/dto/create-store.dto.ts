// src/stores/dto/create-store.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 400)
  address: string;
}
