import router from '@/app/router';
import { handler } from "@/shared/api/http";
import { authForms } from "@/shared/composables/forms/auth.forms";
import { usersStore } from "@/shared/composables/stores/users.store";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

const { loadAuth } = useBaseModals();
const { users, user } = usersStore();
const { registerErrors, loginErrors } = useFormsErrors();
const { clearRegisterBuyerForm, clearRegisterSellerForm, clearRegisterFormMessages,
    clearLoginForm, clearLoginFormMessages } = clearAuthForms();
const { registerBuyerForm, registerSellerForm, loginForm } = authForms();

export const useAuth = () => {
    const signUp = async (role: string) => {
        clearRegisterFormMessages();
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

            const authData = await handler('/users/signUp', {
                method: "POST",
                body: JSON.stringify(requestBody),
            });
            localStorage.setItem("userId", authData.id);

            if(authData.accessToken){
                localStorage.setItem("accessToken", authData.accessToken);
                console.log("auth data:", authData.accessToken);
            }else{
                console.log('Access token is not found');
                return;
            }
            users.value = authData;

            (role === 'Buyer' ? clearRegisterBuyerForm() : clearRegisterSellerForm());

            await loadAuth('You have successfully registered.',
                'You will now be taken to your profile page.', 'profile')
        }catch(err){
            registerErrors(err, role)
            console.log(`Failed to register new user:`, err);
        }
    };

    const signIn = async () => {
        clearLoginFormMessages()
        try{
            const foundedUser = await handler('/users/signIn', {
                method: "POST",
                body: JSON.stringify({
                    email: loginForm.value.email,
                    password: loginForm.value.password,
                    role: loginForm.value.role,
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

            await loadAuth('You have successfully logged in.',
                'You will now be taken to your profile page.', 'profile')

            clearLoginForm()
        }catch(err){
            loginErrors(err)
            console.log(`Failed to login:`, err);
        }
    };

    const signOAuth = async () => {

    }

    const logout = async () => {
        try{
            const logoutUser = await handler('/users/logout', {
                method: "POST",
            })
            users.value = logoutUser
        }catch(err){
            console.log(`Failed to logout:`, err);
        }finally {
            localStorage.clear()
            await router.push({ name: 'signIn' })
        }
    };


    const deleteAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            await handler(`/users/${userId}`, {
                method: "DELETE",
            });
            localStorage.clear()

            await router.push({ name: 'signIn' });
        }catch(err){
            console.error(`Failed to delete the user:`, err);
        }
    };

    return{
        signUp,
        signIn,
        signOAuth,
        logout,
        deleteAccount,
    }
}