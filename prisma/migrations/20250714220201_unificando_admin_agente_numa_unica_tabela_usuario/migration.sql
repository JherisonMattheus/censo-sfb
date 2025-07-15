/*
  Warnings:

  - You are about to drop the column `agenteId` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Agente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `atualizadoEm` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AGENTE');

-- DropForeignKey
ALTER TABLE "Agente" DROP CONSTRAINT "Agente_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_agenteId_fkey";

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "agenteId",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "coletadoPorId" INTEGER,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Agente";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'AGENTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_CPF_key" ON "Usuario"("CPF");

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_coletadoPorId_fkey" FOREIGN KEY ("coletadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
