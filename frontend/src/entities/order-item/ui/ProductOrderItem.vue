<template>
    <li>
        <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
            <div class="flex px-3 py-5">
                <div class="flex gap-5">
                    <img
                        :src="checkoutOrderPreview(product.id, 'ADDED')"
                        alt=""
                        class="h-39 w-30 rounded-2xl border border-gray-400 transition duration-400 hover:scale-110"
                    />
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-col gap-1">
                            <span class="font-medium">{{ product.title }}</span>
                            <span
                                class="no-scrollbar max-h-30 w-170 overflow-y-auto break-all text-[#A3A3A3]"
                            >
                                {{ product.description }}
                            </span>
                        </div>
                        <div class="mt-auto flex items-center gap-6 text-sm">
                            <div class="flex gap-1.5 rounded bg-[#F0F0F0] px-2.5 py-0.5">
                                <span>Size:</span>
                                <span class="font-medium">
                                    {{ product.sizes }}
                                </span>
                            </div>
                            <div class="flex gap-1.5 rounded bg-[#F0F0F0] px-2.5 py-0.5">
                                <span>Color:</span>
                                <span class="font-medium">
                                    {{ pureColorsName(product) }}
                                </span>
                            </div>
                            <div class="font-dm-sans ml-auto flex items-center gap-5">
                                <span class="font-bold">$ {{ product.price }}</span>
                                <span class="text-[#A3A3A3]"
                                    >{{ orderQuantity(product) }} pcs.</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
        <OrderItemActions :order="order" :item="product" />
    </li>
</template>

<script setup lang="ts">
import { checkoutOrderPreview } from "@/entities/checkout-order-item/lib/checkout-order-preview";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { productHelper } from "@/shared/lib/product-helper";
import { useOrder } from "@/entities/order-item/lib/use-order";
import { OrderItemActions } from "@/entities/order-action";
import type { Product } from "@/shared";
import type { Order } from "@/entities/order";

defineProps<{
    order: Order;
    product: Product;
}>();

const { getProductId } = previewHelper();
const { pureColorsName } = productHelper();
const { orderQuantity } = useOrder();
</script>
