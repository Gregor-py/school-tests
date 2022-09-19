import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { Creator } from '../test/decorators/creator.decorator';
import { ChangeAnswerTextDto } from './dto/change-answer-text.dto';
import { Types } from 'mongoose';
import { User } from '../user/decorators/user.decorator';
import { UserModel } from '../user/model/user.model';

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
}
