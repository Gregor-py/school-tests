import { IsString, Length } from 'class-validator';

export class ChangeQuestionDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @Length(1, undefined, { message: 'Мінімум один символ' })
  newQuestion: string;
}
