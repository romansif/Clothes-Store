import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useCheckout } from "@/features/use-checkout/lib/use-checkout.ts";
import { informationForm } from "@/features/use-information/model/address.form.ts";
import { clearInformationForm } from "@/features/use-information/lib/clear.address.ts";
import { type UserContactInfo } from "@/features/use-information/model/address.types.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetAddress } from "@/features/use-information/api/get-address.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { getAddresses } = useGetAddress();
const { createInformationErrors } = useFormsErrors();
const { isChosenAddress, isChosenContactInfo, informationId } = useCheckout();

export const useAddAddress = () => {
    const useSavedContactInfo = (info: UserContactInfo) => {
        informationId.value = info.id
        informationForm.value.email = info.email
        informationForm.value.phone = info.phone

        isChosenContactInfo.value = true;
    };

    const useSavedAddress = (info: UserContactInfo) => {
        informationForm.value.addressName = info.addressName;
        informationForm.value.firstName = info.firstName
        informationForm.value.lastName = info.lastName
        informationForm.value.country = info.country
        informationForm.value.stateRegion = info.stateRegion
        informationForm.value.address = info.address
        informationForm.value.city = info.city
        informationForm.value.postalCode = String(info.postalCode)

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
                    addressName: informationForm.value.addressName,
                    email: informationForm.value.email,
                    phone: informationForm.value.phone,
                    firstName: informationForm.value.firstName,
                    lastName: informationForm.value.lastName,
                    country: informationForm.value.country,
                    stateRegion: informationForm.value.stateRegion,
                    address: informationForm.value.address,
                    city: informationForm.value.city,
                    postalCode: informationForm.value.postalCode,
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
                    addressName: informationForm.value.addressName,
                    email: informationForm.value.email,
                    phone: informationForm.value.phone,
                    firstName: informationForm.value.firstName,
                    lastName: informationForm.value.lastName,
                    country: informationForm.value.country,
                    stateRegion: informationForm.value.stateRegion,
                    address: informationForm.value.address,
                    city: informationForm.value.city,
                    postalCode: informationForm.value.postalCode,
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