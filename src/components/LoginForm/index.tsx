'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [CPF, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ CPF, password})
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Erro ao fazer login");
                return;
            }

            if (data.role === "ADMIN"){
                router.push("/admin");
            } else {
                router.push("/agente");
            }
        } catch (error) {
            setError("Erro ao conectar com o servidor");
            console.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" space-y-4 w-full">
            <div>
                        <label htmlFor="CPF" className="block text-sm font-medium text-gray-700">
                            Usuário
                        </label>
                        <input 
                            type="text"
                            id="CPF"
                            required
                            value= {CPF}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setCPF(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            required
                            id="password"
                            value={password}
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2"/>
                            Lembre de mim
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Esqueci a senha</a>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-[#3b83f6f1] active:bg-[#3b83f6fa]">
                        Entrar
                    </button>
        </form>
    )
}