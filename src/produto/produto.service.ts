import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduto(createProdutoDto: CreateProdutoDto) {
    //Verifica se o produto já existe
    const isProdutoUnique = await this.prisma.produto.findUnique({
      where: { nome: createProdutoDto.nome },
    });

    if (isProdutoUnique)
      throw new BadRequestException('Produto already exist.');

    // Cria Produto

    const { solicitacaoId, ...rest } = createProdutoDto;

    const data: Prisma.ProdutoCreateInput = {
      ...rest,
      solicitacao: { connect: { idSolicitacao: solicitacaoId } },
    };

    const createdProduto = await this.prisma.produto.create({ data });

    return {
      ...createdProduto,
    };
  }

  async findAllProduto() {
    return await this.prisma.produto.findMany();
  }

  async findOneProduto(idProduto: number) {
    return await this.prisma.produto.findUnique({
      where: { idProduto },
    });
  }

  async updateProduto(idProduto: number, updateProdutoDto: UpdateProdutoDto) {
    const enderecoToUpdate = await this.prisma.produto.findUnique({
      where: { idProduto },
    });
    // Verifica se está sendo alterado o nome
    const nomeIsUnique = await this.prisma.produto.findUnique({
      where: { nome: updateProdutoDto.nome },
    });

    if (nomeIsUnique) {
      throw new BadRequestException('Nome already in use.');
    }

    // Atualizando produto
    await this.prisma.produto.update({
      where: { idProduto },
      data: { ...updateProdutoDto },
    });

    return { ...enderecoToUpdate, ...updateProdutoDto };
  }

  async removeProduto(idProduto: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { idProduto },
    });

    if (!produto) throw new NotFoundException('Produto not found.');

    return await this.prisma.produto.delete({ where: { idProduto } });
  }
}
