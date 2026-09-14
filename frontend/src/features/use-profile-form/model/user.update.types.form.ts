export interface UserForm {
    name: string,
    surName: string,
    phone: string,
    email: string,
    oldPassword: string,
    newPassword: string,
}

export interface UserFormMessage {
    name: string,
    surName: string,
    phone: string,
    email: string,
    oldPassword: string,
    newPassword: string,
}

export interface UserFormErrors {
    name: boolean,
    surName: boolean,
    phone: boolean,
    email: boolean,
    oldPassword: boolean,
    newPassword: boolean,
}