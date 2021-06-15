<template>
  <div>
    <div
      class="
        text-abbadon-black
        dark:text-white
        font-semibold
        text-base
        mb-2
        leading-tight
      "
    >
      {{ question }}
    </div>
    <div
      class="
        text-sm
        font-normal
        text-carbon
        dark:text-white
        mb-8
        leading-relaxed
      "
    >
      {{ answer }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Faq",
  props: {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
};
</script>
