import {
  Body,
  Controller,
  // Get,
  Post,
  // UseGuards,
  // Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// import { AuthGuard } from './auth.guard';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() signUpDto: UserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  signIn(@Body() signInDto: AuthDto) {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('logout')
  logout(@Body() logoutDto: UserDto) {
    return this.authService.logout(logoutDto.id);
  }

  // @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
