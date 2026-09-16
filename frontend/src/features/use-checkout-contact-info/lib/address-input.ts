import { computed } from "vue";
import {
    informationFormErrorMessages, informationFormErrors
} from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";

const { currentCountry } = usePhoneForm();
const { userAddress } = informationContactStore();

export const useInformationFormInput = () => {
    const emailPlaceholder = computed(() => {
        if(informationFormErrors.value.email){
            return informationFormErrorMessages.value.email;
        }
        if(userAddress.value.email){
            return userAddress.value.email;
        }
        return informationFormErrorMessages.value.email = 'example@gmail.com';
    });

    const phonePlaceholder = computed(() => {
        if(informationFormErrors.value.phone){
            return informationFormErrorMessages.value.phone;
        }
        if(userAddress.value.phone){
            return userAddress.value.phone;
        }
        return informationFormErrorMessages.value.phone = currentCountry.value?.placeholder ?? '';
    });

    const firstNamePlaceholder = computed(() => {
        if(informationFormErrors.value.firstName){
            return informationFormErrorMessages.value.firstName;
        }
        if(userAddress.value.firstName){
            return userAddress.value.firstName;
        }
        return informationFormErrorMessages.value.firstName = 'FirstName';
    });

    const lastNamePlaceholder = computed(() => {
        if(informationFormErrors.value.lastName){
            return informationFormErrorMessages.value.lastName;
        }
        if(userAddress.value.lastName){
            return userAddress.value.lastName;
        }
        return informationFormErrorMessages.value.lastName = 'LastName';
    });

    const countryPlaceholder = computed(() => {
        if(informationFormErrors.value.country){
            return informationFormErrorMessages.value.country;
        }
        if(userAddress.value.country){
            return userAddress.value.country;
        }
        return informationFormErrorMessages.value.country = 'Country';
    });

    const statePlaceholder = computed(() => {
        if(informationFormErrors.value.stateRegion){
            return informationFormErrorMessages.value.stateRegion;
        }
        if(userAddress.value.stateRegion){
            return userAddress.value.stateRegion;
        }
        return informationFormErrorMessages.value.stateRegion = 'State/Region';
    });

    const addressPlaceholder = computed(() => {
        if(informationFormErrors.value.address){
            return informationFormErrorMessages.value.address;
        }
        if(userAddress.value.address){
            return userAddress.value.address;
        }
        return informationFormErrorMessages.value.address = 'Address';
    });

    const cityPlaceholder = computed(() => {
        if(informationFormErrors.value.city){
            return informationFormErrorMessages.value.city;
        }
        if(userAddress.value.city){
            return userAddress.value.city;
        }
        return informationFormErrorMessages.value.city = 'City';
    });

    const postalCodePlaceholder = computed(() => {
        if(informationFormErrors.value.postalCode){
            return informationFormErrorMessages.value.postalCode;
        }
        if(userAddress.value.postalCode){
            return String(userAddress.value.postalCode);
        }
        return informationFormErrorMessages.value.postalCode = 'Postal Code';
    });

    return {
        emailPlaceholder,
        phonePlaceholder,
        firstNamePlaceholder,
        lastNamePlaceholder,
        countryPlaceholder,
        statePlaceholder,
        addressPlaceholder,
        cityPlaceholder,
        postalCodePlaceholder,
    }
}