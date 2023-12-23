import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { NotaProdutoService } from './nota-produto.service';
import { NotaProdutoController } from './nota-produto.controller';

@Module({
  controllers: [NotaProdutoController],
  providers: [NotaProdutoService],
  imports: [PrismaModule],
})
export class NotaProdutoModule {}
