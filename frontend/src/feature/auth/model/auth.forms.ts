import { ref } from 'vue'
import { type BuyerRegisterForm, type SellerRegisterForm,
    type LoginForm, type RegisterFormMessage, type LoginFormMessage} from "@/entities/auth/auth.types.form.ts";

const registerBuyerForm = ref<BuyerRegisterForm>({
    name: '',
    surName: '',
    privatePhone: '',
    email: '',
    password: ''
});

const registerSellerForm = ref<SellerRegisterForm>({
    name: '',
    surName: '',
    companyName: '',
    publicPhone: '',
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
    privatePhoneMessage: '',
    companyNameMessage: '',
    publicPhoneMessage: '',
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
        registerBuyerForm,
        registerSellerForm,
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