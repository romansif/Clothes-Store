import {useProductsModals} from "@/shared/composables/modals/products.modals.ts";

const BASE_URL = `http://localhost:3000`

import { handler } from "@/shared/api/http.ts";
import { useGetProducts } from "./get-products.ts";
import { useDeleteProduct } from "./use-delete-product.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

const { deleteProductCart } = useDeleteProduct();
const { getCartProducts, getFilteredProducts } = useGetProducts();
const { products, cart, orderItems, product, activeProductImg } = productsStore();
const { openNotify } = useProductsModals();

export const useUpdateProduct = () => {
    const checkCartItem = async (id: string, product: any) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);
            if(productCart){
                if(productCart?.checked === false){
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                    await handler(`/products/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                }else{
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    });
                    await handler(`/products/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    });
                }

                const index = orderItems.value.findIndex(item => item.id === product.id);
                if(index === -1) {
                    orderItems.value.push(product);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }else{
                    orderItems.value.splice(index, 1);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to add the product to order:`, err);
        }
    };

    const updateCartItem = async (type: string, id: string, status: string) => {
        try{
            await getFilteredProducts('ALL', 'ALL');

            const productCart = cart.value?.find(c => c.id === id);
            const product = products.value?.find(
                p => p.id === productCart?.productId
            );

            if(!productCart && !product) {
                console.log('Товар в корзине или в каталоге не найден')
                return
            }

            const basePrice =  Number(product?.price)
            const stock = Number(product?.quantity);
            const currentPrice = Number(productCart?.price);
            const currentQuantity = Number(productCart?.quantity);

            if(status === 'Availability'){
                if(type === 'add'){
                    if(currentQuantity < stock){
                        const newPrice = currentPrice + basePrice;
                        const newQuantity = currentQuantity + 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                quantity: newQuantity,
                            })
                        });
                    }else{
                        console.warn('Достигнуто максимальное количество товара на складе.');
                        openNotify('The item is no longer in stock.',
                            'The maximum stock level for the item has been reached.')
                        return;
                    }
                }else if(type === 'away') {
                    if(currentQuantity <= 1){
                        await deleteProductCart(id);
                    }else{
                        const newPrice = currentPrice - basePrice;
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
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to update the cart product quantity:`, err);
        }
    };

    const updateCartChecked = async () => {
        try{
            const userId = localStorage.getItem('userId');

            const allCartItems = await handler(`/cart/${userId}`, {
                method: "GET"
            });
            for(const item of allCartItems) {
                await handler(`/cart/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: false
                    })
                })
            }
            orderItems.value = [];

            await getCartProducts();
        }catch(err){
            console.error(`Failed to remove the products to status false:`, err);
        }
    };

    const updateFavorite = async (id: string, productId: string, status: boolean) => {
        try{
            await Promise.all([
                await handler(`/cart/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        favorite: status,
                    })
                }),
                await getCartProducts(),

                await handler(`/products/${productId}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        favorite: status,
                    })
                }),
                await getFilteredProducts('ALL', 'ALL'),
            ])
        }catch(err){
            console.error(`Failed to update the status:`, err);
        }
    };

    const updateCheckedQuantity = async () => {
        const userId = localStorage.getItem("userId");
        try{
            await getFilteredProducts('ALL', 'ALL')

            const cartItems = await handler(`/cart/${userId}`, {
                method: "GET",
            })
            const checkedItems = cartItems.filter((item: any) => item.checked === true);

            for(const item of checkedItems) {
                await deleteProductCart(item.id);

                const product = products.value?.find(
                    p => p.id === item.productId
                );
                if(!item && !product) {
                    console.log('Товар в корзине или в каталоге не найден')
                    return
                }

                const currentQuantity = Number(product?.quantity);
                const cartQuantity = Number(item?.quantity);

                const newQuantity = currentQuantity - cartQuantity;
                if(currentQuantity > cartQuantity){
                    await handler(`/products/${product?.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            quantity: Number(newQuantity),
                        })
                    });
                }else if(currentQuantity === cartQuantity){
                    await handler(`/products/${product?.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            quantity: Number(newQuantity),
                            status: "Exhausted"
                        })
                    });
                    await handler(`/favorites/${product?.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            quantity: Number(newQuantity),
                            status: "Exhausted"
                        })
                    });
                }else{
                    console.log('Product not found');
                }
            }
            localStorage.removeItem("ordersItem");
        }catch(err){
            console.error(`Failed to update the status or quantity:`, err);
        }
    }

    const changeImg = (index: number) => {
        if(!product.value || !Array.isArray(product.value.images)) return;

        const realIndex = index + 1;
        const mainPath = product.value.images[0];

        product.value.images[0] = product.value.images[realIndex];
        product.value.images[realIndex] = mainPath;

        activeProductImg.value = `${BASE_URL}/${product.value.images[0]}`;
    };

    return{
        checkCartItem,
        updateCartItem,
        updateCartChecked,
        updateFavorite,
        updateCheckedQuantity,
        changeImg
    }
}

