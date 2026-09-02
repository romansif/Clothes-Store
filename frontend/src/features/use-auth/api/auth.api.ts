import router from '@/app/router';
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { clearAuthForms } from "@/features/use-auth/lib/clear.auth.ts";

const { users, user } = userStore();
const { loading, openNotify } = useBaseModals();
const { registerErrors, loginErrors } = useFormsErrors();
const { clearRegisterForm, clearRegisterFormMessages,
    clearLoginForm, clearLoginFormMessages } = clearAuthForms();
const { registerForm, loginForm } = authForms();

export const authApi = () => {
    const signUp = async (role: string) => {
        loading.value = true;

        console.log(role)

        clearRegisterFormMessages();
        try{
            const date = new Date();

            const requestBody = {
                role,
                name: registerForm.value.name,
                surName: registerForm.value.surName,
                phone: registerForm.value.phone,
                email: registerForm.value.email,
                password: registerForm.value.password,
                created_at: date,
            };

            const authData = await handler('/auth/signUp', {
                method: "POST",
                body: JSON.stringify(requestBody),
            });

            if(authData.accessToken){
                localStorage.setItem("accessToken", authData.accessToken);
                localStorage.setItem("user", JSON.stringify(authData));
                console.log("auth data:", authData.accessToken);
            }else{
                console.log('Access token is not found');
                return;
            }
            users.value = authData;

            (role === 'Buyer' ? clearRegisterForm() : clearRegisterForm());

            loading.value = false;
            await openNotify('You have successfully sign up.',
                'You will now be taken to your profile page.', 'profile');
        }catch(err){
            loading.value = false;
            registerErrors(err)
            console.log(`Failed to register new user:`, err);
        }
    };

    const signIn = async () => {
        loading.value = true;

        clearLoginFormMessages();
        try{
            const foundedUser = await handler('/auth/signIn', {
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
                localStorage.setItem("accessToken", foundedUser.accessToken)
                localStorage.setItem("user", JSON.stringify(foundedUser));
            }
            user.value = foundedUser.user

            loading.value = false;
            await openNotify('You have successfully sign in.',
                'You will now be taken to your profile page.', 'profile')

            clearLoginForm()
        }catch(err){
            loading.value = false;
            loginErrors(err)
            console.log(`Failed to login:`, err);
        }
    };

    const signOAuth = async (response: any) => {
        loading.value = true;

        try{
            const date = new Date();

            const foundedUser = await handler('/auth/google', {
                method: "POST",
                body: JSON.stringify({
                    role: loginForm.value.role || 'Buyer',
                    credential: response.credential,
                    created_at: date,
                })
            });
            if(!foundedUser){
                console.log('Email and password are required.')
                return
            }else{
                localStorage.setItem("accessToken", foundedUser.accessToken)
                localStorage.setItem("user", JSON.stringify(foundedUser));
            }
            user.value = foundedUser.user

            loading.value = false;
            await openNotify('You have successfully sign in.',
                'You will now be taken to your profile page.', 'profile');
        }catch(err){
            loading.value = false;
            await openNotify('You were unable to login with google.',
                '', '')
            console.log(`Failed to login:`, err);
        }
    };

    const logout = async () => {
        try{
            const logoutUser = await handler('/auth/logout', {
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
            await handler(`/users/${user.value.id}`, {
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