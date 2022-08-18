import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CustomizeTestDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  @ApiProperty()
  readonly title?: string;

  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  @ApiProperty()
  readonly description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Має бути числом' })
  @Min(1, { message: 'Мінімальне значення - 1' })
  @Max(11, { message: 'Максимальне значення - 11' })
  @ApiProperty()
  readonly class?: number;
}
