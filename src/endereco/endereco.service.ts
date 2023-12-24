import { Injectable, NotFoundException } from '@nestjs/common';
import { Endereco } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(private readonly prisma: PrismaService) {}
  async createEndereco(
    createEnderecoDto: CreateEnderecoDto,
  ): Promise<Endereco> {
    const data: Prisma.EnderecoCreateInput = {
      ...createEnderecoDto,
    };

    return await this.prisma.endereco.create({ data });
  }

  async findAllEnderecos() {
    return await this.prisma.endereco.findMany();
  }

  async findByIdEndereco(idEndereco: number) {
    return await this.prisma.endereco.findUnique({
      where: { idEndereco },
    });
  }

  async updateEndereco(
    idEndereco: number,
    updateEnderecoDto: UpdateEnderecoDto,
  ) {
    const enderecoToUpdate = await this.prisma.endereco.findUnique({
      where: { idEndereco },
    });

    if (!enderecoToUpdate) throw new NotFoundException('Endereco not found.');

    if (updateEnderecoDto.fornecedorId) {
      const fornecedorExist = await this.prisma.fornecedor.findUnique({
        where: { idFornecedor: updateEnderecoDto.fornecedorId },
      });

      if (!fornecedorExist)
        throw new NotFoundException('Fornecedor not found.');
    }

    if (updateEnderecoDto.userId) {
      const userExist = await this.prisma.user.findUnique({
        where: { idUser: updateEnderecoDto.userId },
      });

      if (!userExist) throw new NotFoundException('User not found.');
    }

    return await this.prisma.endereco.update({
      where: { idEndereco },
      data: { ...updateEnderecoDto },
    });
  }

  async removeEndereco(idEndereco: number) {
    const endereco = await this.prisma.endereco.findUnique({
      where: { idEndereco },
    });

    if (!endereco) throw new NotFoundException('Endereco not found.');

    return await this.prisma.endereco.delete({ where: { idEndereco } });
  }
}
