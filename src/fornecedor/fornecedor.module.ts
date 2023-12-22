import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';

@Module({
  controllers: [FornecedorController],
  providers: [FornecedorService],
  imports: [PrismaModule],
})
export class FornecedorModule {}
