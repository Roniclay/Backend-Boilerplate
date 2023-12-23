/*
  Warnings:

  - A unique constraint covering the columns `[numeroNota]` on the table `NotaFiscal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotaFiscal_numeroNota_key" ON "NotaFiscal"("numeroNota");
