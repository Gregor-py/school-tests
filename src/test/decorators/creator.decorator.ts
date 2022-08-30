import { applyDecorators, UseGuards } from '@nestjs/common';
import { CreatorGuard } from '../guards/creator.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

export const Creator = () => applyDecorators(UseGuards(JwtAuthGuard, CreatorGuard));
