import { ref } from 'vue'
import type { LoginForm, RegisterForm, LoginFormErrorMessage, RegisterFormErrorMessage} from "@/features/use-auth/model/auth.types.form.ts";

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
    validCode: '',
    role: '',
});

export const registerFormErrorMessages = ref<RegisterFormErrorMessage>({
    nameMessage: '',
    surNameMessage: '',
    phoneMessage: '',
    emailMessage: '',
    passwordMessage: '',
});

export const loginFormErrorMessages = ref<LoginFormErrorMessage>({
    emailMessage: '',
    passwordMessage: '',
    validCodeMessage: '',
    phoneMessage: '',
    roleMessage: '',
});

const CODE_LENGTH = 6;
const codeDigits = ref<string[]>(Array(CODE_LENGTH).fill(''));
const inputRefs = ref<HTMLInputElement[]>([]);

const isSendCode = ref<boolean>(false);
const isNewCode = ref<boolean>(false);

const timeLeft = ref<number>(59);
const timerInterval = ref<number>(0);

export const authForms = () => {
    return{
        registerForm,
        registerFormErrorMessages,
        loginForm,
        loginFormErrorMessages,

        CODE_LENGTH,
        codeDigits,
        inputRefs,

        isSendCode,
        isNewCode,
        timeLeft,
        timerInterval
    }
}