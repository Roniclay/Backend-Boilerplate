-- DropForeignKey
ALTER TABLE "Administrador" DROP CONSTRAINT "Administrador_userId_fkey";

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
