import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { SubjectService } from './subject.service';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Auth('admin')
  @Get()
  getAll(@Query('searchTerm') searchTerm?: string) {
    return this.subjectService.getAll(searchTerm);
  }

  @Auth('admin')
  @Get('/:id')
  getById(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.subjectService.getById(id);
  }

  @Auth('admin')
  @Get('/by-slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.subjectService.getBySlug(slug);
  }

  @Auth('admin')
  @Post('/')
  create() {
    return this.subjectService.create();
  }

  @Auth('admin')
  @Put('/:id')
  update(@Param('id', IdValidationPipe) id: Types.ObjectId, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }
}
