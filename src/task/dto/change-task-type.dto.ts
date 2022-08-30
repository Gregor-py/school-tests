import { IsString } from 'class-validator';

export class ChangeTaskTypeDto {
  @IsString({ message: 'Має бути рядковий тип' })
  newTaskType: string;
}
