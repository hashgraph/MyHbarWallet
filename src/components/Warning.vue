<template>
  <div class="warning">
    <Notice
      :symbol="mdiAlertOutline"
      :title="title"
    >
      {{ message }}
    </Notice>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { mdiAlertOutline } from "@mdi/js";

import Notice from "../components/Notice.vue";

export default createComponent({
    name: "Warning",
    components: { Notice },
    props: {
        title: { type: String },
        message: { type: String }
    },
    setup() {
        return { mdiAlertOutline };
    }
});
</script>
