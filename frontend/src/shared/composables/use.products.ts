const BASE_URL = `http://localhost:3000`;

import { computed } from "vue";
import { productsStore, type Product } from "@/shared/composables/stores/products.store.ts";
import { productsForms } from "@/shared/composables/forms/products.forms.ts";

const { moreCreateItem } = productsForms();
const { products, cart, product, productId, sizes, colors } = productsStore();

export const useProducts = {
    toggleColor  (colorName: string) {
        const index = moreCreateItem.color.indexOf(colorName);
        if (!Array.isArray(moreCreateItem.color)) {
            moreCreateItem.color = [];
        }
        if(index === -1){
            if(moreCreateItem.color.length >= 6){
                return;
            }
            moreCreateItem.color.push(colorName);
        }else{
            moreCreateItem.color.splice(index, 1);
        }
    },

    toggleSize (sizeName: string) {
        const index = moreCreateItem.size.indexOf(sizeName);
        if (!Array.isArray(moreCreateItem.size)) {
            moreCreateItem.size = [];
        }
        if(index === -1){
            moreCreateItem.size.push(sizeName);
        }else{
            moreCreateItem.size.splice(index, 1);
        }
    },

    productPreview: computed(() => {
        return(id: string, array: Product[]) => {
            if(!id){
                console.log('Id не найден')
                return
            }

            const product = array?.find(p => p.id === id)
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${BASE_URL}/${product.images[0]}`
            }

            return undefined
        }
    }),

    productInfoPreview: computed(() => {
        return(product: Product) => {
            if(!product){
                console.log('Product not found');
                return;
            }
            if(product && Array.isArray(product.images) && product.images[0]){
                return `${BASE_URL}/${product.images[0]}`;
            }
        }
    }),

    angelCards: computed(() => {
        return(product: Product): string[] => {
            if(!product){
                console.log('Product not found');
                return [];
            }

            if(product && Array.isArray(product.images) && product.images.length > 0){
                return product.images.slice(1).map((img: string) => `${BASE_URL}/${img}`);
            }
            return [];
        }
    }),

    isAvailableColors: computed(() => {
        if(!product.value.color){
            return '';
        }
        return colors.filter(color => product.value.color.includes(color.name));
    }),

    isAvailableSizes: computed(() => {
        if(!product.value.size){
            return '';
        }
        return sizes.filter(size => product.value.size.includes(size.name));
    }),

    isInCart: computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find((c: any) => c.productId === product.id) ?? null
    }),
}