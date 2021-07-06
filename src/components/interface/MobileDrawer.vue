<template>
  <MobileHeader>
    <Drawer />
  </MobileHeader>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MobileHeader from "../base/MobileHeader.vue";

import Drawer from "./Drawer.vue";

export default defineComponent({
  name: "MobileDrawer",
  components: { MobileHeader, Drawer },
});
</script>
