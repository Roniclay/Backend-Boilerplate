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

import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @IsPublic()
  @Post('create')
  createEndereco(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.createEndereco(createEnderecoDto);
  }

  @IsPublic()
  @Get('all')
  findAllEnderecos() {
    return this.enderecoService.findAllEnderecos();
  }

  @IsPublic()
  @Get('one/:idEndereco')
  findOneEndereco(@Param('idEndereco') idEndereco: number) {
    return this.enderecoService.findByIdEndereco(idEndereco);
  }

  @IsPublic()
  @Put('update/:idEndereco')
  updateEndereco(
    @Param('idEndereco') idEndereco: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.enderecoService.updateEndereco(idEndereco, updateEnderecoDto);
  }

  @IsPublic()
  @Delete('delete/:idEndereco')
  removeEndereco(@Param('idEndereco') idEndereco: number) {
    return this.enderecoService.removeEndereco(idEndereco);
  }
}
