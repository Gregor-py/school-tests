import { IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly slug?: string;
}
