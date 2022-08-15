import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(createUserDto.email);

    if (candidate) {
      throw new BadRequestException('Користувач з такою поштою вже існує');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(createUserDto.password, salt);
    const user = await this.userService.create({ ...createUserDto, password: hashedPassword });

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: user,
      ...tokens,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: user,
      ...tokens,
    };
  }

  async getNewTokens(refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Треба зареєструватися');
    }
    const result = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken);
    if (!result) {
      throw new UnauthorizedException('Треба зареєструватися');
    }
    const user = await this.userService.getById(result._id);
    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: user,
      ...tokens,
    };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Неправильні пошта або пароль');
    }

    const isValidPassword = await compare(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Неправильні пошта або пароль');
    }

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}
