'use client'

import axios from "axios";
import { useState } from "react";
import EstadoSelect from "../estadoSelect";

type Moradia = {
    id?: number,
    num: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    CEP: string,
};

type Props = {
    isCreate: boolean;
    dados: Moradia;
    setDados: React.Dispatch<React.SetStateAction<Moradia>>;
    onSucess: (dadosMoradia: Moradia) => void;
}


export default function FormMoradia({isCreate, dados, setDados, onSucess }: Props) {


    const [error, setError] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDados((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isCreate) { 
            try {
                const res = await axios.put(`/api/moradia/${dados.id}`, dados, {
                    withCredentials: true,
                });

                onSucess(res.data.moradia);
            } catch (error: any) {
                setError(error.response.data.error);
            }
        } else {
            try {
            const res = await axios.post('/api/moradia', dados, {
                withCredentials: true,
            });

            onSucess(res.data.moradia);
            } catch (error: any) {
                setError(error.response.data.error);
            }
        }
    }

    return (
        <form className="flex flex-col h-full">
            <div className="flex-1">

                <h2 className="text-center text-3xl text-blue-500 font-bold p-1 mb-12" >Moradia</h2>

                <div className="grid grid-cols-6 h-1/2">
                    <div className="flex flex-col col-start-1 col-end-4 p-2">
                        <label htmlFor="endereco" className="mx-2">Endereço</label>
                        <input 
                        type="text"
                        name="endereco"                    
                        id="endereco"
                        required
                        placeholder="Ex: Av. Getúlio Vargas"
                        value={dados.endereco}
                        className="min-w-[400px] w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-start-4 col-end-5 p-2">
                        <label htmlFor="num" className="mx-2">Nº</label>
                        <input 
                        type="text"
                        name="num"                    
                        id="num"
                        required
                        value={dados.num}
                        className="min-w-[100px] w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-start-1 col-end-3 p-2">
                        <label htmlFor="bairro" className="mx-2">Bairro</label>
                        <input 
                        type="text"
                        name="bairro"                    
                        id="bairro"
                        required
                        value={dados.bairro}
                        className="min-w-[250px] w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-start-3 col-end-5 p-2">
                        <label htmlFor="cidade" className="mx-2">Cidade</label>
                        <input 
                        type="text"
                        name="cidade"
                        id="cidade"
                        required
                        value={dados.cidade}
                        className="min-w-[250px] w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col col-start-1 col-end-3 p-2">
                        <label htmlFor="estado" className="mx-2">Estado</label>
                        <EstadoSelect
                        value={dados.estado}
                        onChange={(value) => setDados(prev => ({ ...prev, estado: value }))}
                        />
                    </div>
                    <div className="flex flex-col col-start-3 col-end-5 p-2">
                        <label htmlFor="CEP" className="mx-2">CEP</label>
                        <input 
                        type="text"
                        name="CEP"
                        id="CEP"
                        required
                        value={dados.CEP}
                        className="min-w-[110px] w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full h-[100px] items-center justify-end">
                {error && <p className="text-red-700">{error}</p>}
                <button type="submit" onClick={handleSubmit} className="bg-blue-200 w-[200px] hover:bg-blue-100 active:bg-blue-300 transition duration-200 cursor-pointer p-2 shadow-md rounded-md">Próximo</button>
            </div>
        </form>
    );
}