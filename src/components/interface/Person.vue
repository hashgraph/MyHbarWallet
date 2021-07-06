<template>
  <div
    class="flex items-center h-20 mb-1 border-b  border-jupiter dark:border-midnight-express"
  >
    <Identicon class="w-10 h-10 mr-2" />

    <div>
      <div class="mb-1 font-medium leading-5 dark:text-white">
        {{ title }}
      </div>

      <div
        class="text-xs font-medium leading-4  text-squant dark:text-argent"
      >
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
