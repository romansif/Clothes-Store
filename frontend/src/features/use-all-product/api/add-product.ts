import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import { productForms } from "@/features/use-product-form/model/product.forms.ts";
import { clearProductForm } from "@/features/use-product-form/lib/clear.product.form.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { createProductErrors } = useFormsErrors();
const { createProductForm, moreCreateItem } = productForms();
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
        try{
            if(!userData.id){
                return
            }
            const formData = new FormData();

            const productData = {
                userId: userData.id,
                title: createProductForm.value.title,
                collection: createProductForm.value.collection,
                category: createProductForm.value.category,
                material: createProductForm.value.material,
                gender: createProductForm.value.gender,
                sku: createProductForm.value.sku,
                price: createProductForm.value.price,
                description: createProductForm.value.description,
                sizes: moreCreateItem.sizes,
                colors: moreCreateItem.colors,
                variants: moreCreateItem.variants,
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
            createProductErrors(err);
            console.error(`Failed to create the products cover:`, err);
        }
    };

    return{
        onFilesSelected,
        createProduct,
    }
}