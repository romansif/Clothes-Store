export interface RegisterForm {
    name: string,
    surName: string,
    phone: string,
    email: string,
    password: string
}

export interface LoginForm {
    email: string,
    password: string,
    phone: string,
    role: string,
}

export interface RegisterFormErrorMessage {
    name: string,
    surName: string,
    phone: string,
    email: string,
    password: string,
}

export interface LoginFormErrorMessage {
    email: string,
    password: string,
    phone: string,
    role: string
}

export interface RegisterFormErrors {
    name: boolean,
    surName: boolean,
    phone: boolean,
    email: boolean,
    password: boolean
}

export interface LoginFormErrors {
    email: boolean,
    password: boolean,
    phone: boolean,
    role: boolean,
}


