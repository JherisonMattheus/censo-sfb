/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `Agente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_agenteId_fkey";

-- AlterTable
ALTER TABLE "Agente" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Aluno";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "agenteId" INTEGER NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_CPF_key" ON "Admin"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_CPF_key" ON "Pessoa"("CPF");

-- AddForeignKey
ALTER TABLE "Agente" ADD CONSTRAINT "Agente_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_agenteId_fkey" FOREIGN KEY ("agenteId") REFERENCES "Agente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
