import { ApiError } from "../../api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { loginFormErrorMessages, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { loginFormErrors, registerFormErrors } from "@/features/use-auth/lib/auth.errors.ts";
import { updateUserFormErrors } from "@/features/use-profile-form/lib/user.update.error.ts";
import { updateUserFormMessage } from "@/features/use-profile-form/model/user.update.form.ts";
import { moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/lib/product.error.ts";
import { cartFormErrorMessages } from "@/features/use-cart/model/cart.form.ts";
import { cartFormErrors } from "@/features/use-cart/lib/cart.errors.ts";
import { informationFormErrorMessages } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/lib/address.errors.ts";
import { shippingFormErrorMessage } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";
import { paymentFormErrorMessage } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/lib/payment.errors.ts";

const { cancelChoiceMessage, cancelChoiceError } = useBaseModals();

export const useFormsErrors = () => {
    const registerErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                registerFormErrors.value.nameError = !!errors.name;
                registerFormErrors.value.surNameError = !!errors.surName;
                registerFormErrors.value.phoneError = !!errors.phone;
                registerFormErrors.value.emailError = !!errors.email;
                registerFormErrors.value.passwordError = !!errors.password;

                registerFormErrorMessages.value.nameMessage = errors.name || '';
                registerFormErrorMessages.value.surNameMessage = errors.surName || '';
                registerFormErrorMessages.value.phoneMessage = errors.phone || '';
                registerFormErrorMessages.value.emailMessage = errors.email || '';
                registerFormErrorMessages.value.passwordMessage = errors.password || '';

            }
        }
    };

    const loginErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                loginFormErrors.value.emailError = !!errors.email;
                loginFormErrors.value.passwordError = !!errors.password;
                loginFormErrors.value.roleError= !!errors.role;

                loginFormErrorMessages.value.emailMessage = errors.email || '';
                loginFormErrorMessages.value.passwordMessage = errors.password || '';
                loginFormErrorMessages.value.roleMessage = errors.role || '';
            }
        }
    };

    const createProductErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                createProductFormErrors.value.titleError = !!errors.title;
                createProductFormErrors.value.collectionsError = !!errors.collection;
                createProductFormErrors.value.categoryError = !!errors.category;
                createProductFormErrors.value.materialError = !!errors.material;
                createProductFormErrors.value.genderError = !!errors.gender;
                createProductFormErrors.value.skuError = !!errors.sku;
                createProductFormErrors.value.priceError = !!errors.price;
                createProductFormErrors.value.descriptionError = !!errors.description;
                createProductFormErrors.value.colorError = !!errors.colors;
                createProductFormErrors.value.sizeError = !!errors.sizes;

                createProductFormErrorMessages.value.titleMessage = errors.title || '';
                createProductFormErrorMessages.value.collectionsMessage = errors.collection || '';
                createProductFormErrorMessages.value.categoryMessage = errors.category || '';
                createProductFormErrorMessages.value.materialMessage = errors.material || '';
                createProductFormErrorMessages.value.genderMessage = errors.gender || '';
                createProductFormErrorMessages.value.skuMessage = errors.sku || '';
                createProductFormErrorMessages.value.priceMessage = errors.price || '';
                createProductFormErrorMessages.value.descriptionMessage = errors.description || '';
                createProductFormErrorMessages.value.colorMessage = errors.colors || '';
                createProductFormErrorMessages.value.sizeMessage = errors.sizes || '';

                if(moreCreateItemForm.sizes.length || moreCreateItemForm.colors.length || !moreCreateItemForm.variants.length) {
                    createProductFormErrors.value.variantError = !!errors.variant;

                    createProductFormErrorMessages.value.variantMessage = errors.variant || '';
                }
            }
        }
    };

    const addToCartErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                const hasColorError = Object.keys(errors).some(
                    key =>
                        key.startsWith('colors[') ||
                        key === 'colors'
                );

                const colorError = Object.entries(errors).find(
                    ([key]) =>
                        key.startsWith('colors[') ||
                        key === 'colors'
                );

                cartFormErrors.value.colorError = hasColorError;
                cartFormErrors.value.sizeError = !!errors.sizes;

                cartFormErrorMessages.value.colorMessage = colorError?.[1] || '';
                cartFormErrorMessages.value.sizeMessage = errors.sizes || '';
            }
        }
    };

    const createInformationErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                informationFormErrors.value.emailError = !!errors.email;
                informationFormErrors.value.phoneError = !!errors.phone;
                informationFormErrors.value.firstNameError = !!errors.firstName;
                informationFormErrors.value.lastNameError = !!errors.lastName;
                informationFormErrors.value.countryError = !!errors.country;
                informationFormErrors.value.stateRegionError = !!errors.stateRegion;
                informationFormErrors.value.addressError = !!errors.address;
                informationFormErrors.value.cityError = !!errors.city;
                informationFormErrors.value.postalCodeError = !!errors.postalCode;

                informationFormErrorMessages.value.emailMessage = errors.email || '';
                informationFormErrorMessages.value.phoneMessage = errors.phone || '';
                informationFormErrorMessages.value.firstNameMessage = errors.firstName || '';
                informationFormErrorMessages.value.lastNameMessage = errors.lastName || '';
                informationFormErrorMessages.value.countryMessage = errors.country || '';
                informationFormErrorMessages.value.stateRegionMessage = errors.stateRegion || '';
                informationFormErrorMessages.value.addressMessage = errors.address || '';
                informationFormErrorMessages.value.cityMessage = errors.city || '';
                informationFormErrorMessages.value.postalCodeMessage = errors.postalCode || '';
            }
        }
    };

    const createSippingErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                shippingFormError.value.deliveryError = !!errors.delivery;

                shippingFormErrorMessage.value.deliveryMessage = errors.delivery || '';
            }
        }
    };

    const createPaymentCardErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                paymentFormErrors.value.cardNumberError = !!errors.cardNumber;
                paymentFormErrors.value.expiryDateError = !!errors.expiryDate;
                paymentFormErrors.value.cardCvvError = !!errors.cardCvv;

                paymentFormErrorMessage.value.cardNumberMessage = errors.cardNumber || '';
                paymentFormErrorMessage.value.expiryDateMessage = errors.expiryDate || '';
                paymentFormErrorMessage.value.cardCvvMessage = errors.cardCvv || '';
            }
        }
    };

    const createPaymentMethodError = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                paymentFormErrors.value.paymentMethodError = !!errors.paymentMethod;

                paymentFormErrorMessage.value.paymentMethodMessage = errors.paymentMethod || '';
            }
        }
    };

    const updateNameErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.nameError = !!errors.name;
                updateUserFormMessage.value.nameMessage = errors.name || '';
            }
        }
    };

    const updateSurNameErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.surNameError = !!errors.surName;
                updateUserFormMessage.value.surNameMessage = errors.surName || '';
            }
        }
    };

    const updatePhoneErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.phoneError = !!errors.phone;
                updateUserFormMessage.value.phoneMessage = errors.phone || '';
            }
        }
    };

    const updateEmailErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.emailError = !!errors.email;
                updateUserFormMessage.value.emailMessage = errors.email || '';
            }
        }
    };

    const updatePasswordErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.oldPasswordError = !!errors.oldPassword;
                updateUserFormErrors.value.newPasswordError = !!errors.newPassword;

                updateUserFormMessage.value.oldPasswordMessage = errors.oldPassword || '';
                updateUserFormMessage.value.newPasswordMessage = errors.newPassword || '';
            }
        }
    };

    const replaceOrderErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                cancelChoiceError.value = !!errors.cause_replace;

                cancelChoiceMessage.value = errors.cause_replace || '';
            }
        }
    };

    return{
        registerErrors,
        loginErrors,

        createProductErrors,
        addToCartErrors,

        createInformationErrors,
        createSippingErrors,
        createPaymentCardErrors,
        createPaymentMethodError,

        updateNameErrors,
        updateSurNameErrors,
        updateEmailErrors,
        updatePhoneErrors,
        updatePasswordErrors,

        replaceOrderErrors
    }
}