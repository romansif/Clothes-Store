import { ref } from "vue";

import type { Role } from "@/features/register-auth";

export const isRole = ref<boolean>(false);

export const currentRole = ref<Role>("Buyer");
