import { handler } from "@/shared//api/http";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { productsStore } from "@/shared//composables/stores/products.store";
import { productsForms } from "@/shared/composables/forms/products.forms";
import { clearProductsForms } from "@/shared/composables/clear-forms/clear.products";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

const { openNotify } = useBaseModals();
const { addToCartForm } = productsForms();
const { addToCartErrors } = useFormsErrors();
const { clearAddToCartForm } = clearProductsForms();
const { products, cart, product, orderItems, unreadCount } = productsStore();

export const useCart = () => {
    const getCartProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/cart/${userId}`, {
                method: 'GET',
            })
            cart.value = res;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    const addToCart = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const currentProduct = product.value;

            const newProductCart = await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    color: addToCartForm.value.color,
                    size: addToCartForm.value.size,
                    gender: currentProduct.gender,
                    quantity: 1,
                    status: currentProduct.status,
                    favorite: currentProduct.favorite,
                    checked: currentProduct.checked,
                })
            });
            cart.value = newProductCart;

            unreadCount.value += 1;

            await getCartProducts();

            clearAddToCartForm();

            await openNotify('You have successfully added the item to your cart.',
                'You will now be redirected to the "Cart" page.', 'cart');
        }catch(err){
            addToCartErrors(err);
            console.error(`Failed to add the cart:`, err);
        }
    };

    const checkCartItem = async (id: string, product: any) => {
        try{
            const productCart = cart.value?.find(c => c.id === id);
            if(productCart){
                if(!productCart?.checked){
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                    await handler(`/products/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                }else{
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    });
                    await handler(`/products/${id}`, {
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
            const userId = localStorage.getItem('userId');

            const allCartItems = await handler(`/cart/${userId}`, {
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
        const userId = localStorage.getItem("userId");
        try{
            const cartItems = await handler(`/cart/${userId}`, {
                method: "GET"
            })
            const checkedItems = cartItems.filter((item: any) => item.checked === true);

            for(const item of checkedItems) {
                const product = products.value?.find(
                    p => p.id === item.productId
                );
                if(!product) {
                    console.log('Товар в корзине или в каталоге не найден')
                    return
                }

                const currentQuantity = Number(product?.quantity);
                const cartQuantity = Number(item?.quantity);
                const newQuantity = currentQuantity - cartQuantity;

                const updatePayload: Record<string, any> = {quantity: newQuantity}

                if(newQuantity === 0){
                    updatePayload.status = "Exhausted";
                }
                await handler(`/products/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatePayload)
                });
                await handler(`/favorites/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatePayload)
                });

                await deleteProductCart(item.id);
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
        checkCartItem,
        addToCart,
        updateCartItem,
        updateCartChecked,
        updateCheckedQuantity,
        deleteProductCart
    }
}