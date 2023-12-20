import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('one/:idUser')
  findOneUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.findOneUser(idUser);
  }

  @Put('update/:idUser')
  updateUser(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(idUser, updateUserDto);
  }

  @Delete('delete/:idUser')
  deleteUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.removeUser(idUser);
  }
}
