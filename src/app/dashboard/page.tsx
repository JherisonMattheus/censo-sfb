"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/solid";


type Pessoa = {
    id: number;
    name: string;
    CPF: string;
    email: string;
    idade: number;
}

export default function Dashboard() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        const fetchPessoas = async () => {
            try {
                const res = await axios.get(`/api/pessoa?page=${page}&pageSize=${pageSize}`, {
                    withCredentials: true,
                });
            
                const data = res.data;
                setPessoas(data.pessoas);
                setHasMore(data.hasMore)
            } catch (error: any) {
                console.error(error);
                setError("Erro ao carregar dados");
            }
        }

        fetchPessoas();
    }, [page]);

    return (
        <main className="flex flex-1 min-h-full bg-blue-300 text-black">
            <div className="w-4/20 bg-blue-100 shadow-[0px_0px_1px_rgba(0,0,0,0.5)]">
                oi
            </div>
            <div className="flex flex-col flex-1 items-center justify-between py-4 mx-4">
                <h1 className="text-xl font-bold mb-4">Registros</h1>

                {error && <p className="text-red-600">{error}</p>}

                <ul className="flex-1 bg-white w-full space-y-2 p-4 rounded-2xl">
                    {pessoas.map((pessoa) => (
                        <li key={pessoa.id} className="grid grid-cols-[90%_10%] bg-gray-200 p-4 shadow-[1px_1px_3px_rgba(0,0,0,0.6)] rounded">
                            <div className="">
                                <p>{pessoa.name}</p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <div>
                                    <Link href={""}>
                                        <EyeIcon className="h-5 w-5 hover:text-blue-700"/>

                                    </Link>
                                </div>
                                <div>
                                    <Link href={""}>
                                        <TrashIcon className="h-5 w-5 hover:text-red-700"/>
                                    </Link>
                                </div>
                            </div>
                            
                        </li>
                        
                    ))}
                </ul>

                <div className="flex items-center space-x-10 mt-4">
                    <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-gray-200 w-[200px] px-3 py-3 cursor-pointer hover:bg-gray-300 active:bg-gray-400 shadow-[1px_1px_3px_rgba(0,0,0,0.6)] rounded"
                    >
                        Anterior
                    </button>
                    <p className="text-[19px]">{page}</p>
                    <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={hasMore}
                    className="bg-gray-200 w-[200px] px-3 py-3 cursor-pointer hover:bg-gray-300 active:bg-gray-400 shadow-[1px_1px_3px_rgba(0,0,0,0.6)] rounded"
                    >
                        Próximo
                    </button>
                </div>
            </div>

            
        </main>
    )
}