'use client'

import FormMoradia from "@/components/formMoradia";
import FormPessoa from "@/components/formPessoa";
import { AppError } from "@/utils/AppError";
import { useState } from "react";

type Moradia = {
    id?: number,
    num: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    CEP: string,
};

type Pessoa = {
    name: string;
    CPF: string;
    email: string;
    idade: number;
}

export default function Add() {

    const [formStatus, setFormStatus] = useState<'moradia' | 'pessoa'>('moradia');
    const [idMoradia, setIdMoradia] = useState<number | null>(null);
    const [isCreate, setIsCreate] = useState(false);
    const [dadosMoradia, setDadosMoradia] = useState<Moradia>({
        num: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: 'MA',
        CEP: '',
    });
    const [dadosPessoas, setDadosPessoas] = useState<Pessoa[]>([{
        name: '',
        CPF: '',
        email: '',
        idade: 0,
    }]);

    const handleMoradiaSucess = (dataMoradia: Moradia) => {

        console.log(dataMoradia)
        if(!dataMoradia.id)
            throw new AppError("ID não encontrada", 404);
        
        setIdMoradia(dataMoradia.id);
        setDadosMoradia(dataMoradia)
        setFormStatus('pessoa');
        setIsCreate(true);

    }

    const handleVolta = () => {
        setFormStatus('moradia');
    }
    
    return (
        <div className="flex flex-1 items-center justify-center py-4 mx-4">
            <div className="flex flex-col items-center max-w-[1200px] w-full h-6/7 bg-white p-4 gap-2 shadow-lg rounded-xl">
                <div className="flex flex-col flex-1 w-full bg-slate-100 text-lg p-4 shadow-lg rounded-xl">
                    {
                        formStatus === 'moradia' && 
                        <FormMoradia
                        isCreate={isCreate}
                        setDados={setDadosMoradia}
                        dados={dadosMoradia}
                        onSucess={handleMoradiaSucess}
                        />
                    }
                    {
                        formStatus === 'pessoa' &&
                        <FormPessoa
                        dados={dadosPessoas}
                        setDados={setDadosPessoas}
                        MoradiaId={idMoradia}
                        onVoltar={handleVolta}
                        />
                    }
                </div>
            </div>
        </div>
    );
}