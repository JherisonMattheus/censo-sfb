import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/AppError";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function loginHandler(req: NextRequest) {
    const { CPF, password } = await req.json();

    const user = await prisma.usuario.findUnique({ where: { CPF } });

    if((!user || !(await bcrypt.compare(password, user.password))))
        throw new AppError("Credênciais inválidas", 401); 
    
    const token = await generateToken({ id: user.id, role: user.role});
    
    const res = NextResponse.json({
        message: `${user.role === "ADMIN" ? "Admin" : "Agente"} autenticado com sucesso`,
        role: user.role,
    });

    res.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    });
    return res; 
    
}