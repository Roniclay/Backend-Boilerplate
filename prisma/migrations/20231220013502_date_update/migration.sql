/*
  Warnings:

  - Made the column `dataCadas` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dataCadas" SET NOT NULL,
ALTER COLUMN "dataCadas" SET DEFAULT CURRENT_TIMESTAMP;
