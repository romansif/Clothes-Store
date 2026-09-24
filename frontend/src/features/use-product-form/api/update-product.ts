import namer from "color-namer";
import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import type { ColorItem, Product} from "@/shared/model/product.types.ts";
import { currentFile } from "@/shared/lib/helper/product-helper.ts";
import { createProductForm } from "@/entities/product-form/model/product.forms.ts";

const { openNotify } = useBaseModals();

export const useUpdateProduct = () => {
    const updateProductImages = async (product: Product | undefined, event: Event) => {
        try{
            if(!product){
                console.log('Такого продукта не существует');
                return
            }

            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file || currentFile.value === null) {
                return;
            }

            const formData = new FormData();
            formData.append(`images`, file);


            await handler(`/products/${product?.id}/${currentFile.value}/images`, {
                method: "PATCH",
                body: formData
            });
        }catch(err){
            await openNotify(`You haven't entered anything to change.`, '');
            console.error(`Failed to edit the product cover:`, err);
        }
    };

    const updateProductDesc = async (product: Product | undefined) => {
        try{
            await handler(`/products/${product?.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    collections: createProductForm.value.collections,
                    title: createProductForm.value.title,
                    category: createProductForm.value.category,
                    material: createProductForm.value.material,
                    gender: createProductForm.value.gender,
                    price: createProductForm.value.price,
                    description: createProductForm.value.description,
                })
            });

            await openNotify('You have successfully changed the product card description',
                'Now, if you go to the my products page, your product will be there, and on the useProfile page as well');
            await router.push({ name: 'my/products'})
        }catch(err){
            await openNotify(`You haven't entered anything to change.`, '');
            console.error(`Failed to edit the product cover:`, err);
        }
    };

    const updateProductCount = async (
        product: Product | null, color: ColorItem, size: string, value: string) => {
        try{
            if(!product || !color.hex || !size || !value){
                console.log('Вы не добавили никаких значений дл изменения');
                return
            }
            const variant = product?.variants.find(v => v.hex === color.hex && v.size === size);
            if(!variant){
                console.log('Variant not found');
                return;
            }

            variant.count = Number(value);

            await handler(`/products/${product?.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    variants: product?.variants,
                })
            })
        }catch(err){
            await openNotify(`You haven't entered anything to change.`, '');
            console.error(`Failed to edit the variants product cover:`, err);
        }
    };

    const updateProductColors = async (product: Product | null, index: number, eventOrColor: Event | string) => {
        try{
            if(!product){
                console.log('Такого продукта не существует');
                return
            }

            if(typeof eventOrColor === "object" && eventOrColor !== null && 'target' in eventOrColor) {
                let hexColor = '';

                const target = eventOrColor.target as HTMLInputElement;
                hexColor = target?.value || '';

                const names = namer(hexColor);
                const colorName = names.ntc[0].name;

                product.colors[index] = {
                    ...product?.colors[index],
                    hex: hexColor,
                    colorName: colorName
                };

                await handler(`/products/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        colors: product?.colors,
                    }),
                });
            }
        }catch(err){
            await openNotify(`You haven't entered anything to change.`, '');
            console.error(`Failed to edit the colors product cover:`, err);
        }
    };

    return {
        updateProductImages,
        updateProductDesc,
        updateProductCount,
        updateProductColors
    }
}