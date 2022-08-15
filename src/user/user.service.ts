import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './model/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';
import { CustomizeUserDto } from './dto/customize-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async getAll() {
    return this.userModel.find();
  }

  async getById(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async customizeUser(id: Types.ObjectId, customizeUserDto: CustomizeUserDto) {
    return this.userModel.findByIdAndUpdate(id, customizeUserDto);
  }

  // TODO create change password and gmail functionality
}
