import { useDebounceFn } from "@vueuse/core";
import { handler } from "@/shared/api/http";
import { productsStore } from "@/shared/composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms";

const { products } = productsStore();
const { searchProductForm } = productsForms();

export const useGetSearchedProducts = () => {
    const getSearchedProducts = async (products: any) => {
        try{
            const all = await handler(`/searched?search=${searchProductForm.value.search}`, {
                method: 'GET',
            })
            products.value = all;
        }catch(err){
            console.log('Не удалось получить данные по всем товарам', err);
        }
    };

    const debouncedSearch = useDebounceFn(async () => {
        await getSearchedProducts(products);

        return products;
    }, 200)

    const resetSearch = () => {
        searchProductForm.value.search = "";
    }

    return{
        getSearchedProducts,
        debouncedSearch,
        resetSearch
    }
}