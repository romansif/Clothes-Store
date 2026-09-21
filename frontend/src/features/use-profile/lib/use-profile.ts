export const useProfile = () => {
    const userAvatar = (avatar: string | undefined) => {
        if(!avatar){
           return '@/app/assets/photos/default-avatar.png'
        }


        if(avatar.startsWith('http://') || avatar.startsWith('https://')){
            return avatar;
        }

        return `${import.meta.env.VITE_BASE_URL}/${avatar}`
    };

    return{
        userAvatar,
    }
}