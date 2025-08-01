'use client'

import { usePathname } from "next/navigation"


export default function SideBar() {
    const pathname = usePathname();
    const isPageLogin = pathname === '/login';

    if(isPageLogin) return null;

    return (
        <div className="max-w-[300px] w-4/20 bg-blue-100 shadow-[0px_0px_1px_rgba(0,0,0,0.5)]">
              oi
        </div>
    )
}