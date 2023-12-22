import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    // Verificar se o usuário existe
    const existingUser = await this.prisma.user.findUnique({
      where: { idUser: createAdminDto.userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Criar o administrador
    return await this.prisma.administrador.create({
      data: { ...createAdminDto },
    });
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async removeAdmin(idAdministrador: number) {
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
