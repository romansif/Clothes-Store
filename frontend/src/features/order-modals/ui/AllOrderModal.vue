<template>
    <div>
        <div
            v-if="!choiceModal"
            class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
            @click="toggleOrderHistory"
        >
            <main @click.stop class="flex h-162.5 w-222.5 flex-col rounded-xl bg-white p-5">
                <UiButton name="Exit" variant="exitClose" @click="toggleOrderHistory" />
                <header class="flex flex-col gap-2 border-b py-4">
                    <h1 class="text-2xl font-bold">ALL ORDERS</h1>
                    <div class="flex">
                        <span class="text-sm text-[#A3A3A3]">
                            Purchase history and status tracking.
                        </span>
                        <span
                            class="font-dm-sans ml-auto h-fit rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                        >
                            Всего заказов: {{ orders.length }}
                        </span>
                    </div>
                </header>
                <Transition name="view" mode="out-in">
                    <div>
                        <Loader v-if="isLoading" variant="orders" />
                        <ErrorState
                            v-else-if="isError"
                            variant="orders"
                            :loading="isFetching"
                            @reload="refetch()"
                        />
                        <OrderList v-else-if="orders.length" :orders="orders" />
                        <EmptyState
                            v-else
                            variant="orders"
                            :loading="isFetching"
                            @reload="refetch()"
                        />
                    </div>
                </Transition>
                <Transition name="modal">
                    <Clipboard v-if="clipboard" />
                </Transition>
            </main>
        </div>
        <Transition name="modal">
            <ReplacementModal v-if="choiceModal" />
        </Transition>
        <Transition name="modal">
            <CreateReview v-if="reviewFormModal" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useOrder } from "@/entities/order-item/lib/use-order";
import { useOrderData } from "@/widgets/order-list/lib/use-order-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { reviewFormModal } from "@/entities/order-action/lib/review-form-modal";
import { choiceModal } from "@/entities/order-action/lib/order-modal";
import { UiButton } from "@/shared/ui/button";
import { Clipboard } from "@/widgets/clipboard";
import { ReplacementModal } from "@/features/order-modals";
import { CreateReview } from "@/features/add-review";
import { OrderList } from "@/widgets/order-list";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";

const { clipboard } = useOrder();
const { toggleOrderHistory } = useProfileModals();
const { orders, isLoading, isFetching, isError, refetch } = useOrderData();
</script>
