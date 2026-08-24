import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { checkoutForms } from "@/feature/checkout/model/checkout.forms.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { useCheckout } from "@/feature/checkout/lib/use-checkout.ts";
import { clearCheckoutForm } from "@/feature/checkout/lib/clear.checkout.ts";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";
import type { UserCheckoutAddress } from "@/feature/checkout/model/checkout.types.ts";

const { information } = checkoutForms();
const { openNotify, loading } = useBaseModals();
const { userAddresses, userAddress } = checkoutStore();
const { createInformationErrors } = useFormsErrors();
const { clearInformationForm } = clearCheckoutForm();
const { isChosenAddress, isChosenContactInfo, informationId } = useCheckout();

export const addressApi = () => {
    const getAddresses = async () => {
        loading.value = true;

        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/address/${userId}`, {
                method: "GET",
            });
            console.log(res);
            userAddresses.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user addresses:`, err);
        }
    };

    const getAddress = async () => {
        loading.value = true;

        const addressId = localStorage.getItem("addressId");
        try{
            const res = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
            console.log(res);
            userAddress.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user address:`, err);
        }
    };

    const useSavedContactInfo = (checkout: UserCheckoutAddress) => {
        informationId.value = checkout.id
        information.value.email = checkout.email
        information.value.phone = checkout.phone

        isChosenContactInfo.value = true;
    };

    const useSavedAddress = (checkout: UserCheckoutAddress) => {
        information.value.addressName = checkout.addressName;
        information.value.firstName = checkout.firstName
        information.value.lastName = checkout.lastName
        information.value.country = checkout.country
        information.value.stateRegion = checkout.stateRegion
        information.value.address = checkout.address
        information.value.city = checkout.city
        information.value.postalCode = String(checkout.postalCode)

        isChosenAddress.value = true;
    };

    const useInformation = async () => {
        const userId = localStorage.getItem("userId");
        try{
            if(!informationId.value){
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }
            const newAddress = await handler(`/address/${informationId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    userId: userId,
                    addressName: information.value.addressName,
                    email: information.value.email,
                    phone: information.value.phone,
                    firstName: information.value.firstName,
                    lastName: information.value.lastName,
                    country: information.value.country,
                    stateRegion: information.value.stateRegion,
                    address: information.value.address,
                    city: information.value.city,
                    postalCode: information.value.postalCode,
                })
            });
            userAddresses.value = newAddress;

            if(newAddress && newAddress.id) {
                localStorage.setItem("addressId", newAddress.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }
            await getAddresses();

            await openNotify('You have successfully added the shipping address.',
                'You will now be redirected to the shipping method selection page.', 'shipping');
            clearInformationForm();
        }catch(err){
            await openNotify('You must choose.',
                'What contact and address information should we use for delivery?', '');
            console.error(`Failed to create the new address:`, err);
        }
    }

    const addInformation = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const newAddress = await handler(`/address`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    addressName: information.value.addressName,
                    email: information.value.email,
                    phone: information.value.phone,
                    firstName: information.value.firstName,
                    lastName: information.value.lastName,
                    country: information.value.country,
                    stateRegion: information.value.stateRegion,
                    address: information.value.address,
                    city: information.value.city,
                    postalCode: information.value.postalCode,
                })
            });
            userAddresses.value = newAddress;

            if(newAddress && newAddress.id) {
                localStorage.setItem("addressId", newAddress.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }
            await getAddresses();

            await openNotify('You have successfully added the shipping address.',
                'You will now be redirected to the shipping method selection page.', 'shipping')
            clearInformationForm();
        }catch(err){
            createInformationErrors(err);
            console.error(`Failed to create the new address:`, err);
        }
    };

    const deleteAddress = async (id: string) => {
        try{
            await handler(`/address/${id}`, {
                method: "DELETE",
            });

            await getAddresses();
        }catch(err){
            console.error(`Failed to delete the user address:`, err);
        }
    };

    return {
        getAddresses,
        getAddress,

        useSavedContactInfo,
        useSavedAddress,
        useInformation,
        addInformation,

        deleteAddress,
    }

}