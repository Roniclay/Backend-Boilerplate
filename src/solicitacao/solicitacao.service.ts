import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}
  async createSolicitacao(createSolicitacaoDto: CreateSolicitacaoDto) {
    // Verifica se o administrador existe
    const administradorExist = await this.prisma.administrador.findFirst({
      where: { idAdministrador: createSolicitacaoDto.administradorId },
    });

    if (!administradorExist)
      throw new NotFoundException('Administrador not found.');

    // Cria a solicitação
    const { administradorId, ...solicitacao } = createSolicitacaoDto;

    const data: Prisma.SolicitacaoCreateInput = {
      ...solicitacao,
      administrador: {
        connect: { idAdministrador: administradorId },
      },
    };

    const createdSolicitacao = await this.prisma.solicitacao.create({ data });

    return {
      ...createdSolicitacao,
    };
  }

  async findAllSolicitacao() {
    return await this.prisma.solicitacao.findMany();
  }

  async findOneSolicitacao(idSolicitacao: number) {
    const solicitacao = await this.prisma.solicitacao.findUnique({
      where: { idSolicitacao },
    });

    if (!solicitacao) throw new NotFoundException('Solicitacao not found');

    return solicitacao;
  }

  async updateSolicitacao(
    idSolicitacao: number,
    updateSolicitacaoDto: UpdateSolicitacaoDto,
  ) {
    const solicitacaoToUpdate = await this.prisma.solicitacao.findUnique({
      where: { idSolicitacao },
    });

    if (!solicitacaoToUpdate)
      throw new NotFoundException('Solicitação not found');

    await this.prisma.solicitacao.update({
      where: { idSolicitacao },
      data: { ...updateSolicitacaoDto },
    });

    return { ...solicitacaoToUpdate, ...updateSolicitacaoDto };
  }

  async removeSolicitacao(idSolicitacao: number) {
    const solicitacao = await this.prisma.solicitacao.findUnique({
      where: { idSolicitacao },
    });

    if (!solicitacao) throw new NotFoundException('Solicitação not found');

    return await this.prisma.solicitacao.delete({ where: { idSolicitacao } });
  }
}
