import type { Ref } from 'vue';
import { useDebounceFn } from "@vueuse/core";
import { handler } from "@/shared/api/http.ts";
import { searchForm } from "@/widgets/navigation/model/search.form.ts";
import type { Product } from "@/entities/product/model/product.types.ts";

const { searchProductForm } = searchForm();

export const useGetSearchedProducts = () => {
    const getSearchedProducts = async (products: Ref<Product[]>) => {
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

    const debouncedSearch = useDebounceFn(async (products: Ref<Product[]>) => {
        await getSearchedProducts(products);

        return products;
    }, 700)


    return{
        getSearchedProducts,
        debouncedSearch,
    }
}