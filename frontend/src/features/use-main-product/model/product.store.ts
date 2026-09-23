import { ref } from 'vue'
;
const productId = ref<string>(localStorage.getItem("productId") || '');

export const productStore = () => {
    return {
        productId,
    }
}