import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';
import { TypeRole } from '../guards/auth.interface';

export const Auth = (role: TypeRole = 'user') =>
  applyDecorators(role === 'admin' ? UseGuards(JwtAuthGuard, AdminGuard) : UseGuards(JwtAuthGuard));
