<template>
    <div class="warning">
        <Notice title="NOT RECOMMENDED" :symbol="mdiAlertOutline">
            This is not a recommended way to access your wallet. Due to the
            sensitivity of the information involved, these options should only
            be used in offline settings by experienced users.
        </Notice>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { mdiAlertOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";

export default createComponent({
    components: {
        Notice
    },
    setup() {
        return {
            mdiAlertOutline
        };
    }
});
</script>
