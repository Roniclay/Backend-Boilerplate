import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('create')
  createProduto(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.createProduto(createProdutoDto);
  }

  @Get('all')
  findAllProduto() {
    return this.produtoService.findAllProduto();
  }

  @Get('one/:id')
  findOneProduto(@Param('idProduto') idProduto: string) {
    return this.produtoService.findOneProduto(+idProduto);
  }

  @Put('update/:idProduto')
  updateProduto(
    @Param('idProduto') idProduto: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtoService.updateProduto(idProduto, updateProdutoDto);
  }

  @Delete('delete/:idProduto')
  removeProduto(@Param('idProduto') idProduto: number) {
    return this.produtoService.removeProduto(idProduto);
  }
}
