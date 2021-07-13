<template>
  <div class="">
    <img
      class="m-auto mb-9"
      :src="img"
      alt="hbdar tab"
    >

    <div
      class="mb-10 text-3xl font-semibold text-center  text-abbadon-black dark:text-white"
    >
      {{ heading }}
    </div>

    <div
      class="text-base font-medium text-center  text-carbon dark:text-white"
    >
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
