import { Produto } from '@prisma/client';

export class Solicitacao {
  idSolicitacao: number;
  quantidade: number;
  itens: string;
  produto: Produto[];
  administradorId: number;
}
