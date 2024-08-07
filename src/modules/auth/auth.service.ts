import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, saltRounds } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: UserDto): Promise<Tokens> {
    if (await this.usersRepository.findOneBy({ email: dto.email })) {
      throw new ConflictException('User already exist');
    }

    const hash = await this.getPasswordHash(dto.password);

    dto.password = hash;

    const user = await this.usersRepository.save(dto);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return { id: user.id, ...tokens };
  }

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.usersService.findOneByEmail(email);
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return { id: user.id, ...tokens };
  }

  private async getPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  async logout(userId: number): Promise<boolean> {
    await this.usersRepository.update(
      {
        id: userId,
      },
      { refreshToken: null },
    );
    return true;
  }

  async refreshToken(rt: string): Promise<Tokens> {
    const { userId } = this.jwtService.decode(rt);
    const user = await this.usersService.findOneById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, saltRounds);
    await this.usersRepository.update(
      {
        id: userId,
      },
      { refreshToken: hash },
    );
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      userId: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.rtsecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
