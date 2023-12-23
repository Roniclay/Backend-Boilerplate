import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotaProdutoDto {
  @IsNotEmpty()
  @IsString()
  lote: string;

  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @IsNotEmpty()
  @IsNumber()
  notaFsicalId: number;

  @IsNotEmpty()
  @IsNumber()
  produtoId: number;
}
