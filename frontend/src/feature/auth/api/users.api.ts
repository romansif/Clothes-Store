import { handler } from '@/shared/api/http'
import { userStore } from "@/feature/profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

const { loading } = useBaseModals();
const { users, user, userData } = userStore();

export const useGetUsers = () => {
    const getUsers = async () => {
        loading.value = true;

        try{
            const res = await handler('/useProfile', {
                method: "GET",
            })
            users.value = res;

            loading.value = false;
        }catch(err){
            console.log(`Failed to get the users:`, err);
        }
    };

    const getUser = async () => {
        loading.value = true;
        try{
            const res = await handler(`/users/${userData.id}`, {
                method: "GET",
            });
            user.value = res;

            loading.value = false;
        }catch(err){
            console.log(`Failed to get the user:`, err);
        }
    };

    return{
        getUsers,
        getUser,
    }
}