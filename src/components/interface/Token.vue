<template>
  <div
    :class="[
      'grid grid-layout grid-flow-row gap-y-2 items-center max-h-36 pt-6 mb-6',
      'md:flex',
    ]"
  >
    <img
      class="h-11 w-11 lg:ml-5 md:mr-4"
      :src="img"
      alt=""
    >

    <div class="contents md:block">
      <div
        :class="[
          'pl-4 leading-5 text-black-out dark:text-white font-semibold',
          'md:pl-0 md:mb-1',
        ]"
      >
        {{ token }}
      </div>

      <div
        class="col-span-3 row-start-2 text-sm leading-5  text-squant dark:text-argent md:max-w-md lg:max-w-xl"
      >
        {{ blurb }}
      </div>
    </div>

    <TokenAssociateButton
      :to="{ name: 'tokendetails' }"
      :associated="associated"
      class=" place-self-end md:place-self-auto md:ml-auto md:flex-shrink-0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import greenCheck from "../../assets/icon_check_green.svg";

import TokenAssociateButton from "./TokenAssociateButton.vue";

export default defineComponent({
  name: "Token",
  components: { TokenAssociateButton },
  props: {
    img: { type: String, required: true },
    token: { type: String, required: true },
    blurb: { type: String, required: true },
    associated: { type: Boolean, default: false },
  },
  setup() {
    return {
      greenCheck,
    };
  },
});
</script>

<style lang="postcss">
.grid-layout {
    grid-template-columns: theme("spacing.11") auto theme("spacing.36");
}
</style>
