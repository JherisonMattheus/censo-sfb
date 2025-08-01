/*
  Warnings:

  - Added the required column `CEP` to the `Moradia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Moradia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moradia" ADD COLUMN     "CEP" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ALTER COLUMN "cidade" DROP DEFAULT,
ALTER COLUMN "num" SET DATA TYPE TEXT;
