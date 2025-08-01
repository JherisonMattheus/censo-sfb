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

export interface Moradia {
    id: number,
    endereco: string,
    bairro: string,
    numero: string,
    criadoEm: Date,
    synced: number,
}

export type PessoaInsert = Omit<Pessoa, "id">;

export class AppDB extends Dexie {
    pessoa: Dexie.Table<Pessoa, number>;
    moradia: Dexie.Table<Moradia, number>;

    constructor() {
        super("LocalDB");
    

    this.version(1).stores({
        pessoa: "++id, CPF, synced",
    });

    this.pessoa = this.table("pessoa");
    }
}


export const db = new AppDB();