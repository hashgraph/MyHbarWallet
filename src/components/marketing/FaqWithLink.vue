<template>
  <div>
    <div
      class="mb-2 text-base font-semibold leading-tight text-abbadon-black dark:text-white"
    >
      {{ question }}
    </div>
    <div
      class="mb-8 text-sm font-normal leading-relaxed text-carbon dark:text-white"
    >
      {{ firstAnswer }} <a
        class="underline"
        :href="link"
      >{{ secondAnswer }}</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FaqWithLink",
  props: {
    question: { type: String, required: true },
    firstAnswer: { type: String, required: true },
    secondAnswer: { type: String, required: true },
    link: { type: String, required: true },
  },
};
</script>


