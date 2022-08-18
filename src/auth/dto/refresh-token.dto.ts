import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty()
  @IsString({
    message: 'Ви не передали токен',
  })
  readonly refreshToken: string;
}
