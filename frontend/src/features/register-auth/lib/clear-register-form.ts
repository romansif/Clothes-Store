import {
    registerForm,
    registerFormErrorMessages,
} from "@/entities/register-form/model/register-from";

export const clearRegisterForm = () => {
    registerForm.value.name = "";
    registerForm.value.surName = "";
    registerForm.value.phone = "";
    registerForm.value.email = "";
    registerForm.value.password = "";

    registerFormErrorMessages.value.name = "";
    registerFormErrorMessages.value.surName = "";
    registerFormErrorMessages.value.email = "";
    registerFormErrorMessages.value.password = "";
};

export const clearRegisterFormMessages = () => {
    registerFormErrorMessages.value.name = "";
    registerFormErrorMessages.value.surName = "";
    registerFormErrorMessages.value.email = "";
    registerFormErrorMessages.value.password = "";
};
