import { NextRequest } from "next/server";
import { loginHandler } from "@/controllers/authController";


export async function POST(req: NextRequest) {
    return loginHandler(req);
}