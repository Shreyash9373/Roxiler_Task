// users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, Length, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 16)
  password: string;

  @IsNotEmpty()
  @Length(1, 400)
  address: string;

  @IsIn(['USER', 'ADMIN', 'STORE_OWNER'])
  role: string;
}
