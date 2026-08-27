import { ref } from 'vue'
import { type RegisterForm,
    type LoginForm, type RegisterFormMessage, type LoginFormMessage} from "@/entities/auth/model/auth.types.form.ts";

const registerForm = ref<RegisterForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: ''
});

const loginForm = ref<LoginForm>({
    email: '',
    phone: '',
    password: '',
    validCode: '',
    role: '',
});

const registerFormMessages = ref<RegisterFormMessage>({
    nameMessage: '',
    surNameMessage: '',
    phoneMessage: '',
    emailMessage: '',
    passwordMessage: '',
});

const loginFormMessages = ref<LoginFormMessage>({
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
        registerFormMessages,
        loginForm,
        loginFormMessages,

        CODE_LENGTH,
        codeDigits,
        inputRefs,

        isSendCode,
        isNewCode,
        timeLeft,
        timerInterval
    }
}