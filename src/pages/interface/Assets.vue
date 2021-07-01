<template>
  <Headline :title="$t('InterfaceAssets.header')" />
<<<<<<< HEAD
  <InterfaceAssets hide-header class="mt-6 pb-10 w-full" />
=======
  <InterfaceAssets hide-header class="mt-6 pb-10" />
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
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
