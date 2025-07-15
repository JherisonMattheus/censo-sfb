import { registerAgente } from "@/controllers/registerAgenteController";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const agente = await registerAgente(body);

        return NextResponse.json({
            message: "Agente cadastrado com sucesso",
            agente,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao cadastrar agente."},
            { status: 400 }
        );
    }
}