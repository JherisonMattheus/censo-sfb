import DelButton from "@/components/delButton";
import EditButton from "@/components/editButton";
import { headers } from "next/headers";


export default async function Detalhes({ params }: { params: Promise<{ id:string }>}) {
    const { id } = await params;
    
    const res = await fetch(`${process.env.API_URL}/api/pessoa/${id}`,{
        cache: "no-store",
        credentials: "include",
        headers: {
            Cookie: (await headers()).get('cookie') || '',
        }
    });

    const pessoa = await res.json();


    return (
        <div className="flex flex-1 items-center justify-center py-4 mx-4">
            <div className="flex flex-col items-center max-w-[1200px] w-full h-6/7 bg-white p-4 gap-2 shadow-lg rounded-xl">             

                <div className="flex flex-col flex-1 w-full bg-slate-100 text-lg p-4 shadow-lg rounded-xl">

                    <h1 className="text-3xl text-center font-bold mb-10 text-blue-500">Dados Detalhados</h1>

                    <div className="flex-1 px-6">
                        <div className="bg-slate-100 p-2 my-2">
                        <p><span className="text-gray-700 font-bold mr-2">Nome:</span>{pessoa.name}</p>
                        </div>

                        <div className="bg-slate-100 p-2 my-2">
                            <p><span className="text-gray-700 font-bold mr-2">CPF:</span>{pessoa.CPF}</p>
                        </div>

                        <div className="bg-slate-100 p-2 my-2">
                            <p><span className="text-gray-700 font-bold mr-2">Email:</span>{pessoa.email}</p>
                        </div>

                        <div className="bg-slate-100 p-2 my-2">
                            <p><span className="text-gray-700 font-bold mr-2">Idade:</span>{pessoa.idade}</p>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-6">
                        <EditButton id={pessoa.id}></EditButton>
                        <DelButton></DelButton>
                    </div>
                </div>
            </div>
        </div>
    )
}