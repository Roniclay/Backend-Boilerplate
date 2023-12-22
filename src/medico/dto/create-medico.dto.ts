import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsNotEmpty()
  @IsString()
  crm: string;

  @IsNotEmpty()
  @IsString()
  estadoCrm: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
