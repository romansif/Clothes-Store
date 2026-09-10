import { computed, ref } from "vue";
import namer from "color-namer";
import { handler } from "@/shared/api/http.ts";
import { productStore } from "@/features/use-product/model/product.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import type {ColorItem, Product, Size, SizeGuide} from "@/features/use-product/model/product.types.ts";

const { cart } = cartStore();
const { userData } = userStore();
const { loading } = useBaseModals();
const { cartForm } = addToCartForm();
const { orders, items } = orderStore();
const { createProductForm, moreCreateItem } = productForms();
const {
    productId, activeProductImg, sizes, outerwearSizeGuide, underWearSizeGuide, shoesSizeGuide, outerWear, underWear, unit
} = productStore();

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);

const myProducts = ref<Product[]>([]);

const productsWeek = ref<Product[]>([]);
const productsYear = ref<Product[]>([]);

const springCatalog = ref<Product[]>([]);
const summerCatalog = ref<Product[]>([]);
const autumnCatalog = ref<Product[]>([]);
const winterCatalog = ref<Product[]>([]);

const product = ref<Product>({} as Product);

export const useGetProduct = () => {
    const getAllProducts = async () => {
        loading.value = true;
        try{
            const res = await handler(`/products`, {
                method: 'GET',
            })
            products.value = res;
            allProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        loading.value = true;
        try{
            const res = await handler(`/filtered/${type}/${filter}`, {
                method: 'GET',
            })
            products.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getWeekProducts = async (type: string, filter: string) => {
        loading.value = true;
        try{
            const res = await handler(`/products/week/${type}/${filter}`, {
                method: 'GET',
            })
            productsWeek.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getYearProducts = async (type: string, filter: string) => {
        loading.value = true;
        try{
            const res = await handler(`/products/year/${type}/${filter}`, {
                method: 'GET',
            })
            productsYear.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getSeasonal = async (collection: string) => {
        loading.value = true;
        try{
            const res = await handler(`/products/collections/${collection}`, {
                method: 'GET',
            })

            switch (collection) {
                case "Spring":
                    springCatalog.value = res;
                    break;
                case "Summer":
                    summerCatalog.value = res;
                    break;
                case "Autumn":
                    autumnCatalog.value = res;
                    break;
                case "Winter":
                    winterCatalog.value = res;
                    break;
            }

            console.log(autumnCatalog.value);
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getProduct = async (id: string | string[]) => {
        loading.value = true;
        try{
            const data = await handler(`/products/${id}`, {
                method: 'GET',
            });
            product.value = data
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }finally {
            loading.value = false;
        }
    };

    const getMyProducts = async () => {
        loading.value = true;
        try{
            const res = await handler(`/my/products/${userData.id}`, {
                method: 'GET',
            })
            myProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }finally {
            loading.value = false;
        }
    };

    const toggleAllVariants = () => {
        const quantity = Number(createProductForm.value.quantity);
        if(!quantity) {
            return;
        }

        moreCreateItem.variants = []

        moreCreateItem.colors.forEach((color) => {
            moreCreateItem.sizes.forEach((size) => {
                moreCreateItem.variants.push({
                    hex: color.hex,
                    colorName: color.colorName,
                    size: size,
                    count: quantity
                })
            })
        })
    };

    const toggleQuantity = (hex: string, colorName: string, size: string) => {
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

    const orderItems = () => {
        if(Array.isArray(orders.value)) {
            return orders.value.flatMap(order => order.orderItems || []);
        }
    };

    const orderPreview = (id: string, type: string) => {
        if(!id){
            console.log('Id не найден');
            return;
        }

        const sourceList = type === 'ADD' ? items.value : orderItems();

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

    const isAvailableSizes = (product: Product) => {
        if(!product.sizes){
            return [];
        }
        return sizes.value.filter(size => product.sizes.includes(size.name));
    };

    const isInStock = () => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(product.variants)){
            return null;
        }
        return product.variants.reduce((sum, variant) => sum + (variant.count ?? 0), 0);
    };

    const isInCart = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find(c => c.productId === product.id)
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
        return product.variants.every(v => v.count === 0)
    };

    const variantsInfo = (product: Product) => {
        const variantsList = product?.variants || [];

        const totalCount = variantsList.find(
            v => v.hex === cartForm.value.colors.hex && v.size === cartForm.value.sizes);

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

    const formatterSizeGuide = () => {
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
    };

    const uniqueColors = (product: Product) => {
        return [
            ...new Map(
                product.variants.map((variant) => [
                    variant.colorName,
                    {
                        colorName: variant.colorName,
                        hex: variant.hex,
                    }
                ])
            ).values()
        ]
    };

    const uniqueSizes = (product: Product) => {
        return [...new Set(product.variants.map((variant) => variant.size))]
    }

    return {
        allProducts,
        products,
        myProducts,

        productsWeek,
        productsYear,

        springCatalog,
        summerCatalog,
        autumnCatalog,
        winterCatalog,

        product,

        getAllProducts,
        getFilteredProducts,
        getMyProducts,
        getSeasonal,
        getWeekProducts,
        getYearProducts,
        getProduct,
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

        toggleAllVariants,
        toggleQuantity,
        toggleColor,
        toggleSize,
        changeImg,
        isOutOfStack,
        variantsInfo,

        formatterSizeGuide,

        uniqueColors,
        uniqueSizes,
    }
}