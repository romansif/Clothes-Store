import router from '../../../app/router/index.ts'
import { handler, ApiError } from "../../../shared/api/http.ts"
import { authForms } from "../../../shared/composables/forms-composables/forms/auth.forms.ts";
import { authFormsErrors } from "../../../shared/composables/forms-composables/forms-errors/auth.errors.ts";
import { clearAuthForms } from "../../../shared/composables/forms-composables/clear-forms/clear.auth.ts"
import { usersStore } from "../../../shared/composables/stores/users.store.ts";

const { users, user } = usersStore()
const { registerBuyerForm, registerSellerForm, loginForm, registerFormMessages, loginFormMessages } = authForms()
const { registerFormErrors, loginFormErrors } = authFormsErrors()
const { clearRegisterBuyerForm, clearRegisterSellerForm, clearRegisterFormMessages, clearLoginForm, clearLoginFormMessages } = clearAuthForms()

export const useAuth = () => {
    const signUp = async (role: string) => {
        clearRegisterFormMessages()
        try{
            const date = new Date();

            const form = (role === 'Buyer' ? registerBuyerForm.value : registerSellerForm.value)

            const requestBody = {
                role,
                name: form.name,
                surName: form.surName,
                email: form.email,
                password: form.password,
                dateCreatedAccount: date,
                ...(role === 'Buyer'
                    ? { privatePhone: registerBuyerForm.value.privatePhone }
                    : { companyName: registerSellerForm.value.companyName, publicPhone: registerSellerForm.value.publicPhone }
                )
            };

            const authData = await handler('/users/register', {
                method: "POST",
                body: JSON.stringify(requestBody),
            })
            localStorage.setItem("userId", authData.id)

            if(authData.accessToken){
                localStorage.setItem("accessToken", authData.accessToken)
                console.log("auth data:", authData.accessToken)
            }else{
                console.log('Access token is not found')
                return
            }
            users.value = authData;

            (role === 'Buyer' ? clearRegisterBuyerForm() : clearRegisterSellerForm())

            await router.push({ path: "/profile/ProfilePage" })
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    registerFormErrors.value.nameError = !!errors.name;
                    registerFormErrors.value.surNameError = !!errors.surName;
                    registerFormErrors.value.privatePhoneError = !!errors.privatePhone;
                    registerFormErrors.value.emailError = !!errors.email;
                    registerFormErrors.value.passwordError = !!errors.password;

                    registerFormMessages.value.nameMessage = errors.name || '';
                    registerFormMessages.value.surNameMessage = errors.surName || '';
                    registerFormMessages.value.privatePhoneMessage = errors.privatePhone || '';
                    registerFormMessages.value.emailMessage = errors.email || '';
                    registerFormMessages.value.passwordMessage = errors.password || '';

                    if(role === 'Seller'){
                        registerFormErrors.value.companyNameError = !!errors.surName;
                        registerFormErrors.value.publicPhoneError = !!errors.companyNameError;

                        registerFormMessages.value.companyNameMessage = errors.companyName || '';
                        registerFormMessages.value.publicPhoneMessage = errors.publicPhone || '';
                    }
                }
            }
            console.log('Не удалось создать нового пользователя', err)
        }
    };

    const signIn = async () => {
        clearLoginFormMessages()
        try{
            const foundedUser = await handler('/users/login', {
                method: "POST",
                body: JSON.stringify({
                    email: loginForm.value.email,
                    password: loginForm.value.password,
                })
            })
            if(!foundedUser){
                console.log('Email and password are required.')
                return
            }else{
                localStorage.setItem("userId", foundedUser.id)
                localStorage.setItem("accessToken", foundedUser.accessToken)
            }
            user.value = foundedUser.user

            clearLoginForm()
            await router.push({ path: "/profile/ProfilePage" })
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    loginFormErrors.value.emailError = !!errors.email;
                    loginFormErrors.value.passwordError = !!errors.password;

                    loginFormMessages.value.emailMessage = errors.email || '';
                    loginFormMessages.value.passwordMessage = errors.password || '';
                }
            }
            console.log('Не удалось найти пользователя')
        }
    };

    const logout = async () => {
        try{
            const logoutUser = await handler('/users/logout', {
                method: "POST",
            })
            users.value = logoutUser
        }catch(err){
            console.log('Не удалось выйти из аккаунта')
        }finally {
            localStorage.clear()
            await router.replace({ name: '/auth/LoginPage' })
        }
    };

    return{
        signUp,
        signIn,
        logout
    }
}