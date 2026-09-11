import namer from "color-namer";
import { productForms } from "@/features/use-product-form/model/product.forms.ts";

const { createProductForm, moreCreateItem } = productForms()

export const productFormHelper  = () => {
    const toggleAllVariants = () => {
        const quantity = Number(createProductForm.value.quantity);
        if(!quantity) {
            return;
        }

        moreCreateItem.variants = []

        moreCreateItem.colors.forEach((color: any) => {
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
        let item = moreCreateItem.variants.find((v: any) => v.hex === hex && v.size === size);

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

    return {
        toggleAllVariants, toggleQuantity, toggleColor, toggleSize
    }
}