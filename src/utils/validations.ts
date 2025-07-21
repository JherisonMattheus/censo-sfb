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