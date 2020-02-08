<template>
  <router-link
    :to="{ name: route }"
    class="home-tile-button"
  >
    <img
      :src="image"
      class="tile-image"
    >
    <div class="content">
      <div class="title">
        {{ title }}
      </div>
      <div class="message">
        {{ content }}
      </div>
      <div
        v-if="action"
        class="action-label"
      >
        {{ action }}
        <MaterialDesignIcon
          :icon="rightArrow"
          class="action-icon"
        />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { mdiArrowRight } from "@mdi/js";
import { createComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default createComponent({
    name: "HomeTileButton",
    components: { MaterialDesignIcon },
    props: {
        route: String,
        title: String,
        content: String,
        action: String,
        image: String
    },
    setup() {
        const rightArrow = mdiArrowRight;
        return { rightArrow };
    }
});
</script>

<style lang="postcss" scoped>
    .home-tile-button {
        align-items: center;
        background-color: var(--color-byzantine-night-blue);
        border-radius: 4px;
        color: var(--color-white);
        display: flex;
        outline: none;
        padding: 30px 40px;
        padding-block-end: 40px;
        text-decoration: none;

        /* so the shadow appears over the image directly below this */
        z-index: 1;

        @media (min-width: 1025px) {
            transition: transform 0.3s ease;

            &:hover,
            &:focus {
                box-shadow: 0 5px 24px rgba(0, 0, 0, 0.15);
                transform: translateY(-10px);
            }
        }

        @media (prefers-reduced-motion) {
            transition: none;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
    }

    .tile-image {
        flex-shrink: 0;
        height: 87px;
        margin-inline-end: 40px;
        width: 87px;

        @media (max-width: 550px) {
            display: none;
        }
    }

    .title {
        font-size: 24px;
        font-weight: 500;
        margin-block-end: 8px;
    }

    .message {
        font-size: 14px;
        margin-block-end: 20px;
    }

    .action-icon {
        margin-inline-start: 5px;
        width: 20px;
    }

    .action-label {
        align-items: center;
        display: flex;
        font-size: 15px;
        font-weight: 500;
    }

    @media (max-width: 414px) {
        .home-tile-button {
            justify-content: center;
            padding: 11px;
        }

        .title {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-block: 10px 10px;
        }

        .message,
        .action-label {
            display: none;
        }
    }
</style>
