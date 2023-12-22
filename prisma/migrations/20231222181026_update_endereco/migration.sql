/*
  Warnings:

  - The `fornecedorId` column on the `Endereco` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `Endereco` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_fornecedorId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_userId_fkey";

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "fornecedorId",
ADD COLUMN     "fornecedorId" INTEGER[],
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER[];

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("idFornecedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;
