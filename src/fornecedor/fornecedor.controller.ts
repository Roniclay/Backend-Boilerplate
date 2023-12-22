import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @IsPublic()
  @Post('create')
  createFornecedor(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedorService.createFornecedor(createFornecedorDto);
  }

  @IsPublic()
  @Get('all')
  findAll() {
    return this.fornecedorService.findAllFornecedores();
  }

  @IsPublic()
  @Get(':idFornecedor')
  findOne(@Param('idFornecedor') idFornecedor: number) {
    return this.fornecedorService.findByIdFornecedor(idFornecedor);
  }

  @IsPublic()
  @Put('update/:idFornecedor')
  updateFornecedor(
    @Param('idFornecedor') idFornecedor: number,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.updateFornecedor(
      idFornecedor,
      updateFornecedorDto,
    );
  }

  @IsPublic()
  @Delete('delete/:idFornecedor')
  removeFornecedor(@Param('idFornecedor') idFornecedor: number) {
    return this.fornecedorService.removeFornecedor(idFornecedor);
  }
}
