import { registerAgente } from "@/controllers/registerAgenteController";
import { prisma } from "@/lib/prisma";
import { authmiddleware } from "@/middlewares/authmiddleware";
import { AppError } from "@/utils/AppError";
import { handlerError } from "@/utils/handlerError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        await authmiddleware(req);
        
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const pageSize = Number(url.searchParams.get("pageSize")) || 10;

        const agentes = await prisma.usuario.findMany({
            where: { role: "AGENTE" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { name: "asc" },
        });

        return NextResponse.json(agentes);
    } catch (error) {
        return handlerError(error);
    }
}

export async function POST(req: NextRequest) {

    try {

        const payload = await authmiddleware(req);

        if (payload.role !== "ADMIN") {
            throw new AppError("Acesso negado: Você não tem a permissão necessária", 403);
        }

        const body = await req.json();
        const agente = await registerAgente({...body, adminId: payload.id});

        return NextResponse.json({
            message: "Agente cadastrado com sucesso",
            agente,
        });
    } catch (error) {
        return handlerError(error);   
    }
}