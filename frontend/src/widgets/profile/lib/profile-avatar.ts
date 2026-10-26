export const userAvatar = (avatar: string | undefined) => {
    if(!avatar){
        return '@/app/assets/photos/default-avatar.png'
    }

    if(avatar.startsWith('http://') || avatar.startsWith('https://')){
        return avatar;
    }

    return `${import.meta.env.ViTE_BASE_URL}/${avatar}`
};

