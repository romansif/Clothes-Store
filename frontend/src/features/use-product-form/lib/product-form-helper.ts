import namer from "color-namer";
import { createProductForm, moreCreateItemForm } from "@/entities/product-form/model/product.forms.ts";

export const productFormHelper  = () => {
    const toggleAllVariants = () => {
        const quantity = Number(createProductForm.value.quantity);
        if(!quantity) {
            return;
        }

        moreCreateItemForm.variants = []

        moreCreateItemForm.colors.forEach(color => {
            moreCreateItemForm.sizes.forEach(size => {
                moreCreateItemForm.variants.push({
                    hex: color.hex,
                    colorName: color.colorName,
                    size: size,
                    count: quantity
                })
            })
        })
    };

    const toggleQuantity = (hex: string, colorName: string, size: string) => {
        let item = moreCreateItemForm.variants.find(v => v.hex === hex && v.size === size);

        if(!item) {
            item = {
                hex,
                colorName,
                size,
                count: 0
            }
            moreCreateItemForm.variants.push(item);
        }
        return item;

    };

    const toggleColor = (color: string, eventOrColor: Event | string) => {
        if (!Array.isArray(moreCreateItemForm.colors)) {
            moreCreateItemForm.colors = [];
        }

        if (eventOrColor instanceof Event && eventOrColor.target instanceof HTMLInputElement && eventOrColor.target.type === 'color') {
            const hexColor = eventOrColor.target.value;
            if (!hexColor) return;

            const exists = moreCreateItemForm.colors.some(c =>
                typeof c === 'string' ? c === hexColor : c.hex === hexColor
            );

            if (!exists) {
                const names = namer(hexColor);
                const colorName = names.ntc[0].name;

                moreCreateItemForm.colors.push({
                    hex: hexColor,
                    colorName: colorName,
                });
            }
            return;
        }

        const index = moreCreateItemForm.colors.findIndex(c =>
            typeof c === 'string' ? c === color : c.hex === color
        );
        if (typeof eventOrColor === 'string') {
            return;
        }
        if (index !== -1) {
            moreCreateItemForm.colors.splice(index, 1);
        }
    };

    const toggleSize = (sizeName: string) => {
        const index = moreCreateItemForm.sizes.indexOf(sizeName);
        if (!Array.isArray(moreCreateItemForm.sizes)) {
            moreCreateItemForm.sizes = [];
        }
        if(index === -1){
            moreCreateItemForm.sizes.push(sizeName);
        }else{
            moreCreateItemForm.sizes.splice(index, 1);
        }
    };

    return {
        toggleAllVariants, toggleQuantity, toggleColor, toggleSize
    }
}