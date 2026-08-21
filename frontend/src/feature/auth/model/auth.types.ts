export interface BuyerRegisterForm {
    name: string,
    surName: string,
    privatePhone: string,
    email: string,
    password: string
}

export interface SellerRegisterForm {
    name: string,
    surName: string,
    companyName: string,
    publicPhone: string,
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
    privatePhoneMessage: string,
    companyNameMessage: string,
    publicPhoneMessage: string,
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
    privatePhoneError: boolean,
    companyNameError: boolean,
    publicPhoneError: boolean,
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

export interface AuthPassword {
    password: boolean
}

export interface SignSection {
    signIn: boolean,
    signUp: boolean,
}


