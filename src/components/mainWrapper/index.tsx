'use client'

import { usePathname } from "next/navigation";
import SideBar from "../sideBar";


export default function MainWrapper({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return isLoginPage ? (
        <>{children}</>
    ) : (
        <main className="flex flex-1 min-h-full bg-blue-300 text-black">
            <SideBar/>
            <>{children}</>
        </main>
    )
}