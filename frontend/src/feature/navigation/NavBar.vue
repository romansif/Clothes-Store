<script setup lang="ts">
import catalog from '../../app/assets/icons/catalog.png'
import logo from '../../app/assets/icons/logo.png'
import cart_cart from '../../app/assets/icons/cart-cart.png'
import liked from '../../app/assets/icons/liked.png'
import cart from '../../app/assets/icons/cart.png'
import profile from '../../app/assets/icons/profile.png'
import search from '../../app/assets/icons/search.png'
</script>

<template>
  <nav>
    <div class="xl:flex xl:items-center xl:justify-between xl:p-12
          lg:flex lg:items-center lg:justify-between lg:p-12
          md:flex md:items-center md:justify-between md:p-8
          sm:flex sm:items-center sm:justify-between sm:p-6
          flex items-center justify-between p-6">
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-10
          sm:flex sm:gap-10
          flex gap-10">
        <img :src=catalog alt="">
        <div class="xl:flex xl:gap-10
            lg:flex lg:gap-10
            md:hidden sm:hidden hidden">
          <span class="xl:font-bold lg:font-bold">
            Home
          </span>
          <span>Collections</span>
          <span>New</span>
        </div>
      </div>
      <div>
        <img :src=logo alt="">
      </div>
      <div class="xl:flex xl:gap-10
          lg:flex lg:gap-10
          md:flex md:gap-5
          sm:flex sm:gap-2
          flex">
        <div class="xl:flex lg:flex md:hidden sm:hidden hidden">
          <img :src=liked alt="">
        </div>
        <div class="xl:flex lg:flex md:hidden sm:hidden hidden">
          <div class="xl:relative lg:relative">
            <img :src=cart_cart alt="" class="xl:relative lg:relative">
            <span class="xl:absolute xl:right-7 xl:top-1/2 xl:-translate-y-1/2 xl:w-6 xl:h-6 xl:text-white
                 lg:absolute lg:right-7 lg:top-1/2 lg:-translate-y-1/2 lg:w-6 lg:h-6 lg:text-white">
              Cart
            </span>
          </div>
        <img :src=cart alt="" class="">
        </div>
        <img :src=profile alt="">
      </div>
    </div>
  </nav>
  <main>
    <div class="xl:flex xl:flex-col xl:px-12 xl:gap-5">
      <div class="xl:flex xl:flex-col">
        <span>MEN</span>
        <span>WOMEN</span>
        <span>KIDS</span>
      </div>
      <div class="xl:flex">
        <div class="xl:relative">
          <input type="text" class="bg-[#D9D9D9] xl:h-[50px] xl:w-[370px] xl:border-none xl:outline-none">
          <img :src=search alt="" class="xl:absolute xl:left-4 xl:top-1/2 xl:-translate-y-1/2 ">
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>


</style>