export const useProfile = () => {
    const userAvatar = (user: any) => {
        if(!user || !user.avatarUrl){
           return '@/app/assets/photos/default-avatar.png'
        }

        const url = user.avatarUrl;

        if(url.startsWith('http://') || url.startsWith('https://')){
            return url;
        }

        return `${import.meta.env.VITE_BASE_URL}/${url}`
    };

    return{
        userAvatar,
    }
}