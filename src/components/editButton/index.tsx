import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function EditButton({ id }: { id: string}) {
    return (
        <Link href={`/dashboard/${id}/edit`} className="flex gap-1 p-1 hover:text-blue-400 active:text-blue-700 transition duration-200">
            <PencilSquareIcon className="w-6 h-6"></PencilSquareIcon> Editar
        </Link>
    )
}