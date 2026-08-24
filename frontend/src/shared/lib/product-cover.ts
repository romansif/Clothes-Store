import { computed } from "vue";
import namer from 'color-namer'
import { cartStore } from "@/feature/cart/model/cart.store.ts";
import { orderStore } from "@/feature/order/model/order.store.ts";
import { productForms } from "@/feature/product/model/product.forms.ts";
import { productStore } from "@/feature/product/model/product.store.ts";
import type { ColorItem, Product, Sizes } from "@/entities/products/product.types.ts";


const { cart } = cartStore();
const { orders, items } = orderStore();
const { moreCreateItem } = productForms();
const { products, product, productId, sizes, activeProductImg } = productStore();

export const productsCover = () => {
    const toggleColor =  (eventOrColor: Event | string) => {
        if (!Array.isArray(moreCreateItem.colors)) {
            moreCreateItem.colors = [];
        }
        let hexColor = '';


        if(typeof eventOrColor === "object" && eventOrColor !== null && 'target' in eventOrColor) {
            const target = eventOrColor.target as HTMLInputElement;
            hexColor = target?.value || '';

            const names = namer(hexColor)
            const colorName = names.ntc[0].name

            moreCreateItem.colors.push({
                hex: hexColor,
                colorName: colorName,
            });
        }else if(typeof eventOrColor === 'string') {
            hexColor = eventOrColor
        }

        if(!hexColor) console.log('no');
    };

    const toggleSize = (sizeName: string) => {
        const index = moreCreateItem.sizes.indexOf(sizeName);
        if (!Array.isArray(moreCreateItem.sizes)) {
            moreCreateItem.sizes = [];
        }
        if(index === -1){
            moreCreateItem.sizes.push(sizeName);
        }else{
            moreCreateItem.sizes.splice(index, 1);
        }
    };

    const changeImg =  (index: number)=> {
        if(!product.value || !Array.isArray(product.value.images)) return;

        const realIndex = index + 1;
        const mainPath = product.value.images[0];

        product.value.images[0] = product.value.images[realIndex];
        product.value.images[realIndex] = mainPath;

        activeProductImg.value = `${import.meta.env.VITE_BASE_URL}/${product.value.images[0]}`;
    };

    const productPreview = computed(() => {
        return(id: string, array: any) => {
            if(!id){
                console.log('Id не найден')
                return
            }

            const product = array?.find((p: any) => p.id === id)
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`
            }

            return undefined
        }
    });

    const productInfoPreview = computed(() => {
        return(product: any) => {
            if(!product){
                console.log('Product not found');
                return;
            }
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`;
            }
        }
    });

    const angelCards = computed(() => {
        return(product: any): string[] => {
            if(!product){
                console.log('Product not found');
                return [];
            }

            if(product && Array.isArray(product.images) && product.images.length > 0){
                return product.images.slice(1).map((img: string) => `${import.meta.env.VITE_BASE_URL}/${img}`);
            }
            return [];
        }
    });

    const pureCards = computed(() => {
        return(product: any): string[] => {
            if(!product){
                console.log('Product not found');
                return [];
            }

            if(product && Array.isArray(product.images) && product.images.length > 0){
                return product.images.slice(0).map((img: string) => `${import.meta.env.VITE_BASE_URL}/${img}`);
            }
            return [];
        }
    });

    const orderItems = computed(() => {
        if(Array.isArray(orders.value)) {
            return orders.value.flatMap(order => order.orderItems || []);
        }
    })

    const orderPreview = computed(() => {
        return(id: string, type: string) => {
            if(!id){
                console.log('Id не найден');
                return;
            }

            const sourceList = type === 'ADD' ? items.value : orderItems.value;

            const order = sourceList?.find(p => p.id === id);

            if(order && Array.isArray(order.images) && order.images[0]){
                return `${import.meta.env.VITE_BASE_URL}/${order.images[0]}`;
            }
        }
    });

    const pureColors = computed(() => {
        return(id: string, array: any)  => {
            if(!array){
                console.log('Product not found');
                return;
            }

            const product = array?.find((p: any) => p.id === id)
            if(product && Array.isArray(product.colors) && product.colors[0]){
                return product.colors[0]
            }
            return;
        }
    });

    const pureInfoColors = computed(() => {
        return(product: any)  => {
            if(!product){
                console.log('Product not found');
                return [];
            }

            if(product && Array.isArray(product.colors) && product.colors.length > 0){
                return product.colors
            }
            return [];
        }
    });

    const pureColorsName = computed(() => {
        return(product: any): string => {
            if(!product){
                console.log('Product not found');
                return '';
            }

            if(product && Array.isArray(product.colors) && product.colors.length > 0){
                return product.colors.map((color: ColorItem) => color.colorName).join(', ')
            }
            return '';
        }
    })

    const pureSizesName = computed(() => {
        return(product: any): string => {
            if(!product){
                console.log('Product not found');
                return '';
            }

            if(product && Array.isArray(product.sizes) && product.sizes.length > 0){
                return product.sizes.map((size: Sizes) => size).join(', ')
            }
            return '';
        }
    });

    const isAvailableSizes = computed(() => {
        if(!product.value.sizes){
            return [];
        }
        return sizes.value.filter(size => product.value.sizes.includes(size.name));
    });

    const isInCart = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find((c: any) => c.productId === product.id) ?? null
    });

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

    const isValidOutOfStack = (product: Product) => {
        const userId = localStorage.getItem('userId');

        const hasOutOfStack = product.quantity === 0

        return userId && hasOutOfStack
    };

    const isOutOfStack = (product: Product) => {
        return product.quantity === 0 || product.status === 'Exhausted'
    };

    return {
        productPreview,
        orderPreview,
        productInfoPreview,
        angelCards,
        pureCards,

        pureColors,
        pureInfoColors,
        pureColorsName,

        isAvailableSizes,
        pureSizesName,
        isInCart,
        vHorizontalScroll,

        toggleColor,
        toggleSize,
        changeImg,

        isValidOutOfStack,
        isOutOfStack
    }
}