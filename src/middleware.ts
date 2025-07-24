import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwt";


export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    
    if(!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
        const { role } = await verifyToken(token);
        const pathname = req.nextUrl.pathname;
        
        if (pathname.startsWith("/admin") && role !== "ADMIN")
            return NextResponse.redirect(new URL("/dashboard", req.url));

        if (pathname.startsWith("/agente") && role !== "AGENTE")
            return NextResponse.redirect(new URL("/dashboard", req.url));

        return NextResponse.next();
    } catch (error) {
        console.error("Erro ao verificar token: ", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/agente/:path*", "/dashboard/:path*"],
};