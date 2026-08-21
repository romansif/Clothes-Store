import { ref } from "vue";
import { clearUsersForms } from "@/feature/profile/lib/clear.users.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { adressApi } from "@/feature/checkout/api/adress.api.ts";
import { paymentApi } from "@/feature/checkout/api/payment.api.ts";
import { ordersApi } from "@/feature/orders/api/orders.api.ts";
import { authApi } from "@/feature/auth/api/auth.api.ts";
import { favoritesApi } from "@/feature/favorite/api/favorites.api.ts";

const avatarModal = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const currentOrder= ref<boolean>(false);
const orderHistory = ref<boolean>(false);
const addressesAndCards = ref<boolean>(false);
const confidentialityData = ref<boolean>(false);

const generalId = ref<string>('');
const deleteType = ref<string>('');
const deleteMessage = ref<string>('');
const deleteChoice = ref<boolean>(false);

const { deleteAddress } = adressApi();
const { deletePayment } = paymentApi();
const { deleteProduct } = productsApi();
const { deleteProductCart } = cartApi();
const { logout, deleteAccount } = authApi();
const { deleteOrderProducts } = ordersApi();
const { deleteFavoriteProduct } = favoritesApi();
const { clearUpdateUserForm } = clearUsersForms();

export const useProfileModals = () => {
    const toggleAvatar = () => {
        avatarModal.value = !avatarModal.value;
    }

    const openSelectAvatar = () => {
        fileInput.value?.click()
    }

    const toggleOrderHistory = () => {
        orderHistory.value = !orderHistory.value;
    }

    const toggleCurrentOrder = () => {
        currentOrder.value = !currentOrder.value;
    }

    const toggleConfidentialityData = () => {
        confidentialityData.value = !confidentialityData.value;
        clearUpdateUserForm();
    }

    const toggleAddressesAndCards = () => {
        addressesAndCards.value = !addressesAndCards.value;
    }

    const toggleDeleteChoice = (message: string, type: string, id: string) => {
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteChoice.value = !deleteChoice.value;
    }

    const generalDelete = async () => {
        try{
            switch (deleteType.value) {
                case "EXIT":
                    await logout()
                    break;

                case "DELETE_ACCOUNT":
                    await deleteAccount()
                    break;

                case "DELETE_PROUCT_ITEM":
                    await deleteProduct(generalId.value)
                    break

                case "DELETE_CART_ITEM":
                    await deleteProductCart(generalId.value)
                    break;

                case "DELETE_FAVORITE_ITEM":
                    await deleteFavoriteProduct(generalId.value)
                    break;

                case "DELETE_ORDERS":
                    await deleteOrderProducts(generalId.value)
                    break;

                case "DELETE_SAVED_ADDRESS":
                    await deleteAddress(generalId.value)
                    break;

                case "DELETE_SAVED_CARD":
                    await deletePayment(generalId.value)
                    break;
            }
            deleteChoice.value = false
        }catch(err){
            console.log(`Не удалось провести ${deleteType.value}`, err);
        }
    };

    return {
        toggleAvatar,
        openSelectAvatar,

        toggleOrderHistory,
        toggleCurrentOrder,
        toggleConfidentialityData,
        toggleAddressesAndCards,

        orderHistory,
        currentOrder,
        confidentialityData,
        addressesAndCards,

        avatarModal,
        fileInput,

        deleteType,
        deleteMessage,
        deleteChoice,

        toggleDeleteChoice,
        generalDelete,
    }
}