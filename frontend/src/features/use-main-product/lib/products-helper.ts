import { useGetProducts } from "@/features/use-main-product/api/get-product.ts";
import { productStore } from "@/features/use-main-product/model/product.store.ts";
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

    const vHorizontalScroll = {
        mounted(el: HTMLElement) {
            const onWheel = (e: WheelEvent) => {
                if(e.deltaY === 0) return;
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
            el.addEventListener('wheel', onWheel, { passive: false});
        }
    };

    return {
        isInStock,
        vHorizontalScroll,
    }
}