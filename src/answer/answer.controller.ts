import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Creator } from '../test/decorators/creator.decorator';
import { AnswerService } from './answer.service';
import { ChangeAnswerTextDto } from './dto/change-answer-text.dto';

@ApiTags('answers')
@Controller('answers')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Auth()
  @Creator('answer')
  @Put('/:answerId')
  changeText(
    @Param('answerId', IdValidationPipe) answerId: Types.ObjectId,
    @Body() changeAnswerTextDto: ChangeAnswerTextDto,
  ) {
    return this.answerService.changeAnswerText(answerId, changeAnswerTextDto.newAnswerText);
  }

  @Auth()
  @Creator('answer')
  @Get('/:answerId')
  getAnswer(@Param('answerId', IdValidationPipe) answerId: Types.ObjectId) {
    return this.answerService.getAnswerById(answerId);
  }
}
