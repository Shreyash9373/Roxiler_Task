import { IsNotEmpty, Length, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must include 1 uppercase letter and 1 special character',
  })
  newPassword: string;
}
