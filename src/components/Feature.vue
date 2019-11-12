<template>
  <div class="feature">
    <img
      class="image"
      :src="image"
      alt=""
    >
    <div class="text">
      <div class="header">
        {{ title }}
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType } from "@vue/composition-api";

export default createComponent({
    props: {
        image: (String as unknown) as PropType<string>,
        title: (String as unknown) as PropType<string>
    }
});
</script>

<style lang="postcss" scoped>
.feature {
    align-items: center;
    display: flex;

    @media (max-width: 500px) {
        flex-direction: column;
    }
}

.image {
    height: 80px;
    margin-inline-end: 30px;

    @media (max-width: 500px) {
        margin-block-end: 30px;
        margin-inline-end: 0;
    }
}

.header {
    font-size: 20px;
    font-weight: 500;
    margin-block-end: 10px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
}
</style>
