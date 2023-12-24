import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Fornecedor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(private readonly prisma: PrismaService) {}

  async createFornecedor(
    createFornecedorDto: CreateFornecedorDto,
  ): Promise<Fornecedor> {
    const isCnpjUnique = await this.prisma.fornecedor.findUnique({
      where: { cnpj: createFornecedorDto.cnpj },
    });

    if (isCnpjUnique) throw new BadRequestException('Cnpj is already in use.');

    const { enderecoId, ...rest } = createFornecedorDto;
    const data: Prisma.FornecedorCreateInput = {
      ...rest,
      endereco: { connect: { idEndereco: enderecoId } },
    };

    return await this.prisma.fornecedor.create({ data });
  }

  async findAllFornecedores() {
    return await this.prisma.fornecedor.findMany();
  }

  async findByIdFornecedor(idFornecedor: number) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { idFornecedor },
    });

    if (!fornecedor) throw new NotFoundException('User not found.');

    return fornecedor;
  }

  async updateFornecedor(
    idFornecedor: number,
    updateFornecedorDto: UpdateFornecedorDto,
  ) {
    const fornecedorToUpdate = await this.prisma.fornecedor.findUnique({
      where: { idFornecedor },
    });

    if (!fornecedorToUpdate)
      throw new NotFoundException('Fornecedor not Found.');

    if (updateFornecedorDto.cnpj) {
      throw new BadRequestException('This property cannot be changed.');
    }

    const enderecoExist = await this.prisma.fornecedor.findUnique({
      where: { enderecoId: updateFornecedorDto.enderecoId },
    });

    if (enderecoExist)
      throw new BadRequestException('This address is already registered.');

    return await this.prisma.fornecedor.update({
      where: { idFornecedor },
      data: { ...updateFornecedorDto },
    });
  }

  async removeFornecedor(idFornecedor: number) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { idFornecedor },
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor not found.');
    }

    return await this.prisma.fornecedor.delete({ where: { idFornecedor } });
  }
}
