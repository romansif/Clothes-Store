import { ref } from 'vue'
import { type RegisterFormErrors, type LoginFormErrors} from "@/features/use-auth/model/auth.types.form.ts";

export const registerFormErrors = ref<RegisterFormErrors>({
    name: false,
    surName: false,
    phone: false,
    email: false,
    password: false
})

export const loginFormErrors = ref<LoginFormErrors>({
    email: false,
    password: false,
    phone: false,
    role: false,
})
