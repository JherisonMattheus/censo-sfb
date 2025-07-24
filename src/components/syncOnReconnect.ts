"use client";

import { syncPessoas } from "@/services/syncPessoasOffline";
import { useEffect } from "react";


export function SyncOnReconnect() {
    useEffect(() => {
        const handleOnline = () => {
            console.log("Reconectando. Iniciando Sincronização...");
            syncPessoas();
        };

        if (navigator.onLine)
            syncPessoas();

        window.addEventListener("online", handleOnline);
        return () => window.removeEventListener("online", handleOnline);
    }, []);

    return null;
}