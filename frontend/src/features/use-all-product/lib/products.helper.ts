import { useGetProducts } from "@/features/use-all-product/api/get-product.ts";
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const { productId } = productStore();
const { products } = useGetProducts();

export const productsHelper = () => {
    const isInStock = () => {
        const product = products.value.find((p: Product) => p.id === productId.value);
        if(!product?.id || !Array.isArray(product.variants)){
            return null;
        }
        return product.variants.reduce((sum: any, variant: any) => sum + (variant.count ?? 0), 0);
    };

    return {
        isInStock,
    }
}