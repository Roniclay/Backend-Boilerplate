import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @IsPublic()
  @Post('create')
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicoService.createMedico(createMedicoDto);
  }

  @IsPublic()
  @Get('all')
  findAllAdministrador() {
    return this.medicoService.findAllMedico();
  }
  // Fazer endpoint findOne
  @IsPublic()
  @Get('one/:idMedico')
  findOneAdministrador(@Param('idMedico') idMedico: number) {
    return this.medicoService.findByIdMedico(idMedico);
  }

  @Delete('delete/:idMedico')
  remove(@Param('idMedico') idMedico: number) {
    return this.medicoService.removeMedico(idMedico);
  }
}
