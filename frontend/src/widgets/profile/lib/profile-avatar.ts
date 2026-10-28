import type { User } from "@/entities/profile";

export const userAvatar = (user: User | undefined) => {
    if(!user){
        return '@/app/assets/photos/default-avatar.png'
    }

    if(user.avatarUrl.startsWith('http://') || user.avatarUrl.startsWith('https://')){
        return user.avatarUrl;
    }

    return `${import.meta.env.ViTE_BASE_URL}/${user.avatarUrl}`
};

