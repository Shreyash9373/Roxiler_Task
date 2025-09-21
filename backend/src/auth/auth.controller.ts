import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RequestWithUser } from './types/request-with-user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and set JWT token in cookies' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return { message: 'Login successful', user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current logged-in user' })
  async getMe(@Req() req: any) {
    return req.user;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and clear JWT cookie' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update-password')
  async updatePassword(
    @Req() req: RequestWithUser,
    @Body() dto: UpdatePasswordDto,
  ) {
    try {
      return this.authService.updatePassword(req.user.userId, dto);
    } catch (error) {
      console.error(error);
    }
  }
}
