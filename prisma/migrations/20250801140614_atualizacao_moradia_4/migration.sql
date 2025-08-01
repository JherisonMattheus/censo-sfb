/*
  Warnings:

  - Added the required column `nomeDoColetador` to the `Moradia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moradia" ADD COLUMN     "coletadoPorId" INTEGER,
ADD COLUMN     "nomeDoColetador" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Moradia" ADD CONSTRAINT "Moradia_coletadoPorId_fkey" FOREIGN KEY ("coletadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
