import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { isValidCEP, isValidEndereco, isValidEstado, isValidNum } from "@/utils/validations";


export async function registerMoradia({num, endereco, bairro, cidade, estado, CEP, userId}: {
    num: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    CEP:    string;
    userId: number;
}) {

    if (isValidNum(num))
        throw new AppError("Número inválido", 400);

    if (isValidEndereco(endereco))
        throw new AppError("Endereço inválido", 400);

    if (isValidEndereco(bairro))
        throw new AppError("Bairro inválido", 400);

    if (isValidEndereco(cidade))
        throw new AppError("Cidade inválida", 400);

    if (isValidEstado(estado))
        throw new AppError("Estado inválido", 400);

    if (isValidCEP(CEP))
        throw new AppError("CEP inválido", 400);

    const agente = await prisma.usuario.findUnique({
        where: {id: userId},
    });

    if (!agente)
        throw new AppError("Agente não encontrado", 404);

    const moradia = await prisma.moradia.create({
        data: {
            num,
            endereco,
            bairro,
            cidade,
            estado,
            CEP,
            coletadoPor: {
                connect: { id: userId}
            },
            nomeDoColetador: agente.name,

        },
    });

    return moradia;
}