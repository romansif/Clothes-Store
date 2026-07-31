import { handler } from "@/shared/api/http.ts";
import { productsStore } from "@/shared//composables/stores/products.store.ts";

const { allProducts, products, cart, favorite, orders, product, productId } = productsStore()

export const useGetProducts = () => {
    const getAllProducts = async () => {
        try{
            const all = await handler(`/products`, {
                method: 'GET',
            })
            allProducts.value = all;
        }catch(err){
            console.error(`Failed to get the all products:`, err);
        }
    };

    const getFilteredProducts = async (type: string, filter: string) => {
        try{
            const filtered = await handler(`/filtered/products/${type}/${filter}`, {
                method: 'GET',
            })
            products.value = filtered;
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
            const oneProduct = await handler(`/products/item/${currentId}`, {
                method: 'GET',
            })
            product.value = oneProduct;
        }catch(err){
            console.error(`Failed to get the product by id:`, err);
        }
    };

    const getMyProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const allMyProducts = await handler(`/products/${userId}`, {
                method: 'GET',
            })
            products.value = allMyProducts;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    const getCartProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const cartProducts = await handler(`/cart/${userId}`, {
                method: 'GET',
            })
            cart.value = cartProducts;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    const getFavoriteProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const favoriteProducts = await handler(`/favorites/${userId}`, {
                method: 'GET',
            })
            favorite.value = favoriteProducts;
        }catch(err){
            console.error(`Failed to get the favorite products:`, err);
        }
    };

    const getOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const ordersProduct = await handler(`/orders/${userId}`, {
                method: 'GET',
            })
            orders.value = ordersProduct;
        }catch(err){
            console.error(`Failed to get the all orders:`, err);
        }
    };

    const getFilteredOrders = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const ordersProduct = await handler(`/filtered/orders/${userId}`, {
                method: 'GET',
            })
            orders.value = ordersProduct;
        }catch(err){
            console.error(`Failed to get the current orders:`, err);
        }
    };

    return{
        getAllProducts,
        getFilteredProducts,
        getMyProducts,
        getProductId,
        getProduct,
        getFavoriteProducts,
        getCartProducts,
        getOrders,
        getFilteredOrders,
    }
}