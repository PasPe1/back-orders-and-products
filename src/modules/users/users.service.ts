import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { saltRounds } from '../auth/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id });
  }

  async getAllUsers() {
    return await this.usersRepository.query(`SELECT * FROM USERS`);
  }

  async createUser(dto: UserDto) {
    if (await this.usersRepository.findOneBy({ email: dto.email })) {
      throw new ConflictException('User already exist');
    }

    const hash = await bcrypt.hash(dto.password, saltRounds);

    dto.password = hash;

    return await this.usersRepository.save(dto);
  }

  async updateUser(id: number, props: UserDto) {
    return await this.usersRepository.save(props);
  }

  async deleteUser(id: number) {
    return await this.usersRepository.delete(id);
  }
}
