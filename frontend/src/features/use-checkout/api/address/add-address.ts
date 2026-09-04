import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useCheckout } from "@/features/use-checkout/model/use-checkout.ts";
import { clearCheckoutForm } from "@/features/use-checkout/lib/clear.checkout.ts";
import type { UserCheckoutAddress } from "@/entities/checkout/model/checkout.types.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useGetAddress } from "@/features/use-checkout/api/address/get-address.ts";

const { userData } = userStore();
const { information } = checkoutForm();
const { openNotify } = useBaseModals();
const { getAddresses } = useGetAddress();
const { createInformationErrors } = useFormsErrors();
const { clearInformationForm } = clearCheckoutForm();
const { isChosenAddress, isChosenContactInfo, informationId } = useCheckout();

export const useAddAddress = () => {
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
        try{
            if(!informationId.value){
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }
            const newAddress = await handler(`/address/${informationId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    userId: userData.id,
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
            const newAddress = await handler(`/address`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
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

    return {
        useSavedContactInfo,
        useSavedAddress,
        useInformation,
        addInformation,
    }

}