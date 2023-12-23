import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Get,
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
  @IsPublic()
  @Get('all')
  findAllAdministrador() {
    return this.adminService.findAllAdministrador();
  }
  // Fazer endpoint findOne
  @IsPublic()
  @Get('one/:idAdministrador')
  findOneAdministrador(@Param('idAdministrador') idAdministrador: number) {
    return this.adminService.findByIdAdministrador(idAdministrador);
  }

  @Delete('delete/:idAdministrador')
  remove(@Param('idAdministrador', ParseIntPipe) idAdministrador: number) {
    return this.adminService.removeAdmin(idAdministrador);
  }
}
