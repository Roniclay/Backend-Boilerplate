import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { SolicitacaoService } from './solicitacao.service';
import { SolicitacaoController } from './solicitacao.controller';

@Module({
  controllers: [SolicitacaoController],
  providers: [SolicitacaoService],
  imports: [PrismaModule],
})
export class SolicitacaoModule {}
