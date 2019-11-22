<template>
  <div
    class="account-tile-button"
    :class="{ disabled }"
    v-on="this.$listeners"
  >
    <img
      class="tile-image"
      :src="image"
    >
    <div class="text">
      <div class="title">
        {{ title }}
      </div>
      <div class="content">
        {{ content }}
      </div>
      <div class="note">
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    props: {
        disabled: Boolean,
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        note: { type: String, required: false, default: "" },
        image: { type: String, default: null }
    }
});
</script>

<style lang="postcss" scoped>
.title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 5px;
    padding-block-start: 5px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
    text-align: center;
}

.note {
    color: var(--color-sunkist-coral);
    font-size: 11px;
    margin-block-start: 5px;
}

.account-tile-button {
    align-items: center;
    background-color: var(--color-white);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-block: 10px 25px;
    padding-inline: 15px;
    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: background-color, transform 0.3s ease;
    user-select: none;
    width: 100%;

    & .title,
    & .content,
    & .note {
        /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
        transition: color 0.3s ease;

        @media (prefers-reduced-motion) {
            transition: none;
        }
    }

    &:hover,
    &:focus {
        background-color: var(--color-melbourne-cup);
        box-shadow: 0 5px 24px rgba(0, 0, 0, 0.07);
        transform: translateY(-10px);

        & .title,
        & .content,
        & .note {
            color: var(--color-white);
        }
    }

    &.disabled {
        filter: blur(0.5px);
        opacity: 0.5;
        pointer-events: none;
    }

    @media (prefers-reduced-motion) {
        transition: none;
    }

    @media (max-width: 600px) {
        flex-direction: row;
    }
}

.tile-image {
    flex-shrink: 0;
    padding-block: 17.5px;
}

.text {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 600px) {
        align-items: flex-start;

        & .content {
            text-align: start;
        }
    }
}
</style>
