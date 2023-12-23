import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    // Verifica se o usuário existe
    const existingUser = await this.prisma.user.findUnique({
      where: { idUser: createAdminDto.userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Verifica se o usuário já está cadastrado
    const registeredUser = await this.prisma.administrador.findUnique({
      where: { userId: createAdminDto.userId },
    });

    if (registeredUser) throw new BadRequestException('User já cadastrado');

    // Cria o administrador
    const { userId, ...rest } = createAdminDto;
    const data: Prisma.AdministradorCreateInput = {
      ...rest,
      user: { connect: { idUser: userId } },
    };

    const createdAdmin = await this.prisma.administrador.create({ data });

    return {
      ...createdAdmin,
    };
  }

  async findAllAdministrador() {
    return await this.prisma.administrador.findMany();
  }

  async findByIdAdministrador(idAdministrador: number) {
    return await this.prisma.administrador.findUnique({
      where: { idAdministrador },
    });
  }

  async removeAdmin(idAdministrador: number) {
    const admin = await this.prisma.administrador.findUnique({
      where: { idAdministrador },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }

    return await this.prisma.administrador.delete({
      where: { idAdministrador },
    });
  }
}
