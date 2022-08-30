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

export class CreatorGuard implements CanActivate {
  constructor(private reflector: Reflector, @InjectModel(TestModel) private testModel: ModelType<TestModel>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ user: UserModel; params: { testId: Types.ObjectId } }>();
    const testId = request.params.testId;
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Ви не зареєстровані');
    }

    const changingTest = await this.testModel.findById(testId).lean().exec();
    if (!changingTest) {
      throw new BadRequestException('Такого теста не існує');
    }

    const isUserOwner = String(changingTest.owner) === String(user._id);

    if (!isUserOwner) {
      throw new ForbiddenException('Ви не можете редагувати цей тест, адже ви не власник тесту.');
    }

    return isUserOwner;
  }
}
