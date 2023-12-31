import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateFornecedorDto } from './create-fornecedor.dto';

export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  enderecoId?: number;
}
