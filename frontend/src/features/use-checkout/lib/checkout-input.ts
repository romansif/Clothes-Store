import { computed } from "vue";
import { usePhoneForm } from "@/shared/masks/use.phone.form.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";

const { userAddress } = checkoutStore();
const { currentCountry } = usePhoneForm();
const { informationErrors, paymentErrors } = checkoutErrors();
const { informationMessages, payment, paymentMessages } = checkoutForm();

export const checkoutInput = () => {
    const emailPlaceholder = computed(() => {
        if(informationErrors.value.emailError){
            return informationMessages.value.emailMessage;
        }
        if(userAddress.value.email){
            return userAddress.value.email;
        }
        return informationMessages.value.emailMessage = 'example@gmail.com';
    });

    const phonePlaceholder = computed(() => {
        if(informationErrors.value.phoneError){
            return informationMessages.value.phoneMessage;
        }
        if(userAddress.value.phone){
            return userAddress.value.phone;
        }
        return informationMessages.value.phoneMessage = currentCountry.value?.placeholder ?? '';
    });

    const firstNamePlaceholder = computed(() => {
        if(informationErrors.value.firstNameError){
            return informationMessages.value.firstNameMessage;
        }
        if(userAddress.value.firstName){
            return userAddress.value.firstName;
        }
        return informationMessages.value.firstNameMessage = 'FirstName';
    });

    const lastNamePlaceholder = computed(() => {
        if(informationErrors.value.lastNameError){
            return informationMessages.value.lastNameMessage;
        }
        if(userAddress.value.lastName){
            return userAddress.value.lastName;
        }
        return informationMessages.value.lastNameMessage = 'LastName';
    });

    const countryPlaceholder = computed(() => {
        if(informationErrors.value.countryError){
            return informationMessages.value.countryMessage;
        }
        if(userAddress.value.country){
            return userAddress.value.country;
        }
        return informationMessages.value.countryMessage = 'Country';
    });

    const statePlaceholder = computed(() => {
        if(informationErrors.value.stateRegionError){
            return informationMessages.value.stateRegionMessage;
        }
        if(userAddress.value.stateRegion){
            return userAddress.value.stateRegion;
        }
        return informationMessages.value.stateRegionMessage = 'State/Region';
    });

    const addressPlaceholder = computed(() => {
        if(informationErrors.value.addressError){
            return informationMessages.value.addressMessage;
        }
        if(userAddress.value.address){
            return userAddress.value.address;
        }
        return informationMessages.value.addressMessage = 'Address';
    });

    const cityPlaceholder = computed(() => {
        if(informationErrors.value.cityError){
            return informationMessages.value.cityMessage;
        }
        if(userAddress.value.city){
            return userAddress.value.city;
        }
        return informationMessages.value.cityMessage = 'City';
    });

    const postalCodePlaceholder = computed(() => {
        if(informationErrors.value.postalCodeError){
            return informationMessages.value.postalCodeMessage;
        }
        if(userAddress.value.postalCode){
            return String(userAddress.value.postalCode);
        }
        return informationMessages.value.postalCodeMessage = 'Postal Code';
    });

    const cardNumberPlaceholder = computed(() => {
        if(paymentErrors.value.cardNumberError){
            return paymentMessages.value.cardNumberMessage;
        }
        if(payment.value.cardNumber){
            return payment.value.cardNumber;
        }
        return paymentMessages.value.cardNumberMessage = 'XXXX-XXXX-XXXX-XXXX';
    });

    const expiryDatePlaceholder = computed(() => {
        if(paymentErrors.value.expiryDateError){
            return paymentMessages.value.expiryDateMessage;
        }
        if(payment.value.expiryDate){
            return payment.value.expiryDate;
        }
        return paymentMessages.value.expiryDateMessage = 'MM / YY';
    });

    const cardCvvPlaceholder = computed(() => {
        if(paymentErrors.value.cardCvvError){
            return paymentMessages.value.cardCvvMessage;
        }
        if(payment.value.cardCvv){
            return String(payment.value.cardCvv);
        }
        return paymentMessages.value.cardCvvMessage = '•••';
    });

    return {
        emailPlaceholder,
        phonePlaceholder,
        firstNamePlaceholder,
        lastNamePlaceholder,
        countryPlaceholder,
        statePlaceholder,
        cityPlaceholder,
        addressPlaceholder,
        postalCodePlaceholder,

        cardNumberPlaceholder,
        expiryDatePlaceholder,
        cardCvvPlaceholder,
    }
}