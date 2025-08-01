'use client'

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"

export default function DelButton() {
    return (
        <button className="flex cursor-pointer gap-1 p-1 hover:text-red-500 active:text-red-700 transition duration-200">
            <TrashIcon className="w-6 h-6"></TrashIcon> Excluir
        </button>
    )
}

