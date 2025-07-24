import Dexie from "dexie";


export interface Pessoa {
    id: number,
    name: string,
    CPF: string,
    email: string,
    idade: number,
    criadoEm: Date,
    synced: number,
}

export type PessoaInsert = Omit<Pessoa, "id">;

export class AppDB extends Dexie {
    pessoa: Dexie.Table<Pessoa, number>;

    constructor() {
        super("LocalDB");
    

    this.version(1).stores({
        pessoa: "++id, CPF, synced",
    });

    this.pessoa = this.table("pessoa");
    }
}


export const db = new AppDB();