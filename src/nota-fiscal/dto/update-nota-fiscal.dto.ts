import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';

import { CreateNotaFiscalDto } from './create-nota-fiscal.dto';

export class UpdateNotaFiscalDto extends PartialType(CreateNotaFiscalDto) {
  @IsOptional()
  @IsNumber()
  valor: number;
}
