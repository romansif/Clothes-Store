import router from "../../../app/router";
import { useGetProfile } from "./getProfile.ts";
import { ApiError, handler } from "../../../shared/api/http.ts";
import { useAddProducts } from "../../products/composables/useAddProducts.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";
import { userForms } from "../../../shared/composables/forms-composables/forms/users.forms.ts";
import { userFormsErrors } from "../../../shared/composables/forms-composables/forms-errors/users.errors.ts";
import { clearUsersForms } from "../../../shared/composables/forms-composables/clear-forms/clear.users.ts";
import { checkoutErrors } from "../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";
import { checkoutForms } from "../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { clearCheckoutForm } from "../../../shared/composables/forms-composables/clear-forms/clear.checkout.ts";
import { useProductsModals } from "../../../shared/composables/modals/products/productsModals.ts";

const { addOrder } = useAddProducts();
const { getAddresses, getPayments } = useGetProfile();
const { openNotify } = useProductsModals();
const { user, paymentMethod, userAddresses, userPayments } = usersStore();
const { clearInformationForm } = clearCheckoutForm();
const {
    updateUserName, updateUserFormNameMessage,
    updateUserEmail, updateUserFormEmailMessage,
    updateUserPhone, updateUserFormPhoneMessage,
    updateUserSurName, updateUserFormSurNameMessage,
    updateUserPassword, updateUserFormPasswordMessages,
    updateUserCompanyName, updateUserFormCompanyNameMessage,
    updateUserFormPublicPhone, updateUserFormPublicPhoneMessage,
} = userForms();
const {
    clearUpdateUserFormPublicPhone,
    clearUpdateUserFormPhone, clearUpdateUserFormEmail,
    clearUpdateUserFormName, clearUpdateUserFormSurName,
    clearUpdateUserFormPassword, clearUpdateUserFormCompanyName,
} = clearUsersForms();
const {
    updateUserPasswordErrors,
    updateUserNameErrors, updateUserSurNameErrors,
    updateUserPhoneErrors, updateUserFormCompanyNameErrors,
    updateUserFormPublicPhoneErrors, updateUserEmailErrors
} = userFormsErrors()

const { informationErrors, shippingErrors, paymentErrors } = checkoutErrors();
const { information, informationMessages, shipping, shippingMessages, payment, paymentMessages } = checkoutForms();

export const useProfile = () => {
    const updateAvatarAccount = async (event: Event) => {
        const userId = localStorage.getItem("userId");

        const target = event.target as HTMLInputElement;
        if(!target.files || target.files.length === 0) return
        const selectedFile = target.files[0]

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try{
            const newAvatar = await handler(`/users/avatar/${userId}`, {
                method: "PATCH",
                body: formData,
            })
            user.value.avatarUrl = newAvatar.avatarUrl
        }catch(err){
            console.log('Failed to change the avatar', err)
        }
    };

    const updateNameAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateName = await handler(`/users/name/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: updateUserName.value.name,
                })
            });
            user.value.name = updateName.name;
            clearUpdateUserFormName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserNameErrors.value.nameError = !!errors.name;
                    updateUserFormNameMessage.value.nameMessage = errors.name || '';
                }
            }
            console.log('Не удалось обновить данные пользователя')
        }
    };

    const updateSurNameAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateSurName = await handler(`/users/surName/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    surName: updateUserSurName.value.surName,
                })
            })
            user.value.surName = updateSurName.surName
            clearUpdateUserFormSurName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserSurNameErrors.value.surNameError = !!errors.surName;
                    updateUserFormSurNameMessage.value.surNameMessage = errors.surName || '';
                }
            }
        }
    };

    const updatePhoneAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePhone = await handler(`/users/phone/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    privatePhone: updateUserPhone.value.phone,
                })
            })
            user.value.privatePhone = updatePhone.privatePhone
            clearUpdateUserFormPhone()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserPhoneErrors.value.phoneError = !!errors.phone;
                    updateUserFormPhoneMessage.value.phoneMessage = errors.phone || '';
                }
            }
        }
    };

    const updateCompanyName = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateCompanyName = await handler(`/users/company/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    companyName: updateUserCompanyName.value.companyName,
                })
            })
            user.value.companyName = updateCompanyName.companyName
            clearUpdateUserFormCompanyName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserFormCompanyNameErrors.value.companyNameError = !!errors.companyName;
                    updateUserFormCompanyNameMessage.value.companyNameMessage = errors.companyName || '';
                }
            }
        }
    };

    const updatePublicPhoneAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePublic = await handler(`/users/public/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    publicPhone: updateUserFormPublicPhone.value.publicPhone,
                })
            })
            user.value.publicPhone = updatePublic.publicPhone
            clearUpdateUserFormPublicPhone()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserFormPublicPhoneErrors.value.publicPhoneError = !!errors.publicPhone;
                    updateUserFormPublicPhoneMessage.value.publicPhoneMessage = errors.publicPhone || '';
                }
            }
        }
    };

    const updateEmailAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateEmail = await handler(`/users/email/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    email: updateUserEmail.value.email,
                })
            })
            user.value.email = updateEmail.email
            clearUpdateUserFormEmail()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserEmailErrors.value.emailError = !!errors.email;
                    updateUserFormEmailMessage.value.emailMessage = errors.email || '';
                }
            }
        }
    };

    const updatePasswordAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePassword = await handler(`/users/password/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserPassword.value.oldPassword,
                    newPassword: updateUserPassword.value.newPassword,
                })
            });
            user.value.password = updatePassword.password;
            clearUpdateUserFormPassword();
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserPasswordErrors.value.oldPasswordError = !!errors.oldPassword;
                    updateUserPasswordErrors.value.newPasswordError = !!errors.newPassword;

                    updateUserFormPasswordMessages.value.oldPasswordMessage = errors.oldPassword || '';
                    updateUserFormPasswordMessages.value.newPasswordMessage = errors.newPassword || '';
                }
            }
        }
    };

    const addAddress = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const newAddress = await handler(`/checkout/address`, {
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

            await getAddresses();

            if(newAddress && newAddress.id) {
                localStorage.setItem("addressId", newAddress.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }

            openNotify('You have successfully added the shipping address.',
                'You can click the button to the left of the "X" to go to the shipping methods.', '/checkout/ShippingPage')
            clearInformationForm();
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;
                if(errors){
                    informationErrors.value.emailError = !!errors.email;
                    informationErrors.value.phoneError = !!errors.phone;
                    informationErrors.value.firstNameError = !!errors.firstName;
                    informationErrors.value.lastNameError = !!errors.lastName;
                    informationErrors.value.countryError = !!errors.country;
                    informationErrors.value.stateRegionError = !!errors.stateRegion;
                    informationErrors.value.addressError = !!errors.address;
                    informationErrors.value.cityError = !!errors.city;
                    informationErrors.value.postalCodeError = !!errors.postalCode;

                    informationMessages.value.emailMessage = errors.email || '';
                    informationMessages.value.phoneMessage = errors.phone || '';
                    informationMessages.value.firstNameMessage = errors.firstName || '';
                    informationMessages.value.lastNameMessage = errors.lastName || '';
                    informationMessages.value.countryMessage = errors.country || '';
                    informationMessages.value.stateRegionMessage = errors.stateRegion || '';
                    informationMessages.value.addressMessage = errors.address || '';
                    informationMessages.value.cityMessage = errors.city || '';
                    informationMessages.value.postalCodeMessage = errors.postalCode || '';
                }
            }
            console.log('Не удалось добавить аддресс доставки', err);
        }
    };

    const addShipping = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const newShipping = await handler(`/checkout/payment`, {
                method: "PUT",
                body: JSON.stringify({
                    userId: userId,
                    delivery: shipping.value.delivery,
                })
            });
            userPayments.value = newShipping;

            if(newShipping && newShipping.id) {
                localStorage.setItem("paymentId", newShipping.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }

            await getPayments()

            openNotify('You have successfully added the shipping method.',
                'You can click the button to the left of the "X" to go to the payment.', '/checkout/PaymentPage')
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;
                if(errors){
                    shippingErrors.value.deliveryError = !!errors.delivery;

                    shippingMessages.value.deliveryMessage = errors.delivery || '';
                }
            }
            console.log('Не удалось добавить способ доставки или оплаты', err);
        }
    };

    const addPayment = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const paymentId = localStorage.getItem("paymentId");
            if (!paymentId) {
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }

            if(paymentMethod.value === 'card'){
                const cardNumber = await handler(`/checkout/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        userId: userId,
                        cardName: payment.value.cardName,
                        cardNumber: payment.value.cardNumber,
                        expiryDate: payment.value.expiryDate,
                        cardCvv: Number(payment.value.cardCvv),
                    })
                });
                userPayments.value = cardNumber
            }

            if(paymentMethod.value === 'apple' || paymentMethod.value === 'google' || paymentMethod.value === 'paypal'){
                const paymentMethod = await handler(`/checkout/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        paymentMethod: payment.value.paymentMethod
                    })
                })

                userPayments.value = paymentMethod
            }

            await addOrder()

            await getPayments()
            openNotify('You have successfully added the payment method.',
                'You can click the button to the left of the "X" to go to the profile.', '/profile/ProfilePage')
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;;
                if(errors){
                    paymentErrors.value.cardNumberError = !!errors.cardNumber;
                    paymentErrors.value.expiryDateError = !!errors.expiryDate;
                    paymentErrors.value.cardCvvError = !!errors.cardCvv;
                    paymentErrors.value.paymentMethodError = !!errors.paymentMethod;

                    paymentMessages.value.cardNumberMessage = errors.cardNumber || '';
                    paymentMessages.value.expiryDateMessage = errors.expiryDate || '';
                    paymentMessages.value.cardCvvMessage = errors.cardCvv || '';
                    paymentMessages.value.paymentMethodMessage = errors.paymentMethod || '';
                }
            }
            console.log('Не удалось добавить способ доставки или оплаты', err);
        }
    };

    const deleteAddress = async (id: string) => {
        try{
            await handler(`/checkout/address/${id}`, {
                method: "DELETE",
            })

            await getAddresses()

            alert()
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    }


    const deletePayment = async (id: string) => {
        try{
            await handler(`/checkout/payment/${id}`, {
                method: "DELETE",
            })

            await getAddresses()

            alert()
        }catch(err){
            console.log('Не удалось удалить аддресс или карту', err);
        }
    }


    const deleteAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            await handler(`/users/${userId}`, {
                method: "DELETE",
            });

            localStorage.clear()

            await router.push({ name: '/auth/LoginPage' });
        }catch(err){
            console.log('Не удалось удалить аккаунт', err);
        }
    };

    return {
        updateAvatarAccount,
        updateNameAccount,
        updateSurNameAccount,
        updatePhoneAccount,
        updateCompanyName,
        updatePublicPhoneAccount,
        updateEmailAccount,
        updatePasswordAccount,

        addAddress,
        addShipping,
        addPayment,

        deleteAddress,
        deletePayment,
        deleteAccount,
    }

}