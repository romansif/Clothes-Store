import {computed} from "vue";
import { informationFormErrorMessages } from "@/features/use-information/model/address.form.ts";
import { informationFormErrors } from "@/features/use-information/lib/address.errors.ts";
import { informationContactStore } from "@/features/use-information/model/address.store.ts";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";

const { currentCountry } = usePhoneForm();
const { userAddress } = informationContactStore();

export const useInformationFormInput = () => {
    const emailPlaceholder = computed(() => {
        if(informationFormErrors.value.emailError){
            return informationFormErrorMessages.value.emailMessage;
        }
        if(userAddress.value.email){
            return userAddress.value.email;
        }
        return informationFormErrorMessages.value.emailMessage = 'example@gmail.com';
    });

    const phonePlaceholder = computed(() => {
        if(informationFormErrors.value.phoneError){
            return informationFormErrorMessages.value.phoneMessage;
        }
        if(userAddress.value.phone){
            return userAddress.value.phone;
        }
        return informationFormErrorMessages.value.phoneMessage = currentCountry.value?.placeholder ?? '';
    });

    const firstNamePlaceholder = computed(() => {
        if(informationFormErrors.value.firstNameError){
            return informationFormErrorMessages.value.firstNameMessage;
        }
        if(userAddress.value.firstName){
            return userAddress.value.firstName;
        }
        return informationFormErrorMessages.value.firstNameMessage = 'FirstName';
    });

    const lastNamePlaceholder = computed(() => {
        if(informationFormErrors.value.lastNameError){
            return informationFormErrorMessages.value.lastNameMessage;
        }
        if(userAddress.value.lastName){
            return userAddress.value.lastName;
        }
        return informationFormErrorMessages.value.lastNameMessage = 'LastName';
    });

    const countryPlaceholder = computed(() => {
        if(informationFormErrors.value.countryError){
            return informationFormErrorMessages.value.countryMessage;
        }
        if(userAddress.value.country){
            return userAddress.value.country;
        }
        return informationFormErrorMessages.value.countryMessage = 'Country';
    });

    const statePlaceholder = computed(() => {
        if(informationFormErrors.value.stateRegionError){
            return informationFormErrorMessages.value.stateRegionMessage;
        }
        if(userAddress.value.stateRegion){
            return userAddress.value.stateRegion;
        }
        return informationFormErrorMessages.value.stateRegionMessage = 'State/Region';
    });

    const addressPlaceholder = computed(() => {
        if(informationFormErrors.value.addressError){
            return informationFormErrorMessages.value.addressMessage;
        }
        if(userAddress.value.address){
            return userAddress.value.address;
        }
        return informationFormErrorMessages.value.addressMessage = 'Address';
    });

    const cityPlaceholder = computed(() => {
        if(informationFormErrors.value.cityError){
            return informationFormErrorMessages.value.cityMessage;
        }
        if(userAddress.value.city){
            return userAddress.value.city;
        }
        return informationFormErrorMessages.value.cityMessage = 'City';
    });

    const postalCodePlaceholder = computed(() => {
        if(informationFormErrors.value.postalCodeError){
            return informationFormErrorMessages.value.postalCodeMessage;
        }
        if(userAddress.value.postalCode){
            return String(userAddress.value.postalCode);
        }
        return informationFormErrorMessages.value.postalCodeMessage = 'Postal Code';
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