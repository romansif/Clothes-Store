import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { clearProductsForms } from "@/features/use-product/lib/clear.product.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { clearProductForm } = clearProductsForms();
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

            formData.append('userId', userData.id);
            formData.append('title', createProductForm.value.title);
            formData.append('category', createProductForm.value.category);
            formData.append('material', createProductForm.value.material);
            formData.append('price', createProductForm.value.price);
            formData.append('description', createProductForm.value.description);
            moreCreateItem.colors.forEach((color, index) => {
                formData.append(`colors[${index}][hex]`, String(color.hex));
                formData.append(`colors[${index}][colorName]`, String(color.colorName));
            });
            moreCreateItem.sizes.forEach((size) => {
                formData.append('sizes', String(size))
            });
            formData.append('gender', createProductForm.value.gender);
            moreCreateItem.variants.forEach((variant, index) => {
                formData.append(`variants[${index}][hex]`, String(variant.hex));
                formData.append(`variants[${index}][colorName]`, String(variant.colorName));
                formData.append(`variants[${index}][size]`, String(variant.size));
                formData.append(`variants[${index}][count]`, String(variant.count));
            });
            formData.append('sku', createProductForm.value.sku);
            formData.append(`collection[condition]`, String(createProductForm.value.collection.condition));
            formData.append(`collection[season]`, String(createProductForm.value.collection.season));
            formData.append(`collection[name]`, String(createProductForm.value.collection.name));
            formData.append('status', 'Availability');

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