<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Footer from "../base/Footer.vue";
import Nav from "./Nav.vue";

export default defineComponent({
  name: "MarketingLayout",
  components: {
    Footer,
    Nav,
  },
});
</script>
