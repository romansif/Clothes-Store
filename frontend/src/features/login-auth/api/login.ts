import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { userStore } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { loginSchema } from "@/entities/auth/model/auth-schemas";
import { loginForm, loginFormErrorMessages } from "@/entities/auth/model/auth-form";

const { userData } = userStore();
const { loading, openNotify } = useBaseModals();

export const signIn = async () => {
    clearLoginFormMessages();

    const result = loginSchema.safeParse(loginForm.value)
    if(!result.success){
        applyZodErrors(
            result.error,

            loginFormErrorMessages
        )
        return
    }

    loading.value = true;

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
            localStorage.setItem("user", JSON.stringify(foundedUser));
        }
        userData.value = foundedUser.user

        await openNotify('You have successfully sign in',
            'You will now be taken to your profile page');
        await router.push({name: 'profile'})

        clearLoginForm()
    }catch(err){
        applyErrors(
            err,

            loginFormErrorMessages
        )
        console.log(`Failed to login:`, err);
    }finally {
        loading.value = false;
    }
};