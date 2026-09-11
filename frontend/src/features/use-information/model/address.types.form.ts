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
    emailMessage: string,
    phoneMessage: string,
    firstNameMessage: string,
    lastNameMessage: string,
    countryMessage: string,
    stateRegionMessage: string,
    addressMessage: string,
    cityMessage: string,
    postalCodeMessage: string,
}

export interface InformationFormError {
    emailError: boolean,
    phoneError: boolean,
    firstNameError: boolean,
    lastNameError: boolean,
    countryError: boolean,
    stateRegionError: boolean,
    addressError: boolean,
    cityError: boolean,
    postalCodeError: boolean,
}
