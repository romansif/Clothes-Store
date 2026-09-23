import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearProductForm } from "@/features/use-product-form/lib/clear-product-form.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { applyZodErrors, applyErrors } from "@/shared/lib/helper/errors-helper.ts";
import { imageFiles } from "@/shared/lib/helper/product-helper.ts";
import {
    createProductForm, moreCreateItemForm,
    createProductFormErrorMessages, moreCreateItemFormErrorMessages
} from "@/entities/product-form/model/product.forms.ts";
import { createProductSchema, moreCreateItemsSchema } from "@/entities/product-form/model/product.schemas.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();

export const useAddProduct = () => {
    const createProduct = async () => {
        const result1 = createProductSchema.safeParse(createProductForm.value)
        const result2 = moreCreateItemsSchema.safeParse(moreCreateItemForm)

        if(!result1.success){
            applyZodErrors(
                result1.error,
                createProductFormErrorMessages
            );
        }
        if(!result2.success){
            applyZodErrors(
                result2.error,
                moreCreateItemFormErrorMessages
            );
        }
        if (!result1.success || !result2.success) return;


        try{
            if(!userData.value) return

            const formData = new FormData();

            const productData = {
                userId: userData.value.id,
                title: createProductForm.value.title,
                collection: createProductForm.value.collections,
                category: createProductForm.value.category,
                material: createProductForm.value.material,
                gender: createProductForm.value.gender,
                sku: createProductForm.value.sku,
                price: createProductForm.value.price,
                description: createProductForm.value.description,
                sizes: moreCreateItemForm.sizes,
                colors: moreCreateItemForm.colors,
                variants: moreCreateItemForm.variants,
                status: 'Availability',
            }

            formData.append('product', JSON.stringify(productData));

            imageFiles.value.forEach((file) => {
                if(file){
                    formData.append('images', file)
                }else{
                    console.log('Product photo not found.')
                    return
                }
            });

            await handler('/products', {
                method: "POST",
                body: formData,
            });

            await openNotify('You have successfully created a new product card',
                'Now, if you go to the products page, your product will be there, and on the useProfile page as well')
            await router.push({ name: 'my/products'})

            clearProductForm();
        }catch(err){
            applyErrors(
                err,
                createProductFormErrorMessages,
            );
            applyErrors(
                err,
                moreCreateItemFormErrorMessages
            )
            console.error(`Failed to create the products cover:`, err);
        }
    };

    return{
        createProduct,
    }
}