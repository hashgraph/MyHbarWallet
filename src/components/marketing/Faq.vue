<template>
  <div>
    <div
      class="mb-2 text-base font-semibold leading-tight  text-abbadon-black dark:text-white"
    >
      {{ question }}
    </div>
    <div
      class="mb-8 text-sm font-normal leading-relaxed  text-carbon dark:text-white"
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
