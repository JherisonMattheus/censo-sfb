import { registerMoradia } from "@/controllers/registerMoradiaCOntroller";
import { prisma } from "@/lib/prisma";
import { authmiddleware } from "@/middlewares/authmiddleware";
import { handlerError } from "@/utils/handlerError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        await authmiddleware(req);

        const url = new URL(req.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const pageSize = Number(url.searchParams.get('pageSize')) || 10;

        const moradias = await prisma.moradia.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {bairro: 'asc'}
        });

        const total = await prisma.moradia.count();
        const hasMore = page * pageSize > total;

        return NextResponse.json({moradias, hasMore});

    } catch (error) {
       return handlerError(error); 
    }  
}

export async function POST(req: NextRequest) {
    try {

        const payload = await authmiddleware(req);

        const body = await req.json();
        const moradia = await registerMoradia({ ...body, userId: payload.id });

        return NextResponse.json({
            message: "Dados registrados com sucesso",
            moradia,
        });
    } catch (error: any) {
        return handlerError(error);
    }
}