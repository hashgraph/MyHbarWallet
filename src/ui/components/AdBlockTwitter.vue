<template>
    <a
        class="AdBlockTwitter"
        href="https://twitter.com/myhbarwallet?lang=en"
        rel="noopener"
        target="_blank"
    >
        <div class="AdBlockTwitter-follow">
            {{ $t("ads.twitterFollowUs") }}
            <MaterialDesignIcon
                class="AdBlockTwitter-icon"
                :icon="mdiTwitter"
            />
        </div>
    </a>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { mdiTwitter } from "@mdi/js";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

export default defineComponent({
    name: "AdBlockTwitter",
    components: { MaterialDesignIcon },
    setup() {
        return { mdiTwitter };
    }
});
</script>

<style scoped lang="postcss">
.AdBlockTwitter {
    align-items: center;
    background: white;
    border-radius: 5px;
    color: var(--color-washed-black);
    display: flex;
    font-size: 18px;
    font-weight: 600;
    height: 100px;
    justify-content: center;
    text-decoration: none;
}

.AdBlockTwitter-icon {
    color: rgb(28, 161, 241);
    height: 40px;
    margin-inline-start: 15px;
    width: 40px;
}
</style>
