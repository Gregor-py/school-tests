import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from '../../task/model/task.model';

export class AddTaskDto {
  @ApiProperty()
  newTask: TaskModel;
}
