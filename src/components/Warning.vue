<template>
    <div class="warning">
        <Notice :title="warningDisplay.title" :symbol="mdiAlertOutline">{{
            warningDisplay.body
        }}</Notice>
    </div>
</template>

<script lang="ts">
import { createComponent, computed, SetupContext } from "@vue/composition-api";
import { mdiAlertOutline } from "@mdi/js";
import Notice from "../components/Notice.vue";

export default createComponent({
    components: {
        Notice
    },
    props: {
        whichModal: { type: String, required: true }
    },
    setup({ whichModal }, context: SetupContext) {
        const warningDisplay = computed(() => {
            if (whichModal == "hardware") {
                return {
                    title: context.root
                        .$t("warning.browserWarningTitle")
                        .toString(),
                    body: context.root
                        .$t("warning.browserWarningBody")
                        .toString()
                };
            } else {
                return {
                    title: context.root.$t("warning.title").toString(),
                    body: context.root
                        .$t(
                            "warning.thisIsNotARecommendedWayToAccessYourWallet"
                        )
                        .toString()
                };
            }
        });

        return {
            mdiAlertOutline,
            warningDisplay
        };
    }
});
</script>
