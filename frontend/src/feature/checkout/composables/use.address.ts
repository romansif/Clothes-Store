import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { checkout } from "@/feature/checkout/composables/checkout.ts";

const { openNotify } = useBaseModals();
const { information } = checkoutForms();
const { userAddresses, userAddress } = usersStore();
const { createInformationErrors } = useFormsErrors();
const { isChosenAddress, isChosenContactInfo, informationId } = checkout();

export const useAddress = () => {
    const getAddresses = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const addresses = await handler(`/address/${userId}`, {
                method: "GET",
            });
            userAddresses.value = addresses;
        }catch(err){
            console.error(`Failed to get the user addresses:`, err);
        }
    };

    const getAddress = async () => {
        const addressId = localStorage.getItem("addressId");
        try{
            const address = await handler(`/address/item/${addressId}`, {
                method: "GET",
            });
            userAddress.value = address;
        }catch(err){
            console.error(`Failed to get the user address:`, err);
        }
    };

    const useSavedContactInfo = (email: string, phone: string, id: string) => {
        informationId.value = id
        information.value.email = email
        information.value.phone = phone

        isChosenContactInfo.value = true;
    };

    const useSavedAddress = (
        name: string, firstName: string, lastName: string, country: string,
        state: string, address: string, city: string, code: number) => {

        information.value.addressName = name
        information.value.firstName = firstName
        information.value.lastName = lastName
        information.value.country = country
        information.value.stateRegion = state
        information.value.address = address
        information.value.city =  city
        information.value.postalCode = String(code)

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
                'You will now be redirected to the shipping method selection page.', 'shipping')
        }catch(err){
            await openNotify('You must choose.',
                'What contact and address information should we use for delivery?', '')
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