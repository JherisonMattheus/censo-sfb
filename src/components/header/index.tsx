import Link from "next/link";

export function Header(){
    return (
        <header className="flex px-2 py-6 bg-blue-500 text-white">
            <div className="flex items-center justify-between w-full mx-auto">
                <div>
                    <h1>
                        Censo - SFB
                    </h1>
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href="">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                Dados
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}