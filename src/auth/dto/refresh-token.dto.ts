import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({
    message: 'Ви не передали токен',
  })
  readonly refreshToken: string;
}
