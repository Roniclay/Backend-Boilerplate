/*
  Warnings:

  - Made the column `nome` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sexo` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataNasc` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "sexo" SET NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "dataNasc" SET NOT NULL;
