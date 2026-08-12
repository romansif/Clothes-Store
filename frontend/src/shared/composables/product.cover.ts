import { computed } from "vue";
import namer from 'color-namer'
import { productsStore, type Product, type ColorItem} from "@/shared/composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms";

const { moreCreateItem } = productsForms();
const { products, cart, orders, items, product, productId, sizes, activeProductImg } = productsStore();

export const productsCover = () => {
    const toggleColor =  (eventOrColor: Event | string) => {
        if (!Array.isArray(moreCreateItem.color)) {
            moreCreateItem.color = [];
        }
        let hexColor = '';


        if(typeof eventOrColor === "object" && eventOrColor !== null && 'target' in eventOrColor) {
            const target = eventOrColor.target as HTMLInputElement;
            hexColor = target?.value || '';

            const names = namer(hexColor)
            const colorName = names.ntc[0].name

            moreCreateItem.color.push({
                hex: hexColor,
                colorName: colorName,
            });
        }else if(typeof eventOrColor === 'string') {
            hexColor = eventOrColor
        }

        if(!hexColor) console.log('no');
    };

    const toggleSize = (sizeName: string) => {
        const index = moreCreateItem.size.indexOf(sizeName);
        if (!Array.isArray(moreCreateItem.size)) {
            moreCreateItem.size = [];
        }
        if(index === -1){
            moreCreateItem.size.push(sizeName);
        }else{
            moreCreateItem.size.splice(index, 1);
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
        return(id: string, array: Product[]) => {
            if(!id){
                console.log('Id не найден')
                return
            }

            const product = array?.find(p => p.id === id)
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`
            }

            return undefined
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

    const productInfoPreview = computed(() => {
        return(product: Product) => {
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
        return(product: Product): string[] => {
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

    const parsedColor = computed(() => {
        return (id: string, array: Product[]): ColorItem | undefined => {
            if(!id){
                console.log('Id не найден')
                return
            }

            const product = array?.find(p => p.id === id)
            if(product){
                const rawColor =  product.color

                if(typeof rawColor === "string"){
                    return JSON.parse(rawColor) as ColorItem
                }

                return rawColor as ColorItem
            }

            return undefined
        }
    });

    const isAvailableSizes = computed(() => {
        if(!product.value.size){
            return [];
        }
        return sizes.value.filter(size => product.value.size.includes(size.name));
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
    }

    return {
        toggleColor,
        toggleSize,
        changeImg,
        productPreview,
        orderPreview,
        productInfoPreview,
        angelCards,
        parsedColor,
        isAvailableSizes,
        isInCart,
        vHorizontalScroll,
    }
}