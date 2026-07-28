import router from "../../../app/router";

import { useGetProducts } from "./getProducts.ts";
import { useUpdateProduct } from "./useUpdateProduct.ts";
import { ApiError, handler } from "../../../shared/api/http.ts";
import { useCheckout } from "../../checkout/composables/useCheckout.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { useProductsModals } from "../../../shared/composables/modals/products/productsModals.ts";
import { productsForms } from "../../../shared/composables/forms-composables/forms/products.forms.ts";
import { productsFormErrors } from "../../../shared/composables/forms-composables/forms-errors/products.errors.ts";
import { clearProductsForms } from "../../../shared/composables/forms-composables/clear-forms/clear.products.ts";

const { totalPrice } = useCheckout();
const { getCartProducts, getFavoriteProducts } = useGetProducts();
const { toggleCreateProductModal, openNotify } = useProductsModals();
const { updateFavorite, updateCheckedQuantity } = useUpdateProduct();
const { clearProductForm, clearAddToCartForm } = clearProductsForms();
const { createProductFormErrors, addCartFormErrors } = productsFormErrors();
const { createProductForm, moreCreateItem, createProductFormMessages,
    addToCartForm, addToCartFormMessages } = productsForms();
const { products, cart, product, items, orders,
    currentFile, productFiles, productsPreview, unreadCount } = productsStore();

export const useAddProducts = () => {
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
            formData.append('gender', createProductForm.value.gender);
            formData.append('quantity', String(createProductForm.value.quantity));
            formData.append('status', 'Availability');

            productFiles.value.forEach((file) => {
                if(file){
                    formData.append('images', file)
                }else{
                    console.log('Product photo not found.')
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
                    createProductFormErrors.value.quantityError = !!errors.quantity;

                    createProductFormMessages.value.titleMessage = errors.title || '';
                    createProductFormMessages.value.categoryMessage = errors.category || '';
                    createProductFormMessages.value.materialMessage = errors.material || '';
                    createProductFormMessages.value.priceMessage = errors.price || '';
                    createProductFormMessages.value.descriptionMessage = errors.description || '';
                    createProductFormMessages.value.colorMessage = errors.color || '';
                    createProductFormMessages.value.sizeMessage = errors.size || '';
                    createProductFormMessages.value.quantityMessage = errors.quantity    || '';
                }
            }
            console.log('Не удалось создать обложку нового товара.', err);
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
                    gender: currentProduct.gender,
                    quantity: 1,
                    status: currentProduct.status,
                    favorite: currentProduct.favorite,
                    checked: currentProduct.checked,
                })
            });
            cart.value = newProductCart

            unreadCount.value += 1

            clearAddToCartForm()
            openNotify('You have successfully added the item to your cart.',
                'You can click the button to the left of the "X" to go to the cart.',
                '/profile/profile-products/ProductsCartPage')

            await getCartProducts()
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
            console.log('Не удалось добавить товар в корзину.', err);
        }
    };

    const toggleToFavorite = async (id: string, type: string, productId: string) => {
        const userId = localStorage.getItem("userId");
        try{
            const sourceList = type === 'cart' ? cart.value : products.value;
            const currentProduct = sourceList?.find(item => item.id === id);
            if(!currentProduct) return

                    const isFavorite = product.value.favorite
                    const newStatus = !isFavorite

            if(!isFavorite){
                await handler(`/favorites`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        productId:currentProduct?.id,
                        images: currentProduct?.images,
                        title: currentProduct?.title,
                        category: currentProduct?.category,
                        material: currentProduct?.material,
                        price: currentProduct?.price,
                        description: currentProduct?.description,
                        color: currentProduct?.color,
                        size: currentProduct?.size,
                        gender: currentProduct?.gender,
                        quantity: 1,
                        status: currentProduct?.status,
                        favorite: true,
                    })
                });
                openNotify('You have successfully added the item to your favorite.',
                    'You can click the button to the left of the "X" to go to the favorite.',
                    '/profile/profile-products/FavoriteProductsPage')

                await getFavoriteProducts();
            }else{
                await handler(`/favorites/${productId}`, {
                    method: "DELETE",
                })

                await getFavoriteProducts();
            }

            await updateFavorite(id, productId, newStatus)
        }catch(err){
            console.log('Не удалось добавить товар в любимое.', err);
        }
    };

    const addOrder = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const newOrder = await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    dateCreatedOrder: dateCreated,
                    timeCreatedOrder: time,
                    status: 'Convene'
                })
            })
            orders.value = newOrder;

            await updateCheckedQuantity()

            await router.push({ name: '/profile/ProfilePage' })
        }catch(err){
            console.log('Не удалось сделать заказ.', err);
        }
    }

    return {
        createProduct,
        onFilesSelected,
        addToCart,
        toggleToFavorite,
        addOrder
    }
}