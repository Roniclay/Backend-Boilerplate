-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F', 'O');

-- CreateTable
CREATE TABLE "Fornecedor" (
    "idFornecedor" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("idFornecedor")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "idEndereco" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "fornecedorId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("idEndereco")
);

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "idNotaFiscal" SERIAL NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL,
    "numeroNota" TEXT NOT NULL,
    "dataCadastroNota" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DECIMAL(65,30) NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("idNotaFiscal")
);

-- CreateTable
CREATE TABLE "NotaProduto" (
    "idProdutoNota" SERIAL NOT NULL,
    "lote" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "notaFiscalId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "NotaProduto_pkey" PRIMARY KEY ("idProdutoNota")
);

-- CreateTable
CREATE TABLE "Produto" (
    "idProduto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataValidade" TIMESTAMP(3) NOT NULL,
    "nomeTipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "quantidadeEstoque" INTEGER NOT NULL,
    "solicitacaoId" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("idProduto")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdministrador" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdministrador")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "nome" TEXT,
    "sexo" "Sexo",
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone" TEXT,
    "dataNasc" TIMESTAMP(3),
    "dataCadas" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Medico" (
    "idMedico" SERIAL NOT NULL,
    "crm" TEXT NOT NULL,
    "estadoCrm" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("idMedico")
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "idSolicitacao" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "itens" TEXT NOT NULL,
    "administradorId" INTEGER NOT NULL,

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("idSolicitacao")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_userId_key" ON "Administrador"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_userId_key" ON "Medico"("userId");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("idFornecedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("idFornecedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("idNotaFiscal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "Solicitacao"("idSolicitacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "Administrador"("idAdministrador") ON DELETE RESTRICT ON UPDATE CASCADE;
