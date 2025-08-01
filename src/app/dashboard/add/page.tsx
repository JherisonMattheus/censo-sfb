'use client'

import FormMoradia from "@/components/formMoradia";
import FormPessoa from "@/components/formPessoa";
import axios from "axios";
import { useState } from "react";

type Moradia = {
    num: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    CEP: string,
};

export default function Add() {

    const estados = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
        'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
        'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
    ];

    const [error, setError] = useState('');
    const [formStatus, setFormStatus] = useState<'moradia' | 'pessoa'>('moradia');
    const [idMoradia, setIdMoradia] = useState<number | null>(null);
    const [dadosMoradia, setDadosMoradia] = useState<Moradia>({
        num: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: 'MA',
        CEP: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDadosMoradia((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/moradia', dadosMoradia, {
                withCredentials: true,
            })

            setIdMoradia(res.data.moradia.id);
            setFormStatus('pessoa');

        } catch (error: any) {
            setError(error);
        }
    }

    const handleVolta = () => {

    }
    
    return (
        <div className="flex flex-1 items-center justify-center py-4 mx-4">
            <div className="flex flex-col items-center max-w-[1200px] w-full h-6/7 bg-white p-4 gap-2 shadow-lg rounded-xl">
                <div className="flex flex-col flex-1 w-full bg-slate-100 text-lg p-4 shadow-lg rounded-xl">
                    {
                        formStatus === 'moradia' && 
                        <FormMoradia
                            dados={dadosMoradia}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            error={error}
                        />
                    }
                    {
                        formStatus === 'pessoa' &&
                        <FormPessoa
                        MoradiaId={idMoradia}
                        onVoltar={handleVolta}
                        />
                    }
                </div>
            </div>
        </div>
    );
}