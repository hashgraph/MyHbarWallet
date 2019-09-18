<template>
    <div class="warning">
        <Notice :title="$t('warning.title')" :symbol="mdiAlertOutline">
            {{ $t("warning.thisIsNotARecommendedWayToAccessYourWallet") }}
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
