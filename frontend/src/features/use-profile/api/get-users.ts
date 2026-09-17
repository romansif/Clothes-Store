import { handler } from '@/shared/api/http.ts'
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

const { loading } = useBaseModals();
const { users, userData } = userStore();

export const useGetUsers = () => {
    const getUsers = async () => {
        loading.value = true;

        try{
            users.value = await handler('/useProfile', {
                method: "GET",
            });
        }catch(err){
            console.log(`Failed to get the users:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getUser = async () => {
        loading.value = true;

        try{
            if(!userData.value) return

            userData.value = await handler(`/users/${userData.value.id}`, {
                method: "GET",
            });
        }catch(err){
            console.log(`Failed to get the user:`, err);
        }finally {
            loading.value = false;
        }
    };

    return{
        getUsers,
        getUser,
    }
}