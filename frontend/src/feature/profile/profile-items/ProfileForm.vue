<script setup lang="ts">

</script>

<template>
  <div class="font-medium flex flex-col gap-8 px-12 py-8 rounded-xl bg-white">
    <div class="flex flex-col gap-4">
      <span>PERSONAL DATA</span>
      <div class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label for="">Name</label>
          <input type="text" inputmode="numeric" class="border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New Name" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="">Phone</label>
          <input type="text" inputmode="numeric" class="border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="Phone" />
        </div>
      </div>
      <div class="flex">
        <button class="bg-black text-white rounded px-6 py-3.5 font-semibold w-[230px] text-start">
          Save Changes
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <input type="text" inputmode="numeric" class="border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="Password" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <input type="text" inputmode="numeric" class="border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="Password" />
        </div>
      </div>
      <div class="flex mt-5.5">
        <button class="bg-black text-white rounded px-6 py-3.5 font-semibold w-[230px] text-start">
          Save Password
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <span>Saved Cards</span>
      <span class="text-gray-500 text-xs">You don't have any saved cards for quick payment yet.</span>
    </div>
  </div>
</template>

<style scoped>

</style>