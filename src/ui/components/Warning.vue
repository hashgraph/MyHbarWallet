<template>
    <div class="warning">
        <Notice
            :title="title"
            :symbol="mdiAlertOutline"
        >
            {{ message }}
        </Notice>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { mdiAlertOutline } from "@mdi/js";

import Notice from "./Notice.vue";

export default defineComponent({
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
