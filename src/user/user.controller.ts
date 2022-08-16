import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UserModel } from './model/user.model';
import { CustomizeUserDto } from './dto/customize-user.dto';
import { UserService } from './user.service';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Put('/customize')
  customize(@User() user: UserModel, @Body() customizeUserDto: CustomizeUserDto) {
    return this.userService.customize(user._id, customizeUserDto);
  }

  @Put('/change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(changePasswordDto);
  }

  @Auth('admin')
  @Get('/:id')
  getById(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.userService.getById(id);
  }

  @Auth('admin')
  @Put('/:id')
  update(@Param('id', IdValidationPipe) id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Auth('admin')
  @Get()
  getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('class') userClass?: number,
    @Query('region') region?: string,
  ) {
    return this.userService.getAll(searchTerm, userClass, region);
  }

  // todo favorites
}
