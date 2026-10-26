import { ref } from "vue";
import type { LoginForm, LoginFormErrorMessage } from "@/entities/login-form";

export const loginForm = ref<LoginForm>({
    email: '',
    phone: '',
    password: '',
    role: '',
});

export const loginFormErrorMessages = ref<LoginFormErrorMessage>({
    email: '',
    password: '',
    phone: '',
    role: '',
});