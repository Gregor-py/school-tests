import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Creator } from '../test/decorators/creator.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ChangeQuestionDto } from './dto/change-question.dto';
import { TaskService } from './task.service';
import { ChangeTaskTypeDto } from './dto/change-task-type.dto';
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Auth()
  @Get('/:taskId')
  getById(@Param('taskId', IdValidationPipe) taskId) {
    return this.taskService.getById(taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/question/:taskId')
  changeQuestion(@Param('taskId', IdValidationPipe) taskId, @Body() changeQuestionDto: ChangeQuestionDto) {
    return this.taskService.changeQuestion(changeQuestionDto.newQuestion, taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/type/:taskId')
  changeTaskType(@Param('taskId', IdValidationPipe) taskId, @Body() changeTaskTypeDto: ChangeTaskTypeDto) {
    return this.taskService.changeTaskType(changeTaskTypeDto.newTaskType, taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/correct-answer/:taskId')
  changeCorrectAnswer(
    @Param('taskId', IdValidationPipe) taskId,
    @Body() changeCorrectAnswerDto: ChangeCorrectAnswerDto,
  ) {
    return this.taskService.changeCorrectAnswer(taskId, changeCorrectAnswerDto);
  }
}
