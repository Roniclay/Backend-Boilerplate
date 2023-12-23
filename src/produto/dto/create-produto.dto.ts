import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsDateString()
  dataValidade: Date;

  @IsNotEmpty()
  @IsString()
  nomeTipo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  fabricante: string;

  @IsNotEmpty()
  @IsNumber()
  quantidadeEstoque: number;

  @IsNotEmpty()
  @IsNumber()
  solicitacaoId: number;
}
