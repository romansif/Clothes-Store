import { computed, ref } from "vue";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { checkoutForms } from "../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors } from "../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { shipping } = checkoutForms();
const { items, deliveryPrice } = productsStore();

const isDebitCard = ref(false);

const { userAddress, paymentMethod } = usersStore();
const { informationErrors } = checkoutErrors();
const { informationMessages } = checkoutForms();

export const useCheckout = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentMethod.value = method;
    }

    const closeCardForm = (method: string) => {
        isDebitCard.value = false;
        paymentMethod.value = method
    }

    const price = computed(() => {
        return items.value?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;
    });

    const commissionPrice = computed(() => {
        return Math.round(items.value?.reduce((sum: number) => sum + price.value, 0) * 0.03) || 0
    });

    const ship = computed(() => {
        if(shipping.value.delivery === 'express'){
            deliveryPrice.value = 15
        }else{
            deliveryPrice.value = 0
        }
        return deliveryPrice.value || 0;
    })

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value + ship.value
    });


    const firstNamePlaceholder = computed(() => {
        if(informationErrors.value.firstNameError){
            return informationMessages.value.firstNameMessage;
        }
        if(userAddress.value.firstName){
            return userAddress.value.firstName;
        }
        return informationMessages.value.firstNameMessage;
    })

    const lastNamePlaceholder = computed(() => {
        if(informationErrors.value.lastNameError){
            return informationMessages.value.lastNameMessage;
        }
        if(userAddress.value.lastName){
            return userAddress.value.lastName;
        }
        return informationMessages.value.lastNameMessage;
    })

    const countryPlaceholder = computed(() => {
        if(informationErrors.value.countryError){
            return informationMessages.value.countryMessage;
        }
        if(userAddress.value.country){
            return userAddress.value.country;
        }
        return informationMessages.value.countryMessage;
    })

    const statePlaceholder = computed(() => {
        if(informationErrors.value.stateRegionError){
            return informationMessages.value.stateRegionMessage;
        }
        if(userAddress.value.stateRegion){
            return userAddress.value.stateRegion;
        }
        return informationMessages.value.stateRegionMessage;
    })

    const addressPlaceholder = computed(() => {
        if(informationErrors.value.addressError){
            return informationMessages.value.addressMessage;
        }
        if(userAddress.value.address){
            return userAddress.value.address;
        }
        return informationMessages.value.addressMessage;
    })

    const cityPlaceholder = computed(() => {
        if(informationErrors.value.cityError){
            return informationMessages.value.cityMessage;
        }
        if(userAddress.value.city){
            return userAddress.value.city;
        }
        return informationMessages.value.cityMessage;
    })

    const postalCodePlaceholder = computed(() => {
        if(informationErrors.value.postalCodeError){
            return informationMessages.value.postalCodeMessage;
        }
        if(userAddress.value.postalCode){
            return String(userAddress.value.postalCode);
        }
        return informationMessages.value.postalCodeMessage;
    })

    return{
        openCardForm,
        closeCardForm,

        isDebitCard,
        price,
        commissionPrice,
        ship,
        totalPrice,

        firstNamePlaceholder,
        lastNamePlaceholder,
        countryPlaceholder,
        statePlaceholder,
        cityPlaceholder,
        addressPlaceholder,
        postalCodePlaceholder,
    }
}