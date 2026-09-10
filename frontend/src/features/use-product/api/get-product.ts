import { handler } from "@/shared/api/http.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { allProducts, products, product, productsWeek, productsYear,
    springCatalog, summerCatalog, autumnCatalog, winterCatalog, myProducts } = productStore();

export const useGetProduct = () => {
    const getAllProducts = async () => {
        try{
            const res = await handler(`/products`, {
                method: 'GET',
            })
            products.value = res;
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

    const getWeekProducts = async (type: string, filter: string) => {
        try{
            const res = await handler(`/products/week/${type}/${filter}`, {
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

    const getSeasonal = async (collection: string) => {
        try{
            const res = await handler(`/products/collections/${collection}`, {
                method: 'GET',
            })

            switch (collection) {
                case "Spring":
                    springCatalog.value = res;
                    break;
                case "Summer":
                    summerCatalog.value = res;
                    break;
                case "Autumn":
                    autumnCatalog.value = res;
                    break;
                case "Winter":
                    winterCatalog.value = res;
                    break;
            }

            console.log(autumnCatalog.value);
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
            myProducts.value = res;
        }catch(err){
            console.error(`Failed to get the all my products:`, err);
        }
    };

    return {
        getAllProducts,
        getFilteredProducts,
        getMyProducts,
        getSeasonal,
        getWeekProducts,
        getYearProducts,
        getProduct
    }
}