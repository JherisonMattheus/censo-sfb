import { deleteMoradia } from "@/controllers/deleteMoradiaController";
import { updateMoradia } from "@/controllers/updateMoradiaController";
import { prisma } from "@/lib/prisma";
import { authmiddleware } from "@/middlewares/authmiddleware";
import { AppError } from "@/utils/AppError";
import { handlerError } from "@/utils/handlerError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {
        await authmiddleware(req);

        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const moradia = await prisma.moradia.findUnique({
            where: { id: numID},
        });

        if (!moradia)
            throw new AppError("Dado não encontrado", 404);

        return NextResponse.json(moradia);

    } catch (error) {
        return handlerError(error);
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    
    try {
        await authmiddleware(req);

        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const body = await req.json();

        const moradia = await updateMoradia({ ...body, id: numID });

        return NextResponse.json({
            message: "Dados atualizados com sucesso",
            moradia,
        });

    } catch (error) {
        return handlerError(error);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    try {
        const payload = await authmiddleware(req);


        if (payload.role !== "ADMIN")
            throw new AppError("Acesso negado: Você não tem permissão para deletar esses dados", 403);

        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const moradia = deleteMoradia(numID);

        return NextResponse.json({
            message: "Dados deletados com sucesso",
            moradia,
        });

    } catch (error) {
        return handlerError(error);
    }
}