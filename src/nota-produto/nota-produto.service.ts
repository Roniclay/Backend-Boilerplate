import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateNotaProdutoDto } from './dto/create-nota-produto.dto';
import { UpdateNotaProdutoDto } from './dto/update-nota-produto.dto';

@Injectable()
export class NotaProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotaProduto(createNotaProdutoDto: CreateNotaProdutoDto) {
    const data: Prisma.NotaProdutoCreateInput = {
      ...createNotaProdutoDto,
      produto: {
        connect: { idProduto: createNotaProdutoDto.produtoId },
      },
      notaFiscal: {
        connect: { idNotaFiscal: createNotaProdutoDto.notaFsicalId },
      },
    };

    const createdNotaProduto = await this.prisma.notaProduto.create({ data });

    return {
      ...createdNotaProduto,
    };
  }

  async findAllNotaProduto() {
    return await this.prisma.notaProduto.findMany();
  }

  async findOneNotaProduto(idNotaProduto: number) {
    const notaProduto = await this.prisma.notaProduto.findUnique({
      where: { idNotaProduto },
    });

    if (!notaProduto) throw new NotFoundException('Nota Produto not found.');

    return notaProduto;
  }

  async updateNotaProduto(
    idNotaProduto: number,
    updateNotaProdutoDto: UpdateNotaProdutoDto,
  ) {
    const notaProdutoToUpdate = await this.prisma.notaProduto.findUnique({
      where: { idNotaProduto },
    });

    if (!notaProdutoToUpdate)
      throw new NotFoundException('Nota Produto not found.');

    await this.prisma.notaProduto.update({
      where: { idNotaProduto },
      data: { ...updateNotaProdutoDto },
    });

    return { ...notaProdutoToUpdate, ...updateNotaProdutoDto };
  }

  async removeNotaProduto(idNotaProduto: number) {
    const notaProduto = await this.prisma.notaProduto.findUnique({
      where: { idNotaProduto },
    });

    if (!notaProduto) {
      throw new NotFoundException('Nota Produto not found.');
    }

    return await this.prisma.notaProduto.delete({ where: { idNotaProduto } });
  }
}
