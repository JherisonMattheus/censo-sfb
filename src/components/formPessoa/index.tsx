
type Props = {
    MoradiaId: number | null;
    onVoltar: () => void;
}

export default function FormPessoa({ MoradiaId, onVoltar }: Props) {
    
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