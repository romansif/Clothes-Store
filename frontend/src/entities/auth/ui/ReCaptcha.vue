<script setup lang="ts">
// import { onMounted } from "vue";
//
// declare global {
//   interface Window {
//     recaptcha: {
//       enterprise: {
//         ready: (callback: () => void) => void;
//         render: (container: HTMLElement | string, parameters: {
//           sitekey: string;
//           callback?: (token: string) => void;
//         }) => number;
//       };
//     };
//   }
// }
//
// onMounted(() => {
//   window.recaptcha.enterprise.ready(() => {
//     window.recaptcha.enterprise.render(
//         document.getElementById("recaptcha-button")!,
//         {
//           sitekey: "6LdYsYUtAAAAAPhhOJW7QZVDba0GN_huK5OI0_Sr",
//           callback: (token: string) => {
//             console.log("Токен капчи:", token);
//             // Здесь вызывай свою функцию отправки или сохранения токена
//           },
//         }
//     );
//   });
// });
</script>

<template>
  <div id="recaptcha-button"></div>
</template>

<style scoped>
</style>