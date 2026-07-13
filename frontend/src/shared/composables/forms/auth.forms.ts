import { ref } from 'vue'

interface RegisterForm {
    name: string,
    email: string,
    password: string
}
const registerForm = ref<RegisterForm>({
    name: '',
    email: '',
    password: '',
})
