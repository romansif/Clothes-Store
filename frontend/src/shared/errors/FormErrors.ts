import { ApiError } from "../api/http.ts";
import { authForms } from "../composables/forms-composables/forms/auth.forms.ts";
import { userForms } from "../composables/forms-composables/forms/users.forms.ts";
import { checkoutForms } from "../composables/forms-composables/forms/checkout.forms.ts";
import { productsForms } from "../composables/forms-composables/forms/products.forms.ts";
import { authFormsErrors } from "../composables/forms-composables/forms-errors/auth.errors.ts";
import { userFormsErrors } from "../composables/forms-composables/forms-errors/users.errors.ts";
import { checkoutErrors } from "../composables/forms-composables/forms-errors/checkout.errors.ts";
import { productsFormErrors } from "../composables/forms-composables/forms-errors/products.errors.ts";

const { registerFormMessages, loginFormMessages } = authForms();
const { registerFormErrors, loginFormErrors } = authFormsErrors();
const { createProductFormErrors, addCartFormErrors } = productsFormErrors();
const { createProductFormMessages, addToCartFormMessages } = productsForms();
const { informationErrors, shippingErrors, paymentErrors} = checkoutErrors();
const { informationMessages, shippingMessages, paymentMessages } = checkoutForms();

const { updateUserFormNameMessage, updateUserFormPhoneMessage,
    updateUserFormSurNameMessage, updateUserFormPasswordMessages,
    updateUserFormCompanyNameMessage, updateUserFormPublicPhoneMessage,
    updateUserFormEmailMessage
} = userForms();
const {
    updateUserPasswordErrors,
    updateUserNameErrors, updateUserSurNameErrors,
    updateUserPhoneErrors, updateUserFormCompanyNameErrors,
    updateUserFormPublicPhoneErrors, updateUserEmailErrors
} = userFormsErrors()

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
                createProductFormErrors.value.categoryError = !!errors.category;
                createProductFormErrors.value.materialError = !!errors.material;
                createProductFormErrors.value.priceError = !!errors.price;
                createProductFormErrors.value.descriptionError = !!errors.description;
                createProductFormErrors.value.colorError = !!errors.color;
                createProductFormErrors.value.sizeError = !!errors.size;
                createProductFormErrors.value.quantityError = !!errors.quantity;

                createProductFormMessages.value.titleMessage = errors.title || '';
                createProductFormMessages.value.categoryMessage = errors.category || '';
                createProductFormMessages.value.materialMessage = errors.material || '';
                createProductFormMessages.value.priceMessage = errors.price || '';
                createProductFormMessages.value.descriptionMessage = errors.description || '';
                createProductFormMessages.value.colorMessage = errors.color || '';
                createProductFormMessages.value.sizeMessage = errors.size || '';
                createProductFormMessages.value.quantityMessage = errors.quantity    || '';
            }
        }
    };

    const addToCartErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                addCartFormErrors.value.colorError = !!errors.color;
                addCartFormErrors.value.sizeError = !!errors.size;

                addToCartFormMessages.value.colorMessage = errors.color || '';
                addToCartFormMessages.value.sizeMessage = errors.size || '';
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
                updateUserNameErrors.value.nameError = !!errors.name;
                updateUserFormNameMessage.value.nameMessage = errors.name || '';
            }
        }
    };

    const updateSurNameErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserSurNameErrors.value.surNameError = !!errors.surName;
                updateUserFormSurNameMessage.value.surNameMessage = errors.surName || '';
            }
        }
    };

    const updatePhoneErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserPhoneErrors.value.phoneError = !!errors.phone;
                updateUserFormPhoneMessage.value.phoneMessage = errors.phone || '';
            }
        }
    };

    const updateCompanyNameErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormCompanyNameErrors.value.companyNameError = !!errors.companyName;
                updateUserFormCompanyNameMessage.value.companyNameMessage = errors.companyName || '';
            }
        }
    };

    const updatePublicPhoneErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserFormPublicPhoneErrors.value.publicPhoneError = !!errors.publicPhone;
                updateUserFormPublicPhoneMessage.value.publicPhoneMessage = errors.publicPhone || '';
            }
        }
    };

    const updateEmailErrors = (err: any) => {
        if(err instanceof ApiError){
            const errors = err.response as Record<string, string> | undefined;
            if(errors){
                updateUserEmailErrors.value.emailError = !!errors.email;
                updateUserFormEmailMessage.value.emailMessage = errors.email || '';
            }
        }
    };

    const updatePasswordErrors = (err: any) => {
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
        updatePasswordErrors
    }
}