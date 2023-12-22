import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';

@Module({
  controllers: [MedicoController],
  providers: [MedicoService],
  imports: [PrismaModule],
})
export class MedicoModule {}
