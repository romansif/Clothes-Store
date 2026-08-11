<script setup lang="ts">
import NavBar from "./navigation/NavBar.vue";
import Header from "./header/Header.vue";
import Main from "./main/Main.vue";
import Footer from "./footer/Footer.vue";

</script>

<template>
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <Header />
    <Main />
  </div>
  <Footer />
</template>

<style scoped>

</style>