import type { Product } from "@/features/use-product/model/product.types.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import {ref} from "vue";

const { product } = useGetProduct();
export const stackInfo = ref<boolean>(false);

export const toggleStackInfo = (obj: Product) => {
    product.value = obj;
    stackInfo.value = !stackInfo.value;
}