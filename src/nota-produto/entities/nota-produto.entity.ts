import { NotaFiscal, Produto } from '@prisma/client';

export class NotaProduto {
  idNotaProduto: number;
  lote: string;
  quantidade: number;
  notaFsicalId: number;
  produtoId: number;
  notaFiscal: NotaFiscal;
  produto: Produto;
}
