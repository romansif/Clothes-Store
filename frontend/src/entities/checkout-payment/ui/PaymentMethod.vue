<template>
  <div class="flex items-center gap-3">
    <input @click="closeCardForm(method)"
           v-model="model"
           type="radio"
           :value="method"
           name="shipping-method"
           class="accent-black w-4 h-4" />
    <div class="flex flex-col">
      <span class="font-semibold">
        {{ title }}
      </span>
      <span class="text-xs text-gray-500">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  method: string;
  title: string;
  text: string;
}>();

const emit = defineEmits<{
  closeCardForm: [method: string];
}>();

const closeCardForm = (method: string) => {
  emit("closeCardForm", method);
};

const model = defineModel<string | number>();
</script>

<style scoped>

</style>