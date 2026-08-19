import { handler } from '@/shared/api/http'
import { usersStore } from "@/shared/composables/stores/users.store";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";

const { users, user } = usersStore();
const { loading } = useBaseModals();

export const useGetUsers = () => {
    const getUsers = async () => {
        loading.value = true;

        try{
            const res = await handler('/profile', {
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