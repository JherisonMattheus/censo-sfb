import Link from "next/link";


export default function Footer() {
    return (
        <footer>
            <div className="flex items-center justify-center w-full bg-[#3b82f6] px-5 py-3">
                <div className="flex items-center justify-between gap-5">
                    <span>&copy; 2025 JSML,&nbsp;Inc.</span>
                    <Link href={""}>
                        <span>Contatos</span>
                    </Link>
                    <Link href={""}>
                        <span>Obtenha o aplicativo</span>
                    </Link>
                    <Link href={""}>
                        <span>Ajuda e suporte</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}