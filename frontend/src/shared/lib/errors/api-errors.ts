import { ApiError } from "../../api/http.ts";
import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { userForms } from "@/features/use-profile/model/user.form.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { authFormsErrors } from "@/features/use-auth/lib/auth.errors.ts";
import { userFormsErrors } from "@/features/use-profile/lib/users.error.ts";
import { productsFormErrors } from "@/features/use-product/lib/product.error.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import { addToCartErrors } from "@/features/use-cart/lib/cart.errors.ts";
import { informationFormErrorMessages } from "@/features/use-information/model/address.form.ts";
import { informationFormErrors } from "@/features/use-information/lib/address.errors.ts";
import { shippingFormErrorMessage } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";
import { paymentFormErrorMessage } from "@/features/use-payment/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-payment/lib/payment.errors.ts";

const { updateUserFormMessage } = userForms();
const { updateUserFormErrors } = userFormsErrors()
const { cartFormMessages } = addToCartForm();
const { cartFormErrors } = addToCartErrors();
const { createProductFormErrors } = productsFormErrors();
const { registerFormMessages, loginFormMessages } = authForms();
const { registerFormErrors, loginFormErrors } = authFormsErrors();
const { cancelChoiceMessage, cancelChoiceError } = useBaseModals();
const { moreCreateItem, createProductFormMessages } = productForms();


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

                registerFormMessages.value.nameMessage = errors.name || '';
                registerFormMessages.value.surNameMessage = errors.surName || '';
                registerFormMessages.value.phoneMessage = errors.phone || '';
                registerFormMessages.value.emailMessage = errors.email || '';
                registerFormMessages.value.passwordMessage = errors.password || '';

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

                loginFormMessages.value.emailMessage = errors.email || '';
                loginFormMessages.value.passwordMessage = errors.password || '';
                loginFormMessages.value.roleMessage = errors.role || '';
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

                createProductFormMessages.value.productUrlMessage = errors.images || '';
                createProductFormMessages.value.titleMessage = errors.title || '';
                createProductFormMessages.value.collectionsMessage = errors.collection || '';
                createProductFormMessages.value.categoryMessage = errors.category || '';
                createProductFormMessages.value.materialMessage = errors.material || '';
                createProductFormMessages.value.genderMessage = errors.gender || '';
                createProductFormMessages.value.skuMessage = errors.sku || '';
                createProductFormMessages.value.priceMessage = errors.price || '';
                createProductFormMessages.value.descriptionMessage = errors.description || '';
                createProductFormMessages.value.colorMessage = errors.colors || '';
                createProductFormMessages.value.sizeMessage = errors.sizes || '';

                if(moreCreateItem.sizes.length || moreCreateItem.colors.length || !moreCreateItem.variants.length) {
                    createProductFormErrors.value.variantError = !!errors.variant;

                    createProductFormMessages.value.variantMessage = errors.variant || '';
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

                cartFormMessages.value.colorMessage = colorError?.[1] || '';
                cartFormMessages.value.sizeMessage = errors.sizes || '';
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