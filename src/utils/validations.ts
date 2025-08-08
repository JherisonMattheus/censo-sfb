import { cpf } from "cpf-cnpj-validator"

export function isValidName(name: string): boolean {
    return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
}

export function isValidCPF(CPF: string): boolean {
    return cpf.isValid(CPF);
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /d/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}

export function isValidAge(age: number): boolean {
    return age >= 0 && age <= 130;
}

export function isValidEndereco(endereco: string): boolean {
    return /^[A-Za-zÀ-ÿ0-9\s\.\-\,']{2,100}$/.test(endereco);
}

export function isValidNum(num: string): boolean {
    return /^\d+[A-Za-z\-\/\s]*$/.test(num);
}

export function isValidEstado(estado: string): boolean {
    return /^(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)$/.test(estado);
}

export function isValidCEP(CEP: string): boolean {
    return /^\d{5}-\d{3}$/.test(CEP);
}