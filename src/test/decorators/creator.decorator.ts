import { applyDecorators, UseGuards } from '@nestjs/common';
import { CreatorTestGuard } from '../guards/creator-test.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreatorTaskGuard } from '../guards/creator-task.guard';

export const Creator = (type: 'test' | 'task') =>
  applyDecorators(
    type === 'test' ? UseGuards(JwtAuthGuard, CreatorTestGuard) : UseGuards(JwtAuthGuard, CreatorTaskGuard),
  );
