import { Controller, Get } from '@nestjs/common';
import { Creator } from '../test/decorators/creator.decorator';

@Controller('tasks')
export class TaskController {}
