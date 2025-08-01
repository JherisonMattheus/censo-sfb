import EditForm from "@/components/editForm";
import { headers } from "next/headers";


export default async function Edit({ params }: { params: Promise<{ id: string}>}) {
    const { id } = await params;
    const numbID = Number(id);

    const res = await fetch(`${process.env.API_URL}/api/pessoa/${numbID}`, {
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            Cookie: (await headers()).get('cookie') || '',
        }
    });

    const pessoa = await res.json();
    
    return (
        <div className="flex flex-1 items-center justify-center py-4 mx-4">
            <div className="flex flex-col items-center max-w-[1200px] w-full h-6/7 bg-white p-4 gap-2 shadow-lg rounded-xl">             

                <div className="flex flex-col flex-1 w-full bg-slate-100 text-lg p-4 shadow-lg rounded-xl">

                    <h1 className="text-3xl text-center font-bold mb-20 text-blue-500">Editar Dados</h1>

                    <EditForm pessoa={pessoa}></EditForm>
                </div>
            </div>
        </div>
    )
}