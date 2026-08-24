import { ApiError } from "../../api/http.ts";
import { authForms } from "@/feature/auth/model/auth.forms.ts";
import { userForms } from "@/feature/profile/model/users.forms.ts";
import { checkoutForms } from "@/feature/checkout/model/checkout.forms.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";
import { authFormsErrors } from "@/feature/auth/lib/auth.errors.ts";
import { userFormsErrors } from "@/feature/profile/lib/users.errors.ts";
import { checkoutErrors } from "@/feature/checkout/lib/checkout.errors.ts";
import { productsFormErrors } from "@/feature/products/lib/products.errors.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { addToCartForm } from "@/feature/cart/model/cart.forms.ts";
import { addToCartErrors } from "@/feature/cart/lib/cart.errors.ts";

const { cartFormMessages } = addToCartForm();
const { cartFormErrors } = addToCartErrors();
const { createProductFormMessages } = productForms();
const { createProductFormErrors } = productsFormErrors();
const { registerFormMessages, loginFormMessages } = authForms();
const { registerFormErrors, loginFormErrors } = authFormsErrors();
const { informationErrors, shippingErrors, paymentErrors} = checkoutErrors();
const { informationMessages, shippingMessages, paymentMessages } = checkoutForms();
const { cancelChoiceMessage, cancelChoiceError } = useBaseModals();

const { updateUserFormMessage } = userForms();
const { updateUserFormErrors } = userFormsErrors()

export const useFormsErrors = () => {
    const registerErrors = (err: any, role: string) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                registerFormErrors.value.nameError = !!errors.name;
                registerFormErrors.value.surNameError = !!errors.surName;
                registerFormErrors.value.privatePhoneError = !!errors.privatePhone;
                registerFormErrors.value.emailError = !!errors.email;
                registerFormErrors.value.passwordError = !!errors.password;

                registerFormMessages.value.nameMessage = errors.name || '';
                registerFormMessages.value.surNameMessage = errors.surName || '';
                registerFormMessages.value.privatePhoneMessage = errors.privatePhone || '';
                registerFormMessages.value.emailMessage = errors.email || '';
                registerFormMessages.value.passwordMessage = errors.password || '';

                if(role === 'Seller'){
                    registerFormErrors.value.companyNameError = !!errors.companyName;
                    registerFormErrors.value.publicPhoneError = !!errors.publicPhone;

                    registerFormMessages.value.companyNameMessage = errors.companyName || '';
                    registerFormMessages.value.publicPhoneMessage = errors.publicPhone || '';
                }
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
                createProductFormErrors.value.priceError = !!errors.price;
                createProductFormErrors.value.descriptionError = !!errors.description;
                createProductFormErrors.value.colorError = !!errors.color;
                createProductFormErrors.value.sizeError = !!errors.size;
                createProductFormErrors.value.genderError = !!errors.gender;
                createProductFormErrors.value.quantityError = !!errors.quantity;

                createProductFormMessages.value.titleMessage = errors.title || '';
                createProductFormMessages.value.collectionsMessage = errors.collection || '';
                createProductFormMessages.value.categoryMessage = errors.category || '';
                createProductFormMessages.value.materialMessage = errors.material || '';
                createProductFormMessages.value.priceMessage = errors.price || '';
                createProductFormMessages.value.descriptionMessage = errors.description || '';
                createProductFormMessages.value.colorMessage = errors.color || '';
                createProductFormMessages.value.sizeMessage = errors.size || '';
                createProductFormMessages.value.genderMessage = errors.gender || '';
                createProductFormMessages.value.quantityMessage = errors.quantity || '';
            }
        }
    };

    const addToCartErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                cartFormErrors.value.colorError = !!errors.colors;
                cartFormErrors.value.sizeError = !!errors.sizes;

                cartFormMessages.value.colorMessage = errors.colors || '';
                cartFormMessages.value.sizeMessage = errors.sizes || '';
            }
        }
    };

    const createInformationErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
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
    };

    const createSippingErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                shippingErrors.value.deliveryError = !!errors.delivery;

                shippingMessages.value.deliveryMessage = errors.delivery || '';
            }
        }
    };

    const createPaymentCardErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                paymentErrors.value.cardNumberError = !!errors.cardNumber;
                paymentErrors.value.expiryDateError = !!errors.expiryDate;
                paymentErrors.value.cardCvvError = !!errors.cardCvv;

                paymentMessages.value.cardNumberMessage = errors.cardNumber || '';
                paymentMessages.value.expiryDateMessage = errors.expiryDate || '';
                paymentMessages.value.cardCvvMessage = errors.cardCvv || '';
            }
        }
    };

    const createPaymentMethodError = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                paymentErrors.value.paymentMethodError = !!errors.paymentMethod;

                paymentMessages.value.paymentMethodMessage = errors.paymentMethod || '';
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

    const updateCompanyNameErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.companyNameError = !!errors.companyName;
                updateUserFormMessage.value.companyNameMessage = errors.companyName || '';
            }
        }
    };

    const updatePublicPhoneErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormErrors.value.publicPhoneError = !!errors.publicPhone;
                updateUserFormMessage.value.publicPhoneMessage = errors.publicPhone || '';
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
        updatePublicPhoneErrors,
        updateCompanyNameErrors,
        updatePasswordErrors,

        replaceOrderErrors
    }
}