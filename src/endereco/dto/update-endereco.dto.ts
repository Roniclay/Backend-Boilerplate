import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
  @IsOptional()
  @IsString()
  rua: string;

  @IsOptional()
  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento: string;

  @IsOptional()
  @IsString()
  cidade: string;

  @IsOptional()
  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  cep: string;

  @IsOptional()
  @IsNumber()
  fornecedorId?: number;

  @IsNumber()
  userId?: number;
}
