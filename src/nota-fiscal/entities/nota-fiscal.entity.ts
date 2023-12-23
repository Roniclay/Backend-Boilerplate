import { NotaProduto } from '@prisma/client';

export class NotaFiscal {
  idNotaFiscal: number;
  dataEntrada: Date;
  numeroNota: string;
  valor: number;
  notaProduto: NotaProduto[];
  fornecedorId: number;
}
