import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { NotaFiscalService } from './nota-fiscal.service';
import { NotaFiscalController } from './nota-fiscal.controller';

@Module({
  controllers: [NotaFiscalController],
  providers: [NotaFiscalService],
  imports: [PrismaModule],
})
export class NotaFiscalModule {}
