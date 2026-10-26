import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { loginForm } from "@/entities/auth-password/model/auth-form";
import { userStore } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { userData } = userStore();
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
            localStorage.setItem("user", JSON.stringify(foundedUser));
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