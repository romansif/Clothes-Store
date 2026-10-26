export interface LoginForm {
    email: string,
    password: string,
    phone: string,
    role: string,
}

export interface LoginFormErrorMessage {
    email: string,
    password: string,
    phone: string,
    role: string
}

export interface SignSection {
    signIn: boolean,
}
