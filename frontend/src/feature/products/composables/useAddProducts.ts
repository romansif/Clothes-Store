import router from '../../../app/router/index.ts'
import { ApiError, handler } from "../../../shared/api/http.ts";
import { useGetProducts } from "./getProducts.ts";
import { productsForms } from "../../../shared/composables/forms/products.forms.ts";
import { checkoutForms } from "../../../shared/composables/forms/checkout.forms.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { checkoutErrors } from "../../../shared/composables/forms/forms-errors/checkout.errors.ts";
import { productsFormErrors } from "../../../shared/composables/forms/forms-errors/products.errors.ts";
import { useProductsModals } from "../../../shared/composables/modals/products/productsModals.ts";
import { clearProductsForms } from "../../../shared/composables/forms/clear-forms/clear.products.ts";

const { isAgreeForm } = checkoutForms();
const { isAgreeFormError } = checkoutErrors();
const { clearProductForm } = clearProductsForms();
const { toggleCreateProductModal } = useProductsModals();
const { createProductFormErrors, addCartFormErrors } = productsFormErrors();
const { getCartProducts, getFavoriteProducts, getOrder } = useGetProducts();
const { createProductForm, moreCreateItem, createProductFormMessages,
    addToCartForm, addToCartFormMessages } = productsForms();
const { products, cart, favorite, order, product, orderItems, currentFile,
    productFiles, productsPreview, unreadCount } = productsStore();

export const useProducts = () => {
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
    }

    const createProduct = async () => {
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
                formData.append('color', String(color))
            });
            moreCreateItem.size.forEach((size) => {
                formData.append('size', String(size))
            });

            productFiles.value.forEach((file) => {
                if(file){
                    formData.append('images', file)
                }else{
                    console.log('Product photo not found')
                    return
                }
            });

            const newProduct = await handler('/products', {
                method: "POST",
                body: formData,
            });
            products.value = newProduct;

            await getCartProducts();

            clearProductForm();
            toggleCreateProductModal();
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>
                if(errors){
                    createProductFormErrors.value.titleError = !!errors.title;
                    createProductFormErrors.value.categoryError = !!errors.category;
                    createProductFormErrors.value.materialError = !!errors.material;
                    createProductFormErrors.value.priceError = !!errors.price;
                    createProductFormErrors.value.descriptionError = !!errors.description;
                    createProductFormErrors.value.colorError = !!errors.color;
                    createProductFormErrors.value.sizeError = !!errors.size;

                    createProductFormMessages.value.titleMessage = errors.title || '';
                    createProductFormMessages.value.categoryMessage = errors.category || '';
                    createProductFormMessages.value.materialMessage = errors.material || '';
                    createProductFormMessages.value.priceMessage = errors.price || '';
                    createProductFormMessages.value.descriptionMessage = errors.description || '';
                    createProductFormMessages.value.colorMessage = errors.color || '';
                    createProductFormMessages.value.sizeMessage = errors.size || '';
                }
            }
            console.log('Не удалось создать обложку нового товара', err);
        }
    };

    const addToCart = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const currentProduct = product.value;

            const newProductCart = await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    color: addToCartForm.value.color,
                    size: addToCartForm.value.size,
                    favorite: currentProduct.favorite,
                    quantity: 1,
                })
            });
            cart.value = newProductCart

            unreadCount.value += 1

            await getCartProducts()
            alert('Product added successfully.')
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;
                if(errors){
                    addCartFormErrors.value.colorError = !!errors.color;
                    addCartFormErrors.value.sizeError = !!errors.size;

                    addToCartFormMessages.value.colorMessage = errors.color || '';
                    addToCartFormMessages.value.sizeMessage = errors.size || '';
                }
            }
            console.log('Не удалось добавить товар в корзину', err);
        }
    };

    const addToFavorite = async (id: string) => {
        try{
            const userId = localStorage.getItem("userId");

            const currentProduct = product.value;

            await handler(`/products/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: true
                })
            });

            const newFavoriteProduct = await handler(`/favorites`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    color: currentProduct.color,
                    size: currentProduct.size,
                    favorite: true,
                    quantity: 1,
                })
            });
            favorite.value = newFavoriteProduct;

            await getFavoriteProducts();
            alert('Product added successfully.');
        }catch(err){
            console.log('Не удалось добавить товар в любимое', err);
        }
    };

    const addToOrder = async () => {
        try{
            const userId = localStorage.getItem("userId");

            if(!isAgreeFormError.value.agreeError) {
                isAgreeForm.value.agreeMessage = 'You must agree to the Terms and Conditions to continue.';
                return
            }

            const newOrder = await handler(`/order`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    orderProducts: orderItems.value
                })
            });

            order.value = newOrder;

            await getOrder();

            alert('Product ordered successfully.')
            await router.push({ path: '/checkout/information' });
        }catch(err){
            console.log('Не удалось добавить товар в заказ', err);
        }
    };

    const checkedCartItem = async (id: string, product: any) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);

            await handler(`/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    checked: true
                })
            })
            if(productCart){
                productCart.checked = !productCart.checked;
                const index = orderItems.value.findIndex(item => item.id === product.id);
                if(index === -1) {
                    orderItems.value.push(product);
                }else{
                    orderItems.value.splice(index, 1);
                }
            }
        }catch(err){
            console.log('Не удалось добавить товар к заказу', err)
        }
    }

    const updateCartItem = async (type: string, id: string) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);

            const currentPrice = Number(productCart?.price) || 0;
            const currentQuantity = Number(productCart?.quantity) || 1;

            if(productCart){
                if(type === 'add'){
                    const newPrice = currentPrice * 2;
                    const newQuantity = currentQuantity + 1;

                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            quantity: newQuantity,
                        })
                    });
                }else if(type === 'away'){
                    if(currentQuantity === 1){
                        await deleteProductCart(id);
                    }else{
                        const newPrice = currentPrice / 2;
                        const newQuantity = currentQuantity - 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                quantity: newQuantity,
                            })
                        });
                    }
                }
                await getCartProducts();
            }
        }catch(err){
            console.log('Не удалось обновить колличество товара', err)
        }
    };

    const deleteProductCart = async (id: string) => {
        try{
            await handler(`/cart/${id}`, {
                method: "DELETE",
            });

            await getCartProducts();
        }catch(err){
            console.log('Не удалось удалить товар', err);
        }
    };

    const deleteFavoriteProduct = async (id: string, productId: string) => {
        try{
            await handler(`/favorites/${id}`, {
                method: "DELETE",
            });

            await handler(`/update/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            });

            await getFavoriteProducts();
        }catch(err){
            console.log('Не удалось удалить товар', err);
        }
    };

    const deleteOrderProducts = async (id: string) => {
        try{
            await handler(`/order/${id}`, {
                method: "DELETE",
            });
        }catch(err){
            console.log('Не удалось удалить товары из заказа', err);
        }
    };

    return {
        createProduct,
        onFilesSelected,
        addToCart,
        addToFavorite,
        addToOrder,
        checkedCartItem,
        updateCartItem,
        deleteProductCart,
        deleteFavoriteProduct,
        deleteOrderProducts
    }
}