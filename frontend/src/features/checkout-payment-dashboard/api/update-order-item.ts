import { handler } from "@/shared/api/http";
import { deleteProductCart } from "@/features/cart-item-action/api/delete-cart";
import { useGetProducts } from "@/features/products/api/get-product";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";

const { getAllProducts, allProducts } = useGetProducts();

export const updateCheckedQuantity = async () => {
    const { cart } = useCartData()
    await getAllProducts();

    const checkedItems = cart.value.filter(
        item => item.checked).map(item => ({ ...item }));

    if (!checkedItems.length) {
        console.log('Нет выбранных (checked) товаров в корзине!', checkedItems);
        return;
    }

    try {
        for(const item of checkedItems){
            await deleteProductCart(item.id);

            const product = allProducts.value?.find(
                p => p.id === item.productId);
            if (!product) {
                console.log(`Товар в корзине c id=${item.productId} или в каталоге не найден`);
                continue;
            }

            const cartObj = item?.variants?.find(
                p => p.count !== undefined);
            if (!cartObj) {
                console.log(`У товара ${item.productId} в корзине нет данных о варианте`, item);
                continue;
            }

            const cartQuantity = Number(cartObj.count);

            const newQuantityArr = product.variants.map(
                v => {
                    const isSame = v.hex === cartObj.hex && String(v.size) === String(cartObj.size);
                    if (!isSame) return { ...v };

                    return {...v, count: Math.max(0, Number(v.count) - cartQuantity)};
                }
            );

            const updatedData = {
                variants: newQuantityArr,
            };

            await handler(`/products/${product.id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedData)
            });

            await handler(`/favorites/${product.id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedData)
            })
        }

        localStorage.removeItem("ordersItem");
    } catch (err) {
        console.error(`Failed to update the status or variants:`, err);
    }
};