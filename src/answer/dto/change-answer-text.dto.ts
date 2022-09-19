import { IsString, Length } from 'class-validator';

export class ChangeAnswerTextDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @Length(1, undefined, { message: 'Мінімум один символ' })
  newAnswerText: string;
}
