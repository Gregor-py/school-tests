import { applyDecorators, UseGuards } from '@nestjs/common';
import { CreatorGuard } from '../guards/creator.guard';

export const Creator = () => applyDecorators(UseGuards(CreatorGuard));
