import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { productStore } from "@/features/use-main-product/model/product.store.ts";
import { clearProductForm } from "@/features/use-product-form/lib/clear-product-form.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { createProductApiErrors } from "@/shared/lib/api-errors/create-product-errors.ts";
import {
    createProductValidationErrors,
    moreCreateItemsValidationErrors
} from "@/shared/lib/validation-errors/validation-product.ts";
import { createProductForm, moreCreateItemForm } from "@/features/use-product-form/model/product.forms.ts";
import {createProductSchema, moreCreateItemsSchema} from "@/features/use-product-form/model/product.schemas.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { productFiles, currentFile, productsPreview } = productStore();

export const useAddProduct = () => {
    const onFilesSelected = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files || target.files.length === 0 || currentFile.value === null) {
            return;
        }

        const file = target.files[0];
        const index = currentFile.value;

        if(productFiles.value){
            productFiles.value[index] = file;
        }
        if(productsPreview.value){
            productsPreview.value[index] = URL.createObjectURL(file);
        }

        target.value = '';
    };


    const createProduct = async () => {
        const result1 = createProductSchema.safeParse(createProductForm.value)
        const result2 = moreCreateItemsSchema.safeParse(moreCreateItemForm)

        if(!result1.success){
            createProductValidationErrors(result1.error);
        }
        if(!result2.success){
            moreCreateItemsValidationErrors(result2.error);
        }
        if (!result1.success || !result2.success) return;


        try{
            if(!userData.id){
                return
            }
            const formData = new FormData();

            const productData = {
                userId: userData.id,
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

            productFiles.value.forEach((file) => {
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

            await openNotify('You have successfully created a new product card.',
                'Now, if you go to the products page, your product will be there, and on the useProfile page as well.', 'my/products')
            await router.push({ name: 'profile'})

            clearProductForm();
        }catch(err){
            createProductApiErrors(err);
            console.error(`Failed to create the products cover:`, err);
        }
    };

    return{
        onFilesSelected,
        createProduct,
    }
}