import { ref } from "vue";
import type { Product } from "@/shared/model/product.types.ts";
import { product } from "@/features/use-product/api/get-product.ts";

export const stackInfo = ref<boolean>(false);

export const toggleStackInfo = (obj: Product) => {
    product.value = obj;
    stackInfo.value = !stackInfo.value;
}