import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from '../model/task.model';

export class CreateTaskDto {
  @ApiProperty()
  newTask: TaskModel;
}
