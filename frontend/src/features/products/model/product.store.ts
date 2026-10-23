import { ref } from 'vue'

export const productId = ref<string>(localStorage.getItem("productId") || '');
