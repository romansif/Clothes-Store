import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { users, userData } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify.ts";

const { openNotify } = useBaseModals();

export const deleteAccount = async () => {
    if(!userData.value) return

    try{
        await handler(`/users/${userData.value.id}`, {
            method: "DELETE",
        });

        await openNotify('You have successfully delete account',
            'You will now be taken to sign in page');
        await router.push({name: 'signIn'})
    }catch(err){
        console.error(`Failed to delete the user:`, err);
    }
};

export const logout = async () => {
    try{
        users.value = await handler('/auth/logout', {
            method: "POST",
        })
    }catch(err){
        console.log(`Failed to logout:`, err);
    }finally {
        localStorage.clear();
        await router.push({name: 'signIn'})
    }
};