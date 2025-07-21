import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { isValidCPF, isValidEmail, isValidName, isValidPassword } from "@/utils/validations";
import bcrypt from "bcryptjs";


export async function registerAgente({ name, CPF, email, password, adminId}: {
    name: string;
    CPF: string;
    email: string;
    password: string;
    adminId: number;
}) {
        if (!isValidCPF(CPF))
            throw new AppError("CPF inválido", 400);

        if (!isValidEmail(email))
            throw new AppError("Email inválido", 400);

        if (!isValidPassword(password))
            throw new AppError("Senha inválida", 400);

        if (!isValidName(name))
            throw new AppError("Nome inválido", 400);

        const existingAgente = await prisma.usuario.findUnique({ 
            where: { CPF } 
        });

        const admin = await prisma.usuario.findUnique({
            where: { id: adminId }
        });

        if (existingAgente)
            throw new AppError("Agente com esse CPF já existe.", 409);

        if (!admin)
            throw new AppError("Erro ao bsucar dados do Administrador", 404);

        const hashedPassword = await bcrypt.hash(password, 10);

        const agente = await prisma.usuario.create({
            data: {
                name,
                CPF,
                email,
                password: hashedPassword,
                role: "AGENTE",
                registradoPor: {
                    connect: { id: adminId }
                },
                nomeDoRegistrador: admin.name
            },
        });

        return agente;
    }