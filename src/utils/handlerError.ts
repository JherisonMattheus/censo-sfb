import { NextResponse } from "next/server";
import { AppError } from "./AppError";

export function handlerError(error: unknown) {
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