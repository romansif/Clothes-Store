import { handler } from '@/shared/api/http.ts'
import { userStore } from "@/features/use-profile/model/user.store.ts";
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
        }catch(err){
            console.log(`Failed to get the users:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getUser = async () => {
        loading.value = true;
        try{
            const res = await handler(`/users/${userData.id}`, {
                method: "GET",
            });
            user.value = res;
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