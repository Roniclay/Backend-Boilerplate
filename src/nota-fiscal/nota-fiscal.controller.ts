import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { NotaFiscalService } from './nota-fiscal.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Controller('nota-fiscal')
export class NotaFiscalController {
  constructor(private readonly notaFiscalService: NotaFiscalService) {}

  @Post('create')
  createNotaFiscal(@Body() createNotaFiscalDto: CreateNotaFiscalDto) {
    return this.notaFiscalService.createNotaFiscal(createNotaFiscalDto);
  }

  @Get('all')
  findAllNotaFiscal() {
    return this.notaFiscalService.findAllNotaFiscal();
  }

  @Get('one/:id')
  findOneNotaFiscal(@Param('idNotaFiscal') idNotaFiscal: number) {
    return this.notaFiscalService.findOneNotaFiscal(idNotaFiscal);
  }

  @Put('update/:idNotaFiscal')
  updateNotaFiscal(
    @Param('idNotaFiscal') idNotaFiscal: number,
    @Body() updateNotaFiscalDto: UpdateNotaFiscalDto,
  ) {
    return this.notaFiscalService.updateNotaFiscal(
      idNotaFiscal,
      updateNotaFiscalDto,
    );
  }

  @Delete('delete/:idNotaFiscal')
  removeNotaFiscal(@Param('idNotaFiscal') idNotaFiscal: number) {
    return this.notaFiscalService.removeNotaFiscal(idNotaFiscal);
  }
}
