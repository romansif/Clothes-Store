import { useDebounceFn } from "@vueuse/core";
import { handler } from "@/shared/api/http.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";

const { products } = productStore();
const { searchProductForm } = productForms();

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
    }, 700)

    const resetSearch = () => {
        searchProductForm.value.search = "";
    }

    return{
        getSearchedProducts,
        debouncedSearch,
        resetSearch
    }
}