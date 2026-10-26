import { ref } from "vue";
import type { RegisterForm, RegisterFormErrorMessage } from "@/entities/register-form";

export const registerForm = ref<RegisterForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: ''
});

export const registerFormErrorMessages = ref<RegisterFormErrorMessage>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: '',
});