<template>
  <div class="title-container">
    <!-- todo: move this to a computed, it's being difficult with the  -->
    <div
      class="title"
      :class="{ large }"
    >
      {{ title }}
    </div>
    <div class="subtitle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    props: {
        title: { type: String, required: true },
        large: { type: Boolean }
    }
});
</script>

<style lang="postcss" scoped>
.title-container {
    margin-block-end: 50px;
    text-align: center;

    @media (max-width: 425px) {
        margin-block-end: 40px;
        padding: 0 20px;
    }
}

.title {
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;

    @media (max-width: 425px) {
        font-size: 26px;
    }
}

.title.large {
    font-size: 45px;

    @media (max-width: 425px) {
        font-size: 26px;
    }
}

.subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}
</style>
