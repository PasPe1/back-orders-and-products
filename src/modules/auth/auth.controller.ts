import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Register')
  register(@Body() registerDto: UserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  logout(@Body() logoutDto: UserDto) {
    return this.authService.logout(logoutDto.id);
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
