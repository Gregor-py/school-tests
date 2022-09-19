import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../../user/model/user.model';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from '../../task/model/task.model';
import { AnswerModel } from '../../answer/model/answer.model';

export class CreatorAnswerGuard implements CanActivate {
  constructor(private reflector: Reflector, @InjectModel(AnswerModel) private answerModel: ModelType<AnswerModel>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ user: UserModel; params: { answerId: Types.ObjectId } }>();
    const taskId = request.params.answerId;
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Ви не зареєстровані');
    }

    const changingAnswer = await this.answerModel.findById(taskId).lean().exec();
    if (!changingAnswer) {
      throw new BadRequestException('Такой відповіді не існує');
    }

    const isUserOwner = String(changingAnswer.owner) === String(user._id);

    if (!isUserOwner) {
      throw new ForbiddenException('Ви не можете редагувати цю відповідь, адже ви не власник тесту.');
    }

    return isUserOwner;
  }
}
