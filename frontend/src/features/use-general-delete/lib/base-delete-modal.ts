import { ref } from "vue";
import { useAuth } from "@/features/use-auth/api/use-auth.ts";
import { useDeletePayment } from "@/features/use-user-payment/api/delete-payment.ts";
import { useDeleteProduct } from "@/features/use-my-product/api/delete-product.ts";
import { useDeleteCart } from "@/features/use-cart/api/delete-cart.ts";
import { useDeleteAddress } from "@/features/use-user-address/api/delete-address.ts";
import { useDeleteOrder } from "@/features/use-order/api/delete-order.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";

const { getMyProducts } = useGetMyProduct()
const { logout, deleteAccount } = useAuth();
const { deletePayment } = useDeletePayment();
const { deleteProduct } = useDeleteProduct();
const { deleteProductCart } = useDeleteCart();
const { deleteAddress } = useDeleteAddress();
const { deleteOrderProducts } = useDeleteOrder();
const { deleteFavoriteProduct } = useToggleFavorite();

const generalId = ref<string>('');
const deleteType = ref<string>('');
const deleteMessage = ref<string>('');
const deleteModal = ref<boolean>(false);

export const baseDeleteModal = () => {
    const toggleDeleteChoice = (message: string, type: string, id: string) => {
        console.log('SADA')
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteModal.value = !deleteModal.value;
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
                    await getMyProducts()
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
            deleteModal.value = false
        }catch(err){
            console.log(`Не удалось провести ${deleteType.value}`, err);
        }
    };

    return {
        generalId,
        deleteMessage,
        deleteModal,

        toggleDeleteChoice,
        generalDelete,
    }
}