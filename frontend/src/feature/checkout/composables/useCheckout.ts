import router  from "@/app/router";
import { computed, ref } from "vue";
import { usePhoneForm } from "@/shared/mask-forms/usePhoneForm.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useUpdateProduct } from "@/feature/products/composables/useUpdateProduct.ts";
import { checkoutForms } from "@/shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors } from "@/shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { items, deliveryPrice } = productsStore();

const isDebitCard = ref(false);

const { currentCountry } = usePhoneForm();
const { informationErrors, paymentErrors } = checkoutErrors();
const { updateCartChecked } = useUpdateProduct();
const { userAddress, paymentMethod } = usersStore();
const { shipping, informationMessages, payment, paymentMessages } = checkoutForms();

export const useCheckout = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentMethod.value = method;
        paymentErrors.value.paymentMethodError = false
    };

    const closeCardForm = (method: string) => {
        isDebitCard.value = false;
        paymentMethod.value = method
    };

    const goBack = async () => {
        router.back();
        await updateCartChecked()
    };

    const price = computed(() => {
        return items.value?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;
    });

    const commissionPrice = computed(() => {
        return Math.round(items.value?.reduce((sum: number) => sum + price.value, 0) * 0.03) || 0
    });

    const ship = computed(() => {
        if(shipping.value.delivery === 'express'){
            deliveryPrice.value = 15;
        }else{
            deliveryPrice.value = 0;
        }
        return deliveryPrice.value || 0;
    });

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value + ship.value
    });


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

    return{
        openCardForm,
        closeCardForm,

        goBack,

        isDebitCard,
        price,
        commissionPrice,
        ship,
        totalPrice,

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