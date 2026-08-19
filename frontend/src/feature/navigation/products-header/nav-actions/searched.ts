import { useDebounceFn } from "@vueuse/core";
import { handler } from "@/shared/api/http.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { productsForms } from "@/shared/composables/forms/products.forms.ts";

const { products } = productsStore();
const { searchProductForm } = productsForms();

export const useGetSearchedProducts = () => {
    const getSearchedProducts = async (products: any) => {
        try{
            const res = await handler(`/searched?search=${searchProductForm.value.search}`, {
                method: 'GET',
            })
            console.log(res);
            products.value = res;
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