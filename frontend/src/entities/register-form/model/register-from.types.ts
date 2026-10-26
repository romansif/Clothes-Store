export type Role = 'Buyer' | 'Seller';

export interface RegisterForm {
    name: string,
    surName: string,
    phone: string,
    email: string,
    password: string
}

export interface RegisterFormErrorMessage {
    name: string,
    surName: string,
    phone: string,
    email: string,
    password: string,
}