<template>
  <RadioOption :name="name">
    <div
      :class="[
        'rounded mt-1 w-full text-md font-medium px-5 py-3 shadow-md flex justify-between',
        'bg-white dark:bg-dreamless-sleep',
        'border border-transparent dark:border-midnight-express',
        'text-squant dark:text-white',
      ]"
    >
      <div>{{ accountId }}</div>

      <div class="font-semibold">
        {{ balance }}
      </div>
    </div>
  </RadioOption>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RadioOption from "./RadioOption.vue";

export default defineComponent({
  name: "RadioOptionAccount",
  components: { RadioOption },
  props: {
    name: { type: String, required: true },
    accountId: { type: String, required: true },
    balance: { type: String, required: true },
  },
  setup() {
    return {};
  },
});
</script>
