import { NextResponse } from "next/server";
import { AppError } from "./AppError";

export function handlerError(error: unknown) {
    console.error(error);

    if (error instanceof AppError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
    }
    
    return NextResponse.json(
        { error: "Erro interno no servidor" },
        { status: 500 },
    );
}