export interface InformationForm {
    addressName: string
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: string,
}

export interface InformationFormErrorMessage {
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: string,
}

export interface InformationFormError {
    email: boolean,
    phone: boolean,
    firstName: boolean,
    lastName: boolean,
    country: boolean,
    stateRegion: boolean,
    address: boolean,
    city: boolean,
    postalCode: boolean,
}
