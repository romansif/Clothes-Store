import { computed } from "vue";
import namer from 'color-namer'
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import type { ColorItem, Product, SizeGuide, Size } from "@/entities/product/model/product.types.ts";

const { cart } = cartStore();
const { orders, items } = orderStore();
const { moreCreateItem } = productForms();
const { cartForm } = addToCartForm();
const { products, product, productId, sizes, outerwearSizeGuide, underWearSizeGuide, shoesSizeGuide,
    outerWear, underWear, activeProductImg, unit } = productStore();

export const productsCover = () => {
    // const toggleAllVariants = (val: number | string | undefined) => {
    //     const countNum = Math.max(0, Number(val) || 0);
    //     if(!moreCreateItem.variants || moreCreateItem.variants.length === 0) {
    //         moreCreateItem.variants = [{count: countNum}]
    //         return
    //     }
    //
    //     for(const color of moreCreateItem.colors ?? []) {
    //         for(const size of moreCreateItem.sizes ?? []) {
    //             toggleQuantity(color.hex, color.colorName, size).count = countNum
    //         }
    //     }
    // };

    const toggleQuantity = (hex?: string, colorName?: string, size?: string) => {
        let item = moreCreateItem.variants.find(
            (v) => v.hex === hex && v.size === size);

        if(!item) {
            item = {
                hex,
                colorName,
                size,
                count: 0
            }
            moreCreateItem.variants.push(item);
        }
        return item;
    };

    const toggleColor = (color: string, eventOrColor: Event | string) => {
        if (!Array.isArray(moreCreateItem.colors)) {
            moreCreateItem.colors = [];
        }

        if (eventOrColor instanceof Event && eventOrColor.target instanceof HTMLInputElement && eventOrColor.target.type === 'color') {
            const hexColor = eventOrColor.target.value;
            if (!hexColor) return;

            const exists = moreCreateItem.colors.some((c: any) =>
                typeof c === 'string' ? c === hexColor : c.hex === hexColor
            );

            if (!exists) {
                const names = namer(hexColor);
                const colorName = names.ntc[0].name;

                moreCreateItem.colors.push({
                    hex: hexColor,
                    colorName: colorName,
                });
            }
            return;
        }

        const index = moreCreateItem.colors.findIndex((c: any) =>
            typeof c === 'string' ? c === color : c.hex === color
        );
        if (typeof eventOrColor === 'string') {
            return;
        }
        if (index !== -1) {
            moreCreateItem.colors.splice(index, 1);
        }
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

    const productPreview = (id: string, array: Product[]) => {
        if(!id){
            console.log('Id не найден')
            return
        }

        const product = array?.find((p: Product) => p.id === id)
        if(product && Array.isArray(product.images) && product.images[0]){
            return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`
        }

        return undefined
    };

    const productInfoPreview = (product: Product) => {
        if(!product){
            console.log('Product not found');
            return;
        }
        if(product && Array.isArray(product.images) && product.images[0]){
            return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`;
        }
    };

    const angelCards = (product: Product): string[] => {
        if(!product?.images?.length){
            console.log('Product not found');
            return [];
        }

        if(product && Array.isArray(product.images) && product.images.length > 0){
            return product.images.slice(1).map(img => `${import.meta.env.VITE_BASE_URL}/${img}`);
        }
        return [];
    };

    const pureCards = (product: Product): string[] => {
        if(!product?.images?.length){
            console.log('Product not found');
            return [];
        }

        if(product && Array.isArray(product.images) && product.images.length > 0){
            return product.images.slice(0).map(img => `${import.meta.env.VITE_BASE_URL}/${img}`);
        }
        return [];
    };

    const orderItems = computed(() => {
        if(Array.isArray(orders.value)) {
            return orders.value.flatMap(order => order.orderItems || []);
        }
    })

    const orderPreview = (id: string, type: string) => {
        if(!id){
            console.log('Id не найден');
            return;
        }

        const sourceList = type === 'ADD' ? items.value : orderItems.value;

        const order = sourceList?.find(p => p.id === id);

        if(order && Array.isArray(order.images) && order.images[0]){
            return `${import.meta.env.VITE_BASE_URL}/${order.images[0]}`;
        }

    };

    const pureQuantity = (id: string, array: Product[]) => {
        if(!array){
            console.log('Product not found');
            return;
        }

        const product = array?.find(p => p.id === id)
        if(product && Array.isArray(product.variants) && product.variants[0]){
            return product.variants[0]
        }
        return;
    };

    const pureColors = (id: string, array: Product[])  => {
        if(!array){
            console.log('Product not found');
            return;
        }

        const product = array?.find(p => p.id === id)
        if(product && Array.isArray(product.colors) && product.colors[0]){
            return product.colors[0]
        }
        return;
    };

    const pureInfoColors = (product: Product)  => {
        if(!product){
            console.log('Product not found');
            return [];
        }

        if(product && Array.isArray(product.colors) && product.colors.length > 0){
            return product.colors
        }
        return [];
    };

    const pureColorsName = (product: Product): string => {
        if(!product){
            console.log('Product not found');
            return '';
        }

        if(product && Array.isArray(product.colors) && product.colors.length > 0){
            return product.colors.map((color: ColorItem) => color.colorName).join(', ')
        }
        return '';
    };

    const pureSizesName = (product: Product): string => {
        if(!product){
            console.log('Product not found');
            return '';
        }

        if(product && Array.isArray(product.sizes) && product.sizes.length > 0){
            return product.sizes.map((size: Size) => size).join(', ')
        }
        return '';
    };

    const isAvailableSizes = computed(() => {
        if(!product.value.sizes){
            return [];
        }
        return sizes.value.filter(size => product.value.sizes.includes(size.name));
    });

    const isInStock = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(product.variants)){
            return null;
        }
        return product.variants.reduce((sum, variant) => sum + (variant.count ?? 0), 0);
    });

    const isInCart = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find(c => c.productId === product.id) ?? null
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

    const isOutOfStack = (product: Product) => {
        const variants = product.variants.find(p => p.count !== undefined)

        return variants?.count === 0 && product.status === 'Exhausted';
    };

    const variantsInfo = (product: Product) => {
        const variantsList = product?.variants || [];

        const totalCount = variantsList.find(
            p => p.hex === cartForm.value.colors.hex && p.size === cartForm.value.sizes);

        const count = totalCount?.count ?? 0;

        if(count < 4 && count !== 0){
            return `🔥 Only ${count} left`;
        }else if(cartForm.value.colors.hex && cartForm.value.sizes){
            return `In stock ${count} pcs.`;
        }else if(count === 0){
            return `Select specific.`;
        }
    };

    const convertSizeToInches = (sizes: SizeGuide[]) => {
        return sizes.map(size => ({
                ...size,
                values: size.values.map(value => Math.round(Number(value) / 2.54))
            })
        )
    };

    const formatterSizeGuide = computed(() => {
        const category = product.value.category;
        console.log(category);

        const isOuterWear = outerWear.includes(category);
        const isUnderWear = underWear.includes(category);

        if(isOuterWear){
            return unit.value === 'IN' ? convertSizeToInches(outerwearSizeGuide) : outerwearSizeGuide;
        }else if(isUnderWear){
            return unit.value === 'IN' ? convertSizeToInches(underWearSizeGuide) : underWearSizeGuide;
        }
        return unit.value === 'IN' ? convertSizeToInches(shoesSizeGuide) : shoesSizeGuide;
    });

    return {
        productPreview,
        orderPreview,
        productInfoPreview,
        angelCards,
        pureCards,

        pureQuantity,
        pureColors,
        pureInfoColors,
        pureColorsName,

        isAvailableSizes,
        pureSizesName,
        isInStock,
        isInCart,
        vHorizontalScroll,

        // toggleAllVariants,
        toggleQuantity,
        toggleColor,
        toggleSize,
        changeImg,
        isOutOfStack,
        variantsInfo,

        formatterSizeGuide,
    }
}