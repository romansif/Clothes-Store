import { handler } from "@/shared/api/http";
import { userStore } from "@/shared/model/user.store";

const { userData } = userStore();

export const updateAvatarAccount = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if(!target.files || target.files.length === 0) return;
    const selectedFile = target.files[0];

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try{
        if(!userData.value) return

        userData.value.avatarUrl = await handler(`/avatar/${userData.value.id}`, {
            method: "PATCH",
            body: formData,
        });
    }catch(err){
        console.log('Failed to change the avatar', err);
    }
};