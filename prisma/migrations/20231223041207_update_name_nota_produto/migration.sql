/*
  Warnings:

  - The primary key for the `NotaProduto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProdutoNota` on the `NotaProduto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotaProduto" DROP CONSTRAINT "NotaProduto_pkey",
DROP COLUMN "idProdutoNota",
ADD COLUMN     "idNotaProduto" SERIAL NOT NULL,
ADD CONSTRAINT "NotaProduto_pkey" PRIMARY KEY ("idNotaProduto");
