import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";


export async function deleteMoradia(id: number) {

    const existingMoradia = await prisma.moradia.findUnique({
        where: { id },
    });

    if (!existingMoradia)
        throw new AppError("Dado não encontrado", 404);

    const moradia = await prisma.moradia.delete({
        where: { id },
    });

    return moradia;
}