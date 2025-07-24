import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Login(){
    return (
        <>
        <header className="flex flex-col items-center justify-center bg-blue-500 w-full px-4 py-6">
            <Image height={90} width={90} src={"/logo.png"} alt={"slogan"}></Image>
            <h1 className="text-3xl font-bold py-4">Seja Bem Vindo ao JMSL Censo!</h1>
        </header>
        <main className="flex  justify-center flex-1 bg-blue-300">
            <div className="flex min-w-80 w-full max-w-128 max-h-100 mt-20 flex-col items-center rounded-sm p-8 bg-slate-50 text-gray-800">
                <h2 className="pt-2 pb-6 font-bold text-2xl">
                    Login
                </h2>
                <LoginForm/>
            </div>
        </main>
        </>
    )
}