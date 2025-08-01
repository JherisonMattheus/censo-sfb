/*
  Warnings:

  - Added the required column `moradiaId` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "moradiaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Moradia" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL DEFAULT 'São Francisco do Brejão',

    CONSTRAINT "Moradia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_moradiaId_fkey" FOREIGN KEY ("moradiaId") REFERENCES "Moradia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
