import { verifyToken } from "@/utils/jwt";
import { NextRequest } from "next/server";


export function authmiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if(!token) throw new Error("Não autorizado");

    return verifyToken(token);
}