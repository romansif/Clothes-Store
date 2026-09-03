import type {Product} from "@/entities/product/model/product.types.ts";
import {handler} from "@/shared/api/http.ts";
import router from "@/app/router";
import namer from "color-namer";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

const { currentFile } = productStore();
const { getProduct } = useGetProduct();
const { createProductForm } = productForms();
const { openNotify, loading } = useBaseModals();

export const useUpdateProduct = () => {
    const updateProductImages = async (product: Product, event: Event) => {
        loading.value = true;
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


            await handler(`/products/${product.id}/${currentFile.value}/images`, {
                method: "PATCH",
                body: formData
            });

            loading.value = false;

            await getProduct(product.id);

            await openNotify('You have successfully changed the product card images.', '', '')
        }catch(err){
            loading.value = false;

            await openNotify(`You haven't entered anything to change.`, '', '');
            console.error(`Failed to edit the product cover:`, err);
        }
    };

    const updateProductDesc = async (id: string) => {
        loading.value = true;
        try{
            await handler(`/products/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    collections: createProductForm.value.collection,
                    title: createProductForm.value.title,
                    category: createProductForm.value.category,
                    material: createProductForm.value.material,
                    gender: createProductForm.value.gender,
                    price: createProductForm.value.price,
                    description: createProductForm.value.description,
                })
            });
            loading.value = false;

            await openNotify('You have successfully changed the product card description.', '', '');
            await router.push({ name: 'my/products'})
        }catch(err){
            loading.value = false;

            await openNotify(`You haven't entered anything to change.`, '', '');
            console.error(`Failed to edit the product cover:`, err);
        }
    };

    const updateProductColors = async (product: Product, index: number, eventOrColor: Event | string) => {
        loading.value = true;
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
                    ...product.colors[index],
                    hex: hexColor,
                    colorName: colorName
                };

                await handler(`/products/${product.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        colors: product.colors,
                    }),
                });
            }
            loading.value = false;

            await openNotify('You have successfully changed the product colors on the product card.', '', '')
        }catch(err){
            loading.value = false;
            await openNotify(`You haven't entered anything to change.`, '', '');
            console.error(`Failed to edit the colors product cover:`, err);
        }
    };

    return {
        updateProductImages,
        updateProductDesc,
        updateProductColors
    }
}