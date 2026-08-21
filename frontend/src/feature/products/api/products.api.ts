import namer from "color-namer";
import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";
import { clearProductsForms } from "@/feature/products/lib/clear.products.ts";
import type { Product } from "@/feature/products/model/product.types.ts";

const { openNotify, loading } = useBaseModals()
const { clearProductForm } = clearProductsForms();
const { createProductErrors } = useFormsErrors();
const { createProductForm, moreCreateItem } = productForms();
const { allProducts, products, productsWeek, productsYear, myProducts, product,
    productId, productFiles, currentFile, productsPreview } = productStore();

export const productsApi = () => {
    const getAllProducts = async () => {
        try{
            const res = await handler(`/products`, {
                method: 'GET',
            })
            console.log(res);
            allProducts.value = res;
            products.value = res;
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/filtered/${type}/${filter}`, {
                method: 'GET',
            })
            console.log(res);
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
            console.log(res);
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
            console.log(res);
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
            console.log(res);
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
            console.log(res);
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
            moreCreateItem.colors.forEach((color, index) => {
                formData.append(`colors[${index}][hex]`, String(color.hex));
                formData.append(`colors[${index}][colorName]`, String(color.colorName));
            });
            moreCreateItem.sizes.forEach((size) => {
                formData.append('sizes', String(size))
            });
            formData.append('gender', createProductForm.value.gender);
            formData.append('quantity', createProductForm.value.quantity);
            formData.append('collections', createProductForm.value.collections);
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

            await openNotify('You have successfully created a new product card.',
                'Now, if you go to the products page, your product will be there, and on the useProfile page as well.', '')
            await router.push({ name: 'profile'})

            clearProductForm();
        }catch(err){
            loading.value = false;

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

            await getProduct();
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
                    collections: createProductForm.value.collections,
                    title: createProductForm.value.title,
                    category: createProductForm.value.category,
                    material: createProductForm.value.material,
                    gender: createProductForm.value.gender,
                    quantity: createProductForm.value.quantity,
                    price: createProductForm.value.price,
                    description: createProductForm.value.description,
                })
            });
            loading.value = false;

            await getProduct();

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
        updateProductImages,
        updateProductDesc,
        updateProductColors,

        deleteProduct,
    }
}