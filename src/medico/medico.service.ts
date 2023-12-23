import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateMedicoDto } from './dto/create-medico.dto';

@Injectable()
export class MedicoService {
  constructor(private readonly prisma: PrismaService) {}
  async createMedico(createMedicoDto: CreateMedicoDto) {
    // Verifica se o usuário existe
    const existingUser = await this.prisma.user.findUnique({
      where: { idUser: createMedicoDto.userId },
    });

    if (!existingUser) throw new NotFoundException('User not found');

    // Verifica se o usuário já está cadastrado
    const registeredUser = await this.prisma.medico.findUnique({
      where: { userId: createMedicoDto.userId },
    });

    if (registeredUser) throw new BadRequestException('User já cadastrado');

    // Cria o médico

    const { userId, ...rest } = createMedicoDto;
    const data: Prisma.MedicoCreateInput = {
      ...rest,
      user: { connect: { idUser: userId } },
    };

    const createdMedico = await this.prisma.medico.create({ data });

    return {
      ...createdMedico,
    };
  }

  async findAllMedico() {
    return await this.prisma.administrador.findMany();
  }

  async findByIdMedico(idMedico: number) {
    return await this.prisma.medico.findUnique({
      where: { idMedico },
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
