import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!

export interface TokenPayload {
    id: number
    role: "ADMIN" | "AGENTE"
}

export function generateToken(
    payload: TokenPayload,
    expiresIn: SignOptions["expiresIn"] = "7d"
): Promise<string> {
    const options: SignOptions = { expiresIn };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, token) => {
            if(err || !token) {
                reject(err ?? new Error("Erro ao gerar token"));
            } else {
                resolve(token);
            }
        })
    });
}

export function verifyToken(token: string): TokenPayload {
    const decoded = jwt.verify(token, SECRET);

    if (
        typeof decoded === "object" &&
        "id" in decoded &&
        "role" in decoded &&
        (decoded.role === "ADMIN" || decoded.role === "AGENTE")
    ) {
        return decoded as TokenPayload;
    }

    throw new Error("Token inválido");
}