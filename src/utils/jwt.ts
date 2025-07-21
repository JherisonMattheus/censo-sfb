import { jwtVerify, SignJWT } from "jose";
import { AppError } from "./AppError";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface TokenPayload {
    id: number
    role: "ADMIN" | "AGENTE"
}

export async function generateToken(
    payload: TokenPayload
): Promise<string> {
    return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256"})
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, SECRET);
    
    if (
        typeof payload === "object" &&
        "id" in payload &&
        "role" in payload &&
        (payload.role === "ADMIN" || payload.role === "AGENTE")
    ) {
        return payload as unknown as TokenPayload;
    }

    throw new AppError("Token inválido", 401);
}