import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Sexo } from '@prisma/client';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEnum(Sexo, { message: 'É necessário ser [M, F, O]' })
  @IsOptional()
  sexo?: Sexo;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: `Sua senha deve conter pelo menos um dígito ou um caractere especial, não deve conter um ponto (.) ou uma quebra de linha, deve ter pelo menos uma letra maiúscula, deve ter pelo menos uma letra minúscula.`,
  })
  password?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsDate()
  @IsOptional()
  dataNasc?: Date;
}
