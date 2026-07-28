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
    password: string
    role: string
}
const loginForm = ref<LoginForm>({
    email: '',
    password: '',
    role: '',
})

interface loginFormMessage {
    emailMessage: string,
    passwordMessage: string,
    roleMessage: string
}
const loginFormMessages = ref<loginFormMessage>({
    emailMessage: '',
    passwordMessage: '',
    roleMessage: '',
})

export const authForms = () => {
    return{
        registerBuyerForm,
        registerSellerForm,
        registerFormMessages,
        loginForm,
        loginFormMessages,
    }
}