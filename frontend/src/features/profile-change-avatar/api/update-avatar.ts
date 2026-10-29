import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useChangeAvatar = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: changeAvatar,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["changeAvatar"],
        mutationFn: async (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (!target.files || target.files.length === 0) return;
            const selectedFile = target.files[0];

            const formData = new FormData();
            formData.append("avatar", selectedFile);

            return await handler(`/avatar/${userId}`, {
                method: "PATCH",
                body: formData,
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
        },

        onError: (err) => {
            throw new Error("Ошибка при изменении аватара пользователя", err);
        },
    });

    return {
        changeAvatar,
        isPending,
        isError,
    };
};
