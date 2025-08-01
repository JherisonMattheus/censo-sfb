'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Pessoa = {
    id: number;
    name: string;
    CPF: string;
    email: string;
    idade: number;
}


export default function EditForm({ pessoa }: { pessoa: Pessoa}) {
    const [formData, setFormData] = useState(pessoa);
    const [Error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
             ...prev,
             [id]: value
            }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(formData)
            await axios.put(`/api/pessoa/${formData.id}`, {
                name: formData.name,
                CPF: formData.CPF,
                email: formData.email,
                idade: Number(formData.idade),
            }, {
                withCredentials: true,
            });

            router.push(`/dashboard/${pessoa.id}/detalhes`);
        } catch (error: any) {
            setError(error.response.data.error);
        }
    }

    return (
        <form action="" className="flex flex-col h-full">
            <div className="flex-1">
                <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                    Nome
                </label>
                <input 
                    type="text"
                    id="name"
                    required
                    value= {formData.name}
                    className="min-w-[300px] w-1/2 mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                    onChange={handleChange}
                />
                <label htmlFor="CPF" className="block text-xl font-medium text-gray-700">
                    CPF
                </label>
                <input 
                    type="text"
                    id="CPF"
                    required
                    value= {formData.CPF}
                    className="min-w-[300px] w-1/2 mt-1 p-2 border border-gray-400 shadow rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                    onChange={handleChange}
                />
                <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                    Email
                </label>
                <input 
                    type="text"
                    id="email"
                    required
                    value= {formData.email}
                    className="min-w-[300px] w-1/2 mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                    onChange={handleChange}
                />
                <label htmlFor="idade" className="block text-xl font-medium text-gray-700">
                    Idade
                </label>
                <input 
                    type="text"
                    id="idade"
                    required
                    value= {formData.idade}
                    className="min-w-[300px] w-1/2 mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col items-center mt-10">
                {Error &&
                <p className="text-red-600">{Error}</p> 
                }
                <button 
                type="submit"
                onClick={handleSubmit} 
                className="max-w-[200px] w-full bg-blue-200 hover:bg-blue-300 active:bg-blue-100 transition duration-200 p-2 cursor-pointer shadow rounded-xl"
                >
                    Salvar
                </button>
            </div>
            
        </form>
    )
}