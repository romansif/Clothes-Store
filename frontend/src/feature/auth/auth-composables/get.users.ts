import { handler } from '@/shared/api/http'
import { usersStore } from "@/shared/composables/stores/users.store";

const { users, user } = usersStore()

export const useGetUsers = () => {
    const getUsers = async () => {
        try{
            const res = await handler('/profile', {
                method: "GET",
            })
            users.value = res;

            return users;
        }catch(err){
            console.log(`Failed to get the users:`, err);
        }
    };

    const getUser = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/users/${userId}`, {
                method: "GET",
            });
            user.value = res;

            return user;
        }catch(err){
            console.log(`Failed to get the user:`, err);
        }
    };

    return{
        getUsers,
        getUser,
    }
}