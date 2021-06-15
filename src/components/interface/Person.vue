<template>
  <div
    class="
      h-20
      mb-1
      flex
      items-center
      border-b border-jupiter
      dark:border-midnight-express
    "
  >
    <Identicon class="h-10 w-10 mr-2" />

    <div>
      <div class="leading-5 font-medium mb-1 dark:text-white">
        {{ title }}
      </div>

      <div class="text-xs leading-4 text-squant font-medium dark:text-argent">
        {{ timing }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Identicon from "./Identicon.vue";

export default defineComponent({
  name: "Person",
  components: { Identicon },
  props: {
    title: { type: String, required: true },
    timing: { type: String, required: true },
  },
});
</script>
