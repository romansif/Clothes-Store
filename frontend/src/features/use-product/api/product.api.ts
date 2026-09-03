import namer from "color-namer";
import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { clearProductsForms } from "@/features/use-product/lib/clear.product.ts";
import type { Product } from "@/entities/product/model/product.types.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { openNotify, loading } = useBaseModals();
const { clearProductForm } = clearProductsForms();
const { createProductErrors } = useFormsErrors();
const { createProductForm, moreCreateItem } = productForms();
const { allProducts, products, product, productsWeek, productsYear, seasonalSelections,
    myProducts, productFiles, currentFile, productsPreview } = productStore();

export const productApi = () => {
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

    const getWeekProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/products/week/${type}/${filter}`, {
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

    const getSeasonal = async (collection: string) => {
        try{
            const res = await handler(`/products/collections/${collection}`, {
                method: 'GET',
            })
            console.log(res);
            seasonalSelections.value = res
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    const getProduct = async (id: string) => {
        try{
            const data = await handler(`/products/${id}`, {
                method: 'GET',
            });
            product.value = data
            localStorage.setItem("product", JSON.stringify(data));
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }
    };

    const getMyProducts = async () => {
        try{
            const res = await handler(`/my/products/${userData.id}`, {
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
            moreCreateItem.quantity.forEach((quantity, index) => {
                formData.append(`quantity[${index}][hex]`, String(quantity.hex));
                formData.append(`quantity[${index}][colorName]`, String(quantity.colorName));
                formData.append(`quantity[${index}][size]`, String(quantity.size));
                formData.append(`quantity[${index}][count]`, String(quantity.count));
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
            loading.value = false;

            await openNotify('You have successfully created a new product card.',
                'Now, if you go to the products page, your product will be there, and on the useProfile page as well.')
            await router.push({ name: 'profile'})

            clearProductForm();
        }catch(err){
            loading.value = false;

            createProductErrors(err);
            console.error(`Failed to create the products cover:`, err);
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

            await getProduct(product.id);

            await openNotify('You have successfully changed the product card images.', '')
        }catch(err){
            loading.value = false;

            await openNotify(`You haven't entered anything to change.`, '');
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

            await openNotify('You have successfully changed the product card description.', '');
            await router.push({ name: 'my/products'})
        }catch(err){
            loading.value = false;

            await openNotify(`You haven't entered anything to change.`, '');
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

            await openNotify('You have successfully changed the product colors on the product card.', '')
        }catch(err){
            loading.value = false;
            await openNotify(`You haven't entered anything to change.`, '');
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

        getSeasonal,

        getMyProducts,

        getProduct,

        onFilesSelected,
        createProduct,

        updateProductImages,
        updateProductDesc,
        updateProductColors,

        deleteProduct,
    }
}