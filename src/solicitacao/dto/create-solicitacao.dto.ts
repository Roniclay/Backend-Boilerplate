import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSolicitacaoDto {
  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @IsNotEmpty()
  @IsString()
  itens: string;

  @IsNotEmpty()
  @IsNumber()
  administradorId: number;
}
