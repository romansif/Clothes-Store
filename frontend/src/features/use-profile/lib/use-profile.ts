import { computed } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";

const { userData } = userStore();

export const useProfile = () => {
    const userAvatar = computed(() => {
        if(!userData.value || !userData.value.avatarUrl){
           return '@/app/assets/photos/default-avatar.png'
        }

        const url = userData.value.avatarUrl;

        if(url.startsWith('http://') || url.startsWith('https://')){
            return url;
        }

        return `${import.meta.env.VITE_BASE_URL}/${userData.value.avatarUrl}`
    });

    return{
        userAvatar,
    }
}