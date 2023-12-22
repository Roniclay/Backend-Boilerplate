import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateFornecedorDto } from './create-fornecedor.dto';

export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  telefone: string;

  @IsString()
  @IsOptional()
  email: string;
}
