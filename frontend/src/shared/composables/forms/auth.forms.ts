import { ref } from 'vue'

interface RegisterBuyerForm {
    name: string,
    surName: string,
    privatePhone: string,
    email: string,
    password: string
}
const registerBuyerForm = ref<RegisterBuyerForm>({
    name: '',
    surName: '',
    privatePhone: '',
    email: '',
    password: ''
})

interface RegisterSellerForm {
    name: string,
    surName: string,
    companyName: string,
    publicPhone: string,
    email: string,
    password: string
}
const registerSellerForm = ref<RegisterSellerForm>({
    name: '',
    surName: '',
    companyName: '',
    publicPhone: '',
    email: '',
    password: ''
})

interface registerFormMessage {
    nameMessage: string,
    surNameMessage: string,
    privatePhoneMessage: string,
    companyNameMessage: string,
    publicPhoneMessage: string,
    emailMessage: string,
    passwordMessage: string,
}
const registerFormMessages = ref<registerFormMessage>({
    nameMessage: '',
    surNameMessage: '',
    privatePhoneMessage: '',
    companyNameMessage: '',
    publicPhoneMessage: '',
    emailMessage: '',
    passwordMessage: '',
})

interface LoginForm {
    email: string,
    password: string,
    phone?: string,
    validCode?: string,
    role: string,
}
const loginForm = ref<LoginForm>({
    email: '',
    phone: '',
    password: '',
    validCode: '',
    role: '',
})

interface loginFormMessage {
    emailMessage: string,
    passwordMessage: string,
    phoneMessage?: string,
    validCodeMessage?: string,
    roleMessage: string
}
const loginFormMessages = ref<loginFormMessage>({
    emailMessage: '',
    passwordMessage: '',
    validCodeMessage: '',
    phoneMessage: '',
    roleMessage: '',
})


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