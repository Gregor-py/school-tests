import { applyDecorators, UseGuards } from '@nestjs/common';
import { CreatorTestGuard } from '../guards/creator-test.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreatorTaskGuard } from '../guards/creator-task.guard';
import { CreatorAnswerGuard } from '../guards/creator-answer.guard';

export const Creator = (type: 'test' | 'task' | 'answer') =>
  applyDecorators(
    type === 'test'
      ? UseGuards(JwtAuthGuard, CreatorTestGuard)
      : type === 'answer'
      ? UseGuards(JwtAuthGuard, CreatorAnswerGuard)
      : type === 'task'
      ? UseGuards(JwtAuthGuard, CreatorTaskGuard)
      : null,
  );
