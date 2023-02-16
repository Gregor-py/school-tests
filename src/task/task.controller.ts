import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { Auth } from '../auth/decorators/auth.decorator'
import { IdValidationPipe } from '../pipes/id.validation.pipe'
import { Creator } from '../test/decorators/creator.decorator'
import { User } from '../user/decorators/user.decorator'
import { UserModel } from '../user/model/user.model'
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto'
import { ChangeQuestionDto } from './dto/change-question.dto'
import { TaskService } from './task.service'

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Auth()
  @Get('/:taskId')
  getById(@Param('taskId', IdValidationPipe) taskId) {
    return this.taskService.getById(taskId)
  }

  @Auth()
  @Creator('task')
  @Put('/question/:taskId')
  changeQuestion(@Param('taskId', IdValidationPipe) taskId, @Body() changeQuestionDto: ChangeQuestionDto) {
    return this.taskService.changeQuestion(changeQuestionDto.newQuestion, taskId)
  }

  @Auth()
  @Creator('task')
  @Put('/correct-answer/:taskId')
  changeCorrectAnswer(
    @Param('taskId', IdValidationPipe) taskId,
    @Body() changeCorrectAnswerDto: ChangeCorrectAnswerDto,
  ) {
    return this.taskService.changeCorrectAnswer(taskId, changeCorrectAnswerDto)
  }

  @Auth()
  @Creator('task')
  @Post('/answer/:taskId')
  addAnswer(@Param('taskId', IdValidationPipe) taskId, @User() user: UserModel) {
    return this.taskService.addAnswer(taskId, user._id)
  }

  @Auth()
  @Creator('task')
  @Put('/answer/:taskId')
  deleteAnswer(@Param('taskId', IdValidationPipe) taskId, @Body('answerId') answerId: Types.ObjectId) {
    return this.taskService.deleteAnswer(answerId, taskId)
  }
}
