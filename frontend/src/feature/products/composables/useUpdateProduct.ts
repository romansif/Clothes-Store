const BASE_URL = `http://localhost:3000`

import { handler } from "../../../shared/api/http.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { useDeleteProduct } from "./useDeleteProduct.ts";
import { useGetProducts } from "./getProducts.ts";

const { deleteProductCart } = useDeleteProduct();
const { getCartProducts, getFilteredProducts } = useGetProducts();
const { products, cart, orderItems, product, activeProductImg } = productsStore();

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
                    })
                    await handler(`/products/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    })
                }else{
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    })
                    await handler(`/products/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    })
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
            console.log('Не удалось добавить товар к заказу', err)
        }
    };

    const updateCartItem = async (type: string, id: string, status: string) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);

            const currentPrice = Number(productCart?.price) || 0;
            const currentQuantity = Number(productCart?.quantity) || 1;

            if(productCart){
                if(type === 'add' && status === 'Availability'){
                    const newPrice = currentPrice * 2;
                    const newQuantity = currentQuantity + 1;

                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            quantity: newQuantity,
                        })
                    });
                }else if(type === 'away' && status === 'Availability'){
                    if(currentQuantity === 1){
                        await deleteProductCart(id);
                    }else if(status === 'Availability'){
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
            orderItems.value = []

            await getCartProducts();
        }catch(err){
            console.log('Не удалось вернуть все товары к статусу не выбран');
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
            console.log('Не удалось изменить статус', err)
        }
    };

    const updateCheckedQuantity = async () => {
        const userId = localStorage.getItem("userId");
        try{

            const cartItems = await handler(`/cart/${userId}`, {
                method: "GET",
            })
            const checkedItems = cartItems.filter((item: any) => item.checked === true);

            for(const item of checkedItems) {
                await handler(`/cart/${item.id}`, {
                    method: "DELETE",
                })

                console.log(item.productId)
                const product = products.value.find(p => p.id === item.productId);

                if(product){
                    const newQuantity = product?.quantity - item.quantity
                    if(product?.quantity > 1){
                        await handler(`/products/${product.id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                quantity: Number(newQuantity),
                            })
                        })
                    }else if(product?.quantity === 1){
                        await handler(`/products/${product.id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                quantity: Number(newQuantity),
                                status: "Exhausted"
                            })
                        })
                    }
                }else{
                    console.log('Product not found');
                }
            }
            localStorage.removeItem("ordersItem");
        }catch(err){
            console.log('Не удалось изменить статус или колличество товара', err)
        }
    }

    const changeImg = (index: number) => {
        if(!product.value || !Array.isArray(product.value.images)) return

        const realIndex = index + 1
        const mainPath = product.value.images[0]

        product.value.images[0] = product.value.images[realIndex]
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

