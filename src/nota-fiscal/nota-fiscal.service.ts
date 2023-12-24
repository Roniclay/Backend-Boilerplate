import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotaFiscal, Prisma } from '@prisma/client';

import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Injectable()
export class NotaFiscalService {
  constructor(private readonly prisma: PrismaService) {}
  async createNotaFiscal(
    createNotaFiscalDto: CreateNotaFiscalDto,
  ): Promise<NotaFiscal> {
    const isNotaFiscalUnique = await this.prisma.notaFiscal.findUnique({
      where: { numeroNota: createNotaFiscalDto.numeroNota },
    });

    if (isNotaFiscalUnique) {
      throw new BadRequestException('Nota is already exist');
    }

    const { fornecedorId, ...rest } = createNotaFiscalDto;
    const data: Prisma.NotaFiscalCreateInput = {
      ...rest,
      fornecedor: { connect: { idFornecedor: fornecedorId } },
    };

    const createdNotaFiscal = await this.prisma.notaFiscal.create({ data });

    return {
      ...createdNotaFiscal,
    };
  }

  async findAllNotaFiscal() {
    return await this.prisma.notaFiscal.findMany();
  }

  async findOneNotaFiscal(idNotaFiscal: number) {
    const notaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { idNotaFiscal },
    });

    if (!notaFiscal) throw new NotFoundException('Nota Fiscal not found.');

    return notaFiscal;
  }

  async updateNotaFiscal(
    idNotaFiscal: number,
    updateNotaFiscalDto: UpdateNotaFiscalDto,
  ) {
    const notaFiscalToUpdate = await this.prisma.notaFiscal.findUnique({
      where: { idNotaFiscal },
    });

    if (!notaFiscalToUpdate)
      throw new NotFoundException('Nota Fiscal not found.');

    await this.prisma.notaFiscal.update({
      where: { idNotaFiscal },
      data: { ...updateNotaFiscalDto },
    });

    return { ...notaFiscalToUpdate, ...updateNotaFiscalDto };
  }

  async removeNotaFiscal(idNotaFiscal: number) {
    const notaFiscal = await this.prisma.notaFiscal.findUnique({
      where: { idNotaFiscal },
    });

    if (!notaFiscal) throw new NotFoundException('Nota fiscal not found.');

    return await this.prisma.notaFiscal.delete({ where: { idNotaFiscal } });
  }
}
