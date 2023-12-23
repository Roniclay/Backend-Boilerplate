import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotaFiscalDto {
  @IsNotEmpty()
  @IsDateString()
  dataEntrada: Date;

  @IsNotEmpty()
  @IsString()
  numeroNota: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsNumber()
  fornecedorId: number;
}
