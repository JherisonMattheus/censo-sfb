"use client"

import { usePathname } from "next/navigation"
import { Header } from "../header";


export default function HeaderWrapper() {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";


    if(isLoginPage)
        return null;

    return <Header/>;
}