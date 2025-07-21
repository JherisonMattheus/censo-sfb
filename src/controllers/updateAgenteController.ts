import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { isValidCPF, isValidEmail, isValidName } from "@/utils/validations";


export async function updateAgente({ id, name, CPF, email}: {
    id: number;
    name: string;
    CPF: string;
    email: string;
}) {
    if (!isValidName(name))
        throw new AppError("Nome inválido", 400);

    if (!isValidCPF(CPF))
        throw new AppError("CPF inválido", 400);

    if (!isValidEmail(email))
        throw new AppError("Email inválido", 400);

    const existingAgente = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!existingAgente)
        throw new AppError("Agente não encontrado", 404);

    if (existingAgente.role === "ADMIN")
        throw new AppError("Acesso negado: Um administrador não pode alterar os dados de um administrador", 403);

    const agente = await prisma.usuario.update({
        where: { id },
        data: {
            name, 
            CPF,
            email,
        }
    });

    return agente;
}