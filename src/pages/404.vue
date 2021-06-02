<template>
  <Gradient class="flex-1 mb-40">
    <div
      class="
        mt-16
        flex flex-col
        items-center
        font-medium
        px-2
        text-midnight-express
        dark:text-white
      "
    >
      <Image
        :light="img404"
        :dark="img404"
        class="my-4 h-48 transform translate-x-3"
      />

      <div class="text-8xl font-bold">404</div>

      <div class="text-3xl mt-10">Sorry, no currency here!</div>
    </div>
  </Gradient>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Gradient from "../components/base/Gradient.vue";
import Image from "../components/base/Image.vue";
import img404 from "../assets/img_404.svg";

export default defineComponent({
  name: "404",
  components: { Gradient, Image },
  setup() {
    return { img404 };
  },
});
</script>
