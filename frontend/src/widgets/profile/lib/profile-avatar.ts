import { useUserData } from "@/widgets/profile/lib/use-user-data";

export const userAvatar = () => {
    const { user } = useUserData()

    const avatar = () => {

        if(!user.value){
            return '@/app/assets/photos/default-avatar.png'
        }

        if(user.value.avatarUrl.startsWith('http://') || user.value.avatarUrl.startsWith('https://')){
            return user.value.avatarUrl;
        }

        return `${import.meta.env.ViTE_BASE_URL}/${user.value.avatarUrl}`
    }

    return {
        avatar
    }
};

