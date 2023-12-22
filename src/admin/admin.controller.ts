import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @IsPublic()
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  // Fazer endpoint findAll
  // Fazer endpoint findOne

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.removeAdmin(id);
  }
}
