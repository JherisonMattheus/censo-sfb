import { deleteAgente } from "@/controllers/deleteAgenteController";
import { updateAgente } from "@/controllers/updateAgenteController";
import { prisma } from "@/lib/prisma";
import { authmiddleware } from "@/middlewares/authmiddleware";
import { AppError } from "@/utils/AppError";
import { handlerError } from "@/utils/handlerError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await authmiddleware(req);
        
        const id = Number(params.id);

        if (isNaN(id))
            throw new AppError("ID inválido", 400);

        const agente = await prisma.usuario.findUnique({
            where: { id: id },
        });

        if (!agente)
            throw new AppError("Agente não encontrado", 404);

        return NextResponse.json(agente);
    } catch (error) {
        return handlerError(error);
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    
    try {

        const payload = await authmiddleware(req);

        if (payload.role !== "ADMIN") {
            throw new AppError("Acesso negado: Você não tem permissão para alterar os dados desse usuário", 403);
        }

        const id = Number(params.id);
                
        if (isNaN(id))
            throw new AppError("ID inválido", 400);

        const body = await req.json();

        const agente = await updateAgente({...body, id});

        return NextResponse.json({
            message: "Dados do agente atualizados com sucesso",
            agente,
        });

    } catch (error: any) {
        return handlerError(error);        
    }
}


export async function DELETE(req: NextRequest, {params}: { params: {id: string} }) {
    
    try {

        const payload = await authmiddleware(req);

        if (payload.role !== "ADMIN")
            throw new AppError("Acesso negado: Você não tem permissão para deletar os dados desse usuário", 403);

        const id = Number(params.id);

        if (isNaN(id))
            throw new AppError("ID inválido", 400);

        const agente = await deleteAgente(id);

        return NextResponse.json({
            message: "Agente deletado com sucesso",
            agente,
        });
    } catch (error) {
        return handlerError(error);
    }
}