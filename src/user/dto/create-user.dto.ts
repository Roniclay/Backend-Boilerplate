import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Sexo } from '@prisma/client';

import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEnum(Sexo, { message: 'É necessário ser [M, F, O]' })
  sexo: Sexo;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: `Sua senha deve conter pelo menos um dígito ou um caractere especial, não deve conter um ponto (.) ou uma quebra de linha, deve ter pelo menos uma letra maiúscula, deve ter pelo menos uma letra minúscula.`,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsDateString()
  dataNasc: Date;

  @IsNotEmpty()
  @IsDateString()
  dataCadas: Date;
}
