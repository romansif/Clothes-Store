<template>
    <div v-if="showSuccessFullPayment" class="flex justify-center items-center min-h-screen bg-[#F0F0F0] font-raleway w-full">
      <div class="flex flex-col items-center gap-7">
        <img :src="success" alt="">
        <h1 class="text-5xl font-semibold">
          Payment successful
        </h1>
        <span class="font-medium text-[#555] text-center w-110">
          Thank you for your order. We sent a confirmation to your email.
        </span>
        <div class="flex flex-col gap-5 border-2 p-7 bg-white w-180">
          <div class="flex flex-col gap-7 pb-7 border-b-2 border-[#ccc]">
            <div class="flex items-center">
              <h3 class="text-xl font-semibold">Order summary</h3>
              <span class="ml-auto text-[#555] font-dm-sans">$ {{ price }}</span>
            </div>
            <div v-if="userPaymentCard" class="flex items-center text-[#555]">
              <span>Date</span>
              <span class="ml-auto font-dm-sans">
                $ {{ userPaymentCard.created_at }}
              </span>
            </div>
            <div v-if="userPaymentCard" class="flex items-center text-[#555]">
              <span>Payment method</span>
              <span v-if="userPaymentCard.paymentMethod === 'card'" class="ml-auto font-dm-sans">
                {{ userPaymentCard.paymentMethod }}
              </span>
              <span v-else class="ml-auto font-dm-sans">
                {{ userPaymentCard.paymentMethod }} pay
              </span>
            </div>
            <div v-if="userAddress" class="flex items-center text-[#555]">
              <span>Delivery address</span>
              <span class="ml-auto font-dm-sans">
                {{ userAddress.address }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-3.5">
            <div class="flex items-center gap-3.5 text-[#555] text-sm">
              <span>Commission</span>
              <span class="font-dm-sans">
                $ {{ commissionPrice }}
              </span>
            </div>
            <div class="flex items-center">
              <h2 class="text-xl font-semibold">Total Paid</h2>
              <span class="ml-auto font-dm-sans">
                $ {{ totalPrice }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-6 mt-7">
          <router-link :to="{ name: 'profile' }">
            <UiButton name="View my orders"
                      variant="viewMyOrders"
                      @click="showSuccessFullPayment = false" />
          </router-link>
          <router-link :to="{ name: 'shop' }">
            <UiButton name="Continue shopping"
                      variant="paymentSuccess"
                      @click="showSuccessFullPayment = false" />
          </router-link>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { useSavedAddressData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { useSavedPaymentData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { showSuccessFullPayment } from "@/features/payment-success/model/success-payment.refs";
import { UiButton } from "@/shared/ui/button";

import success from "@/assets/icons/checkout/payment/success.svg"

const { userAddress } = useSavedAddressData()
const { userPaymentCard } = useSavedPaymentData()
const { price, commissionPrice, totalPrice } = orderPriceInfo();
</script>
