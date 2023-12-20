import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { userId, ...adminData } = createAdminDto;

    // Verificar se o usuário existe
    const existingUser = await this.prisma.user.findUnique({
      where: { idUser: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Criar o administrador
    return await this.prisma.administrador.create({
      data: {
        ...adminData,
        user: {
          connect: {
            idUser: userId,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async remove(idAdministrador: number) {
    const admin = await this.prisma.administrador.findUnique({
      where: { idAdministrador: idAdministrador },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return await this.prisma.administrador.delete({
      where: { idAdministrador: idAdministrador },
    });
  }
}
