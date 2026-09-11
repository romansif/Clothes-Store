import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const { orders, items } = orderStore();

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);


const productsWeek = ref<Product[]>([]);
const productsYear = ref<Product[]>([]);

const springCatalog = ref<Product[]>([]);
const summerCatalog = ref<Product[]>([]);
const autumnCatalog = ref<Product[]>([]);
const winterCatalog = ref<Product[]>([]);


export const useGetProducts = () => {
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


    const orderItems = () => {
        if(Array.isArray(orders.value)) {
            return orders.value.flatMap(order => order.orderItems || []);
        }
    };

    const orderPreview = (id: string, type: string) => {
        if(!id){
            console.log('Id не найден');
            return;
        }

        const sourceList = type === 'ADD' ? items.value : orderItems();

        const order = sourceList?.find(p => p.id === id);

        if(order && Array.isArray(order.images) && order.images[0]){
            return `${import.meta.env.VITE_BASE_URL}/${order.images[0]}`;
        }

    };

    const vHorizontalScroll = {
        mounted(el: HTMLElement) {
            const onWheel = (e: WheelEvent) => {
                if(e.deltaY === 0) return;
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
            el.addEventListener('wheel', onWheel, { passive: false});
        }
    };

    return {
        allProducts,
        products,

        productsWeek,
        productsYear,

        springCatalog,
        summerCatalog,
        autumnCatalog,
        winterCatalog,

        getAllProducts,
        getFilteredProducts,
        getSeasonal,
        getWeekProducts,
        getYearProducts,

        orderPreview,

        vHorizontalScroll,
    }
}