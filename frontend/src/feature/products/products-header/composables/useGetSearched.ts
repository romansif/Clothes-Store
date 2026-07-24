import { handler } from "../../../shared/api/http.ts";
import { useDebounceFn } from "@vueuse/core";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { productsForms } from "../../../shared/composables/forms-composables/forms/products.forms.ts";

const { allProducts } = productsStore();
const { searchProductForm } = productsForms();

export const useGetSearchedProducts = () => {
    const getSearchedProducts = async (allProducts: any) => {
        try{
            const all = await handler(`/searched/products?search=${searchProductForm.value.search}`, {
                method: 'GET',
            })
            allProducts.value = all
        }catch(err){
            console.log('Не удалось получить данные по всем товарам', err)
        }
    };

    const debouncedSearch = useDebounceFn(async () => {
        await getSearchedProducts(allProducts)

        return allProducts
    }, 500)

    const resetSearch = () => {
        searchProductForm.value.search = "";
    }

    return{
        getSearchedProducts,
        debouncedSearch,
        resetSearch
    }
}