import {ApiError} from "@/shared/api/http.ts";
import {informationFormErrors} from "@/features/use-checkout-contact-info/model/address.errors.ts";
import {informationFormErrorMessages} from "@/features/use-checkout-contact-info/model/address.form.ts";

export const createInformationErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    informationFormErrors.value.email = !!errors.email;
    informationFormErrors.value.phone = !!errors.phone;
    informationFormErrors.value.firstName = !!errors.firstName;
    informationFormErrors.value.lastName = !!errors.lastName;
    informationFormErrors.value.country = !!errors.country;
    informationFormErrors.value.stateRegion = !!errors.stateRegion;
    informationFormErrors.value.address = !!errors.address;
    informationFormErrors.value.city = !!errors.city;
    informationFormErrors.value.postalCode = !!errors.postalCode;

    informationFormErrorMessages.value.email = errors.email || '';
    informationFormErrorMessages.value.phone = errors.phone || '';
    informationFormErrorMessages.value.firstName = errors.firstName || '';
    informationFormErrorMessages.value.lastName = errors.lastName || '';
    informationFormErrorMessages.value.country = errors.country || '';
    informationFormErrorMessages.value.stateRegion = errors.stateRegion || '';
    informationFormErrorMessages.value.address = errors.address || '';
    informationFormErrorMessages.value.city = errors.city || '';
    informationFormErrorMessages.value.postalCode = errors.postalCode || '';
};