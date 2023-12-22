-- DropForeignKey
ALTER TABLE "Medico" DROP CONSTRAINT "Medico_userId_fkey";

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
