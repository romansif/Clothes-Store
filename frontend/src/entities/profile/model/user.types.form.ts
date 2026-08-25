export interface UserForm {
    name: string,
    surName: string,
    phone: string,
    companyName: string,
    publicPhone: string,
    email: string,
    oldPassword: string,
    newPassword: string,
}

export interface UserFormMessage {
    nameMessage: string,
    surNameMessage: string,
    phoneMessage: string,
    companyNameMessage: string,
    publicPhoneMessage: string,
    emailMessage: string,
    oldPasswordMessage: string,
    newPasswordMessage: string,
}

export interface UserFormErrors {
    nameError: boolean,
    surNameError: boolean,
    phoneError: boolean,
    companyNameError: boolean,
    publicPhoneError: boolean,
    emailError: boolean,
    oldPasswordError: boolean,
    newPasswordError: boolean,
}