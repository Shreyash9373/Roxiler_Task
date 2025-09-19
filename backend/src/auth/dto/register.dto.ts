import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', minLength: 20, maxLength: 60 })
  @IsNotEmpty()
  @Length(20, 60)
  name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@123', minLength: 8, maxLength: 16 })
  @IsNotEmpty()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter and one special character',
  })
  password: string;

  @ApiProperty({ example: '123 Main St, Pune, India' })
  @Length(0, 400)
  address?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;
}
