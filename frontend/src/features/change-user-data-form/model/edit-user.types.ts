import type { UserDataUpdate } from "@/entities/profile-form";

export type EditUserPayload = {
    dataToUpdate: UserDataUpdate;
    type: string;
    title: string;
};
