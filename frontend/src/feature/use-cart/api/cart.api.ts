import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productApi } from "@/feature/use-product/api/product.api.ts";
import { addToCartForm } from "@/feature/use-cart/model/cart.form.ts";
import { clearAddToCartForm } from "@/feature/use-cart/lib/clear.cart.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import type {CartItem} from "@/entities/cart/model/cart.types.ts";

const { userData } = userStore();
const { orderItems } = orderStore();
const { cartForm } = addToCartForm();
const { openNotify } = useBaseModals();
const { getAllProducts } = productApi();
const { cart, unreadCount } = cartStore();
const { addToCartErrors } = useFormsErrors();
const { clearCartForm } = clearAddToCartForm();
const { allProducts, products, product } = productStore();

export const cartApi = () => {
    const getCartProducts = async () => {
        try{
            const res = await handler(`/cart/${userData.id}`, {
                method: 'GET',
            })
            console.log(res);
            cart.value = res;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    const addToCart = async () => {
        try{
            const currentProduct = product.value;

            const newProductCart = await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    colors: [{
                        hex: cartForm.value.colors.hex,
                        colorName: cartForm.value.colors.colorName
                    }],
                    sizes: cartForm.value.sizes,
                    gender: currentProduct.gender,
                    quantity: 1,
                    status: currentProduct.status,
                    checked: false,
                })
            });
            console.log('New Cart item', newProductCart);
            cart.value = newProductCart;

            unreadCount.value += 1;

            await getCartProducts();

            clearCartForm();

            await openNotify('You have successfully added the item to your cart.',
                'You will now be redirected to the "Cart" page.', '');
        }catch(err){
            addToCartErrors(err);
            console.error(`Failed to add the cart:`, err);
        }
    };

    const checkCartItem = async (id: string, productId: string, product: CartItem) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);
            if(productCart){
                if(!productCart?.checked){
                    await handler(`/cart/${productId}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                }else{
                    await handler(`/cart/${productId}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    });
                }

                const index = orderItems.value.findIndex(item => item.id === product.id);
                if(index === -1) {
                    orderItems.value.push(product);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }else{
                    orderItems.value.splice(index, 1);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to add the product to order:`, err);
        }
    };

    const updateCartItem = async (type: string, id: string, status: string) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);
            const product = products.value?.find(
                p => p.id === productCart?.productId
            );

            if(!productCart && !product) {
                console.log('Товар в корзине или в каталоге не найден')
                return
            }

            const basePrice =  Number(product?.price)
            const stock = Number(product?.quantity);
            const currentPrice = Number(productCart?.price);
            const currentQuantity = Number(productCart?.quantity);

            if(status === 'Availability'){
                if(type === 'add'){
                    if(currentQuantity < stock){
                        const newPrice = currentPrice + basePrice;
                        const newQuantity = currentQuantity + 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                quantity: newQuantity,
                            })
                        });
                    }else{
                        console.warn('Достигнуто максимальное количество товара на складе.');
                        await openNotify('The item is no longer in stock.',
                            'The maximum stock level for the item has been reached.', '')
                        return;
                    }
                }else if(type === 'away') {
                    if(currentQuantity <= 1){
                        await deleteProductCart(id);
                    }else{
                        const newPrice = currentPrice - basePrice;
                        const newQuantity = currentQuantity - 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                quantity: newQuantity,
                            })
                        });
                    }
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to update the cart product quantity:`, err);
        }
    };

    const updateCartChecked = async () => {
        try{
            const allCartItems = await handler(`/cart/${userData.id}`, {
                method: "GET"
            });
            for(const item of allCartItems) {
                await handler(`/cart/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: false
                    })
                })
            }
            orderItems.value = [];

            await getCartProducts();
        }catch(err){
            console.error(`Failed to remove the products to status false:`, err);
        }
    };

    const updateCheckedQuantity = async () => {
        await getCartProducts();
        await getAllProducts();

        const checkedItems = cart.value.filter(
            item => item.checked).map(
                item => ({ ...item })
        );
        if (!checkedItems || checkedItems.length === 0) {
            console.log('Нет выбранных (checked) товаров в корзине!', checkedItems);
            return;
        }

        try{
            for(const item of checkedItems) {
                await deleteProductCart(item.id);

                const product = allProducts.value?.find(
                    p => p.id === item.productId);
                if(!product) {
                    console.log(`Товар в корзине c id=${item.productId} или в каталоге не найден`);
                    continue
                }

                console.log(product, item);

                const currentQuantity = Number(product?.quantity);
                const cartQuantity = Number(item?.quantity);
                const newQuantity = currentQuantity - cartQuantity;

                const updatedData = newQuantity > 0
                    ? { quantity: newQuantity }
                    : { status: 'Exhausted', quantity: newQuantity };

                await handler(`/products/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatedData)
                });
                await handler(`/favorites/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatedData)
                }).catch(() => {});
            }
            localStorage.removeItem("ordersItem");
        }catch(err){
            console.error(`Failed to update the status or quantity:`, err);
        }
    };

    const deleteProductCart = async (id: string) => {
        try{
            await handler(`/cart/${id}`, {
                method: "DELETE",
            });
            await getCartProducts();
        }catch(err){
            console.error(`Failed to delete the cart product:`, err);
        }
    };

    return {
        getCartProducts,

        addToCart,

        checkCartItem,
        updateCartItem,
        updateCartChecked,
        updateCheckedQuantity,

        deleteProductCart
    }
}