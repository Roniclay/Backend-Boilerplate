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
    // Verifica se o cnpj já existe
    const isCnpjUnique = await this.prisma.fornecedor.findUnique({
      where: { cnpj: createFornecedorDto.cnpj },
    });

    if (isCnpjUnique) throw new BadRequestException('Cnpj is already in use');

    // Cria Fornecedor
    const data: Prisma.FornecedorCreateInput = {
      ...createFornecedorDto,
    };

    const createdFornecedor = await this.prisma.fornecedor.create({ data });

    return {
      ...createdFornecedor,
    };
  }

  async findAllFornecedores() {
    return await this.prisma.fornecedor.findMany();
  }

  async findByIdFornecedor(idFornecedor: number) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { idFornecedor },
    });

    if (!fornecedor) throw new NotFoundException('User not found');

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
      throw new NotFoundException('Fornecedor not Found');

    if (updateFornecedorDto.cnpj) {
      throw new BadRequestException('This property cannot be chaged');
    }

    await this.prisma.fornecedor.update({
      where: { idFornecedor },
      data: { ...updateFornecedorDto },
    });

    return { ...fornecedorToUpdate, ...updateFornecedorDto };
  }

  async removeFornecedor(idFornecedor: number) {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { idFornecedor },
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor not found');
    }

    return await this.prisma.fornecedor.delete({ where: { idFornecedor } });
  }
}
