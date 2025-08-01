'use client';

import axios from "axios";
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
            const res = await axios.post("/api/login", {
                CPF,
                password,
            }, {
                withCredentials: true,
            }
            );

            const data = await res.data;
            
            router.push("/dashboard");
            
        } catch (error: any) {
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("Erro ao conectar com o servidor");
            }
            
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

            <div className="flex items-center">
                <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2"/>
                    Lembre de mim
                </label>
            </div>
            <div className="flex items-center justify-center">
                {error && (
                <p className="text-red-600 text-sm">{error}</p>
                )}
            </div>

            <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-[#3b83f6f1] active:bg-[#3b83f6fa]">
                Entrar
            </button>
        </form>
    )
}