import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { NotaProdutoService } from './nota-produto.service';
import { CreateNotaProdutoDto } from './dto/create-nota-produto.dto';
import { UpdateNotaProdutoDto } from './dto/update-nota-produto.dto';

@Controller('nota-produto')
export class NotaProdutoController {
  constructor(private readonly notaProdutoService: NotaProdutoService) {}

  @Post('create')
  createNotaProduto(@Body() createNotaProdutoDto: CreateNotaProdutoDto) {
    return this.notaProdutoService.createNotaProduto(createNotaProdutoDto);
  }

  @Get('all')
  findAllNotaProduto() {
    return this.notaProdutoService.findAllNotaProduto();
  }

  @Get('one/:idNotaProduto')
  findOneNotaProduto(@Param('idNotaProduto') idNotaProduto: number) {
    return this.notaProdutoService.findOneNotaProduto(idNotaProduto);
  }

  @Put('update/:idNotaProduto')
  updateNotaProduto(
    @Param('idNotaProduto') idNotaProduto: number,
    @Body() updateNotaProdutoDto: UpdateNotaProdutoDto,
  ) {
    return this.notaProdutoService.updateNotaProduto(
      idNotaProduto,
      updateNotaProdutoDto,
    );
  }

  @Delete('delete/:idNotaProduto')
  removeNotaProduto(@Param('idNotaProduto') idNotaProduto: number) {
    return this.notaProdutoService.removeNotaProduto(idNotaProduto);
  }
}
