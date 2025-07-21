import { AppError } from "@/utils/AppError";
import { verifyToken } from "@/utils/jwt";
import { NextRequest } from "next/server";


export async function authmiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if(!token) throw new AppError("Não autorizado", 401);

    return await verifyToken(token);
    
}