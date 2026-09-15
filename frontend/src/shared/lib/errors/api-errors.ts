import { ApiError } from "../../api/http.ts";
import { loginFormErrorMessages, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { loginFormErrors, registerFormErrors } from "@/features/use-auth/model/auth.errors.ts";
import { moreCreateItemForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/model/product.error.ts";
import { addToCartFormErrorMessages } from "@/features/use-product/model/add.to.cart.form.ts";
import { addToCartFormErrors } from "@/features/use-product/model/add.to.cart.errors.ts";
import { informationFormErrorMessages } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";
import { shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";
import { paymentFormErrorMessage } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/model/payment.errors.ts";
import { updateUserFormErrors } from "@/features/use-profile-form/model/user.update.error.ts";
import { updateUserFormMessage } from "@/features/use-profile-form/model/user.update.form.ts";
import { cancelChoiceError, cancelChoiceMessage } from "@/shared/lib/base-modal.ts";

export const useFormsErrors = () => {
    const registerErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        registerFormErrors.value.name = !!errors.name;
        registerFormErrors.value.surName = !!errors.surName;
        registerFormErrors.value.phone = !!errors.phone;
        registerFormErrors.value.email = !!errors.email;
        registerFormErrors.value.password = !!errors.password;

        registerFormErrorMessages.value.name = errors.name || '';
        registerFormErrorMessages.value.surName = errors.surName || '';
        registerFormErrorMessages.value.phone = errors.phone || '';
        registerFormErrorMessages.value.email = errors.email || '';
        registerFormErrorMessages.value.password = errors.password || '';

    };

    const loginErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        loginFormErrors.value.email = !!errors.email;
        loginFormErrors.value.password = !!errors.password;
        loginFormErrors.value.role = !!errors.role;

        loginFormErrorMessages.value.email = errors.email || '';
        loginFormErrorMessages.value.password = errors.password || '';
        loginFormErrorMessages.value.role = errors.role || '';
    };

    const createProductErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        createProductFormErrors.value.title = !!errors.title;
        createProductFormErrors.value.collections = !!errors.collection;
        createProductFormErrors.value.category = !!errors.category;
        createProductFormErrors.value.material = !!errors.material;
        createProductFormErrors.value.gender = !!errors.gender;
        createProductFormErrors.value.sku = !!errors.sku;
        createProductFormErrors.value.price = !!errors.price;
        createProductFormErrors.value.description = !!errors.description;
        createProductFormErrors.value.color = !!errors.colors;
        createProductFormErrors.value.size = !!errors.sizes;

        createProductFormErrorMessages.value.title = errors.title || '';
        createProductFormErrorMessages.value.collections = errors.collection || '';
        createProductFormErrorMessages.value.category = errors.category || '';
        createProductFormErrorMessages.value.material = errors.material || '';
        createProductFormErrorMessages.value.gender = errors.gender || '';
        createProductFormErrorMessages.value.sku = errors.sku || '';
        createProductFormErrorMessages.value.price = errors.price || '';
        createProductFormErrorMessages.value.description = errors.description || '';
        createProductFormErrorMessages.value.color = errors.colors || '';
        createProductFormErrorMessages.value.size = errors.sizes || '';

        if(moreCreateItemForm.sizes.length || moreCreateItemForm.colors.length || !moreCreateItemForm.variants.length) {
            createProductFormErrors.value.variant = !!errors.variant;

            createProductFormErrorMessages.value.variant = errors.variant || '';
        }
    };

    const addToCartErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

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

        addToCartFormErrors.value.color = hasColorError;
        addToCartFormErrors.value.size = !!errors.sizes;

        addToCartFormErrorMessages.value.color = colorError?.[1] || '';
        addToCartFormErrorMessages.value.size = errors.sizes || '';
    };

    const createInformationErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        informationFormErrors.value.email = !!errors.email;
        informationFormErrors.value.phone = !!errors.phone;
        informationFormErrors.value.firstName = !!errors.firstName;
        informationFormErrors.value.lastName = !!errors.lastName;
        informationFormErrors.value.country = !!errors.country;
        informationFormErrors.value.stateRegion = !!errors.stateRegion;
        informationFormErrors.value.address = !!errors.address;
        informationFormErrors.value.city = !!errors.city;
        informationFormErrors.value.postalCode = !!errors.postalCode;

        informationFormErrorMessages.value.email = errors.email || '';
        informationFormErrorMessages.value.phone = errors.phone || '';
        informationFormErrorMessages.value.firstName = errors.firstName || '';
        informationFormErrorMessages.value.lastName = errors.lastName || '';
        informationFormErrorMessages.value.country = errors.country || '';
        informationFormErrorMessages.value.stateRegion = errors.stateRegion || '';
        informationFormErrorMessages.value.address = errors.address || '';
        informationFormErrorMessages.value.city = errors.city || '';
        informationFormErrorMessages.value.postalCode = errors.postalCode || '';
    };

    const createSippingErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        shippingFormError.value.delivery = !!errors.delivery;

        shippingFormErrorMessage.value.delivery = errors.delivery || '';
    };

    const createPaymentCardErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        paymentFormErrors.value.cardNumber = !!errors.cardNumber;
        paymentFormErrors.value.expiryDate = !!errors.expiryDate;
        paymentFormErrors.value.cardCvv = !!errors.cardCvv;

        paymentFormErrorMessage.value.cardNumber = errors.cardNumber || '';
        paymentFormErrorMessage.value.expiryDate = errors.expiryDate || '';
        paymentFormErrorMessage.value.cardCvv = errors.cardCvv || '';
    };

    const createPaymentMethodError = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        paymentFormErrors.value.paymentMethod = !!errors.paymentMethod;

        paymentFormErrorMessage.value.paymentMethod = errors.paymentMethod || '';
    };

    const updateNameErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        updateUserFormErrors.value.name = !!errors.name;
        updateUserFormMessage.value.name = errors.name || '';
    };

    const updateSurNameErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        updateUserFormErrors.value.surName = !!errors.surName;
        updateUserFormMessage.value.surName = errors.surName || '';
    };

    const updatePhoneErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        updateUserFormErrors.value.phone = !!errors.phone;
        updateUserFormMessage.value.phone = errors.phone || '';
    };

    const updateEmailErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        updateUserFormErrors.value.email = !!errors.email;
        updateUserFormMessage.value.email = errors.email || '';
    };

    const updatePasswordErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        updateUserFormErrors.value.oldPassword = !!errors.oldPassword;
        updateUserFormErrors.value.newPassword = !!errors.newPassword;

        updateUserFormMessage.value.oldPassword = errors.oldPassword || '';
        updateUserFormMessage.value.newPassword = errors.newPassword || '';
    };

    const replaceOrderErrors = (err: any) => {
        if(!(err instanceof ApiError)) return

        const errors = err.response?.errors
        if (!errors) return

        cancelChoiceError.value = !!errors.cause_replace;

        cancelChoiceMessage.value = errors.cause_replace || '';
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