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
import { createComponent } from "@vue/composition-api";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { mdiTwitter } from "@mdi/js";

export default createComponent({
    components: { MaterialDesignIcon },
    setup() {
        return { mdiTwitter };
    }
});
</script>

<style scoped lang="postcss">
.AdBlockTwitter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border-radius: 5px;
    text-decoration: none;
    color: var(--color-washed-black);
    background: white;
    font-size: 18px;
    font-weight: 600;
}

.AdBlockTwitter-icon {
    margin-left: 15px;
    width: 40px;
    height: 40px;
    color: rgb(28, 161, 241);
}
</style>
