import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateMedicoDto } from './dto/create-medico.dto';

@Injectable()
export class MedicoService {
  constructor(private readonly prisma: PrismaService) {}
  async createMedico(createMedicoDto: CreateMedicoDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { idUser: createMedicoDto.userId },
    });

    if (!existingUser) throw new NotFoundException('User not found');

    return await this.prisma.medico.create({
      data: { ...createMedicoDto },
    });
  }

  async removeMedico(idMedico: number) {
    const medico = await this.prisma.medico.findUnique({
      where: { idMedico },
    });

    if (!medico) throw new NotFoundException('Medico not found.');

    return await this.prisma.medico.delete({
      where: { idMedico },
    });
  }
}
