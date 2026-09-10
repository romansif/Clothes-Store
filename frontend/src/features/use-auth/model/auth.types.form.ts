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
    validCode: string,
    role: string,
}

export interface RegisterFormMessage {
    nameMessage: string,
    surNameMessage: string,
    phoneMessage: string,
    emailMessage: string,
    passwordMessage: string,
}

export interface LoginFormMessage {
    emailMessage: string,
    passwordMessage: string,
    phoneMessage: string,
    validCodeMessage: string,
    roleMessage: string
}

export interface RegisterFormErrors {
    nameError: boolean,
    surNameError: boolean,
    phoneError: boolean,
    emailError: boolean,
    passwordError: boolean
}

export interface LoginFormErrors {
    emailError: boolean,
    passwordError: boolean,
    phoneError: boolean,
    validCodeError: boolean,
    roleError: boolean,
}


