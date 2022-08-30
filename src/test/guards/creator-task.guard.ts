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
import { TestModel } from '../model/test.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from '../../task/model/task.model';

export class CreatorTaskGuard implements CanActivate {
  constructor(private reflector: Reflector, @InjectModel(TaskModel) private taskModel: ModelType<TaskModel>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ user: UserModel; params: { taskId: Types.ObjectId } }>();
    const taskId = request.params.taskId;
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Ви не зареєстровані');
    }

    const changingTask = await this.taskModel.findById(taskId).lean().exec();
    if (!changingTask) {
      throw new BadRequestException('Такого завдання не існує');
    }

    const isUserOwner = String(changingTask.owner) === String(user._id);

    if (!isUserOwner) {
      throw new ForbiddenException('Ви не можете редагувати це завдання, адже ви не власник тесту.');
    }

    return isUserOwner;
  }
}
