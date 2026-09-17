import type {Product} from "@/features/use-product/model/product.types.ts";

export const productsHelper = () => {
    const isInStock = (product: Product) => {
        if(!product?.id || !product.variants) return;

        return product.variants.reduce((sum, variant) => sum + (variant.count ?? 0), 0);
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