import { computed, type Ref } from 'vue';
import { refDebounced } from "@vueuse/core";
import { handler } from "@/shared/api/http.ts";
import { searchProductForm } from "@/widgets/navigation/model/search.form.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

export const search = computed(() => searchProductForm.value.search);
export const debouncedSearch = refDebounced(search, 700);


export const getSearchedProducts = async (products: Ref<Product[]>) => {
    try{
        const res = await handler(`/searched?search=${searchProductForm.value.search}`, {
            method: 'GET',
        })

        products.value = res;
    }catch(err){
        console.log('Не удалось получить данные по всем товарам', err);
    }
};

