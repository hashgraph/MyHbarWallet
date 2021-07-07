<template>
  <Gradient class="flex-1 mb-40">
    <div
      class="flex flex-col items-center px-2 mt-16 font-medium  text-midnight-express dark:text-white"
    >
      <Image
        :light="img404"
        :dark="img404"
        class="h-48 my-4 transform translate-x-3"
      />

      <div class="font-bold text-8xl">
        404
      </div>

      <div class="mt-10 text-3xl">
        Sorry, no currency here!
      </div>
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
