<template>
  <Headline :title="$t('InterfaceAssets.header')" />
  <InterfaceAssets
    hide-header
    class="mt-6 pb-10"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import InterfaceAssets from "../../components/interface/Assets.vue";
import Headline from "../../components/interface/Headline.vue";

export default defineComponent({
  name: "Assets",
  components: {
    InterfaceAssets,
    Headline,
  },
});
</script>
