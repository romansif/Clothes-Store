import type { UserDataUpdate } from "@/features/change-user-data-form";

export type EditUserPayload = {
  dataToUpdate: UserDataUpdate;
  type: string;
};
