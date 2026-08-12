import { handler } from "@/shared/api/http";
import { productsStore } from "@/shared//composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms.ts";
import { clearProductsForms } from "@/shared/composables/clear-forms/clear.products.ts";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";

const { loading } = useBaseModals()
const { createProductErrors } = useFormsErrors();
const { clearProductForm } = clearProductsForms();
const { toggleCreateProductModal } = useProductsModals();
const { createProductForm, moreCreateItem } = productsForms();
const { allProducts, products, productsWeek, productsYear, myProducts, product, productId, productFiles, currentFile, productsPreview, } = productsStore();

export const useProducts = () => {
    const getAllProducts = async () => {
        try{
            const res = await handler(`/products`, {
                method: 'GET',
            })
            allProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/filtered/${type}/${filter}`, {
                method: 'GET',
            })
            products.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    const getWeekProducts = async () => {
        try{
            const res = await handler(`/products/week`, {
                method: 'GET',
            })
            productsWeek.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    const getYearProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/products/year/${type}/${filter}`, {
                method: 'GET',
            })
            productsYear.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    const getProductId = async (id: string) => {
        localStorage.setItem("productId", id);

        await getProduct();
    };

    const getProduct = async () => {
        const currentId = localStorage.getItem("productId") || productId.value;
        try{
            const res = await handler(`/products/${currentId}`, {
                method: 'GET',
            })
            product.value = res;
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }
    };

    const getMyProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/my/products/${userId}`, {
                method: 'GET',
            })
            myProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

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
        loading.value = true;
        try{
            const userId = localStorage.getItem("userId");
            if(!userId){
                return
            }
            const formData = new FormData();

            formData.append("userId", userId);
            formData.append('title', createProductForm.value.title);
            formData.append('category', createProductForm.value.category);
            formData.append('material', createProductForm.value.material);
            formData.append('price', createProductForm.value.price);
            formData.append('description', createProductForm.value.description);
            moreCreateItem.color.forEach((color) => {
                formData.append('color', JSON.stringify(color));
            });
            moreCreateItem.size.forEach((size) => {
                formData.append('size', String(size))
            });
            formData.append('gender', createProductForm.value.gender);
            formData.append('quantity', createProductForm.value.quantity);
            formData.append('collection', createProductForm.value.collections);
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
            loading.value = false;

            await getAllProducts();

            clearProductForm();
            toggleCreateProductModal();
        }catch(err){
            createProductErrors(err);
            console.error(`Failed to create the products cover:`, err);
        }
    };

    const updateFavorite = async (id: string, productId: string, status: boolean) => {
        try{
            await handler(`/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: status,
                })
            });
        }catch(err){
            console.error(`Failed to update the status:`, err);
        }finally{
            await handler(`/products/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: status,
                })
            });
        }
    };

    const deleteProduct = async (id: string) => {
        try{
            await handler(`/products/${id}`, {
                method: "DELETE",
            });
            await getFilteredProducts('ALL', 'ALL');
            window.location.reload();
        }catch(err){
            console.error(`Failed to delete the product:`, err);
        }
    };


    return{
        getAllProducts,
        getFilteredProducts,
        getWeekProducts,
        getYearProducts,
        getMyProducts,
        getProductId,
        getProduct,
        onFilesSelected,
        createProduct,
        updateFavorite,
        deleteProduct,
    }
}