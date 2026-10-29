<template>
    <main class="mt-10 flex">
        <MyProductList :user="user" />
    </main>
    <Transition name="modal">
        <DeleteModal v-if="deleteModal" />
    </Transition>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { MyProductList } from "@/widgets/my-product-list";
import { DeleteModal } from "@/features/general-delete";

const { user } = useUserData();
const { deleteModal } = baseDeleteModal();
</script>
