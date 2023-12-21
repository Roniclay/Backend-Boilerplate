import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isEmailUnique = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (isEmailUnique) throw new BadRequestException('Email already in use');
    const hashPassword = await this.hashPassword(createUserDto.password);

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: hashPassword,
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findOneUser(idUser: number) {
    const user = await this.prisma.user.findUnique({
      where: { idUser },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(idUser: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.prisma.user.findUnique({
      where: { idUser },
    });

    // Verificando se usuário existe
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    // Verificando se o campo email existe e o dado enviado é diferente do atual
    if (updateUserDto.email && userToUpdate.email !== updateUserDto.email) {
      const emailIsUnique = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (emailIsUnique) {
        throw new BadRequestException('Email already in use.');
      }
    }

    // Verificando se há nova senha

    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      await this.prisma.user.update({
        where: { idUser },
        data: {
          ...updateUserDto,
          password: hashedPassword,
        },
      });
      updateUserDto.password = hashedPassword;
    } else {
      await this.prisma.user.update({
        where: { idUser },
        data: { ...updateUserDto },
      });
    }

    return { ...userToUpdate, ...updateUserDto };
  }

  async removeUser(idUser: number) {
    const user = await this.prisma.user.findUnique({
      where: { idUser },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.user.delete({ where: { idUser } });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
