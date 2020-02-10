<template>
  <span class="info-button">
    <Tooltip
      :message="message"
      :pinnable="true"
    >
      <MaterialDesignIcon
        :icon="mdiAlertCircle"
        class="icon"
      />
    </Tooltip>
  </span>
</template>

<script lang="ts">
import { mdiAlertCircle } from "@mdi/js";
import { createComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import Tooltip from "./Tooltip.vue";

export default createComponent({
    name: "InfoButton",
    components: {
        MaterialDesignIcon,
        Tooltip
    },
    props: { message: String },
    setup() {
        return { mdiAlertCircle };
    }
});
</script>

<style lang="postcss" scoped>
    button {
        border: none;
        outline: none;
        padding: 0;
    }

    .info-button {
        cursor: pointer;
        display: inline-flex;
    }

    .icon {
        color: var(--color-basalt-grey);

        &:hover,
        &:focus {
            color: var(--color-melbourne-cup);
        }
    }
</style>
