import { ref } from 'vue'
import type {
    LoginForm,
    RegisterForm,
    LoginFormErrorMessage,
    RegisterFormErrorMessage,
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
