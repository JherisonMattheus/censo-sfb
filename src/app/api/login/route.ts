import { NextRequest, NextResponse } from "next/server";
import { loginHandler } from "@/controllers/authController";
import { AppError } from "@/utils/AppError";


export async function POST(req: NextRequest) {
    try {
        return await loginHandler(req);
    } catch (error) {
        if (error instanceof AppError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
        }

        console.error(error);
        
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 },
        );
    }
}