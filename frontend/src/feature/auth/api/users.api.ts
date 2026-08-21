import { handler } from '@/shared/api/http'
import { usersStore } from "@/feature/profile/model/users.store.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";

const { loading } = useBaseModals();
const { users, user } = usersStore();

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

        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/users/${userId}`, {
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