// src/auth/auth.controller.ts
import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthExceptionFilter } from './auth-exception.filter';
import { SuccessResponseDto, ErrorResponseDto } from './dto/error-response.dto';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<SuccessResponseDto> {
    const { username, password } = loginDto;
    return this.authService.login(username, password);
  }
}
