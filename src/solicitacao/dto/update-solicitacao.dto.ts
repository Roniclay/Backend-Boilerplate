import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateSolicitacaoDto } from './create-solicitacao.dto';

export class UpdateSolicitacaoDto extends PartialType(CreateSolicitacaoDto) {
  @IsOptional()
  @IsNumber()
  quantidade: number;

  @IsOptional()
  @IsString()
  itens: string;

  @IsOptional()
  @IsString()
  administradorId: number;
}
