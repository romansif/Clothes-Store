import { ref } from 'vue'
import type {
    LoginForm,
    RegisterForm,
    LoginFormErrorMessage,
    RegisterFormErrorMessage,
    RegisterFormErrors, LoginFormErrors
} from "@/features/use-auth/model/auth.types.form.ts";

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

export const registerFormErrors = ref<RegisterFormErrors>({
    name: false,
    surName: false,
    phone: false,
    email: false,
    password: false
});

export const loginFormErrors = ref<LoginFormErrors>({
    email: false,
    password: false,
    phone: false,
    role: false,
});
