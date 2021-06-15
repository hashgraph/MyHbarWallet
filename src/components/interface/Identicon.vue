<template>
  <!-- eslint-disable-next-line vue/no-lone-template, vue/no-v-html -->
  <div v-html="avatar" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { toSvg } from "jdenticon";

export default defineComponent({
  props: {
    publicKey: {
      type: String,
      default: null,
    },
    size: { type: Number, default: 40 },
  },
  setup(props) {
    const avatar = toSvg(props.publicKey, props.size);

    return {
      avatar,
    };
  },
});
</script>
