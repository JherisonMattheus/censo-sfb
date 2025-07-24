import { db } from "@/lib/db";
import { handlerError } from "@/utils/handlerError";
import axios from "axios";


export async function syncPessoas() {
    const pessoasNaoSincronizadas = await db.pessoa.where("synced").equals(0).toArray();

    let sucessoTotal = true;

    for (const pessoa of pessoasNaoSincronizadas) {
        try {
            const res = await axios.post("/api/pessoa", {
                name: pessoa.name,
                CPF: pessoa.CPF,
                email: pessoa.email,
                idade: pessoa.idade,
                criadoEm: pessoa.criadoEm,
            }
        );

        await db.pessoa.update(pessoa.id,{ synced: 1});

        } catch (error) {
            sucessoTotal = false;
            handlerError(error);
        }
    }

    if(sucessoTotal)
        await db.pessoa.where("synced").equals(1).delete();
}