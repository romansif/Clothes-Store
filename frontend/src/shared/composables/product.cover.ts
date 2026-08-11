import { computed } from "vue";
import namer from 'color-namer'
import { productsStore, type Product } from "@/shared/composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms";

const { moreCreateItem } = productsForms();
const { products, cart, product, productId, sizes, activeProductImg } = productsStore();

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

        console.log(moreCreateItem.color);
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


    const isAvailableSizes = computed(() => {
        if(!product.value.size){
            return [];
        }
        return sizes.filter(size => product.value.size.includes(size.name));
    });

    const isInCart = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find((c: any) => c.productId === product.id) ?? null
    });

    return {
        toggleColor,
        toggleSize,
        changeImg,
        productPreview,
        productInfoPreview,
        angelCards,
        isInCart,
        isAvailableSizes,
    }
}