/*
  Warnings:

  - You are about to drop the column `fornecedorId` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Endereco` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enderecoId]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enderecoId` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_fornecedorId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_userId_fkey";

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "fornecedorId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "enderecoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_enderecoId_key" ON "Fornecedor"("enderecoId");

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;
