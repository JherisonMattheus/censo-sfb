import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";


export async function deleteAgente(id: number) {

    const existingAgente = await prisma.usuario.findUnique({
        where: { id }, 
    });

    if (!existingAgente)
        throw new AppError("Agente não encontrado", 404);

    if (existingAgente.role === "ADMIN")
        throw new AppError("Acesso negado: Você não pode deletar um ADMIN ", 403);

    const agente = await prisma.usuario.delete({
        where: { id },
    });

    return agente;
}