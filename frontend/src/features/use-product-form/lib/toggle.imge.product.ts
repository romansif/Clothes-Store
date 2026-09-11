import {ref} from "vue";
import {productStore} from "@/features/use-all-product/model/product.store.ts";

const { currentFile } = productStore();

export const fileInput = ref<HTMLInputElement | null>(null)

export const openSelectProductCard = (index: number) => {
    currentFile.value = index;
    fileInput.value?.click();
};