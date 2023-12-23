import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateNotaProdutoDto } from './create-nota-produto.dto';

export class UpdateNotaProdutoDto extends PartialType(CreateNotaProdutoDto) {
  @IsOptional()
  @IsString()
  lote: string;

  @IsOptional()
  @IsString()
  quantidade: number;
}
