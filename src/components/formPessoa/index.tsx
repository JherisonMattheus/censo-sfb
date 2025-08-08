'use client'
import { SetStateAction } from "react";

type Pessoa = {
    name: string;
    CPF: string;
    email: string;
    idade: number;
}

type Props = {
    dados: Pessoa[];
    setDados: React.Dispatch<SetStateAction<Pessoa[]>>
    MoradiaId: number | null;
    onVoltar: () => void;
}

export default function FormPessoa({ dados, setDados, MoradiaId, onVoltar }: Props) {
    
    return (
        <form action="">
            <div>
                <button
                type="button"
                onClick={onVoltar}
                className=""
                >
                    voltar
                </button>
            </div>
            <div>
                <button
                type="button"
                // onClick={}
                className=""
                >
                    Adicionar Nova Pessoa
                </button>
                <button
                type="submit"
                className=""
                >
                    Concluir
                </button>
            </div>
        </form>
    );
}