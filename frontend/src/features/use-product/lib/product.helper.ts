import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import type { Product, ColorItem, Size, SizeGuide } from "@/features/use-product/model/product.types.ts";

const { product } = useGetProduct();
const { cartForm } = addToCartForm();
const { activeProductImg, sizes, outerWear, underWear,
    outerwearSizeGuide, underWearSizeGuide, unit, shoesSizeGuide } = productStore();

export const productHelper = () => {
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

    const formatterSizeGuide = (product: Product) => {
        const category = product.category;
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
        return [...new Set(product.variants.map((variant: any) => variant.size))]
    }

    return {
        changeImg,
        productPreview,
        productInfoPreview,
        angelCards,
        pureCards,
        pureQuantity,
        pureColors,
        pureInfoColors,
        pureColorsName,
        pureSizesName,
        isAvailableSizes,
        isOutOfStack,
        variantsInfo,
        formatterSizeGuide,
        uniqueColors,
        uniqueSizes,
    }
}