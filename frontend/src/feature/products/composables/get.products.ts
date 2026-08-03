import { handler } from "@/shared/api/http.ts";
import { productsStore } from "@/shared//composables/stores/products.store.ts";

const { allProducts, products, stack, outOfStack, cart, favorite, orders, product, productId } = productsStore()

export const useGetProducts = () => {
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
            const res = await handler(`/filtered/products/${type}/${filter}`, {
                method: 'GET',
            })
            products.value = res;
        }catch(err){
            console.error(`Failed to get the filtered products:`, err);
        }
    };

    const getProductId = async (id: string) => {
        localStorage.setItem("productId", id);

        await getProduct();
    }

    const getProduct = async () => {
        const currentId = localStorage.getItem("productId") || productId.value;
        try{
            const res = await handler(`/products/item/${currentId}`, {
                method: 'GET',
            })
            product.value = res;
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }
    };

    const getMyStackProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/products/stack/${userId}`, {
                method: 'GET',
            })
            stack.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    const getMyOutOfStackProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/products/out/of/stack/${userId}`, {
                method: 'GET',
            })
            outOfStack.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    const getCartProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/cart/${userId}`, {
                method: 'GET',
            })
            cart.value = res;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    const getFavoriteProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/favorites/${userId}`, {
                method: 'GET',
            })
            favorite.value = res;
        }catch(err){
            console.error(`Failed to get the favorite products:`, err);
        }
    };

    const getOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/orders/${userId}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }
    };

    const getFilteredOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/filtered/orders/${userId}`, {
                method: 'GET',
            })
            orders.value = res;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }
    };

    return{
        getAllProducts,
        getFilteredProducts,
        getMyStackProducts,
        getMyOutOfStackProducts,
        getProductId,
        getProduct,
        getFavoriteProducts,
        getCartProducts,
        getOrders,
        getFilteredOrders,
    }
}