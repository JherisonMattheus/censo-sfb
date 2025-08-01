
type Moradia = {
    num: string,
    endereco: string,
    bairro: string,
    cidade: string,
    estado: string,
    CEP: string,
};

type Props = {
    dados: Moradia;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    error?: string;
};

export default function FormMoradia({ dados, onChange, onSubmit, error }: Props) {
    return (
        <form onSubmit={onSubmit}>


            {error && <p className="text-red-700">{error}</p>}
            <button>Salvar</button>
        </form>
    );
}