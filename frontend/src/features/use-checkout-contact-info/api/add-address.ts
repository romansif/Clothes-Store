import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearInformationForm } from "@/features/use-checkout-contact-info/lib/clear-address";
import { userStore } from "@/features/use-profile/model/user.store";
import { useGetAddress } from "@/features/use-user-address/api/get-address";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-contact-info/model/information-form";
import { addContactInfoSchema } from "@/entities/checkout-contact-info/model/information-schemas";
import type { UserContactInfo } from "@/entities/checkout-contact-info";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { getAddresses } = useGetAddress();
const { isChosenAddress, isChosenContactInfo, informationId } = toggleInformation();

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
        if(!userData.value) return

        try{
            if(!informationId.value){
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }
            const newAddress = await handler(`/address/${informationId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    userId: userData.value.id,
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

            await openNotify('You have successfully added the shipping address',
                'You will now be redirected to the shipping method selection page');
            await router.push({name: 'shipping'})

            clearInformationForm();
        }catch(err){
            await openNotify('You must choose.',
                'What contact and address information should we use for delivery?');
            console.error(`Failed to create the new address:`, err);
        }
    }

    const addInformation = async () => {
        const result = addContactInfoSchema.safeParse(informationForm.value);
        if(!result.success){
            applyZodErrors(
                result.error,
                informationFormErrorMessages
            );
            return
        }

        try{
            if(!userData.value) return

            const newAddress = await handler(`/address`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.value.id,
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

            await openNotify('You have successfully added the shipping address',
                'You will now be redirected to the shipping method selection page')
            await router.push({name: 'shipping'})

            clearInformationForm();
        }catch(err){
            applyErrors(
                err,
                informationFormErrorMessages
            );
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