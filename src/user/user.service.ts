import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './model/user.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';
import { CustomizeUserDto } from './dto/customize-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async getAll(searchTerm = '', userClass?: number, region = ''): Promise<DocumentType<UserModel>[]> {
    const options: { $or: any[]; $and: any[] } = {
      $or: [
        { name: new RegExp(searchTerm, 'i') },
        { secondName: new RegExp(searchTerm, 'i') },
        { email: new RegExp(searchTerm, 'i') },
      ],
      $and: [{ region: new RegExp(region, 'i') }],
    };

    if (userClass) {
      options.$and.push({ class: userClass });
    }

    return this.userModel.find(options).select('-password -updatedAt -__v').sort({ createdAt: 'desc' }).exec();
  }

  async getById(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async customize(id: Types.ObjectId, customizeUserDto: CustomizeUserDto) {
    return this.userModel.findByIdAndUpdate(id, customizeUserDto, { new: true });
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const candidate = await this.getByEmail(changePasswordDto.email);

    const isValidPassword = await compare(changePasswordDto.currentPassword, candidate.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Неправильні пошта або пароль');
    }

    const salt = await genSalt(10);
    candidate.password = await hash(changePasswordDto.newPassword, salt);
    return candidate.save();
  }

  async toggleFavorite(user: UserModel, subjectId: Types.ObjectId) {
    const { favoriteSubjects, _id } = user;

    await this.userModel.findByIdAndUpdate(_id, {
      favoriteSubjects: favoriteSubjects.includes(subjectId)
        ? favoriteSubjects.filter((id) => String(id) !== String(subjectId))
        : [...favoriteSubjects, subjectId],
    });
  }

  async getFavoriteSubjects(id: Types.ObjectId) {
    return this.userModel
      .findById(id, 'favoriteSubjects')
      .populate({
        path: 'favoriteSubjects',
      })
      .exec()
      .then((data) => {
        return data.favoriteSubjects;
      });
  }

  async addToStartedTests(startedTest: Types.ObjectId, userId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Такого користувача неіснує');
    }

    if (!user.startedTests) {
      user.startedTests = [];
    }
    user.startedTests.push(startedTest);
    await user.save();

    return startedTest;
  }
}
