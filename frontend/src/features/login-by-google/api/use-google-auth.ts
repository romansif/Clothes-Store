import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { userData } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";
import { loginForm } from "@/entities/login-form/model/login-from";

const { loading, openNotify } = useBaseModals();

export const signGoogleAuth = async (response: any) => {
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
            localStorage.setItem("userId", foundedUser.id);
        }
        userData.value = foundedUser.user

        await openNotify('You have successfully sign in',
            'You will now be taken to your profile page');
        await router.push({name: 'profile'})
    }catch(err){
        await openNotify('You were unable to login with google', '')
        console.log(`Failed to login:`, err);
    }finally {
        loading.value = false;
    }
};