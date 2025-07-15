-- CreateTable
CREATE TABLE "Agente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Agente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "agenteId" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agente_CPF_key" ON "Agente"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_CPF_key" ON "Aluno"("CPF");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_agenteId_fkey" FOREIGN KEY ("agenteId") REFERENCES "Agente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
