import { ref } from 'vue'
import type {
    LoginForm,
    RegisterForm,
    LoginFormErrorMessage,
    RegisterFormErrorMessage,
} from "@/entities/auth/model/auth-form.types.ts";

export const registerForm = ref<RegisterForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: ''
});

export const loginForm = ref<LoginForm>({
    email: '',
    phone: '',
    password: '',
    role: '',
});

export const registerFormErrorMessages = ref<RegisterFormErrorMessage>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: '',
});

export const loginFormErrorMessages = ref<LoginFormErrorMessage>({
    email: '',
    password: '',
    phone: '',
    role: '',
});
