import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<string> {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() props: UserDto) {
    return this.usersService.createUser(props);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() props: UserDto) {
    return this.usersService.updateUser(id, props);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  //   @Get(':email')
  //   async getUserByEmail(@Param('email') email: string): Promise<User> {
  //     return await this.usersService.findOneByEmail(email);
  //   }
}
