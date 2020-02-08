<template>
  <a
    :href="href"
    class="social-icon"
    rel="noopener"
    target="_blank"
  >
    <div class="link-content">
      <img
        :src="image"
        alt=""
      >
      {{ name }}
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    name: "CommunitySocialIcon",
    props: {
        href: String,
        name: String,
        image: String
    }
});
</script>

<style lang="postcss" scoped>
    .social-icon {
        min-width: 80px;
        text-decoration: none;
    }

    .link-content {
        color: var(--color-basalt-grey);
        display: flex;
        flex-flow: column nowrap;
        font-size: 14px;
        text-align: center;

        & :first-child {
            border-radius: 100%;
            height: 64px;
            margin: 0 auto 9px;
            width: 64px;
        }
    }
</style>
