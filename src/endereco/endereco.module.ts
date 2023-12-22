import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService],
  imports: [PrismaModule],
})
export class EnderecoModule {}
