import { IsString } from 'class-validator';

export class ChangeQuestionDto {
  @IsString({ message: 'Має бути рядковий тип' })
  newQuestion: string;
}
