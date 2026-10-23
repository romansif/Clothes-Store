<template>
  <li>
    <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
      <div class="flex py-5 px-3">
        <div class="flex gap-5">
          <img :src="checkoutOrderPreview(product.id, 'ADDED')" alt="" class="w-30 h-39 rounded-2xl border border-gray-400
                  transition duration-400 hover:scale-110">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-1">
              <span class="font-medium">{{ product.title }}</span>
              <span class="text-[#A3A3A3] break-all w-170 overflow-y-auto max-h-30 no-scrollbar">
                    {{ product.description }}
                  </span>
            </div>
            <div class="flex gap-6 text-sm items-center mt-auto">
              <div class="flex gap-1.5 px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                <span>Size:</span>
                <span class="font-medium">
                      {{ product.sizes }}
                    </span>
              </div>
              <div class="flex gap-1.5 px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                <span>Color:</span>
                <span class="font-medium">
                      {{ pureColorsName(product) }}
                    </span>
              </div>
              <div class="flex gap-5 ml-auto">
                <span class="font-bold font-dm-sans">$ {{ product.price }}</span>
                <span class="text-[#A3A3A3]">{{ orderQuantity(product) }} pcs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <OrderItemActions :order="order"
                      :item="product" />
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
  order: Order
  product: Product
}>();

const { getProductId } = previewHelper();
const { pureColorsName } = productHelper();
const { orderQuantity } = useOrder();
</script>

