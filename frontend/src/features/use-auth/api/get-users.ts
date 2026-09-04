import { handler } from '@/shared/api/http.ts'
import { userStore } from "@/entities/profile/model/user.store.ts";

const { users, user, userData } = userStore();

export const useGetUsers = () => {
    const getUsers = async () => {
        try{
            const res = await handler('/useProfile', {
                method: "GET",
            })
            users.value = res;
        }catch(err){
            console.log(`Failed to get the users:`, err);
        }
    };

    const getUser = async () => {
        try{
            const res = await handler(`/users/${userData.id}`, {
                method: "GET",
            });
            user.value = res;
        }catch(err){
            console.log(`Failed to get the user:`, err);
        }
    };

    return{
        getUsers,
        getUser,
    }
}