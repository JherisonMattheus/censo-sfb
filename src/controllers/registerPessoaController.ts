import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { isValidAge, isValidCPF, isValidEmail, isValidName } from "@/utils/validations";



export async function registerPessoa({ name, CPF, email, idade, moradiaId, userId }: {
    name: string;
    CPF: string;
    email: string;
    idade: number;
    moradiaId: number;
    userId: number;
}) {

    // if (!isValidCPF(CPF))
        // throw new AppError("CPF inválido", 400);

    if (!isValidName(name))
        throw new AppError("Nome inválido", 400);

    if (!isValidEmail(email))
        throw new AppError("Email inválido", 400);

    if (!isValidAge(idade))
        throw new AppError("Idade inválida", 400);

    const existingPessoa = await prisma.pessoa.findUnique({
        where: { CPF },
    });

    const existingMoradia = await prisma.moradia.findUnique({
        where: { id: moradiaId },
    });

    if (!existingMoradia)
        throw new AppError("Moradia não encontrada", 404);

    const agente = await prisma.usuario.findUnique({
        where: { id: userId },
    });

    if (existingPessoa)
        throw new AppError("CPF já cadastrado", 409);

    if (!agente)
        throw new AppError("Agente não encontrado", 404);

    const pessoa = await prisma.pessoa.create({
        data: {
            name,
            CPF,
            email,
            idade,
            coletadoPor: {
                connect: { id: userId}
            },
            nomeDoColetador: agente.name,
            moradia: {
                connect: {id: moradiaId}
            },
        }
    });
    return pessoa;
}