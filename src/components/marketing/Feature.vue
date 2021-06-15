<template>
  <div class="">
    <img class="m-auto mb-9" :src="img" alt="hbdar tab" />

    <div
      class="
        text-3xl text-center text-abbadon-black
        dark:text-white
        font-semibold
        mb-10
      "
    >
      {{ heading }}
    </div>

    <div class="text-center text-carbon dark:text-white font-medium text-base">
      {{ bio }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Feature",
  props: {
    img: { type: String, required: true },
    heading: { type: String, required: true },
    bio: { type: String, required: true },
  },
});
</script>
