import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsDateString()
  dataValidade: Date;

  @IsOptional()
  @IsString()
  nomeTipo: string;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  fabricante: string;

  @IsOptional()
  @IsNumber()
  quantidadeEstoque: number;

  @IsOptional()
  @IsNumber()
  solicitacaoId: number;
}
