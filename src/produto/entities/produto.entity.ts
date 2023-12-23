import { NotaProduto, Solicitacao } from '@prisma/client';

export class Produto {
  idProduto: number;
  nome: string;
  dataValidade: Date;
  nomeTipo: string;
  descricao: string;
  fabricante: string;
  quantidadeEstoque: number;
  notaProduto: NotaProduto[];
  solicitacaoId: number;
  solicitacao: Solicitacao;
}
