import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";


export async function deletePessoa(id: number) {
    
    const existingPessoa = await prisma.pessoa.findUnique({
        where: { id },
    });

    if (!existingPessoa)
        throw new AppError("Pessoa não encontrado", 404);

    const pessoa = await prisma.pessoa.delete({
        where: { id },
    });

    return pessoa;
}