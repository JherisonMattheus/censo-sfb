import { deletePessoa } from "@/controllers/deletePessoaController";
import { updatePessoa } from "@/controllers/updatePessoaController";
import { prisma } from "@/lib/prisma";
import { authmiddleware } from "@/middlewares/authmiddleware";
import { AppError } from "@/utils/AppError";
import { handlerError } from "@/utils/handlerError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        await authmiddleware(req);
        
        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const pessoa = await prisma.pessoa.findUnique({
            where: { id: numID }
        });

        if (!pessoa)
            throw new AppError("Pessoa não encontrada", 404);

        return NextResponse.json(pessoa)
    } catch (error) {
        return handlerError(error);
    }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await authmiddleware(req);

        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const body = await req.json();

        const pessoa = await updatePessoa({...body, id: numID});

        return NextResponse.json({
            message: "Dados atualizados com sucesso" ,
            pessoa,
        });

    } catch (error: any) {
        return handlerError(error);
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
    try {
        const payload = await authmiddleware(req);

        if (payload.role !== "ADMIN")
            throw new AppError("Acesso negado: Você não tem permissão para deletar os dados desse usuário", 403);

        const { id } = await params;
        const numID = Number(id);

        if (isNaN(numID))
            throw new AppError("ID inválido", 400);

        const pessoa = await deletePessoa(numID);

        return NextResponse.json({
            message: "Pessoa deletado com sucesso",
            pessoa,
        });
    } catch (error) {
        return handlerError(error);
    }
}