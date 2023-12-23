import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { EnderecoModule } from './endereco/endereco.module';
import { MedicoModule } from './medico/medico.module';
import { SolicitacaoModule } from './solicitacao/solicitacao.module';
import { ProdutoModule } from './produto/produto.module';
import { NotaProdutoModule } from './nota-produto/nota-produto.module';
import { NotaFiscalModule } from './nota-fiscal/nota-fiscal.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AdminModule, FornecedorModule, EnderecoModule, MedicoModule, SolicitacaoModule, ProdutoModule, NotaProdutoModule, NotaFiscalModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
