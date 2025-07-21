import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { isValidAge, isValidCPF, isValidEmail, isValidName } from "@/utils/validations";


export async function updatePessoa( {id, name, CPF, email, idade}: {
    id: number;
    name: string;
    CPF: string;
    email: string;
    idade: number;
} ) {

    if (!isValidName(name))
        throw new AppError("Nome inválido", 400);

    if (!isValidCPF(CPF))
        throw new AppError("CPF inválido", 400);

    if (!isValidEmail(email))
        throw new AppError("Email inválido", 400);

    if (!isValidAge(idade))
        throw new AppError("Idade inválida",400);

    const existingPessoa = await prisma.pessoa.findUnique({
        where: { id },
    });

    if(!existingPessoa)
        throw new AppError("Pessoa não encontrada", 404);


    const pessoa = await prisma.pessoa.update({
        where: { id },
        data: {
            name,
            CPF,
            email,
            idade,
        },
    });

    return pessoa;
}