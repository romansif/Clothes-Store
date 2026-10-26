import { handler } from '@/shared/api/http'
import { users, userData } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { loading } = useBaseModals();

export const useGetUsers = () => {
    const getUsers = async () => {
        loading.value = true;

        try{
            users.value = await handler('/users', {
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

        const userId = localStorage.getItem("userId");

        try{
            if(!userId) return

            userData.value = await handler(`/users/${userId}`, {
                method: "GET",
            });

            return userData.value;
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