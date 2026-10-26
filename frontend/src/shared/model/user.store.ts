import { ref } from 'vue'
import type { User } from "@/entities/profile";

export const users = ref<User[]>([])

export const userData = ref<User | null>(null);
