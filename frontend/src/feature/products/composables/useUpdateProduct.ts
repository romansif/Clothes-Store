const BASE_URL = `http://localhost:3000`

import { handler } from "../../../shared/api/http.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { useDeleteProduct } from "./useDeleteProduct.ts";
import { useGetProducts } from "./getProducts.ts";

const { getCartProducts } = useGetProducts();
const { deleteProductCart } = useDeleteProduct();
const { cart, orderItems, product, activeProductImg } = productsStore();

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
                }else{
                    await handler(`/cart/${id}`, {
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

    const updateCartItems = async () => {
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
        updateCartItems,
        changeImg
    }
}

