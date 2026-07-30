import { ref } from "vue";
import router from "@/app/router/index.ts";
import { productsStore } from "../../stores/products.store.ts";
import { clearProductsForms } from "../../forms-composables/clear-forms/clear.products.ts";

const notify = ref<boolean>(false)
const filterAside = ref<boolean>(false)
const createProduct = ref<boolean>(false)
const fileInput = ref<HTMLInputElement | null>(null);

const notifyTitle = ref<string>('')
const notifyMessage= ref<string>('')
const notifyRoute = ref<string>('')

const { clearProductForm } = clearProductsForms()
const { currentFile } = productsStore()

export const useProductsModals = () => {
    const openNotify= (title: string, message: string, route: string) => {
        notify.value = !notify.value
        notifyTitle.value = title
        notifyMessage.value = message
        notifyRoute.value = route

        if(route === 'information'){
            router.push('/checkout/information')
        }
    }
    const closeNotify = () => {
        notify.value = false
        notifyTitle.value = ''
        notifyMessage.value = ''
        notifyRoute.value = ''
    }
    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value
    }

    const toggleCreateProductModal = () => {
        createProduct.value = !createProduct.value
        currentFile.value = null
        clearProductForm()
    }
    const openSelectProductCard = (index: number) => {
        currentFile.value = index
        fileInput.value?.click()
    }
    return {
        openNotify,
        closeNotify,
        toggleFilterAside,
        toggleCreateProductModal,
        openSelectProductCard,

        notify,
        notifyTitle,
        notifyMessage,
        notifyRoute,

        filterAside,
        createProduct,
        fileInput,
    }
}
