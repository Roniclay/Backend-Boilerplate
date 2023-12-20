import { IsNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  userId: number;
}
