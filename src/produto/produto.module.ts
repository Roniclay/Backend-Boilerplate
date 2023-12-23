import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  imports: [PrismaModule],
})
export class ProdutoModule {}
