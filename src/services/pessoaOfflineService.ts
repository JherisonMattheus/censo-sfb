import { db, type PessoaInsert } from "@/lib/db";


export async function salvarPessoaOffline(pessoa: PessoaInsert) {
    const now = new Date();

    await db.pessoa.add({
        ...pessoa,
        criadoEm: now,
        synced: 0,
    } as any);
}