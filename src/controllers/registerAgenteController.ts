import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function registerAgente({ name, CPF, password, adminId}: {
    name: string;
    CPF: string;
    password: string;
    adminId: number;
}) {
        const existingAgente = await prisma.usuario.findUnique({ 
            where: { CPF } 
        });

        if (existingAgente) {
            throw new Error("Agente com esse CPF já existe.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const agente = await prisma.usuario.create({
            data: {
                name,
                CPF,
                password: hashedPassword,
                role: "AGENTE",
                registradoPor: {
                    connect: { id: adminId }
                }
            },
        });

        return agente;
    }