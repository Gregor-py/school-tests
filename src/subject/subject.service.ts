import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SubjectModel } from './model/subject.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Types } from 'mongoose';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(SubjectModel) private subjectModel: ModelType<SubjectModel>) {}

  async getAll(searchTerm = '') {
    const options = {
      $or: [{ slug: new RegExp(searchTerm, 'i') }, { name: new RegExp(searchTerm, 'i') }],
    };

    return this.subjectModel.find(options).select('-updatedAt -__v').sort({ createdAt: 'desc' }).exec();
  }

  async getById(id: Types.ObjectId) {
    const subject = await this.subjectModel.findById(id);

    if (!subject) {
      throw new BadRequestException('Такий предмету не існує');
    }

    return subject;
  }

  async getBySlug(slug: string) {
    const subject = await this.subjectModel.findOne({ slug });

    if (!subject) {
      throw new BadRequestException('Такий предмету не існує');
    }

    return subject;
  }

  async create() {
    const commonSubject = {
      name: 'Новий предмет',
      slug: String(Number(new Date())),
    };

    const createdSubject = await this.subjectModel.create(commonSubject);

    return createdSubject._id;
  }

  async update(id: Types.ObjectId, updateSubjectDto: UpdateSubjectDto) {
    if (updateSubjectDto.slug) {
      const existSubject = await this.subjectModel.findOne({ slug: updateSubjectDto.slug });

      if (existSubject) {
        throw new BadRequestException('Такий предмет вже існує');
      }
    }

    return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true });
  }
}
