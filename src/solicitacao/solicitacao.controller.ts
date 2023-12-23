import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { SolicitacaoService } from './solicitacao.service';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';

@Controller('solicitacao')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @IsPublic()
  @Post('create')
  createSolicitacao(@Body() createSolicitacaoDto: CreateSolicitacaoDto) {
    return this.solicitacaoService.createSolicitacao(createSolicitacaoDto);
  }

  @Get('all')
  findAllSolicitacao() {
    return this.solicitacaoService.findAllSolicitacao();
  }

  @Get('one/:idSolicitacao')
  findOneSolicitacao(@Param('idSolicitacao') idSolicitacao: string) {
    return this.solicitacaoService.findOneSolicitacao(+idSolicitacao);
  }

  @Put('update/:idSolicitacao')
  updateSolicitacao(
    @Param('idSolicitacao') idSolicitacao: number,
    @Body() updateSolicitacaoDto: UpdateSolicitacaoDto,
  ) {
    return this.solicitacaoService.updateSolicitacao(
      idSolicitacao,
      updateSolicitacaoDto,
    );
  }

  @Delete('delete/:idSolicitacao')
  removeSolicitacao(@Param('idSolicitacao') idSolicitacao: number) {
    return this.solicitacaoService.removeSolicitacao(idSolicitacao);
  }
}
