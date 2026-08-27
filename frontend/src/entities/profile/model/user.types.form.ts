export interface UserForm {
    name: string,
    surName: string,
    phone: string,
    email: string,
    oldPassword: string,
    newPassword: string,
}

export interface UserFormMessage {
    nameMessage: string,
    surNameMessage: string,
    phoneMessage: string,
    emailMessage: string,
    oldPasswordMessage: string,
    newPasswordMessage: string,
}

export interface UserFormErrors {
    nameError: boolean,
    surNameError: boolean,
    phoneError: boolean,
    emailError: boolean,
    oldPasswordError: boolean,
    newPasswordError: boolean,
}